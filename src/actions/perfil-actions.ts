"use server";

import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth-helpers";

export async function crearAusencia(data: {
  startDate: string;
  endDate: string;
  reason: string;
}) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };

  const userId = parseInt(user.id);
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return { error: "Fechas inválidas." };
  }
  if (endDate < startDate) {
    return { error: "La fecha de fin no puede ser anterior a la de inicio." };
  }
  if (!data.reason.trim()) {
    return { error: "El motivo es obligatorio." };
  }

  try {
    // Get person info for notification message
    const person = await prisma.person.findFirst({
      where: { user: { id: userId } },
      select: { name: true, lastname: true, churchId: true },
    });

    if (!person) return { error: "Perfil no encontrado." };

    const senderName = `${person.name} ${person.lastname}`;
    const formatDate = (d: Date) =>
      d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
    const message = `${senderName} estará ausente del ${formatDate(startDate)} al ${formatDate(endDate)}. Motivo: ${data.reason.trim()}`;

    // Create absence record
    const absence = await prisma.absence.create({
      data: { userId, startDate, endDate, reason: data.reason.trim() },
    });

    // Collect department IDs where this user/person is a member
    const personRecord = await prisma.person.findFirst({
      where: { user: { id: userId } },
      select: { id: true, departments: { where: { active: true }, select: { departmentId: true } } },
    });
    const personDeptIds = personRecord?.departments.map((d) => d.departmentId) ?? [];
    const userDeptIds = (
      await prisma.departmentMember.findMany({ where: { userId, active: true }, select: { departmentId: true } })
    ).map((d) => d.departmentId);
    const deptIds = [...new Set([...personDeptIds, ...userDeptIds])];

    // Find recipients:
    // 1. Leaders of the person's departments
    // 2. RESPONSIBLE users of the same church
    // 3. All ADMIN users (see everything across all churches)
    const [deptLeaders, responsables, admins] = await Promise.all([
      deptIds.length > 0
        ? prisma.departmentMember.findMany({
            where: { departmentId: { in: deptIds }, active: true, roleInDept: "LEADER", userId: { not: userId } },
            select: { userId: true },
          })
        : Promise.resolve([]),
      person.churchId
        ? prisma.user.findMany({
            where: { role: "RESPONSIBLE", id: { not: userId }, person: { churchId: person.churchId } },
            select: { id: true },
          })
        : Promise.resolve([]),
      prisma.user.findMany({
        where: { role: "ADMIN", id: { not: userId } },
        select: { id: true },
      }),
    ]);

    // Deduplicate recipient user IDs
    const recipientIds = [
      ...new Set([
        ...deptLeaders.map((l) => l.userId),
        ...responsables.map((u) => u.id),
        ...admins.map((u) => u.id),
      ]),
    ];

    if (recipientIds.length > 0) {
      await prisma.notification.createMany({
        data: recipientIds.map((recipientId) => ({
          userId: recipientId,
          fromUserId: userId,
          type: "ABSENCE",
          message,
          absenceId: absence.id,
        })),
      });
    }

    revalidatePath("/app/perfil");
    revalidatePath("/app/personas");
    return { success: "Ausencia registrada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al registrar la ausencia." };
  }
}

export async function marcarAusenciasLeidas(fromUserId: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };

  const userId = parseInt(user.id);

  try {
    await prisma.notification.updateMany({
      where: { userId, fromUserId, type: "ABSENCE", read: false },
      data: { read: true },
    });
    revalidatePath("/app/personas");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Error al marcar las notificaciones como leídas." };
  }
}

export async function actualizarPerfil(personId: number, formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };

  // Verify the user is editing their own profile
  const person = await prisma.person.findUnique({
    where: { id: personId },
    include: { user: { select: { id: true, password: true } } },
  });

  if (!person) return { error: "Persona no encontrada." };
  if (!person.user || String(person.user.id) !== user.id) {
    return { error: "Solo puedes editar tu propio perfil." };
  }

  const name = formData.get("name")?.toString().trim();
  const lastname = formData.get("lastname")?.toString().trim();
  const email = formData.get("email")?.toString().trim() || null;
  const phone = formData.get("phone")?.toString().trim() || null;
  const address = formData.get("address")?.toString().trim() || null;
  const birthDate = formData.get("birthDate")?.toString() || null;

  const currentPassword = formData.get("currentPassword")?.toString();
  const newPassword = formData.get("newPassword")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!name || !lastname) {
    return { error: "El nombre y los apellidos son obligatorios." };
  }

  try {
    if (newPassword) {
      if (!currentPassword) {
        return { error: "Introduce la contraseña actual." };
      }
      const isValid = await bcrypt.compare(currentPassword, person.user.password);
      if (!isValid) {
        return { error: "La contraseña actual es incorrecta." };
      }
      if (newPassword.length < 6) {
        return { error: "La nueva contraseña debe tener al menos 6 caracteres." };
      }
      if (newPassword !== confirmPassword) {
        return { error: "Las contraseñas no coinciden." };
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: person.user.id },
        data: { password: hash },
      });
    }

    await prisma.person.update({
      where: { id: personId },
      data: {
        name,
        lastname,
        email,
        phone,
        address,
        birthDate: birthDate ? new Date(birthDate) : null,
      },
    });

    revalidatePath("/app/perfil");
    return { success: newPassword ? "Contraseña actualizada correctamente." : "Perfil actualizado correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar el perfil." };
  }
}

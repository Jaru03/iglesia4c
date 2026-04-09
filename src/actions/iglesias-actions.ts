"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth-helpers";

export async function crearIglesia(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (user.role !== "ADMIN") return { error: "Solo los administradores pueden crear iglesias" };

  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const place = formData.get("place")?.toString().trim();
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);
  const responsableIds = formData.getAll("responsableIds") as string[];
  const schedules = formData.getAll("schedules") as string[];
  void schedules;

  if (!title || !place) {
    return { error: "El nombre y la ubicación son obligatorios." };
  }

  try {
    const church = await prisma.church.create({
      data: {
        title,
        description: description || "",
        place,
        latitude: latitude || 0,
        longitude: longitude || 0,
        active: true,
      },
    });

    const responsablePromises = responsableIds
      .filter((userId) => userId)
      .map((userId, index) =>
        prisma.churchLeader.create({
          data: { churchId: church.id, userId: parseInt(userId), role: "RESPONSIBLE", order: index },
        })
      );

    await Promise.all(responsablePromises);

    const updateRolePromises = responsableIds
      .filter((userId) => userId)
      .map(async (userId) => {
        const userIdNum = parseInt(userId);
        await prisma.user
          .update({ where: { id: userIdNum }, data: { role: "RESPONSIBLE" } })
          .catch((err) => console.error("Error updating user:", userIdNum, err));

        const person = await prisma.person.findFirst({ where: { user: { id: userIdNum } } });
        if (person) {
          await prisma.person.update({
            where: { id: person.id },
            data: { churchId: church.id, membershipStatus: "ACTIVE", isMember: true },
          });
        }
      });

    await Promise.all(updateRolePromises);

    revalidatePath("/app/iglesias");
    revalidatePath("/app/dashboard");
    return { success: "Iglesia creada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear la iglesia." };
  }
}

export async function actualizarIglesia(id: number, formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (user.role !== "ADMIN") return { error: "Solo los administradores pueden editar iglesias" };

  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const place = formData.get("place")?.toString().trim();
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);
  const active = formData.get("active") === "on";
  const responsableIds = formData.getAll("responsableIds") as string[];

  if (!title || !place) {
    return { error: "El nombre y la ubicación son obligatorios." };
  }

  try {
    const oldLeaders = await prisma.churchLeader.findMany({
      where: { churchId: id, role: "RESPONSIBLE" },
      select: { userId: true },
    });
    const oldResponsableIds = new Set(oldLeaders.map((l) => l.userId));

    await prisma.church.update({
      where: { id },
      data: { title, description: description || "", place, latitude: latitude || 0, longitude: longitude || 0, active },
    });

    await prisma.churchLeader.deleteMany({ where: { churchId: id } });

    const newResponsableIds = responsableIds.filter((userId) => userId).map((id) => parseInt(id));
    const newResponsableSet = new Set(newResponsableIds);

    await Promise.all(
      newResponsableIds.map((userId, index) =>
        prisma.churchLeader.create({
          data: { churchId: id, userId, role: "RESPONSIBLE", order: index },
        })
      )
    );

    const allCurrentLeaders = await prisma.churchLeader.findMany({
      where: { role: "RESPONSIBLE" },
      select: { userId: true },
    });
    const currentResponsableIds = new Set(allCurrentLeaders.map((l) => l.userId));

    for (const oldUserId of oldResponsableIds) {
      if (!newResponsableSet.has(oldUserId) && !currentResponsableIds.has(oldUserId)) {
        const isDeptLeader = await prisma.departmentMember.findFirst({
          where: { userId: oldUserId, roleInDept: "LEADER", active: true },
        });
        await prisma.user.update({
          where: { id: oldUserId },
          data: { role: isDeptLeader ? "LEADER" : "USER" },
        });
      }
    }

    for (const newUserId of newResponsableIds) {
      await prisma.user
        .update({ where: { id: newUserId }, data: { role: "RESPONSIBLE" } })
        .catch((err) => console.error("Error updating user:", newUserId, err));

      const person = await prisma.person.findFirst({ where: { user: { id: newUserId } } });
      if (person) {
        await prisma.person.update({
          where: { id: person.id },
          data: { churchId: id, membershipStatus: "ACTIVE", isMember: true },
        });
      }
    }

    revalidatePath("/app/iglesias");
    revalidatePath("/app/dashboard");
    revalidatePath("/app/configuracion");
    return { success: "Iglesia actualizada correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar la iglesia." };
  }
}

export async function eliminarIglesia(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (user.role !== "ADMIN") return { error: "Sin permisos" };

  const id = parseInt(formData.get("id") as string);
  if (!id) return { error: "ID inválido" };

  await prisma.church.delete({ where: { id } });
  revalidatePath("/app/iglesias");
  revalidatePath("/app/dashboard");
}

export async function toggleIglesia(id: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (user.role !== "ADMIN") return { error: "Sin permisos" };

  const iglesia = await prisma.church.findUnique({ where: { id } });
  if (!iglesia) return;

  await prisma.church.update({
    where: { id },
    data: { active: !iglesia.active },
  });

  revalidatePath("/app/iglesias");
  revalidatePath("/app/dashboard");
}

export async function actualizarHorariosIglesia(
  churchId: number,
  schedules: { day: string; time: string; name: string }[]
) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!["ADMIN", "RESPONSIBLE"].includes(user.role)) return { error: "Sin permisos" };

  // RESPONSIBLE can only update their own church schedules
  if (user.role === "RESPONSIBLE" && user.churchId !== churchId) {
    return { error: "Sin permisos sobre esa iglesia" };
  }

  try {
    await prisma.churchSchedule.deleteMany({ where: { churchId } });

    if (schedules.length > 0) {
      await prisma.churchSchedule.createMany({
        data: schedules
          .filter((s) => s.day && s.time)
          .map((s) => ({ churchId, day: s.day, time: s.time, name: s.name })),
      });
    }

    revalidatePath("/app/cultos");
    return { success: "Horarios actualizados correctamente." };
  } catch {
    return { error: "Error al actualizar los horarios." };
  }
}

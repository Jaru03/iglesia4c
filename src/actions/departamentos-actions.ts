"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser, canManageDepartment } from "@/lib/auth-helpers";

const ADMIN_RESPONSIBLE = ["ADMIN", "RESPONSIBLE"];

async function updatePersonAsLeader(userId: number, departmentId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { person: { select: { id: true } } },
  });

  if (user && !["ADMIN", "RESPONSIBLE"].includes(user.role) && user.role !== "LEADER") {
    await prisma.user.update({
      where: { id: userId },
      data: { role: "LEADER" },
    });
  }

  if (user?.person?.id) {
    await prisma.personDepartment.upsert({
      where: { personId_departmentId: { personId: user.person.id, departmentId } },
      update: { active: true, roleInDept: "LEADER" },
      create: { personId: user.person.id, departmentId, active: true, roleInDept: "LEADER" },
    });
  }
}

async function removePersonAsLeader(userId: number) {
  const stillLeader = await prisma.departmentMember.findFirst({
    where: { userId, roleInDept: "LEADER", active: true },
  });

  if (!stillLeader) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.role === "LEADER") {
      await prisma.user.update({
        where: { id: userId },
        data: { role: "USER" },
      });
    }
  }
}

export async function crearDepartamento(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!ADMIN_RESPONSIBLE.includes(user.role)) return { error: "Sin permisos" };

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const churchId = parseInt(formData.get("churchId") as string);
  const leaderIdsRaw = formData.getAll("leaderIds") as string[];

  const leaderIds = leaderIdsRaw
    .join(",")
    .split(",")
    .filter((id) => id.trim());

  if (!name || !churchId) {
    return { error: "El nombre y la iglesia son obligatorios." };
  }

  // RESPONSIBLE can only create depts in their own church
  if (user.role === "RESPONSIBLE" && user.churchId !== churchId) {
    return { error: "Sin permisos sobre esa iglesia" };
  }

  try {
    const departamento = await prisma.department.create({
      data: { name, description: description || null, churchId, active: true },
    });

    const validLeaderIds = leaderIds.filter((id) => id).map((id) => parseInt(id));
    for (const userId of validLeaderIds) {
      await prisma.departmentMember.upsert({
        where: { userId_departmentId: { userId, departmentId: departamento.id } },
        update: { roleInDept: "LEADER", active: true },
        create: { userId, departmentId: departamento.id, roleInDept: "LEADER", active: true },
      });
      await updatePersonAsLeader(userId, departamento.id);
    }

    const memberIdsRaw = formData.getAll("memberIds") as string[];
    const memberIds = memberIdsRaw.filter((id) => id.trim()).map((id) => parseInt(id));
    for (const personId of memberIds) {
      await prisma.personDepartment.upsert({
        where: { personId_departmentId: { personId, departmentId: departamento.id } },
        update: { active: true },
        create: { personId, departmentId: departamento.id, active: true },
      });
    }

    revalidatePath("/app/departamentos");
    revalidatePath("/app/dashboard");
    return { success: "Departamento creado correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear el departamento." };
  }
}

export async function actualizarDepartamento(id: number, formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };

  const allowed = await canManageDepartment(user, id);
  if (!allowed) return { error: "Sin permisos sobre ese departamento" };

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const leaderIdsRaw = formData.getAll("leaderIds") as string[];

  const leaderIds = leaderIdsRaw
    .join(",")
    .split(",")
    .filter((id) => id.trim());

  if (!name) return { error: "El nombre es obligatorio." };

  try {
    const churchIdValue = formData.get("churchId");
    await prisma.department.update({
      where: { id },
      data: {
        name,
        description: description || null,
        ...(churchIdValue ? { churchId: parseInt(churchIdValue as string) } : {}),
      },
    });

    const existingLeaders = await prisma.departmentMember.findMany({
      where: { departmentId: id, roleInDept: "LEADER" },
    });

    const newLeaderIds = leaderIds.filter((id) => id).map((id) => parseInt(id));
    const newLeaderSet = new Set(newLeaderIds);

    const toDelete = existingLeaders.filter((l) => !newLeaderSet.has(l.userId));
    if (toDelete.length > 0) {
      await prisma.departmentMember.deleteMany({
        where: { id: { in: toDelete.map((l) => l.id) } },
      });
      for (const leader of toDelete) {
        await removePersonAsLeader(leader.userId);
      }
    }

    const existingUserIds = new Set(existingLeaders.map((l) => l.userId));
    const toCreate = newLeaderIds.filter((userId) => !existingUserIds.has(userId));
    for (const userId of toCreate) {
      await prisma.departmentMember.upsert({
        where: { userId_departmentId: { userId, departmentId: id } },
        update: { roleInDept: "LEADER", active: true },
        create: { userId, departmentId: id, roleInDept: "LEADER", active: true },
      });
    }

    for (const userId of newLeaderIds) {
      await updatePersonAsLeader(userId, id);
    }

    const memberIdsRaw = formData.getAll("memberIds") as string[];
    const memberIds = memberIdsRaw.filter((mid) => mid.trim()).map((mid) => parseInt(mid));
    const existingMembers = await prisma.personDepartment.findMany({
      where: { departmentId: id, active: true },
    });
    const existingPersonIds = new Set(existingMembers.map((m) => m.personId));
    const newPersonIdSet = new Set(memberIds);

    for (const m of existingMembers) {
      if (!newPersonIdSet.has(m.personId)) {
        await prisma.personDepartment.update({
          where: { id: m.id },
          data: { active: false },
        });
      }
    }
    for (const personId of memberIds) {
      if (!existingPersonIds.has(personId)) {
        await prisma.personDepartment.upsert({
          where: { personId_departmentId: { personId, departmentId: id } },
          update: { active: true },
          create: { personId, departmentId: id, active: true },
        });
      }
    }

    revalidatePath("/app/departamentos");
    revalidatePath("/app/dashboard");
    return { success: "Departamento actualizado correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar el departamento." };
  }
}

export async function eliminarDepartamento(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!ADMIN_RESPONSIBLE.includes(user.role)) return { error: "Sin permisos" };

  const id = parseInt(formData.get("id") as string);
  if (!id) return { error: "ID inválido" };

  const allowed = await canManageDepartment(user, id);
  if (!allowed) return { error: "Sin permisos sobre ese departamento" };

  await prisma.department.delete({ where: { id } });
  revalidatePath("/app/departamentos");
  revalidatePath("/app/dashboard");
}

export async function toggleDepartamento(id: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!ADMIN_RESPONSIBLE.includes(user.role)) return { error: "Sin permisos" };

  const allowed = await canManageDepartment(user, id);
  if (!allowed) return { error: "Sin permisos sobre ese departamento" };

  const dept = await prisma.department.findUnique({ where: { id } });
  if (!dept) return;

  await prisma.department.update({
    where: { id },
    data: { active: !dept.active },
  });

  revalidatePath("/app/departamentos");
}

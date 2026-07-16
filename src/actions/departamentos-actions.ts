"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser, canManageDepartment } from "@/lib/auth-helpers";

const ADMIN_RESPONSIBLE = ["ADMIN", "RESPONSIBLE"];

async function assignLeaderByPersonId(personId: number, departmentId: number) {
  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { user: { select: { id: true, role: true } } },
  });

  // Mark in PersonDepartment regardless of account
  await prisma.personDepartment.upsert({
    where: { personId_departmentId: { personId, departmentId } },
    update: { active: true, roleInDept: "LEADER" },
    create: { personId, departmentId, active: true, roleInDept: "LEADER" },
  });

  // If they have a user account, also update DepartmentMember and role
  if (person?.user) {
    const userId = person.user.id;
    await prisma.departmentMember.upsert({
      where: { userId_departmentId: { userId, departmentId } },
      update: { roleInDept: "LEADER", active: true },
      create: { userId, departmentId, roleInDept: "LEADER", active: true },
    });
    if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(person.user.role)) {
      await prisma.user.update({ where: { id: userId }, data: { role: "LEADER" } });
    }
  }
}

async function removeLeaderByPersonId(personId: number, departmentId: number) {
  // Remove from PersonDepartment leadership
  await prisma.personDepartment.updateMany({
    where: { personId, departmentId, roleInDept: "LEADER" },
    data: { roleInDept: null },
  });

  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { user: { select: { id: true, role: true } } },
  });

  if (person?.user) {
    const userId = person.user.id;
    // Remove from DepartmentMember
    await prisma.departmentMember.deleteMany({ where: { userId, departmentId, roleInDept: "LEADER" } });
    // Downgrade role if no longer leader anywhere
    const stillLeader = await prisma.departmentMember.findFirst({
      where: { userId, roleInDept: "LEADER", active: true },
    });
    if (!stillLeader && person.user.role === "LEADER") {
      await prisma.user.update({ where: { id: userId }, data: { role: "USER" } });
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
  const leaderPersonIdsRaw = formData.getAll("leaderPersonIds") as string[];

  const leaderPersonIds = leaderPersonIdsRaw
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

    const validLeaderPersonIds = leaderPersonIds.filter((id) => id).map((id) => parseInt(id));
    for (const personId of validLeaderPersonIds) {
      await assignLeaderByPersonId(personId, departamento.id);
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
  const leaderPersonIdsRaw = formData.getAll("leaderPersonIds") as string[];

  const leaderPersonIds = leaderPersonIdsRaw
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

    const existingLeaders = await prisma.personDepartment.findMany({
      where: { departmentId: id, roleInDept: "LEADER" },
    });

    const newLeaderPersonIds = leaderPersonIds.filter((pid) => pid).map((pid) => parseInt(pid));
    const newLeaderSet = new Set(newLeaderPersonIds);

    const toRemove = existingLeaders.filter((l) => !newLeaderSet.has(l.personId));
    for (const leader of toRemove) {
      await removeLeaderByPersonId(leader.personId, id);
    }

    const existingPersonIds = new Set(existingLeaders.map((l) => l.personId));
    const toAdd = newLeaderPersonIds.filter((pid) => !existingPersonIds.has(pid));
    for (const personId of toAdd) {
      await assignLeaderByPersonId(personId, id);
    }

    const memberIdsRaw = formData.getAll("memberIds") as string[];
    const memberIds = memberIdsRaw.filter((mid) => mid.trim()).map((mid) => parseInt(mid));
    const existingMembers = await prisma.personDepartment.findMany({
      where: { departmentId: id, active: true },
    });
    const existingMemberPersonIds = new Set(existingMembers.map((m) => m.personId));
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
      if (!existingMemberPersonIds.has(personId)) {
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

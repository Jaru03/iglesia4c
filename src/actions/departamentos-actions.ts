"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

const ROLES_ABOVE_LEADER = ["ADMIN", "RESPONSIBLE"];

async function updatePersonAsLeader(userId: number) {
  // Only upgrade to LEADER if the user doesn't already have a higher-priority role
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user && !ROLES_ABOVE_LEADER.includes(user.role) && user.role !== "LEADER") {
    await prisma.user.update({
      where: { id: userId },
      data: { role: "LEADER" },
    });
  }

  // Also bump person membershipStatus to MEMBER
  const person = await prisma.person.findFirst({
    where: { user: { id: userId } },
  });
  if (person && person.membershipStatus !== "MEMBER") {
    await prisma.person.update({
      where: { id: person.id },
      data: { membershipStatus: "MEMBER" },
    });
  }
}

async function removePersonAsLeader(userId: number) {
  // Check if still a leader of any other department
  const stillLeader = await prisma.departmentMember.findFirst({
    where: { userId, roleInDept: "LEADER", active: true },
  });

  if (!stillLeader) {
    // Revert User.role back to MEMBER (only if currently LEADER)
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.role === "LEADER") {
      await prisma.user.update({
        where: { id: userId },
        data: { role: "MEMBER" },
      });
    }

  }
}

export async function crearDepartamento(formData: FormData) {
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

  try {
    const departamento = await prisma.department.create({
      data: {
        name,
        description: description || null,
        churchId,
        active: true,
      },
    });

    const validLeaderIds = leaderIds.filter((id) => id).map((id) => parseInt(id));
    if (validLeaderIds.length > 0) {
      for (const userId of validLeaderIds) {
        await prisma.departmentMember.upsert({
          where: { userId_departmentId: { userId, departmentId: departamento.id } },
          update: { roleInDept: "LEADER", active: true },
          create: { userId, departmentId: departamento.id, roleInDept: "LEADER", active: true },
        });
        await updatePersonAsLeader(userId);
      }
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

    revalidatePath("/admin/departamentos");
    revalidatePath("/admin");
    revalidatePath("/responsable/departamentos");
    revalidatePath("/responsable");
    revalidatePath("/usuario");
    revalidatePath("/app/departamentos");
    revalidatePath("/app/dashboard");
    revalidatePath("/app/departamentos");
    revalidatePath("/app/dashboard");
    revalidatePath("/app/dashboard");
    return { success: "Departamento creado correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al crear el departamento." };
  }
}

export async function actualizarDepartamento(id: number, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const leaderIdsRaw = formData.getAll("leaderIds") as string[];
  
  const leaderIds = leaderIdsRaw
    .join(",")
    .split(",")
    .filter((id) => id.trim());

  if (!name) {
    return { error: "El nombre es obligatorio." };
  }

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
      where: {
        departmentId: id,
        roleInDept: "LEADER",
      },
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
    if (toCreate.length > 0) {
      for (const userId of toCreate) {
        await prisma.departmentMember.upsert({
          where: { userId_departmentId: { userId, departmentId: id } },
          update: { roleInDept: "LEADER", active: true },
          create: { userId, departmentId: id, roleInDept: "LEADER", active: true },
        });
      }
    }

    for (const userId of newLeaderIds) {
      await updatePersonAsLeader(userId);
    }

    // Sync PersonDepartment members
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

    revalidatePath("/admin/departamentos");
    revalidatePath("/admin");
    revalidatePath("/responsable/departamentos");
    revalidatePath("/responsable");
    revalidatePath("/usuario");
    revalidatePath("/app/departamentos");
    revalidatePath("/app/dashboard");
    return { success: "Departamento actualizado correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar el departamento." };
  }
}

export async function eliminarDepartamento(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  if (!id) return;

  await prisma.department.delete({ where: { id } });
  revalidatePath("/admin/departamentos");
  revalidatePath("/app/departamentos");
  revalidatePath("/app/departamentos");
}

export async function toggleDepartamento(id: number) {
  const dept = await prisma.department.findUnique({ where: { id } });
  if (!dept) return;

  await prisma.department.update({
    where: { id },
    data: { active: !dept.active },
  });

  revalidatePath("/admin/departamentos");
}

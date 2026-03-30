"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser, canManageDepartment, canManageActivity } from "@/lib/auth-helpers";

const MANAGE_ROLES = ["ADMIN", "RESPONSIBLE", "LEADER"];

export async function editarDepartamentoLider(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const departmentId = parseInt(formData.get("departmentId") as string);
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!departmentId || !name) return { error: "Datos incompletos." };

  const allowed = await canManageDepartment(user, departmentId);
  if (!allowed) return { error: "Sin permisos sobre ese departamento" };

  try {
    await prisma.department.update({
      where: { id: departmentId },
      data: { name, description: description || null },
    });
    revalidatePath("/app/departamentos");
    revalidatePath("/app/dashboard");
    return { success: "Departamento actualizado." };
  } catch {
    return { error: "Error al actualizar el departamento." };
  }
}

export async function agregarPersonaAlDepartamento(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const departmentId = parseInt(formData.get("departmentId") as string);
  const personId = parseInt(formData.get("personId") as string);

  if (!departmentId || !personId) return { error: "Datos incompletos." };

  const allowed = await canManageDepartment(user, departmentId);
  if (!allowed) return { error: "Sin permisos sobre ese departamento" };

  try {
    await prisma.personDepartment.upsert({
      where: { personId_departmentId: { personId, departmentId } },
      update: { active: true },
      create: { personId, departmentId, active: true },
    });
    revalidatePath("/app/personas");
    revalidatePath("/app/departamentos");
    revalidatePath("/app/dashboard");
  } catch {
    return { error: "Error al agregar la persona." };
  }
}

export async function quitarPersonaDeDepartamento(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const departmentId = parseInt(formData.get("departmentId") as string);
  const personId = parseInt(formData.get("personId") as string);

  if (!departmentId || !personId) return { error: "Datos incompletos." };

  const allowed = await canManageDepartment(user, departmentId);
  if (!allowed) return { error: "Sin permisos sobre ese departamento" };

  await prisma.personDepartment.deleteMany({
    where: { personId, departmentId },
  });

  revalidatePath("/app/personas");
  revalidatePath("/app/departamentos");
  revalidatePath("/app/dashboard");
}

export async function toggleAsistencia(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const activityId = parseInt(formData.get("activityId") as string);
  const personId = parseInt(formData.get("personId") as string);
  const currentAttended = formData.get("attended") === "true";

  if (!activityId || !personId) return { error: "Datos incompletos." };

  const allowed = await canManageActivity(user, activityId);
  if (!allowed) return { error: "Sin permisos sobre esa actividad" };

  await prisma.attendance.upsert({
    where: { personId_activityId: { personId, activityId } },
    update: { attended: !currentAttended },
    create: { personId, activityId, attended: true },
  });

  revalidatePath(`/app/asistencias/${activityId}`);
}

export async function eliminarActividadLider(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const activityId = parseInt(formData.get("activityId") as string);
  const departmentId = parseInt(formData.get("departmentId") as string);

  if (!activityId || !departmentId) return { error: "Datos incompletos." };

  const allowed = await canManageActivity(user, activityId);
  if (!allowed) return { error: "Sin permisos sobre esa actividad" };

  const activity = await prisma.activity.findFirst({
    where: { id: activityId, departmentId },
  });

  if (!activity) return { error: "Actividad no encontrada." };

  await prisma.$transaction([
    prisma.attendance.deleteMany({ where: { activityId } }),
    prisma.activity.delete({ where: { id: activityId } }),
  ]);

  revalidatePath("/app/actividades");
  revalidatePath("/app/dashboard");
}

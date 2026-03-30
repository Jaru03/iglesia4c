"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser, canManageActivity } from "@/lib/auth-helpers";

const MANAGE_ROLES = ["ADMIN", "RESPONSIBLE", "LEADER"];

export async function toggleAttendance(personId: number, activityId: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!MANAGE_ROLES.includes(user.role)) return { error: "Sin permisos" };

  const allowed = await canManageActivity(user, activityId);
  if (!allowed) return { error: "Sin permisos sobre esa actividad" };

  const existing = await prisma.attendance.findUnique({
    where: { personId_activityId: { personId, activityId } },
  });

  if (existing) {
    await prisma.attendance.update({
      where: { id: existing.id },
      data: { attended: !existing.attended },
    });
  } else {
    await prisma.attendance.create({
      data: { personId, activityId, attended: true },
    });
  }

  await updatePersonMembershipStatus(personId);

  revalidatePath("/app/asistencias");
  revalidatePath("/app/dashboard");
}

export async function marcarAsistenciaUsuario(personId: number, activityId: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };

  // Verify the user is marking their own attendance
  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { user: { select: { id: true } } },
  });
  if (!person?.user || String(person.user.id) !== user.id) {
    return { error: "Solo puedes registrar tu propia asistencia" };
  }

  const existing = await prisma.attendance.findUnique({
    where: { personId_activityId: { personId, activityId } },
  });

  if (existing) {
    if (existing.attended) {
      return { error: "Ya has confirmado tu asistencia a esta actividad" };
    }
    await prisma.attendance.update({
      where: { id: existing.id },
      data: { attended: true },
    });
  } else {
    await prisma.attendance.create({
      data: { personId, activityId, attended: true },
    });
  }

  await updatePersonMembershipStatus(personId);

  revalidatePath("/app/asistencias");
  revalidatePath("/app/dashboard");

  return { success: "Asistencia registrada correctamente" };
}

export async function preRegistrarseActividad(personId: number, activityId: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };

  // Verify the user is pre-registering themselves
  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { user: { select: { id: true } } },
  });
  if (!person?.user || String(person.user.id) !== user.id) {
    return { error: "Solo puedes pre-registrarte tú mismo" };
  }

  const existing = await prisma.attendance.findUnique({
    where: { personId_activityId: { personId, activityId } },
  });

  if (existing) {
    if (existing.attended) return { error: "Ya tienes asistencia confirmada" };
    if (existing.preRegistered) return { error: "Ya estás pre-registrado" };
    await prisma.attendance.update({
      where: { id: existing.id },
      data: { preRegistered: true },
    });
  } else {
    await prisma.attendance.create({
      data: { personId, activityId, attended: false, preRegistered: true },
    });
  }

  revalidatePath("/app/dashboard");
  return { success: "Pre-registro confirmado" };
}

export async function cancelarPreRegistro(personId: number, activityId: number) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };

  // Verify the user is cancelling their own pre-registration
  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { user: { select: { id: true } } },
  });
  if (!person?.user || String(person.user.id) !== user.id) {
    return { error: "Solo puedes cancelar tu propio pre-registro" };
  }

  await prisma.attendance.deleteMany({
    where: { personId, activityId, preRegistered: true, attended: false },
  });
  revalidatePath("/app/dashboard");
  return { success: "Pre-registro cancelado" };
}

async function updatePersonMembershipStatus(personId: number) {
  const person = await prisma.person.findUnique({
    where: { id: personId },
    include: {
      user: true,
      departments: true,
      _count: { select: { attendances: true } },
    },
  });

  if (!person) return;

  const hasUser = !!person.user;
  const isInDepartments = person.departments.length > 0;
  const attendanceCount = person._count.attendances;

  let newStatus: "ACTIVE" | "VISITOR" | "INACTIVE" = "VISITOR";

  if (!person.active) {
    newStatus = "INACTIVE";
  } else if (hasUser || isInDepartments || attendanceCount > 1) {
    newStatus = "ACTIVE";
  }

  if (person.membershipStatus !== newStatus) {
    await prisma.person.update({
      where: { id: personId },
      data: { membershipStatus: newStatus },
    });
  }
}

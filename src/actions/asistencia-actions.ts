"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function toggleAttendance(personId: number, activityId: number) {
  const existing = await prisma.attendance.findUnique({
    where: {
      personId_activityId: {
        personId,
        activityId,
      },
    },
  });

  if (existing) {
    await prisma.attendance.update({
      where: { id: existing.id },
      data: { attended: !existing.attended },
    });
  } else {
    await prisma.attendance.create({
      data: {
        personId,
        activityId,
        attended: true,
      },
    });
  }

  await updatePersonMembershipStatus(personId);

  revalidatePath("/app/asistencias");
  revalidatePath("/app/asistencias/[id]");
  revalidatePath("/app/asistencias");
  revalidatePath("/app/asistencias/[id]");
  revalidatePath("/app/dashboard");
  revalidatePath("/app/asistencias");
}

export async function marcarAsistenciaUsuario(personId: number, activityId: number) {
  const existing = await prisma.attendance.findUnique({
    where: {
      personId_activityId: {
        personId,
        activityId,
      },
    },
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
      data: {
        personId,
        activityId,
        attended: true,
      },
    });
  }

  await updatePersonMembershipStatus(personId);

  revalidatePath("/app/asistencias");
  revalidatePath("/app/asistencias/[id]");
  revalidatePath("/app/asistencias");
  revalidatePath("/app/asistencias/[id]");
  revalidatePath("/app/dashboard");
  revalidatePath("/app/asistencias");

  return { success: "Asistencia registrada correctamente" };
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

  let newStatus: "MEMBER" | "VISITOR" | "INACTIVE" = "VISITOR";

  if (!person.active) {
    newStatus = "INACTIVE";
  } else if (hasUser || isInDepartments || attendanceCount > 1) {
    newStatus = "MEMBER";
  }

  if (person.membershipStatus !== newStatus) {
    await prisma.person.update({
      where: { id: personId },
      data: { membershipStatus: newStatus },
    });
  }
}

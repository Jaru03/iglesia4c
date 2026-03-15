"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function eliminarPersona(id: number) {
  if (!id) return { error: "ID inválido" };

  const persona = await prisma.person.findUnique({ where: { id } });
  if (!persona) return { error: "Persona no encontrada" };

  await prisma.$transaction([
    prisma.attendance.deleteMany({ where: { personId: id } }),
    prisma.person.delete({ where: { id } }),
  ]);

  revalidatePath("/admin/asistencias");
  return { success: "Persona eliminada correctamente." };
}

export async function eliminarActividad(id: number) {
  if (!id) return { error: "ID inválido" };

  const actividad = await prisma.activity.findUnique({ where: { id } });
  if (!actividad) return { error: "Actividad no encontrada" };

  await prisma.$transaction([
    prisma.attendance.deleteMany({ where: { activityId: id } }),
    prisma.activity.delete({ where: { id } }),
  ]);

  revalidatePath("/admin/actividades");
  return { success: "Actividad eliminada correctamente." };
}

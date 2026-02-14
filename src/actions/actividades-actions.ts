"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { logAudit } from "./audit-actions";

export async function crearActividad(formData: FormData) {
  const title = formData.get("title") as string;
  const place = formData.get("place") as string;
  const description = formData.get("description") as string;
  const img = formData.get("img") as string;
  const fecha = formData.get("fecha") as string;
  const horaInicio = formData.get("horaInicio") as string;
  const horaFin = formData.get("horaFin") as string;

  if (!title || !fecha || !horaInicio || !horaFin) {
    return { error: "Faltan datos obligatorios." };
  }

  const hour_start = new Date(`${fecha}T${horaInicio}:00`);
  const hour_end = new Date(`${fecha}T${horaFin}:00`);

  const creada = await prisma.activities.create({
    data: {
      title,
      place,
      description,
      hour_start,
      hour_end,
      img: img || "",
      urgent: false,
    },
  });

  await logAudit({
    module: "ACTIVIDADES",
    action: "CREATE",
    entity: "Activities",
    entityId: String(creada.id),
    description: `Actividad creada: ${creada.title}`,
  });

  revalidatePath("/admin/actividades");
  revalidatePath("/admin/calendario");
  revalidatePath("/");
  return { success: "Actividad creada." };
}

export async function eliminarActividad(id: number, _formData: FormData) {
  return eliminarActividadPorId(id);
}

export async function eliminarActividadPorId(id: number) {
  try {
    const actividad = await prisma.activities.findUnique({ where: { id } });

    await prisma.activities.delete({
      where: { id },
    });

    await logAudit({
      module: "ACTIVIDADES",
      action: "DELETE",
      entity: "Activities",
      entityId: String(id),
      description: `Actividad eliminada: ${actividad?.title || id}`,
    });

    revalidatePath("/admin/actividades");
    revalidatePath("/admin/calendario");
    revalidatePath("/");
    return { success: "Actividad eliminada." };
  } catch (error) {
    return { error: "No se pudo eliminar la actividad." };
  }
}

export async function actualizarActividad(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const place = formData.get("place") as string;
  const description = formData.get("description") as string;
  const img = formData.get("img") as string;
  const fecha = formData.get("fecha") as string;
  const horaInicio = formData.get("horaInicio") as string;
  const horaFin = formData.get("horaFin") as string;

  if (!id || !title || !fecha || !horaInicio || !horaFin) {
    return { error: "Faltan datos para actualizar." };
  }

  const hour_start = new Date(`${fecha}T${horaInicio}:00`);
  const hour_end = new Date(`${fecha}T${horaFin}:00`);

  const actualizada = await prisma.activities.update({
    where: { id },
    data: {
      title,
      place,
      description,
      img: img || "",
      hour_start,
      hour_end,
    },
  });

  await logAudit({
    module: "ACTIVIDADES",
    action: "UPDATE",
    entity: "Activities",
    entityId: String(id),
    description: `Actividad editada: ${actualizada.title}`,
  });

  revalidatePath("/admin/actividades");
  revalidatePath("/admin/calendario");
  revalidatePath("/");
  return { success: "Actividad actualizada." };
}

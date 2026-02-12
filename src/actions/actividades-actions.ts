"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function crearActividad(formData: FormData) {
  const title = formData.get("title") as string;
  const place = formData.get("place") as string;
  const description = formData.get("description") as string;  
  const img = formData.get("img") as string;

  const fecha = formData.get("fecha") as string;
  const horaInicio = formData.get("horaInicio") as string;
  const horaFin = formData.get("horaFin") as string;

  if (!title || !fecha || !horaInicio || !horaFin) {
    return; 
  }

  const hour_start = new Date(`${fecha}T${horaInicio}:00`);
  const hour_end = new Date(`${fecha}T${horaFin}:00`);

  await prisma.activities.create({
    data: {
      title,
      place,
      description,
      hour_start,
      hour_end,
      // 👇 NUEVO: Guardamos la imagen (o vacía si no pusieron nada)
      img: img || "", 
      urgent: false, 
    },
  });

  revalidatePath("/admin/actividades");
  revalidatePath("/admin/calendario");
  revalidatePath("/"); 
}
export async function eliminarActividad(id: number, _formData: FormData) {
  await prisma.activities.delete({
    where: { id },
  });
  
  revalidatePath("/admin/actividades");
}

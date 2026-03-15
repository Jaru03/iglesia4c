"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function crearPeticion(data: {
  nombre: string;
  email: string;
  phone: string;
  typePetition: string;
  content: string;
}) {
  const peticion = await prisma.petition.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      phone: data.phone,
      typePetition: data.typePetition,
      content: data.content,
      status: "PENDIENTE",
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/peticiones");
  return peticion;
}

export async function cambiarEstadoPeticion(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const estado = formData.get("estado") as string;

  if (!id || !estado) return;

  await prisma.petition.update({
    where: { id },
    data: { status: estado },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/peticiones");
}

export async function obtenerPeticiones() {
  return prisma.petition.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function eliminarPeticion(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  if (!id) return;

  await prisma.petition.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/admin/peticiones");
}

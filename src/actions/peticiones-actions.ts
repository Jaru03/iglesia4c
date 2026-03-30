"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth-helpers";

// Public — anyone can create a petition (contact form)
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

  revalidatePath("/app/peticiones");
  return peticion;
}

export async function cambiarEstadoPeticion(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!["ADMIN", "RESPONSIBLE"].includes(user.role)) return { error: "Sin permisos" };

  const id = parseInt(formData.get("id") as string);
  const estado = formData.get("estado") as string;

  if (!id || !estado) return { error: "Datos incompletos" };

  await prisma.petition.update({
    where: { id },
    data: { status: estado },
  });

  revalidatePath("/app/peticiones");
}

export async function obtenerPeticiones() {
  const user = await getSessionUser();
  if (!user) return [];
  if (!["ADMIN", "RESPONSIBLE"].includes(user.role)) return [];

  return prisma.petition.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function eliminarPeticion(formData: FormData) {
  const user = await getSessionUser();
  if (!user) return { error: "No autenticado" };
  if (!["ADMIN", "RESPONSIBLE"].includes(user.role)) return { error: "Sin permisos" };

  const id = parseInt(formData.get("id") as string);
  if (!id) return { error: "ID inválido" };

  await prisma.petition.delete({ where: { id } });

  revalidatePath("/app/peticiones");
}

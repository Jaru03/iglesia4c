"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function agregarUsuario(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  if (!email) return;

  try {
    await prisma.allowedUser.create({
      data: {
        email: email.toLowerCase(),
        name,
        role,
      },
    });
    revalidatePath("/admin/equipo");
  } catch (error) {
    console.error("Error creando usuario:", error);

  }
}

export async function eliminarUsuario(id: string) {
  await prisma.allowedUser.delete({
    where: { id },
  });
  revalidatePath("/admin/equipo");
}
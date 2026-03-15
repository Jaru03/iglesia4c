"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function obtenerUsuarios() {
  return prisma.user.findMany({
    include: { person: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function obtenerUsuarioPorId(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: { person: true },
  });
}

export async function actualizarUsuario(id: number, role: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role: role as any },
    });

    revalidatePath("/admin/equipo");
    redirect("/admin/equipo");
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar el usuario" };
  }
}

export async function eliminarUsuario(formData: FormData) {
  const userId = parseInt(formData.get("userId") as string);
  if (!userId) return;

  await prisma.$transaction([
    prisma.departmentMember.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } }),
  ]);

  revalidatePath("/admin/equipo");
}

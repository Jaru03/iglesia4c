"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function obtenerUsuarios() {
  return prisma.user.findMany({
    include: { person: true },
    orderBy: { createdAt: "desc" },
  });
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

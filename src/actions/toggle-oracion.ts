"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function marcarComoOrado(peticionId: string) {
  try {
    const peticionActual = await prisma.peticion.findUnique({
      where: { id: peticionId },
    });

    if (!peticionActual) return;
    const nuevoEstado = peticionActual.estado === "RESPONDIDA" ? "PENDIENTE" : "RESPONDIDA";

    await prisma.peticion.update({
      where: { id: peticionId },
      data: { estado: nuevoEstado },
    });
    
    revalidatePath("/admin/asistencias");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Error actualizando" };
  }
}

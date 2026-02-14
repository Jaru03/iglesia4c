"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function asignarMiembro(formData: FormData) {
  const jovenId = formData.get("jovenId")?.toString();
  const grupoId = formData.get("grupoId")?.toString();

  if (!jovenId || !grupoId) return { error: "Faltan datos." };

  try {
    await prisma.joven.update({
      where: { id: parseInt(jovenId) },
      data: { grupoId: parseInt(grupoId) }
    });

    revalidatePath(`/admin/grupos/${grupoId}`);
    return { success: "¡Miembro añadido correctamente!" };
  } catch (error) {
    return { error: "Error al asignar miembro." };
  }
}

export async function quitarMiembro(formData: FormData) {
    const jovenId = formData.get("jovenId")?.toString();
    const grupoId = formData.get("grupoId")?.toString();
  
    if (!jovenId) return { error: "Error" };
  
    try {
      await prisma.joven.update({
        where: { id: parseInt(jovenId) },
        data: { grupoId: null } 
      });
  
      revalidatePath(`/admin/grupos/${grupoId}`);
      return { success: "Miembro eliminado del grupo." };
    } catch (error) {
      return { error: "Error al eliminar." };
    }
  }
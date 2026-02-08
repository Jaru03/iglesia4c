"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/utils/prisma";       

export async function marcarAsistencia(documento: string) {
  try {
    // Aquí ya debería autocompletarte ".joven"
    const joven = await prisma.joven.findUnique({
      where: { documento: documento },
    });

    if (!joven) {
      return { success: false, error: "❌ No te encuentro. ¡Regístrate primero!" };
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const asistenciaExistente = await prisma.asistencia.findFirst({
      where: {
        jovenId: joven.id,
        fecha: { gte: hoy },
      },
    });

    if (asistenciaExistente) {
      return { success: false, error: `⚠️ ${joven.nombres}, ya marcaste hoy.` };
    }

    await prisma.asistencia.create({
      data: { jovenId: joven.id },
    });

    await prisma.joven.update({
      where: { id: joven.id },
      data: { ultimaVisita: new Date() },
    });

    revalidatePath("/admin/dashboard");
    
    return { success: true, mensaje: `✅ ¡Bienvenido, ${joven.nombres}!` };

  } catch (error) {
    console.error(error);
    return { success: false, error: "Error del servidor." };
  }
}
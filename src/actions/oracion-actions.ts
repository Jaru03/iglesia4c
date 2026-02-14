"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function enviarPeticionOracion(formData: FormData) {
  const nombre = formData.get("nombre")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || null;
  const typePetition = formData.get("typePetition")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  if (!nombre || !email || !typePetition || !content) {
    return { error: "Faltan datos obligatorios." };
  }

  try {
    const persona = await prisma.persona.create({
      data: {
        nombre,
        telefono: phone,
        esNuevo: false,
        esJoven: false,
        estado: "REGULAR",
        conteoVisitas: 1,
      },
    });

    await prisma.peticion.create({
      data: {
        personaId: persona.id,
        motivo: `[Web:${typePetition}] ${content} | Contacto: ${email}`,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/peticiones");
    revalidatePath("/admin/asistencias");

    return { success: "Petición enviada correctamente." };
  } catch (error) {
    console.error("Error enviando petición web:", error);
    return { error: "Hubo un problema al enviar la petición." };
  }
}

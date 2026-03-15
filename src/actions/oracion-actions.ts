"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import emailjs from "@emailjs/browser";

export async function enviarPeticionOracion(formData: FormData) {
  const nombre = formData.get("nombre")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const typePetition = formData.get("typePetition")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  if (!nombre || !email || !phone || !typePetition || !content) {
    return { error: "Faltan datos obligatorios." };
  }

  try {
    await prisma.petition.create({
      data: {
        nombre,
        email,
        phone,
        typePetition,
        content,
        status: "PENDIENTE",
      },
    });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID_API_KEY!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID_API_KEY!,
        { nombre, email, phone, typePetition, content },
        { publicKey: process.env.NEXT_PUBLIC_PUBLIC_ID_API_KEY! }
      );
    } catch (emailError) {
      console.error("Error enviando email:", emailError);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/peticiones");

    return { success: "Petición enviada correctamente." };
  } catch (error) {
    console.error("Error enviando petición:", error);
    return { error: "Hubo un problema al enviar la petición." };
  }
}

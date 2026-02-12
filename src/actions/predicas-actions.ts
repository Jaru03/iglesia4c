"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

// Función auxiliar para sacar la miniatura
function getYouTubeThumbnail(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
  }
  return null;
}

// ✅ CAMBIO: Esta función ahora devuelve Promise<void> (no devuelve nada)
export async function crearPredica(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const urlVideo = formData.get("urlVideo") as string;

  // Si faltan datos, simplemente no hacemos nada (o podrías lanzar un error con throw)
  if (!title || !urlVideo) {
    return; // Return vacío = VOID
  }

  const img = getYouTubeThumbnail(urlVideo) || "/placeholder-video.jpg";

  await prisma.preachs.create({
    data: {
      title,
      description,
      urlVideo,
      img,
    },
  });

  revalidatePath("/admin/predicas");
  revalidatePath("/");
  
  // 🚫 AQUÍ BORRÉ EL "return { success: true }"
}

// ✅ CAMBIO: Esta función también devuelve Promise<void>
export async function eliminarPredica(id: number, _formData: FormData) {
  await prisma.preachs.delete({
    where: { id },
  });
  
  revalidatePath("/admin/predicas");
  
  // 🚫 AQUÍ TAMBIÉN BORRÉ CUALQUIER RETURN
}
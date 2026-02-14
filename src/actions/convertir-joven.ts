"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function convertirAJoven(formData: FormData) {
  const personaId = formData.get("personaId")?.toString();
  const sede = formData.get("sede")?.toString();
  const documento = formData.get("documento")?.toString(); 
  const nombres = formData.get("nombres")?.toString();
  const apellidos = formData.get("apellidos")?.toString();
  const telefono = formData.get("telefono")?.toString();
  const fechaNacimientoStr = formData.get("fechaNacimiento")?.toString();

  if (!nombres || !sede || !personaId || !documento) {
    return { error: "Faltan datos obligatorios (Documento, Nombre o Sede)" };
  }

  try {
    // 1. Verificar si ese documento ya existe en Jovenes
    const existe = await prisma.joven.findUnique({
        where: { documento }
    });
    if (existe) {
        return { error: "Ya existe un joven con ese DNI/Documento." };
    }

    // 2. Crear el Joven oficial
    const nuevoJoven = await prisma.joven.create({
      data: {
        nombres,
        apellidos: apellidos || "",
        documento,
        sede,
        telefono,
        fechaNacimiento: fechaNacimientoStr ? new Date(fechaNacimientoStr) : null,
        activo: true,
        ultimaVisita: new Date(),
      }
    });

    // 3. 🔥 ACTUALIZAR LA VISITA (PERSONA)
    await prisma.persona.update({
        where: { id: personaId },
        data: {
            estado: "EN_GRUPO",
            jovenId: nuevoJoven.id,
            esNuevo: false 
        }
    });

    revalidatePath("/admin/jovenes");
    revalidatePath("/admin/asistencias");

    return { success: "¡Joven registrado y asignado a grupo correctamente!" };

  } catch (error) {
    console.error(error);
    return { error: "Error al registrar. Verifica los datos." };
  }
}
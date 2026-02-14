"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function registrarPersona(formData: FormData) {
  const nombre = formData.get("nombre")?.toString();
  const telefono = formData.get("telefono")?.toString() || null;
  const fechaNacimientoStr = formData.get("fechaNacimiento")?.toString();
  const esJoven = formData.get("esJoven") === "on"; 
  const motivoPeticion = formData.get("peticion")?.toString();

  if (!nombre) return { error: "El nombre es obligatorio" };

  try {
    // 🔥 LÓGICA INTELIGENTE: NUEVO vs REGULAR
    let estado = "NUEVO";
    let conteo = 1;

    if (telefono) {
        // Buscamos cuántas veces ha venido este teléfono antes
        const visitasPrevias = await prisma.persona.count({
            where: { telefono }
        });
        
        conteo = visitasPrevias + 1;

        // Si es la 3ª vez o más, ya es REGULAR
        if (conteo >= 3) {
            estado = "REGULAR";
        }
    }

    // Creamos el registro
    const nuevaPersona = await prisma.persona.create({
      data: {
        nombre,
        telefono,
        FechaNacimiento: fechaNacimientoStr ? new Date(fechaNacimientoStr) : null,
        esNuevo: estado === "NUEVO", // Solo es True si el estado es NUEVO
        estado: estado, // Guardamos "NUEVO" o "REGULAR"
        conteoVisitas: conteo,
        esJoven,
      },
    });

    if (motivoPeticion && motivoPeticion.trim() !== "") {
      await prisma.peticion.create({
        data: { motivo: motivoPeticion, personaId: nuevaPersona.id },
      });
    }

    revalidatePath("/registro");
    revalidatePath("/admin/asistencias");
    revalidatePath("/admin");
    
    return { success: `¡Registro exitoso! (Visita #${conteo})` };

  } catch (error) {
    console.error("Error:", error);
    return { error: "Error en base de datos." };
  }
}

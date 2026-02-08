// src/actions/crear-joven.ts
"use server";

import prisma from "@/utils/prisma"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function crearJoven(formData: FormData) {
  let success = false; // Bandera de control

  try {
    const nombres = formData.get("nombres")?.toString();
    const apellidos = formData.get("apellidos")?.toString();
    const documento = formData.get("documento")?.toString();
    const sede = formData.get("sede")?.toString();
    const fechaNacimientoRaw = formData.get("fechaNacimiento")?.toString();
    const telefonoRaw = formData.get("telefono")?.toString();
    const telefono = (telefonoRaw && telefonoRaw.length > 0) ? telefonoRaw : undefined;

    if (!nombres || !apellidos || !documento || !sede) {
      throw new Error("Faltan datos obligatorios");
    }

    // 1. Guardar en Base de Datos
    await prisma.joven.create({
      data: {
        nombres,
        apellidos,
        documento,
        sede,
        telefono, 
        fechaNacimiento: fechaNacimientoRaw ? new Date(fechaNacimientoRaw) : null,
        activo: true,
        ultimaVisita: new Date(),
      },
    });

    // 2. Si llegamos aquí, todo salió bien
    revalidatePath("/admin/jovenes");
    revalidatePath("/admin/dashboard");
    success = true;

  } catch (error: any) {
    // Si el error es de Prisma por DNI repetido (Código P2002)
    if (error.code === 'P2002') {
      return { error: "El DNI ya está registrado en el sistema." };
    }
    console.error("Error en el servidor:", error);
    return { error: "Ocurrió un error inesperado al guardar." };
  }

  // 3. LA CLAVE: El redirect siempre fuera del try/catch
  if (success) {
    redirect("/admin/jovenes");
  }
}
"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { logAudit } from "./audit-actions";

export async function crearGrupo(formData: FormData) {
  const nombre = formData.get("nombre")?.toString();
  const lider = formData.get("lider")?.toString();
  const direccion = formData.get("direccion")?.toString();
  const dia = formData.get("dia")?.toString();
  const hora = formData.get("hora")?.toString();
  const tipo = formData.get("tipo")?.toString();

  if (!nombre || !lider || !dia) {
    return { error: "Faltan datos obligatorios" };
  }

  try {
    const nuevo = await prisma.grupo.create({
      data: { nombre, lider, direccion: direccion || "", dia, hora: hora || "", tipo: tipo || "Mixto" }
    });

    await logAudit({
      module: "GRUPOS",
      action: "CREATE",
      entity: "Grupo",
      entityId: String(nuevo.id),
      description: `Grupo creado: ${nuevo.nombre}`,
    });

    revalidatePath("/admin/grupos");
    return { success: "¡Grupo de conexión creado!" };
  } catch (error) {
    return { error: "Error al crear el grupo." };
  }
}

export async function eliminarGrupo(formData: FormData) {
  const grupoId = Number(formData.get("grupoId"));

  if (!grupoId || Number.isNaN(grupoId)) {
    return { error: "Grupo inválido." };
  }

  try {
    await prisma.$transaction([
      prisma.joven.updateMany({
        where: { grupoId },
        data: { grupoId: null },
      }),
      prisma.grupo.update({
        where: { id: grupoId },
        data: { activo: false },
      }),
    ]);

    await logAudit({
      module: "GRUPOS",
      action: "DELETE",
      entity: "Grupo",
      entityId: String(grupoId),
      description: `Grupo desactivado: ${grupoId}`,
    });

    revalidatePath("/admin/grupos");
    revalidatePath(`/admin/grupos/${grupoId}`);
    return { success: "Grupo eliminado." };
  } catch (error) {
    return { error: "Error al eliminar el grupo." };
  }
}

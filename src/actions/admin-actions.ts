"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { logAudit } from "./audit-actions";

export async function eliminarJoven(id: number) {
  if (!id) return { error: "ID inválido" };

  try {
    const joven = await prisma.joven.findUnique({ where: { id } });

    await prisma.$transaction([
      prisma.persona.updateMany({
        where: { jovenId: id },
        data: { jovenId: null, estado: "REGULAR" },
      }),
      prisma.asistencia.deleteMany({
        where: { jovenId: id },
      }),
      prisma.joven.delete({
        where: { id },
      }),
    ]);

    await logAudit({
      module: "JOVENES",
      action: "DELETE",
      entity: "Joven",
      entityId: String(id),
      description: `Se eliminó joven: ${joven?.nombres || ""} ${joven?.apellidos || ""}`.trim(),
    });

    revalidatePath("/admin/jovenes");
    revalidatePath("/admin/asistencias");
    revalidatePath("/admin/grupos");
    return { success: "Joven eliminado correctamente." };
  } catch (error) {
    return { error: "No se pudo eliminar el joven." };
  }
}

export async function eliminarPersona(id: string) {
  if (!id) return { error: "ID inválido" };

  try {
    const persona = await prisma.persona.findUnique({ where: { id } });

    await prisma.$transaction([
      prisma.peticion.deleteMany({
        where: { personaId: id },
      }),
      prisma.persona.delete({
        where: { id },
      }),
    ]);

    await logAudit({
      module: "ASISTENCIAS",
      action: "DELETE",
      entity: "Persona",
      entityId: id,
      description: `Se eliminó persona de asistencias: ${persona?.nombre || id}`,
    });

    revalidatePath("/admin/asistencias");
    return { success: "Registro eliminado correctamente." };
  } catch (error) {
    return { error: "No se pudo eliminar el registro." };
  }
}

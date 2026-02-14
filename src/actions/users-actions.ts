"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { logAudit } from "./audit-actions";

export async function agregarUsuario(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  if (!email) return;

  try {
    const nuevo = await prisma.allowedUser.create({
      data: {
        email: email.toLowerCase(),
        name,
        role,
      },
    });
    await logAudit({
      module: "EQUIPO",
      action: "CREATE",
      entity: "AllowedUser",
      entityId: nuevo.id,
      description: `Correo autorizado: ${nuevo.email}`,
    });
    revalidatePath("/admin/equipo");
  } catch (error) {
    console.error("Error creando usuario:", error);

  }
}

export async function eliminarUsuario(id: string) {
  const user = await prisma.allowedUser.delete({
    where: { id },
  });
  await logAudit({
    module: "EQUIPO",
    action: "DELETE",
    entity: "AllowedUser",
    entityId: id,
    description: `Se retiró acceso a: ${user.email}`,
  });
  revalidatePath("/admin/equipo");
}

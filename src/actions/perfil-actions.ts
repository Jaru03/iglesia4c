"use server";

import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function actualizarPerfil(personId: number, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const lastname = formData.get("lastname")?.toString().trim();
  const email = formData.get("email")?.toString().trim() || null;
  const phone = formData.get("phone")?.toString().trim() || null;
  const address = formData.get("address")?.toString().trim() || null;
  const birthDate = formData.get("birthDate")?.toString() || null;

  const currentPassword = formData.get("currentPassword")?.toString();
  const newPassword = formData.get("newPassword")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!name || !lastname) {
    return { error: "El nombre y los apellidos son obligatorios." };
  }

  try {
    const person = await prisma.person.findUnique({
      where: { id: personId },
      include: { user: true },
    });

    if (!person) {
      return { error: "Persona no encontrada." };
    }

    if (newPassword) {
      if (!currentPassword) {
        return { error: "Introduce la contraseña actual." };
      }
      if (!person.user) {
        return { error: "No tienes contraseña configurada." };
      }
      const isValid = await bcrypt.compare(currentPassword, person.user.password);
      if (!isValid) {
        return { error: "La contraseña actual es incorrecta." };
      }
      if (newPassword.length < 6) {
        return { error: "La nueva contraseña debe tener al menos 6 caracteres." };
      }
      if (newPassword !== confirmPassword) {
        return { error: "Las contraseñas no coinciden." };
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: person.user.id },
        data: { password: hash },
      });
    }

    await prisma.person.update({
      where: { id: personId },
      data: {
        name,
        lastname,
        email,
        phone,
        address,
        birthDate: birthDate ? new Date(birthDate) : null,
      },
    });

    revalidatePath("/app/perfil");
    return { success: newPassword ? "Contraseña actualizada correctamente." : "Perfil actualizado correctamente." };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar el perfil." };
  }
}

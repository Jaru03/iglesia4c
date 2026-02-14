"use server";

import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";

const ROLES_VALIDOS = ["SUPERADMIN", "ADMIN", "LIDER", "REGISTRO"] as const;
type RolValido = (typeof ROLES_VALIDOS)[number];

export async function registrarUsuarioPermitido(formData: FormData) {
  const nombre = formData.get("nombre")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const permitido = await prisma.allowedUser.findUnique({
    where: { email },
  });

  if (!permitido) {
    return { error: "Tu correo no está autorizado por el superadmin." };
  }

  const yaExiste = await prisma.user.findUnique({
    where: { email },
  });

  if (yaExiste) {
    return { error: "Este correo ya está registrado. Inicia sesión." };
  }

  const hash = await bcrypt.hash(password, 10);
  const rolPermitido = permitido.role.toUpperCase();
  const role: RolValido = ROLES_VALIDOS.includes(rolPermitido as RolValido)
    ? (rolPermitido as RolValido)
    : "LIDER";

  await prisma.user.create({
    data: {
      email,
      password: hash,
      nombre: nombre || permitido.name || email.split("@")[0],
      role,
    },
  });

  return { success: "Cuenta creada. Ya puedes iniciar sesión." };
}

"use server";

import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";

export async function verificarPersona(formData: FormData) {
  const dato = formData.get("dato")?.toString().trim();

  if (!dato) {
    return { error: "Ingresa tu email, teléfono o documento." };
  }

  const persona = await prisma.person.findFirst({
    where: {
      OR: [
        { email: dato },
        { phone: dato },
        { document: dato },
      ],
    },
    include: { user: true },
  });

  if (!persona) {
    return { error: "No encontramos tus datos. Contacta con tu líder." };
  }

  if (persona.user) {
    return { error: "Ya tienes una cuenta. Inicia sesión." };
  }

  return { 
    personaId: persona.id, 
    nombre: `${persona.name} ${persona.lastname}`,
    email: persona.email 
  };
}

export async function completarRegistro(formData: FormData) {
  const personaId = parseInt(formData.get("personaId")?.toString() || "0");
  const password = formData.get("password")?.toString();
  const passwordConfirm = formData.get("passwordConfirm")?.toString();

  if (!personaId || !password || !passwordConfirm) {
    return { error: "Todos los campos son obligatorios." };
  }

  if (password !== passwordConfirm) {
    return { error: "Las contraseñas no coinciden." };
  }

  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const persona = await prisma.person.findUnique({
    where: { id: personaId },
    include: { user: true },
  });

  if (!persona) {
    return { error: "Usuario no encontrado." };
  }

  if (persona.user) {
    return { error: "Ya tienes una cuenta. Inicia sesión." };
  }

  const hash = await bcrypt.hash(password, 10);

  await prisma.$transaction([
    prisma.user.create({
      data: {
        password: hash,
        role: "USER",
        personId: persona.id,
      },
    }),
    prisma.person.update({
      where: { id: persona.id },
      data: { membershipStatus: "MEMBER" },
    }),
  ]);

  return { success: "Cuenta creada. Ya puedes iniciar sesión." };
}

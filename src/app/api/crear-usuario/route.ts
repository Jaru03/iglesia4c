// src/app/api/crear-usuario/route.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const hashedPassword = await bcrypt.hash("CasaDeDios..", 10);
  try {
    const user = await prisma.user.create({
      data: {
        email: "castilla@iglesia.com", 
        password: hashedPassword,       
        nombre: "Arthur Jefe",
        role: "ADMIN",
        sede: "Central"
      },
    });
    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
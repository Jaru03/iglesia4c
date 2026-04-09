import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { requireApiAuth } from "@/lib/auth-helpers";

export async function POST(request: Request) {
  const auth = await requireApiAuth();
  if (!auth.ok) return auth.response;

  try {
    const { personId, activityId } = await request.json();

    if (!personId || !activityId) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    const existing = await prisma.attendance.findUnique({
      where: { personId_activityId: { personId, activityId } },
    });

    if (existing) {
      return NextResponse.json({ error: "Ya estás registrado en esta actividad" }, { status: 400 });
    }

    await prisma.attendance.create({
      data: { personId, activityId, attended: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error registering attendance:", error);
    return NextResponse.json({ error: "Error al registrar asistencia" }, { status: 500 });
  }
}

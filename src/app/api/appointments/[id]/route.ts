import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";

// PATCH: cambiar status de una cita
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const userId = Number(session.user.id);
  const body = await req.json();
  const { status } = body;

  const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
  if (!status || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  const appointment = await prisma.appointment.findUnique({ where: { id: Number(id) } });
  if (!appointment) return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });

  // Solo el responsable o el propio usuario pueden modificar
  const isResponsable = session.user.role === "RESPONSIBLE" && appointment.responsableId === userId;
  const isOwner = appointment.userId === userId;

  if (!isResponsable && !isOwner) {
    return NextResponse.json({ error: "Sin permiso" }, { status: 403 });
  }

  // Usuarios normales solo pueden cancelar
  if (!isResponsable && status !== "CANCELLED") {
    return NextResponse.json({ error: "Solo puedes cancelar tu cita" }, { status: 403 });
  }

  const updated = await prisma.appointment.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json(updated);
}

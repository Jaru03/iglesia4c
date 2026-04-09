import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";
import {
  sendConfirmationEmail,
  sendConfirmationToResponsable,
} from "@/lib/email";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// GET: listar citas
// - RESPONSIBLE: sus citas como anfitrión
// - otros: sus propias citas
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = Number(session.user.id);
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where: Record<string, unknown> =
    session.user.role === "RESPONSIBLE"
      ? { responsableId: userId }
      : { userId };

  if (status) where.status = status;

  const appointments = await prisma.appointment.findMany({
    where,
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    include: {
      responsable: { include: { person: { select: { name: true, lastname: true, email: true } } } },
      user: { include: { person: { select: { name: true, lastname: true, email: true } } } },
    },
  });

  return NextResponse.json(appointments);
}

// POST: crear cita
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = Number(session.user.id);
  const body = await req.json();
  const { responsableId, date, startTime, endTime, notes } = body;

  if (!responsableId || !date || !startTime || !endTime) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  // Verificar que el slot sigue disponible
  const startOfDay = new Date(date + "T00:00:00.000Z");
  const endOfDay = new Date(date + "T23:59:59.999Z");

  const conflict = await prisma.appointment.findFirst({
    where: {
      responsableId: Number(responsableId),
      date: { gte: startOfDay, lte: endOfDay },
      startTime,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  if (conflict) {
    return NextResponse.json({ error: "Este horario ya no está disponible" }, { status: 409 });
  }

  // Obtener churchId del responsable
  const responsableUser = await prisma.user.findUnique({
    where: { id: Number(responsableId) },
    include: {
      person: { select: { name: true, lastname: true, email: true } },
      churchLeaderRoles: { select: { churchId: true } },
    },
  });

  if (!responsableUser) {
    return NextResponse.json({ error: "Responsable no encontrado" }, { status: 404 });
  }

  const churchId = responsableUser.churchLeaderRoles[0]?.churchId;
  if (!churchId) {
    return NextResponse.json({ error: "El responsable no tiene iglesia asignada" }, { status: 400 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { person: { select: { name: true, lastname: true, email: true } } },
  });

  if (!currentUser) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const appointment = await prisma.appointment.create({
    data: {
      responsableId: Number(responsableId),
      userId,
      churchId,
      date: new Date(date + "T00:00:00.000Z"),
      startTime,
      endTime,
      notes: notes ?? null,
    },
  });

  // Emails en segundo plano (no bloqueamos la respuesta)
  const dateLabel = format(new Date(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  const userName = `${currentUser.person.name} ${currentUser.person.lastname}`;
  const responsableName = `${responsableUser.person.name} ${responsableUser.person.lastname}`;

  if (currentUser.person.email) {
    sendConfirmationEmail({
      toName: userName,
      toEmail: currentUser.person.email,
      responsableName,
      date: dateLabel,
      startTime,
      endTime,
      notes: notes ?? undefined,
    }).catch(console.error);
  }

  if (responsableUser.person.email) {
    sendConfirmationToResponsable({
      toName: userName,
      toEmail: currentUser.person.email ?? "",
      responsableName,
      responsableEmail: responsableUser.person.email,
      date: dateLabel,
      startTime,
      endTime,
      notes: notes ?? undefined,
    }).catch(console.error);
  }

  return NextResponse.json(appointment, { status: 201 });
}

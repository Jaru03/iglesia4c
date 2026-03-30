import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";

function generateSlots(
  startTime: string,
  endTime: string,
  slotDuration: number
): { start: string; end: string }[] {
  const slots: { start: string; end: string }[] = [];
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  let current = startH * 60 + startM;
  const end = endH * 60 + endM;

  while (current + slotDuration <= end) {
    const slotStart = `${String(Math.floor(current / 60)).padStart(2, "0")}:${String(current % 60).padStart(2, "0")}`;
    const slotEnd = `${String(Math.floor((current + slotDuration) / 60)).padStart(2, "0")}:${String((current + slotDuration) % 60).padStart(2, "0")}`;
    slots.push({ start: slotStart, end: slotEnd });
    current += slotDuration;
  }

  return slots;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { userId } = await params;
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) return NextResponse.json({ error: "date requerido" }, { status: 400 });

  const date = new Date(dateParam);
  const dayOfWeek = date.getDay();

  // Obtener todas las franjas del día (puede haber 1 o 2)
  const availabilities = await prisma.availability.findMany({
    where: { userId: Number(userId), dayOfWeek },
    orderBy: { slotIndex: "asc" },
  });

  if (availabilities.length === 0) return NextResponse.json([]);

  // Citas ya reservadas ese día
  const startOfDay = new Date(dateParam + "T00:00:00.000Z");
  const endOfDay = new Date(dateParam + "T23:59:59.999Z");

  const booked = await prisma.appointment.findMany({
    where: {
      responsableId: Number(userId),
      date: { gte: startOfDay, lte: endOfDay },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    select: { startTime: true },
  });

  const bookedSet = new Set(booked.map((b) => b.startTime));

  // Generar slots de todas las franjas, unir y ordenar
  const slotDuration = availabilities[0].slotDuration;
  const allSlots = availabilities
    .flatMap((av) => generateSlots(av.startTime, av.endTime, slotDuration))
    .sort((a, b) => a.start.localeCompare(b.start))
    .map((s) => ({ ...s, taken: bookedSet.has(s.start) }));

  return NextResponse.json(allSlots);
}

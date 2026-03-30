import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";

// GET: disponibilidad del responsable autenticado
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.user.role !== "RESPONSIBLE") return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const userId = Number(session.user.id);
  const availability = await prisma.availability.findMany({
    where: { userId },
    orderBy: [{ dayOfWeek: "asc" }, { slotIndex: "asc" }],
  });

  return NextResponse.json(availability);
}

// POST: guardar/actualizar franjas (upsert por día+slotIndex)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.user.role !== "RESPONSIBLE") return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const userId = Number(session.user.id);
  const body = await req.json();
  const items: { dayOfWeek: number; slotIndex: number; startTime: string; endTime: string; slotDuration: number }[] =
    Array.isArray(body) ? body : [body];

  const results = await Promise.all(
    items.map((item) =>
      prisma.availability.upsert({
        where: {
          userId_dayOfWeek_slotIndex: {
            userId,
            dayOfWeek: item.dayOfWeek,
            slotIndex: item.slotIndex,
          },
        },
        update: {
          startTime: item.startTime,
          endTime: item.endTime,
          slotDuration: item.slotDuration,
        },
        create: {
          userId,
          dayOfWeek: item.dayOfWeek,
          slotIndex: item.slotIndex,
          startTime: item.startTime,
          endTime: item.endTime,
          slotDuration: item.slotDuration,
        },
      })
    )
  );

  return NextResponse.json(results);
}

// DELETE: eliminar franjas de un día
// ?dayOfWeek=N            → elimina todas las franjas del día
// ?dayOfWeek=N&slotIndex=M → elimina solo esa franja
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.user.role !== "RESPONSIBLE") return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const userId = Number(session.user.id);
  const { searchParams } = new URL(req.url);
  const dayOfWeek = searchParams.get("dayOfWeek");
  const slotIndex = searchParams.get("slotIndex");

  if (dayOfWeek === null) return NextResponse.json({ error: "dayOfWeek requerido" }, { status: 400 });

  if (slotIndex !== null) {
    await prisma.availability.deleteMany({
      where: { userId, dayOfWeek: Number(dayOfWeek), slotIndex: Number(slotIndex) },
    });
  } else {
    await prisma.availability.deleteMany({
      where: { userId, dayOfWeek: Number(dayOfWeek) },
    });
  }

  return NextResponse.json({ success: true });
}

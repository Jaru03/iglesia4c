import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";

// GET /api/admin/availability/[userId]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const { userId } = await params;
  const availability = await prisma.availability.findMany({
    where: { userId: Number(userId) },
    orderBy: [{ dayOfWeek: "asc" }, { slotIndex: "asc" }],
  });
  return NextResponse.json(availability);
}

// POST /api/admin/availability/[userId]  body: array of slots
export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const { userId } = await params;
  const uid = Number(userId);
  const body = await req.json();
  const items: { dayOfWeek: number; slotIndex: number; startTime: string; endTime: string; slotDuration: number }[] =
    Array.isArray(body) ? body : [body];

  const results = await Promise.all(
    items.map((item) =>
      prisma.availability.upsert({
        where: { userId_dayOfWeek_slotIndex: { userId: uid, dayOfWeek: item.dayOfWeek, slotIndex: item.slotIndex } },
        update: { startTime: item.startTime, endTime: item.endTime, slotDuration: item.slotDuration },
        create: { userId: uid, dayOfWeek: item.dayOfWeek, slotIndex: item.slotIndex, startTime: item.startTime, endTime: item.endTime, slotDuration: item.slotDuration },
      })
    )
  );
  return NextResponse.json(results);
}

// DELETE /api/admin/availability/[userId]?dayOfWeek=N&slotIndex=M
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const { userId } = await params;
  const uid = Number(userId);
  const { searchParams } = new URL(req.url);
  const dayOfWeek = searchParams.get("dayOfWeek");
  const slotIndex = searchParams.get("slotIndex");

  if (dayOfWeek === null) return NextResponse.json({ error: "dayOfWeek requerido" }, { status: 400 });

  if (slotIndex !== null) {
    await prisma.availability.deleteMany({ where: { userId: uid, dayOfWeek: Number(dayOfWeek), slotIndex: Number(slotIndex) } });
  } else {
    await prisma.availability.deleteMany({ where: { userId: uid, dayOfWeek: Number(dayOfWeek) } });
  }
  return NextResponse.json({ success: true });
}

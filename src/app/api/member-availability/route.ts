import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";

// GET: availability for the current user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = Number(session.user.id);
  const availability = await prisma.memberAvailability.findMany({ where: { userId } });
  return NextResponse.json(availability);
}

// POST: save general availability for the current user
// body: { days: number[] }
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const userId = Number(session.user.id);
  const { days } = await req.json() as { days: number[] };

  await prisma.memberAvailability.deleteMany({ where: { userId } });

  if (days.length > 0) {
    await prisma.memberAvailability.createMany({
      data: days.map((dayOfWeek) => ({ userId, dayOfWeek })),
    });
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";

// GET /api/responsable/availability/[userId]
// Allows a RESPONSIBLE to view an OBRERO's availability (read-only)
// when the OBRERO belongs to one of the responsable's churches.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.user.role !== "RESPONSIBLE") return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const { userId } = await params;
  const targetId = Number(userId);

  const responsableChurchIds = (
    await prisma.churchLeader.findMany({
      where: { userId: Number(session.user.id), role: "RESPONSIBLE" },
      select: { churchId: true },
    })
  ).map((c) => c.churchId);

  if (responsableChurchIds.length === 0) {
    return NextResponse.json({ error: "Sin permiso" }, { status: 403 });
  }

  const target = await prisma.user.findUnique({
    where: { id: targetId },
    select: { role: true, person: { select: { churchId: true } } },
  });

  if (
    !target ||
    target.role !== "OBRERO" ||
    target.person.churchId == null ||
    !responsableChurchIds.includes(target.person.churchId)
  ) {
    return NextResponse.json({ error: "Sin permiso" }, { status: 403 });
  }

  const availability = await prisma.availability.findMany({
    where: { userId: targetId },
    orderBy: [{ dayOfWeek: "asc" }, { slotIndex: "asc" }],
  });

  return NextResponse.json(availability);
}

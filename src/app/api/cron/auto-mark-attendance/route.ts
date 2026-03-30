import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// GET /api/cron/auto-mark-attendance
// Run daily. Marks pre-registered attendances as absent if activity ended more than 7 days ago.
export async function GET(req: Request) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Find attendance records that are pre-registered but not attended, for activities older than 1 week
  const toMark = await prisma.attendance.findMany({
    where: {
      preRegistered: true,
      attended: false,
      autoMarked: false,
      activity: { hourStart: { lt: oneWeekAgo } },
    },
    select: { id: true },
  });

  if (toMark.length > 0) {
    await prisma.attendance.updateMany({
      where: { id: { in: toMark.map((a) => a.id) } },
      data: { autoMarked: true },
    });
  }

  return NextResponse.json({ marked: toMark.length });
}

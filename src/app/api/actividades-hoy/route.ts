import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Fecha requerida" }, { status: 400 });
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const actividades = await prisma.activity.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      department: { select: { name: true } },
    },
    orderBy: {
      hourStart: "asc",
    },
  });

  return NextResponse.json(
    actividades.map((a) => ({
      id: a.id,
      title: a.title,
      date: a.date.toISOString(),
      hourStart: a.hourStart.toISOString(),
      department: a.department,
    }))
  );
}

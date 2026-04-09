import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { requireApiAuth } from "@/lib/auth-helpers";

// Public: used by the public calendar widget on the landing page
export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      where: { isCulto: false, hourStart: { gte: new Date() } },
      orderBy: { hourStart: "asc" },
      take: 3,
    });
    return NextResponse.json(activities);
  } catch {
    return NextResponse.json({ error: "Error al cargar actividades" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireApiAuth(["ADMIN", "RESPONSIBLE", "LEADER"]);
  if (!auth.ok) return auth.response;

  try {
    const data = await request.json();

    if (!data?.departmentId) {
      return NextResponse.json({ error: "departmentId es requerido" }, { status: 400 });
    }

    const newActivity = await prisma.activity.create({
      data: {
        title: data?.title,
        description: data?.description,
        place: data?.place,
        hourStart: new Date(data?.hourStart),
        hourEnd: new Date(data?.hourEnd),
        date: new Date(data?.date || data?.hourStart),
        showCalendar: data?.showCalendar ?? true,
        img:
          data?.img ||
          "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
        departmentId: data.departmentId,
      },
    });

    return NextResponse.json(newActivity);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creando actividad" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireApiAuth(["ADMIN", "RESPONSIBLE", "LEADER"]);
  if (!auth.ok) return auth.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    await prisma.activity.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error eliminando" }, { status: 500 });
  }
}

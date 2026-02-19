import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      where: {
        hourStart: {
          gte: new Date(),
        },
      },
      orderBy: { hourStart: "asc" },
      take: 3,
    });
    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al cargar actividades" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

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
      },
    });

    return NextResponse.json(newActivity);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando actividad" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    await prisma.activity.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error eliminando" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const activities = await prisma.activities.findMany({
      orderBy: { hour_start: 'asc' } 
    });
    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json({ error: "Error al cargar actividades" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const data = await request.json();


    const newActivity = await prisma.activities.create({
      data: {
        title: data.title,
        description: data.description,
        place: data.place,
        hour_start: new Date(data.hour_start),
        hour_end: new Date(data.hour_end),
        urgent: data.urgent === "true" || data.urgent === true, 
        img: data.img || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop" // Imagen por defecto si no ponen nada
      },
    });

    return NextResponse.json(newActivity);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creando actividad" }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    await prisma.activities.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error eliminando" }, { status: 500 });
  }
}
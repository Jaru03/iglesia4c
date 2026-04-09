import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";

// GET /api/team-calendar/cargos?departmentId=N
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const departmentId = Number(searchParams.get("departmentId"));
  if (!departmentId) return NextResponse.json({ error: "departmentId requerido" }, { status: 400 });

  const cargos = await prisma.departmentCargo.findMany({
    where: { departmentId },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return NextResponse.json(cargos);
}

// POST /api/team-calendar/cargos  { departmentId, name }
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { role } = session.user;
  if (!["ADMIN", "LEADER"].includes(role))
    return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const { departmentId, name } = await req.json();
  if (!departmentId || !name?.trim())
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });

  try {
    const cargo = await prisma.departmentCargo.create({
      data: { departmentId: Number(departmentId), name: name.trim() },
      select: { id: true, name: true },
    });
    return NextResponse.json(cargo, { status: 201 });
  } catch {
    return NextResponse.json({ error: "El cargo ya existe" }, { status: 409 });
  }
}

// DELETE /api/team-calendar/cargos?id=N
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { role } = session.user;
  if (!["ADMIN", "LEADER"].includes(role))
    return NextResponse.json({ error: "Sin permisos" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

  await prisma.departmentCargo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";
import { canManageDepartment } from "@/lib/auth-helpers";
import type { Session } from "next-auth";

/** Resolve calendarId → departmentId, then verify LEADER/ADMIN has access */
async function verifyCalendarAccess(
  calendarId: number,
  user: Session["user"]
): Promise<NextResponse | null> {
  const calendar = await prisma.teamCalendar.findUnique({
    where: { id: calendarId },
    select: { departmentId: true },
  });
  if (!calendar) {
    return NextResponse.json({ error: "Calendario no encontrado" }, { status: 404 });
  }
  const allowed = await canManageDepartment(user, calendar.departmentId);
  if (!allowed) {
    return NextResponse.json({ error: "Sin permisos sobre ese departamento" }, { status: 403 });
  }
  return null; // OK
}

// GET: entries for a specific calendar + date (for member team dialog)
// ?date=YYYY-MM-DD
export async function GET(
  req: Request,
  { params }: { params: Promise<{ calendarId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { calendarId } = await params;
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");
  if (!dateParam) return NextResponse.json({ error: "date requerido" }, { status: 400 });

  const date = new Date(`${dateParam}T00:00:00.000Z`);
  const nextDay = new Date(date.getTime() + 86400000);

  const entries = await prisma.calendarEntry.findMany({
    where: {
      calendarId: Number(calendarId),
      date: { gte: date, lt: nextDay },
    },
    include: {
      user: { include: { person: { select: { name: true, lastname: true } } } },
    },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(
    entries.map((e) => ({
      id: e.id,
      userName: e.user ? `${e.user.person.name} ${e.user.person.lastname}` : "Sin asignar",
      task: e.task,
      notes: e.notes,
    }))
  );
}

// POST: add entry to calendar
// body: { date: string, userId?: number, task?: string, notes?: string }
export async function POST(
  req: Request,
  { params }: { params: Promise<{ calendarId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (!["LEADER", "ADMIN", "RESPONSIBLE"].includes(session.user.role))
    return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const { calendarId } = await params;
  const calId = Number(calendarId);

  const deny = await verifyCalendarAccess(calId, session.user);
  if (deny) return deny;

  const { date, userId, task, notes } = await req.json();

  if (userId) {
    const dateObj = new Date(`${date}T00:00:00.000Z`);
    const nextDay = new Date(dateObj.getTime() + 86400000);
    const conflict = await prisma.calendarEntry.findFirst({
      where: { userId, date: { gte: dateObj, lt: nextDay } },
      include: { calendar: { select: { department: { select: { name: true } } } } },
    });
    if (conflict) {
      const deptName = conflict.calendar?.department?.name ?? "otro calendario";
      return NextResponse.json(
        { error: `Esta persona ya está asignada en "${deptName}" ese día` },
        { status: 409 }
      );
    }
  }

  const entry = await prisma.calendarEntry.create({
    data: {
      calendarId: calId,
      date: new Date(date),
      userId: userId ?? null,
      task: task ?? null,
      notes: notes ?? null,
    },
    include: {
      user: { include: { person: { select: { name: true, lastname: true } } } },
    },
  });

  return NextResponse.json(entry);
}

// DELETE: remove entry
// ?entryId=N
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ calendarId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (!["LEADER", "ADMIN", "RESPONSIBLE"].includes(session.user.role))
    return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const { calendarId } = await params;
  const calId = Number(calendarId);

  const deny = await verifyCalendarAccess(calId, session.user);
  if (deny) return deny;

  const { searchParams } = new URL(req.url);
  const entryId = Number(searchParams.get("entryId"));
  if (!entryId) return NextResponse.json({ error: "entryId requerido" }, { status: 400 });

  await prisma.calendarEntry.delete({ where: { id: entryId } });
  return NextResponse.json({ success: true });
}

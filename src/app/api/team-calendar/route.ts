import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";
import { format } from "date-fns";

// GET: get (or create) calendar for departmentId + month + year, with entries + member exceptions
// ?departmentId=N&month=M&year=Y
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const departmentId = Number(searchParams.get("departmentId"));
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  if (!departmentId || !month || !year)
    return NextResponse.json({ error: "Parámetros requeridos" }, { status: 400 });

  const [calendar, personMembers, deptMembers] = await Promise.all([
    prisma.teamCalendar.upsert({
      where: { departmentId_month_year: { departmentId, month, year } },
      create: { departmentId, month, year },
      update: {},
      include: {
        entries: {
          orderBy: [{ date: "asc" }],
          include: {
            user: { include: { person: { select: { name: true, lastname: true } } } },
          },
        },
      },
    }),
    prisma.personDepartment.findMany({
      where: { departmentId, active: true },
      select: { person: { select: { user: { select: { id: true } } } } },
    }),
    prisma.departmentMember.findMany({
      where: { departmentId, active: true },
      select: { userId: true },
    }),
  ]);

  // Collect all user IDs in this department
  const userIds = [
    ...new Set([
      ...personMembers.flatMap((p) => (p.person.user ? [p.person.user.id] : [])),
      ...deptMembers.map((d) => d.userId),
    ]),
  ];

  const monthStart = new Date(Date.UTC(year, month - 1, 1));
  const monthEnd = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  const [exceptions, busyEntries] = await Promise.all([
    prisma.memberUnavailableDate.findMany({
      where: { userId: { in: userIds }, date: { gte: monthStart, lte: monthEnd } },
      select: { userId: true, date: true },
    }),
    // Entries from OTHER calendars (other departments) for these members this month
    prisma.calendarEntry.findMany({
      where: {
        userId: { in: userIds },
        calendarId: { not: calendar.id },
        date: { gte: monthStart, lte: monthEnd },
      },
      select: {
        userId: true,
        date: true,
        calendar: { select: { department: { select: { name: true } } } },
      },
    }),
  ]);

  return NextResponse.json({
    ...calendar,
    memberExceptions: exceptions.map((e) => ({
      userId: e.userId,
      date: format(e.date, "yyyy-MM-dd"),
    })),
    memberBusyDates: busyEntries.map((e) => ({
      userId: e.userId,
      date: format(e.date, "yyyy-MM-dd"),
      departmentName: e.calendar.department.name,
    })),
  });
}

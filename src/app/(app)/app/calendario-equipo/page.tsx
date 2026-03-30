import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { format } from "date-fns";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LeaderCalendarView } from "./components/LeaderCalendarView";
import { AdminCalendarioFilters } from "./components/AdminCalendarioFilters";
import { LeaderCalendarioFilters } from "./components/LeaderCalendarioFilters";

export const dynamic = "force-dynamic";

export default async function CalendarioEquipoPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string; church?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role } = session.user;
  const userId = Number(session.user.id);

  // ── ADMIN: gestor de todos los calendarios ──
  if (role === "ADMIN") {
    const { dept, church } = await searchParams;

    const [churches, allDepartments] = await Promise.all([
      prisma.church.findMany({
        where: { active: true },
        orderBy: { title: "asc" },
        select: { id: true, title: true },
      }),
      prisma.department.findMany({
        where: { active: true },
        orderBy: { name: "asc" },
        select: { id: true, name: true, churchId: true },
      }),
    ]);

    if (allDepartments.length === 0) {
      return (
        <div className="max-w-7xl mx-auto p-4 pb-6 space-y-4 h-[100vh] overflow-auto">
          <DashboardHeader title="Gestión de Calendarios" subtitle="No hay departamentos activos." />
        </div>
      );
    }

    const selectedChurchId = church ? parseInt(church) : null;
    const selectedDeptId = dept ? parseInt(dept) : null;
    const isReady = !!selectedChurchId && !!selectedDeptId;

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Only fetch calendar data when both church and dept are selected
    let calendarProps = {
      departmentId: 0,
      calendarId: 0,
      members: [] as { userId: number; name: string; availableDays: number[] }[],
      initialEntries: [] as { id: number; date: string; userId: number | null; task: string | null; notes: string | null; userName: string | null }[],
      initialExceptions: [] as { userId: number; date: string }[],
      initialBusyDates: [] as { userId: number; date: string; departmentName: string }[],
      initialCargos: [] as { id: number; name: string }[],
      initialMonth: month,
      initialYear: year,
    };

    let subtitle = "Selecciona una iglesia y departamento para continuar.";

    if (isReady) {
      const filteredDepts = allDepartments.filter((d) => d.churchId === selectedChurchId);
      const selectedDept = filteredDepts.find((d) => d.id === selectedDeptId)
        ?? allDepartments.find((d) => d.id === selectedDeptId);

      if (selectedDept) {
        const departmentId = selectedDept.id;
        subtitle = selectedDept.name;

        const [personMembers, userMembers, calendar, cargos] = await Promise.all([
          prisma.personDepartment.findMany({
            where: { departmentId, active: true, person: { churchId: selectedChurchId } },
            include: {
              person: {
                select: {
                  id: true, name: true, lastname: true,
                  user: { select: { id: true, memberAvailabilities: { select: { dayOfWeek: true } } } },
                },
              },
            },
          }),
          prisma.departmentMember.findMany({
            where: { departmentId, active: true, user: { person: { churchId: selectedChurchId } } },
            include: {
              user: {
                include: {
                  person: { select: { id: true, name: true, lastname: true } },
                  memberAvailabilities: { select: { dayOfWeek: true } },
                },
              },
            },
          }),
          prisma.teamCalendar.upsert({
            where: { departmentId_month_year: { departmentId, month, year } },
            create: { departmentId, month, year },
            update: {},
            include: {
              entries: {
                orderBy: { date: "asc" },
                include: { user: { include: { person: { select: { name: true, lastname: true } } } } },
              },
            },
          }),
          prisma.departmentCargo.findMany({
            where: { departmentId },
            orderBy: { name: "asc" },
            select: { id: true, name: true },
          }),
        ]);

        const memberMap = new Map<number, { userId: number; name: string; availableDays: number[] }>();
        for (const pm of personMembers) {
          if (pm.person.user) {
            const uid = pm.person.user.id;
            if (!memberMap.has(uid)) {
              memberMap.set(uid, {
                userId: uid,
                name: `${pm.person.name} ${pm.person.lastname}`,
                availableDays: pm.person.user.memberAvailabilities.map((a) => a.dayOfWeek),
              });
            }
          }
        }
        for (const dm of userMembers) {
          const uid = dm.user.id;
          if (!memberMap.has(uid)) {
            memberMap.set(uid, {
              userId: uid,
              name: `${dm.user.person.name} ${dm.user.person.lastname}`,
              availableDays: dm.user.memberAvailabilities.map((a) => a.dayOfWeek),
            });
          }
        }

        const members = Array.from(memberMap.values());
        const memberUserIds = members.map((m) => m.userId);
        const monthStart = new Date(Date.UTC(year, month - 1, 1));
        const monthEnd = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

        const [exceptions, busyEntries] = memberUserIds.length > 0
          ? await Promise.all([
              prisma.memberUnavailableDate.findMany({
                where: { userId: { in: memberUserIds }, date: { gte: monthStart, lte: monthEnd } },
                select: { userId: true, date: true },
              }),
              prisma.calendarEntry.findMany({
                where: {
                  userId: { in: memberUserIds },
                  calendarId: { not: calendar.id },
                  date: { gte: monthStart, lte: monthEnd },
                },
                select: { userId: true, date: true, calendar: { select: { department: { select: { name: true } } } } },
              }),
            ])
          : [[], []];

        calendarProps = {
          departmentId,
          calendarId: calendar.id,
          members,
          initialEntries: calendar.entries.map((e) => ({
            id: e.id,
            date: e.date.toISOString(),
            userId: e.userId,
            task: e.task,
            notes: e.notes,
            userName: e.user ? `${e.user.person.name} ${e.user.person.lastname}` : null,
          })),
          initialExceptions: exceptions.map((e) => ({ userId: e.userId, date: format(e.date, "yyyy-MM-dd") })),
          initialBusyDates: (busyEntries as { userId: number | null; date: Date; calendar: { department: { name: string } } }[])
            .filter((e) => e.userId !== null)
            .map((e) => ({ userId: e.userId as number, date: format(e.date, "yyyy-MM-dd"), departmentName: e.calendar.department.name })),
          initialCargos: cargos,
          initialMonth: month,
          initialYear: year,
        };
      }
    }

    const overlayMessage = !selectedChurchId
      ? "Abre los filtros y selecciona una iglesia para empezar"
      : "Ahora selecciona un departamento en los filtros";

    return (
      <div className="max-w-7xl mx-auto p-4 pb-6 space-y-4 h-[100vh] overflow-auto">
        <DashboardHeader title="Gestión de Calendarios" subtitle={subtitle} />
        <div className="relative">
          <div className={!isReady ? "pointer-events-none select-none" : ""}>
            <LeaderCalendarView key={`${calendarProps.departmentId}-${calendarProps.calendarId}`} {...calendarProps} />
          </div>
          {!isReady && (
            <div className="absolute inset-0 z-10 rounded-xl backdrop-blur-sm bg-background/50 flex flex-col items-center justify-center gap-3">
              <p className="text-sm font-semibold text-foreground">{overlayMessage}</p>
              <p className="text-xs text-muted-foreground">Pulsa el botón de filtros <span className="font-medium">↘</span></p>
            </div>
          )}
        </div>
        <AdminCalendarioFilters
          churches={churches}
          departments={allDepartments}
          selectedChurchId={selectedChurchId}
          selectedDeptId={selectedDeptId}
        />
      </div>
    );
  }

  // ── LEADER ──
  if (role === "LEADER") {
    const { dept } = await searchParams;

    const leaderMemberships = await prisma.departmentMember.findMany({
      where: { userId, roleInDept: "LEADER", active: true },
      include: { department: { select: { id: true, name: true } } },
      orderBy: { department: { name: "asc" } },
    });

    if (leaderMemberships.length === 0) redirect("/app/dashboard");

    const allDepts = leaderMemberships.map((m) => m.department);
    const paramDeptId = dept ? parseInt(dept) : NaN;
    const isValid = !isNaN(paramDeptId) && allDepts.some((d) => d.id === paramDeptId);
    const departmentId = isValid ? paramDeptId : allDepts[0].id;
    const department = allDepts.find((d) => d.id === departmentId)!;

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Fetch members + calendar + exceptions in parallel
    const [personMembers, userMembers, calendar, memberExceptions] = await Promise.all([
      prisma.personDepartment.findMany({
        where: { departmentId, active: true },
        include: {
          person: {
            select: {
              id: true,
              name: true,
              lastname: true,
              user: {
                select: {
                  id: true,
                  memberAvailabilities: { select: { dayOfWeek: true } },
                },
              },
            },
          },
        },
      }),
      prisma.departmentMember.findMany({
        where: { departmentId, active: true },
        include: {
          user: {
            include: {
              person: { select: { id: true, name: true, lastname: true } },
              memberAvailabilities: { select: { dayOfWeek: true } },
            },
          },
        },
      }),
      prisma.teamCalendar.upsert({
        where: { departmentId_month_year: { departmentId, month, year } },
        create: { departmentId, month, year },
        update: {},
        include: {
          entries: {
            orderBy: { date: "asc" },
            include: {
              user: { include: { person: { select: { name: true, lastname: true } } } },
            },
          },
        },
      }),
      // Exceptions for all members this month (fetched after members are known — we'll re-query below)
      Promise.resolve([] as { userId: number; date: Date }[]),
    ]);

    // Merge and deduplicate members by userId
    const memberMap = new Map<number, { userId: number; name: string; availableDays: number[] }>();

    for (const pm of personMembers) {
      if (pm.person.user) {
        const uid = pm.person.user.id;
        if (!memberMap.has(uid)) {
          memberMap.set(uid, {
            userId: uid,
            name: `${pm.person.name} ${pm.person.lastname}`,
            availableDays: pm.person.user.memberAvailabilities.map((a) => a.dayOfWeek),
          });
        }
      }
    }
    for (const dm of userMembers) {
      const uid = dm.user.id;
      if (!memberMap.has(uid)) {
        memberMap.set(uid, {
          userId: uid,
          name: `${dm.user.person.name} ${dm.user.person.lastname}`,
          availableDays: dm.user.memberAvailabilities.map((a) => a.dayOfWeek),
        });
      }
    }

    const members = Array.from(memberMap.values());
    const memberUserIds = members.map((m) => m.userId);

    void memberExceptions; // unused placeholder from Promise.all above

    const monthStart = new Date(Date.UTC(year, month - 1, 1));
    const monthEnd = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    const [exceptions, busyEntries, cargos] = memberUserIds.length > 0
      ? await Promise.all([
          prisma.memberUnavailableDate.findMany({
            where: { userId: { in: memberUserIds }, date: { gte: monthStart, lte: monthEnd } },
            select: { userId: true, date: true },
          }),
          prisma.calendarEntry.findMany({
            where: {
              userId: { in: memberUserIds },
              calendarId: { not: calendar.id },
              date: { gte: monthStart, lte: monthEnd },
            },
            select: {
              userId: true,
              date: true,
              calendar: { select: { department: { select: { name: true } } } },
            },
          }),
          prisma.departmentCargo.findMany({
            where: { departmentId },
            orderBy: { name: "asc" },
            select: { id: true, name: true },
          }),
        ])
      : await Promise.all([
          Promise.resolve([]),
          Promise.resolve([]),
          prisma.departmentCargo.findMany({
            where: { departmentId },
            orderBy: { name: "asc" },
            select: { id: true, name: true },
          }),
        ]);

    const initialEntries = calendar.entries.map((e) => ({
      id: e.id,
      date: e.date.toISOString(),
      userId: e.userId,
      task: e.task,
      notes: e.notes,
      userName: e.user ? `${e.user.person.name} ${e.user.person.lastname}` : null,
    }));

    const initialExceptions = (exceptions as { userId: number; date: Date }[]).map((e) => ({
      userId: e.userId,
      date: format(e.date, "yyyy-MM-dd"),
    }));

    const initialBusyDates = (busyEntries as { userId: number; date: Date; calendar: { department: { name: string } } }[]).map((e) => ({
      userId: e.userId,
      date: format(e.date, "yyyy-MM-dd"),
      departmentName: e.calendar.department.name,
    }));

    return (
      <>
        <div className="max-w-7xl mx-auto p-4 pb-6 space-y-4 h-[100vh] overflow-auto">
          <DashboardHeader
            title="Gestión de Calendarios"
            subtitle={department.name}
          />
          <LeaderCalendarView
            key={departmentId}
            departmentId={departmentId}
            calendarId={calendar.id}
            members={members}
            initialEntries={initialEntries}
            initialExceptions={initialExceptions}
            initialBusyDates={initialBusyDates}
            initialMonth={month}
            initialYear={year}
            initialCargos={cargos as { id: number; name: string }[]}
          />
        </div>
        {allDepts.length > 1 && (
          <LeaderCalendarioFilters depts={allDepts} activeDeptId={departmentId} />
        )}
      </>
    );
  }

  // ── USER / OBRERO → nueva ruta dedicada ──
  if (["USER", "OBRERO"].includes(role)) {
    redirect("/app/mi-disponibilidad");
  }

  redirect("/app/dashboard");
}

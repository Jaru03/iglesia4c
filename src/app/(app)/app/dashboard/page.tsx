import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Activity } from "lucide-react";
import prisma from "@/utils/prisma";
import type { ActivityItem } from "@/components/dashboard/tabs/DepartamentosTab";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { AdminEstadisticasTab } from "@/components/dashboard/tabs/AdminEstadisticasTab";
import { ResponsableEstadisticasTab } from "@/components/dashboard/tabs/ResponsableEstadisticasTab";
import { LiderEstadisticasTab } from "@/components/dashboard/tabs/LiderEstadisticasTab";
import { DepartamentosTab } from "@/components/dashboard/tabs/DepartamentosTab";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";

export const dynamic = "force-dynamic";

export default async function DashboardHome({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string; tab?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role, churchId, departmentId } = session.user;
  const userId = parseInt(session.user.id as string);
  const { dept } = await searchParams;
  const hoy = new Date();

  // ── ADMIN ──────────────────────────────────────────────────────────────────
  if (role === "ADMIN") {
    const [
      totalPersonas, totalIglesias, totalDepartamentos,
      peticionesPendientes, ultimasPersonas, ultimasPeticiones, eventosProximos,
    ] = await Promise.all([
      prisma.person.count({ where: { active: true } }),
      prisma.church.count({ where: { active: true } }),
      prisma.department.count(),
      prisma.petition.count({ where: { status: "PENDIENTE" } }),
      prisma.person.findMany({
        orderBy: { createdAt: "desc" }, take: 5,
        select: { id: true, name: true, lastname: true, membershipStatus: true, email: true },
      }),
      prisma.petition.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.activity.findMany({
        where: { hourStart: { gte: hoy } }, orderBy: { hourStart: "asc" }, take: 5,
        select: { id: true, title: true, hourStart: true, place: true },
      }),
    ]);

    return (
      <DashboardTabs
        title="Panel de Control"
        tabs={[
          {
            id: "estadisticas", label: "Estadísticas", icon: "TrendingUp" as const,
            content: (
              <AdminEstadisticasTab
                totalPersonas={totalPersonas}
                totalIglesias={totalIglesias}
                totalDepartamentos={totalDepartamentos}
                totalActividades={eventosProximos.length}
                peticionesPendientes={peticionesPendientes}
                ultimasPersonas={ultimasPersonas.map((p) => ({ ...p, membershipStatus: p.membershipStatus ?? "VISITOR" }))}
                ultimasPeticiones={ultimasPeticiones.map((p) => ({ id: p.id, nombre: p.nombre ?? "", status: p.status }))}
                eventosProximos={eventosProximos.map((e) => ({ ...e, hourStart: e.hourStart.toISOString() }))}
                personasHref="/app/personas"
                peticionesHref="/app/peticiones"
                actividadesHref="/app/actividades"
              />
            ),
          },
        ]}
      />
    );
  }

  // ── RESPONSIBLE ────────────────────────────────────────────────────────────
  if (role === "RESPONSIBLE") {
    if (!churchId) redirect("/login");

    const cultoDepartment = await prisma.department.findFirst({
      where: { churchId, name: { contains: "Culto", mode: "insensitive" } },
    });

    const userPerson = await prisma.person.findFirst({
      where: { user: { id: userId } }, select: { id: true },
    });

    const [
      totalMiembros, totalPersonas, totalDepartamentos, totalActividades, totalVisitas,
      peticionesPendientes, personasRecientes, eventosProximos, departmentData,
      calendarActivities, cultoActivities,
    ] = await Promise.all([
      prisma.person.count({ where: { churchId, active: true, membershipStatus: "MEMBER" } }),
      prisma.person.count({ where: { churchId, active: true } }),
      prisma.department.count({ where: { churchId, active: true } }),
      prisma.activity.count({ where: { department: { churchId } } }),
      prisma.person.count({ where: { churchId, active: true, membershipStatus: "VISITOR" } }),
      prisma.petition.count({ where: { status: "PENDIENTE" } }),
      prisma.person.findMany({
        where: { churchId, active: true }, orderBy: { createdAt: "desc" }, take: 3,
        select: { id: true, name: true, lastname: true, email: true },
      }),
      prisma.activity.findMany({
        where: { department: { churchId }, hourStart: { gte: hoy } },
        orderBy: { hourStart: "asc" }, take: 5,
        select: { id: true, title: true, hourStart: true, place: true },
      }),
      prisma.department.findMany({
        where: { churchId, active: true },
        select: {
          id: true, name: true,
          members: { select: { id: true } },
          activities: {
            select: { id: true, title: true, hourStart: true, place: true },
            orderBy: { hourStart: "desc" }, take: 10,
          },
        },
      }),
      prisma.activity.findMany({
        where: { department: { churchId }, showCalendar: true },
        orderBy: { hourStart: "desc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
      }),
      prisma.activity.findMany({
        where: {
          department: { churchId },
          showCalendar: false,
          ...(cultoDepartment ? { departmentId: cultoDepartment.id } : { departmentId: -1 }),
        },
        orderBy: { hourStart: "desc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
      }),
    ]);

    const userDepartmentIds = userPerson
      ? await prisma.personDepartment.findMany({
          where: { personId: userPerson.id },
          select: { departmentId: true },
        }).then((m) => m.map((x) => x.departmentId))
      : [];

    const toISO = (arr: { hourStart: Date; [k: string]: unknown }[]) =>
      arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() }));
    const toActivityItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; department: { name: string } }[]) =>
      arr.map(({ department, ...a }) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: department.name }));

    return (
      <DashboardTabs
        title={session.user.churchTitle || "Mi Iglesia"}
        tabs={[
          {
            id: "estadisticas", label: "Estadísticas", icon: "TrendingUp" as const,
            content: (
              <ResponsableEstadisticasTab
                totalMiembros={totalMiembros}
                totalPersonas={totalPersonas}
                totalDepartamentos={totalDepartamentos}
                totalActividades={totalActividades}
                totalVisitas={totalVisitas}
                peticionesPendientes={peticionesPendientes}
                personasRecientes={personasRecientes}
                eventosProximos={eventosProximos.map((e) => ({ ...e, hourStart: e.hourStart.toISOString() }))}
                personasHref="/app/personas"
                actividadesHref="/app/actividades"
              />
            ),
          },
          {
            id: "departamentos", label: "Departamentos", icon: "Building2" as const,
            content: (
              <DepartamentosTab
                calendarActivities={toActivityItems(calendarActivities) as ActivityItem[]}
                cultoActivities={toActivityItems(cultoActivities) as ActivityItem[]}
                userPersonId={userPerson?.id}
                departments={departmentData.map((d) => ({
                  id: d.id,
                  name: d.name,
                  memberCount: d.members.length,
                  activities: d.activities.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() })),
                }))}
                visibleDepartmentIds={userDepartmentIds}
                departmentBadge="Miembro"
                departmentDetailHrefBase="/app/departamentos/"
                createActivityHref="/app/actividades/nuevo"
              />
            ),
          },
        ]}
      />
    );
  }

  // ── LEADER ─────────────────────────────────────────────────────────────────
  if (role === "LEADER") {
    const leaderMemberships = await prisma.departmentMember.findMany({
      where: { userId, roleInDept: "LEADER", active: true },
      include: { department: { select: { id: true, name: true, description: true, churchId: true } } },
      orderBy: { department: { name: "asc" } },
    });

    if (leaderMemberships.length === 0) redirect("/app/dashboard");

    const allDepts = leaderMemberships.map((m) => ({ id: m.department.id, name: m.department.name }));
    const leaderDepartmentIds = allDepts.map((d) => d.id);

    const paramDeptId = dept ? parseInt(dept) : NaN;
    const isValid = !isNaN(paramDeptId) && allDepts.some((d) => d.id === paramDeptId);
    const activeDeptId = isValid ? paramDeptId : allDepts[0].id;
    const activeMembership = leaderMemberships.find((m) => m.department.id === activeDeptId)!;
    const department = {
      id: activeMembership.department.id,
      name: activeMembership.department.name,
      description: activeMembership.department.description,
    };
    const activeChruchId = activeMembership.department.churchId;

    const cultoDepartment = await prisma.department.findFirst({
      where: { churchId: activeChruchId, name: { contains: "Culto", mode: "insensitive" } },
    });
    const userPerson = await prisma.person.findFirst({
      where: { user: { id: userId } }, select: { id: true },
    });

    const [
      totalMiembros, totalActividades, actividadesProximasCount, totalAsistencias,
      actividadesProximasList, miembrosRecientes, allActividades,
      departmentData, calendarActivities, cultoActivities, memberActivities,
    ] = await Promise.all([
      prisma.personDepartment.count({ where: { departmentId: activeDeptId, active: true } }),
      prisma.activity.count({ where: { departmentId: activeDeptId } }),
      prisma.activity.count({ where: { departmentId: activeDeptId, hourStart: { gte: hoy } } }),
      prisma.attendance.count({ where: { activity: { departmentId: activeDeptId }, attended: true } }),
      prisma.activity.findMany({
        where: { departmentId: activeDeptId, hourStart: { gte: hoy } },
        orderBy: { hourStart: "asc" }, take: 5,
        select: { id: true, title: true, hourStart: true, place: true },
      }),
      prisma.person.findMany({
        where: { departments: { some: { departmentId: activeDeptId, active: true } }, active: true },
        orderBy: { createdAt: "desc" }, take: 3,
        select: { id: true, name: true, lastname: true, email: true },
      }),
      prisma.activity.findMany({
        where: { departmentId: activeDeptId }, orderBy: { hourStart: "desc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true },
      }),
      prisma.department.findMany({
        where: { id: { in: leaderDepartmentIds }, active: true },
        select: {
          id: true, name: true,
          members: { select: { id: true } },
          activities: {
            select: { id: true, title: true, hourStart: true, place: true },
            orderBy: { hourStart: "desc" }, take: 10,
          },
        },
      }),
      prisma.activity.findMany({
        where: { department: { churchId: activeChruchId }, showCalendar: true },
        orderBy: { hourStart: "desc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
      }),
      prisma.activity.findMany({
        where: {
          department: { churchId: activeChruchId },
          showCalendar: false,
          departmentId: cultoDepartment ? cultoDepartment.id : -1,
        },
        orderBy: { hourStart: "desc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
      }),
      userPerson
        ? prisma.activity.findMany({
            where: {
              department: { churchId: activeChruchId },
              departmentId: { not: activeDeptId },
              showCalendar: false,
            },
            orderBy: { hourStart: "desc" }, take: 20,
            select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
          })
        : Promise.resolve([]),
    ]);

    const userAttendances = userPerson
      ? await prisma.attendance.findMany({
          where: { personId: userPerson.id, attended: true },
          select: { activityId: true },
        })
      : [];
    const attendedSet = new Set(userAttendances.map((a) => a.activityId));

    const toISO = <T extends { hourStart: Date }>(arr: T[]) =>
      arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() }));
    const toActivityItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; department: { name: string } }[]) =>
      arr.map(({ department, ...a }) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: department.name }));

    const hasMultipleDepts = allDepts.length > 1;

    return (
      <DashboardTabs
        title={hasMultipleDepts ? "" : department.name}
        subtitle={""}
        deptSelector={hasMultipleDepts ? { depts: allDepts, activeDeptId, basePath: "/app/dashboard" } : undefined}
        tabs={[
          {
            id: "estadisticas", label: "Estadísticas", icon: "TrendingUp" as const,
            content: (
              <LiderEstadisticasTab
                totalMiembros={totalMiembros}
                totalActividades={totalActividades}
                actividadesProximas={actividadesProximasCount}
                totalAsistencias={totalAsistencias}
                miembrosRecientes={miembrosRecientes}
                actividadesProximasList={toISO(actividadesProximasList)}
                personasHref="/app/personas"
                actividadesHref="/app/actividades"
              />
            ),
          },
          {
            id: "departamentos", label: "Departamentos", icon: "Building2" as const,
            content: (
              <DepartamentosTab
                calendarActivities={toActivityItems(calendarActivities) as ActivityItem[]}
                cultoActivities={toActivityItems(cultoActivities) as ActivityItem[]}
                memberActivities={toActivityItems(memberActivities) as ActivityItem[]}
                userPersonId={userPerson?.id}
                attendedSet={attendedSet}
                deptNameForMember={department.name}
                departments={departmentData.map((d) => ({
                  id: d.id,
                  name: d.name,
                  memberCount: d.members.length,
                  activities: d.activities.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() })),
                }))}
                visibleDepartmentIds={leaderDepartmentIds}
                departmentBadge="Líder"
                departmentDetailHrefBase="/app/departamentos"
                createActivityHref={`/app/actividades/nuevo`}
              />
            ),
          },
        ]}
      />
    );
  }

  // ── USER / MEMBER ──────────────────────────────────────────────────────────
  const person = await prisma.person.findFirst({
    where: { user: { id: userId } },
    include: {
      attendances: {
        where: { attended: true }, take: 10,
        orderBy: { activity: { hourStart: "desc" } },
      },
      departments: {
        where: { active: true },
        include: {
          department: {
            select: { id: true, name: true, churchId: true },
          },
        },
      },
    },
  });

  if (!person) redirect("/login");

  const personChurchId = person.departments[0]?.department.churchId;
  const personDepartmentIds = person.departments.map((pd) => pd.department.id);

  const cultoDepartment = personChurchId
    ? await prisma.department.findFirst({
        where: { churchId: personChurchId, name: { contains: "Culto", mode: "insensitive" } },
        select: { id: true },
      })
    : null;

  const [
    memberActivities,
    memberAttendances,
    departmentData,
    calendarActivities,
    cultoActivities,
  ] = personChurchId
    ? await Promise.all([
        prisma.activity.findMany({
          where: {
            department: { churchId: personChurchId },
            departmentId: { in: personDepartmentIds },
            showCalendar: false,
          },
          orderBy: { hourStart: "desc" },
          take: 20,
          select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
        }),
        prisma.attendance.findMany({
          where: { personId: person.id, attended: true },
          select: { activityId: true },
        }),
        prisma.department.findMany({
          where: { id: { in: personDepartmentIds }, active: true },
          select: {
            id: true,
            name: true,
            members: { select: { id: true } },
            activities: {
              select: { id: true, title: true, hourStart: true, place: true },
              orderBy: { hourStart: "desc" },
              take: 10,
            },
          },
        }),
        prisma.activity.findMany({
          where: { department: { churchId: personChurchId }, showCalendar: true },
          orderBy: { hourStart: "desc" },
          take: 20,
          select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
        }),
        prisma.activity.findMany({
          where: {
            department: { churchId: personChurchId },
            showCalendar: false,
            ...(cultoDepartment ? { departmentId: cultoDepartment.id } : { departmentId: -1 }),
          },
          orderBy: { hourStart: "desc" },
          take: 20,
          select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
        }),
      ])
    : [[], [], [], [], []];

  const attendedSet = new Set(memberAttendances.map((a) => a.activityId));

  const toISO = <T extends { hourStart: Date }>(arr: T[]) =>
    arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() }));
  const toActivityItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; department: { name: string } }[]) =>
    arr.map(({ department, ...a }) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: department.name }));

  return (
    <DashboardTabs
      title={`Bienvenido, ${session.user.name || "Miembro"}`}
      tabs={[
        {
          id: "departamentos", label: "Mis Departamentos", icon: "Building2" as const,
          content: (
            <DepartamentosTab
              calendarActivities={toActivityItems(calendarActivities) as ActivityItem[]}
              cultoActivities={toActivityItems(cultoActivities) as ActivityItem[]}
              memberActivities={toActivityItems(memberActivities) as ActivityItem[]}
              userPersonId={person.id}
              attendedSet={attendedSet}
              departments={departmentData.map((d) => ({
                id: d.id,
                name: d.name,
                memberCount: d.members.length,
                activities: d.activities.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() })),
              }))}
              visibleDepartmentIds={personDepartmentIds}
              departmentBadge="Miembro"
              departmentDetailHrefBase="/app/departamentos"
            />
          ),
        },
      ]}
    />
  );
}

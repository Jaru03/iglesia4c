import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import type { ActivityItem } from "@/components/dashboard/tabs/DepartamentosTab";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { AdminEstadisticasTab } from "@/components/dashboard/tabs/AdminEstadisticasTab";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ResponsableEstadisticasTab } from "@/components/dashboard/tabs/ResponsableEstadisticasTab";
import { LiderEstadisticasTab } from "@/components/dashboard/tabs/LiderEstadisticasTab";
import { DepartamentosTab } from "@/components/dashboard/tabs/DepartamentosTab";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ScrollPage } from "@/components/dashboard/ScrollPage";

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

  // Ventana semanal (lunes 00:00) para los resúmenes semanales de ADMIN y RESPONSIBLE.
  const diffToMonday = (hoy.getDay() + 6) % 7;
  const inicioSemana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - diffToMonday);
  const inicioSemanaPasada = new Date(inicioSemana);
  inicioSemanaPasada.setDate(inicioSemanaPasada.getDate() - 7);
  const finSemana = new Date(inicioSemana);
  finSemana.setDate(finSemana.getDate() + 6);
  const finSemanaPasada = new Date(inicioSemana);
  finSemanaPasada.setDate(finSemanaPasada.getDate() - 1);
  const semanaEsta = { createdAt: { gte: inicioSemana } };
  const semanaPasada = { createdAt: { gte: inicioSemanaPasada, lt: inicioSemana } };
  const rangoEsta = `${format(inicioSemana, "d MMM", { locale: es })} – ${format(finSemana, "d MMM", { locale: es })}`;
  const rangoPasada = `${format(inicioSemanaPasada, "d MMM", { locale: es })} – ${format(finSemanaPasada, "d MMM", { locale: es })}`;

  // ── ADMIN ──────────────────────────────────────────────────────────────────
  if (role === "ADMIN") {
    const [
      personasEsta, personasPasada,
      actividadesEsta, actividadesPasada,
      peticionesEsta, peticionesPasada,
      citasEsta, citasPasada,
      personasNuevas, actividadesNuevas,
    ] = await Promise.all([
      prisma.person.count({ where: semanaEsta }),
      prisma.person.count({ where: semanaPasada }),
      prisma.activity.count({ where: semanaEsta }),
      prisma.activity.count({ where: semanaPasada }),
      prisma.petition.count({ where: semanaEsta }),
      prisma.petition.count({ where: semanaPasada }),
      prisma.appointment.count({ where: semanaEsta }),
      prisma.appointment.count({ where: semanaPasada }),
      prisma.person.findMany({
        where: semanaEsta, orderBy: { createdAt: "desc" }, take: 5,
        select: { id: true, name: true, lastname: true, email: true },
      }),
      prisma.activity.findMany({
        where: semanaEsta, orderBy: { createdAt: "desc" }, take: 5,
        select: { id: true, title: true, hourStart: true, place: true },
      }),
    ]);

    return (
      <ScrollPage>
        <DashboardHeader title="Panel de Control" subtitle="Resumen de la semana" />
        <AdminEstadisticasTab
          rangoEsta={rangoEsta}
          rangoPasada={rangoPasada}
          personas={{ esta: personasEsta, pasada: personasPasada }}
          actividades={{ esta: actividadesEsta, pasada: actividadesPasada }}
          peticiones={{ esta: peticionesEsta, pasada: peticionesPasada }}
          citas={{ esta: citasEsta, pasada: citasPasada }}
          personasNuevas={personasNuevas}
          actividadesNuevas={actividadesNuevas.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() }))}
          personasHref="/app/personas"
          actividadesHref="/app/actividades"
        />
      </ScrollPage>
    );
  }

  // ── RESPONSIBLE ────────────────────────────────────────────────────────────
  if (role === "RESPONSIBLE") {
    if (!churchId) redirect("/login");

    const userPerson = await prisma.person.findFirst({
      where: { user: { id: userId } }, select: { id: true },
    });

    const [
      personasEsta, personasPasada,
      actividadesEsta, actividadesPasada,
      peticionesEsta, peticionesPasada,
      citasEsta, citasPasada,
      personasNuevas, actividadesNuevas,
      departmentData, calendarActivities, cultoActivities,
    ] = await Promise.all([
      prisma.person.count({ where: { churchId, ...semanaEsta } }),
      prisma.person.count({ where: { churchId, ...semanaPasada } }),
      prisma.activity.count({ where: { department: { churchId }, ...semanaEsta } }),
      prisma.activity.count({ where: { department: { churchId }, ...semanaPasada } }),
      prisma.petition.count({ where: semanaEsta }),
      prisma.petition.count({ where: semanaPasada }),
      prisma.appointment.count({ where: { churchId, ...semanaEsta } }),
      prisma.appointment.count({ where: { churchId, ...semanaPasada } }),
      prisma.person.findMany({
        where: { churchId, ...semanaEsta }, orderBy: { createdAt: "desc" }, take: 5,
        select: { id: true, name: true, lastname: true, email: true },
      }),
      prisma.activity.findMany({
        where: { department: { churchId }, ...semanaEsta }, orderBy: { createdAt: "desc" }, take: 5,
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
        where: { isCulto: false, department: { churchId }, showCalendar: true },
        orderBy: { hourStart: "desc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true, allowPreRegistration: true, department: { select: { name: true } } },
      }),
      prisma.activity.findMany({
        where: { isCulto: true, churchId, hourStart: { gte: hoy } },
        orderBy: { hourStart: "asc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true, allowPreRegistration: true },
      }),
    ]);

    const [userDepartmentIds, respAttendances] = userPerson
      ? await Promise.all([
          prisma.personDepartment.findMany({
            where: { personId: userPerson.id },
            select: { departmentId: true },
          }).then((m) => m.map((x) => x.departmentId)),
          prisma.attendance.findMany({
            where: { personId: userPerson.id },
            select: { activityId: true, attended: true, preRegistered: true, autoMarked: true },
          }),
        ])
      : [[] as number[], [] as { activityId: number; attended: boolean; preRegistered: boolean; autoMarked: boolean }[]];
    const attendedSet = new Set(respAttendances.filter(a => a.attended).map(a => a.activityId));
    const preRegisteredSet = new Set(respAttendances.filter(a => a.preRegistered && !a.attended).map(a => a.activityId));
    const autoMarkedSet = new Set(respAttendances.filter(a => a.autoMarked).map(a => a.activityId));

    const toISO = (arr: { hourStart: Date; [k: string]: unknown }[]) =>
      arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() }));
    const toActivityItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; allowPreRegistration?: boolean; department: { name: string } | null }[]) =>
      arr.map(({ department, ...a }) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: department?.name ?? "" }));
    const toCultoItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; allowPreRegistration?: boolean }[]) =>
      arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: "" }));

    return (
      <DashboardTabs
        title={session.user.churchTitle || "Mi Iglesia"}
        tabs={[
          {
            id: "estadisticas", label: "Estadísticas", icon: "TrendingUp" as const,
            content: (
              <ResponsableEstadisticasTab
                rangoEsta={rangoEsta}
                rangoPasada={rangoPasada}
                personas={{ esta: personasEsta, pasada: personasPasada }}
                actividades={{ esta: actividadesEsta, pasada: actividadesPasada }}
                peticiones={{ esta: peticionesEsta, pasada: peticionesPasada }}
                citas={{ esta: citasEsta, pasada: citasPasada }}
                personasNuevas={personasNuevas}
                actividadesNuevas={actividadesNuevas.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() }))}
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
                cultoActivities={toCultoItems(cultoActivities) as ActivityItem[]}
                userPersonId={userPerson?.id}
                attendedSet={attendedSet}
                preRegisteredSet={preRegisteredSet}
                autoMarkedSet={autoMarkedSet}
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

    const userPerson = await prisma.person.findFirst({
      where: { user: { id: userId } }, select: { id: true },
    });

    const [
      totalMiembros, totalActividades, actividadesProximasCount, totalAsistencias,
      actividadesProximasList, miembrosRecientes, allActividades,
      departmentData, calendarActivities, cultoActivities, memberActivities,
      userAttendances,
    ] = await Promise.all([
      prisma.personDepartment.count({ where: { departmentId: activeDeptId, active: true } }),
      prisma.activity.count({ where: { isCulto: false, departmentId: activeDeptId } }),
      prisma.activity.count({ where: { isCulto: false, departmentId: activeDeptId, hourStart: { gte: hoy } } }),
      prisma.attendance.count({ where: { activity: { departmentId: activeDeptId }, attended: true } }),
      prisma.activity.findMany({
        where: { isCulto: false, departmentId: activeDeptId, hourStart: { gte: hoy } },
        orderBy: { hourStart: "asc" }, take: 5,
        select: { id: true, title: true, hourStart: true, place: true },
      }),
      prisma.person.findMany({
        where: { departments: { some: { departmentId: activeDeptId, active: true } }, active: true },
        orderBy: { createdAt: "desc" }, take: 3,
        select: { id: true, name: true, lastname: true, email: true },
      }),
      prisma.activity.findMany({
        where: { isCulto: false, departmentId: activeDeptId }, orderBy: { hourStart: "desc" }, take: 20,
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
        where: { isCulto: false, department: { churchId: activeChruchId }, showCalendar: true },
        orderBy: { hourStart: "desc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true, allowPreRegistration: true, department: { select: { name: true } } },
      }),
      prisma.activity.findMany({
        where: { isCulto: true, churchId: activeChruchId, hourStart: { gte: hoy } },
        orderBy: { hourStart: "asc" }, take: 20,
        select: { id: true, title: true, hourStart: true, place: true, img: true, allowPreRegistration: true },
      }),
      userPerson
        ? prisma.activity.findMany({
            where: {
              isCulto: false,
              department: { churchId: activeChruchId },
              departmentId: { notIn: leaderDepartmentIds },
              showCalendar: false,
            },
            orderBy: { hourStart: "desc" }, take: 20,
            select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
          })
        : Promise.resolve([]),
      userPerson
        ? prisma.attendance.findMany({
            where: { personId: userPerson.id },
            select: { activityId: true, attended: true, preRegistered: true, autoMarked: true },
          })
        : Promise.resolve([] as { activityId: number; attended: boolean; preRegistered: boolean; autoMarked: boolean }[]),
    ]);

    const attendedSet = new Set(userAttendances.filter(a => a.attended).map((a) => a.activityId));
    const preRegisteredSet = new Set(userAttendances.filter(a => a.preRegistered && !a.attended).map(a => a.activityId));
    const autoMarkedSet = new Set(userAttendances.filter(a => a.autoMarked).map(a => a.activityId));

    const toISO = <T extends { hourStart: Date }>(arr: T[]) =>
      arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() }));
    const toActivityItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; allowPreRegistration?: boolean; department: { name: string } | null }[]) =>
      arr.map(({ department, ...a }) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: department?.name ?? "" }));
    const toCultoItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; allowPreRegistration?: boolean }[]) =>
      arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: "" }));

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
                cultoActivities={toCultoItems(cultoActivities) as ActivityItem[]}
                memberActivities={toActivityItems(memberActivities) as ActivityItem[]}
                userPersonId={userPerson?.id}
                attendedSet={attendedSet}
                preRegisteredSet={preRegisteredSet}
                autoMarkedSet={autoMarkedSet}
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

  const personChurchId = person.departments[0]?.department.churchId ?? person.churchId ?? undefined;
  const personDepartmentIds = person.departments.map((pd) => pd.department.id);

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
            isCulto: false,
            department: { churchId: personChurchId },
            departmentId: { in: personDepartmentIds },
            showCalendar: false,
          },
          orderBy: { hourStart: "desc" },
          take: 20,
          select: { id: true, title: true, hourStart: true, place: true, img: true, department: { select: { name: true } } },
        }),
        prisma.attendance.findMany({
          where: { personId: person.id },
          select: { activityId: true, attended: true, preRegistered: true, autoMarked: true },
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
          where: { isCulto: false, department: { churchId: personChurchId }, showCalendar: true },
          orderBy: { hourStart: "desc" },
          take: 20,
          select: { id: true, title: true, hourStart: true, place: true, img: true, allowPreRegistration: true, department: { select: { name: true } } },
        }),
        prisma.activity.findMany({
          where: { isCulto: true, churchId: personChurchId, hourStart: { gte: hoy } },
          orderBy: { hourStart: "asc" },
          take: 20,
          select: { id: true, title: true, hourStart: true, place: true, img: true, allowPreRegistration: true },
        }),
      ])
    : [[], [], [], [], []];

  const attendedSet = new Set(memberAttendances.filter(a => a.attended).map((a) => a.activityId));
  const preRegisteredSet = new Set(memberAttendances.filter(a => a.preRegistered && !a.attended).map(a => a.activityId));
  const autoMarkedSet = new Set(memberAttendances.filter(a => a.autoMarked).map(a => a.activityId));

  const toISO = <T extends { hourStart: Date }>(arr: T[]) =>
    arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString() }));
  const toActivityItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; allowPreRegistration?: boolean; department: { name: string } | null }[]) =>
    arr.map(({ department, ...a }) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: department?.name ?? "" }));
  const toCultoItems = (arr: { id: number; title: string; hourStart: Date; place: string; img?: string | null; allowPreRegistration?: boolean }[]) =>
    arr.map((a) => ({ ...a, hourStart: a.hourStart.toISOString(), departmentName: "" }));

  return (
    <ScrollPage>
      <DashboardHeader
        title={`Bienvenido, ${session.user.name || "Miembro"}`}
        subtitle="Tu actividad y departamentos"
      />
      <DepartamentosTab
        calendarActivities={toActivityItems(calendarActivities) as ActivityItem[]}
        cultoActivities={toCultoItems(cultoActivities) as ActivityItem[]}
        memberActivities={toActivityItems(memberActivities) as ActivityItem[]}
        userPersonId={person.id}
        attendedSet={attendedSet}
        preRegisteredSet={preRegisteredSet}
        autoMarkedSet={autoMarkedSet}
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
    </ScrollPage>
  );
}

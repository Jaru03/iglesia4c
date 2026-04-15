import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";

export const dynamic = "force-dynamic";

interface DeptGroup {
  name: string;
  departmentIds: number[];
  isGrouped: boolean;
}

const groupDepartmentsByName = (depts: { id: number; name: string }[]): DeptGroup[] => {
  const groups = new Map<string, number[]>();
  
  for (const dept of depts) {
    const existing = groups.get(dept.name) || [];
    existing.push(dept.id);
    groups.set(dept.name, existing);
  }
  
  const result: DeptGroup[] = [];
  for (const [name, ids] of groups) {
    result.push({
      name,
      departmentIds: ids,
      isGrouped: ids.length > 1,
    });
  }
  
  return result;
};

function computeDateStart(range: string): Date | null {
  const now = new Date();
  switch (range) {
    case "1d": return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "1w": { const d = new Date(now); d.setDate(d.getDate() - 7); return d; }
    case "1m": { const d = new Date(now); d.setMonth(d.getMonth() - 1); return d; }
    case "2m": { const d = new Date(now); d.setMonth(d.getMonth() - 2); return d; }
    case "3m": { const d = new Date(now); d.setMonth(d.getMonth() - 3); return d; }
    case "6m": { const d = new Date(now); d.setMonth(d.getMonth() - 6); return d; }
    case "1y": { const d = new Date(now); d.setFullYear(d.getFullYear() - 1); return d; }
    default: return null;
  }
}

export default async function AsistenciasPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string; actividad?: string; fechaRange?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, churchId, departmentId } = session.user;

  let allDepts: DeptGroup[] = [];
  let activeDeptId: number | null = null;
  let activeDeptName: string;
  let churchIdFilter: number | undefined;
  let showAllOption = false;

  if (role === "ADMIN") {
    const allDeptsRaw = await prisma.department.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
    
    allDepts = groupDepartmentsByName(allDeptsRaw);
    showAllOption = true;
  } else if (role === "RESPONSIBLE" && churchId) {
    churchIdFilter = churchId;
    const deptsRaw = await prisma.department.findMany({
      where: { churchId },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
    allDepts = groupDepartmentsByName(deptsRaw);
    showAllOption = true;
  } else if (role === "LEADER" && departmentId) {
    const userId = parseInt(session.user.id);
    const memberships = await prisma.departmentMember.findMany({
      where: { userId, roleInDept: "LEADER", active: true },
      include: { department: { select: { id: true, name: true } } },
    });
    const deptsRaw = memberships.map((m) => ({ id: m.department.id, name: m.department.name }));
    allDepts = groupDepartmentsByName(deptsRaw);
    showAllOption = allDepts.length > 1;
  } else {
    // USER, MEMBER, etc - ver sus propias asistencias
    const userId = parseInt(session.user.id as string);
    const person = await prisma.person.findFirst({
      where: { user: { id: userId } },
      select: { id: true },
    });

    const attendances = person
      ? await prisma.attendance.findMany({
          where: { personId: person.id },
          include: {
            activity: {
              select: {
                id: true,
                title: true,
                place: true,
                hourStart: true,
              },
            },
          },
          orderBy: { activity: { hourStart: "desc" } },
        })
      : [];

    const { AsistenciasUserClient } = await import("./components/AsistenciasUserClient");
    return <AsistenciasUserClient attendances={attendances} />;
  }

  if (allDepts.length === 0) {
    const { AsistenciasClient } = await import("./components/AsistenciasClient");
    return (
      <AsistenciasClient
        actividades={[]}
        departmentName="Sin departamentos"
        allDepts={[]}
        activeDeptId={-1}
        showAllOption={false}
        role={role}
        activeFechaRange="all"
      />
    );
  }

  const { dept, fechaRange: fechaRangeParam } = await searchParams;
  const activeFechaRange = fechaRangeParam ?? "all";
  
  // Encontrar el dept seleccionado
  const selectedDept = allDepts.find((d) => d.name === dept) || 
                      allDepts.find((d) => d.departmentIds.includes(parseInt(dept || "")) || false) ||
                      (showAllOption ? null : allDepts[0]);

  if (dept === "all" || !dept) {
    activeDeptId = -1;
    activeDeptName = "Todas";
  } else if (selectedDept) {
    activeDeptId = selectedDept.departmentIds[0];
    activeDeptName = selectedDept.name;
  } else {
    activeDeptId = showAllOption ? -1 : allDepts[0].departmentIds[0];
    activeDeptName = showAllOption ? "Todas" : allDepts[0].name;
  }

  // Encontrar el dept activo
  const activeDeptGroup = allDepts.find((d) => d.name === activeDeptName) || allDepts[0];

  const whereClause = (() => {
    if (activeDeptId === -1) {
      if (role === "ADMIN") {
        return {};
      }
      if (role === "RESPONSIBLE" && churchId) {
        return { department: { churchId } };
      }
      if (role === "LEADER") {
        return { departmentId: { in: allDepts.flatMap(d => d.departmentIds) } };
      }
      return {};
    }
    if (activeDeptGroup.isGrouped) {
      if (role === "RESPONSIBLE" && churchId) {
        return { department: { name: activeDeptGroup.name, churchId } };
      }
      return { department: { name: activeDeptGroup.name } };
    }
    if (activeDeptId && activeDeptId > 0) {
      return { departmentId: activeDeptId };
    }
    if (role === "RESPONSIBLE" && churchId) {
      return { department: { churchId } };
    }
    if (role === "LEADER") {
      return { departmentId: { in: allDepts.flatMap(d => d.departmentIds) } };
    }
    return {};
  })();

  const dateStart = computeDateStart(activeFechaRange);
  const finalWhere = dateStart
    ? { ...whereClause, hourStart: { gte: dateStart } }
    : whereClause;

  const actividadesRaw = await prisma.activity.findMany({
    where: finalWhere,
    select: {
      id: true,
      title: true,
      place: true,
      hourStart: true,
      allowPreRegistration: true,
      _count: { select: { attendances: true } },
    },
  });

  const nowDate = new Date();
  const futureAct = actividadesRaw.filter((a) => a.hourStart >= nowDate).sort((a, b) => a.hourStart.getTime() - b.hourStart.getTime());
  const pastAct = actividadesRaw.filter((a) => a.hourStart < nowDate).sort((a, b) => b.hourStart.getTime() - a.hourStart.getTime());
  const actividades = [...futureAct, ...pastAct];

  const preRegCounts = await prisma.attendance.groupBy({
    by: ["activityId"],
    where: {
      activityId: { in: actividades.map((a) => a.id) },
      preRegistered: true,
      attended: false,
    },
    _count: { activityId: true },
  });
  const preRegMap = new Map(preRegCounts.map((r) => [r.activityId, r._count.activityId]));

  const actividadesWithPreReg = actividades.map((a) => ({
    ...a,
    preRegisteredCount: preRegMap.get(a.id) ?? 0,
  }));

  const { AsistenciasClient } = await import("./components/AsistenciasClient");
  return (
    <AsistenciasClient
      actividades={actividadesWithPreReg}
      departmentName={activeDeptName}
      allDepts={allDepts}
      activeDeptId={activeDeptId ?? allDepts[0].departmentIds[0]}
      showAllOption={showAllOption}
      role={role}
      activeFechaRange={activeFechaRange}
    />
  );
}

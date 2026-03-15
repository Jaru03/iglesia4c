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

export default async function AsistenciasPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string; actividad?: string }>;
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

    if (!person) {
      redirect("/app/dashboard");
    }

    const attendances = await prisma.attendance.findMany({
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
    });

    const { AsistenciasUserClient } = await import("./components/AsistenciasUserClient");
    return <AsistenciasUserClient attendances={attendances} />;
  }

  if (allDepts.length === 0) {
    redirect("/app/dashboard");
  }

  const { dept } = await searchParams;
  
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

  const actividades = await prisma.activity.findMany({
    where: whereClause,
    orderBy: { hourStart: "desc" },
    select: {
      id: true,
      title: true,
      place: true,
      hourStart: true,
      _count: { select: { attendances: true } },
    },
  });

  const { AsistenciasClient } = await import("./components/AsistenciasClient");
  return (
    <AsistenciasClient
      actividades={actividades}
      departmentName={activeDeptName}
      allDepts={allDepts}
      activeDeptId={activeDeptId ?? allDepts[0].departmentIds[0]}
      showAllOption={showAllOption}
      role={role}
    />
  );
}

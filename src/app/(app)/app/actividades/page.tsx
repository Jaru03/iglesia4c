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

export default async function ActividadesPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, churchId, departmentId } = session.user;

  if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
    redirect("/app/dashboard");
  }

  let allDepts: DeptGroup[] = [];
  let activeDeptId: number | null = null;
  let activeDeptName: string;
  let showAllOption = false;
  let leaderChurchId: number | null = null;

  if (role === "ADMIN") {
    const allDeptsRaw = await prisma.department.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });

    allDepts = groupDepartmentsByName(allDeptsRaw);
    showAllOption = true;
  } else if (role === "RESPONSIBLE" && churchId) {
    const deptsRaw = await prisma.department.findMany({
      where: { churchId, active: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
    allDepts = groupDepartmentsByName(deptsRaw);
    showAllOption = true;
  } else if (role === "LEADER") {
    const userId = parseInt(session.user.id);
    const memberships = await prisma.departmentMember.findMany({
      where: { userId, roleInDept: "LEADER", active: true },
      include: { department: { select: { id: true, name: true, churchId: true } } },
    });
    const deptsRaw = memberships.map((m) => ({ id: m.department.id, name: m.department.name }));
    allDepts = groupDepartmentsByName(deptsRaw);
    showAllOption = allDepts.length > 1;
    leaderChurchId = memberships[0]?.department.churchId ?? null;
  }

  const { dept } = await searchParams;

  if (allDepts.length === 0) {
    const { ActividadesClient } = await import("./components/ActividadesClient");
    return (
      <ActividadesClient
        actividades={[]}
        departmentId={null}
        departmentName=""
        allDepts={[]}
        activeDeptId={null}
        showAllOption={false}
        role={role as "ADMIN" | "RESPONSIBLE" | "LEADER"}
      />
    );
  }
  
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

  const activeDeptGroup = allDepts.find((d) => d.name === activeDeptName) || allDepts[0];

  const allDeptIds = allDepts.flatMap(d => d.departmentIds);

  const whereClause = (() => {
    if (activeDeptId === -1) {
      if (role === "ADMIN") {
        return { isCulto: false, departmentId: { in: allDeptIds } };
      }
      if (role === "RESPONSIBLE" && churchId) {
        return { isCulto: false, department: { churchId } };
      }
      if (role === "LEADER") {
        return { isCulto: false, departmentId: { in: allDeptIds } };
      }
      return { isCulto: false };
    }
    if (activeDeptGroup.isGrouped) {
      return { isCulto: false, department: { name: activeDeptGroup.name } };
    }
    if (activeDeptId && activeDeptId > 0) {
      return { isCulto: false, departmentId: activeDeptId };
    }
    if (role === "RESPONSIBLE" && churchId) {
      return { isCulto: false, department: { churchId } };
    }
    if (role === "LEADER") {
      return { isCulto: false, departmentId: { in: allDeptIds } };
    }
    return { isCulto: false };
  })();

  const now = new Date();

  const [actividadesRaw, calendarActividades] = await Promise.all([
    prisma.activity.findMany({
      where: whereClause,
      select: { id: true, title: true, place: true, img: true, hourStart: true, hourEnd: true },
    }),
    role === "LEADER" && leaderChurchId
      ? prisma.activity.findMany({
          where: { isCulto: false, department: { churchId: leaderChurchId } },
          orderBy: { hourStart: "asc" },
          select: {
            id: true, title: true, place: true, hourStart: true, hourEnd: true, img: true,
            showCalendar: true,
            department: { select: { name: true } },
          },
        })
      : Promise.resolve([]),
  ]);

  const future = actividadesRaw.filter((a) => a.hourStart >= now).sort((a, b) => a.hourStart.getTime() - b.hourStart.getTime());
  const past = actividadesRaw.filter((a) => a.hourStart < now).sort((a, b) => b.hourStart.getTime() - a.hourStart.getTime());
  const actividades = [...future, ...past];

  const { ActividadesClient } = await import("./components/ActividadesClient");
  return (
    <ActividadesClient
      actividades={actividades}
      departmentId={activeDeptId}
      departmentName={activeDeptName}
      allDepts={allDepts}
      activeDeptId={activeDeptId}
      showAllOption={showAllOption}
      role={role as "ADMIN" | "RESPONSIBLE" | "LEADER"}
      calendarActividades={calendarActividades.map((a) => ({
        id: a.id,
        title: a.title,
        place: a.place,
        hourStart: a.hourStart.toISOString(),
        hourEnd: a.hourEnd.toISOString(),
        img: a.img,
        showCalendar: a.showCalendar,
        departmentName: a.department?.name ?? "",
      }))}
    />
  );
}

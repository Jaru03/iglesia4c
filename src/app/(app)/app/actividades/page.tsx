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

  if (role === "ADMIN") {
    const allDeptsRaw = await prisma.department.findMany({
      where: { active: true, NOT: { name: { contains: "Culto", mode: "insensitive" } } },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
    
    allDepts = groupDepartmentsByName(allDeptsRaw);
    showAllOption = true;
  } else if (role === "RESPONSIBLE" && churchId) {
    const deptsRaw = await prisma.department.findMany({
      where: { churchId, active: true, NOT: { name: { contains: "Culto", mode: "insensitive" } } },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
    allDepts = groupDepartmentsByName(deptsRaw);
    showAllOption = true;
  } else if (role === "LEADER") {
    const userId = parseInt(session.user.id);
    const memberships = await prisma.departmentMember.findMany({
      where: { userId, roleInDept: "LEADER", active: true },
      include: { department: { select: { id: true, name: true } } },
    });
    const deptsRaw = memberships.map((m) => ({ id: m.department.id, name: m.department.name }));
    allDepts = groupDepartmentsByName(deptsRaw);
    showAllOption = allDepts.length > 1;
  }

  if (allDepts.length === 0) {
    redirect("/app/dashboard");
  }

  const { dept } = await searchParams;
  
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

  const nonCultoDeptIds = allDepts
    .filter(d => !d.name.toLowerCase().includes("culto"))
    .flatMap(d => d.departmentIds);

  const whereClause = (() => {
    if (activeDeptId === -1) {
      if (role === "ADMIN") {
        return { departmentId: { in: nonCultoDeptIds } };
      }
      if (role === "RESPONSIBLE" && churchId) {
        return { department: { churchId }, departmentId: { in: nonCultoDeptIds } };
      }
      if (role === "LEADER") {
        return { departmentId: { in: nonCultoDeptIds } };
      }
      return {};
    }
    if (activeDeptGroup.isGrouped) {
      return { department: { name: activeDeptGroup.name } };
    }
    if (activeDeptId && activeDeptId > 0) {
      return { departmentId: activeDeptId };
    }
    if (role === "RESPONSIBLE" && churchId) {
      return { department: { churchId }, departmentId: { in: nonCultoDeptIds } };
    }
    if (role === "LEADER") {
      return { departmentId: { in: nonCultoDeptIds } };
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
      img: true,
      hourStart: true,
      hourEnd: true,
    },
  });

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
    />
  );
}

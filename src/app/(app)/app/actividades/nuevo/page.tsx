import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import ActivityForm from "@/components/forms/ActivityForm";

export const dynamic = "force-dynamic";

export default async function NuevaActividadPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role, churchId, departmentId } = session.user;

  if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
    redirect("/app/dashboard");
  }

  const { dept } = await searchParams;

  let departments: { id: number; name: string; churchId?: number | null }[] = [];
  let churches: { id: number; title: string }[] = [];
  let lockedDepartmentId: number | null = null;

  if (role === "ADMIN") {
    departments = await prisma.department.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, churchId: true },
    });
    churches = await prisma.church.findMany({
      where: { active: true },
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    });
    lockedDepartmentId = null;
  } else if (role === "RESPONSIBLE" && churchId) {
    departments = await prisma.department.findMany({
      where: { active: true, churchId },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
    churches = [];
    lockedDepartmentId = null;
  } else if (role === "LEADER") {
    const userId = parseInt(session.user.id);
    const memberships = await prisma.departmentMember.findMany({
      where: { userId, roleInDept: "LEADER", active: true },
      include: { department: { select: { id: true, name: true } } },
    });
    departments = memberships.map((m) => m.department);
    if (departments.length === 0) {
      redirect("/app/actividades");
    } else if (departments.length === 1) {
      lockedDepartmentId = departments[0].id;
    }
    // Si tiene más de uno, lockedDepartmentId queda null → se muestra el selector
  }

  const paramDeptId = dept ? parseInt(dept) : NaN;
  const isValid = !isNaN(paramDeptId) && departments.some((d) => d.id === paramDeptId);
  
  if (role === "LEADER") {
    // LEADER puede tener 1 o más departamentos - si tiene más de 1, puede seleccionar
    if (departments.length === 0) {
      redirect("/app/actividades");
    }
    if (!isNaN(paramDeptId) && isValid) {
      lockedDepartmentId = paramDeptId;
    } else if (departments.length === 1) {
      lockedDepartmentId = departments[0].id;
    }
    // Si tiene más de 1 y no hay param, lockedDepartmentId queda null → selector
  } else {
    if (departments.length === 0) {
      redirect("/app/actividades");
    }
    if (!isNaN(paramDeptId) && isValid) {
      lockedDepartmentId = paramDeptId;
    } else {
      lockedDepartmentId = null;
    }
  }

  const redirectUrl = lockedDepartmentId 
    ? `/app/actividades?dept=${lockedDepartmentId}`
    : "/app/actividades";

  return (
    <div className="container mx-auto py-6 px-4">
      <ActivityForm
        departments={departments}
        churches={churches}
        lockedDepartmentId={lockedDepartmentId ?? undefined}
        redirectTo={redirectUrl}
        isEdit={false}
        role={role as "ADMIN" | "RESPONSIBLE" | "LEADER"}
      />
    </div>
  );
}

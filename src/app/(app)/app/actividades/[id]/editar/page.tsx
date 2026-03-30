import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import ActivityForm from "@/components/forms/ActivityForm";

export const dynamic = "force-dynamic";

export default async function EditarActividadPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ dept?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role, churchId, departmentId } = session.user;

  if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
    redirect("/app/dashboard");
  }

  const { id } = await params;
  const { dept } = await searchParams;
  const activityId = parseInt(id);

  if (isNaN(activityId)) {
    redirect("/app/actividades");
  }

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      department: {
        select: { churchId: true },
      },
    },
  });

  if (!activity) {
    redirect("/app/actividades");
  }

  const activityChurchId = activity.department?.churchId ?? activity.churchId ?? undefined;

  let departments: { id: number; name: string; churchId?: number | null }[] = [];
  let churches: { id: number; title: string }[] = [];
  let lockedDepartmentId: number | undefined;

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
  } else if (role === "RESPONSIBLE" && churchId) {
    departments = await prisma.department.findMany({
      where: { active: true, churchId },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
    churches = [];
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
    // Si tiene más de uno, lockedDepartmentId queda undefined → se muestra el selector
  }

  const formatTime = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  const activityData = {
    id: activity.id,
    title: activity.title,
    place: activity.place,
    description: activity.description,
    img: activity.img,
    fecha: activity.date.toISOString().split("T")[0],
    horaInicio: formatTime(activity.hourStart),
    horaFin: formatTime(activity.hourEnd),
    departmentId: activity.departmentId,
    churchId: activityChurchId,
    showCalendar: activity.showCalendar,
  };

  const redirectTo = dept
    ? `/app/actividades?dept=${dept}`
    : `/app/actividades?dept=${activity.departmentId}`;

  return (
    <div className="container mx-auto py-6 px-4">
      <ActivityForm
        activity={activityData}
        departments={departments}
        churches={churches}
        lockedDepartmentId={lockedDepartmentId}
        redirectTo={redirectTo}
        isEdit={true}
        role={role as "ADMIN" | "RESPONSIBLE" | "LEADER"}
      />
    </div>
  );
}

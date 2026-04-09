import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import AttendanceForm from "@/components/forms/AttendanceForm";

export const dynamic = "force-dynamic";

export default async function AttendancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, churchId, departmentId } = session.user;

  if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
    redirect("/app/dashboard");
  }

  const { id } = await params;
  const activityId = parseInt(id);

  if (isNaN(activityId)) {
    redirect("/app/asistencias");
  }

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      department: { select: { id: true, name: true, churchId: true } },
    },
  });

  if (!activity) {
    redirect("/app/asistencias");
  }

  // Verificar acceso según el rol
  const activityChurchId = activity.department?.churchId ?? activity.churchId;
  if (role === "RESPONSIBLE" && churchId !== activityChurchId) {
    redirect("/app/asistencias");
  }
  if (role === "LEADER" && activity.department && departmentId !== activity.department.id) {
    redirect("/app/asistencias");
  }

  // Obtener personas según el rol
  let persons: { id: number; name: string; lastname: string; email: string | null }[] = [];
  if (role === "ADMIN") {
    persons = await prisma.person.findMany({
      where: { active: true },
      orderBy: [{ name: "asc" }, { lastname: "asc" }],
      select: { id: true, name: true, lastname: true, email: true },
    });
  } else if (role === "RESPONSIBLE" && churchId) {
    persons = await prisma.person.findMany({
      where: { active: true, churchId },
      orderBy: [{ name: "asc" }, { lastname: "asc" }],
      select: { id: true, name: true, lastname: true, email: true },
    });
  } else if (role === "LEADER") {
    // Obtener personas del departamento del líder
    const deptPersons = activity.department
      ? await prisma.personDepartment.findMany({
          where: { departmentId: activity.department.id, active: true },
          select: { personId: true },
        })
      : [];
    const personIds = deptPersons.map((p) => p.personId);

    persons = await prisma.person.findMany({
      where: { id: { in: personIds }, active: true },
      orderBy: [{ name: "asc" }, { lastname: "asc" }],
      select: { id: true, name: true, lastname: true, email: true },
    });
  } else {
    persons = [];
  }

  const attendances = await prisma.attendance.findMany({
    where: { activityId },
    select: { personId: true, attended: true, preRegistered: true },
  });

  const activityData = {
    id: activity.id,
    title: activity.title,
    place: activity.place,
    hourStart: activity.hourStart,
    allowPreRegistration: activity.allowPreRegistration,
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <AttendanceForm
        activity={activityData}
        persons={persons}
        attendances={attendances}
      />
    </div>
  );
}

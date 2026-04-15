import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { PersonasClient } from "./components/PersonasClient";

export const dynamic = "force-dynamic";

const personSelect = {
  id: true,
  name: true,
  lastname: true,
  email: true,
  phone: true,
  document: true,
  membershipStatus: true,
  active: true,
  arrivedAt: true,
  birthDate: true,
  attendsChurch: true,
  howDidYouMeetUs: true,
  authorizedContact: true,
  prayerRequest: true,
  signature: true,
  isMember: true,
  churchId: true,
  church: { select: { title: true } },
  user: { select: { id: true, role: true } },
  departments: {
    where: { active: true },
    select: { departmentId: true },
    orderBy: { id: "asc" as const },
  },
} as const;

async function getNotificationsByUser(userId: number): Promise<Record<number, number>> {
  const grouped = await prisma.notification.groupBy({
    by: ["fromUserId"],
    where: { userId, read: false },
    _count: { id: true },
  });
  return Object.fromEntries(grouped.map((g) => [g.fromUserId, g._count.id]));
}

async function getAbsencesByUserId(userIds: number[]): Promise<Record<number, AbsenceData[]>> {
  if (userIds.length === 0) return {};
  const absences = await prisma.absence.findMany({
    where: { userId: { in: userIds } },
    orderBy: { startDate: "desc" },
    select: { id: true, userId: true, startDate: true, endDate: true, reason: true, status: true },
  });
  const map: Record<number, AbsenceData[]> = {};
  for (const a of absences) {
    if (!map[a.userId]) map[a.userId] = [];
    map[a.userId].push(a);
  }
  return map;
}

type AbsenceData = {
  id: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
};

export default async function PersonasPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, churchId, departmentId, id } = session.user;
  const currentUserId = parseInt(id as string);

  if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
    redirect("/app/dashboard");
  }

  if (role === "ADMIN") {
    const [personas, allDepartments, notificationsByUser] = await Promise.all([
      prisma.person.findMany({ orderBy: { name: "asc" }, select: personSelect }),
      prisma.department.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
      getNotificationsByUser(currentUserId),
    ]);
    const userIds = personas.map((p) => p.user?.id).filter((id): id is number => !!id);
    const absencesByUserId = await getAbsencesByUserId(userIds);

    return (
      <PersonasClient
        personasData={{ type: "persons", data: personas }}
        role={role}
        allDepartments={allDepartments}
        notificationsByUser={notificationsByUser}
        absencesByUserId={absencesByUserId}
      />
    );
  }

  if (role === "RESPONSIBLE" && churchId) {
    const [church, personas, allDepartments, notificationsByUser] = await Promise.all([
      prisma.church.findUnique({ where: { id: churchId }, select: { title: true } }),
      prisma.person.findMany({ where: { churchId }, orderBy: { name: "asc" }, select: personSelect }),
      prisma.department.findMany({ where: { churchId }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
      getNotificationsByUser(currentUserId),
    ]);
    const userIds = personas.map((p) => p.user?.id).filter((id): id is number => !!id);
    const absencesByUserId = await getAbsencesByUserId(userIds);

    return (
      <PersonasClient
        personasData={{ type: "persons", data: personas }}
        role={role}
        churchId={churchId}
        churchName={church?.title}
        allDepartments={allDepartments}
        notificationsByUser={notificationsByUser}
        absencesByUserId={absencesByUserId}
      />
    );
  }

  if (role === "LEADER" && departmentId) {
    const [department, miembros, notificationsByUser] = await Promise.all([
      prisma.department.findUnique({ where: { id: departmentId }, select: { name: true } }),
      prisma.personDepartment.findMany({
        where: { departmentId, active: true },
        include: { person: { select: personSelect } },
        orderBy: { person: { name: "asc" } },
      }),
      getNotificationsByUser(currentUserId),
    ]);
    const userIds = miembros.map((m) => m.person.user?.id).filter((id): id is number => !!id);
    const absencesByUserId = await getAbsencesByUserId(userIds);

    return (
      <PersonasClient
        personasData={{ type: "members", data: miembros }}
        role={role}
        departmentId={departmentId}
        departmentName={department?.name}
        allDepartments={[]}
        notificationsByUser={notificationsByUser}
        absencesByUserId={absencesByUserId}
      />
    );
  }

  redirect("/app/dashboard");
}

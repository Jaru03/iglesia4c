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

export default async function PersonasPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, churchId, departmentId } = session.user;

  if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
    redirect("/app/dashboard");
  }

  if (role === "ADMIN") {
    const [personas, allDepartments] = await Promise.all([
      prisma.person.findMany({ orderBy: { name: "asc" }, select: personSelect }),
      prisma.department.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    ]);

    return (
      <PersonasClient
        personasData={{ type: "persons", data: personas }}
        role={role}
        allDepartments={allDepartments}
      />
    );
  }

  if (role === "RESPONSIBLE" && churchId) {
    const [church, personas, allDepartments] = await Promise.all([
      prisma.church.findUnique({ where: { id: churchId }, select: { title: true } }),
      prisma.person.findMany({ where: { churchId }, orderBy: { name: "asc" }, select: personSelect }),
      prisma.department.findMany({ where: { churchId }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    ]);

    return (
      <PersonasClient
        personasData={{ type: "persons", data: personas }}
        role={role}
        churchId={churchId}
        churchName={church?.title}
        allDepartments={allDepartments}
      />
    );
  }

  if (role === "LEADER" && departmentId) {
    const [department, miembros] = await Promise.all([
      prisma.department.findUnique({ where: { id: departmentId }, select: { name: true } }),
      prisma.personDepartment.findMany({
        where: { departmentId, active: true },
        include: { person: { select: personSelect } },
        orderBy: { person: { name: "asc" } },
      }),
    ]);

    return (
      <PersonasClient
        personasData={{ type: "members", data: miembros }}
        role={role}
        departmentId={departmentId}
        departmentName={department?.name}
        allDepartments={[]}
      />
    );
  }

  redirect("/app/dashboard");
}

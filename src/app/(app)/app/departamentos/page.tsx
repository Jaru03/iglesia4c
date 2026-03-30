import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import type { DepartamentoItem } from "@/components/dashboard/items/DepartamentoListItem";
import { DepartamentosClient } from "./DepartamentosClient";
import { DepartamentoView } from "@/components/dashboard/DepartamentoView";
import { quitarPersonaDeDepartamento } from "@/actions/lider-actions";

export const dynamic = "force-dynamic";

export default async function DepartamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role, churchId } = session.user;
  const userId = parseInt(session.user.id as string);
  const { dept } = await searchParams;

  // ── ADMIN / RESPONSIBLE ────────────────────────────────────────────────────
  if (role === "ADMIN" || role === "RESPONSIBLE") {
    const whereClause = role === "RESPONSIBLE" && churchId ? { churchId } : {};

    const departamentos = await prisma.department.findMany({
      where: whereClause,
      orderBy: { name: "asc" },
      include: {
        church: { select: { id: true, title: true } },
        _count: { select: { persons: true, activities: true } },
        members: { where: { roleInDept: "LEADER", active: true }, select: { id: true } },
      },
    });

    const data: DepartamentoItem[] = departamentos.map((d) => ({
      id: d.id,
      name: d.name,
      description: d.description,
      active: d.active,
      church: d.church,
      leadersCount: d.members.length,
      _count: { persons: d._count.persons, activities: d._count.activities },
    }));

    return (
      <DepartamentosClient
        items={data}
        subtitle={role === "RESPONSIBLE" ? "Departamentos de tu iglesia" : "Todos los departamentos"}
        isAdmin={role === "ADMIN"}
      />
    );
  }

  // ── LEADER ─────────────────────────────────────────────────────────────────
  if (role === "LEADER") {
    const leaderMemberships = await prisma.departmentMember.findMany({
      where: { userId, roleInDept: "LEADER", active: true },
      include: { department: { select: { id: true, name: true } } },
      orderBy: { department: { name: "asc" } },
    });

    if (leaderMemberships.length === 0) redirect("/app/dashboard");

    const allDepts = leaderMemberships.map((m) => m.department);
    const paramDeptId = dept ? parseInt(dept) : NaN;
    const isValid = !isNaN(paramDeptId) && allDepts.some((d) => d.id === paramDeptId);
    const activeDeptId = isValid ? paramDeptId : allDepts[0].id;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [activeDept, recentAttendances] = await Promise.all([
      prisma.department.findUnique({
        where: { id: activeDeptId },
        include: {
          persons: {
            where: { active: true },
            include: {
              person: {
                select: { id: true, name: true, lastname: true, email: true, phone: true, birthDate: true, membershipStatus: true, attendsChurch: true },
              },
            },
            orderBy: { person: { name: "asc" } },
          },
          _count: { select: { activities: true } },
        },
      }),
      // People who have attended at least one activity of this dept in the last 30 days
      prisma.attendance.findMany({
        where: {
          attended: true,
          activity: { departmentId: activeDeptId, hourStart: { gte: thirtyDaysAgo } },
        },
        select: { personId: true },
        distinct: ["personId"],
      }),
    ]);

    if (!activeDept) redirect("/app/dashboard");

    const recentPersonIds = new Set(recentAttendances.map((a) => a.personId));

    const members = activeDept.persons.map((pd) => ({
      personId: pd.person.id,
      name: pd.person.name,
      lastname: pd.person.lastname,
      email: pd.person.email,
      phone: pd.person.phone,
      birthDate: pd.person.birthDate,
      membershipStatus: pd.person.membershipStatus,
      attendsChurch: pd.person.attendsChurch,
    }));

    // Members who haven't attended any department activity in the last 30 days
    const followUpMembers = members.filter((m) => !recentPersonIds.has(m.personId));

    async function handleRemoveMember(personId: number, deptId: number) {
      "use server";
      const formData = new FormData();
      formData.append("personId", personId.toString());
      formData.append("departmentId", deptId.toString());
      return quitarPersonaDeDepartamento(formData);
    }

    return (
      <DepartamentoView
        dept={{
          id: activeDept.id,
          name: activeDept.name,
          description: activeDept.description,
          memberCount: activeDept.persons.length,
          activityCount: activeDept._count.activities,
        }}
        members={members}
        followUpMembers={followUpMembers}
        allDepts={allDepts}
        activeDeptId={activeDeptId}
        canEdit
        canAddMembers
        canRemoveMembers
        disableAddMember
        editHref={`/app/departamentos/editar?dept=${activeDeptId}`}
        addMemberHref={`/app/departamentos/editar?dept=${activeDeptId}&mode=add-member`}
        onRemoveMember={handleRemoveMember}
      />
    );
  }

  redirect("/app/dashboard");
}

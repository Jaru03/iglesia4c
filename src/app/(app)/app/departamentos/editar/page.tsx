import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import DepartmentForm from "@/components/forms/DepartmentForm";

export const dynamic = "force-dynamic";

export default async function EditarDepartamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; dept?: string; mode?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role, churchId } = session.user;

  if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
    redirect("/app/dashboard");
  }

  const { id, dept, mode } = await searchParams;
  const departmentId = id ? parseInt(id) : dept ? parseInt(dept) : NaN;
  const isAddMemberMode = mode === "add-member";

  if (isNaN(departmentId)) {
    redirect("/app/departamentos");
  }

  const department = await prisma.department.findUnique({
    where: { id: departmentId },
    include: {
      members: {
        where: { roleInDept: "LEADER", active: true },
        include: {
          user: {
            include: {
              person: { select: { name: true, lastname: true } },
            },
          },
        },
      },
    },
  });

  if (!department) redirect("/app/departamentos");

  // LEADER: verify they have access to this department
  if (role === "LEADER") {
    const userId = parseInt(session.user.id);
    const membership = await prisma.departmentMember.findFirst({
      where: { userId, roleInDept: "LEADER", active: true, departmentId },
    });
    if (!membership) redirect("/app/departamentos");
  }

  const currentLeaderId = department.members.map((m) => m.userId).join(",");
  const currentChurchId = department.churchId;

  const currentMembers = await prisma.personDepartment.findMany({
    where: { departmentId, active: true },
    select: { personId: true },
  });
  const currentMemberIds = currentMembers.map((m) => m.personId);

  let churches: { id: number; title: string }[] = [];
  let users: { id: number; name: string; lastname: string; churchId?: number | null }[] = [];
  let persons: { id: number; name: string; lastname: string; churchId?: number | null }[] = [];

  if (role === "ADMIN") {
    churches = await prisma.church.findMany({
      where: { active: true },
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    });
    const dbUsers = await prisma.user.findMany({
      include: { person: { select: { name: true, lastname: true, churchId: true } } },
    });
    users = dbUsers.map((u) => ({
      id: u.id,
      name: u.person.name,
      lastname: u.person.lastname,
      churchId: u.person.churchId,
    }));
    persons = await prisma.person.findMany({
      where: { active: true },
      orderBy: [{ name: "asc" }, { lastname: "asc" }],
      select: { id: true, name: true, lastname: true, churchId: true },
    });
  } else if (role === "RESPONSIBLE" && churchId) {
    const dbUsers = await prisma.user.findMany({
      include: { person: { select: { name: true, lastname: true } } },
    });
    users = dbUsers.map((u) => ({
      id: u.id,
      name: u.person.name,
      lastname: u.person.lastname,
    }));
    persons = await prisma.person.findMany({
      where: { active: true, churchId },
      orderBy: [{ name: "asc" }, { lastname: "asc" }],
      select: { id: true, name: true, lastname: true, churchId: true },
    });
  } else if (role === "LEADER") {
    persons = await prisma.person.findMany({
      where: { active: true, churchId: department.churchId },
      orderBy: [{ name: "asc" }, { lastname: "asc" }],
      select: { id: true, name: true, lastname: true },
    });
  }

  const departmentData = {
    id: department.id,
    name: department.name,
    description: department.description,
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <DepartmentForm
        department={departmentData}
        churches={churches}
        users={users}
        persons={persons}
        currentLeaderId={currentLeaderId}
        currentMemberIds={currentMemberIds}
        currentChurchId={currentChurchId}
        redirectTo="/app/departamentos"
        isEdit={true}
        role={role as "ADMIN" | "RESPONSIBLE" | "LEADER"}
        showInfoSection={!isAddMemberMode}
      />
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import prisma from "@/utils/prisma";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { role, name, churchTitle, departmentName, id } = session.user;
  const userId = parseInt(id as string);

  let title: string;
  let roleLabel: string;
  let mobileHeaderLabel: string;
  let isAtencionPrimaria = false;

  switch (role) {
    case "ADMIN":
      title = churchTitle || "Admin";
      roleLabel = "Admin";
      mobileHeaderLabel = "Panel Admin";
      break;
    case "RESPONSIBLE":
      title = churchTitle || "Mi Iglesia";
      roleLabel = "Responsable";
      mobileHeaderLabel = "Panel Responsable";
      break;
    case "LEADER":
      title = departmentName || "Mi Departamento";
      roleLabel = "Líder";
      mobileHeaderLabel = "Mi Departamento";
      break;
    default:
      title = name || "Mi Panel";
      roleLabel = "Miembro";
      mobileHeaderLabel = "Mi Panel";
  }

  const person = await prisma.person.findFirst({
    where: { user: { id: userId } },
    select: { id: true, churchId: true },
  });
  const resolvedChurchId = session.user.churchId ?? person?.churchId ?? null;

  if (resolvedChurchId && person) {
    const atencioPrimaria = await prisma.department.findFirst({
      where: { churchId: resolvedChurchId, name: { contains: "Atención Primaria", mode: "insensitive" } },
    });
    if (atencioPrimaria) {
      const isMember = await prisma.personDepartment.findFirst({
        where: { personId: person.id, departmentId: atencioPrimaria.id, active: true },
      });
      if (isMember) isAtencionPrimaria = true;
    }
  }

  return (
    <AppSidebar
      role={role}
      title={title}
      roleLabel={roleLabel}
      mobileHeaderLabel={mobileHeaderLabel}
      departmentName={departmentName ?? undefined}
      isAtencionPrimaria={isAtencionPrimaria}
    >
      {children}
    </AppSidebar>
  );
}

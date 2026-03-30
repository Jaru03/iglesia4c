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
  if (isNaN(userId)) {
    redirect("/login");
  }

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
      title = name || "Mi Panel";
      roleLabel = "Responsable";
      mobileHeaderLabel = name || "Mi Panel";
      break;
    case "LEADER":
      title = name || "Mi Panel";
      roleLabel = "Líder";
      mobileHeaderLabel = name || "Mi Panel";
      break;
    default:
      title = name || "Mi Panel";
      roleLabel = "Miembro";
      mobileHeaderLabel = "Mi Panel";
  }

  const userRecord = await prisma.user.findUnique({
    where: { id: userId },
    select: { person: { select: { id: true, churchId: true } } },
  });
  const person = userRecord?.person ?? null;
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

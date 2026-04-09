import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import PersonaForm from "@/components/forms/PersonaForm";

export const dynamic = "force-dynamic";

export default async function NuevaPersonaPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role } = session.user;
  const userId = parseInt(session.user.id as string);

  const isAdminOrResponsible = role === "ADMIN" || role === "RESPONSIBLE";

  // Verificar si es miembro de Atención Primaria
  let isAtencionPrimaria = false;
  let userChurchId: number | null = session.user.churchId ?? null;

  if (!isAdminOrResponsible) {
    const person = await prisma.person.findFirst({
      where: { user: { id: userId } },
      select: { id: true, churchId: true },
    });

    userChurchId = person?.churchId ?? null;

    if (userChurchId && person) {
      const atencioPrimariaDept = await prisma.department.findFirst({
        where: { churchId: userChurchId, name: { contains: "Atención Primaria", mode: "insensitive" } },
      });
      if (atencioPrimariaDept) {
        const membership = await prisma.personDepartment.findFirst({
          where: { personId: person.id, departmentId: atencioPrimariaDept.id, active: true },
        });
        if (membership) isAtencionPrimaria = true;
      }
    }

    if (!isAtencionPrimaria) redirect("/app/dashboard");
  }

  // ADMIN: todas las iglesias y departamentos
  // RESPONSIBLE: su iglesia y sus departamentos
  // Atención Primaria: su iglesia y sus departamentos
  const churchIdFilter = isAdminOrResponsible && role === "ADMIN" ? undefined : userChurchId ?? undefined;

  const departments = await prisma.department.findMany({
    where: { active: true, ...(churchIdFilter ? { churchId: churchIdFilter } : {}) },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const churches = role === "ADMIN"
    ? await prisma.church.findMany({
        where: { active: true },
        orderBy: { title: "asc" },
        select: { id: true, title: true },
      })
    : [];

  return (
    <div className="container mx-auto py-6 px-4">
      <PersonaForm
        departments={departments}
        churches={churches}
        isEdit={false}
        isAtencionPrimaria={isAdminOrResponsible ? false : isAtencionPrimaria}
        defaultChurchId={isAdminOrResponsible ? null : userChurchId}
      />
    </div>
  );
}

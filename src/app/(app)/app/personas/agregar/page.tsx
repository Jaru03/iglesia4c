import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { agregarPersonaAlDepartamento } from "@/actions/lider-actions";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AgregarPersonaPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const { role } = session.user;
  const userId = parseInt(session.user.id as string);

  if (role !== "LEADER") redirect("/app/dashboard");

  const { dept } = await searchParams;

  const leaderMemberships = await prisma.departmentMember.findMany({
    where: { userId, roleInDept: "LEADER", active: true },
    include: { department: { select: { id: true, name: true } } },
  });

  if (leaderMemberships.length === 0) redirect("/app/departamentos");

  const allDepts = leaderMemberships.map((m) => m.department);
  const paramDeptId = dept ? parseInt(dept) : NaN;
  const isValid = !isNaN(paramDeptId) && allDepts.some((d) => d.id === paramDeptId);
  const activeDeptId = isValid ? paramDeptId : allDepts[0].id;
  const activeDept = allDepts.find((d) => d.id === activeDeptId)!;

  // Personas que no están ya en el departamento
  const existingPersonIds = await prisma.personDepartment.findMany({
    where: { departmentId: activeDeptId, active: true },
    select: { personId: true },
  });
  const existingIds = existingPersonIds.map((p) => p.personId);

  const personas = await prisma.person.findMany({
    where: {
      active: true,
      ...(existingIds.length > 0 ? { id: { notIn: existingIds } } : {}),
    },
    orderBy: { name: "asc" },
    select: { id: true, name: true, lastname: true, email: true },
  });

  return (
    <div className="max-w-2xl mx-auto p-4 pb-6 space-y-6">
      <DashboardHeader
        title="Agregar Persona"
        subtitle={activeDept.name}
        action={
          <Button asChild variant="outline" size="sm">
            <Link href={`/app/departamentos?dept=${activeDeptId}`}>Volver</Link>
          </Button>
        }
      />

      {personas.length === 0 ? (
        <p className="text-slate-500">No hay personas disponibles para agregar.</p>
      ) : (
        <div className="space-y-2">
          {personas.map((persona) => (
            <form key={persona.id} action={agregarPersonaAlDepartamento as (formData: FormData) => Promise<void>}>
              <input type="hidden" name="departmentId" value={activeDeptId} />
              <input type="hidden" name="personId" value={persona.id} />
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm">
                <div>
                  <p className="font-medium text-slate-800">{persona.name} {persona.lastname}</p>
                  {persona.email && <p className="text-sm text-slate-500">{persona.email}</p>}
                </div>
                <Button type="submit" size="sm" variant="outline">
                  Agregar
                </Button>
              </div>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}

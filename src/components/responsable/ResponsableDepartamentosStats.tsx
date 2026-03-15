import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";
import { StatCard } from "@/components/dashboard/StatCard";
import { Building2, CheckCircle, Activity, Users } from "lucide-react";

export async function ResponsableDepartamentosStats() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.churchId) {
    return null;
  }

  const churchId = session.user.churchId;

  const [total, activos] = await Promise.all([
    prisma.department.count({ where: { churchId } }),
    prisma.department.count({ where: { churchId, active: true } }),
  ]);

  const conActividades = await prisma.department.count({
    where: {
      churchId,
      activities: { some: {} },
    },
  });

  const totalMiembros = await prisma.personDepartment.count({
    where: { department: { churchId }, active: true },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      <StatCard title="Total Departamentos" value={total} icon={Building2} colorIndex={0} />
      <StatCard title="Activos" value={activos} icon={CheckCircle} colorIndex={1} />
      <StatCard title="Con Actividades" value={conActividades} icon={Activity} colorIndex={2} />
      <StatCard title="Total Miembros" value={totalMiembros} icon={Users} colorIndex={3} />
    </div>
  );
}

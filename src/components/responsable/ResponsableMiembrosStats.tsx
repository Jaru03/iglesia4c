import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";

export async function ResponsableMiembrosStats() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.churchId) {
    return null;
  }

  const churchId = session.user.churchId;
  const hoy = new Date();
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  const [total, activos, inactivos] = await Promise.all([
    prisma.person.count({ where: { churchId, active: true, membershipStatus: "ACTIVE" } }),
    prisma.person.count({ where: { churchId, active: true, membershipStatus: "ACTIVE" } }),
    prisma.person.count({ where: { churchId, active: false, membershipStatus: "ACTIVE" } }),
  ]);

  const nuevosEsteMes = await prisma.person.count({
    where: {
      churchId,
      active: true,
      membershipStatus: "ACTIVE",
      createdAt: { gte: inicioMes },
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      <StatCard title="Total Miembros" value={total} icon={Users} colorIndex={0} />
      <StatCard title="Activos" value={activos} icon={UserCheck} colorIndex={1} />
      <StatCard title="Inactivos" value={inactivos} icon={UserX} colorIndex={2} />
      <StatCard title="Nuevos Este Mes" value={nuevosEsteMes} icon={UserPlus} colorIndex={3} />
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, UserCircle, UserCheck, UserX } from "lucide-react";

export async function ResponsablePersonasStats() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.churchId) {
    return null;
  }

  const churchId = session.user.churchId;

  const [total, activos, inactivos, miembros, visitas] = await Promise.all([
    prisma.person.count({ where: { churchId } }),
    prisma.person.count({ where: { churchId, active: true } }),
    prisma.person.count({ where: { churchId, active: false } }),
    prisma.person.count({ where: { churchId, active: true, membershipStatus: "MEMBER" } }),
    prisma.person.count({ where: { churchId, active: true, membershipStatus: "VISITOR" } }),
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
      <StatCard title="Total Personas" value={total} icon={UserCircle} colorIndex={0} />
      <StatCard title="Activos" value={activos} icon={UserCheck} colorIndex={1} />
      <StatCard title="Inactivos" value={inactivos} icon={UserX} colorIndex={2} />
      <StatCard title="Miembros" value={miembros} icon={Users} colorIndex={3} />
      <StatCard title="Visitas" value={visitas} icon={UserCircle} colorIndex={4} />
    </div>
  );
}

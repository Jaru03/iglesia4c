import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/utils/prisma";
import { StatCard } from "@/components/dashboard/StatCard";
import { Activity, Clock, History, Calendar } from "lucide-react";

export async function ResponsableActividadesStats() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.churchId) {
    return null;
  }

  const churchId = session.user.churchId;
  const hoy = new Date();
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);

  const [total, proximas, pasadas] = await Promise.all([
    prisma.activity.count({ where: { department: { churchId } } }),
    prisma.activity.count({ where: { department: { churchId }, hourStart: { gte: hoy } } }),
    prisma.activity.count({ where: { department: { churchId }, hourStart: { lt: hoy } } }),
  ]);

  const esteMes = await prisma.activity.count({
    where: {
      department: { churchId },
      hourStart: { gte: inicioMes, lt: finMes },
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      <StatCard title="Total Actividades" value={total} icon={Activity} colorIndex={0} />
      <StatCard title="Próximas" value={proximas} icon={Clock} colorIndex={1} />
      <StatCard title="Pasadas" value={pasadas} icon={History} colorIndex={2} />
      <StatCard title="Este Mes" value={esteMes} icon={Calendar} colorIndex={3} />
    </div>
  );
}

import { Activity, Building2, Users, UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { OverviewChart } from "@/components/admin/Charts";
import { SummaryCard } from "@/components/admin/SummaryCard";

interface Props {
  totalMiembros: number;
  totalPersonas: number;
  totalDepartamentos: number;
  totalActividades: number;
  totalVisitas: number;
  peticionesPendientes: number;
  personasRecientes: { id: number; name: string; lastname: string; email: string | null }[];
  eventosProximos: { id: number; title: string; hourStart: string }[];
  personasHref: string;
  actividadesHref: string;
}

export function ResponsableEstadisticasTab({
  totalMiembros,
  totalPersonas,
  totalDepartamentos,
  totalActividades,
  totalVisitas,
  peticionesPendientes,
  personasRecientes,
  eventosProximos,
  personasHref,
  actividadesHref,
}: Props) {
  const overviewData = [
    { name: "Miembros", value: totalMiembros, fill: "#3b82f6" },
    { name: "Personas", value: totalPersonas, fill: "#10b981" },
    { name: "Departamentos", value: totalDepartamentos, fill: "#8b5cf6" },
    { name: "Visitas", value: totalVisitas, fill: "#f59e0b" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard title="Miembros" value={totalMiembros} icon={Users} colorIndex={0} />
        <StatCard title="Personas" value={totalPersonas} icon={UserCircle} colorIndex={1} />
        <StatCard title="Departamentos" value={totalDepartamentos} icon={Building2} colorIndex={2} />
        <StatCard title="Actividades" value={totalActividades} icon={Activity} colorIndex={3} />
        <StatCard title="Visitas" value={totalVisitas} icon={UserCircle} colorIndex={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 flex flex-col shadow-md border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Resumen</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <OverviewChart data={overviewData} />
          </CardContent>
        </Card>

        <div className="grid grid-rows-2 gap-4">
          <SummaryCard 
            title="Personas" 
            icon={UserCircle} 
            iconColor="text-emerald-600" 
            href={personasHref}
            variant="personas"
            data={personasRecientes}
          />

          <SummaryCard 
            title="Actividades" 
            icon={Activity} 
            iconColor="text-purple-600" 
            href={actividadesHref}
            variant="actividades"
            data={eventosProximos}
          />
        </div>
      </div>
    </div>
  );
}

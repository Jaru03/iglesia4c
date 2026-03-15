import { Activity, Calendar, ClipboardCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { OverviewChart } from "@/components/admin/Charts";
import { SummaryCard } from "@/components/admin/SummaryCard";

interface Props {
  totalMiembros: number;
  totalActividades: number;
  actividadesProximas: number;
  totalAsistencias: number;
  miembrosRecientes: { id: number; name: string; lastname: string; email: string | null }[];
  actividadesProximasList: { id: number; title: string; hourStart: string; place: string }[];
  personasHref: string;
  actividadesHref: string;
}

export function LiderEstadisticasTab({
  totalMiembros,
  totalActividades,
  actividadesProximas,
  totalAsistencias,
  miembrosRecientes,
  actividadesProximasList,
  personasHref,
  actividadesHref,
}: Props) {
  const overviewData = [
    { name: "Miembros", value: totalMiembros, fill: "#3b82f6" },
    { name: "Actividades", value: totalActividades, fill: "#10b981" },
    { name: "Próximas", value: actividadesProximas, fill: "#8b5cf6" },
    { name: "Asistencias", value: totalAsistencias, fill: "#f59e0b" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard title="Miembros" value={totalMiembros} icon={Users} colorIndex={0} />
        <StatCard title="Actividades" value={totalActividades} icon={Activity} colorIndex={1} />
        <StatCard title="Próximas" value={actividadesProximas} icon={Calendar} colorIndex={3} />
        <StatCard title="Asistencias" value={totalAsistencias} icon={ClipboardCheck} colorIndex={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 flex flex-col shadow-md border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Resumen del departamento</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <OverviewChart data={overviewData} />
          </CardContent>
        </Card>

        <div className="grid grid-rows-2 gap-4">
          <SummaryCard 
            title="Miembros" 
            icon={Users} 
            iconColor="text-blue-600" 
            href={personasHref}
            variant="personas"
            data={miembrosRecientes}
          />

          <SummaryCard 
            title="Próximas actividades" 
            icon={Activity} 
            iconColor="text-emerald-600" 
            href={actividadesHref}
            variant="actividades"
            data={actividadesProximasList}
          />
        </div>
      </div>
    </div>
  );
}
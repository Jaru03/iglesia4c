import { Activity, Building2, CalendarDays, Church, Hand, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { OverviewChart } from "@/components/admin/Charts";
import { SummaryCard } from "@/components/admin/SummaryCard";

interface Props {
  totalPersonas: number;
  totalIglesias: number;
  totalDepartamentos: number;
  totalActividades: number;
  peticionesPendientes: number;
  ultimasPersonas: { id: number; name: string; lastname: string; membershipStatus: string; email?: string | null }[];
  ultimasPeticiones: { id: number; nombre: string; status: string }[];
  eventosProximos: { id: number; title: string; hourStart: string; place: string }[];
  personasHref: string;
  peticionesHref: string;
  actividadesHref: string;
}

export function AdminEstadisticasTab({
  totalPersonas,
  totalIglesias,
  totalDepartamentos,
  totalActividades,
  peticionesPendientes,
  ultimasPersonas,
  ultimasPeticiones,
  eventosProximos,
  personasHref,
  peticionesHref,
  actividadesHref,
}: Props) {
  const overviewData = [
    { name: "Iglesias", value: totalIglesias, fill: "#3b82f6" },
    { name: "Personas", value: totalPersonas, fill: "#10b981" },
    { name: "Departamentos", value: totalDepartamentos, fill: "#8b5cf6" },
    { name: "Actividades", value: totalActividades, fill: "#f59e0b" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
        <StatCard title="Iglesias" value={totalIglesias} icon={Church} colorIndex={0} />
        <StatCard title="Personas" value={totalPersonas} icon={Users} colorIndex={1} />
        <StatCard title="Departamentos" value={totalDepartamentos} icon={Building2} colorIndex={2} />
        <StatCard title="Actividades" value={totalActividades} icon={Activity} colorIndex={3} />
        <StatCard title="Peticiones" value={peticionesPendientes} icon={Activity} colorIndex={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-md border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Resumen</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
              <OverviewChart data={overviewData} />
          </CardContent>
        </Card>
        <div className="grid grid-rows-2 gap-4">
          <SummaryCard 
            title="Personas" 
            icon={Users} 
            iconColor="text-emerald-600" 
            href={personasHref}
            variant="personas"
            data={ultimasPersonas}
          />

          <SummaryCard 
            title="Actividades" 
            icon={CalendarDays} 
            iconColor="text-blue-600" 
            href={actividadesHref}
            variant="actividades"
            data={eventosProximos}
          />
        </div>
      </div>
    </div>
  );
}

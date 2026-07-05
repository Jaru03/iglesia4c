import { CalendarClock, CalendarDays, Hand, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { OverviewChart } from "@/components/admin/Charts";
import { SummaryCard } from "@/components/admin/SummaryCard";

interface WeekMetric {
  esta: number;
  pasada: number;
}

interface Props {
  rangoEsta: string;
  rangoPasada: string;
  personas: WeekMetric;
  actividades: WeekMetric;
  peticiones: WeekMetric;
  citas: WeekMetric;
  personasNuevas: { id: number; name: string; lastname: string; email?: string | null }[];
  actividadesNuevas: { id: number; title: string; hourStart: string; place: string }[];
  personasHref: string;
  actividadesHref: string;
}

export function ResponsableEstadisticasTab({
  rangoEsta,
  rangoPasada,
  personas,
  actividades,
  peticiones,
  citas,
  personasNuevas,
  actividadesNuevas,
  personasHref,
  actividadesHref,
}: Props) {
  const overviewData = [
    { name: "Personas", value: personas.esta, valuePasada: personas.pasada, fill: "#10b981" },
    { name: "Actividades", value: actividades.esta, valuePasada: actividades.pasada, fill: "#3b82f6" },
    { name: "Peticiones", value: peticiones.esta, valuePasada: peticiones.pasada, fill: "#f59e0b" },
    { name: "Citas", value: citas.esta, valuePasada: citas.pasada, fill: "#8b5cf6" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Personas nuevas" value={personas.esta} icon={Users} colorIndex={1} />
        <StatCard title="Actividades nuevas" value={actividades.esta} icon={CalendarDays} colorIndex={0} />
        <StatCard title="Peticiones nuevas" value={peticiones.esta} icon={Hand} colorIndex={2} />
        <StatCard title="Citas nuevas" value={citas.esta} icon={CalendarClock} colorIndex={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 flex flex-col shadow-md border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Resumen</CardTitle>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#3b82f6] inline-block" />
                Esta semana {rangoEsta}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-slate-300 inline-block" />
                Semana pasada {rangoPasada}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <OverviewChart data={overviewData} comparison />
          </CardContent>
        </Card>

        <div className="grid grid-rows-2 gap-4">
          <SummaryCard
            title="Personas nuevas"
            icon={Users}
            iconColor="text-emerald-600"
            href={personasHref}
            variant="personas"
            data={personasNuevas}
          />

          <SummaryCard
            title="Actividades nuevas"
            icon={CalendarDays}
            iconColor="text-blue-600"
            href={actividadesHref}
            variant="actividades"
            data={actividadesNuevas}
          />
        </div>
      </div>
    </div>
  );
}

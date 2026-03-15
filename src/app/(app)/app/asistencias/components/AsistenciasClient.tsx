"use client";

import { useRouter } from "next/navigation";
import { ClipboardCheck, Clock, MapPin, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";
import { ActivityStatusBadge } from "@/components/dashboard/ActivityStatusBadge";

interface Actividad {
  id: number;
  title: string;
  place: string;
  hourStart: Date | string;
  _count: { attendances: number };
}

interface DeptTab {
  name: string;
  departmentIds: number[];
  isGrouped: boolean;
}

type Role = "ADMIN" | "RESPONSIBLE" | "LEADER";

interface Props {
  actividades: Actividad[];
  departmentName: string;
  allDepts: DeptTab[];
  activeDeptId: number;
  showAllOption?: boolean;
  role: Role;
}

export function AsistenciasClient({
  actividades,
  departmentName,
  allDepts,
  activeDeptId,
  showAllOption = false,
  role,
}: Props) {
  const router = useRouter();

  const now = new Date();
  const totalAsistencias = actividades.reduce((sum, a) => sum + a._count.attendances, 0);
  const pasadas = actividades.filter((a) => new Date(a.hourStart) < now).length;
  const proximas = actividades.filter((a) => new Date(a.hourStart) >= now).length;

  const tabs =
    (showAllOption || allDepts.length > 1) ? (
      <Tabs
        value={activeDeptId === -1 ? "all" : departmentName}
        onValueChange={(id) => router.push(`/app/asistencias?dept=${id}`)}
      >
        <TabsList>
          {showAllOption && (
            <TabsTrigger value="all">
              Todas
            </TabsTrigger>
          )}
          {allDepts.map((d) => (
            <TabsTrigger key={d.name} value={d.name}>
              {d.name}
              {d.isGrouped && <span className="text-xs opacity-70 ml-1">(x{d.departmentIds.length})</span>}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    ) : undefined;

  return (
    <PageLayout
      title="Asistencias"
      subtitle={departmentName}
      tabs={tabs}
      statsColumns={4}
      stats={[
        { title: "Total", value: actividades.length, icon: ClipboardCheck, colorIndex: 0 },
        { title: "Asistencias", value: totalAsistencias, icon: Users, colorIndex: 1 },
        { title: "Pasadas", value: pasadas, icon: Clock, colorIndex: 2 },
        { title: "Próximas", value: proximas, icon: Clock, colorIndex: 3 },
      ]}
      listTitle="Lista de Actividades"
    >
      <ResourceList
        items={actividades}
        emptyMessage="No hay actividades registradas."
        emptyIconName="ClipboardCheck"
        renderItem={(actividad) => (
          <ListItem
            avatar={{ icon: ClipboardCheck, color: "blue", shape: "circle" }}
            title={actividad.title}
            meta={[
              { icon: MapPin, text: actividad.place },
              {
                icon: Clock,
                text: new Date(actividad.hourStart).toLocaleString("es-ES", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }),
              },
            ]}
            badges={[
              { label: `${actividad._count.attendances} asistentes`, variant: "secondary" as const },
            ]}
            customActions={<ActivityStatusBadge hourStart={actividad.hourStart} />}
            editHref={`/app/asistencias/${actividad.id}`}
          />
        )}
      />
    </PageLayout>
  );
}

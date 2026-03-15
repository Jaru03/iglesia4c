"use client";

import { ClipboardCheck, Clock, MapPin } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";

interface Attendance {
  id: number;
  attended: boolean;
  activity: {
    id: number;
    title: string;
    place: string;
    hourStart: Date | string;
  };
}

interface Props {
  attendances: Attendance[];
}

export function AsistenciasUserClient({ attendances }: Props) {
  const now = new Date();
  const total = attendances.length;
  const asistio = attendances.filter((a) => a.attended).length;
  const futuras = attendances.filter((a) => new Date(a.activity.hourStart) >= now).length;

  return (
    <PageLayout
      title="Mis Asistencias"
      subtitle="Historial de asistencia"
      stats={[
        { title: "Total", value: total, icon: ClipboardCheck, colorIndex: 0 },
        { title: "Asistí", value: asistio, icon: ClipboardCheck, colorIndex: 1 },
        { title: "Próximas", value: futuras, icon: Clock, colorIndex: 2 },
      ]}
      listTitle="Historial de Actividades"
    >
      <ResourceList
        items={attendances}
        emptyMessage="No hay actividades registradas."
        emptyIconName="ClipboardCheck"
        renderItem={(attendance) => (
          <ListItem
            avatar={{ icon: ClipboardCheck, color: attendance.attended ? "emerald" : "slate", shape: "circle" }}
            title={attendance.activity.title}
            meta={[
              { icon: MapPin, text: attendance.activity.place },
              {
                icon: Clock,
                text: new Date(attendance.activity.hourStart).toLocaleString("es-ES", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }),
              },
            ]}
            badges={[
              { 
                label: attendance.attended ? "Asistió" : "No asistió", 
                variant: attendance.attended ? "secondary" as const : "destructive" as const 
              },
            ]}
          />
        )}
      />
    </PageLayout>
  );
}

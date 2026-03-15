"use client";

import { useRouter } from "next/navigation";
import { Activity, Calendar, Clock, MapPin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";
import { eliminarActividadLider } from "@/actions/lider-actions";
import { ActivityStatusBadge } from "@/components/dashboard/ActivityStatusBadge";
import toast from "react-hot-toast";

interface Actividad {
  id: number;
  title: string;
  place: string;
  img: string | null;
  hourStart: Date | string;
  hourEnd: Date | string;
}

interface DeptTab {
  name: string;
  departmentIds: number[];
  isGrouped: boolean;
}

type Role = "ADMIN" | "RESPONSIBLE" | "LEADER";

interface Props {
  actividades: Actividad[];
  departmentId: number;
  departmentName: string;
  allDepts: DeptTab[];
  activeDeptId: number;
  showAllOption?: boolean;
  role: Role;
}

export function ActividadesClient({
  actividades,
  departmentId,
  departmentName,
  allDepts,
  activeDeptId,
  showAllOption = false,
  role,
}: Props) {
  const router = useRouter();
  const isAdmin = role === "ADMIN";
  const isResponsable = role === "RESPONSIBLE";
  const isLeader = role === "LEADER";
  const canEdit = isAdmin || isResponsable || isLeader;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const hoy = actividades.filter(
    (a) => new Date(a.hourStart) >= today && new Date(a.hourStart) < tomorrow
  ).length;
  const proximas = actividades.filter((a) => new Date(a.hourStart) > now).length;
  const pasadas = actividades.filter((a) => new Date(a.hourStart) < now).length;

  const tabs =
    (showAllOption || allDepts.length > 1) ? (
      <Tabs
        value={activeDeptId === -1 ? "all" : activeDeptId.toString()}
        onValueChange={(id) => router.push(`/app/actividades?dept=${id}`)}
      >
        <TabsList>
          {showAllOption && (
            <TabsTrigger value="all">
              Todo
            </TabsTrigger>
          )}
          {allDepts.map((d) => (
            <TabsTrigger key={d.departmentIds[0]} value={d.departmentIds[0].toString()}>
              {d.name}
              {d.isGrouped && <span className="text-xs opacity-70 ml-1">(x{d.departmentIds.length})</span>}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    ) : undefined;

  return (
    <PageLayout
      title="Actividades"
      subtitle={departmentName}
      tabs={tabs}
      statsColumns={4}
      stats={[
        { title: "Total", value: actividades.length, icon: Activity, colorIndex: 0 },
        { title: "Hoy", value: hoy, icon: Calendar, colorIndex: 1 },
        { title: "Próximas", value: proximas, icon: Calendar, colorIndex: 2 },
        { title: "Pasadas", value: pasadas, icon: Calendar, colorIndex: 3 },
      ]}
      listTitle="Lista de Actividades"
      fab={canEdit ? { href: `/app/actividades/nuevo?dept=${activeDeptId === -1 ? allDepts[0]?.departmentIds[0] : activeDeptId}`, label: "Nueva actividad" } : undefined}
    >
      <ResourceList
        items={actividades}
        emptyMessage="No hay actividades registradas."
        emptyIconName="Activity"
        renderItem={(actividad) => (
          <ListItem
            avatar={{ icon: Activity, color: "emerald", image: actividad.img, imageAlt: actividad.title }}
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
            customActions={<ActivityStatusBadge hourStart={actividad.hourStart} />}
            {...(canEdit && {
              editHref: `/app/actividades/${actividad.id}/editar`,
              deleteTitle: "Eliminar actividad",
              deleteItemName: actividad.title,
              onDelete: async () => {
                const formData = new FormData();
                formData.append("activityId", actividad.id.toString());
                formData.append("departmentId", departmentId.toString());
                const res = await eliminarActividadLider(formData);
                if (res?.error) {
                  toast.error(res.error);
                  return res;
                }
                toast.success("Actividad eliminada");
              },
            })}
          />
        )}
      />
    </PageLayout>
  );
}

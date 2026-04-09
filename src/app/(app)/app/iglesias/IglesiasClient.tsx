"use client";

import { Church, Users, Calendar, UserCog } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { IglesiaListItem, type IglesiaItem } from "@/components/dashboard/items/IglesiaListItem";

interface Props {
  items: IglesiaItem[];
}

export function IglesiasClient({ items }: Props) {
  const totalPersons = items.reduce((sum, item) => sum + (item._count?.persons || 0), 0);
  const totalSchedules = items.reduce((sum, item) => sum + (item.schedules?.length || 0), 0);
  const totalLideres = items.reduce((sum, item) => sum + (item.leaders?.filter((l) => l.role === "LEADER").length || 0), 0);
  const totalResponsables = items.reduce((sum, item) => sum + (item.leaders?.filter((l) => l.role === "RESPONSIBLE").length || 0), 0);

  return (
    <PageLayout
      title="Iglesias"
      subtitle="Todas las iglesias"
      statsColumns={5}
      stats={[
        { title: "Total iglesias", value: items.length, icon: Church, colorIndex: 0 },
        { title: "Total miembros", value: totalPersons, icon: Users, colorIndex: 1 },
        { title: "Total cultos", value: totalSchedules, icon: Calendar, colorIndex: 2 },
        { title: "Total líderes", value: totalLideres, icon: UserCog, colorIndex: 3 },
        { title: "Total responsables", value: totalResponsables, icon: UserCog, colorIndex: 4 },
      ]}
      listTitle="Lista de Iglesias"
      fab={{ href: "/app/iglesias/nueva", label: "Nueva iglesia" }}
    >
      <ResourceList
        items={items}
        emptyMessage="No hay iglesias registradas."
        emptyIconName="Church"
        renderItem={(iglesia) => (
          <IglesiaListItem
            iglesia={iglesia}
            editHref={`/app/iglesias/${iglesia.id}/editar`}
          />
        )}
      />
    </PageLayout>
  );
}

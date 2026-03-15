"use client";

import { Megaphone, Users, Calendar, Building2 } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { DepartamentoListItem, type DepartamentoItem } from "@/components/dashboard/items/DepartamentoListItem";

interface Props {
  items: DepartamentoItem[];
  subtitle: string;
}

export function DepartamentosClient({ items, subtitle }: Props) {
  const totalMembers = items.reduce((sum, item) => sum + (item._count?.persons || 0), 0);
  const totalActivities = items.reduce((sum, item) => sum + (item._count?.activities || 0), 0);

  return (
    <PageLayout
      title="Departamentos"
      subtitle={subtitle}
      statsColumns={4}
      stats={[
        { title: "Total", value: items.length, icon: Megaphone, colorIndex: 0 },
        { title: "Miembros", value: totalMembers, icon: Users, colorIndex: 1 },
        { title: "Actividades", value: totalActivities, icon: Calendar, colorIndex: 2 },
        { title: "Iglesias", value: new Set(items.filter(i => i.church).map(i => i.churchId)).size, icon: Building2, colorIndex: 3 },
      ]}
      listTitle="Lista de Departamentos"
      fab={{ href: "/app/departamentos/nuevo", label: "Nuevo departamento" }}
    >
      <ResourceList
        items={items}
        emptyMessage="No hay departamentos registrados."
        emptyIconName="Megaphone"
        renderItem={(departamento) => (
          <DepartamentoListItem
            departamento={departamento}
            editHref={`/app/departamentos/editar?id=${departamento.id}`}
          />
        )}
      />
    </PageLayout>
  );
}

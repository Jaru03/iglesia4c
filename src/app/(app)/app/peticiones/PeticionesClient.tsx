"use client";

import { MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { PeticionListItem, type PeticionItem } from "@/components/dashboard/items/PeticionListItem";

interface Props {
  items: PeticionItem[];
  total: number;
  pendientes: number;
  enProceso: number;
  atendidas: number;
}

export function PeticionesClient({ items, total, pendientes, enProceso, atendidas }: Props) {
  return (
    <PageLayout
      title="Peticiones"
      subtitle="Peticiones de oración"
      statsColumns={4}
      stats={[
        { title: "Total", value: total, icon: MessageCircle, colorIndex: 0 },
        { title: "Pendientes", value: pendientes, icon: MessageCircle, colorIndex: 1 },
        { title: "En proceso", value: enProceso, icon: MessageCircle, colorIndex: 2 },
        { title: "Atendidas", value: atendidas, icon: MessageCircle, colorIndex: 3 },
      ]}
      listTitle="Lista de Peticiones"
    >
      <ResourceList
        items={items}
        emptyMessage="No hay peticiones."
        emptyIconName="MessageCircle"
        renderItem={(peticion) => <PeticionListItem peticion={peticion} />}
      />
    </PageLayout>
  );
}

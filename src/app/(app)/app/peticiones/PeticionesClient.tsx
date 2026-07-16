"use client";

import { useState, useMemo } from "react";
import { MessageCircle, SlidersHorizontal } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { PeticionListItem, type PeticionItem } from "@/components/dashboard/items/PeticionListItem";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  items: PeticionItem[];
  total: number;
  pendientes: number;
  enProceso: number;
  atendidas: number;
}

export function PeticionesClient({ items, total, pendientes, enProceso, atendidas }: Props) {
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  // Por defecto se muestran las peticiones pendientes y en proceso; las atendidas
  // son una opción más del filtro.
  const [filtros, setFiltros] = useState<{ status: string }>({ status: "activas" });

  const itemsFiltrados = useMemo(() => {
    if (filtros.status === "all") return items;
    if (filtros.status === "activas") {
      return items.filter((i) => i.status === "PENDIENTE" || i.status === "EN_PROCESO");
    }
    return items.filter((i) => i.status === filtros.status);
  }, [items, filtros]);

  const hasActiveFiltro = filtros.status !== "activas";

  return (
    <>
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
          items={itemsFiltrados}
          emptyMessage="No hay peticiones."
          emptyIconName="MessageCircle"
          renderItem={(peticion) => <PeticionListItem peticion={peticion} />}
        />
      </PageLayout>

      {/* Filter FAB */}
      <button
        onClick={() => setFiltrosOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 active:scale-95 transition-all"
        aria-label="Filtros"
      >
        <SlidersHorizontal className="h-5 w-5" />
        {hasActiveFiltro && (
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary border-2 border-background" />
        )}
      </button>

      {/* Filter Drawer */}
      <Sheet open={filtrosOpen} onOpenChange={setFiltrosOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xs flex flex-col gap-0 p-0">
          <SheetHeader className="px-6 py-5 border-b">
            <SheetTitle className="flex items-center gap-2">
              Filtros
              {hasActiveFiltro && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  1
                </span>
              )}
            </SheetTitle>
            <SheetDescription>Ajusta qué peticiones se muestran.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Estado</Label>
              <Select
                value={filtros.status}
                onValueChange={(v) => setFiltros({ status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activas">Pendientes y en proceso</SelectItem>
                  <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                  <SelectItem value="EN_PROCESO">En proceso</SelectItem>
                  <SelectItem value="ATENDIDA">Atendida</SelectItem>
                  <SelectItem value="all">Todas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFiltro && (
            <div className="px-6 py-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setFiltros({ status: "activas" })}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

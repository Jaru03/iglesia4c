"use client";

import { useState, useMemo } from "react";
import { Megaphone, Users, Calendar, UserCog, SlidersHorizontal } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { DepartamentoListItem, type DepartamentoItem } from "@/components/dashboard/items/DepartamentoListItem";
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
  items: DepartamentoItem[];
  subtitle: string;
  isAdmin?: boolean;
}

export function DepartamentosClient({ items, subtitle, isAdmin }: Props) {
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [filtros, setFiltros] = useState<{ churchId: number | null }>({ churchId: null });

  const churches = useMemo(() => {
    const seen = new Set<number>();
    const result: { id: number; title: string }[] = [];
    for (const item of items) {
      if (item.church && !seen.has(item.church.id)) {
        seen.add(item.church.id);
        result.push({ id: item.church.id, title: item.church.title });
      }
    }
    return result.sort((a, b) => a.title.localeCompare(b.title));
  }, [items]);

  const itemsFiltrados = useMemo(() => {
    if (!filtros.churchId) return items;
    return items.filter((i) => i.church?.id === filtros.churchId);
  }, [items, filtros]);

  const totalMembers = itemsFiltrados.reduce((sum, item) => sum + (item._count?.persons || 0), 0);
  const totalActivities = itemsFiltrados.reduce((sum, item) => sum + (item._count?.activities || 0), 0);
  const totalLideres = itemsFiltrados.reduce((sum, item) => sum + (item.leadersCount || 0), 0);

  const showChurchFilter = isAdmin && churches.length > 1;
  const hasActiveFiltro = filtros.churchId !== null;

  return (
    <>
      <PageLayout
        title="Departamentos"
        subtitle={subtitle}
        statsColumns={4}
        stats={[
          { title: "Total", value: itemsFiltrados.length, icon: Megaphone, colorIndex: 0 },
          { title: "Miembros", value: totalMembers, icon: Users, colorIndex: 1 },
          { title: "Actividades", value: totalActivities, icon: Calendar, colorIndex: 2 },
          { title: "Líderes", value: totalLideres, icon: UserCog, colorIndex: 3 },
        ]}
        listTitle="Lista de Departamentos"
        fab={{ href: "/app/departamentos/nuevo", label: "Nuevo departamento" }}
      >
        <ResourceList
          items={itemsFiltrados}
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

      {showChurchFilter && (
        <>
          {/* Filter FAB */}
          <button
            onClick={() => setFiltrosOpen(true)}
            className="fixed bottom-24 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 active:scale-95 transition-all"
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
                <SheetDescription>Ajusta qué departamentos se muestran.</SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Iglesia</Label>
                  <Select
                    value={filtros.churchId ? String(filtros.churchId) : "all"}
                    onValueChange={(v) =>
                      setFiltros({ churchId: v === "all" ? null : Number(v) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las iglesias</SelectItem>
                      {churches.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {hasActiveFiltro && (
                <div className="px-6 py-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setFiltros({ churchId: null })}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
}

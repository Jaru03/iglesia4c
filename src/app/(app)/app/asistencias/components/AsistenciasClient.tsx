"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Clock, MapPin, SlidersHorizontal, Users, CalendarCheck } from "lucide-react";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";
import { ActivityStatusBadge } from "@/components/dashboard/ActivityStatusBadge";
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

interface Actividad {
  id: number;
  title: string;
  place: string;
  hourStart: Date | string;
  allowPreRegistration?: boolean;
  preRegisteredCount?: number;
  _count: { attendances: number };
}

interface DeptTab {
  name: string;
  departmentIds: number[];
  isGrouped: boolean;
}

interface Props {
  actividades: Actividad[];
  departmentName: string;
  allDepts: DeptTab[];
  activeDeptId: number;
  showAllOption?: boolean;
  role?: string;
}

export function AsistenciasClient({
  actividades,
  departmentName,
  allDepts,
  activeDeptId,
  showAllOption = false,
}: Props) {
  const router = useRouter();
  const [filtrosOpen, setFiltrosOpen] = useState(false);

  const now = new Date();
  const totalAsistencias = actividades.reduce((sum, a) => sum + a._count.attendances, 0);
  const pasadas = actividades.filter((a) => new Date(a.hourStart) < now).length;
  const proximas = actividades.filter((a) => new Date(a.hourStart) >= now).length;

  const hasDeptFilter = showAllOption || allDepts.length > 1;
  const hasActiveFiltro = activeDeptId !== -1;
  const currentValue = activeDeptId === -1 ? "all" : departmentName;

  return (
    <>
      <PageLayout
        title="Asistencias"
        subtitle={departmentName}
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
          renderItem={(actividad) => {
            const isFuture = new Date(actividad.hourStart) >= now;
            const hasPreReg = actividad.allowPreRegistration && (actividad.preRegisteredCount ?? 0) > 0;
            return (
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
                  ...(!isFuture
                    ? [{ label: `${actividad._count.attendances} asistentes`, variant: "secondary" as const }]
                    : []),
                  ...(hasPreReg
                    ? [{ label: `${actividad.preRegisteredCount} pre-registrados`, variant: "outline" as const }]
                    : []),
                ]}
                customActions={<ActivityStatusBadge hourStart={actividad.hourStart} />}
                modalContent={
                  <div className="space-y-3 pt-1 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{actividad.place}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{new Date(actividad.hourStart).toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" })}</span>
                    </div>
                    {!isFuture && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>{actividad._count.attendances} asistentes registrados</span>
                      </div>
                    )}
                    {actividad.allowPreRegistration && (
                      <div className="flex items-center gap-2">
                        <CalendarCheck className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>{actividad.preRegisteredCount ?? 0} pre-registrados</span>
                      </div>
                    )}
                  </div>
                }
                editHref={`/app/asistencias/${actividad.id}`}
              />
            );
          }}
        />
      </PageLayout>

      {hasDeptFilter && (
        <>
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
                <SheetDescription>Ajusta qué actividades se muestran.</SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Departamento</Label>
                  <Select
                    value={currentValue}
                    onValueChange={(v) => {
                      router.push(`/app/asistencias?dept=${v}`);
                      setFiltrosOpen(false);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {showAllOption && <SelectItem value="all">Todos</SelectItem>}
                      {allDepts.map((d) => (
                        <SelectItem key={d.name} value={d.name}>
                          {d.name}
                          {d.isGrouped && (
                            <span className="text-xs opacity-70 ml-1">(x{d.departmentIds.length})</span>
                          )}
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
                    onClick={() => {
                      router.push("/app/asistencias?dept=all");
                      setFiltrosOpen(false);
                    }}
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

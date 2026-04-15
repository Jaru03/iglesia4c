"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Calendar, Clock, MapPin, ChevronLeft, ChevronRight, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { PageLayout } from "@/components/dashboard/PageLayout";
import { ResourceList } from "@/components/dashboard/ResourceList";
import { ListItem } from "@/components/dashboard/ListItem";
import { eliminarActividadLider } from "@/actions/lider-actions";
import { ActivityStatusBadge } from "@/components/dashboard/ActivityStatusBadge";
import { format, addMonths, subMonths, isSameDay, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import toast from "react-hot-toast";

interface Actividad {
  id: number;
  title: string;
  place: string;
  img: string | null;
  hourStart: Date | string;
  hourEnd: Date | string;
}

interface CalendarActividad {
  id: number;
  title: string;
  place: string;
  hourStart: string;
  hourEnd: string;
  img: string | null;
  showCalendar: boolean;
  departmentName: string;
}

interface DeptTab {
  name: string;
  departmentIds: number[];
  isGrouped: boolean;
}

const DATE_RANGE_OPTIONS = [
  { label: "Todo", value: "all" },
  { label: "Hoy", value: "1d" },
  { label: "1 semana", value: "1w" },
  { label: "1 mes", value: "1m" },
  { label: "2 meses", value: "2m" },
  { label: "3 meses", value: "3m" },
  { label: "6 meses", value: "6m" },
  { label: "1 año", value: "1y" },
];

type Role = "ADMIN" | "RESPONSIBLE" | "LEADER";

interface Props {
  actividades: Actividad[];
  departmentId: number | null;
  departmentName: string;
  allDepts: DeptTab[];
  activeDeptId: number | null;
  showAllOption?: boolean;
  role: Role;
  calendarActividades?: CalendarActividad[];
  activeFechaRange?: string;
}

// ─── Calendario de actividades ────────────────────────────────────────────────

const WEEKDAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

function ActivitiesCalendar({ activities }: { activities: CalendarActividad[] }) {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDow = startOfMonth(month).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => new Date(year, monthIndex, i + 1)),
  ];

  const byDate = useMemo(() => {
    const map = new Map<string, CalendarActividad[]>();
    for (const a of activities) {
      const key = format(new Date(a.hourStart), "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(a);
    }
    return map;
  }, [activities]);

  const today = new Date();
  const selectedKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const selectedActivities = selectedKey ? (byDate.get(selectedKey) ?? []) : [];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Calendar grid */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMonth((m) => subMonths(m, 1))}
            className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold capitalize">
            {format(month, "MMMM yyyy", { locale: es })}
          </span>
          <button
            type="button"
            onClick={() => setMonth((m) => addMonths(m, 1))}
            className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-xs font-medium text-muted-foreground py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((date, i) => {
            if (!date) return <div key={i} className="h-14" />;

            const key = format(date, "yyyy-MM-dd");
            const dayActivities = byDate.get(key) ?? [];
            const isToday = isSameDay(date, today);
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
            const generalCount = dayActivities.filter((a) => a.showCalendar).length;
            const internalCount = dayActivities.filter((a) => !a.showCalendar).length;

            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={[
                  "h-14 w-full rounded-xl flex flex-col items-center justify-start pt-1.5 gap-0.5 transition-colors border",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : isToday
                    ? "border-primary/40 bg-primary/5"
                    : dayActivities.length > 0
                    ? "hover:bg-muted border-muted"
                    : "border-transparent hover:bg-muted/50",
                ].join(" ")}
              >
                <span className={`text-xs font-semibold ${isToday && !isSelected ? "text-primary" : ""}`}>
                  {date.getDate()}
                </span>
                {dayActivities.length > 0 && (
                  <div className="flex items-center gap-0.5 flex-wrap justify-center px-1">
                    {generalCount > 0 && (
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-primary-foreground" : "bg-emerald-500"}`} />
                    )}
                    {internalCount > 0 && (
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-primary-foreground/70" : "bg-blue-500"}`} />
                    )}
                    {dayActivities.length > 2 && (
                      <span className={`text-[9px] font-bold leading-none ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        +{dayActivities.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 pt-2 border-t text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            General / pública
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
            Interna / departamento
          </span>
        </div>
      </div>

      {/* Day detail panel */}
      <div className="lg:w-72 shrink-0 space-y-3">
        <div className="rounded-xl border bg-card p-4 space-y-3 min-h-[200px]">
          {selectedDate ? (
            <>
              <div>
                <p className="text-sm font-semibold capitalize">
                  {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedActivities.length === 0
                    ? "Sin actividades"
                    : `${selectedActivities.length} actividad${selectedActivities.length !== 1 ? "es" : ""}`}
                </p>
              </div>

              {selectedActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="h-8 w-8 text-muted-foreground/30 mb-2" />
                  <p className="text-xs text-muted-foreground">Sin actividades este día</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedActivities
                    .sort((a, b) => a.hourStart.localeCompare(b.hourStart))
                    .map((a) => (
                      <div key={a.id} className="rounded-lg border bg-muted/30 px-3 py-2.5 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-tight">{a.title}</p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] shrink-0 ${
                              a.showCalendar
                                ? "border-emerald-300 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20"
                                : "border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-950/20"
                            }`}
                          >
                            {a.showCalendar ? "General" : "Interna"}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 shrink-0" />
                            {format(new Date(a.hourStart), "HH:mm")} – {format(new Date(a.hourEnd), "HH:mm")}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {a.place}
                          </span>
                          <span className="text-muted-foreground/70 pl-4">{a.departmentName}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <Calendar className="h-8 w-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground">Selecciona un día para ver sus actividades</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function ActividadesClient({
  actividades,
  departmentId,
  departmentName,
  allDepts,
  activeDeptId,
  showAllOption = false,
  role,
  calendarActividades = [],
  activeFechaRange = "all",
}: Props) {
  const router = useRouter();
  const isLeader = role === "LEADER";
  const canEdit = role === "ADMIN" || role === "RESPONSIBLE" || isLeader;

  const [view, setView] = useState<"list" | "calendar">("list");
  const [filtrosOpen, setFiltrosOpen] = useState(false);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const hoy = actividades.filter(
    (a) => new Date(a.hourStart) >= today && new Date(a.hourStart) < tomorrow
  ).length;
  const proximas = actividades.filter((a) => new Date(a.hourStart) > now).length;
  const pasadas = actividades.filter((a) => new Date(a.hourStart) < now).length;

  const showDeptFilter = showAllOption || allDepts.length > 1;
  const hasFab = canEdit && view === "list";
  const fabBottomClass = hasFab ? "bottom-24" : "bottom-6";

  // Count active filters
  const filtroCount = [
    showDeptFilter && activeDeptId !== -1 ? 1 : null,
    activeFechaRange !== "all" ? 1 : null,
    isLeader && view === "calendar" ? 1 : null,
  ].filter(Boolean).length;

  const currentDeptValue = activeDeptId === -1 || activeDeptId === null ? "all" : activeDeptId.toString();

  return (
    <>
      <PageLayout
        title="Actividades"
        subtitle={view === "calendar" ? "Vista de calendario — todas las actividades de la iglesia" : departmentName}
        statsColumns={4}
        stats={[
          { title: "Total", value: actividades.length, icon: Activity, colorIndex: 0 },
          { title: "Hoy", value: hoy, icon: Calendar, colorIndex: 1 },
          { title: "Próximas", value: proximas, icon: Calendar, colorIndex: 2 },
          { title: "Pasadas", value: pasadas, icon: Calendar, colorIndex: 3 },
        ]}
        listTitle={view === "calendar" ? "Calendario de actividades" : "Lista de Actividades"}
        fab={
          hasFab
            ? {
                href: `/app/actividades/nuevo?dept=${
                  activeDeptId === -1 ? allDepts[0]?.departmentIds[0] : activeDeptId
                }`,
                label: "Nueva actividad",
              }
            : undefined
        }
      >
        {view === "calendar" ? (
          <ActivitiesCalendar activities={calendarActividades} />
        ) : (
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
                modalContent={
                  <div className="space-y-3 pt-1">
                    {actividad.img && (
                      <img
                        src={actividad.img}
                        alt={actividad.title}
                        className="w-full rounded-lg object-cover max-h-48"
                      />
                    )}
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>{actividad.place}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>
                          {new Date(actividad.hourStart).toLocaleString("es-ES", {
                            dateStyle: "long",
                            timeStyle: "short",
                          })}
                          {" – "}
                          {new Date(actividad.hourEnd).toLocaleString("es-ES", {
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                }
                {...(canEdit && {
                  editHref: `/app/actividades/${actividad.id}/editar`,
                  deleteTitle: "Eliminar actividad",
                  deleteItemName: actividad.title,
                  onDelete: async () => {
                    const formData = new FormData();
                    formData.append("activityId", actividad.id.toString());
                    formData.append("departmentId", departmentId!.toString());
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
        )}
      </PageLayout>

      {/* Filter FAB */}
      <button
        onClick={() => setFiltrosOpen(true)}
        className={`fixed ${fabBottomClass} right-6 z-50 flex items-center justify-center size-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 active:scale-95 transition-all`}
        aria-label="Filtros"
      >
        <SlidersHorizontal className="h-5 w-5" />
        {filtroCount > 0 && (
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary border-2 border-background" />
        )}
      </button>

      {/* Filter Drawer */}
      <Sheet open={filtrosOpen} onOpenChange={setFiltrosOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xs flex flex-col gap-0 p-0">
          <SheetHeader className="px-6 py-5 border-b">
            <SheetTitle className="flex items-center gap-2">
              Filtros
              {filtroCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {filtroCount}
                </span>
              )}
            </SheetTitle>
            <SheetDescription>Ajusta qué actividades se muestran.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Departamento */}
            {showDeptFilter && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Departamento</Label>
                <Select
                  value={currentDeptValue}
                  onValueChange={(v) => {
                    router.push(`/app/actividades?dept=${v}&fechaRange=${activeFechaRange}`);
                    setFiltrosOpen(false);
                  }}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {showAllOption && <SelectItem value="all">Todos</SelectItem>}
                    {allDepts.map((d) => (
                      <SelectItem key={d.departmentIds[0]} value={d.departmentIds[0].toString()}>
                        {d.name}
                        {d.isGrouped && ` (×${d.departmentIds.length})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Período */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Período</Label>
              <Select
                value={activeFechaRange}
                onValueChange={(v) => {
                  router.push(`/app/actividades?dept=${currentDeptValue}&fechaRange=${v}`);
                  setFiltrosOpen(false);
                }}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DATE_RANGE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vista — solo LEADER */}
            {isLeader && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Vista</Label>
                <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-1">
                  <Button
                    size="sm"
                    variant={view === "list" ? "default" : "ghost"}
                    className="flex-1 h-8 gap-1.5 text-xs"
                    onClick={() => setView("list")}
                  >
                    <List className="h-3.5 w-3.5" />
                    Lista
                  </Button>
                  <Button
                    size="sm"
                    variant={view === "calendar" ? "default" : "ghost"}
                    className="flex-1 h-8 gap-1.5 text-xs"
                    onClick={() => setView("calendar")}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Calendario
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

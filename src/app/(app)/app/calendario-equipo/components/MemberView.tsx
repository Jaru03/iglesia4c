"use client";

import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Ban,
  Users,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const DAYS_SHORT = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
const DAYS_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

interface MyEntry {
  id: number;
  date: string;
  task: string | null;
  notes: string | null;
  departmentName: string;
  calendarId: number;
}

interface TeamEntry {
  id: number;
  userName: string;
  task: string | null;
  notes: string | null;
}

interface Props {
  availableDays: number[];
  initialExceptions: string[];
  myEntries: MyEntry[];
}

export function MemberView({ availableDays, initialExceptions, myEntries }: Props) {
  // ── Weekly days ──
  const [days, setDays] = useState<number[]>(availableDays);
  const [savingDay, setSavingDay] = useState<number | null>(null);

  // ── Calendar ──
  const now = new Date();
  const [month, setMonth] = useState(now);
  const [exceptions, setExceptions] = useState<string[]>(initialExceptions);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  // ── Team dialog ──
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogEntry, setDialogEntry] = useState<MyEntry | null>(null);
  const [teamEntries, setTeamEntries] = useState<TeamEntry[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const firstDow = new Date(year, monthIdx, 1).getDay();
  const totalDays = new Date(year, monthIdx + 1, 0).getDate();
  const todayStr = format(now, "yyyy-MM-dd");
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  async function toggleDay(dow: number) {
    const newDays = days.includes(dow) ? days.filter((d) => d !== dow) : [...days, dow];
    setDays(newDays);
    setSavingDay(dow);
    try {
      const res = await fetch("/api/member-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: newDays }),
      });
      if (!res.ok) throw new Error();
      toast.success(
        `${DAYS_FULL[dow]} ${newDays.includes(dow) ? "activado" : "desactivado"}`
      );
    } catch {
      setDays(days);
      toast.error("Error al guardar");
    } finally {
      setSavingDay(null);
    }
  }

  async function navigate(dir: "prev" | "next") {
    const newMonth = dir === "prev" ? subMonths(month, 1) : addMonths(month, 1);
    setLoadingMonth(true);
    try {
      const res = await fetch(
        `/api/member-unavailable-dates?month=${newMonth.getMonth() + 1}&year=${newMonth.getFullYear()}`
      );
      if (!res.ok) throw new Error();
      setExceptions(await res.json());
      setMonth(newMonth);
    } catch {
      toast.error("Error al cargar");
    } finally {
      setLoadingMonth(false);
    }
  }

  async function toggleException(day: number) {
    const dateStr = `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (toggling) return;
    setToggling(dateStr);
    const wasException = exceptions.includes(dateStr);
    setExceptions((prev) =>
      wasException ? prev.filter((d) => d !== dateStr) : [...prev, dateStr]
    );
    try {
      const res = await fetch("/api/member-unavailable-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateStr }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setExceptions((prev) =>
        wasException ? [...prev, dateStr] : prev.filter((d) => d !== dateStr)
      );
      toast.error("Error al guardar");
    } finally {
      setToggling(null);
    }
  }

  async function openTeamDialog(entry: MyEntry) {
    setDialogEntry(entry);
    setTeamEntries([]);
    setDialogOpen(true);
    setLoadingTeam(true);
    try {
      const dateParam = format(new Date(entry.date), "yyyy-MM-dd");
      const res = await fetch(
        `/api/team-calendar/${entry.calendarId}/entries?date=${dateParam}`
      );
      if (!res.ok) throw new Error();
      setTeamEntries(await res.json());
    } catch {
      toast.error("Error al cargar el equipo");
    } finally {
      setLoadingTeam(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ── Unified Availability Card ── */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Mi Disponibilidad
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Activa los días de la semana tocando su inicial. Luego toca una fecha
                habitual para marcarla como excepción.
              </p>
            </div>
            {loadingMonth && (
              <Loader2 className="h-3.5 w-3.5 mt-0.5 shrink-0 animate-spin text-muted-foreground" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("prev")}
              disabled={loadingMonth}
              className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold capitalize">
              {format(month, "MMMM yyyy", { locale: es })}
            </span>
            <button
              type="button"
              onClick={() => navigate("next")}
              disabled={loadingMonth}
              className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday chip headers — double as column headers + day toggles */}
          <div className="grid grid-cols-7 gap-0.5">
            {DAYS_SHORT.map((label, dow) => {
              const isActive = days.includes(dow);
              const isSaving = savingDay === dow;
              return (
                <button
                  key={dow}
                  type="button"
                  onClick={() => toggleDay(dow)}
                  disabled={isSaving}
                  title={`${isActive ? "Desactivar" : "Activar"} ${DAYS_FULL[dow]}`}
                  className={[
                    "flex items-center justify-center rounded-md py-1.5 text-xs font-semibold transition-all select-none",
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent hover:border-border",
                    isSaving ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : label}
                </button>
              );
            })}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} className="h-9 w-9" />;

              const dow = new Date(year, monthIdx, day).getDay();
              const isAvail = days.includes(dow);
              const dateStr = `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isException = exceptions.includes(dateStr);
              const isToday = dateStr === todayStr;
              const isToggling = toggling === dateStr;

              return (
                <button
                  key={i}
                  type="button"
                  disabled={!isAvail || isToggling}
                  onClick={() => isAvail && toggleException(day)}
                  title={
                    !isAvail
                      ? "Día no habitual — actívalo arriba"
                      : isException
                      ? "Restaurar disponibilidad"
                      : "Marcar como no disponible"
                  }
                  className={[
                    "h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                    isAvail && !isException
                      ? "bg-primary/10 text-primary hover:bg-primary/25 cursor-pointer"
                      : "",
                    isAvail && isException
                      ? "bg-red-100 text-red-500 hover:bg-red-200 cursor-pointer line-through decoration-red-400"
                      : "",
                    !isAvail ? "text-muted-foreground/35 cursor-default" : "",
                    isToday && !isException ? "ring-2 ring-primary ring-offset-1" : "",
                    isToggling ? "opacity-50" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-primary" />
                Disponible
              </span>
              <span className="flex items-center gap-1">
                <Ban className="h-3 w-3 text-red-500" />
                Excepción
              </span>
            </div>
            {exceptions.length > 0 && (
              <span className="text-xs text-red-500 font-medium">
                {exceptions.length} excepción{exceptions.length !== 1 ? "es" : ""}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── My Assignments ── */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Mis asignaciones este mes
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Toca una asignación para ver el equipo completo de ese día.
          </p>
        </CardHeader>
        <CardContent>
          {myEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
              <Calendar className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Sin asignaciones este mes</p>
            </div>
          ) : (
            <div className="space-y-2">
              {myEntries.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => openTeamDialog(e)}
                  className="w-full text-left rounded-lg border bg-muted/30 px-3 py-2.5 space-y-1 hover:bg-muted/60 hover:border-primary/40 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold capitalize">
                      {format(new Date(e.date), "EEEE d 'de' MMMM", { locale: es })}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xs text-muted-foreground">{e.departmentName}</span>
                      <Users className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  {e.task && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      {e.task}
                    </p>
                  )}
                  {e.notes && (
                    <p className="text-xs text-muted-foreground/70">{e.notes}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Team Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Equipo del día
            </DialogTitle>
            {dialogEntry && (
              <p className="text-sm text-muted-foreground capitalize">
                {format(new Date(dialogEntry.date), "EEEE d 'de' MMMM yyyy", {
                  locale: es,
                })}
                {" · "}
                <span className="font-medium text-foreground">
                  {dialogEntry.departmentName}
                </span>
              </p>
            )}
          </DialogHeader>

          <div className="space-y-2 mt-1">
            {loadingTeam ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : teamEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                Sin miembros asignados ese día
              </p>
            ) : (
              teamEntries.map((t) => (
                <div
                  key={t.id}
                  className="rounded-lg border bg-muted/30 px-3 py-2.5 space-y-0.5"
                >
                  <p className="text-sm font-medium">{t.userName}</p>
                  {t.task && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      {t.task}
                    </p>
                  )}
                  {t.notes && (
                    <p className="text-xs text-muted-foreground/70">{t.notes}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

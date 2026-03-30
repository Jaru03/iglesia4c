"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Save, ChevronLeft, ChevronRight, Ban, CheckCircle2 } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import toast from "react-hot-toast";

const DAYS = [
  { label: "Domingo", value: 0 },
  { label: "Lunes", value: 1 },
  { label: "Martes", value: 2 },
  { label: "Miércoles", value: 3 },
  { label: "Jueves", value: 4 },
  { label: "Viernes", value: 5 },
  { label: "Sábado", value: 6 },
];

const DAYS_SHORT = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

interface Props {
  initialDays: number[];
  initialExceptions: string[]; // YYYY-MM-DD del mes actual
}

export function AvailabilityDaysSection({ initialDays, initialExceptions }: Props) {
  const [days, setDays] = useState<number[]>(initialDays);
  const [saving, setSaving] = useState(false);

  function toggleDay(day: number) {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/member-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days }),
      });
      if (!res.ok) throw new Error();
      toast.success("Disponibilidad guardada");
    } catch {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2 px-6 pt-5">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          Disponibilidad
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Configura tus días habituales y marca excepciones para meses concretos.
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-5 space-y-6">
        {/* Weekly availability */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Días habituales
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DAYS.map(({ label, value }) => (
              <label
                key={value}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors select-none ${
                  days.includes(value)
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/30"
                }`}
              >
                <Checkbox
                  id={`day-${value}`}
                  checked={days.includes(value)}
                  onCheckedChange={() => toggleDay(value)}
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1.5">
              <Save className="h-3.5 w-3.5" />
              {saving ? "Guardando..." : "Guardar días habituales"}
            </Button>
          </div>
        </div>

        {/* Monthly exceptions */}
        <div className="space-y-3 pt-2 border-t">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Excepciones del mes
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Haz clic en un día disponible para marcarlo como no disponible ese día concreto.
            </p>
          </div>
          <ExceptionCalendar
            weeklyDays={days}
            initialExceptions={initialExceptions}
            daysShort={DAYS_SHORT}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Exception Calendar ───────────────────────────────────────────────────────

function ExceptionCalendar({
  weeklyDays,
  initialExceptions,
  daysShort,
}: {
  weeklyDays: number[];
  initialExceptions: string[];
  daysShort: string[];
}) {
  const now = new Date();
  const [month, setMonth] = useState(now);
  const [exceptions, setExceptions] = useState<string[]>(initialExceptions);
  const [loading, setLoading] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const firstDow = new Date(year, monthIdx, 1).getDay();
  const totalDays = new Date(year, monthIdx + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const todayStr = format(now, "yyyy-MM-dd");

  async function navigate(dir: "prev" | "next") {
    const newMonth = dir === "prev" ? subMonths(month, 1) : addMonths(month, 1);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/member-unavailable-dates?month=${newMonth.getMonth() + 1}&year=${newMonth.getFullYear()}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setExceptions(data);
      setMonth(newMonth);
    } catch {
      toast.error("Error al cargar excepciones");
    } finally {
      setLoading(false);
    }
  }

  async function toggle(day: number) {
    const dateStr = `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (toggling) return;
    setToggling(dateStr);
    const wasException = exceptions.includes(dateStr);
    // Optimistic
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
      // Revert
      setExceptions((prev) =>
        wasException ? [...prev, dateStr] : prev.filter((d) => d !== dateStr)
      );
      toast.error("Error al guardar");
    } finally {
      setToggling(null);
    }
  }

  const exceptionCount = exceptions.length;

  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("prev")}
          disabled={loading}
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
          disabled={loading}
          className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center">
        {daysShort.map((d) => (
          <div key={d} className="text-xs font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="h-9 w-9" />;

          const dow = new Date(year, monthIdx, day).getDay();
          const isWeeklyAvail = weeklyDays.includes(dow);
          const dateStr = `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isException = exceptions.includes(dateStr);
          const isToday = dateStr === todayStr;
          const isToggling = toggling === dateStr;

          return (
            <button
              key={i}
              type="button"
              disabled={!isWeeklyAvail || isToggling}
              onClick={() => isWeeklyAvail && toggle(day)}
              title={
                !isWeeklyAvail
                  ? "Día no habitual"
                  : isException
                  ? "Marcar como disponible"
                  : "Marcar como no disponible"
              }
              className={[
                "h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                isWeeklyAvail && !isException
                  ? "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                  : "",
                isWeeklyAvail && isException
                  ? "bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer line-through decoration-red-400"
                  : "",
                !isWeeklyAvail
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : "",
                isToday && !isException
                  ? "ring-2 ring-primary ring-offset-1"
                  : "",
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

      {/* Legend + summary */}
      <div className="flex items-center justify-between pt-1 border-t">
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-primary" />
            Disponible
          </span>
          <span className="flex items-center gap-1">
            <Ban className="h-3 w-3 text-red-500" />
            Excepción
          </span>
        </div>
        {exceptionCount > 0 && (
          <span className="text-xs text-red-500 font-medium">
            {exceptionCount} excepción{exceptionCount !== 1 ? "es" : ""}
          </span>
        )}
      </div>
    </div>
  );
}

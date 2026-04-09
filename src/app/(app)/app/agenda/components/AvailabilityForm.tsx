"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Save, ChevronLeft, ChevronRight, ChevronDown, CalendarDays, Plus, X, Clock } from "lucide-react";
import { TimePicker } from "@/components/ui/time-picker";
import { format, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import toast from "react-hot-toast";

const DAYS = [
  { label: "Domingo",   value: 0 },
  { label: "Lunes",     value: 1 },
  { label: "Martes",    value: 2 },
  { label: "Miércoles", value: 3 },
  { label: "Jueves",    value: 4 },
  { label: "Viernes",   value: 5 },
  { label: "Sábado",    value: 6 },
];

const DURATIONS = [
  { label: "15 min",   value: 15 },
  { label: "30 min",   value: 30 },
  { label: "45 min",   value: 45 },
  { label: "1 hora",   value: 60 },
  { label: "1h 30min", value: 90 },
  { label: "2 horas",  value: 120 },
];

export interface AvailabilityRecord {
  id?: number;
  dayOfWeek: number;
  slotIndex: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

interface TimeRange {
  startTime: string;
  endTime: string;
}

interface DayConfig {
  enabled: boolean;
  ranges: TimeRange[]; // 1 o 2 franjas
  slotDuration: number;
}

interface Props {
  initial: AvailabilityRecord[];
  /** Override the base URL for availability API calls. Defaults to /api/availability */
  apiBase?: string;
  defaultOpen?: boolean;
}

// ─── Mini-calendario de previsualización ─────────────────────────────────────

const WEEKDAYS_SHORT = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

function AvailabilityCalendar({ enabledDays }: { enabledDays: number[] }) {
  const [month, setMonth] = useState(new Date());

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDow = new Date(year, monthIndex, 1).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const today = new Date();

  return (
    <div className="rounded-xl border bg-card p-4 space-y-3 w-full lg:w-[268px] shrink-0">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth((m) => subMonths(m, 1))}
          className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold capitalize">
          {format(month, "MMMM yyyy", { locale: es })}
        </span>
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center">
        {WEEKDAYS_SHORT.map((d) => (
          <div key={d} className="text-xs font-medium text-muted-foreground py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="h-8 w-8" />;
          const dow = new Date(year, monthIndex, day).getDay();
          const available = enabledDays.includes(dow);
          const isToday =
            day === today.getDate() && monthIndex === today.getMonth() && year === today.getFullYear();
          return (
            <div
              key={i}
              className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-colors
                ${available
                  ? "bg-primary text-primary-foreground"
                  : isToday
                  ? "ring-1 ring-primary text-primary font-semibold"
                  : "text-foreground"
                }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 pt-1 border-t">
        <div className="h-3 w-3 rounded-full bg-primary shrink-0" />
        <span className="text-xs text-muted-foreground">
          {enabledDays.length === 0 ? "Sin días configurados" : "Días disponibles para citas"}
        </span>
      </div>
    </div>
  );
}

// ─── Formulario principal ─────────────────────────────────────────────────────

export function AvailabilityForm({ initial, apiBase = "/api/availability", defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const initialConfig = Object.fromEntries(
    DAYS.map(({ value }) => {
      const dayRecords = initial
        .filter((r) => r.dayOfWeek === value)
        .sort((a, b) => a.slotIndex - b.slotIndex);

      const enabled = dayRecords.length > 0;
      const ranges: TimeRange[] = enabled
        ? dayRecords.map((r) => ({ startTime: r.startTime, endTime: r.endTime }))
        : [{ startTime: "09:00", endTime: "17:00" }];

      return [value, { enabled, ranges, slotDuration: dayRecords[0]?.slotDuration ?? 30 }];
    })
  ) as Record<number, DayConfig>;

  const [config, setConfig] = useState<Record<number, DayConfig>>(initialConfig);
  const [saving, setSaving] = useState(false);

  function setDayField<K extends keyof DayConfig>(day: number, field: K, value: DayConfig[K]) {
    setConfig((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  }

  function setRange(day: number, rangeIdx: number, field: keyof TimeRange, value: string) {
    setConfig((prev) => {
      const ranges = prev[day].ranges.map((r, i) =>
        i === rangeIdx ? { ...r, [field]: value } : r
      );
      return { ...prev, [day]: { ...prev[day], ranges } };
    });
  }

  function addSecondRange(day: number) {
    setConfig((prev) => {
      const first = prev[day].ranges[0];
      return {
        ...prev,
        [day]: {
          ...prev[day],
          ranges: [...prev[day].ranges, { startTime: first.endTime, endTime: "20:00" }],
        },
      };
    });
  }

  function removeSecondRange(day: number) {
    setConfig((prev) => ({
      ...prev,
      [day]: { ...prev[day], ranges: [prev[day].ranges[0]] },
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      // Build all enabled range records
      const toSave = DAYS.filter(({ value }) => config[value].enabled).flatMap(({ value }) =>
        config[value].ranges.map((range, slotIndex) => ({
          dayOfWeek: value,
          slotIndex,
          startTime: range.startTime,
          endTime: range.endTime,
          slotDuration: config[value].slotDuration,
        }))
      );

      // Days that are now disabled → delete all their ranges
      const disabledDays = DAYS.filter(({ value }) => !config[value].enabled).map(({ value }) => value);
      const disabledInInitial = disabledDays.filter((d) => initial.some((r) => r.dayOfWeek === d));

      // Days that dropped from 2 ranges to 1 → delete slotIndex=1
      const droppedSecondRange = DAYS.filter(({ value }) => {
        const wasTwo = initial.filter((r) => r.dayOfWeek === value).length >= 2;
        const isNowOne = config[value].enabled && config[value].ranges.length === 1;
        return wasTwo && isNowOne;
      }).map(({ value }) => value);

      await Promise.all([
        toSave.length > 0 &&
          fetch(apiBase, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toSave),
          }).then((r) => { if (!r.ok) throw new Error(); }),

        ...disabledInInitial.map((d) =>
          fetch(`${apiBase}?dayOfWeek=${d}`, { method: "DELETE" })
        ),

        ...droppedSecondRange.map((d) =>
          fetch(`${apiBase}?dayOfWeek=${d}&slotIndex=1`, { method: "DELETE" })
        ),
      ]);

      toast.success("Disponibilidad guardada");
    } catch {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  const enabledDayValues = DAYS.filter(({ value }) => config[value].enabled).map(({ value }) => value);

  return (
    <Card className="shadow-md border-slate-200">
      {/* Header desplegable */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-colors rounded-xl"
      >
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold">Disponibilidad semanal</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {enabledDayValues.length === 0
                ? "Sin días configurados"
                : `${enabledDayValues.length} día${enabledDayValues.length !== 1 ? "s" : ""} configurado${enabledDayValues.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Contenido colapsable */}
      {open && (
        <CardContent className="pt-0 pb-5">
          <div className="border-t mb-5" />
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Lista de días */}
              <div className="flex-1 divide-y rounded-xl border overflow-hidden">
                {DAYS.map(({ label, value }) => {
                  const { enabled, ranges, slotDuration } = config[value];
                  const hasTwoRanges = ranges.length >= 2;

                  return (
                    <div
                      key={value}
                      className={`px-4 py-3 transition-colors ${enabled ? "bg-background" : "bg-muted/30"}`}
                    >
                      {/* Checkbox + label */}
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`day-${value}`}
                          checked={enabled}
                          onCheckedChange={(v) => setDayField(value, "enabled", !!v)}
                        />
                        <Label
                          htmlFor={`day-${value}`}
                          className={`font-medium cursor-pointer select-none ${enabled ? "" : "text-muted-foreground"}`}
                        >
                          {label}
                        </Label>
                        {!enabled && (
                          <span className="ml-auto text-xs text-muted-foreground italic">
                            No disponible
                          </span>
                        )}
                      </div>

                      {/* Franjas horarias */}
                      {enabled && (
                        <div className="mt-3 ml-7 space-y-2">
                          {ranges.map((range, rangeIdx) => (
                            <div key={rangeIdx} className="flex flex-wrap items-center gap-2">
                              {/* Label de franja */}
                              <span className="text-xs text-muted-foreground w-14 shrink-0">
                                {rangeIdx === 0 ? "Franja 1" : "Franja 2"}
                              </span>
                              <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <TimePicker
                                value={range.startTime}
                                onChange={(v) => setRange(value, rangeIdx, "startTime", v ?? "")}
                                minuteStep={15}
                                className="h-8 w-28 text-sm"
                              />
                              <span className="text-muted-foreground text-xs">a</span>
                              <TimePicker
                                value={range.endTime}
                                onChange={(v) => setRange(value, rangeIdx, "endTime", v ?? "")}
                                minuteStep={15}
                                className="h-8 w-28 text-sm"
                              />
                              {/* Botón quitar segunda franja */}
                              {rangeIdx === 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSecondRange(value)}
                                  className="h-7 w-7 rounded-md border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          ))}

                          {/* Botón agregar segunda franja */}
                          {!hasTwoRanges && (
                            <button
                              type="button"
                              onClick={() => addSecondRange(value)}
                              className="ml-16 flex items-center gap-1.5 text-xs text-primary hover:underline"
                            >
                              <Plus className="h-3 w-3" />
                              Agregar segunda franja
                            </button>
                          )}

                          {/* Duración de slots (compartida por el día) */}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground w-14 shrink-0">Duración</span>
                            <Select
                              value={String(slotDuration)}
                              onValueChange={(v) => setDayField(value, "slotDuration", Number(v))}
                            >
                              <SelectTrigger className="h-8 w-28 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {DURATIONS.map((d) => (
                                  <SelectItem key={d.value} value={String(d.value)}>
                                    {d.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Calendario de previsualización */}
              <AvailabilityCalendar enabledDays={enabledDayValues} />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" />
                {saving ? "Guardando..." : "Guardar disponibilidad"}
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

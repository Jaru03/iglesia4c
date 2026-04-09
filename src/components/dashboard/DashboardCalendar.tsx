"use client";

import { useMemo, useState } from "react";
import { format, addMonths, subMonths, isSameDay, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Church, Activity, Clock, MapPin } from "lucide-react";
import { ConfirmAttendanceButton } from "@/components/usuario/ConfirmAttendanceButton";

const WEEKDAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

export interface CalendarEvent {
  id: number;
  title: string;
  place: string;
  hourStart: string;
  type: "culto" | "actividad";
  departmentName?: string;
  attended?: boolean;
  allowPreRegistration?: boolean;
  preRegistered?: boolean;
  autoMarked?: boolean;
  isInternal?: boolean;
}

interface Props {
  events: CalendarEvent[];
  personId?: number;
}

export function DashboardCalendar({ events, personId }: Props) {
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
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const key = format(new Date(e.hourStart), "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    return map;
  }, [events]);

  const today = new Date();
  const selectedKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const selectedEvents = selectedKey
    ? (byDate.get(selectedKey) ?? []).sort((a, b) => a.hourStart.localeCompare(b.hourStart))
    : [];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Grid del calendario */}
      <div className="flex-1 space-y-3">
        {/* Navegación de mes */}
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

        {/* Cabecera de días */}
        <div className="grid grid-cols-7 text-center">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-xs font-medium text-muted-foreground py-1">{d}</div>
          ))}
        </div>

        {/* Celdas */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((date, i) => {
            if (!date) return <div key={i} className="h-14" />;

            const key = format(date, "yyyy-MM-dd");
            const dayEvents = byDate.get(key) ?? [];
            const hasCulto = dayEvents.some((e) => e.type === "culto");
            const hasActividad = dayEvents.some((e) => e.type === "actividad" && !e.isInternal);
            const hasInterna = dayEvents.some((e) => e.isInternal);
            const isToday = isSameDay(date, today);
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

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
                    : dayEvents.length > 0
                    ? "hover:bg-muted border-muted"
                    : "border-transparent hover:bg-muted/50",
                ].join(" ")}
              >
                <span className={`text-xs font-semibold ${isToday && !isSelected ? "text-primary" : ""}`}>
                  {date.getDate()}
                </span>
                {(hasCulto || hasActividad || hasInterna) && (
                  <div className="flex items-center gap-0.5 flex-wrap justify-center px-1">
                    {hasCulto && (
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-primary-foreground" : "bg-amber-500"}`} />
                    )}
                    {hasActividad && (
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-primary-foreground/70" : "bg-blue-500"}`} />
                    )}
                    {hasInterna && (
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-primary-foreground/50" : "bg-purple-500"}`} />
                    )}
                    {dayEvents.length > 3 && (
                      <span className={`text-[9px] font-bold leading-none ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        +{dayEvents.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 pt-2 border-t text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
            Culto
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
            Actividad
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-purple-500 inline-block" />
            Interna
          </span>
        </div>
      </div>

      {/* Panel de detalle del día */}
      <div className="lg:w-72 shrink-0 space-y-3">
        <div className="rounded-xl border bg-card p-4 space-y-3 min-h-[200px]">
          {selectedDate ? (
            <>
              <div>
                <p className="text-sm font-semibold capitalize">
                  {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedEvents.length === 0
                    ? "Sin eventos"
                    : `${selectedEvents.length} evento${selectedEvents.length !== 1 ? "s" : ""}`}
                </p>
              </div>

              {selectedEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Activity className="h-8 w-8 text-muted-foreground/30 mb-2" />
                  <p className="text-xs text-muted-foreground">Sin eventos este día</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map((e) => (
                    <div key={`${e.type}-${e.id}`} className="rounded-lg border bg-muted/30 px-3 py-2.5 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${e.type === "culto" ? "bg-amber-500" : e.isInternal ? "bg-purple-500" : "bg-blue-500"}`} />
                        <p className="text-sm font-medium leading-tight">{e.title}</p>
                      </div>
                      <div className="flex flex-col gap-0.5 text-xs text-muted-foreground pl-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 shrink-0" />
                          {format(new Date(e.hourStart), "HH:mm")}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {e.place}
                        </span>
                        {e.departmentName && (
                          <span className="flex items-center gap-1">
                            <Church className="h-3 w-3 shrink-0" />
                            {e.departmentName}
                          </span>
                        )}
                      </div>
                      {personId && (e.type === "culto" || e.allowPreRegistration) && (
                        <ConfirmAttendanceButton
                          activityId={e.id}
                          activityTitle={e.title}
                          activityDate={e.hourStart}
                          personId={personId}
                          alreadyAttended={e.attended ?? false}
                          preRegistered={e.preRegistered}
                          autoMarked={e.autoMarked}
                          allowPreRegistration={e.allowPreRegistration}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <Activity className="h-8 w-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground">Selecciona un día para ver sus eventos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import toast from "react-hot-toast";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  isBefore,
  isToday,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarCheck,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  CalendarX,
  Loader2,
  User,
} from "lucide-react";
import { buildAppointmentCalendarUrl } from "@/lib/google-calendar";

interface Slot {
  start: string;
  end: string;
  taken: boolean;
}

interface Responsable {
  id: number;
  name: string;
  availableDays: number[]; // 0=Dom … 6=Sáb
}

interface Props {
  responsables: Responsable[];
}

const WEEKDAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

// ─── Mini calendario ──────────────────────────────────────────────────────────

interface BookingCalendarProps {
  availableDays: Set<number>; // union of all responsables
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

function BookingCalendar({ availableDays, selectedDate, onSelect }: BookingCalendarProps) {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDow = startOfMonth(month).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => new Date(year, monthIndex, i + 1)),
  ];

  const canGoPrev = month > startOfMonth(today);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth((m) => subMonths(m, 1))}
          disabled={!canGoPrev}
          className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-xs font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="h-9 w-9" />;

          const isPast = isBefore(date, today);
          const isAvailableDay = availableDays.has(date.getDay());
          const isDisabled = isPast || !isAvailableDay;
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isTodayDate = isToday(date);

          return (
            <button
              key={i}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(date)}
              className={[
                "h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-colors relative",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : isDisabled
                  ? "text-muted-foreground/40 cursor-not-allowed"
                  : "hover:bg-primary/10 hover:text-primary text-foreground",
                isTodayDate && !isSelected ? "ring-1 ring-primary text-primary font-bold" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {date.getDate()}
              {!isDisabled && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 pt-2 border-t text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary inline-block" />
          Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30 inline-block" />
          No disponible
        </span>
      </div>
    </div>
  );
}

// ─── Formulario principal ─────────────────────────────────────────────────────

// slots per responsable id
type SlotsMap = Record<number, Slot[]>;
type LoadingMap = Record<number, boolean>;

export function BookingForm({ responsables }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const [slotsMap, setSlotsMap] = useState<SlotsMap>({});
  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});
  // selectedSlot scoped to a responsable: { responsableId, slot }
  const [selectedSlot, setSelectedSlot] = useState<{ responsableId: number; slot: Slot } | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookedResponsable, setBookedResponsable] = useState<Responsable | null>(null);

  const allAvailableDays = new Set(responsables.flatMap((r) => r.availableDays));

  const responsablesForDay = selectedDate
    ? responsables.filter((r) => r.availableDays.includes(selectedDate.getDay()))
    : [];

  async function handleSelectDate(date: Date) {
    setSelectedDate(date);
    setOpenAccordion("");
    setSlotsMap({});
    setSelectedSlot(null);
  }

  async function handleOpenAccordion(value: string) {
    setOpenAccordion(value);
    setSelectedSlot(null);
    if (!value || !selectedDate) return;

    const id = Number(value);
    if (slotsMap[id]) return; // already loaded

    setLoadingMap((m) => ({ ...m, [id]: true }));
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const res = await fetch(`/api/availability/${id}/slots?date=${dateStr}`);
    const data = await res.json();
    setSlotsMap((m) => ({ ...m, [id]: data }));
    setLoadingMap((m) => ({ ...m, [id]: false }));
  }

  async function handleBook() {
    if (!selectedDate || !selectedSlot) return;
    setSubmitting(true);

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        responsableId: selectedSlot.responsableId,
        date: dateStr,
        startTime: selectedSlot.slot.start,
        endTime: selectedSlot.slot.end,
        notes: notes.trim() || undefined,
      }),
    });

    if (res.ok) {
      setBookedResponsable(responsables.find((r) => r.id === selectedSlot.responsableId) ?? null);
      setBooked(true);
      toast.success("Cita agendada correctamente");
    } else {
      const err = await res.json();
      toast.error(err.error ?? "Error al agendar");
    }
    setSubmitting(false);
  }

  if (booked) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold">Cita agendada</p>
          <p className="text-sm text-muted-foreground mt-1">
            Te hemos enviado un correo de confirmación.
          </p>
        </div>
        <div className="inline-flex flex-col items-center gap-1 rounded-lg border bg-muted/40 px-5 py-3 text-sm">
          <span className="font-medium capitalize">
            {selectedDate && format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
          </span>
          <span className="text-muted-foreground">
            {selectedSlot?.slot.start}–{selectedSlot?.slot.end} · {bookedResponsable?.name}
          </span>
        </div>
        {selectedDate && selectedSlot && bookedResponsable && (
          <a
            href={buildAppointmentCalendarUrl({
              dateStr: format(selectedDate, "yyyy-MM-dd"),
              startTime: selectedSlot.slot.start,
              endTime: selectedSlot.slot.end,
              responsableName: bookedResponsable.name,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#4285F4]/40 bg-[#4285F4]/5 px-4 py-2 text-sm font-medium text-[#4285F4] hover:bg-[#4285F4]/10 transition-colors"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm0 16.5h-15V9h15v10.5zM7.5 10.5H6V12h1.5v-1.5zm3 0H9V12h1.5v-1.5zm3 0H12V12h1.5v-1.5zm3 0H15V12h1.5v-1.5z" fill="currentColor"/>
            </svg>
            Añadir a Google Calendar
          </a>
        )}
        <Link
          href="/app/citas"
          className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Ver mis citas
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_320px]">
        {/* ── Calendario ── */}
        <div className="p-5">
          <p className="text-sm font-medium mb-4">Selecciona una fecha</p>
          <BookingCalendar
            availableDays={allAvailableDays}
            selectedDate={selectedDate}
            onSelect={handleSelectDate}
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block bg-border" />

        {/* ── Panel derecho ── */}
        <div className="border-t md:border-t-0 p-5 space-y-4">
          {!selectedDate ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[180px] text-center gap-2">
              <CalendarX className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                Selecciona una fecha para continuar
              </p>
            </div>
          ) : (
            <>
              {/* Date label */}
              <p className="text-sm font-medium capitalize mb-1">
                {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Elige con quién y selecciona un horario
              </p>

              {/* Acordeón de responsables */}
              <Accordion
                type="single"
                collapsible
                value={openAccordion}
                onValueChange={handleOpenAccordion}
                className="space-y-2"
              >
                {responsablesForDay.map((r) => {
                  const slots = slotsMap[r.id] ?? [];
                  const loading = loadingMap[r.id] ?? false;
                  const freeCount = slots.filter((s) => !s.taken).length;
                  const takenCount = slots.filter((s) => s.taken).length;
                  const isOpen = openAccordion === String(r.id);

                  return (
                    <AccordionItem
                      key={r.id}
                      value={String(r.id)}
                      className="border rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors">
                        <span className="flex items-center gap-2.5 text-sm font-medium">
                          <span className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="h-3.5 w-3.5 text-primary" />
                          </span>
                          {r.name}
                        </span>
                      </AccordionTrigger>

                      <AccordionContent className="px-4 pb-4 pt-1 space-y-3">
                        {loading ? (
                          <div className="flex items-center gap-2 justify-center py-6 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Cargando horarios...
                          </div>
                        ) : slots.length === 0 ? (
                          <div className="rounded-lg border border-dashed py-6 text-center">
                            <p className="text-sm text-muted-foreground">Sin horarios disponibles</p>
                          </div>
                        ) : (
                          <>
                            {isOpen && (
                              <p className="text-xs text-muted-foreground">
                                {freeCount} libre{freeCount !== 1 ? "s" : ""}
                                {takenCount > 0 && ` · ${takenCount} ocupado${takenCount !== 1 ? "s" : ""}`}
                              </p>
                            )}
                            <div className="grid grid-cols-3 gap-1.5">
                              {slots.map((slot) => {
                                const isSelected =
                                  selectedSlot?.responsableId === r.id &&
                                  selectedSlot.slot.start === slot.start;
                                return (
                                  <button
                                    key={slot.start}
                                    type="button"
                                    disabled={slot.taken}
                                    onClick={() =>
                                      setSelectedSlot(
                                        isSelected ? null : { responsableId: r.id, slot }
                                      )
                                    }
                                    className={[
                                      "rounded-lg border py-2 px-1.5 text-center text-xs font-medium transition-colors",
                                      slot.taken
                                        ? "bg-muted/60 text-muted-foreground/50 cursor-not-allowed border-dashed"
                                        : isSelected
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "hover:border-primary/60 hover:bg-primary/5",
                                    ].join(" ")}
                                  >
                                    <span className="block font-semibold">{slot.start}</span>
                                    <span
                                      className={`block text-[10px] mt-0.5 ${
                                        isSelected
                                          ? "text-primary-foreground/70"
                                          : slot.taken
                                          ? "text-muted-foreground/40"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {slot.taken ? "Ocupado" : slot.end}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* Confirm form */}
              {selectedSlot && (() => {
                const resp = responsables.find((r) => r.id === selectedSlot.responsableId)!;
                return (
                  <div className="space-y-3 pt-3 border-t mt-2">
                    <div className="rounded-lg bg-muted/40 px-3 py-2.5 text-xs space-y-1.5">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarCheck className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-medium text-foreground capitalize">
                          {format(selectedDate, "EEEE d 'de' MMMM yyyy", { locale: es })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-medium text-foreground">
                          {selectedSlot.slot.start} – {selectedSlot.slot.end}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-medium text-foreground">{resp.name}</span>
                      </div>
                    </div>

                    <Textarea
                      placeholder="Motivo / notas (opcional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="resize-none text-sm"
                    />

                    <Button onClick={handleBook} disabled={submitting} className="w-full gap-1.5">
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      {submitting ? "Agendando..." : "Confirmar cita"}
                    </Button>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

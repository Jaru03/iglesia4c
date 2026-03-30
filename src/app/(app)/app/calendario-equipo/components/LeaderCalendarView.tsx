"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Users,
  X,
  CalendarDays,
  UserPlus,
  Tag,
} from "lucide-react";
import { format, startOfMonth, addMonths, subMonths, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const DAYS_SHORT = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
const DAYS_LONG = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const MEMBER_COLORS = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500",
  "bg-rose-500", "bg-cyan-500", "bg-orange-500", "bg-teal-500",
];

interface Member {
  userId: number;
  name: string;
  availableDays: number[];
}

interface Entry {
  id: number;
  date: string;
  userId: number | null;
  task: string | null;
  notes: string | null;
  userName: string | null;
}

interface Assignment {
  userId: string;
  cargo: string;
}

interface MemberException {
  userId: number;
  date: string; // YYYY-MM-DD
}

interface MemberBusyDate {
  userId: number;
  date: string; // YYYY-MM-DD
  departmentName: string;
}

interface Cargo {
  id: number;
  name: string;
}

interface Props {
  departmentId: number;
  calendarId: number;
  members: Member[];
  initialEntries: Entry[];
  initialExceptions: MemberException[];
  initialBusyDates: MemberBusyDate[];
  initialCargos: Cargo[];
  initialMonth: number;
  initialYear: number;
}

export function LeaderCalendarView({
  departmentId,
  calendarId: initialCalendarId,
  members,
  initialEntries,
  initialExceptions,
  initialBusyDates,
  initialCargos,
  initialMonth,
  initialYear,
}: Props) {
  const [month, setMonth] = useState(new Date(initialYear, initialMonth - 1, 1));
  const [calendarId, setCalendarId] = useState(initialCalendarId);
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [exceptions, setExceptions] = useState<MemberException[]>(initialExceptions);
  const [busyDates, setBusyDates] = useState<MemberBusyDate[]>(initialBusyDates);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Cargos state
  const [cargos, setCargos] = useState<Cargo[]>(initialCargos);
  const [newCargoName, setNewCargoName] = useState("");
  const [savingCargo, setSavingCargo] = useState(false);

  // Assignments form state: up to 5 rows
  const [assignments, setAssignments] = useState<Assignment[]>([{ userId: "", cargo: "" }]);
  const [submitting, setSubmitting] = useState(false);

  // Color map for members
  const memberColorMap = useMemo(() => {
    const map = new Map<number, string>();
    members.forEach((m, i) => map.set(m.userId, MEMBER_COLORS[i % MEMBER_COLORS.length]));
    return map;
  }, [members]);

  // Calendar grid
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDow = startOfMonth(month).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => new Date(year, monthIndex, i + 1)),
  ];

  // Entries grouped by date key
  const entriesByDate = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const e of entries) {
      const key = format(new Date(e.date), "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    return map;
  }, [entries]);

  // Exceptions map: dateKey → Set<userId>
  const exceptionsByDate = useMemo(() => {
    const map = new Map<string, Set<number>>();
    for (const ex of exceptions) {
      if (!map.has(ex.date)) map.set(ex.date, new Set());
      map.get(ex.date)!.add(ex.userId);
    }
    return map;
  }, [exceptions]);

  // Busy map: dateKey → { userId, departmentName }[]
  const busyByDate = useMemo(() => {
    const map = new Map<string, { userId: number; departmentName: string }[]>();
    for (const b of busyDates) {
      if (!map.has(b.date)) map.set(b.date, []);
      map.get(b.date)!.push({ userId: b.userId, departmentName: b.departmentName });
    }
    return map;
  }, [busyDates]);

  const selectedKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const selectedEntries = selectedKey ? (entriesByDate.get(selectedKey) ?? []) : [];
  const selectedDow = selectedDate?.getDay() ?? -1;

  // Members categorized for selected day
  const { availableOnDay, busyOnDay } = useMemo(() => {
    if (!selectedKey) return { availableOnDay: [] as Member[], busyOnDay: [] as (Member & { departmentName: string })[] };

    const exceptions_ = exceptionsByDate.get(selectedKey);
    const busy_ = busyByDate.get(selectedKey) ?? [];
    const alreadyAssigned = new Set(
      (entriesByDate.get(selectedKey) ?? [])
        .filter((e) => e.userId !== null)
        .map((e) => e.userId!)
    );

    const available: Member[] = [];
    const busy: (Member & { departmentName: string })[] = [];

    for (const m of members) {
      if (!m.availableDays.includes(selectedDow)) continue;
      if (exceptions_?.has(m.userId)) continue;
      if (alreadyAssigned.has(m.userId)) continue;
      const busyEntry = busy_.find((b) => b.userId === m.userId);
      if (busyEntry) {
        busy.push({ ...m, departmentName: busyEntry.departmentName });
      } else {
        available.push(m);
      }
    }
    return { availableOnDay: available, busyOnDay: busy };
  }, [selectedKey, selectedDow, members, exceptionsByDate, busyByDate, entriesByDate]);

  // Cargo management
  async function handleAddCargo() {
    const name = newCargoName.trim();
    if (!name) return;
    setSavingCargo(true);
    try {
      const res = await fetch("/api/team-calendar/cargos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departmentId, name }),
      });
      if (res.status === 409) { toast.error("Ese cargo ya existe"); return; }
      if (!res.ok) throw new Error();
      const cargo: Cargo = await res.json();
      setCargos((prev) => [...prev, cargo].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCargoName("");
      toast.success("Cargo añadido");
    } catch {
      toast.error("Error al añadir cargo");
    } finally {
      setSavingCargo(false);
    }
  }

  async function handleDeleteCargo(id: number) {
    try {
      await fetch(`/api/team-calendar/cargos?id=${id}`, { method: "DELETE" });
      setCargos((prev) => prev.filter((c) => c.id !== id));
      // Clear any assignment rows using this cargo
      setAssignments((prev) =>
        prev.map((a) => {
          const cargoName = cargos.find((c) => c.id === Number(a.cargo))?.name;
          return cargoName ? { ...a, cargo: "" } : a;
        })
      );
      toast.success("Cargo eliminado");
    } catch {
      toast.error("Error al eliminar cargo");
    }
  }

  // Navigate month
  const navigateMonth = useCallback(
    async (direction: "prev" | "next") => {
      const newMonth = direction === "prev" ? subMonths(month, 1) : addMonths(month, 1);
      setLoadingMonth(true);
      setSelectedDate(null);

      try {
        const res = await fetch(
          `/api/team-calendar?departmentId=${departmentId}&month=${newMonth.getMonth() + 1}&year=${newMonth.getFullYear()}`
        );
        const data = await res.json();
        setCalendarId(data.id);
        setEntries(
          data.entries.map((e: { id: number; date: string; userId: number | null; task: string | null; notes: string | null; user: { person: { name: string; lastname: string } } | null }) => ({
            id: e.id,
            date: e.date,
            userId: e.userId,
            task: e.task,
            notes: e.notes,
            userName: e.user ? `${e.user.person.name} ${e.user.person.lastname}` : null,
          }))
        );
        setExceptions(data.memberExceptions ?? []);
        setBusyDates(data.memberBusyDates ?? []);
        setMonth(newMonth);
      } catch {
        toast.error("Error al cargar el calendario");
      } finally {
        setLoadingMonth(false);
      }
    },
    [month, departmentId]
  );

  function selectDay(date: Date, isSelected: boolean) {
    setSelectedDate(isSelected ? null : date);
    setAssignments([{ userId: "", cargo: "" }]);
  }

  function updateAssignment(index: number, field: keyof Assignment, value: string) {
    setAssignments((prev) =>
      prev.map((a, i) => (i === index ? { ...a, [field]: value } : a))
    );
  }

  function addRow() {
    if (assignments.length < 5) {
      setAssignments((prev) => [...prev, { userId: "", cargo: "" }]);
    }
  }

  function removeRow(index: number) {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  }

  // Save all non-empty assignment rows
  async function handleSaveAssignments() {
    if (!selectedDate) return;
    const valid = assignments.filter(
      (a) => (a.userId && a.userId !== "none") || (a.cargo.trim() && a.cargo !== "none")
    );
    if (valid.length === 0) return;

    setSubmitting(true);
    try {
      const results = await Promise.all(
        valid.map((a) =>
          fetch(`/api/team-calendar/${calendarId}/entries`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date: format(selectedDate, "yyyy-MM-dd"),
              userId: a.userId && a.userId !== "none" ? Number(a.userId) : null,
              task: (a.cargo && a.cargo !== "none") ? a.cargo.trim() : null,
              notes: null,
            }),
          }).then(async (r) => {
            if (r.status === 409) {
              const body = await r.json();
              return Promise.reject(body.error ?? "Conflicto de asignación");
            }
            if (!r.ok) return Promise.reject("Error al guardar");
            return r.json();
          })
        )
      );

      setEntries((prev) => [
        ...prev,
        ...results.map((e: { id: number; date: string; userId: number | null; task: string | null; notes: string | null; user: { person: { name: string; lastname: string } } | null }) => ({
          id: e.id,
          date: e.date,
          userId: e.userId,
          task: e.task,
          notes: e.notes,
          userName: e.user ? `${e.user.person.name} ${e.user.person.lastname}` : null,
        })),
      ]);

      setAssignments([{ userId: "", cargo: "" }]);
      toast.success(
        results.length === 1 ? "Asignación añadida" : `${results.length} asignaciones añadidas`
      );
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Error al guardar");
    } finally {
      setSubmitting(false);
    }
  }

  // Delete entry
  async function handleDeleteEntry(entryId: number) {
    try {
      await fetch(`/api/team-calendar/${calendarId}/entries?entryId=${entryId}`, {
        method: "DELETE",
      });
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
      toast.success("Asignación eliminada");
    } catch {
      toast.error("Error al eliminar");
    }
  }

  const today = new Date();
  const validAssignmentsCount = assignments.filter(
    (a) => (a.userId && a.userId !== "none") || (a.cargo.trim() && a.cargo !== "none")
  ).length;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
      {/* ── Sidebar ── */}
      <div className="space-y-4">
        {/* Team availability */}
        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              Equipo ({members.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {members.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                Sin miembros registrados
              </p>
            ) : (
              members.map((member) => (
                <div key={member.userId} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded-full ${memberColorMap.get(member.userId)} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
                    >
                      {member.name[0]}
                    </div>
                    <span className="text-sm font-medium truncate">{member.name}</span>
                  </div>
                  <div className="flex gap-0.5 ml-8 flex-wrap">
                    {DAYS_SHORT.map((d, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          member.availableDays.includes(i)
                            ? `${memberColorMap.get(member.userId)} text-white`
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Cargos recurrentes */}
        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Cargos del ministerio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Add new cargo */}
            <div className="flex gap-2">
              <Input
                value={newCargoName}
                onChange={(e) => setNewCargoName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCargo(); } }}
                placeholder="Ej: Alabanza, Sonido..."
                className="h-8 text-sm"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddCargo}
                disabled={savingCargo || !newCargoName.trim()}
                className="h-8 px-2 shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Cargo list */}
            {cargos.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">
                Sin cargos definidos
              </p>
            ) : (
              <div className="space-y-1">
                {cargos.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-2 rounded-md border bg-muted/30 px-2.5 py-1.5"
                  >
                    <span className="text-sm truncate">{c.name}</span>
                    <button
                      onClick={() => handleDeleteCargo(c.id)}
                      className="h-5 w-5 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Main: Calendar ── */}
      <div className="space-y-4">
        {/* Calendar card */}
        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Calendario mensual
              </CardTitle>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateMonth("prev")}
                  disabled={loadingMonth}
                  className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold capitalize min-w-[130px] text-center">
                  {format(month, "MMMM yyyy", { locale: es })}
                </span>
                <button
                  onClick={() => navigateMonth("next")}
                  disabled={loadingMonth}
                  className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS_SHORT.map((d) => (
                <div key={d} className="text-xs font-medium text-muted-foreground text-center py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((date, i) => {
                if (!date) return <div key={i} />;

                const key = format(date, "yyyy-MM-dd");
                const dayEntries = entriesByDate.get(key) ?? [];
                const isToday = isSameDay(date, today);
                const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                const dow = date.getDay();
                const exceptions_ = exceptionsByDate.get(key);
                const busy_ = busyByDate.get(key);
                const availableMembers = members.filter(
                  (m) =>
                    m.availableDays.includes(dow) &&
                    !exceptions_?.has(m.userId) &&
                    !busy_?.some((b) => b.userId === m.userId)
                );
                const busyMembers = members.filter(
                  (m) =>
                    m.availableDays.includes(dow) &&
                    !exceptions_?.has(m.userId) &&
                    busy_?.some((b) => b.userId === m.userId)
                );

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectDay(date, isSelected)}
                    className={[
                      "min-h-[80px] w-full rounded-xl border p-1.5 flex flex-col gap-1 text-left transition-colors",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : isToday
                        ? "border-primary/30"
                        : "border-muted hover:border-primary/30 hover:bg-muted/30",
                    ].join(" ")}
                  >
                    <span
                      className={`text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center ${
                        isToday ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {date.getDate()}
                    </span>

                    {(availableMembers.length > 0 || busyMembers.length > 0) && (
                      <div className="flex flex-wrap gap-0.5">
                        {availableMembers.slice(0, 3).map((m) => (
                          <span
                            key={m.userId}
                            title={m.name}
                            className={`h-1.5 w-1.5 rounded-full ${memberColorMap.get(m.userId)} opacity-60`}
                          />
                        ))}
                        {busyMembers.slice(0, 2).map((m) => (
                          <span
                            key={`busy-${m.userId}`}
                            title={`${m.name} (ocupado)`}
                            className="h-1.5 w-1.5 rounded-full bg-amber-400"
                          />
                        ))}
                        {availableMembers.length + busyMembers.length > 5 && (
                          <span className="text-[9px] text-muted-foreground">
                            +{availableMembers.length + busyMembers.length - 5}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="space-y-0.5">
                      {dayEntries.slice(0, 2).map((e) => (
                        <div
                          key={e.id}
                          className={`rounded px-1 py-0.5 text-[10px] font-medium text-white truncate ${
                            e.userId ? memberColorMap.get(e.userId) ?? "bg-slate-400" : "bg-slate-400"
                          }`}
                        >
                          {e.task ?? e.userName ?? "Sin asignar"}
                        </div>
                      ))}
                      {dayEntries.length > 2 && (
                        <p className="text-[10px] text-muted-foreground">+{dayEntries.length - 2} más</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* ── Day detail panel ── */}
        {selectedDate && (
          <Card className="shadow-md border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm capitalize">
                    {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {DAYS_LONG[selectedDow]} · {availableOnDay.length} disponible{availableOnDay.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="h-6 w-6 rounded flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing entries */}
              {selectedEntries.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Asignaciones del día
                  </p>
                  {selectedEntries.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {e.userId && (
                          <div
                            className={`h-6 w-6 rounded-full ${memberColorMap.get(e.userId) ?? "bg-slate-400"} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
                          >
                            {e.userName?.[0] ?? "?"}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{e.userName ?? "Sin asignar"}</p>
                          {e.task && <p className="text-xs text-muted-foreground truncate">{e.task}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(e.id)}
                        className="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add assignments form */}
              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Nueva asignación
                  </p>
                  {assignments.length < 5 && (
                    <button
                      type="button"
                      onClick={addRow}
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <UserPlus className="h-3 w-3" />
                      Agregar persona
                    </button>
                  )}
                </div>

                {/* Column headers */}
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-0.5">
                  <Label className="text-xs text-muted-foreground">Miembro</Label>
                  <Label className="text-xs text-muted-foreground">Cargo</Label>
                  <span className="w-7" />
                </div>

                <div className="space-y-2">
                  {assignments.map((a, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                      <Select
                        value={a.userId}
                        onValueChange={(v) => updateAssignment(i, "userId", v)}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sin asignar</SelectItem>
                          {availableOnDay.length > 0 && (
                            <>
                              <div className="px-2 py-1 text-xs text-muted-foreground font-medium">Disponibles</div>
                              {availableOnDay.map((m) => (
                                <SelectItem key={m.userId} value={String(m.userId)}>
                                  <span className="flex items-center gap-1.5">
                                    <span className={`h-2 w-2 rounded-full ${memberColorMap.get(m.userId)} inline-block shrink-0`} />
                                    {m.name}
                                  </span>
                                </SelectItem>
                              ))}
                            </>
                          )}
                          {busyOnDay.length > 0 && (
                            <>
                              <div className="px-2 py-1 text-xs text-amber-600 font-medium">Ocupados en otro ministerio</div>
                              {busyOnDay.map((m) => (
                                <SelectItem key={m.userId} value={String(m.userId)} disabled>
                                  <span className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-amber-400 inline-block shrink-0" />
                                    {m.name}
                                    <span className="text-xs text-amber-500">· {m.departmentName}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </>
                          )}
                          {members.filter((m) => !m.availableDays.includes(selectedDow)).length > 0 && (
                            <>
                              <div className="px-2 py-1 text-xs text-muted-foreground font-medium">No disponibles</div>
                              {members
                                .filter((m) => !m.availableDays.includes(selectedDow))
                                .map((m) => (
                                  <SelectItem key={m.userId} value={String(m.userId)} disabled>
                                    {m.name}
                                  </SelectItem>
                                ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>

                      {cargos.length > 0 ? (
                        <Select
                          value={a.cargo}
                          onValueChange={(v) => updateAssignment(i, "cargo", v)}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Cargo..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sin cargo</SelectItem>
                            {cargos.map((c) => (
                              <SelectItem key={c.id} value={c.name}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value={a.cargo}
                          onChange={(e) => updateAssignment(i, "cargo", e.target.value)}
                          placeholder="Ej: Alabanza..."
                          className="h-8 text-sm"
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => removeRow(i)}
                        disabled={assignments.length === 1}
                        className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 shrink-0"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleSaveAssignments}
                  disabled={submitting || validAssignmentsCount === 0}
                  size="sm"
                  className="gap-1.5 w-full"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {submitting
                    ? "Guardando..."
                    : validAssignmentsCount > 0
                    ? `Añadir ${validAssignmentsCount} asignación${validAssignmentsCount !== 1 ? "es" : ""}`
                    : "Añadir asignaciones"}
                </Button>
              </div>

              {/* Available + busy members */}
              {(availableOnDay.length > 0 || busyOnDay.length > 0) && (
                <div className="pt-2 border-t space-y-2">
                  {availableOnDay.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Disponibles
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {availableOnDay.map((m) => (
                          <Badge key={m.userId} variant="outline" className="gap-1.5 text-xs">
                            <span className={`h-1.5 w-1.5 rounded-full ${memberColorMap.get(m.userId)} inline-block`} />
                            {m.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {busyOnDay.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                        Ocupados en otro ministerio
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {busyOnDay.map((m) => (
                          <Badge
                            key={m.userId}
                            variant="outline"
                            className="gap-1.5 text-xs border-amber-300 text-amber-700 bg-amber-50"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" />
                            {m.name}
                            <span className="text-amber-500/70">· {m.departmentName}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, Plus, X, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "@/components/ui/time-picker";
import { actualizarHorariosIglesia } from "@/actions/iglesias-actions";
import { generarCultosAutomaticos } from "@/actions/cultos-actions";
import toast from "react-hot-toast";

const DAYS = [
  { value: "LUNES", label: "Lunes" },
  { value: "MARTES", label: "Martes" },
  { value: "MIERCOLES", label: "Miércoles" },
  { value: "JUEVES", label: "Jueves" },
  { value: "VIERNES", label: "Viernes" },
  { value: "SABADO", label: "Sábado" },
  { value: "DOMINGO", label: "Domingo" },
];

export interface Schedule {
  day: string;
  time: string;
  name: string;
}

export interface ChurchOption {
  id: number;
  title: string;
  schedules: Schedule[];
}

interface Props {
  churchId?: number;
  initialSchedules?: Schedule[];
  churches?: ChurchOption[];
  isAdmin?: boolean;
}

export function HorariosDialog({ churchId, initialSchedules = [], churches = [], isAdmin }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [selectedChurchId, setSelectedChurchId] = useState<number | null>(
    isAdmin ? null : (churchId ?? null)
  );

  const [schedules, setSchedules] = useState<Schedule[]>(
    initialSchedules.length > 0
      ? initialSchedules
      : [{ day: "DOMINGO", time: "10:00", name: "" }]
  );

  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!isAdmin || !selectedChurchId) return;
    const church = churches.find((c) => c.id === selectedChurchId);
    const s = church?.schedules ?? [];
    setSchedules(s.length > 0 ? s : [{ day: "DOMINGO", time: "10:00", name: "" }]);
  }, [selectedChurchId, churches, isAdmin]);

  const add = () =>
    setSchedules((prev) => [...prev, { day: "DOMINGO", time: "10:00", name: "" }]);

  const remove = (i: number) =>
    setSchedules((prev) => prev.filter((_, idx) => idx !== i));

  const update = (i: number, field: keyof Schedule, value: string) =>
    setSchedules((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );

  const activeChurchId = isAdmin ? selectedChurchId : (churchId ?? null);
  const canAct = Boolean(activeChurchId);

  const handleSave = async () => {
    if (!activeChurchId) return;
    setSaving(true);
    const result = await actualizarHorariosIglesia(activeChurchId, schedules);
    setSaving(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(result?.success ?? "Horarios guardados");
      router.refresh();
    }
  };

  const handleGenerate = async () => {
    if (!activeChurchId) return;
    setGenerating(true);
    await generarCultosAutomaticos(activeChurchId);
    setGenerating(false);
    toast.success("Cultos generados correctamente");
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      {/* FAB flotante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
        aria-label="Gestionar horarios de culto"
      >
        <Settings className="h-6 w-6" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Horarios de culto</DialogTitle>
            <DialogDescription>
              Define los días y horas recurrentes, luego genera los cultos del mes automáticamente.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Selector de iglesia (solo ADMIN) */}
            {isAdmin && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selecciona una iglesia</p>
                <Select
                  value={selectedChurchId ? String(selectedChurchId) : ""}
                  onValueChange={(v) => setSelectedChurchId(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Elige una iglesia..." />
                  </SelectTrigger>
                  <SelectContent>
                    {churches.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Horarios */}
            {canAct && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Horarios</p>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {schedules.map((s, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <Select
                        value={s.day}
                        onValueChange={(v) => update(i, "day", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS.map((d) => (
                            <SelectItem key={d.value} value={d.value}>
                              {d.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center gap-1">
                        <TimePicker
                          value={s.time}
                          onChange={(v) => update(i, "time", v)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(i)}
                          disabled={schedules.length === 1}
                          className="text-destructive hover:text-destructive shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <Input
                        value={s.name}
                        onChange={(e) => update(i, "name", e.target.value)}
                        placeholder="Nombre del culto"
                        className="col-span-2"
                      />
                    </div>
                  ))}
                </div>

                <Button type="button" variant="outline" size="sm" onClick={add} className="gap-1.5">
                  <Plus className="h-4 w-4" />
                  Añadir horario
                </Button>
              </div>
            )}
          </div>

          {canAct && (
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                onClick={handleGenerate}
                disabled={generating}
                variant="secondary"
                className="w-full sm:w-auto gap-2"
              >
                {generating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Generar cultos del mes
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto gap-2"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Guardar horarios
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

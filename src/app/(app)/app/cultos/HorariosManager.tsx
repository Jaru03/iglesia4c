"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Props {
  churchId: number;
  initialSchedules: Schedule[];
}

export function HorariosManager({ churchId, initialSchedules }: Props) {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>(
    initialSchedules.length > 0
      ? initialSchedules
      : [{ day: "DOMINGO", time: "10:00", name: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  const add = () =>
    setSchedules((prev) => [...prev, { day: "DOMINGO", time: "10:00", name: "" }]);

  const remove = (i: number) =>
    setSchedules((prev) => prev.filter((_, idx) => idx !== i));

  const update = (i: number, field: keyof Schedule, value: string) =>
    setSchedules((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );

  const handleSave = async () => {
    setSaving(true);
    const result = await actualizarHorariosIglesia(churchId, schedules);
    setSaving(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(result?.success ?? "Horarios guardados");
      router.refresh();
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await generarCultosAutomaticos(churchId);
    setGenerating(false);
    toast.success("Cultos generados correctamente");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {schedules.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <select
              value={s.day}
              onChange={(e) => update(i, "day", e.target.value)}
              className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              {DAYS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <Input
              type="time"
              value={s.time}
              onChange={(e) => update(i, "time", e.target.value)}
              className="w-28"
            />
            <Input
              value={s.name}
              onChange={(e) => update(i, "name", e.target.value)}
              placeholder="Nombre (ej. Culto General)"
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
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={add} className="gap-1">
        <Plus className="h-4 w-4" />
        Añadir horario
      </Button>

      <div className="flex items-center gap-2 pt-2 border-t">
        <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1">
          {saving ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Guardar horarios
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={generating}
          size="sm"
          variant="secondary"
          className="gap-1"
        >
          {generating ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Generar cultos
        </Button>
      </div>
    </div>
  );
}

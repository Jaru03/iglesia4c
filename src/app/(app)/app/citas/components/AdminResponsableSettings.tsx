"use client";

import { useState } from "react";
import { Settings, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AvailabilityForm, AvailabilityRecord } from "../../agenda/components/AvailabilityForm";

interface Responsable {
  id: number;
  name: string;
}

interface Props {
  responsables: Responsable[];
}

export function AdminResponsableSettings({ responsables }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [availability, setAvailability] = useState<AvailabilityRecord[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSelectResponsable(value: string) {
    const id = parseInt(value);
    setSelectedId(id);
    setAvailability(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/availability/${id}`);
      const data = await res.json();
      setAvailability(data);
    } catch {
      setAvailability([]);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setSelectedId(null);
      setAvailability(null);
    }
  }

  return (
    <>
      {/* Settings FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
        aria-label="Gestionar disponibilidad de responsables"
      >
        <Settings className="h-6 w-6" />
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Disponibilidad de responsables
            </DialogTitle>
            <DialogDescription>
              Selecciona un responsable para editar sus horarios disponibles para citas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-1">
            {/* Responsable selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Responsable</Label>
              <Select
                value={selectedId ? String(selectedId) : ""}
                onValueChange={handleSelectResponsable}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar responsable..." />
                </SelectTrigger>
                <SelectContent>
                  {responsables.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Availability form */}
            {loading && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {!loading && availability !== null && selectedId !== null && (
              <AvailabilityForm
                initial={availability}
                apiBase={`/api/admin/availability/${selectedId}`}
              />
            )}

            {!loading && !selectedId && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Selecciona un responsable para ver su configuración.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

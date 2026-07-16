"use client";

import { useState } from "react";
import { Users, Loader2 } from "lucide-react";
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
import { AvailabilityForm, type AvailabilityRecord } from "./AvailabilityForm";

interface Obrero {
  id: number;
  name: string;
}

interface Props {
  obreros: Obrero[];
}

export function ObrerosAvailabilityDrawer({ obreros }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [availability, setAvailability] = useState<AvailabilityRecord[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSelect(value: string) {
    const id = parseInt(value);
    setSelectedId(id);
    setAvailability(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/responsable/availability/${id}`);
      if (!res.ok) throw new Error();
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
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
        aria-label="Ver disponibilidad de obreros"
      >
        <Users className="h-5 w-5" />
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Disponibilidad de obreros
            </DialogTitle>
            <DialogDescription>
              Consulta los horarios configurados por los obreros de tu iglesia.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-1">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Obrero</Label>
              {obreros.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay obreros en tu iglesia.
                </p>
              ) : (
                <Select
                  value={selectedId ? String(selectedId) : ""}
                  onValueChange={handleSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar obrero..." />
                  </SelectTrigger>
                  <SelectContent>
                    {obreros.map((o) => (
                      <SelectItem key={o.id} value={String(o.id)}>
                        {o.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {loading && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {!loading && availability !== null && selectedId !== null && (
              <AvailabilityForm initial={availability} readOnly defaultOpen />
            )}

            {!loading && !selectedId && obreros.length > 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Selecciona un obrero para ver su disponibilidad.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

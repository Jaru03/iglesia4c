"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pendiente" },
  { value: "CONFIRMED", label: "Confirmada" },
  { value: "CANCELLED", label: "Cancelada" },
  { value: "COMPLETED", label: "Completada" },
];

interface Props {
  responsables: { id: number; name: string }[];
  selectedResponsableId: number | null;
  selectedStatus: string | null;
}

export function CitasFilterDrawer({
  responsables,
  selectedResponsableId,
  selectedStatus,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const filtroCount = [selectedResponsableId, selectedStatus].filter(Boolean).length;
  // Positioned above the settings FAB
  const fabBottom = "bottom-24";

  function buildUrl(responsableId: number | null, status: string | null) {
    const params = new URLSearchParams();
    if (responsableId) params.set("responsable", String(responsableId));
    if (status) params.set("status", status);
    const qs = params.toString();
    return `/app/citas${qs ? `?${qs}` : ""}`;
  }

  function navigateResponsable(value: string) {
    const id = value === "all" ? null : parseInt(value);
    router.push(buildUrl(id, selectedStatus));
  }

  function navigateStatus(value: string) {
    const status = value === "all" ? null : value;
    router.push(buildUrl(selectedResponsableId, status));
  }

  function limpiar() {
    router.push("/app/citas");
    setOpen(false);
  }

  return (
    <>
      {/* Filter FAB */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed ${fabBottom} right-6 z-50 flex items-center justify-center size-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 active:scale-95 transition-all`}
        aria-label="Filtros"
      >
        <SlidersHorizontal className="h-5 w-5" />
        {filtroCount > 0 && (
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary border-2 border-background" />
        )}
      </button>

      {/* Filter Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xs flex flex-col gap-0 p-0">
          <SheetHeader className="px-6 py-5 border-b">
            <SheetTitle className="flex items-center gap-2">
              Filtros
              {filtroCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {filtroCount}
                </span>
              )}
            </SheetTitle>
            <SheetDescription>Filtra las citas por responsable o estado.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Responsable */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Responsable</Label>
              <Select
                value={selectedResponsableId ? String(selectedResponsableId) : "all"}
                onValueChange={navigateResponsable}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los responsables" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {responsables.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Estado</Label>
              <Select
                value={selectedStatus ?? "all"}
                onValueChange={navigateStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filtroCount > 0 && (
            <div className="px-6 py-4 border-t">
              <Button variant="outline" className="w-full" onClick={limpiar}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

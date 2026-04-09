"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface Filtros {
  churchId: number | null;   // null = todas
  mostrarPasados: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  filtros: Filtros;
  onFiltrosChange: (f: Filtros) => void;
  churches?: { id: number; title: string }[];
  isAdmin?: boolean;
}

export function FiltrosDrawer({
  open,
  onOpenChange,
  filtros,
  onFiltrosChange,
  churches = [],
  isAdmin,
}: Props) {
  const hayFiltros = filtros.churchId !== null || filtros.mostrarPasados;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xs flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-5 border-b">
          <SheetTitle className="flex items-center gap-2">
            Filtros
            {hayFiltros && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                {[filtros.churchId !== null, filtros.mostrarPasados].filter(Boolean).length}
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            Ajusta qué cultos se muestran en el calendario.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Filtro por iglesia — solo ADMIN */}
          {isAdmin && churches.length > 1 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Iglesia</p>
              <Select
                value={filtros.churchId ? String(filtros.churchId) : "all"}
                onValueChange={(v) =>
                  onFiltrosChange({
                    ...filtros,
                    churchId: v === "all" ? null : Number(v),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las iglesias</SelectItem>
                  {churches.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Mostrar pasados */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="mostrar-pasados" className="text-sm font-medium cursor-pointer">
                Mostrar cultos pasados
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Incluye cultos anteriores a hoy en el calendario.
              </p>
            </div>
            <Switch
              id="mostrar-pasados"
              checked={filtros.mostrarPasados}
              onCheckedChange={(v) => onFiltrosChange({ ...filtros, mostrarPasados: v })}
            />
          </div>
        </div>

        {/* Limpiar filtros */}
        {hayFiltros && (
          <div className="px-6 py-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onFiltrosChange({ churchId: null, mostrarPasados: false })}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

interface FabProps {
  onClick: () => void;
  hasActive: boolean;
}

export function FiltrosFab({ onClick, hasActive }: FabProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 active:scale-95 transition-all"
      aria-label="Filtros"
    >
      <SlidersHorizontal className="h-5 w-5" />
      {hasActive && (
        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary border-2 border-background" />
      )}
    </button>
  );
}

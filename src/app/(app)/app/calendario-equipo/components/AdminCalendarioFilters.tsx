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

interface Props {
  churches: { id: number; title: string }[];
  departments: { id: number; name: string; churchId: number }[];
  selectedChurchId: number | null;
  selectedDeptId: number | null;
}

export function AdminCalendarioFilters({
  churches,
  departments,
  selectedChurchId,
  selectedDeptId,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const filteredDepts = selectedChurchId
    ? departments.filter((d) => d.churchId === selectedChurchId)
    : [];

  const filtroCount = [selectedChurchId, selectedDeptId].filter(Boolean).length;
  const hasActiveFiltro = selectedChurchId !== null;

  const navigateChurch = (churchId: number) => {
    // Solo navegar a la iglesia — forzar al usuario a elegir el departamento después
    router.push(`/app/calendario-equipo?church=${churchId}`);
  };

  const navigateDept = (deptId: number) => {
    const params = new URLSearchParams();
    if (selectedChurchId) params.set("church", String(selectedChurchId));
    params.set("dept", String(deptId));
    router.push(`/app/calendario-equipo?${params.toString()}`);
    setOpen(false);
  };

  const limpiar = () => {
    router.push("/app/calendario-equipo");
    setOpen(false);
  };

  return (
    <>
      {/* Filter FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 active:scale-95 transition-all"
        aria-label="Filtros"
      >
        <SlidersHorizontal className="h-5 w-5" />
        {filtroCount > 0 && (
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary border-2 border-background" />
        )}
      </button>

      {/* Filter Drawer */}
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
            <SheetDescription>Selecciona la iglesia y el departamento.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Iglesia */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Iglesia</Label>
              <Select
                value={selectedChurchId ? String(selectedChurchId) : ""}
                onValueChange={(v) => navigateChurch(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar iglesia..." />
                </SelectTrigger>
                <SelectContent>
                  {churches.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Departamento — solo disponible tras elegir iglesia */}
            <div className="space-y-2">
              <Label className={`text-sm font-medium ${!selectedChurchId ? "text-muted-foreground" : ""}`}>
                Departamento
              </Label>
              <Select
                value={selectedDeptId ? String(selectedDeptId) : ""}
                onValueChange={(v) => navigateDept(parseInt(v))}
                disabled={!selectedChurchId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedChurchId ? "Seleccionar departamento..." : "Primero elige una iglesia"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredDepts.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFiltro && (
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

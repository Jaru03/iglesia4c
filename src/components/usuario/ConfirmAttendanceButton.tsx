"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { marcarAsistenciaUsuario } from "@/actions/asistencia-actions";
import { CheckCircle, Loader2, CircleCheck } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  activityId: number;
  activityTitle: string;
  activityDate: string;
  personId: number;
  alreadyAttended?: boolean;
};

export function ConfirmAttendanceButton({ activityId, activityTitle, activityDate, personId, alreadyAttended }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attended, setAttended] = useState(alreadyAttended);

  const handleConfirm = async () => {
    setLoading(true);
    const result = await marcarAsistenciaUsuario(personId, activityId);
    
    if (result?.success) {
      toast.success(result.success);
      setAttended(true);
      setOpen(false);
    } else {
      toast.error(result?.error || "Error al registrar asistencia");
    }
    
    setLoading(false);
  };

  if (attended) {
    return (
      <Button size="sm" className="w-full text-xs gap-1 bg-green-600 hover:bg-green-700" disabled>
        <CircleCheck className="h-3 w-3" />
        Asistido
      </Button>
    );
  }

  return (
    <>
      <Button size="sm" className="w-full text-xs gap-1 bg-slate-900 hover:bg-slate-800" onClick={() => setOpen(true)}>
        <CheckCircle className="h-3 w-3" />
        Marcar
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Asistencia</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres registrar tu asistencia a <strong>{activityTitle}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <p className="text-sm text-slate-600">
              Fecha: {new Date(activityDate).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Asistencia
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

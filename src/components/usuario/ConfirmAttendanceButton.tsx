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
import { marcarAsistenciaUsuario, preRegistrarseActividad, cancelarPreRegistro } from "@/actions/asistencia-actions";
import { CheckCircle, Loader2, CircleCheck, CircleX, CalendarCheck, X } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  activityId: number;
  activityTitle: string;
  activityDate: string; // ISO string
  personId: number;
  alreadyAttended?: boolean;
  preRegistered?: boolean;
  autoMarked?: boolean;
  allowPreRegistration?: boolean;
};

export function ConfirmAttendanceButton({
  activityId,
  activityTitle,
  activityDate,
  personId,
  alreadyAttended,
  preRegistered: initialPreRegistered,
  autoMarked,
  allowPreRegistration,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attended, setAttended] = useState(alreadyAttended);
  const [preRegistered, setPreRegistered] = useState(initialPreRegistered);

  const now = new Date();
  const actDate = new Date(activityDate);
  const isPast = actDate < now;
  const isOverOneWeek = isPast && now.getTime() - actDate.getTime() > 7 * 24 * 60 * 60 * 1000;
  const isRecentPast = isPast && !isOverOneWeek;
  const isFuture = !isPast;

  const handleConfirmAttendance = async () => {
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

  const handlePreRegister = async () => {
    setLoading(true);
    const result = await preRegistrarseActividad(personId, activityId);
    if (result?.success) {
      toast.success(result.success);
      setPreRegistered(true);
    } else {
      toast.error(result?.error || "Error al pre-registrarse");
    }
    setLoading(false);
  };

  const handleCancelPreRegister = async () => {
    setLoading(true);
    const result = await cancelarPreRegistro(personId, activityId);
    if (result?.success) {
      toast.success(result.success);
      setPreRegistered(false);
    } else {
      toast.error(result?.error || "Error al cancelar");
    }
    setLoading(false);
  };

  const formattedDate = new Date(activityDate).toLocaleDateString("es-ES", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  // 1. Already attended
  if (attended) {
    return (
      <Button size="sm" className="w-full text-xs gap-1 bg-green-600 hover:bg-green-700" disabled>
        <CircleCheck className="h-3 w-3" />
        Asistido
      </Button>
    );
  }

  // 2. Auto-marked as absent
  if (autoMarked) {
    return (
      <Button size="sm" variant="outline" className="w-full text-xs gap-1 text-muted-foreground" disabled>
        <CircleX className="h-3 w-3" />
        No asistido
      </Button>
    );
  }

  // 3. Future + pre-registered → show "Pre-registrado" with cancel
  if (isFuture && preRegistered) {
    return (
      <div className="flex gap-1">
        <Button size="sm" variant="outline" className="flex-1 text-xs gap-1 text-blue-600 border-blue-200" disabled>
          <CalendarCheck className="h-3 w-3" />
          Pre-registrado
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-xs px-2 text-muted-foreground hover:text-destructive"
          onClick={handleCancelPreRegister}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
        </Button>
      </div>
    );
  }

  // 4. Future + allowPreRegistration → "Pre-registrarse"
  if (isFuture && allowPreRegistration) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="w-full text-xs gap-1 border-blue-200 text-blue-700 hover:bg-blue-50"
        onClick={handlePreRegister}
        disabled={loading}
      >
        {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <CalendarCheck className="h-3 w-3" />}
        Pre-registrarse
      </Button>
    );
  }

  // 5. Recent past (≤1 week) → "Marcar asistencia"
  if (isRecentPast) {
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
              <p className="text-sm text-slate-600">Fecha: {formattedDate}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmAttendance} disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Guardando...</>
                ) : (
                  <><CheckCircle className="h-4 w-4 mr-2" />Confirmar Asistencia</>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // 6. Future with no pre-registration allowed → "Próxima actividad"
  if (isFuture) {
    return (
      <Button size="sm" variant="outline" className="w-full text-xs gap-1 text-muted-foreground" disabled>
        <CalendarCheck className="h-3 w-3" />
        Próxima actividad
      </Button>
    );
  }

  // 7. Over 1 week past and not attended → "No asistido"
  return (
    <Button size="sm" variant="outline" className="w-full text-xs gap-1 text-muted-foreground" disabled>
      <CircleX className="h-3 w-3" />
      No asistido
    </Button>
  );
}

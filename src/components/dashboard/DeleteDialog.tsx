"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteDialogProps {
  /** Texto del título del diálogo (ej: "Eliminar actividad") */
  dialogTitle: string;
  /** Nombre del elemento a eliminar, aparece en la descripción */
  itemName: string;
  /** Función async que ejecuta la eliminación. Debe devolver { error?: string } o undefined */
  onConfirm: () => Promise<{ error?: string } | void>;
  /** Callback opcional tras eliminación exitosa */
  onSuccess?: () => void;
}

export function DeleteDialog({ dialogTitle, itemName, onConfirm, onSuccess }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    const res = await onConfirm();
    setLoading(false);
    if (res && "error" in res && res.error) return;
    setOpen(false);
    onSuccess?.();
  }

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar{" "}
              <span className="font-medium text-foreground">"{itemName}"</span>? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
              {loading ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

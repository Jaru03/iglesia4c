"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AvailabilityForm, type AvailabilityRecord } from "./AvailabilityForm";

interface Props {
  initial: AvailabilityRecord[];
}

export function AvailabilityDrawer({ initial }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
        aria-label="Gestionar calendario"
      >
        <CalendarDays className="h-5 w-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[75vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mi disponibilidad</DialogTitle>
            <DialogDescription>
              Configura los días y horarios en que estás disponible para citas.
            </DialogDescription>
          </DialogHeader>
          <AvailabilityForm initial={initial} defaultOpen />
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { cambiarEstadoPeticion } from "@/actions/peticiones-actions";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export interface PeticionItem {
  id: number;
  nombre: string;
  email: string;
  phone: string;
  content: string;
  typePetition: string;
  status: string;
  createdAt: Date | string;
}

const statusVariant: Record<string, "destructive" | "default" | "secondary"> = {
  PENDIENTE: "destructive",
  EN_PROCESO: "default",
  ATENDIDA: "secondary",
};

export function PeticionListItem({ peticion }: { peticion: PeticionItem }) {
  const [open, setOpen] = useState(false);
  const createdAt = new Date(peticion.createdAt);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-start gap-4 text-left hover:opacity-75 transition-opacity flex-1 min-w-0"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-slate-800">{peticion.nombre}</h3>
                <Badge variant={statusVariant[peticion.status] ?? "secondary"}>
                  {peticion.status}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {peticion.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {peticion.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(createdAt, { locale: es, addSuffix: true })}
                </span>
              </div>
              <Badge variant="outline" className="mb-2">
                {peticion.typePetition}
              </Badge>
              <p className="text-slate-600 bg-slate-50 p-3 rounded-lg text-sm">{peticion.content}</p>
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-xs text-slate-400">
            {format(createdAt, "dd MMM yyyy, HH:mm", { locale: es })}
          </span>
          <form action={cambiarEstadoPeticion}>
            <input type="hidden" name="id" value={peticion.id} />
            <select
              name="estado"
              defaultValue={peticion.status}
              onChange={(e) => e.target.form?.requestSubmit()}
              className="text-sm p-2 border rounded-lg bg-white w-full"
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROCESO">En Proceso</option>
              <option value="ATENDIDA">Atendida</option>
            </select>
          </form>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{peticion.nombre}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>{peticion.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{peticion.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{peticion.typePetition}</Badge>
            </div>
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{peticion.content}</p>
            <div className="flex items-center gap-2">
              <Badge variant={statusVariant[peticion.status] ?? "secondary"}>
                {peticion.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>{format(createdAt, "dd MMM yyyy, HH:mm", { locale: es })}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

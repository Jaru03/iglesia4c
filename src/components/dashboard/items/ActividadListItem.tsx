"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, Pencil } from "lucide-react";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { eliminarActividadPorId } from "@/actions/actividades-actions";
import toast from "react-hot-toast";

export interface ActividadItem {
  id: number;
  title: string;
  place: string;
  img: string | null;
  hourStart: string | Date;
  hourEnd: string | Date;
}

interface ActividadListItemProps {
  actividad: ActividadItem;
  editHref?: string;
}

export function ActividadListItem({ actividad, editHref }: ActividadListItemProps) {
  const href = editHref ?? `/admin/actividades/${actividad.id}/editar`;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        {actividad.img ? (
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <img src={actividad.img} alt={actividad.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Activity className="h-6 w-6 text-emerald-600" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-slate-800">{actividad.title}</h3>
          <p className="text-sm text-slate-500 mt-1">{actividad.place}</p>
          <p className="text-xs text-slate-400 mt-1">
            {new Date(actividad.hourStart).toLocaleString("es-ES", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button asChild size="sm" variant="ghost">
          <Link href={href}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
        <DeleteDialog
          dialogTitle="Eliminar actividad"
          itemName={actividad.title}
          onConfirm={async () => {
            const res = await eliminarActividadPorId(actividad.id);
            if (res?.error) {
              toast.error(res.error);
              return res;
            }
            toast.success(res?.success ?? "Actividad eliminada");
          }}
        />
      </div>
    </div>
  );
}

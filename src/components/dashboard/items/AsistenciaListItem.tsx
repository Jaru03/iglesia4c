import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, Clock, Pencil } from "lucide-react";
import { ActivityStatusBadge } from "@/components/dashboard/ActivityStatusBadge";

export interface AsistenciaActividadItem {
  id: number;
  title: string;
  place: string;
  img: string | null;
  hourStart: string | Date;
  hourEnd: string | Date;
  department: {
    name: string;
    church: { id: number; title: string };
  };
  _count: { attendances: number };
}

interface AsistenciaListItemProps {
  actividad: AsistenciaActividadItem;
  /** Si se filtra por iglesia, oculta el nombre de la iglesia */
  iglesiaId?: number | null;
  editHref?: string;
}

export function AsistenciaListItem({ actividad, iglesiaId, editHref }: AsistenciaListItemProps) {
  const href =
    editHref ??
    `/admin/asistencias/${actividad.id}${iglesiaId ? `?iglesia=${iglesiaId}` : ""}`;

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
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {actividad.department.name}
              {!iglesiaId && (
                <span className="text-blue-600"> • {actividad.department.church.title}</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
            <Clock className="h-3 w-3" />
            {new Date(actividad.hourStart).toLocaleString("es-ES", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ActivityStatusBadge hourStart={actividad.hourStart} />
        <Badge variant="outline">{actividad._count.attendances} asis.</Badge>
        <Button asChild size="sm" variant="ghost">
          <Link href={href}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

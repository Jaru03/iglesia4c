"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format, isToday, isFuture } from "date-fns";
import { es } from "date-fns/locale";
import ActivityDeleteButton from "./ActivityDeleteButton";

type ActivityItem = {
  id: number;
  title: string;
  place: string;
  img: string | null;
  hourStart: string;
  hourEnd: string;
};

export default function ActivitiesBoard({ activities }: { activities: ActivityItem[] }) {
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState<"TODAS" | "HOY" | "PROXIMAS" | "PASADAS">("TODAS");

  const filtered = useMemo(() => {
    return activities.filter((act) => {
      const start = new Date(act.hourStart);
      const textOk = act.title.toLowerCase().includes(query.toLowerCase()) || act.place.toLowerCase().includes(query.toLowerCase());
      if (!textOk) return false;
      if (estado === "TODAS") return true;
      if (estado === "HOY") return isToday(start);
      if (estado === "PROXIMAS") return isFuture(start);
      return start < new Date();
    });
  }, [activities, query, estado]);

  if (activities.length === 0) {
    return (
      <div className="py-10 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
        <p className="text-slate-400">No hay eventos programados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título o lugar..."
          className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100"
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value as typeof estado)}
          className="px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-none"
        >
          <option value="TODAS">Todas</option>
          <option value="HOY">Hoy</option>
          <option value="PROXIMAS">Próximas</option>
          <option value="PASADAS">Pasadas</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((act) => {
          const start = new Date(act.hourStart);
          const estadoLabel = isToday(start) ? "HOY" : isFuture(start) ? "PRÓXIMA" : "PASADA";
          const estadoClass = isToday(start) ? "bg-blue-100 text-blue-700" : isFuture(start) ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600";

          return (
            <div key={act.id} className="bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-28 shrink-0 rounded-xl bg-blue-50 text-blue-700 flex md:flex-col items-center justify-center py-3 px-2">
                  <span className="text-xs font-bold uppercase">{format(start, "MMM", { locale: es })}</span>
                  <span className="text-2xl font-bold">{format(start, "d")}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-lg text-slate-800">{act.title}</h3>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${estadoClass}`}>{estadoLabel}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">📍 {act.place}</p>
                  <p className="text-sm text-slate-500">🕒 {format(start, "h:mm a")} - {format(new Date(act.hourEnd), "h:mm a")}</p>

                  {act.img && (
                    <div className="mt-3 h-36 rounded-xl overflow-hidden border border-slate-100">
                      <img src={act.img} alt={act.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-slate-100">
                    <Link href={`/admin/actividades/${act.id}/editar`} className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg">Editar</Link>
                    <ActivityDeleteButton id={act.id} title={act.title} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

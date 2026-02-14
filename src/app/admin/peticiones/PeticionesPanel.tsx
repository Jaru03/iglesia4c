"use client";

import { marcarComoOrado } from "@/actions/toggle-oracion";
import { useMemo, useState, useTransition } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type PeticionItem = {
  id: string;
  motivo: string;
  estado: "PENDIENTE" | "ORANDO" | "RESPONDIDA";
  fecha: string;
  personaNombre: string;
  personaTelefono: string;
};

export default function PeticionesPanel({ items }: { items: PeticionItem[] }) {
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState<"TODAS" | "PENDIENTE" | "RESPONDIDA">("TODAS");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const filtradas = useMemo(() => {
    return items.filter((p) => {
      const textOk =
        p.personaNombre.toLowerCase().includes(query.toLowerCase()) ||
        p.motivo.toLowerCase().includes(query.toLowerCase()) ||
        p.personaTelefono.toLowerCase().includes(query.toLowerCase());

      const estadoOk = estado === "TODAS" ? true : p.estado === estado;
      return textOk && estadoOk;
    });
  }, [items, query, estado]);

  const toggleEstado = (peticionId: string) => {
    startTransition(async () => {
      const res = await marcarComoOrado(peticionId);
      if ((res as any)?.error) {
        toast.error("No se pudo actualizar la petición");
        return;
      }
      toast.success("Estado actualizado");
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, teléfono o motivo..."
          className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-100"
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value as "TODAS" | "PENDIENTE" | "RESPONDIDA")}
          className="px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-100"
        >
          <option value="TODAS">Todas</option>
          <option value="PENDIENTE">Pendientes</option>
          <option value="RESPONDIDA">Respondidas</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtradas.length === 0 ? (
          <div className="p-10 text-center text-slate-400">No hay peticiones con esos filtros.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtradas.map((peticion) => (
              <div key={peticion.id} className="p-4 md:p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800">{peticion.personaNombre}</h3>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                        peticion.estado === "RESPONDIDA"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {peticion.estado}
                    </span>
                  </div>
                  {peticion.personaTelefono && (
                    <p className="text-xs text-slate-500 mt-1">📞 {peticion.personaTelefono}</p>
                  )}
                  <p className="text-sm text-slate-600 mt-2 break-words">"{peticion.motivo}"</p>
                  <p className="text-xs text-slate-400 mt-2">
                    {format(new Date(peticion.fecha), "dd MMM yyyy, h:mm a", { locale: es })}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleEstado(peticion.id)}
                  disabled={isPending}
                  className={`self-start md:self-center text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                    peticion.estado === "RESPONDIDA"
                      ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
                      : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                  }`}
                >
                  {peticion.estado === "RESPONDIDA" ? "Marcar Pendiente" : "Marcar Respondida"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

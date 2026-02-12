import prisma from "@/utils/prisma";
import ActivityForm from "./ActivityForm"; 
import { eliminarActividad } from "@/actions/actividades-actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function ActividadesPage() {
  const actividades = await prisma.activities.findMany({
    orderBy: { hour_start: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-800">Agenda y Eventos</h1>
        <p className="text-slate-500 mt-2">Programa las próximas actividades de la iglesia.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA 1: Aquí cargamos el formulario quese crae en el otro archivo */}
        <div className="lg:col-span-1">
            <ActivityForm />
        </div>

        {/* COLUMNA 2: Lista de Eventos*/}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-slate-700">
                    Próximos Eventos <span className="text-sm font-normal text-slate-500 ml-2">({actividades.length})</span>
                </h2>
            </div>

            {actividades.length === 0 ? (
                <div className="py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400">No hay eventos programados.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {actividades.map((act) => (
                        <div key={act.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-5 hover:shadow-md transition group">
                            
                            {/* Fecha */}
                            <div className="flex sm:flex-col items-center justify-center bg-blue-50 text-blue-700 w-full sm:w-24 rounded-lg p-3 h-16 sm:h-auto shrink-0 gap-2 sm:gap-0">
                                <span className="text-sm font-bold uppercase tracking-wider">{format(new Date(act.hour_start), "MMM", { locale: es })}</span>
                                <span className="text-2xl font-bold">{format(new Date(act.hour_start), "d")}</span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col justify-between overflow-hidden">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 truncate">{act.title}</h3>
                                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                        📍 {act.place}
                                    </p>
                                    <p className="text-sm text-slate-500 flex items-center gap-1">
                                        🕒 {format(new Date(act.hour_start), "h:mm a")}
                                    </p>
                                </div>

                                {/* Miniatura de la imagen (si tiene) */}
                                {act.img && (
                                    <div className="mt-3 h-32 w-full rounded-lg overflow-hidden relative border border-slate-100">
                                        <img src={act.img} alt={act.title} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="flex justify-end mt-3 pt-3 border-t border-slate-50">
                                    <form action={eliminarActividad.bind(null, act.id)}>
                                        <button className="text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
                                            Eliminar 🗑️
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
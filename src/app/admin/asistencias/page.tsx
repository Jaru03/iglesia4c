import prisma from "@/utils/prisma";
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function AsistenciasPage() {
 
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 15);

  const jovenesEnRiesgo = await prisma.joven.findMany({
    where: {
      OR: [
        { ultimaVisita: { lt: fechaLimite } }, 
        { ultimaVisita: null } 
      ],
      activo: true, 
    },
    orderBy: { ultimaVisita: 'asc' }, 
    });

  const historialAsistencias = await prisma.asistencia.findMany({
    take: 20, // Últimos 20 registros
    orderBy: { fecha: 'desc' },
    include: {
      joven: true, // Traer el nombre del joven
    },
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Control de Asistencias</h1>
        <p className="text-slate-500">Detecta ausencias y revisa quién vino.</p>
      </header>

      {/* --- SECCIÓN 1: ALERTA DE RIESGO (LO MÁS IMPORTANTE) --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden mb-8">
        <div className="bg-red-50 p-6 border-b border-red-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-red-800 flex items-center gap-2">
              ⚠️ Radar de Ausencias
            </h2>
            <p className="text-red-600 text-sm mt-1">
              Jóvenes que no han asistido en los últimos 15 días.
            </p>
          </div>
          <span className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-sm font-bold">
            {jovenesEnRiesgo.length} en riesgo
          </span>
        </div>

        <div className="p-0">
          {jovenesEnRiesgo.length === 0 ? (
            <div className="p-8 text-center text-green-600 font-medium">
              ¡Increíble! Todos los jóvenes han venido recientemente. 🎉
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Última Vez Visto</th>
                  <th className="px-6 py-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jovenesEnRiesgo.map((joven) => (
                  <tr key={joven.id} className="hover:bg-red-50/30 transition">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {joven.nombres} {joven.apellidos}
                      <div className="text-xs text-slate-400">Telf: {joven.telefono || "Sin número"}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {joven.ultimaVisita 
                        ? `Hace ${formatDistanceToNow(new Date(joven.ultimaVisita), { locale: es })}`
                        : "Nunca ha marcado"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-xs bg-white border border-red-200 text-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition">
                        Contactar 📞
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* --- SECCIÓN 2: HISTORIAL DE ASISTENCIA --- */}
      <h3 className="text-xl font-bold text-slate-700 mb-4">Historial Reciente</h3>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Fecha y Hora</th>
              <th className="px-6 py-4">Joven</th>
              <th className="px-6 py-4">Sede</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historialAsistencias.map((registro) => (
              <tr key={registro.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 text-slate-600 text-sm">
                  {format(new Date(registro.fecha), "dd MMM yyyy - h:mm a", { locale: es })}
                </td>
                <td className="px-6 py-4 font-medium text-slate-800">
                  {registro.joven.nombres} {registro.joven.apellidos}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">
                    {registro.joven.sede || "General"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
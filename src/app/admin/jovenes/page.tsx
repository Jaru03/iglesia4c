import prisma from "@/utils/prisma";
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";
import ListadoJovenesCliente from "./ListadoJovenesCliente";
import Link from "next/link"; 

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JovenesDashboardPage() {
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
    take: 8, 
    orderBy: { fecha: 'desc' },
    include: { joven: true },
  });

  const jovenesReales = await prisma.joven.findMany({
    orderBy: { nombres: "asc" },
  });

  // --- CÁLCULO DE ESTADÍSTICAS ---
  const totalJovenes = jovenesReales.length;
  const totalEnRiesgo = jovenesEnRiesgo.length;
  const activosRecientes = totalJovenes - totalEnRiesgo; 

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">🔥 Ministerio de Jóvenes</h1>
        <p className="text-slate-500 mt-2">Panel de control pastoral y gestión de sedes.</p>
      </header>

      {/* --- BARRA DE ESTADÍSTICAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Jóvenes</h3>
          <p className="text-4xl font-black text-slate-800 mt-2">{totalJovenes}</p>
        </div>
        <div className="bg-green-50 border border-green-100 p-6 rounded-2xl shadow-sm">
          <h3 className="text-green-600 text-sm font-semibold uppercase tracking-wider">Activos (Últimos 15 días)</h3>
          <p className="text-4xl font-black text-green-700 mt-2">{activosRecientes}</p>
        </div>
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow-sm">
          <h3 className="text-red-600 text-sm font-semibold uppercase tracking-wider">Radar de Ausencias</h3>
          <p className="text-4xl font-black text-red-700 mt-2">{totalEnRiesgo}</p>
        </div>
      </div>

      {/* --- GRID PRINCIPAL --- */}
      <div className="grid grid-cols-1 2xl:grid-cols-4 gap-8">
        
        {/* COLUMNA IZQUIERDA (Principal) */}
        <div className="2xl:col-span-3 space-y-8">
          
          {/* RADAR DE AUSENCIAS */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">⚠️ Necesitan Seguimiento</h2>
                <p className="text-slate-500 text-sm mt-1">Más de 15 días sin asistir.</p>
              </div>
            </div>
            <div className="p-0">
              {jovenesEnRiesgo.length === 0 ? (
                <div className="p-8 text-center text-green-600 font-medium bg-green-50/50">
                  ¡Excelente trabajo pastoral! Todos están activos. 🎉
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-slate-600">
                    <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-medium border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Nombre</th>
                        <th className="px-6 py-4">Última Vez</th>
                        <th className="px-6 py-4 text-center">Perfil</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {jovenesEnRiesgo.map((joven) => (
                        <tr key={joven.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-medium text-slate-800">{joven.nombres} {joven.apellidos}</td>
                          <td className="px-6 py-4 text-sm">
                            {joven.ultimaVisita ? `Hace ${formatDistanceToNow(new Date(joven.ultimaVisita), { locale: es })}` : "Nunca"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Link href={`/admin/jovenes/${joven.id}`} className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
                              Ver Ficha
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* DIRECTORIO COMPLETO (Aquí arreglamos el botón) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[500px]">
            
            {/* 🔥 CABECERA FLEX: Título a la izquierda, Botón a la derecha */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">📖 Directorio y Gestión</h3>
                <p className="text-slate-500 text-sm">Busca miembros o registra nuevos jóvenes.</p>
              </div>
              
              <Link href="/admin/jovenes/nuevo">
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/30 text-sm">
                  <span>+</span> Nuevo Joven
                </button>
              </Link>
            </div>

            <div className="mt-4">
              <ListadoJovenesCliente jovenesIniciales={jovenesReales} />
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA (Historial) */}
        <div className="2xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-8">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">⏱️ Historial (Últimos 8)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-600">
                <thead className="bg-white text-slate-400 text-xs uppercase font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Joven y Sede</th>
                    <th className="px-4 py-3 text-right">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {historialAsistencias.map((registro) => (
                    <tr key={registro.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800 text-sm">{registro.joven.nombres}</div>
                        <div className="text-xs text-indigo-600 mt-0.5">{registro.joven.sede || "General"}</div>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-slate-500">
                        {format(new Date(registro.fecha), "dd MMM", { locale: es })}<br/>
                        {format(new Date(registro.fecha), "h:mm a", { locale: es })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

import prisma from "@/utils/prisma";


export const dynamic = "force-dynamic";

export default async function AdminDashboard() {

  const [totalJovenes, ultimosJovenes] = await Promise.all([
    prisma.joven.count(), 
    prisma.joven.findMany({
      take: 4, 
      orderBy: { id: "desc" }, 
    }),
  ]);

  return (
    <div>
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500">Bienvenido de nuevo, Pastor.</p>
        </div>
        <div className="bg-white p-2 px-4 rounded-full shadow-sm border text-sm font-medium text-slate-600">
          📅 Hoy: {new Date().toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </header>

      {/* GRID DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* CARD 1: TOTAL REAL */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">Total Jóvenes</p>
              {/* AQUÍ MOSTRAMOS EL DATO REAL */}
              <h3 className="text-4xl font-bold text-slate-800 mt-2">{totalJovenes}</h3>
            </div>
            <span className="bg-blue-100 text-blue-700 p-3 rounded-xl text-2xl">👥</span>
          </div>
          <p className="text-blue-600 text-sm mt-4 font-medium bg-blue-50 inline-block px-2 py-1 rounded">
            Registrados en el sistema
          </p>
        </div>

        {/* CARD 2: ASISTENCIA (Aún estático hasta que programemos esa parte) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">Asistencia Domingo</p>
              <h3 className="text-4xl font-bold text-slate-800 mt-2">-- %</h3>
            </div>
            <span className="bg-purple-100 text-purple-700 p-3 rounded-xl text-2xl">📊</span>
          </div>
          <p className="text-slate-400 text-xs mt-4">
            Se activará cuando haya asistencias
          </p>
        </div>

        {/* CARD 3: ACCESO RÁPIDO AL KIOSKO (Nuevo y Útil) */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-md text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 text-sm font-medium uppercase">Acción Rápida</p>
              <h3 className="text-2xl font-bold mt-2">Kiosko</h3>
            </div>
            <span className="bg-white/20 p-2 rounded-lg text-xl">📍</span>
          </div>
          <a 
            href="/kiosko" 
            target="_blank"
            className="mt-4 block text-center bg-white text-indigo-700 font-bold py-2 rounded-lg hover:bg-indigo-50 transition"
          >
            Abrir Pantalla de Ingreso
          </a>
        </div>
      </div>

      {/* SECCIÓN INFERIOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* GRÁFICO (Placeholder) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64 flex flex-col items-center justify-center text-slate-400 border-dashed border-2">
          <span className="text-4xl mb-2">📈</span>
          <p>Gráfico de Asistencia</p>
          <span className="text-xs text-slate-300 mt-2">(Próximamente con Recharts)</span>
        </div>

        {/* LISTA REAL DE ÚLTIMOS REGISTROS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Últimos Registros</h3>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Recientes</span>
          </div>
          
          <ul className="space-y-3">
            {ultimosJovenes.length === 0 ? (
              <p className="text-slate-400 text-sm italic">No hay jóvenes registrados aún.</p>
            ) : (
              ultimosJovenes.map((joven) => (
                <li key={joven.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    {/* Avatar con iniciales */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {joven.nombres.charAt(0)}{joven.apellidos.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{joven.nombres} {joven.apellidos}</p>
                      <p className="text-xs text-slate-400">DNI: {joven.documento}</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wide bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold">
                    {joven.sede || "General"}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

    </div>
  );
}
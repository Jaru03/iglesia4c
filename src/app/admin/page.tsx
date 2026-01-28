export default function AdminDashboard() {
  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500">Bienvenido de nuevo, Arthur.</p>
        </div>
        <div className="bg-white p-2 px-4 rounded-full shadow-sm border text-sm font-medium">
          📅 Hoy: {new Date().toLocaleDateString()}
        </div>
      </header>

      {/* GRID DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* CARD 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">Total Jóvenes</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">124</h3>
            </div>
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg text-xl">👥</span>
          </div>
          <p className="text-green-600 text-sm mt-4 font-medium">↑ 12 nuevos este mes</p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">Asistencia Domingo</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">85%</h3>
            </div>
            <span className="bg-purple-100 text-purple-700 p-2 rounded-lg text-xl">📊</span>
          </div>
          <p className="text-slate-400 text-sm mt-4">Media de las últimas 4 semanas</p>
        </div>

        {/* CARD 3 - ALERTA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">En Riesgo</p>
              <h3 className="text-3xl font-bold text-red-600 mt-2">8</h3>
            </div>
            <span className="bg-red-100 text-red-700 p-2 rounded-lg text-xl">⚠️</span>
          </div>
          <p className="text-red-500 text-sm mt-4 font-medium">No han venido en 30 días</p>
        </div>
      </div>

      {/* SECCIÓN INFERIOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64 flex items-center justify-center text-slate-400">
          Gráfico de Asistencia (Próximamente) 📈
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Últimos Registros</h3>
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                  <div>
                    <p className="font-medium text-slate-700">Joven Ejemplo 1 {i}</p>
                    <p className="text-xs text-slate-400">Sede Plaza Castilla</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Asistió</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      {/* LOGO */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Casa de Dios
        </h2>
        <span className="text-xs text-slate-400 uppercase tracking-wider">Panel Admin</span>
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        
        <p className="text-xs text-slate-500 font-bold uppercase mb-2 px-4 mt-4">Gestión</p>
        
        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <span></span> Dashboard
        </Link>

        <Link href="/admin/jovenes" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <span></span> Jóvenes
        </Link>

        <Link href="/admin/asistencia" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <span></span> Asistencias
        </Link>

        <p className="text-xs text-slate-500 font-bold uppercase mb-2 px-4 mt-6">Contenido Web</p>

        <Link href="/admin/actividades" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <span></span> Actividades
        </Link>

        <Link href="/admin/predicas" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <span></span> Prédicas
        </Link>

        <Link  href="/admin/actividades" className="flex items-center gap-3 p-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <span>Calendario</span>
      </Link>
      </nav>

      {/* FOOTER DEL SIDEBAR */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-900/20 rounded-xl transition-all">
          <span></span> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      {/* LOGO */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Iglesia Casa De Dios 
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
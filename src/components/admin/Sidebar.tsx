"use client";
import Link from 'next/link';
import { signOut } from "next-auth/react"; 
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  Activity, 
  Video, 
  Calendar, 
  LogOut 
} from "lucide-react"; // Iconos para rellenar los huecos vacíos

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
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link href="/admin/jovenes" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <Users size={20} />
          Jóvenes
        </Link>

        <Link href="/admin/asistencia" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <ClipboardCheck size={20} />
          Asistencias
        </Link>

        <p className="text-xs text-slate-500 font-bold uppercase mb-2 px-4 mt-6">Contenido Web</p>

        <Link href="/admin/actividades" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <Activity size={20} />
          Actividades
        </Link>

        <Link href="/admin/predicas" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <Video size={20} />
          Prédicas
        </Link>

        <Link href="/admin/calendario" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <Calendar size={20} />
          <span>Calendario</span>
        </Link>
      </nav>

      {/* FOOTER DEL SIDEBAR */}
      <div className="p-4 border-t border-slate-800">
        <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-900/20 rounded-xl transition-all cursor-pointer"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
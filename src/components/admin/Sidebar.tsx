"use client";
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react"; // 1. Importamos useSession
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  Activity, 
  Video, 
  Calendar, 
  LogOut,
  Shield // 2. Icono para el Superadmin
} from "lucide-react";

export default function Sidebar() {
  // 3. Obtenemos los datos de la sesión para saber el rol
  const { data: session } = useSession(); 
  // @ts-ignore - A veces TS se queja si no hemos extendido el tipo, esto lo silencia
  const role = session?.user?.role; 

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      {/* LOGO */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Casa de Dios
        </h2>
        <span className="text-xs text-slate-400 uppercase tracking-wider">
           {/* Mostramos el rol actual para que sepas quién eres */}
           {role === 'SUPERADMIN' ? 'Super Admin' : 'Panel Admin'}
        </span>
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        
        <p className="text-xs text-slate-500 font-bold uppercase mb-2 px-4 mt-4">Gestión</p>
        
        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* --- ZONA VIP: SOLO SUPERADMIN --- */}
        {role === "SUPERADMIN" && (
            <Link href="/admin/equipo" className="flex items-center gap-3 px-4 py-3 text-emerald-400 hover:bg-emerald-900/20 hover:text-emerald-300 rounded-xl transition-all border border-emerald-900/30 mb-4">
              <Shield size={20} />
              Gestión Equipo
            </Link>
        )}
        {/* -------------------------------- */}

        <Link href="/admin/jovenes" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
          <Users size={20} />
          Jóvenes
        </Link>

        <Link href="/admin/asistencias" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
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
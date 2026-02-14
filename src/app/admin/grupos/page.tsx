import prisma from "@/utils/prisma";
import BotonNuevoGrupo from "./BotonNuevoGrupo"; 
import Link from "next/link"; // 🔥 IMPORTANTE: Faltaba importar Link
import BotonEliminarGrupo from "./BotonEliminarGrupo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GruposPage() {
  const grupos = await prisma.grupo.findMany({
    orderBy: { nombre: 'asc' },
    where: { activo: true }
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">🏡 Grupos de Conexión</h1>
          <p className="text-slate-500 mt-1">Administra las células y casas de paz.</p>
        </div>
        <BotonNuevoGrupo />
      </header>

      {grupos.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 text-lg">No hay grupos registrados.</p>
            <p className="text-slate-400 text-sm">Crea el primero para expandir la iglesia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grupos.map((grupo) => (
                <div key={grupo.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition">
                    {/* Header con Color según tipo */}
                    <div className={`h-2 ${
                        grupo.tipo === 'Jóvenes' ? 'bg-orange-500' : 
                        grupo.tipo === 'Matrimonios' ? 'bg-pink-500' : 'bg-blue-500'
                    }`}></div>
                    
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-slate-800">{grupo.nombre}</h3>
                            <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                                {grupo.tipo}
                            </span>
                        </div>
                        
                        <div className="space-y-3 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">👑</span>
                                <span className="font-medium">{grupo.lider}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg">📅</span>
                                <span>{grupo.dia} a las {grupo.hora}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg">📍</span>
                                <span className="truncate">{grupo.direccion}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                            {/* 🔥 BOTÓN QUE LLEVA AL DETALLE DE MIEMBROS */}
                            <Link 
                              href={`/admin/grupos/${grupo.id}`} 
                              className="flex-1 min-w-[110px] bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 text-center flex items-center justify-center"
                            >
                                Ver Miembros
                            </Link>
                            
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(grupo.direccion)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 min-w-[110px] bg-green-50 text-green-600 py-2 rounded-lg text-xs font-bold hover:bg-green-100 text-center flex items-center justify-center"
                            >
                                Ver Mapa
                            </a>

                            <BotonEliminarGrupo grupoId={grupo.id} nombre={grupo.nombre} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}

import prisma from "@/utils/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ModalAgregarMiembro from "./ModalAgregarMiembro"; 
import BotonEliminar from "./BotonEliminar";
export const dynamic = "force-dynamic";

export default async function DetalleGrupoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const grupoId = parseInt(id);

  // 1. Buscamos el grupo y sus miembros
  const grupo = await prisma.grupo.findUnique({
    where: { id: grupoId },
    include: {
      miembros: { orderBy: { nombres: 'asc' } } 
    }
  });

  if (!grupo) notFound();

  // 2. Buscamos jóvenes DISPONIBLES (que no tienen grupo asignado) para poder agregarlos
  const disponibles = await prisma.joven.findMany({
    where: { grupoId: null, activo: true },
    orderBy: { nombres: 'asc' }
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      
      {/* HEADER: Botón volver y Título */}
      <div className="flex items-center gap-4">
        <Link href="/admin/grupos" className="bg-white p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500">
            ⬅️
        </Link>
        <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                {grupo.nombre}
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {grupo.tipo}
                </span>
            </h1>
            <p className="text-slate-500 mt-1">Líderes: {grupo.lider} • {grupo.dia} {grupo.hora}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: ESTADÍSTICAS */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h3 className="text-slate-400 font-bold text-xs uppercase">Miembros Activos</h3>
                <p className="text-5xl font-black text-slate-800 mt-2">{grupo.miembros.length}</p>
                <p className="text-xs text-slate-400 mt-2">Personas asignadas</p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
                <h3 className="text-indigo-800 font-bold mb-2">📍 Ubicación</h3>
                <p className="text-indigo-600 font-medium">{grupo.direccion}</p>
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(grupo.direccion)}`} 
                    target="_blank"
                    className="mt-4 block w-full bg-indigo-600 text-white text-center py-2 rounded-lg font-bold text-sm hover:bg-indigo-700"
                >
                    Ver en Mapa 🗺️
                </a>
            </div>
        </div>

        {/* COLUMNA DERECHA: LISTA DE MIEMBROS */}
        <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-700">👥 Listado de Asistentes</h3>
                    {/* Componente Cliente para agregar gente */}
                    <ModalAgregarMiembro grupoId={grupoId} candidatos={disponibles} />
                </div>

                <div className="divide-y divide-slate-100">
                    {grupo.miembros.length === 0 ? (
                        <div className="p-10 text-center text-slate-400">
                            Aún no hay miembros en este grupo. <br/>
                            ¡Agrega el primero con el botón azul!
                        </div>
                    ) : (
                        grupo.miembros.map(joven => (
                            <div key={joven.id} className="p-4 flex justify-between items-center hover:bg-slate-50 group transition">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg">
                                        👤
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{joven.nombres} {joven.apellidos}</p>
                                        <p className="text-xs text-slate-500">{joven.telefono || "Sin teléfono"}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Link href={`/admin/jovenes/${joven.id}`} className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-medium hover:bg-slate-200">
                                        Ficha
                                    </Link>
                                    <BotonEliminar jovenId={joven.id} grupoId={grupoId} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
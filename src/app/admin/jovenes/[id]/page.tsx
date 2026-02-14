import prisma from "@/utils/prisma";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PerfilJovenPage({ params }: { params: Promise<{ id: string }> }) {
  // 🔥 Le decimos a Next.js que espere a leer el ID de la URL
  const { id } = await params; 

  // Buscamos al joven y TRAEMOS SU HISTORIAL COMPLETO de asistencia
  const joven = await prisma.joven.findUnique({
    where: { 
      id: parseInt(id) // Convertimos el texto de la URL a número
    },
    include: {
      asistencias: {
        orderBy: { fecha: "desc" },
        take: 20, // Mostramos las últimas 20 veces que vino
      },
    },
  });

  // Si alguien pone una URL inventada o el joven se borró, mostramos error 404
  if (!joven) {
    notFound();
  }

  // Calculamos si está en riesgo (más de 15 días)
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 15);
  const estaEnRiesgo = !joven.ultimaVisita || joven.ultimaVisita < fechaLimite;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      
      {/* BOTÓN VOLVER */}
      <Link 
        href="/admin/jovenes" 
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition"
      >
        ← Volver al Panel de Jóvenes
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- COLUMNA IZQUIERDA: TARJETA DE PERFIL --- */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center relative overflow-hidden">
            {/* Decormación superior */}
            <div className={`h-16 absolute top-0 left-0 right-0 ${estaEnRiesgo ? 'bg-red-500' : 'bg-green-500'}`}></div>
            
            <div className="relative mt-8">
              <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full border-4 border-white shadow-md flex items-center justify-center text-2xl mb-4">
                🧑🏽
              </div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">
                {joven.nombres} <br/> {joven.apellidos}
              </h1>
              
              <div className="mt-3 flex justify-center gap-2">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {joven.sede || "General"}
                </span>
                {estaEnRiesgo ? (
                  <span className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Riesgo ⚠️
                  </span>
                ) : (
                  <span className="bg-green-50 text-green-600 border border-green-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Activo ✅
                  </span>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4 text-left">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Teléfono</p>
                <p className="font-medium text-slate-700 mt-0.5">{joven.telefono || "No registrado"}</p>
              </div>
              
              {/* Botón de WhatsApp Gigante */}
              {joven.telefono && (
                <a 
                  href={`https://wa.me/${joven.telefono.replace(/\+/g, '').replace(/\s/g, '')}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white border border-green-200 font-bold py-3 rounded-xl transition text-center"
                >
                  Enviar WhatsApp 💬
                </a>
              )}
            </div>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: HISTORIAL DE ASISTENCIA --- */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-2">⏱️ Línea de Tiempo</h2>
            <p className="text-sm text-slate-500 mb-6">
              Última vez visto: {" "}
              <span className="font-semibold text-slate-700">
                {joven.ultimaVisita 
                  ? `Hace ${formatDistanceToNow(new Date(joven.ultimaVisita), { locale: es })}`
                  : "Nunca"}
              </span>
            </p>

            {joven.asistencias.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <p className="text-slate-500">No hay registros de asistencia todavía.</p>
              </div>
            ) : (
              <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-4">
                {joven.asistencias.map((asistencia) => (
                  <div key={asistencia.id} className="relative pl-6">
                    {/* Puntito en la línea de tiempo */}
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 border-2 border-white"></div>
                    
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="font-semibold text-slate-800">
                        {format(new Date(asistencia.fecha), "EEEE, d 'de' MMMM", { locale: es })}
                      </p>
                      <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                        <span>🕒 {format(new Date(asistencia.fecha), "h:mm a")}</span>
                        <span>•</span>
                        <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs font-medium">
                          Sede: {joven.sede || "General"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
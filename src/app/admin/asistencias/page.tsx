import prisma from "@/utils/prisma";
import TablaAsistentes from "./TablaAsistentes";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AsistenciasGeneralPage() {
  const asistentes = await prisma.persona.findMany({
    include: {
      peticiones: true, 
    },
    orderBy: {
      fechaVisita: "desc", 
    },
  });

  // --- LÓGICA DE CUMPLEAÑOS 🎉 ---
  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();

  const cumpleañeros = asistentes.filter(p => {
    if (!p.FechaNacimiento) return false;
    const fechaNac = new Date(p.FechaNacimiento);
    const cumpleHoy = fechaNac.getDate() === diaActual && fechaNac.getMonth() === mesActual;
    return cumpleHoy; 
  });

  const totalPersonas = asistentes.length;
  const totalNuevos = asistentes.filter(p => p.esNuevo).length;
  const oracionesPendientes = asistentes.reduce((acc, p) => {
    return acc + p.peticiones.filter(pet => pet.estado === "PENDIENTE").length;
  }, 0);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">👥 Puerta y Consolidación</h1>
        <p className="text-slate-500 mt-2">Gestión de visitantes y ministerio de oración.</p>
      </header>

      {/* --- SECCIÓN DE ALERTAS (CUMPLEAÑOS) --- */}
      {cumpleañeros.length > 0 && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 shadow-lg text-white flex items-center justify-between animate-in slide-in-from-top duration-500">
            <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                    🎂 ¡Hay Cumpleaños Hoy!
                </h3>
                <p className="text-pink-100 mt-1">
                    No olvides felicitar a: <span className="font-bold text-white text-lg">{cumpleañeros.map(c => c.nombre).join(", ")}</span>
                </p>
            </div>
            <div className="text-4xl">🎉</div>
        </div>
      )}

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Lista</h3>
          <p className="text-4xl font-black text-slate-800 mt-2">{totalPersonas}</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm">
          <h3 className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Total Nuevos ✨</h3>
          <p className="text-4xl font-black text-blue-700 mt-2">{totalNuevos}</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl shadow-sm">
          <h3 className="text-purple-600 text-sm font-semibold uppercase tracking-wider">Por Orar 🙏</h3>
          <p className="text-4xl font-black text-purple-700 mt-2">{oracionesPendientes}</p>
        </div>
      </div>

      <TablaAsistentes asistentes={asistentes} />

    </div>
  );
}
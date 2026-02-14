import prisma from "@/utils/prisma";
import PeticionesPanel from "./PeticionesPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PeticionesPage() {
  const peticiones = await prisma.peticion.findMany({
    include: { persona: true },
    orderBy: { fecha: "desc" },
  });

  const total = peticiones.length;
  const pendientes = peticiones.filter((p) => p.estado === "PENDIENTE").length;
  const respondidas = peticiones.filter((p) => p.estado === "RESPONDIDA").length;

  const items = peticiones.map((p) => ({
    id: p.id,
    motivo: p.motivo,
    estado: p.estado as "PENDIENTE" | "ORANDO" | "RESPONDIDA",
    fecha: p.fecha.toISOString(),
    personaNombre: p.persona?.nombre || "Persona no identificada",
    personaTelefono: p.persona?.telefono || "",
  }));

  return (
    <div className="max-w-7xl mx-auto p-3 md:p-6 space-y-6">
      <header className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">🙏 Peticiones</h1>
        <p className="text-slate-500 mt-1">Gestiona las solicitudes de oración de toda la iglesia.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <article className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Total</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{total}</p>
        </article>
        <article className="bg-amber-50 rounded-xl border border-amber-100 p-4">
          <p className="text-xs font-semibold uppercase text-amber-700">Pendientes</p>
          <p className="text-3xl font-black text-amber-700 mt-1">{pendientes}</p>
        </article>
        <article className="bg-emerald-50 rounded-xl border border-emerald-100 p-4">
          <p className="text-xs font-semibold uppercase text-emerald-700">Respondidas</p>
          <p className="text-3xl font-black text-emerald-700 mt-1">{respondidas}</p>
        </article>
      </section>

      <PeticionesPanel items={items} />
    </div>
  );
}

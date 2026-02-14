import prisma from "@/utils/prisma";
import ActivityForm from "./ActivityForm";
import ActivitiesBoard from "./ActivitiesBoard";
import { isFuture, isToday } from "date-fns";

export const dynamic = "force-dynamic";

export default async function ActividadesPage() {
  const actividades = await prisma.activities.findMany({
    orderBy: { hour_start: "asc" },
  });

  const total = actividades.length;
  const hoy = actividades.filter((a) => isToday(new Date(a.hour_start))).length;
  const proximas = actividades.filter((a) => isFuture(new Date(a.hour_start))).length;
  const conImagen = actividades.filter((a) => !!a.img).length;

  const activitiesSerialized = actividades.map((a) => ({
    id: a.id,
    title: a.title,
    place: a.place,
    img: a.img,
    hour_start: a.hour_start.toISOString(),
    hour_end: a.hour_end.toISOString(),
  }));

  return (
    <div className="w-full max-w-7xl mx-auto p-3 md:p-6 space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Agenda y Eventos</h1>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Crea, edita y organiza todas las actividades desde un solo panel.
        </p>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <article className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Total</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{total}</p>
        </article>
        <article className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase text-blue-600">Hoy</p>
          <p className="text-3xl font-black text-blue-700 mt-1">{hoy}</p>
        </article>
        <article className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase text-emerald-700">Próximas</p>
          <p className="text-3xl font-black text-emerald-700 mt-1">{proximas}</p>
        </article>
        <article className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase text-indigo-600">Con Imagen</p>
          <p className="text-3xl font-black text-indigo-700 mt-1">{conImagen}</p>
        </article>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 order-2 xl:order-1">
          <ActivitiesBoard activities={activitiesSerialized} />
        </div>
        <div className="xl:col-span-1 order-1 xl:order-2">
          <ActivityForm />
        </div>
      </div>
    </div>
  );
}

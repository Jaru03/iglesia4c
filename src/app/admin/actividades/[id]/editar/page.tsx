import prisma from "@/utils/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActivityEditForm from "./ActivityEditForm";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function EditarActividadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actividadId = Number(id);

  if (!actividadId || Number.isNaN(actividadId)) notFound();

  const actividad = await prisma.activity.findUnique({ where: { id: actividadId } });
  if (!actividad) notFound();

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <Link href="/admin/actividades" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6">
        ← Volver
      </Link>

      <div className="bg-white p-6 rounded-2xl border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Editar Evento</h1>
        <p className="text-sm text-slate-500 mb-6">Actualiza los detalles del evento.</p>

        <ActivityEditForm
          activity={{
            id: actividad.id,
            title: actividad.title,
            place: actividad.place,
            description: actividad.description,
            img: actividad.img,
            fecha: format(new Date(actividad.hourStart), "yyyy-MM-dd"),
            horaInicio: format(new Date(actividad.hourStart), "HH:mm"),
            horaFin: format(new Date(actividad.hourEnd), "HH:mm"),
          }}
        />
      </div>
    </div>
  );
}

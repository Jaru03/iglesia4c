import prisma from "@/utils/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActivityEditForm from "./ActivityEditForm";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function EditarActividadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const actividadId = Number(id);

  if (!actividadId || Number.isNaN(actividadId)) {
    notFound();
  }

  const actividad = await prisma.activities.findUnique({
    where: { id: actividadId },
  });

  if (!actividad) {
    notFound();
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-3 md:p-6">
      <div className="mb-6">
        <Link
          href="/admin/actividades"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition"
        >
          ← Volver a actividades
        </Link>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Editar Evento</h1>
        <p className="text-sm text-slate-500 mb-6">Actualiza cualquier detalle del evento.</p>

        <ActivityEditForm
          activity={{
            id: actividad.id,
            title: actividad.title,
            place: actividad.place,
            description: actividad.description,
            img: actividad.img,
            fecha: format(new Date(actividad.hour_start), "yyyy-MM-dd"),
            horaInicio: format(new Date(actividad.hour_start), "HH:mm"),
            horaFin: format(new Date(actividad.hour_end), "HH:mm"),
          }}
        />
      </div>
    </div>
  );
}

"use client";

import { eliminarActividadPorId } from "@/actions/actividades-actions";
import toast from "react-hot-toast";

export default function ActivityDeleteButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const handleDelete = async () => {
    const confirmacion = window.confirm(
      `¿Eliminar la actividad "${title}"? Esta acción no se puede deshacer.`
    );
    if (!confirmacion) return;

    const res = await eliminarActividadPorId(id);
    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success(res?.success || "Actividad eliminada");
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
    >
      Eliminar 🗑️
    </button>
  );
}

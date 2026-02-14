"use client";

import { eliminarPersona } from "@/actions/admin-actions";
import toast from "react-hot-toast";

export default function BotonEliminarPersona({
  personaId,
  nombre,
}: {
  personaId: string;
  nombre: string;
}) {
  const handleEliminar = async () => {
    const confirmacion = window.confirm(
      `¿Seguro que quieres eliminar a ${nombre} de asistencias?`
    );

    if (!confirmacion) return;
    const res = await eliminarPersona(personaId);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success(res?.success || "Registro eliminado");
  };

  return (
    <button
      onClick={handleEliminar}
      type="button"
      className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition"
    >
      Eliminar
    </button>
  );
}

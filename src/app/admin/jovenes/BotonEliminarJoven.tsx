"use client";

import { eliminarJoven } from "@/actions/admin-actions";
import toast from "react-hot-toast";

export default function BotonEliminarJoven({
  jovenId,
  nombre,
}: {
  jovenId: number;
  nombre: string;
}) {
  const handleEliminar = async () => {
    const confirmacion = window.confirm(
      `¿Seguro que quieres eliminar a ${nombre}? Esta acción no se puede deshacer.`
    );

    if (!confirmacion) return;
    const res = await eliminarJoven(jovenId);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success(res?.success || "Joven eliminado");
  };

  return (
    <button
      onClick={handleEliminar}
      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition text-sm inline-block"
      type="button"
    >
      Eliminar
    </button>
  );
}

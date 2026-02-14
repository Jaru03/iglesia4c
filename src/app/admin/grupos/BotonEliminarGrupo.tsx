"use client";

import { eliminarGrupo } from "@/actions/crear-grupo";
import toast from "react-hot-toast";

export default function BotonEliminarGrupo({
  grupoId,
  nombre,
}: {
  grupoId: number;
  nombre: string;
}) {
  const handleEliminar = async (formData: FormData) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el grupo "${nombre}"?`
    );

    if (!confirmar) return;
    const res = await eliminarGrupo(formData);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    toast.success(res?.success || "Grupo eliminado");
  };

  return (
    <form action={handleEliminar} className="flex-1 min-w-[110px]">
      <input type="hidden" name="grupoId" value={grupoId} />
      <button
        type="submit"
        className="w-full bg-red-50 text-red-600 py-2 rounded-lg text-xs font-bold hover:bg-red-100 text-center flex items-center justify-center"
      >
        Eliminar
      </button>
    </form>
  );
}

"use client";

import { quitarMiembro } from "@/actions/asignar-miembro";

export default function BotonEliminar({ jovenId, grupoId }: { jovenId: number, grupoId: number }) {
  
  const handleEliminar = async (formData: FormData) => {
    // 🔥 Agregamos seguridad: Preguntar antes de borrar
    const confirmacion = window.confirm("¿Seguro que quieres sacar a esta persona del grupo?");
    
    if (confirmacion) {
      await quitarMiembro(formData);
    }
  };

  return (
    <form action={handleEliminar}>
      <input type="hidden" name="jovenId" value={jovenId} />
      <input type="hidden" name="grupoId" value={grupoId} />
      
      <button 
        type="submit" 
        className="text-slate-300 hover:text-red-500 p-2 transition font-bold text-lg" 
        title="Sacar del grupo"
      >
        &times;
      </button>
    </form>
  );
}
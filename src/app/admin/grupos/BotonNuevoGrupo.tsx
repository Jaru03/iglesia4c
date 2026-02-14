"use client";

import { useState } from "react";
import { crearGrupo } from "@/actions/crear-grupo";

export default function BotonNuevoGrupo() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const res = await crearGrupo(formData);
    setLoading(false);
    if (res.success) setShowModal(false);
    else alert(res.error);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
        + Nuevo Grupo
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">🏡 Crear Grupo</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 text-2xl leading-none">&times;</button>
            </div>
            
            <form action={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Grupo</label>
                <input name="nombre" required placeholder="Ej: Conexión Centro" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Líder(es) a cargo</label>
                <input name="lider" required placeholder="Ej: Juan y María" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Día</label>
                    <select name="dia" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                        <option>Lunes</option><option>Martes</option><option>Miércoles</option><option>Jueves</option><option>Viernes</option><option>Sábado</option><option>Domingo</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hora</label>
                    <input name="hora" type="time" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" />
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dirección</label>
                <input name="direccion" placeholder="Calle..." className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Grupo</label>
                <select name="tipo" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <option>Mixto</option>
                    <option>Jóvenes</option>
                    <option>Matrimonios</option>
                    <option>Mujeres</option>
                    <option>Hombres</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition mt-2">
                {loading ? "Creando..." : "Guardar Grupo"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
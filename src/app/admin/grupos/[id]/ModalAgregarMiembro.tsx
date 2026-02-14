"use client";

import { useState } from "react";
import { asignarMiembro } from "@/actions/asignar-miembro";

export default function ModalAgregarMiembro({ grupoId, candidatos }: { grupoId: number, candidatos: any[] }) {
  const [showModal, setShowModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState<string | null>(null); 
  
  // Filtramos la lista según lo que escribas
  const filtrados = candidatos.filter(c => 
    c.nombres.toLowerCase().includes(busqueda.toLowerCase()) || 
    c.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleAgregar = async (jovenId: number) => {
    setLoading(String(jovenId));
    
    const formData = new FormData();
    formData.append("jovenId", String(jovenId));
    formData.append("grupoId", String(grupoId));

    await asignarMiembro(formData);
    
    setLoading(null);
    // No cerramos el modal para que puedas seguir agregando más gente rápido
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 flex items-center gap-2"
      >
        <span>+</span> Añadir Miembro
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
            
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">🔍 Buscar Personas</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 text-2xl leading-none">&times;</button>
            </div>

            <div className="p-4 border-b border-slate-100">
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Escribe el nombre..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
            
            <div className="overflow-y-auto p-2 flex-1 space-y-1">
                {filtrados.length === 0 ? (
                    <div className="text-center p-8 text-slate-400">
                        No se encontraron personas disponibles con ese nombre.
                    </div>
                ) : (
                    filtrados.map(persona => (
                        <div key={persona.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition">
                            <div>
                                <p className="font-bold text-slate-700">{persona.nombres} {persona.apellidos}</p>
                                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                                    {persona.sede || "General"}
                                </span>
                            </div>
                            <button 
                                onClick={() => handleAgregar(persona.id)}
                                disabled={loading !== null}
                                className="bg-green-50 text-green-600 border border-green-200 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
                            >
                                {loading === String(persona.id) ? "..." : "Agregar +"}
                            </button>
                        </div>
                    ))
                )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
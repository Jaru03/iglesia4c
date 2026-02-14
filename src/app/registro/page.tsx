"use client";

import { registrarPersona } from "@/actions/registro-persona";
import { useRef, useState } from "react";

export default function RegistroUjieresPage() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "exito" | "error", texto: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMensaje(null);

    const result = await registrarPersona(formData);
    
    if (result.error) {
      setMensaje({ tipo: "error", texto: result.error });
    } else if (result.success) {
      setMensaje({ tipo: "exito", texto: result.success as string });
      formRef.current?.reset(); 

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800 mt-10">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">👋 Bienvenida</h1>
          <p className="text-gray-400">Registro rápido de asistentes y peticiones</p>
        </div>

        {/* MENSAJES DE ALERTA */}
        {mensaje && (
          <div className={`p-4 rounded-lg mb-6 text-center font-medium animate-in fade-in slide-in-from-top-4 ${
            mensaje.tipo === "exito" ? "bg-green-900/50 text-green-400 border border-green-800" : "bg-red-900/50 text-red-400 border border-red-800"
          }`}>
            {mensaje.texto}
          </div>
        )}

         {/* 🔥 CORREGIDO: action={handleSubmit} */}
         <form ref={formRef} action={handleSubmit} className="space-y-6">
          
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-gray-300 font-medium mb-2">Nombre Completo *</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              placeholder="Ej: Juan Pérez"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-gray-300 font-medium mb-2">Teléfono (Opcional)</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="+34 600 000 000"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/*  FECHA DE NACIMIENTO (NUEVO) */}
          <div>
            <label htmlFor="fechaNacimiento" className="block text-gray-300 font-medium mb-2">Fecha de Nacimiento 🎂</label>
            <input
              id="fechaNacimiento"
              name="fechaNacimiento"
              type="date"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition [color-scheme:dark]"
            />
          </div>

          {/* Checkboxes (SOLO UNA VEZ) */}
          <div className="space-y-3">
             <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-xl border border-gray-700 cursor-pointer hover:bg-gray-750 transition">
                <input
                  id="esNuevo"
                  name="esNuevo"
                  type="checkbox"
                  defaultChecked
                  className="w-6 h-6 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                />
                <label htmlFor="esNuevo" className="text-white font-medium text-lg cursor-pointer select-none">
                  ✨ Es su primera vez en la iglesia
                </label>
              </div>

              <div className="flex items-center space-x-3 bg-gray-800 p-4 rounded-xl border border-gray-700 cursor-pointer hover:bg-gray-750 transition">
                <input
                  id="esJoven"
                  name="esJoven"
                  type="checkbox"
                  className="w-6 h-6 rounded border-gray-600 text-orange-500 focus:ring-orange-500 bg-gray-700"
                />
                <label htmlFor="esJoven" className="text-white font-medium text-lg cursor-pointer select-none">
                  🔥 Es Joven (Edad de grupo)
                </label>
              </div>
          </div>

          {/* Petición */}
          <div>
            <label htmlFor="peticion" className="block text-gray-300 font-medium mb-2">🙏 Petición de Oración (Opcional)</label>
            <textarea
              id="peticion"
              name="peticion"
              rows={3}
              placeholder="¿Hay algo por lo que podamos orar hoy?"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Confirmar Asistencia"}
          </button>
        </form>
      </div>
    </div>
  );
}
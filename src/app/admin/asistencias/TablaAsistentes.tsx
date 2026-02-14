"use client";

import { useState, useRef } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { marcarComoOrado } from "@/actions/toggle-oracion"; 
import { registrarPersona } from "@/actions/registro-persona";
import { convertirAJoven } from "@/actions/convertir-joven"; 
import BotonEliminarPersona from "./BotonEliminarPersona";
import ExportAsistenciasCsv from "./ExportAsistenciasCsv";

export default function TablaAsistentes({ asistentes }: { asistentes: any[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [soloNuevos, setSoloNuevos] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  
  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [jovenAConvertir, setJovenAConvertir] = useState<any>(null);
  const [guardando, setGuardando] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  const datosFiltrados = asistentes.filter((p) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      p.nombre.toLowerCase().includes(texto) ||
      (p.telefono && p.telefono.includes(texto));
    // Filtro mejorado: Muestra Nuevos O los que están en proceso de consolidación
    const coincideNuevo = soloNuevos ? (p.estado === "NUEVO" || p.esNuevo) : true;
    return coincideTexto && coincideNuevo;
  });

  const handleToggleOracion = async (peticionId: string) => {
    setLoadingId(peticionId);
    await marcarComoOrado(peticionId);
    setLoadingId(null);
  };

  const handleGuardarNuevo = async (formData: FormData) => {
    setGuardando(true);
    const res = await registrarPersona(formData);
    setGuardando(false);
    if (res.success) {
      setShowModalRegistro(false);
      formRef.current?.reset();
    } else {
      alert("Error: " + res.error);
    }
  };

  const handleConvertir = async (formData: FormData) => {
    setGuardando(true);
    const res = await convertirAJoven(formData);
    setGuardando(false);
    if (res.success) {
      setJovenAConvertir(null); 
      // No necesitamos alerta, el revalidate actualizará la tabla y el botón desaparecerá
    } else {
      alert("❌ " + res.error);
    }
  };

  // Función auxiliar para el badge de estado
  const renderBadgeEstado = (persona: any) => {
    if (persona.estado === "EN_GRUPO" || persona.jovenId) {
        return <span className="bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold">🔥 En Grupo</span>;
    }
    if (persona.estado === "REGULAR") {
        return <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold">👋 Regular</span>;
    }
    // Por defecto es NUEVO
    return <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold shadow-sm">✨ Nuevo</span>;
  };

  return (
    <div className="space-y-6 relative">
      
      {/* BARRA DE HERRAMIENTAS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm items-center">
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 transition"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <ExportAsistenciasCsv data={datosFiltrados} />
          <button
            onClick={() => setSoloNuevos(!soloNuevos)}
            className={`px-4 py-3 rounded-xl font-bold transition flex-1 md:flex-none border text-sm whitespace-nowrap ${
              soloNuevos
                ? "bg-blue-100 text-blue-700 border-blue-200"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {soloNuevos ? "✨ Ver Solo Nuevos" : "Ver Todos"}
          </button>

          <button
            onClick={() => setShowModalRegistro(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <span>+</span> Registrar
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nombre y Contacto</th>
                <th className="px-6 py-4 text-center">Estado / Visitas</th>
                <th className="px-6 py-4">Fecha Visita</th>
                <th className="px-6 py-4">Petición / Estado</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {datosFiltrados.map((persona) => (
                <tr key={persona.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      {persona.nombre}
                      {persona.esJoven && (
                        <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border border-orange-200">
                          Joven
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                        {persona.telefono && (
                            <span className="text-xs text-slate-500">📞 {persona.telefono}</span>
                        )}
                        {persona.fechaNacimiento && (
                            <span className="text-xs text-pink-500 font-medium">
                                🎂 Cumple: {format(new Date(persona.fechaNacimiento), "d 'de' MMMM", { locale: es })}
                            </span>
                        )}
                        
                        {/* 🔥 BOTÓN PARA ASIGNAR GRUPO (Solo si es joven Y NO TIENE GRUPO AÚN) */}
                        {persona.esJoven && !persona.jovenId && (
                          <button 
                            onClick={() => setJovenAConvertir(persona)}
                            className="mt-2 w-fit text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-1 rounded-md font-bold hover:bg-indigo-100 flex items-center gap-1 transition animate-in fade-in"
                          >
                            👤+ Asignar Grupo
                          </button>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                        {renderBadgeEstado(persona)}
                        <span className="text-[10px] text-slate-400 font-medium">
                            Visita #{persona.conteoVisitas || 1}
                        </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {format(new Date(persona.fechaVisita), "dd MMM", { locale: es })}
                  </td>
                  <td className="px-6 py-4">
                    {persona.peticiones.length > 0 ? (
                      persona.peticiones.map((pet: any) => (
                        <div key={pet.id} className="flex items-start gap-3 mb-1">
                          <button
                            onClick={() => handleToggleOracion(pet.id)}
                            disabled={loadingId === pet.id}
                            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition ${
                              pet.estado === "RESPONDIDA"
                                ? "bg-green-500 border-green-500 text-white"
                                : "bg-white border-slate-300 hover:border-blue-400 text-transparent"
                            }`}
                          >
                            {loadingId === pet.id ? "..." : "✓"}
                          </button>
                          <div className={pet.estado === "RESPONDIDA" ? "opacity-50 line-through" : ""}>
                            <p className="text-sm italic text-purple-800">"{pet.motivo}"</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-400 text-xs italic">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <BotonEliminarPersona personaId={persona.id} nombre={persona.nombre} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {datosFiltrados.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              No se encontraron resultados.
            </div>
          )}
        </div>
      </div>

      {/* MODAL REGISTRO VISITA (Código omitido por brevedad, es el mismo de antes) */}
      {showModalRegistro && (
         /* ... Tu modal de registro normal aquí ... */
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">📝 Registrar Persona</h3>
              <button onClick={() => setShowModalRegistro(false)} className="text-slate-400 hover:text-red-500 transition text-2xl leading-none">&times;</button>
            </div>
            <form ref={formRef} action={handleGuardarNuevo} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo *</label>
                <input name="nombre" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Teléfono</label>
                <input name="telefono" type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Fecha de Nacimiento 🎂</label>
                <input name="fechaNacimiento" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-600" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 flex-1 cursor-pointer hover:bg-slate-100 transition">
                  <input name="esNuevo" type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-0" />
                  <span className="text-sm font-medium text-slate-700">Es Nuevo ✨</span>
                </label>
                <label className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 flex-1 cursor-pointer hover:bg-slate-100 transition">
                  <input name="esJoven" type="checkbox" className="w-5 h-5 text-orange-500 rounded focus:ring-0" />
                  <span className="text-sm font-medium text-slate-700">Es Joven 🔥</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Petición de Oración</label>
                <textarea name="peticion" rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <button type="submit" disabled={guardando} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition mt-2 disabled:opacity-50">
                {guardando ? "Guardando..." : "Guardar Registro"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- 🔥 MODAL: ASIGNAR A GRUPO (CON DNI) --- */}
      {jovenAConvertir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-indigo-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold flex items-center gap-2">🚀 Unir a Grupo</h3>
              <button onClick={() => setJovenAConvertir(null)} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <form action={handleConvertir} className="p-6 space-y-4">
              <input type="hidden" name="personaId" value={jovenAConvertir.id} />
              
              <p className="text-sm text-slate-500 mb-2">
                Registrando a <b className="text-slate-800">{jovenAConvertir.nombre}</b>.
                <br/>Solicita los siguientes datos:
              </p>

              {/* 🔥 NUEVO CAMPO OBLIGATORIO */}
              <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Documento / DNI / Cédula *</label>
                  <input name="documento" required placeholder="Ej: Y1234567" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Nombres</label>
                  <input name="nombres" defaultValue={jovenAConvertir.nombre.split(" ")[0]} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Apellidos</label>
                  <input name="apellidos" defaultValue={jovenAConvertir.nombre.split(" ").slice(1).join(" ")} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                </div>
              </div>

              <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Teléfono</label>
                  <input name="telefono" defaultValue={jovenAConvertir.telefono || ""} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
              </div>

              <input type="hidden" name="fechaNacimiento" value={jovenAConvertir.fechaNacimiento ? new Date(jovenAConvertir.fechaNacimiento).toISOString() : ""} />

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Selecciona Sede / Grupo</label>
                <select name="sede" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="P.Castilla">P.Castilla</option>
                  <option value="Pinto">Pinto</option>
                  <option value="Parla">Parla</option>
                  <option value="General">General</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={guardando}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
              >
                {guardando ? "Procesando..." : "Confirmar y Unir ✨"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

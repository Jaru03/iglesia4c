"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Link from "next/link";
import { crearJoven } from "@/actions/crear-joven"; 

export default function NuevoJovenPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    documento: "", 
    sede: "Plaza Castilla", 
    fechaNacimiento: "",
    telefono: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // 1. Enviamos los datos directamente a la Server Action
    const dataToSend = new FormData(e.currentTarget);
    const result = await crearJoven(dataToSend);

    // 2. Si la acción devuelve un error (como DNI duplicado), lo mostramos
    if (result?.error) {
      alert(`❌ ${result.error}`);
      setLoading(false);
    } 
    
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/jovenes" className="bg-white p-2 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition">
          ⬅️
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Registrar Nuevo Joven</h1>
          <p className="text-slate-500">Añade un nuevo joven a la base de datos.</p>
        </div>
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Nombres *</label>
            <input required name="nombres" type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" onChange={handleChange} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Apellidos *</label>
            <input required name="apellidos" type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" onChange={handleChange} />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">DNI / NIE / Pasaporte *</label>
            <input required name="documento" type="text" className="w-full p-3 bg-slate-50 border-2 border-blue-100 rounded-xl font-mono uppercase" onChange={handleChange} placeholder="Ej: Y1234567Z"/>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Sede *</label>
            <select name="sede" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer" onChange={handleChange}>
              <option value="P.Castilla">P.Castilla</option>
              <option value="Pinto">Pinto</option>
              <option value="Parla">Parla</option>
            </select>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Fecha de Nacimiento</label>
            <input name="fechaNacimiento" type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500" onChange={handleChange} />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Teléfono</label>
            <input name="telefono" type="tel" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" onChange={handleChange} placeholder="+34..." />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'}`}
        >
          {loading ? 'Procesando registro...' : 'Guardar Ficha ✨'}
        </button>
      </form>
    </div>
  );
}
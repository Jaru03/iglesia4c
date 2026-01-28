"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NuevoJovenPage() {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🚧 AQUÍ CONECTAREMOS CON LA BASE DE DATOS LUEGO
    console.log("Datos a guardar:", formData);

    // Simulamos que guarda y nos devuelve a la lista
    setTimeout(() => {
      alert("¡Joven registrado con éxito! (Simulado)");
      router.push("/admin/jovenes"); // Nos devuelve a la tabla
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* CABECERA CON BOTÓN ATRÁS */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/jovenes" className="bg-white p-2 rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition">
          ⬅️
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Registrar Nuevo Joven</h1>
          <p className="text-slate-500">Añade un nuevo joven.</p>
        </div>
      </div>

      {/* EL FORMULARIO */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* NOMBRES */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Nombres *</label>
            <input 
              required
              name="nombres"
              type="text" 
              placeholder="Ej: Juan David"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* APELLIDOS */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Apellidos *</label>
            <input 
              required
              name="apellidos"
              type="text" 
              placeholder="Ej: Pérez García"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* DOCUMENTO (CLAVE PARA EL CHECK-IN) */}
          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              DNI / NIE / Pasaporte *
              <span className="ml-2 text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Para el Check-in rápido</span>
            </label>
            <input 
              required
              name="documento"
              type="text" 
              placeholder="Ej: Y1234567Z"
              className="w-full p-3 bg-slate-50 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono text-slate-700"
              onChange={handleChange}
            />
          </div>

          {/* SEDE */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Sede *</label>
            <select 
              name="sede"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              onChange={handleChange}
            >
              <option value="Norte">Sede Plaza Castilla</option>
              <option value="Sur">Sede Parla</option>
              <option value="Centro">Sede Pinto</option>
            </select>
          </div>

          {/* FECHA NACIMIENTO */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Fecha de Nacimiento</label>
            <input 
              name="fechaNacimiento"
              type="date" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-500"
              onChange={handleChange}
            />
          </div>

          {/* TELÉFONO */}
          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Teléfono / WhatsApp</label>
            <input 
              name="telefono"
              type="tel" 
              placeholder="+34 600 000 000"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

        </div>

        {/* BOTÓN GUARDAR */}
        <button 
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${
            loading ? 'bg-slate-300' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
          }`}
        >
          {loading ? 'Guardando...' : 'Guardar Ficha '}
        </button>

      </form>
    </div>
  );
}
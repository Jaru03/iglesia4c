"use client";

import { useState } from 'react';
import Link from 'next/link'; 

export default function ListadoJovenesCliente({ jovenesIniciales }: { jovenesIniciales: any[] }) { 
  const [busqueda, setBusqueda] = useState("");


  const jovenesFiltrados = jovenesIniciales.filter(joven => 
    joven.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    joven.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
    joven.documento.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-2">
      {/* CABECERA */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Listado de Jóvenes</h1>
          <p className="text-slate-500">Gestión de miembros reales en tiempo real.</p>
        </div>
        
        <Link href="/admin/jovenes/nuevo">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/30">
            <span>+</span> Nuevo Joven
            </button>
        </Link>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex gap-4">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Buscar por nombre o DNI..." 
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none text-slate-700"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* TABLA DE DATOS REALES */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="p-4 py-5">Nombre Completo</th>
              <th className="p-4 py-5">Sede</th>
              <th className="p-4 py-5">Teléfono</th>
              <th className="p-4 py-5 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jovenesFiltrados.map((joven) => (
              <tr key={joven.id} className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-800">{joven.nombres} {joven.apellidos}</div>
                  <div className="text-xs text-slate-400">DNI: {joven.documento}</div>
                </td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                    {joven.sede}
                  </span>
                </td>
                <td className="p-4 text-slate-600 text-sm">
                  {joven.telefono || "Sin teléfono"}
                </td>
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${joven.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <span className={`w-2 h-2 rounded-full ${joven.activo ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {joven.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SI NO HAY RESULTADOS */}
        {jovenesFiltrados.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No se encontraron jóvenes en la base de datos.
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from 'react';
import Link from 'next/link'; 

// DATOS FALSOS (MOCK) para probar mientras no hay Base de Datos
const MOCK_JOVENES = [
  { id: 1, nombres: "Arthur", apellidos: "Dev", sede: "Norte", ultimaVisita: "2024-01-25", estado: "activo" },
  { id: 2, nombres: "María", apellidos: "Gómez", sede: "Centro", ultimaVisita: "2023-12-10", estado: "riesgo" },
  { id: 3, nombres: "Carlos", apellidos: "Pérez", sede: "Sur", ultimaVisita: "2024-01-20", estado: "activo" },
  { id: 4, nombres: "Lucía", apellidos: "Méndez", sede: "Norte", ultimaVisita: "2023-11-30", estado: "riesgo" },
  { id: 5, nombres: "David", apellidos: "Torres", sede: "Centro", ultimaVisita: "2024-01-27", estado: "activo" },
];

export default function JovenesPage() { 
  const [busqueda, setBusqueda] = useState("");

  // Filtramos los jóvenes según lo que escribas
  const jovenesFiltrados = MOCK_JOVENES.filter(joven => 
    joven.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    joven.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      {/* CABECERA */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Listado de Jóvenes</h1>
          <p className="text-slate-500">Gestión de miembros y seguimiento.</p>
        </div>
        
        {/* 👈 2. AQUÍ ESTÁ EL CAMBIO: El botón ahora es un enlace */}
        <Link href="/admin/jovenes/nuevo">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/30">
            <span>+</span> Nuevo Joven
            </button>
        </Link>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-3.5 text-slate-400"></span>
          <input 
            type="text" 
            placeholder="Buscar por nombre..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none text-slate-700"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <select className="bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer">
          <option value="todas">Todas las Sedes</option>
          <option value="norte">Sede Norte</option>
          <option value="sur">Sede Sur</option>
        </select>
      </div>

      {/* TABLA DE DATOS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="p-4 py-5">Nombre Completo</th>
              <th className="p-4 py-5">Sede</th>
              <th className="p-4 py-5">Última Visita</th>
              <th className="p-4 py-5 text-center">Estado</th>
              <th className="p-4 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jovenesFiltrados.map((joven) => (
              <tr key={joven.id} className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-800">{joven.nombres} {joven.apellidos}</div>
                  <div className="text-xs text-slate-400">ID: #{joven.id}</div>
                </td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                    {joven.sede}
                  </span>
                </td>
                <td className="p-4 text-slate-600 text-sm">
                  {joven.ultimaVisita}
                </td>
                <td className="p-4 text-center">
                  {joven.estado === 'activo' ? (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span> Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span> En Riesgo
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 p-2 transition">
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SI NO HAY RESULTADOS */}
        {jovenesFiltrados.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No se encontraron jóvenes con ese nombre. 
          </div>
        )}
      </div>
    </div>
  );
}
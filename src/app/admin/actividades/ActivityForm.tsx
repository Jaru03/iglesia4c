"use client";

import { crearActividad } from "@/actions/actividades-actions";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";

export default function ActivityForm() {
  const [imgUrl, setImgUrl] = useState("");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
      <h2 className="font-bold text-lg mb-4 text-slate-700">🗓️ Crear Evento</h2>
      
      <form action={async (formData) => {
          await crearActividad(formData);
          setImgUrl("");
      }} className="space-y-4">
        
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Nombre del Evento</label>
          <input type="text" name="title" required className="w-full p-2 border rounded-lg mt-1" />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Lugar</label>
          <input type="text" name="place" required className="w-full p-2 border rounded-lg mt-1" />
        </div>

        <div>
           <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Imagen del Evento</label>
           <input type="hidden" name="img" value={imgUrl} />
           <ImageUpload onSuccess={(url) => setImgUrl(url)} />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Fecha</label>
          <input type="date" name="fecha" required className="w-full p-2 border rounded-lg mt-1" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Inicio</label>
            <input type="time" name="horaInicio" required className="w-full p-2 border rounded-lg mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Fin</label>
            <input type="time" name="horaFin" required className="w-full p-2 border rounded-lg mt-1" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Descripción</label>
          <textarea name="description" rows={2} className="w-full p-2 border rounded-lg mt-1" />
        </div>

        <button type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Guardar Actividad ✨
        </button>
      </form>
    </div>
  );
}
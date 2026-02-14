"use client";

import { actualizarActividad } from "@/actions/actividades-actions";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";
import toast from "react-hot-toast";

type ActivityEditData = {
  id: number;
  title: string;
  place: string;
  description: string | null;
  img: string | null;
  fecha: string;
  horaInicio: string;
  horaFin: string;
};

export default function ActivityEditForm({ activity }: { activity: ActivityEditData }) {
  const [imgUrl, setImgUrl] = useState(activity.img || "");

  return (
    <form
      action={async (formData) => {
        const res = await actualizarActividad(activity.id, formData);
        if (res?.error) {
          toast.error(res.error);
          return;
        }
        toast.success(res?.success || "Actividad actualizada");
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase">Nombre del Evento</label>
        <input
          type="text"
          name="title"
          defaultValue={activity.title}
          required
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase">Lugar</label>
        <input
          type="text"
          name="place"
          defaultValue={activity.place}
          required
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Imagen del Evento</label>
        <input type="hidden" name="img" value={imgUrl} />
        <ImageUpload onSuccess={(url) => setImgUrl(url)} />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase">Fecha</label>
        <input
          type="date"
          name="fecha"
          defaultValue={activity.fecha}
          required
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Inicio</label>
          <input
            type="time"
            name="horaInicio"
            defaultValue={activity.horaInicio}
            required
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Fin</label>
          <input
            type="time"
            name="horaFin"
            defaultValue={activity.horaFin}
            required
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase">Descripción</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={activity.description || ""}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
      >
        Guardar Cambios
      </button>
    </form>
  );
}

"use client";
import { useState, useEffect } from "react";

export default function AdminActivities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Estado del formulario
  const [form, setForm] = useState({
    title: "",
    description: "",
    place: "",
    hour_start: "",
    hour_end: "",
    urgent: false,
    img: ""
  });

  // Cargar actividades al entrar
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const res = await fetch("/api/activities");
    const data = await res.json();
    setActivities(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await fetch("/api/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // Limpiar y recargar
    setForm({ title: "", description: "", place: "", hour_start: "", hour_end: "", urgent: false, img: "" });
    fetchActivities();
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if(!confirm("¿Seguro que quieres borrar este evento?")) return;
    await fetch(`/api/activities?id=${id}`, { method: "DELETE" });
    fetchActivities();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">📅 Calendario de Actividades</h1>

      {/* FORMULARIO DE CREACIÓN */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-slate-100">
        <h2 className="text-xl font-semibold mb-4">Nueva Actividad</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Título del Evento</label>
            <input required type="text" className="w-full p-2 border rounded mt-1" 
              value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Ej: Campamento de Verano" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Descripción</label>
            <textarea className="w-full p-2 border rounded mt-1" rows={3}
              value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Detalles del evento..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Lugar</label>
            <input required type="text" className="w-full p-2 border rounded mt-1" 
              value={form.place} onChange={(e) => setForm({...form, place: e.target.value})} placeholder="Ej: Auditorio Principal" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Imagen (URL Opcional)</label>
            <input type="text" className="w-full p-2 border rounded mt-1" 
              value={form.img} onChange={(e) => setForm({...form, img: e.target.value})} placeholder="https://..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Inicio</label>
            <input required type="datetime-local" className="w-full p-2 border rounded mt-1" 
              value={form.hour_start} onChange={(e) => setForm({...form, hour_start: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Fin</label>
            <input required type="datetime-local" className="w-full p-2 border rounded mt-1" 
              value={form.hour_end} onChange={(e) => setForm({...form, hour_end: e.target.value})} />
          </div>

          <div className="flex items-center gap-2 mt-4">
             <input type="checkbox" id="urgent" checked={form.urgent} 
               onChange={(e) => setForm({...form, urgent: e.target.checked})} className="w-5 h-5 text-blue-600" />
             <label htmlFor="urgent" className="text-sm font-medium text-red-500 font-bold">¿Es Urgente / Destacado?</label>
          </div>

          <div className="md:col-span-2">
            <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white p-3 rounded hover:bg-slate-800 transition">
              {loading ? "Guardando..." : "➕ Crear Evento"}
            </button>
          </div>
        </form>
      </div>

      {/* LISTA DE EVENTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => (
          <div key={act.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className="h-32 bg-slate-200 relative">
               {/* Si quieres mostrar la imagen real: <img src={act.img} className="w-full h-full object-cover" /> */}
               <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded font-bold shadow">
                 {new Date(act.hour_start).toLocaleDateString()}
               </div>
               {act.urgent && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">URGENTE</span>}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{act.title}</h3>
              <p className="text-slate-500 text-sm mb-2">📍 {act.place}</p>
              <p className="text-slate-600 text-sm line-clamp-2">{act.description}</p>
              <div className="mt-4 flex justify-end">
                <button onClick={() => handleDelete(act.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
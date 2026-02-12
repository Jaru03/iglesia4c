import prisma from "@/utils/prisma";
import { crearPredica, eliminarPredica } from "@/actions/predicas-actions";

export const dynamic = "force-dynamic";

export default async function PredicasPage() {
  // 1. Obtenemos las prédicas ordenadas (las nuevas primero)
  const predicas = await prisma.preachs.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Gestión de Prédicas</h1>
        <p className="text-slate-500">Sube los videos de YouTube de la iglesia.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLUMNA IZQUIERDA: FORMULARIO DE SUBIDA --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              📹 Nueva Prédica
            </h2>
            
            <form action={crearPredica} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Ej: Domingo de Resurrección"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Link de YouTube</label>
                <input 
                  type="url" 
                  name="urlVideo" 
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descripción (Opcional)</label>
                <textarea 
                  name="description" 
                  rows={3}
                  placeholder="Pequeño resumen..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Subir Video 🚀
              </button>
            </form>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: LISTA DE VIDEOS --- */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-slate-700 text-lg">Biblioteca de Videos ({predicas.length})</h2>
          
          {predicas.length === 0 ? (
            <div className="text-center p-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-400">No has subido ninguna prédica todavía.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predicas.map((video) => (
                <div key={video.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group">
                  {/* Miniatura del video */}
                  <div className="relative aspect-video bg-slate-900">
                    {video.img ? (
                      <img 
                        src={video.img} 
                        alt={video.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-white">Sin imagen</div>
                    )}
                    {/* Botón Play decorativo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition">
                         ▶️
                       </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 line-clamp-1">{video.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 mb-4">
                      {video.description || "Sin descripción"}
                    </p>
                    
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                        <a 
                          href={video.urlVideo || "#"} 
                          target="_blank" 
                          className="text-xs text-blue-600 font-medium hover:underline"
                        >
                          Ver en YouTube ↗
                        </a>

                        {/* Botón de borrar (Server Action en línea) */}
                        <form action={eliminarPredica.bind(null, video.id)}>
                          <button className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition">
                            Eliminar 🗑️
                          </button>
                        </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
import prisma from "@/utils/prisma";
import { Play } from "lucide-react"; 

export const dynamic = "force-dynamic";

export default async function PredicasPublicPage() {
  const videos = await prisma.preachs.findMany({
    orderBy: { id: "desc" },
  });

  const ultimoVideo = videos[0];
  const videosAnteriores = videos.slice(1);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      
      {/* HERO (Video Destacado) */}
      <div className="bg-slate-900 text-white pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-12 tracking-tight">
            Nuestros Mensajes
          </h1>

          {videos.length === 0 ? (
            <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700">
              <p className="text-slate-400 text-xl">No hay prédicas disponibles todavía.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700">
              {/* CORRECCIÓN 1: Añadido || "#" */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black group cursor-pointer shadow-lg">
                <a href={ultimoVideo.urlVideo || "#"} target="_blank" rel="noopener noreferrer">
                    {ultimoVideo.img && (
                      <img 
                          src={ultimoVideo.img} 
                          alt={ultimoVideo.title} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full group-hover:scale-110 transition border border-white/30">
                            <Play fill="white" className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </a>
              </div>

              <div className="space-y-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-blue-900/50">
                    🔥 Más Reciente
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                  {ultimoVideo.title}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed line-clamp-3">
                  {ultimoVideo.description || "Disfruta de este mensaje."}
                </p>
                
                {/* CORRECCIÓN 2: Añadido || "#" */}
                <a 
                  href={ultimoVideo.urlVideo || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-slate-200 transition mt-4"
                >
                  <Play size={18} fill="currentColor" /> Ver Predicación
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LISTA ANTERIORES */}
      {videosAnteriores.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            Mensajes Anteriores
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videosAnteriores.map((video) => (
              <div key={video.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
                
                {/* CORRECCIÓN 3: Añadido || "#" */}
                <a href={video.urlVideo || "#"} target="_blank" rel="noopener noreferrer" className="block relative aspect-video bg-slate-200 overflow-hidden">
                  {video.img && (
                    <img 
                      src={video.img} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/30 p-3 rounded-full backdrop-blur-sm">
                        <Play fill="white" className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </a>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-blue-700 transition">
                      {video.title}
                    </h4>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {video.description || "Sin descripción."}
                    </p>
                  </div>
                  
                  {/* CORRECCIÓN 4: Añadido || "#" */}
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Video</span>
                    <a href={video.urlVideo || "#"} target="_blank" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        Ver ahora ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
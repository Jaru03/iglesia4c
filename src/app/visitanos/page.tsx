"use client";
import { churches } from "../../mocks/churchues";
import { InfoChurch } from "@/types/InfoChurch";
import dynamic from "next/dynamic";

// Importa ChurchLocation deshabilitando SSR
const ChurchLocation = dynamic(
  () => import("@/app/visitanos/components/ChurchLocation"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <section>
      <div className="bg-[url(../../public/visitanos-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <h2 className="text-white text-3xl md:text-3xl-desktop z-[5] text-center">
          Visitanos
        </h2>
      </div>
      <div className="p-6 overflow-hidden">
        <h2 className="text-primary-2 text-xl md:text-xl-desktop text-center col-span-full">
          Ubicaciones
        </h2>
        <div className="flex flex-col gap-y-10">
          {churches?.map((church) => (
            <ChurchLocation info={church as InfoChurch} key={church.index} />
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary-3 to-primary-2">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Te Esperamos con los Brazos Abiertos
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Nuestra iglesia es un hogar espiritual para todos. Ya seas nuevo en la fe
              o busques una comunidad donde crecer, aquí encontrarás amor, aceptación
              y oportunidades para servir y ser servido.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/nosotros"
                className="inline-flex items-center gap-2 bg-white text-primary-3 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Conocenos más
              </a>
            <a
              href="/oracion"
              className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Envía tu Petición
            </a>
          </div>

          <div className="mt-8 text-white/80">
            <p className="text-sm">
              "Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios"
            </p>
            <p className="text-xs mt-1 opacity-75">- 1 Juan 3:1</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default page;

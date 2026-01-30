import PrayForm from "@/app/oracion/components/PrayForm";
import ToastProvider from "@/app/oracion/components/ToastProvider";

const page = () => {
  return (
    <section>
      <div className="bg-[url(../../public/oracion-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
        <h2 className="text-white text-3xl md:text-3xl-desktop z-5 text-center">
          Oración
        </h2>
      </div>
      <div className="p-6 flex flex-col justify-center items-center ">

        <ToastProvider/>
        <PrayForm />
      </div>

      {/* Call to Action Section */}
      <section className="py-16 bg-linear-to-r from-primary-3 to-primary-2">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tu Oración es Importante
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Cada petición de oración es atendida con amor y dedicación por nuestra
              comunidad. Únete a nosotros en esta hermosa experiencia de intercesión
              y apoyo espiritual mutuo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/actividades"
              className="inline-flex items-center gap-2 bg-white text-primary-3 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Participar en Actividades
            </a>
            <a
              href="/donaciones"
              className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Apoyar con Donativo
            </a>
          </div>

          <div className="mt-8 text-white/80">
            <p className="text-sm">
              "Orad sin cesar. Dad gracias en todo, porque esta es la voluntad de Dios"
            </p>
            <p className="text-xs mt-1 opacity-75">- 1 Tesalonicenses 5:17-18 pago</p>
          </div>
        </div>
      </section>
    </section>
    
  );
};

export default page;

import DonationsPage from "@/app/donaciones/components/DonationsPage"

const page = () => {
  return (
    <>
      <DonationsPage/>

      {/* Call to Action Section */}
      <section className="py-16 bg-linear-to-r from-primary-3 to-primary-2">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tu Generosidad Hace la Diferencia
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Cada donativo contribuye a expandir el reino de Dios, apoyar ministerios,
              y ayudar a quienes más lo necesitan. Tu participación es invaluable para
              nuestra misión.
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
              Ver Nuestras Actividades
            </a>
              <a
                href="/nosotros"
                className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Conocenos más
              </a>
          </div>

          <div className="mt-8 text-white/80">
            <p className="text-sm">
              "Dad, y se os dará; medida buena, apretada, remecida y rebosando darán en vuestro regazo"
            </p>
            <p className="text-xs mt-1 opacity-75">- Lucas 6:38</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default page

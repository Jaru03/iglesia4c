import Activity from "@/components/Activity"
import CalendarActivities from "@/pages/Agenda/CalendarApp"
import dayjs from "dayjs"
import { events } from "@/mocks/activities"

const page = () => {
  
  return (
    <>
      <section>
        <div className="bg-[url(../../public/actividades-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl md:text-3xl-desktop z-[5] text-center">
            Actividades
          </h2>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <CalendarActivities/>
        </div>

        <div className="bg-secondary p-6 items-center gap-6">
          <h3 className="text-primary-3 text-2xl md:text-2xl-desktop pt-6 pb-10 text-center">Más actividades</h3>

          <div className="flex flex-col gap-y-8 max-w-7xl justify-center mx-auto">
            {
              events.map((activity) => (
                <Activity key={activity.index} button={false} description={activity.description}
                  hour={dayjs((activity.start).toString()).format('HH:mm')} image={activity.img} place={activity.place} title={activity.title} className="pb-8"/>
              ))
            }
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
                ¡Únete a Nuestra Comunidad!
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Participa en nuestras actividades y forma parte de una comunidad que crece
                en fe, amor y servicio. Cada actividad es una oportunidad para conectarte
                con Dios y con los demás miembros de nuestra iglesia.
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
                Enviar Petición de Oración
              </a>
            </div>

            <div className="mt-8 text-white/80">
              <p className="text-sm">
                "Donde dos o tres se congregan en mi nombre, allí estoy yo en medio de ellos"
              </p>
              <p className="text-xs mt-1 opacity-75">- Mateo 18:20</p>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default page

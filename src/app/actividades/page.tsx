import Activity from "@/components/Activity"
import CalendarActivities from "@/pages/Agenda/CalendarApp"
import dayjs from "dayjs"

interface EventInterface {
  title: string,
  start: Date,
  end: Date,
  index: number
  img: string,
  description: string,
  place: string
}

const page = () => {
  
  const activities:EventInterface[] = [
      {
        title: "Aniversario de 4C",
        start: dayjs('2025-02-08T18:00:00').toDate(),
        end: dayjs('2025-02-08T20:00:00').toDate(),
        description: "¡11 años de fidelidad de Dios! Acompáñanos este 8 de febrero con el Pastor Juan Carlos Escobar, presidente de las ADE. ¡Te esperamos!",
        index: 1,
        img: '/undecimoAniversario.jpeg',
        place: "Auditorio 4C Parla, Calle Londres 58, Parla",
      },
      {
        title: "Retiro de Semana Santa",
        start: dayjs('2025-04-28T10:00:00').toDate(),
        end: dayjs('2025-04-28T12:00:00').toDate(),
        index: 2,
        img: '/retiroFamiliarSemanaSanta.jpeg',
        description: "Del 17 al 19 de abril, vive un tiempo de conexión espiritual y familiar. Fortalezcamos nuestra fe, renovemos nuestro compromiso con Dios y disfrutemos juntos momentos especiales.",
        place: "Plaza Castilla"
      },
    ]
  
  return (
    <>
      <section>
        <div className="bg-[url(../../public/actividades-banner.jpg)] h-screen bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl md:text-3xl-desktop z-[5] text-center">
            Actividades
          </h2>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-2xl md:text-2xl-desktop text-center text-primary-2 pb-6">Agenda de Actividades</h2>
          <CalendarActivities/>
        </div>

        <div className="bg-secondary p-6 items-center gap-6">
          <h3 className="text-primary-3 text-2xl md:text-2xl-desktop pt-6 pb-10 text-center">Más actividades</h3>
          
          <div className="flex flex-col gap-y-8 max-w-7xl justify-center mx-auto">
            {
              activities.map((activity) => (
                <Activity key={activity.index} button={false} description={activity.description}
                  hour={dayjs((activity.start).toString()).format('HH:mm')} image={activity.img} place={activity.place} title={activity.title} className="pb-8"/>
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default page
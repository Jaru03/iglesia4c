import Activity from "@/components/Activity"
import CalendarActivities from "@/app/actividades/components/CalendarApp"
import dayjs from "dayjs"
import { CallToAction } from "@/components/CallToAction"
import { HeroTitle } from "@/components/typography/HeroTitle"
import { Subtitle } from "@/components/typography/Subtitle"
import prisma from "@/utils/prisma"

const daysOfWeek = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"]

const page = async () => {
  const now = new Date()

  const [calendarActivities, upcomingActivities] = await Promise.all([
    prisma.activity.findMany({
      where: { showCalendar: true },
      orderBy: { hourStart: "asc" },
      select: { id: true, title: true, hourStart: true, hourEnd: true, place: true, description: true },
    }),
    prisma.activity.findMany({
      where: {
        hourStart: { gte: now },
        NOT: daysOfWeek.map(day => ({ title: { contains: day, mode: "insensitive" as const } })),
      },
      orderBy: { hourStart: "asc" },
      take: 10,
      select: { id: true, title: true, description: true, hourStart: true, img: true, place: true },
    }),
  ])

  const calendarEvents = calendarActivities.map(a => ({
    id: a.id,
    title: a.title,
    hourStart: a.hourStart.toISOString(),
    hourEnd: a.hourEnd.toISOString(),
    place: a.place,
    description: a.description,
  }))

  return (
    <>
      <section>
        <div className="bg-[url(../../public/actividades-banner.jpg)] h-[100vh] bg-no-repeat bg-center bg-cover before:absolute before:inset-0 before:bg-black/50 before:content-[''] flex flex-col justify-center items-center">
          <HeroTitle title="Actividades" size="large" />
        </div>
        <div className="section-sm container-page flex flex-col gap-6">
          <CalendarActivities events={calendarEvents} />
        </div>

          <div className="bg-secondary section">
            <div className="container-page">
              <Subtitle className="mb-8 text-center">Más actividades</Subtitle>

              <div className="flex flex-col gap-y-8 max-w-7xl justify-center mx-auto">
                {upcomingActivities.map((activity) => (
                  <Activity
                    key={activity.id}
                    button={false}
                    description={activity.description ?? ""}
                    hour={dayjs(activity.hourStart).format('HH:mm')}
                    image={activity.img ?? "/actividades-banner.jpg"}
                    place={activity.place}
                    title={activity.title}
                    className="pb-8"
                  />
                ))}
              </div>
            </div>
          </div>

        <CallToAction
          title="¡Únete a Nuestra Comunidad!"
          description="Participa en nuestras actividades y forma parte de una comunidad que crece en fe, amor y servicio. Cada actividad es una oportunidad para conectarte con Dios y con los demás miembros de nuestra iglesia."
          icon="users"
          iconLabel="Comunidad"
          buttons={[
            { label: "Conocenos más", href: "/nosotros", variant: "primary", icon: "info" },
            { label: "Enviar Petición de Oración", href: "/oracion", variant: "secondary", icon: "message-circle" },
          ]}
          quote={{ text: "Donde dos o tres se congregan en mi nombre, allí estoy yo en medio de ellos", reference: "- Mateo 18:20" }}
        />
      </section>
    </>
  )
}

export default page

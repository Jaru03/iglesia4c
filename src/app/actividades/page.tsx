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
          <h2 className="text-2xl md:text-2xl-desktop text-center text-primary-2 pb-6">Agenda de Actividades</h2>
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
      </section>
    </>
  )
}

export default page
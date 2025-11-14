import Activity from "@/components/Activity"
import { events } from "@/mocks/activities"
import dayjs from "dayjs"

const UpcomingActivities = () => {

  const upcomingActivities = events.slice(0, 3)

  return (
    <section>
      <div className="p-4 sm:p-6 md:flex md:flex-col md:justify-center w-full mx-auto max-w-7xl ">
        <h2 className="text-2xl md:text-2xl-desktop text-primary-2 text-center py-10">Próximas actividades</h2>
        <div className="flex flex-col gap-8">
          {
            upcomingActivities.map((activity) => (
              <Activity key={activity.index} button={true} description={activity.description}
                place={activity.place} hour={dayjs((activity.start).toString()).format('HH:mm')} image={activity.img} title={activity.title} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default UpcomingActivities
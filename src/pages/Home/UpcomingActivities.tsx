import Activity from "@/components/Activity"
import { events } from "@/mocks/activities"
import dayjs from "dayjs"
import { Calendar, Clock } from "lucide-react"

const UpcomingActivities = () => {
  const upcomingActivities = events.slice(0, 3)

  return (
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-2xl-desktop text-primary-3 text-center py-10">Próximas actividades</h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Únete a nosotros en estos próximos eventos y actividades especiales
          </p>
        </div>

        <div className="space-y-8">
          {upcomingActivities.map((activity) => (
            <Activity
              key={activity.index}
              button={true}
              description={activity.description}
              place={activity.place}
              hour={dayjs((activity.start).toString()).format('HH:mm')}
              image={activity.img}
              title={activity.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingActivities

import Activity from "@/components/Activity"
import { events } from "@/mocks/activities"
import dayjs from "dayjs"
import { Subtitle } from "@/components/typography/Subtitle"

const UpcomingActivities = () => {
  const upcomingActivities = events.slice(0, 3)

  return (
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <Subtitle className="text-center py-10">Próximas actividades</Subtitle>

          <p className="text-gray-600 text-base xs:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
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

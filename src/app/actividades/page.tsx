import Activity from "@/components/Activity"
import CalendarActivities from "@/pages/Agenda/CalendarApp"

const page = () => {
  
  const activities = [1,2,3,4]
  
  return (
    <>
      <section>
        <div className="p-6 pt-24 sm:pt-32 flex flex-col gap-6">
          <h2 className="text-2xl md:text-2xl-desktop text-center text-primary-2 pb-6">Agenda de Actividades</h2>
          <CalendarActivities/>
        </div>

        <div className="bg-secondary p-6 items-center gap-6">
          <h3 className="text-primary-3 text-2xl md:text-2xl-desktop pt-6 pb-10 text-center">Más actividades</h3>
          
          <div>
            {
              activities.map((activity) => (
                <Activity key={activity} button={false} description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
                  hour="18:00" image="/cultomujeres.png" place="Plaza Castilla" title="Culto de Mujeres" className="pb-8"/>
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default page
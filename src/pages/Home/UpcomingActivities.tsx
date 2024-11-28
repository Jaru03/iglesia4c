import Activity from "@/components/Activity"

const UpcomingActivities = () => {
  return (
    <section>
        <div className="p-6">
            <h2 className="text-primary-3 text-2xl md:text-2xl-desktop text-center pb-14">Próximas actividades</h2>

            <Activity button={true} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "} 
            place="Plaza de Castilla" hour="18:00" image="/cultomujeres.png" title="Culto de mujeres"/>
        </div>
    </section>
  )
}

export default UpcomingActivities
import Activity from "@/components/Activity"

const UpcomingActivities = () => {
  return (
    <section>
        <div className="p-6 sm:md:h-[600px] md:flex md:flex-col md:justify-center w-full ">
            <h2 className="text-2xl md:text-2xl-desktop text-primary-2 text-center py-10">Próximas actividades</h2>

            <Activity button={true} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "} 
            place="Plaza de Castilla" hour="18:00" image="/cultomujeres.png" title="Culto de mujeres"/>
        </div>
    </section>
  )
}

export default UpcomingActivities
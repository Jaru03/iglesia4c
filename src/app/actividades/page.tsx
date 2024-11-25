import Activity from "@/components/Activity"

const page = () => {
  return (
    <>
      <section>
        <div className="p-6 pt-24 sm:pt-32 flex flex-col gap-6">
          <h2 className="text-2xl text-center text-primary-2 pb-6">Agenda de Actividades</h2>
          <p>calendar</p>

          <div>
            <h3 className="text-xl text-center  text-primary-3">Evento Seleccionado</h3>
            <Activity button={false} description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
              hour="18:00" image="/cultomujeres.png" place="Plaza Castilla" title="Culto de Mujeres" />
          </div>
        </div>

        <div className="bg-secondary p-6 items-center gap-6">
          <h3 className="text-primary-3 text-xl pt-2 pb-8 text-center">Más actividades</h3>
          <Activity button={false} description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
            hour="18:00" image="/cultomujeres.png" place="Plaza Castilla" title="Culto de Mujeres" />
          <Activity button={false} description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
            hour="18:00" image="/cultomujeres.png" place="Plaza Castilla" title="Culto de Mujeres" />
          <Activity button={false} description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
            hour="18:00" image="/cultomujeres.png" place="Plaza Castilla" title="Culto de Mujeres" />
        </div>
      </section>
    </>
  )
}

export default page
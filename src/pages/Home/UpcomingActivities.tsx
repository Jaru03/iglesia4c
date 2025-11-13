import Activity from "@/components/Activity"

const UpcomingActivities = () => {

  const upcomingActivities = [
    { id:1,
      title: 'Palabra Vision',
      description: '"Ensancha" es un llamado a la expansión de la iglesia, basado en Isaías 54:2. Nos invita a extendernos espiritualmente y territorialmente, firmes en nuestra fe y obediencia a Dios, confiando en Su respaldo para llevar el evangelio a más vidas y comunidades.',
      place: "Plaza de Castilla",
      hour: "10:00",
      image: "/palabraVision2025.jpeg",
    },
    {
      id:2,
      title: "Aniversario de 4C",
      description: "¡11 años de fidelidad de Dios! Acompáñanos este 8 de febrero con el Pastor Juan Carlos Escobar, presidente de las ADE. ¡Te esperamos!",
      place: "Auditorio 4C Parla, Calle Londres 58, Parla",
      hour: "18:00",
      image: "/undecimoAniversario.jpeg",
    },
    {
      id:3,
      title: "Retiro Familiar",
      description: "Del 17 al 19 de abril, vive un tiempo de conexión espiritual y familiar. Fortalezcamos nuestra fe, renovemos nuestro compromiso con Dios y disfrutemos juntos momentos especiales.",
      place: "Plaza de Castilla",
      hour: "10:00",
      image: "/retiroFamiliarSemanaSanta.jpeg",
    },

  ]

  return (
    <section>
      <div className="p-4 sm:p-6 md:flex md:flex-col md:justify-center w-full mx-auto max-w-7xl ">
        <h2 className="text-2xl md:text-2xl-desktop text-primary-2 text-center py-10">Próximas actividades</h2>
        <div className="flex flex-col gap-8">
          {
            upcomingActivities.map((activity) => (
              <Activity key={activity.id} button={true} description={activity.description}
                place={activity.place} hour={activity.hour} image={activity.image} title={activity.title} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default UpcomingActivities
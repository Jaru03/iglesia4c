import DonationsPage from "@/app/donaciones/components/DonationsPage"
import { CallToAction } from "@/components/CallToAction"

const page = () => {
  return (
    <>
      <DonationsPage/>

      <CallToAction
        title="Tu Generosidad Hace la Diferencia"
        description="Cada donativo contribuye a expandir el reino de Dios, apoyar ministerios, y ayudar a quienes más lo necesitan. Tu participación es invaluable para nuestra misión."
        icon="heart"
        buttons={[
          { label: "Ver Nuestras Actividades", href: "/actividades", variant: "primary", icon: "calendar" },
          { label: "Conocenos más", href: "/nosotros", variant: "secondary", icon: "info" }
        ]}
        quote={{ text: "Dad, y se os dará; medida buena, apretada, remecida y rebosandoarán en vuestro regazo", reference: "- Lucas 6:38" }}
      />
    </>
  )
}

export default page

import type { Metadata } from "next"
import DonationsPage from "@/app/donaciones/components/DonationsPage"
import { CallToAction } from "@/components/CallToAction"

export const metadata: Metadata = {
  title: "Donaciones | Apoya a Casa de Dios Madrid",
  description:
    "Apoya la misión de la iglesia Casa de Dios en Madrid. Donaciones seguras por PayPal, transferencia u online. Tu generosidad transforma vidas.",
  alternates: { canonical: "/donaciones" },
  openGraph: {
    title: "Donaciones | Casa de Dios Madrid",
    description:
      "Apoya la misión de la Comunidad Cristiana Casa de Dios con tu donativo.",
    url: "/donaciones",
    type: "website",
    images: ["/donaciones-banner.jpg"],
  },
}

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

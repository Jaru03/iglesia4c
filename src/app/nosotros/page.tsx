import { CallToAction } from "@/components/CallToAction"
import HowItStarted from "./components/HowItStarted"
import Departaments from "./components/Departaments"

const page = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
            

            <HowItStarted/>
            <Departaments/>

            <CallToAction
                title="Únete a Nuestra Comunidad"
                description="Descubre cómo puedes ser parte de esta hermosa familia que camina juntos en fe, amor y servicio a nuestro Señor Jesucristo."
                icon="heart"
                buttons={[
                    { label: "Ver Actividades", href: "/actividades", variant: "primary", icon: "calendar" },
                    { label: "Enviar Petición", href: "/oracion", variant: "secondary", icon: "message-circle" }
                ]}
            />
        </div>
    )
}

export default page

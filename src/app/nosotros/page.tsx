import { Users, Heart, BookOpen } from "lucide-react"
import HowItStarted from "./components/HowItStarted"
import Departaments from "./components/Departaments"

const page = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
            

            <HowItStarted/>
            <Departaments/>

            {/* Footer call to action */}
            <section className="py-16 bg-linear-to-r from-primary-3 to-primary-2">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Únete a Nuestra Comunidad
                    </h2>
                    <p className="text-white/90 text-lg leading-7">
                        Descubre cómo puedes ser parte de esta hermosa familia que camina juntos
                        en fe, amor y servicio a nuestro Señor Jesucristo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/actividades"
                            className="inline-flex items-center gap-2 bg-white text-primary-3 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                            <Users className="w-5 h-5" />
                            Ver Actividades
                        </a>
                        <a
                            href="/oracion"
                            className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                        >
                            <BookOpen className="w-5 h-5" />
                            Enviar Petición
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page

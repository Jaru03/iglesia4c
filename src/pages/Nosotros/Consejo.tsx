import ConsejoItem from "./ConsejoItem"
import { Users, Award, Heart } from "lucide-react"

const Consejo = () => {
    const consejo = [
    {
      src:"/presidenteItem-1.png",
      title: "Presidente",
      name: "Roberto Ricardo López Esquivel"
    },
    {
      src:"/secretariaLili.png",
      title: "Secretaria",
      name: "Liliana Beatríz Bogado Acosta"
    },
    {
      src:"/tesoreroWilson-2.png",
      title: "Tesorero",
      name: "Wilson Perdomo González "
    },
    {
      src:"/vocalAlberto-2.png",
      title: "Vocal",
      name: "Alberto Reyen Larramendia"
    },
    {
      src:"/vocalIvan-3.png",
      title: "Vocal",
      name: "Iván Gerardo Ibarrola"
    },
  ]
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-primary-3/5 to-primary-2/5">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 mb-6">
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-3">
                        Consejo Ejecutivo
                    </h2>
                    
                </div>

                <p className="text-gray-600 text-lg max-w-2xl mx-auto font-normal">
                    Nuestro equipo de liderazgo está comprometido con guiar a la iglesia
                    con integridad, sabiduría y amor, sirviendo como ejemplos de fe viva.
                </p>
            </div>

            <div className="grid gap-8 md:gap-6 md:grid-cols-5 justify-center place-items-center max-w-6xl mx-auto">
                {
                    consejo.map((item, key) => (
                        <ConsejoItem item={item} key={key}/>
                    ))
                }
            </div>

            {/* Leadership message */}
            <div className="text-center mt-16">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-4xl mx-auto">
                    <div className="flex justify-center mb-4">
                        <Users className="w-8 h-8 text-primary-3" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-3 mb-4">
                        Liderazgo con Propósito
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Nuestro consejo ejecutivo se dedica a servir a la congregación con humildad y dedicación,
                        guiados por los principios bíblicos y el amor de Cristo. Cada miembro aporta su experiencia
                        única para el crecimiento y bienestar de nuestra comunidad cristiana.
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Consejo

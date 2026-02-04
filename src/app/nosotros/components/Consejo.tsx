import ConsejoItem from "./ConsejoItem"
import { Users } from "lucide-react"
import { Subtitle } from "@/components/typography/Subtitle"

const Consejo = () => {
  const consejo = [
    {
      src: "/presidenteItem-1.png",
      title: "Presidente",
      name: "Roberto Ricardo López Esquivel"
    },
    {
      src: "/secretariaLili.png",
      title: "Secretaria",
      name: "Liliana Beatríz Bogado Acosta"
    },
    {
      src: "/tesoreroWilson-2.png",
      title: "Tesorero",
      name: "Wilson Perdomo González"
    },
    {
      src: "/vocalAlberto-2.png",
      title: "Vocal",
      name: "Alberto Reyen Larramendia"
    },
    {
      src: "/vocalIvan-3.png",
      title: "Vocal",
      name: "Iván Gerardo Ibarrola"
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Subtitle className="mb-4">Consejo Ejecutivo</Subtitle>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Nuestro equipo de liderazgo está comprometido con guiar a la iglesia
            con integridad, sabiduría y amor, sirviendo como ejemplos de fe viva.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 max-w-4xl mx-auto">
          {consejo.map((item, key) => (
            <ConsejoItem item={item} key={key} />
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-3/10 mb-4">
            <Users className="w-6 h-6 text-primary-3" />
          </div>
          <h3 className="text-xl font-semibold text-primary-3 mb-2">
            Liderazgo con Propósito
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Nuestro consejo ejecutivo se dedica a servir a la congregación con humildad y dedicación,
            guiados por los principios bíblicos y el amor de Cristo. Cada miembro aporta su experiencia
            única para el crecimiento y bienestar de nuestra comunidad cristiana.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Consejo

'use client'
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Subtitle } from "@/components/typography/Subtitle"

const faithItems = [
  {
    number: "1",
    text: "Creemos en las Sagradas Escrituras, la Biblia, que como palabra inspirada de Dios mediante la cual se revela al ser humano, no contiene error en sus originales y constituye la única regla infalible de fe y conducta."
  },
  {
    number: "2",
    text: "Creemos en un Dios único, existente y revelado en las Escrituras en las personas del Padre, del Hijo y del Espíritu Santo."
  },
  {
    number: "3",
    text: "Creemos en Jesucristo como único y suficiente Salvador, en su encarnación por obra y gracia del Espíritu Santo y que su obra redentora, muerte y resurrección es suficiente para la salvación del ser humano, sin necesidad de obras."
  },
  {
    number: "4",
    text: "Creemos en la salvación integral del ser humano (cuerpo, alma y espíritu), ofrecida gratuitamente mediante un acto soberano de Dios y obtenida por la fe en Jesucristo."
  },
  {
    number: "5",
    text: "Creemos en la Promesa del Padre, el bautismo en el Espíritu Santo por el que los creyentes son investidos de poder, para ser testigos de Jesucristo."
  },
  {
    number: "6",
    text: "Creemos en la Iglesia, que es el cuerpo de Cristo, compuesta por todos los creyentes nacidos de nuevo, con su doble carácter: universal y local."
  },
  {
    number: "7",
    text: "Creemos en el bautismo por inmersión y la cena del Señor como ordenanzas dadas por el Señor a su iglesia."
  },
  {
    number: "8",
    text: "Creemos en el sacerdocio universal de los creyentes, siendo Jesucristo el único mediador entre Dios y los hombres."
  },
  {
    number: "9",
    text: "Creemos en la vigencia actual de los dones espirituales, manifestaciones sobrenaturales del poder del Espíritu Santo."
  },
  {
    number: "10",
    text: "Creemos en el poder de Dios, capaz de obrar prodigios, milagros y sanidades hoy día."
  },
  {
    number: "11",
    text: "Creemos en el arrebatamiento de la iglesia y la segunda venida de Jesucristo, junto con sus santos, para establecer su reino sobre la tierra."
  },
  {
    number: "12",
    text: "Creemos en la resurrección de los muertos y el juicio final, unos para vida eterna, otros para condenación eterna."
  },
  {
    number: "13",
    text: "Creemos que el matrimonio fue instituido por Dios y confirmado por Cristo, como la unión entre un hombre y una mujer."
  },
]

const FeDeclaration = () => {
  return (
    <section className='py-20 px-6 bg-white'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='max-w-5xl mx-auto'
      >
        <div className="text-center mb-12">
          <Subtitle className="mb-4">Declaración de Fe</Subtitle>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Nuestros fundamentos doctrinales que guían nuestra fe y práctica cristiana
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
          <h3 className="text-xl md:text-2xl font-semibold text-primary-3 mb-8 text-center">
            Creemos y Confesamos
          </h3>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {faithItems.map((item) => (
              <div 
                key={item.number} 
                className="flex gap-4 p-3 rounded-lg hover:bg-white transition-colors"
              >
                <Badge 
                  variant="outline" 
                  className="shrink-0 w-8 h-8 flex items-center justify-center text-primary-3 border-primary-3 font-semibold"
                >
                  {item.number}
                </Badge>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default FeDeclaration

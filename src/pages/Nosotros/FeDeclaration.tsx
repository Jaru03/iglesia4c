'use client'
import {motion} from "motion/react"
const   FeDeclaration = () => {
  return (
    <section className='bg-gradient-to-b from-primary-3/5 to-primary-2/5 py-20'>
      <motion.div
      initial={{
          opacity: 0,
          y: -50,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{ once: true }}
       className='max-w-6xl mx-auto px-6'>

          <div className="text-center mb-12">
            <h2 className="text-primary-3 text-4xl md:text-5xl font-bold mb-4">
              Declaración de Fe
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-normal">
              Nuestros fundamentos doctrinales que guían nuestra fe y práctica cristiana
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-primary-3 mb-8 text-center">
              Creemos y Confesamos
            </h3>
          <ul className="list-decimal list-inside columns-1 md:columns-2 gap-x-8 px-8 space-y-2">
            <li >
              Creemos en las Sagradas Escrituras, la Biblia, que como palabra
              inspirada de Dios mediante la cual se revela al ser humano, no
              contiene error en sus originales y constituye la única regla
              infalible de fe y conducta.
            </li>
            <li >
              Creemos en un Dios único, existente y revelado en las Escrituras
              en las personas del Padre, del Hijo y del Espíritu Santo.
            </li>
            <li >
              Creemos en Jesucristo como único y suficiente Salvador, en su
              encarnación por obra y gracia del Espíritu Santo y que su obra
              redentora, muerte y resurrección es suficiente para la salvación
              del ser humano, sin necesidad de obras. En ningún otro hay
              salvación.
            </li>
            <li >
              Creemos en la salvación integral del ser humano (cuerpo, alma y
              espíritu), ofrecida gratuitamente mediante un acto soberano de
              Dios y obtenida por la fe en Jesucristo. Creemos que todo ser
              humano es pecador y que, para ser salvo, en su libre albedrío,
              debe aceptar la Gracia de Dios con la indispensable necesidad de
              arrepentimiento, confiar en la eficacia del sacrificio expiatorio
              de Cristo Jesús en la Cruz, quien murió por toda la humanidad como
              pago de la deuda contraída por nuestros pecados y, además,
              permanecer fiel hasta la muerte cuidando nuestra salvación que es
              susceptible de perderse por causa de infidelidad o apostasía.
            </li>
            <li >
              Creemos en la Promesa del Padre, el bautismo en el Espíritu Santo
              por el que los creyentes son investidos de poder, para ser
              testigos de Jesucristo, servir a Dios y vivir en santidad. La
              evidencia inicial es hablar en lenguas desconocidas, diferenciando
              este hecho del don de lenguas.
            </li>
            <li >
              Creemos en la Iglesia, que es el cuerpo de Cristo, compuesta por
              todos los creyentes nacidos de nuevo, con su doble carácter:
              universal y local, y cuya única cabeza es Jesucristo mismo.
            </li>
            <li >
              Creemos en el bautismo por inmersión y la cena del Señor como
              ordenanzas dadas por el Señor a su iglesia. El bautismo, como
              testimonio público de conversión al evangelio de Jesucristo en
              identificación con su muerte, sepultura y resurrección. La santa
              cena como recordatorio de su muerte, señal del Nuevo Pacto, y
              anuncio de su segunda venida.
            </li>

            <li >
              Creemos en el sacerdocio universal de los creyentes, siendo
              Jesucristo el único mediador entre Dios y los hombres. Creemos en
              la oración en el nombre de Jesús como medio de comunicación con
              Dios.
            </li>
            <li >
              Creemos en la vigencia actual de los dones espirituales,
              manifestaciones sobrenaturales del poder del Espíritu Santo, dados
              a la iglesia para su edificación.
            </li>
            <li >
              Creemos en el poder de Dios, capaz de obrar prodigios, milagros y
              sanidades hoy día.
            </li>
            <li >
              Creemos en el arrebatamiento de la iglesia y la segunda venida de
              Jesucristo, junto con sus santos, para establecer su reino sobre
              la tierra.
            </li>
            <li >
              Creemos en la resurrección de los muertos y el juicio final, unos
              para vida eterna, otros para condenación eterna.
            </li>
            <li >
              Creemos que el matrimonio fue instituido por Dios y confirmado por
              Cristo, como la unión entre un hombre y una mujer, nacidos como
              tales.
            </li>
          </ul>
          </div>
      </motion.div>
    </section>
  )
}

export default FeDeclaration

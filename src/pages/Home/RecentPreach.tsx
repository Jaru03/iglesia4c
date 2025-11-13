'use client'
import Button from "@/ui/Button"
import Image from "next/image"
import {motion} from "motion/react"
const RecentPreach = () => {

    const preach = {
        link: 'https://www.youtube.com/watch?v=LdC-9L_3TfM'
    }

    return (
        <section 
        className="bg-secondary ">
            <div
            
            className="max-w-7xl mx-auto p-4 md:p-8">
                <h2 className="text-2xl md:text-2xl-desktop text-primary-2 text-center py-10">Prédicas más recientes</h2>
                <motion.article 
                initial={{
          opacity: 0,
          x: -100,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{
            once:true
        }}
                className="grid md:grid-cols-2 gap-8">
                    <Image width={1000} height={1000} src="/predica.jpeg" className="w-full h-full" alt="Image 1" />
                    <div className="h-full flex flex-col justify-evenly">
                        <h3 className="text-primary-3 text-xl md:text-xl-desktop text-center">Tiempo de Ensanchar 2</h3>
                        <p className="text-base md:text-base-desktop py-4">Dios nos llama a ampliar nuestra visión, crecer en fe y avanzar en Su propósito. Es tiempo de ensanchar nuestras fronteras, confiando en Su poder y dirección para lo que viene.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button className="w-full" target="_blank" url='https://www.youtube.com/@CentroCristiano4C/streams' text={'Más Prédicas'} variant="primary" />
                            <Button className="w-full" target="_blank" url={preach.link} text={'Ver Prédica'} variant="primary" />
                        </div>
                    </div>
                </motion.article>
            </div>
        </section>
    )
}

export default RecentPreach
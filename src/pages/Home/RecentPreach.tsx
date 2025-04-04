import Button from "@/ui/Button"
import Image from "next/image"

const RecentPreach = () => {

    const preach = {
        link: 'https://www.youtube.com/watch?v=LdC-9L_3TfM'
    }

    return (
        <section>
            <div className="p-6 sm:pb-10 md:h-[600px] md:flex md:flex-col md:justify-center w-full bg-secondary">
                <h2 className="text-2xl md:text-2xl-desktop text-primary-2 text-center py-10">Prédicas más recientes</h2>
                <article className="max-w-[370px] mx-auto sm:flex sm:justify-between sm:max-w-[800px] sm:max-h-[370px] md:gap-8">
                    <Image width={1000} height={1000} src="/predica.jpeg" className="w-full h-full max-w-[350px] max-h-[370px] min-w-[280px] m-auto sm:m-0 pb-8 sm:pb-0 aspect-auto" alt="Image 1" />
                    <div className="flex flex-col mx-auto sm:mx-0 gap-2  sm:w-[400px] sm:justify-between p-4">
                        <h3 className="text-primary-3 text-xl md:text-xl-desktop text-center">Tiempo de Ensanchar 2</h3>
                        <p className="text-base md:text-base-desktop py-4">Dios nos llama a ampliar nuestra visión, crecer en fe y avanzar en Su propósito. Es tiempo de ensanchar nuestras fronteras, confiando en Su poder y dirección para lo que viene.</p>
                        <div className="flex flex-col gap-2 sm:flex-row w-full">
                            <Button className="min-w-[120px] w-full" target="_blank" url='https://www.youtube.com/@CentroCristiano4C/streams' text={'Más Prédicas'} variant="primary" />
                            <Button className="min-w-[120px] w-full" target="_blank" url={preach.link} text={'Ver Prédica'} variant="primary" />
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default RecentPreach
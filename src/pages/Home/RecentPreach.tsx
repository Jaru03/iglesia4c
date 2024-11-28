import Button from "@/ui/Button"
import Image from "next/image"

const RecentPreach = () => {

    const preach = {
        link: 'https://www.youtube.com/watch?v=htMg6Nz_mdA'
    }

    return (
        <section>
            <div className="p-6 sm:pb-10 w-full bg-secondary">
                <h2 className="text-2xl md:text-2xl-desktop text-primary-2 text-center pb-14">Prédicas más recientes</h2>
                <article className="max-w-[370px] mx-auto sm:flex sm:justify-between sm:max-w-[800px] sm:max-h-[370px]">
                    <Image width={1000} height={1000} src="/cultomujeres.png" className="w-full h-full max-w-[370px] max-h-[370px] min-w-[280px] m-auto sm:m-0 pb-8 sm:pb-0" alt="Image 1" />
                    <div className="flex flex-col mx-auto sm:mx-0 gap-2 max-w-[370px] sm:justify-between p-4">
                        <h3 className="text-primary-3 text-xl md:text-xl-desktop text-center">¿Por qué necesitamos al Espiritu Santo?</h3>
                        <p className="text-base md:text-base-desktop py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolor asperiores facere molestias? Dolores ad cum nisi, ratione pariatur exercitationem placeat esse labore debitis necessitatibus culpa cupiditate voluptatum, ea tempore?</p>
                        <div className="flex flex-col gap-2 sm:flex-row w-full">
                            <Button className="min-w-[120px] w-full" target="_blank" url='https://www.youtube.com/@CentroCristiano4C/streams' text={'Ver más Prédicas'} variant="primary" />
                            <Button className="min-w-[120px] w-full" target="_blank" url={preach.link} text={'Ver Prédica'} variant="primary" />
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default RecentPreach
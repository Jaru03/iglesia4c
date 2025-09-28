import Button from "@/ui/Button"
import Image from "next/image"

interface Props {
    title: string
    description: string
    image: string
    button: boolean
    place: string
    hour: string
    className?: string
}

const Activity = ({title, description, image, button, place, hour, className}:Props) => {

   const showButton = button
  return (
    <article className={`grid items-center  justify-center md:grid-cols-2 gap-8 md:p-4 ${className}`}>
            <Image src={image} alt='img'width={1000} height={1000} className='w-full h-full md:aspect-video' />

            <div className={`flex flex-col gap-4 md:gap-0 ${showButton ? 'md:justify-between' : 'md:justify-evenly'}  h-full`} >
                <h3 className="text-xl md:text-xl-desktop text-center text-primary-3">{title}</h3>
                <p className="text-base md:text-base-desktop">{description}</p>
                <ul className="text-base md:text-base-desktop font-bold flex flex-col gap-4">
                    <li><span className="text-primary-4 pr-1">Lugar:</span> {place}</li>
                    <li><span className="text-primary-4 pr-1">Horario:</span>{hour}</li>
                </ul>

                {showButton === true && <Button url='/actividades'  text="Más actividades" variant="primary"/>}

            </div>

    </article>
  )
}

export default Activity
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
    <article className={`max-w-[370px] mx-auto sm:flex sm:justify-between sm:max-w-[800px] sm:max-h-[370px] md:gap-8 md:justify-center md:items-center ${className}`}>
            <Image src={image} alt='img'width={1000} height={1000} className='w-full h-full max-w-[350px] max-h-[370px] min-w-[280px] m-auto sm:m-0 pb-8 sm:pb-0' />

            <div className="flex flex-col mx-auto sm:mx-0 gap-2  sm:w-[400px] sm:justify-between p-4">
                <h3 className="text-xl md:text-xl-desktop text-center text-primary-3">{title}</h3>
                <p className="text-base md:text-base-desktop">{description}</p>
                <ul className="text-base md:text-base-desktop font-bold flex flex-col gap-4">
                    <li><span className="text-primary-4 pr-1">Lugar:</span> {place}</li>
                    <li><span className="text-primary-4 pr-1">Horario:</span>{hour}</li>
                </ul>

                {showButton === true && <Button url='/actividades' text="Más actividades" variant="primary"/>}

            </div>

    </article>
  )
}

export default Activity
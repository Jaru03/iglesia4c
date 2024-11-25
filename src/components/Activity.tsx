import Button from "@/ui/Button"
import Image from "next/image"

interface Props {
    title: string
    description: string
    image: string
    button: boolean
    place: string
    hour: string
}

const Activity = ({title, description, image, button, place, hour}:Props) => {

   const showButton = button
  return (
    <article className="max-w-[370px] mx-auto mb-8 sm:flex sm:justify-between sm:max-w-[800px] sm:max-h-[370px]">
            <Image src={image} alt='img'width={1000} height={1000} className='w-full h-full max-w-[370px] max-h-[370px] min-w-[280px] m-auto sm:m-0 pb-4 sm:pb-0' />

            <div className="flex flex-col gap-4 p-4 sm:justify-between sm:w-[370px]">
                <h2 className="text-xl text-center text-primary-3">{title}</h2>
                <p className="text-base">{description}</p>
                <ul className="text-base font-bold flex flex-col gap-4">
                    <li><span className="text-primary-4 pr-1">Lugar:</span> {place}</li>
                    <li><span className="text-primary-4 pr-1">Horario:</span>{hour}</li>
                </ul>

                {showButton === true && <Button href='' text="Más actividades" variant="primary"/>}

            </div>

    </article>
  )
}

export default Activity
import Image from "next/image"
import { twMerge } from "tailwind-merge"

interface Props {
  text: string
  imgSrc: string
  setter: React.Dispatch<React.SetStateAction<string>>
  payPath: 'PayPal' | 'Transferencia' | 'Online'
  className?: string
}

const DonationIcon = ({ text, imgSrc, setter, payPath, className }: Props) => {

  const handleClick = () => {
    setter(payPath)
  }

  const cardStyles = twMerge("shadow-[1px_10px_4px_0px_rgba(0,_0,_0,_0.15)] rounded-lg w-[260px] h-[160px] flex justify-center", className)

  return (
      <article onClick={handleClick} className={cardStyles}>
        <div  className="flex flex-col items-center justify-center gap-2 w-full h-full">
          <Image src={imgSrc} width={150} height={150} alt="Icono de donación" className="max-w-[70px] max-h-[80px]" />
          <p className="text-base font-semibold">{text}</p>
        </div> 
      </article>
  )
}

export default DonationIcon
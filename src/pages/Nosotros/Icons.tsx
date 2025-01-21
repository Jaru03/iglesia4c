import Image from "next/image"

interface Props{
    image: string
    description: string
    alt: string
}

const Icons = ({image, description, alt}: Props) => {
  return (
    <article className="flex flex-col items-center ">
        <Image width={220} height={220} src={image} className="sm:w-80 sm:h-80" alt={alt} />
        <p>{description}</p>
    </article>
  )
}

export default Icons
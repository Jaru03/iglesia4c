import Image from "next/image"

interface Props{
    image: string
    description: string
    alt: string
}

const Icons = ({image, description, alt}: Props) => {
  return (
    <article className="flex flex-col items-center gap-4">
        <Image width={170} height={170} src={image} alt={alt} />
        <p className="text-center">{description}</p>
    </article>
  )
}

export default Icons
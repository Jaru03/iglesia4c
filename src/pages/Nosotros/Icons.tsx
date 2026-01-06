'use client'
import Image from "next/image"
import {motion} from 'motion/react'

interface Props{
    image: string
    description: string
    alt: string
}

const Icons = ({image, description, alt}: Props) => {
  return (
    <motion.article
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
    className="flex flex-col items-center ">
        <Image width={220} height={220} src={image} className="sm:w-80 sm:h-80" alt={alt} suppressHydrationWarning />
        <p>{description}</p>
    </motion.article>
  )
}

export default Icons
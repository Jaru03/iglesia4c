'use client'
import Image from "next/image"
import {motion} from 'motion/react'

interface Props {
  img: string | null;
  className?: string;
  title: string;
  value: string;
}

const Area = ({ img, className }: Props) => {
  return (
    <motion.article 
    initial={{
          opacity: 0,
          x: -50,
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
          once: true
        }}
    className={`max-w-[300px] /*overflow-hidden */ max-h-[300px] ${className} /*group */`}>
      <div className="w-full h-full  group-hover:translate-y-[-300px] transition-all duration-1000">
        <Image
          src={img ? img : '/logoJovenes.jpeg'}
          width={1000}
          height={1000}
          className=" w-full h-full"
          alt="Area de la iglesia"
          />

        {/* <div className="w-full min-h-[300px] flex flex-col justify-center gap-8 items-center">
          <p className="text-center text-base md:text-base-desktop">¿Quieres saber más sobre el <br /> {title}?</p>
          <Button text="Ver más" variant="primary" className="px-8" url={`/nosotros/${value}`} />
        </div> */}
      </div>
    </motion.article>
  );
}

export default Area;

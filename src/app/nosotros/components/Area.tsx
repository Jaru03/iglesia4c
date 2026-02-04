'use client'
import Image from "next/image"
import { motion } from 'motion/react'
import { ArrowRight, Users } from "lucide-react"

interface Props {
  img: string | null;
  className?: string;
  title: string;
  value: string;
}

const Area = ({ img, className, title, value }: Props) => {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{
        once: true
      }}
      className={`group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 ${className}`}
    >
      {/* Image container */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <Image
          src={img ? img : '/logoJovenes.jpeg'}
          width={1000}
          height={1000}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={`Departamento de ${title}`}
          suppressHydrationWarning
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Hover content */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <a
            href={`/nosotros/${value}`}
            className="inline-flex items-center gap-2 bg-white text-primary-3 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
          >
            <Users className="w-4 h-4" />
            Ver más
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center group-hover:text-primary-3 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-center text-sm leading-relaxed">
          Un espacio dedicado al crecimiento espiritual y comunitario de {title?.toLowerCase()}.
        </p>
      </div>
    </motion.article>
  );
}

export default Area;

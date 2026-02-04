"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  image: string;
  button: boolean;
  place: string;
  hour: string;
  className?: string;
}

const Activity = ({
  title,
  description,
  image,
  button,
  place,
  hour,
  className,
}: Props) => {
  const showButton = button;
  return (
    <motion.article
      initial={{
        opacity: 0,
        x: -100,
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
        once:true
      }}
      className={`grid items-center justify-center grid-cols-1 xs:grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8 md:p-4 ${className}`}
    >
      <Image
        src={image}
        alt="img"
        width={1000}
        height={1000}
        className="w-full h-full md:aspect-video rounded-xl shadow-lg"
        suppressHydrationWarning
      />

      <div
        className={`flex flex-col gap-4 md:gap-0 ${showButton ? "md:justify-between" : "md:justify-evenly"}  h-full`}
      >
        <h3 className="text-xl md:text-2xl font-bold text-primary-3 text-center">
          {title}
        </h3>
        <p className="text-gray-700 text-base xs:text-lg leading-relaxed mb-6">{description}</p>
        <ul className="text-gray-600 font-medium flex flex-col gap-3 mb-6">
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-primary-3 font-semibold">Lugar:</span> {place}
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-primary-3 font-semibold">Horario:</span>
            {hour}
          </li>
        </ul>

        {showButton === true && (
          <Button asChild variant="default" size="default">
            <Link href="/actividades">
              Más actividades
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </motion.article>
  );
};

export default Activity;

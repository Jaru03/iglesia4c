'use client'

import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'
import { CallToAction } from '@/components/CallToAction'
import { Subtitle } from '@/components/typography/Subtitle'
import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'

interface Slider {
  key: number
  title: string
  image: string
}

const LastActivities = () => {

  const slider: Slider[] = [
    { key: 1, title: "Culto del Domingo", image: "/cultoDomingo-2.jpg" },
    { key: 2, title: "Culto del Domingo", image: "/cultoDomingo-1.jpg" },
    { key: 3, title: "Culto del Domingo", image: "/cultoDomingo-3.jpg" },
    { key: 4, title: "Santa Cena", image: "/cultoSantaCena-1.jpg" },
    { key: 5, title: "Santa Cena", image: "/cultoSantaCena-2.jpg" },
  ]

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section>
      <div className='p-6 md:p-16 max-w-7xl mx-auto'>
        <Subtitle className="text-center py-10">Últimas Actividades</Subtitle>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            setApi={setApi}
          >
            <CarouselContent>
              {slider.map((item) => (
                <CarouselItem key={item.key} className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[16/9] group">
                    <Image
                      width={1000}
                      height={1000}
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      suppressHydrationWarning
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === index + 1
                    ? "bg-primary-3 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <CallToAction
        title="¿Necesitas una oración?"
        description="Estamos aquí para ti. Comparte tu petición de oración y nuestra comunidad se unirá en fe por ti."
        icon="hand-heart"
        iconLabel="Oración"
        buttons={[
          { label: 'Pedir una oración', href: '/oracion', variant: 'primary', icon: 'message-circle' },
          { label: 'Visítanos', href: '/visitanos', variant: 'secondary', icon: 'map-pin' }
        ]}
      />
    </section>

  )
}

export default LastActivities

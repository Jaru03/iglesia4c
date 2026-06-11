'use client'

import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'
import { CallToAction } from '@/components/CallToAction'
import { Subtitle } from '@/components/typography/Subtitle'
import { useEffect, useState, useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'

interface Slide {
  id: string | number
  title: string
  src: string
}

export interface LastActivityPhoto {
  id: string
  url: string
  title: string
}

// Imágenes por defecto que se muestran cuando aún no se han subido fotos al carrusel.
const FALLBACK_PHOTOS: Slide[] = [
  { id: "fb-1", title: "Culto del Domingo", src: "/cultoDomingo-2.jpg" },
  { id: "fb-2", title: "Culto del Domingo", src: "/cultoDomingo-1.jpg" },
  { id: "fb-3", title: "Culto del Domingo", src: "/cultoDomingo-3.jpg" },
  { id: "fb-4", title: "Santa Cena", src: "/cultoSantaCena-1.jpg" },
  { id: "fb-5", title: "Santa Cena", src: "/cultoSantaCena-2.jpg" },
]

interface Props {
  photos?: LastActivityPhoto[]
}

const LastActivities = ({ photos = [] }: Props) => {
  const slider: Slide[] =
    photos.length > 0
      ? photos.map((p) => ({ id: p.id, title: p.title, src: p.url }))
      : FALLBACK_PHOTOS

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  // Usamos useRef para guardar el plugin y acceder a sus métodos (como .stop o .reset)
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

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

  // Función para manejar el clic en los puntos (dots)
  const handleDotClick = (index: number) => {
    if(!api) return;
    api.scrollTo(index);
    
    // UX: Reiniciamos el temporizador del autoplay.
    // Esto evita que el carrusel salte inmediatamente después de que el usuario haga clic manualmente.
    const autoplay = api.plugins().autoplay;
    if (autoplay) autoplay.reset(); 
  }

  return (
    <section>
      <div className='p-6 md:p-16 max-w-7xl mx-auto'>
        <Subtitle className="text-center py-10">Últimas Actividades</Subtitle>

        {/* UX: Pausar en Hover.
           Cuando el usuario pasa el mouse por encima, el carrusel se detiene para que pueda ver la foto con calma.
        */}
        <div 
          className="relative"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            plugins={[plugin.current]}
            setApi={setApi}
          >
            <CarouselContent>
              {slider.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[16/9] group">
                    {/* OPTIMIZACIÓN: Usar 'fill' + 'sizes' 
                      En lugar de width/height fijos, usamos 'fill' para que se adapte al contenedor padre.
                      'sizes' ayuda al navegador a descargar la imagen del tamaño correcto (móvil vs escritorio).
                    */}
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Opcional: Un gradiente sutil para mejorar contraste si añades texto encima */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index + 1
                    ? "bg-primary w-6" // Asegúrate de tener 'bg-primary' en tu config, o usa un color hexadecimal
                    : "bg-gray-300 w-2 hover:bg-gray-400"
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
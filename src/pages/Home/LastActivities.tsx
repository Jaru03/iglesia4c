'use client'

import Image from 'next/image'
import { Happy_Monkey } from 'next/font/google'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'

interface Slider {
  key: number
  title: string
  image: string
}

const happyMonkey = Happy_Monkey({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
})

const LastActivities = () => {

  const slider: Slider[] = [
    { key: 1, title: "Culto del Domingo", image: "/cultoDomingo-2.jpg" },
    { key: 2, title: "Culto del Domingo", image: "/cultoDomingo-1.jpg" },
    { key: 3, title: "Culto del Domingo", image: "/cultoDomingo-3.jpg" },
    { key: 4, title: "Santa Cena", image: "/cultoSantaCena-1.jpg" },
    { key: 5, title: "Santa Cena", image: "/cultoSantaCena-2.jpg" },
  ]

  return (
    <section>
      <div className='p-6 max-w-7xl mx-auto'>
        <h2 className='text-primary-3 text-2xl md:text-2xl-desktop text-center py-10'>Últimas Actividades</h2>


        <Swiper
          navigation={true}
          pagination={true}
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={20}
        >

          {slider.map((slider) => (

            <SwiperSlide key={slider.key} className="flex justify-center px-4 pb-14">
              <div className="bg-white p-6 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Image
                    width={1000}
                    height={1000}
                    src={slider.image}
                    alt={slider.title}
                    className='w-full h-full max-h-80 rounded-md'
                  />
                </div>
                <div className="mt-3 text-center">
                  <h3 className={`text-xl md:text-2xl text-gray-800 ${happyMonkey.className}`}>
                    {slider.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))
          }
        </Swiper>
      </div>
    </section>
  )
}

export default LastActivities

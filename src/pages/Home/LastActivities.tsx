'use client'

import Image from 'next/image'
import React from 'react'
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
    { key: 1, title: "Conferencia de Mujeres", image: "/cultomujeres.png" },
    { key: 2, title: "Santa Cena", image: "/santaCena.jpg" },
    { key: 3, title: "Servicio General", image: "/predica.jpg" },
  ]

  return (
    <section>
      <div className='p-6'>
        <h2 className='text-primary-2 text-2xl md:text-2xl-desktop text-center py-10'>Últimas Actividades</h2>


        <Swiper navigation={true} pagination={true} modules={[Pagination, Navigation]} className="mySwiper shadow-form  mb-20 p-10 max-w-[500px]">

          {slider.map((slider) => (

            <SwiperSlide key={slider.key}>
              <Image width={1000} height={1000} src={slider.image} alt='Image 1' className='w-full h-full min-w-[230px] p-4 xl:p-6 object-contain max-h-[500px]' />

              <h3 className={`text-xl md:text-xl-desktop py-5 pt-3 sm:pb-8 text-center ${happyMonkey.className}`}>{slider.title}</h3>
            </SwiperSlide>
          ))
          }
        </Swiper>
      </div>
    </section>
  )
}

export default LastActivities
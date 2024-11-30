import Image from 'next/image'
import React from 'react'
import {Happy_Monkey} from 'next/font/google'

const happyMonkey = Happy_Monkey({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
})

const LastActivities = () => {
  return (
    <section>
        <div className='p-6'>
            <h2 className='text-primary-2 text-2xl md:text-2xl-desktop text-center py-10'>Últimas Actividades</h2>

            <article className="flex flex-col items-center p-10 pb-0 shadow-form mb-20 max-w-[500px] mx-auto">
                <Image width={1000} height={1000} src='/santaCena.jpg' alt='Image 1' className='w-full h-full min-w-[230px] object-contain max-h-[80vh]' />

                <h3 className={`text-xl md:text-xl-desktop py-5 sm:py-10 ${happyMonkey.className}`}>Santa Cena</h3>
            </article>
        </div>
    </section>
  )
}

export default LastActivities
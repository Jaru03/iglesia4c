import Image from 'next/image'
import React from 'react'

const LastActivities = () => {
  return (
    <section>
        <div className='p-6'>
            <h2 className='text-primary-2 text-2xl md:text-2xl-desktop text-center py-10'>Últimas Actividades</h2>

            <article className="flex flex-col items-center p-2 sm:p-6 shadow-form mb-20 max-w-[500px] mx-auto">
                <Image width={1000} height={1000} src='/cultomujeres.png' alt='Image 1' className='w-full h-full object-contain max-h-[60vh]' />

                <h3 className='text-xl md:text-xl-desktop py-10'>Santa Cena</h3>
            </article>
        </div>
    </section>
  )
}

export default LastActivities
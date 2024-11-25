import Image from 'next/image'
import React from 'react'

const LastActivities = () => {
  return (
    <section>
        <div className='p-6'>
            <h2 className='text-primary-2 text-2xl text-center pb-14'>Últimas Actividades</h2>

            <article className="flex flex-col items-center p-2 sm:p-6 shadow-form mb-20 max-w-[600px] mx-auto">
                <Image width={1000} height={1000} src='/cultomujeres.png' alt='Image 1' className='w-full h-full object-contain max-h-[80vh]' />

                <h3 className='text-xl py-10'>Santa Cena</h3>
            </article>
        </div>
    </section>
  )
}

export default LastActivities
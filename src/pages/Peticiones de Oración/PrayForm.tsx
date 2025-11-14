'use client'

import Button from "@/ui/Button"
import Input from "@/ui/Input"
import emailjs from "@emailjs/browser"
import {FormEvent, useRef } from "react"
import toast from 'react-hot-toast'

const PrayForm = () => {

    const formPray = useRef<HTMLFormElement>(null)

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (!formPray.current) return

  const sendEmailPromise = emailjs.sendForm(
    process.env.NEXT_PUBLIC_SERVICE_ID_API_KEY!,
    process.env.NEXT_PUBLIC_TEMPLATE_ID_API_KEY!,
    formPray.current,
    { publicKey: process.env.NEXT_PUBLIC_PUBLIC_ID_API_KEY! }
  )

  toast.promise(sendEmailPromise, {
    loading: 'Enviando petición...',
    success: 'Petición enviada correctamente',
    error: 'Hubo un problema al enviar la petición'
  })

  try {
    await sendEmailPromise
    formPray.current.reset()
  } catch (error) {
    console.log(error)
  }
}


    return (
        <form ref={formPray} onSubmit={handleSubmit} className="w-full max-w-[500px] rounded-[20px] items-center shadow-form p-6 mb-10 grid grid-cols-2 gap-4">
            
            <h2 className="text-secundary-3 text-center text-xl col-span-full">Escribe tu petición</h2>

            <Input name="nombre" placeholder="Nombre" type="text" className="col-span-full" defaultValue={''} />
            <Input name="to" placeholder="Email" type="text" className="col-span-full" defaultValue={''} />
            <Input name="phone" placeholder="Teléfono" type="text" className="col-span-full" defaultValue={''} />
            <Input name="typePetition" placeholder="Tipo de Petición" className="col-span-full" type="text" defaultValue={''} />
            <textarea name="content" placeholder="Escribe tu petición" className=" col-span-full rounded-[5px] text-base md:text-base-desktop px-4 py-2 w-full resize-none innerShadowDonationCard" defaultValue={''} id=""/>
            <Button url="" variant="form" text="Enviar" className="mt-8 col-span-full"  />
        </form>
    )
}

export default PrayForm

'use client'

import Button from "@/ui/Button"
import Input from "@/ui/Input"
import emailjs from "@emailjs/browser"
import {FormEvent, useRef } from "react"

const PrayForm = () => {

    const formPray = useRef<HTMLFormElement>(null)

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!formPray.current){
            console.log('Formulario no disponible')
            return
        }

        try{

            const result = await emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID_API_KEY as string, process.env.NEXT_PUBLIC_TEMPLATE_ID_API_KEY as string , formPray.current, {
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_ID_API_KEY as string
            } )
            console.log('Email enviado exitosamente: ', result.text)
            formPray.current.reset()
        }catch (error){
            console.log(error)

        }
    }

    return (
        <form ref={formPray} onSubmit={handleSubmit} className="w-full max-w-[500px] rounded-[20px] items-center shadow-form p-6 mb-10 flex flex-col gap-4">
            <h2 className="text-secundary-3 text-center text-xl">Escribe tu petición y te estaremos apoyando en oración</h2>

            <Input name="nombre" placeholder="Nombre" type="text" defaultValue={''} />
            <Input name="to" placeholder="Email" type="text" defaultValue={''} />
            <Input name="date" type="date" />
            <div className="flex flex-col w-full gap-4 sm:flex-row">
                <Input name="genre" type="select" defaultValue={'masculino'} />
                <Input name="typePetition" placeholder="Tipo de Petición" type="text" defaultValue={''} />
            </div>
            <Input name="content" placeholder="Escribe tu petición" type="textarea" className="pb-32" defaultValue={''} />

            <Button url="" variant="form" text="Enviar" className="mt-8"  />
        </form>
    )
}

export default PrayForm

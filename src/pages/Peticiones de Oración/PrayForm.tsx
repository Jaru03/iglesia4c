"use client";

import Button from "@/ui/Button";
import Input from "@/ui/Input";
import emailjs from "@emailjs/browser";
import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";

const PrayForm = () => {
  const formPray = useRef<HTMLFormElement | null>(null);
  const checkBox = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formPray.current as HTMLFormElement);
    
    
    const nombre = formData.get("nombre")?.toString().trim();
    const email = formData.get("to")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const typePetition = formData.get("typePetition")?.toString().trim();
    const content = formData.get("content")?.toString().trim();
    
    if (!nombre) return toast.error("Debes ingresar tu nombre");
    if (!email || !email.includes("@")) return toast.error("Email inválido");
    if (!phone) return toast.error("Debes ingresar tu teléfono");
    if (!typePetition) return toast.error("Debes ingresar un tipo de petición");
    if (!content) return toast.error("Debes escribir tu petición");
    if (!checkBox.current?.checked)toast.error("Debes de aceptar los terminos y condiciones");
    

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
  };

  return (
    <form
      ref={formPray}
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] rounded-[20px] items-center shadow-form p-6 mb-10 grid grid-cols-2 gap-4"
    >
      <h2 className="text-secundary-3 text-center text-xl col-span-full">
        Escribe tu petición
      </h2>

      <Input
        name="nombre"
        placeholder="Nombre"
        type="text"
        className="col-span-full"
        defaultValue={""}
      />
      <Input
        name="to"
        placeholder="Email"
        type="text"
        className="col-span-full"
        defaultValue={""}
      />
      <Input
        name="phone"
        placeholder="Teléfono"
        type="text"
        className="col-span-full"
        defaultValue={""}
      />
      <Input
        name="typePetition"
        placeholder="Tipo de Petición"
        className="col-span-full"
        type="text"
        defaultValue={""}
      />
      <textarea
        name="content"
        placeholder="Escribe tu petición"
        className=" col-span-full rounded-[5px] text-base md:text-base-desktop px-4 py-2 w-full resize-none innerShadowDonationCard"
        defaultValue={""}
        id=""
      />
      <label className="col-span-full flex items-center gap-2">
        <input
          className="accent-primary-3 w-4 h-4"
          ref={checkBox}
          type="checkbox"
        />

        <span className="text-sm text-secundary-2 cursor-pointer filter hover:brightness-50">Aceptar Términos y condiciones</span>
      </label>
      <Button url="" variant="form" text="Enviar" className="col-span-full" />
    </form>
  );
};

export default PrayForm;

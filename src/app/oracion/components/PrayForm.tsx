"use client";

import Button from "@/ui/Button";
import Input from "@/ui/Input";
import emailjs from "@emailjs/browser";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Heart, User, Mail, Phone, MessageSquare, Send, Loader2, HandHeart } from "lucide-react";

const PrayForm = () => {
  const formPray = useRef<HTMLFormElement | null>(null);
  const checkBox = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!checkBox.current?.checked) return toast.error("Debes aceptar los términos y condiciones");

    if (!formPray.current) return;

    setIsSubmitting(true);

    const sendEmailPromise = emailjs.sendForm(
      process.env.NEXT_PUBLIC_SERVICE_ID_API_KEY!,
      process.env.NEXT_PUBLIC_TEMPLATE_ID_API_KEY!,
      formPray.current,
      { publicKey: process.env.NEXT_PUBLIC_PUBLIC_ID_API_KEY! }
    );

    toast.promise(sendEmailPromise, {
      loading: 'Enviando petición...',
      success: 'Petición enviada correctamente',
      error: 'Hubo un problema al enviar la petición'
    });

    try {
      await sendEmailPromise;
      formPray.current.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        ref={formPray}
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-3 to-primary-2 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <HandHeart className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Escribe tu petición</h2>
          <p className="text-white/90 text-sm">Tu petición será atendida con fe y confidencialidad</p>
        </div>

        {/* Form Fields */}
        <div className="p-8 space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-3" />
              Información Personal
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4" />
                  Nombre Completo *
                </label>
                <Input
                  name="nombre"
                  placeholder="Ingresa tu nombre completo"
                  type="text"
                  className="w-full"
                  defaultValue={""}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4" />
                  Correo Electrónico *
                </label>
                <Input
                  name="to"
                  placeholder="tu@email.com"
                  type="text"
                  className="w-full"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4" />
                Teléfono *
              </label>
              <Input
                name="phone"
                placeholder="+34 600 000 000"
                type="text"
                className="w-full"
                defaultValue={""}
              />
            </div>
          </div>

          {/* Petition Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-3" />
              Detalles de la Petición
            </h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <HandHeart className="w-4 h-4" />
                Tipo de Petición *
              </label>
              <Input
                name="typePetition"
                placeholder="Ej: Oración por salud, familia, trabajo..."
                type="text"
                className="w-full"
                defaultValue={""}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MessageSquare className="w-4 h-4" />
                Tu Petición *
              </label>
              <textarea
                name="content"
                placeholder="Escribe aquí tu petición de oración. Sé específico sobre lo que necesitas y comparte cualquier detalle que consideres importante..."
                className="w-full px-4 py-3 text-base bg-white border-2 border-gray-200 rounded-xl focus:border-primary-3 focus:ring-4 focus:ring-primary-3/10 focus:outline-none hover:border-gray-300 transition-all duration-200 placeholder:text-gray-400 resize-none"
                rows={5}
                defaultValue={""}
              />
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                className="mt-1 w-4 h-4 text-primary-3 bg-gray-100 border-gray-300 rounded focus:ring-primary-3 focus:ring-2 accent-primary-3"
                ref={checkBox}
                type="checkbox"
              />
              <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                Acepto los <span className="text-primary-3 font-medium hover:underline">términos y condiciones</span> y
                entiendo que mi petición será tratada con confidencialidad absoluta.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-3 hover:bg-primary-3-hover text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Petición
                </>
              )}
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
            <p>Tu petición será atendida por nuestro equipo pastoral con oración y discreción.</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrayForm;

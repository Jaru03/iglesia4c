"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HandHeart, Mail, Phone, MessageSquare, Send, Loader2, User } from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const praySchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  typePetition: z.string().min(1, "Selecciona un tipo de petición"),
  content: z.string().min(10, "La petición debe tener al menos 10 caracteres"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

type PrayFormData = z.infer<typeof praySchema>;

const PrayForm = () => {
  const form = useForm<PrayFormData>({
    resolver: zodResolver(praySchema),
    defaultValues: {
      nombre: "",
      email: "",
      phone: "",
      typePetition: "",
      content: "",
      acceptTerms: false,
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit = async (data: PrayFormData) => {
    try {
      setIsSubmitting(true);

      const sendEmailPromise = emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID_API_KEY!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID_API_KEY!,
        form.getValues() as unknown as HTMLFormElement,
        { publicKey: process.env.NEXT_PUBLIC_PUBLIC_ID_API_KEY! }
      );

      toast.promise(sendEmailPromise, {
        loading: "Enviando petición...",
        success: "Petición enviada correctamente",
        error: "Hubo un problema al enviar la petición",
      });

      await sendEmailPromise;
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setIsSubmitting = (value: boolean) => {
    form.setValue("content" as never, value as never);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-linear-to-r from-primary-3 to-primary-2 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <HandHeart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Escribe tu petición</h2>
            <p className="text-white/90 text-sm">
              Tu petición será atendida con fe y confidencialidad
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-3" />
                Información Personal
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nombre Completo *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa tu nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Correo Electrónico *
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Teléfono *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+34 600 000 000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-3" />
                Detalles de la Petición
              </h3>

              <FormField
                control={form.control}
                name="typePetition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <HandHeart className="w-4 h-4" />
                      Tipo de Petición *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ej: Oración por salud, familia, trabajo..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="salud">Oración por salud</SelectItem>
                        <SelectItem value="familia">Oración por familia</SelectItem>
                        <SelectItem value="trabajo">Oración por trabajo</SelectItem>
                        <SelectItem value="finanzas">Oración por finanzas</SelectItem>
                        <SelectItem value="otros">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Tu Petición *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe aquí tu petición de oración..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6 pt-4 border-t border-gray-100">
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-600">
                          Acepto los{" "}
                          <span className="text-primary-3 font-medium hover:underline cursor-pointer">
                            términos y condiciones
                          </span>{" "}
                          y entiendo que mi petición será tratada con confidencialidad absoluta.
                        </FormLabel>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
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
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
              <p>
                Tu petición será atendida por nuestro equipo pastoral con oración y discreción.
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PrayForm;

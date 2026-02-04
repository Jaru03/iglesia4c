"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, DollarSign, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const payOnlineSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  mount: z.string().min(1, "El monto es obligatorio").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    "El monto debe ser mayor a 0"
  ),
  typeDonative: z.string().min(1, "Selecciona un tipo de donativo"),
});

type PayOnlineForm = z.infer<typeof payOnlineSchema>;

const PayOnline = () => {
  const form = useForm<PayOnlineForm>({
    resolver: zodResolver(payOnlineSchema),
    defaultValues: {
      name: "",
      mount: "",
      typeDonative: "",
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit = async (data: PayOnlineForm) => {
    try {
      setIsSubmitting(true);
      const dataPay = {
        mount: +data.mount * 100,
        donant: data.name,
        typeDonative: data.typeDonative,
      };

      const res = await axios.post("/api/checkout", dataPay);
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Error al procesar el pago:", err);
      toast.error("Error al procesar el pago. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setIsSubmitting = (value: boolean) => {
    form.setValue("mount" as never, value as never);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="bg-linear-to-r from-primary-3 to-primary-2 p-6 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <CreditCard className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Pago en Línea</h2>
        <p className="text-white/90 text-sm mt-1">Pago seguro con Stripe</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Nombre
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeDonative"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Tipo de Donativo
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Ofrenda">Ofrenda</SelectItem>
                    <SelectItem value="Diezmo">Diezmo</SelectItem>
                    <SelectItem value="Obra social">Obra social</SelectItem>
                    <SelectItem value="Misiones">Misiones</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Monto (€)
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
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
                Procesando...
              </>
            ) : (
              "Realizar Pago"
            )}
          </Button>

          <div className="text-center text-xs text-gray-500 mt-4">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              Conexión segura SSL
            </div>
            <p>Tus datos están protegidos</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PayOnline;

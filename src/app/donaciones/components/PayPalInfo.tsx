"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DollarSign, Shield, CheckCircle } from "lucide-react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import type { CreateOrderData, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
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

const donateSchema = z.object({
  mount: z.string().min(1, "El monto es obligatorio").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    "El monto debe ser mayor a 0"
  ),
  typeDonative: z.string().min(1, "Selecciona un tipo de donativo"),
});

type DonateForm = z.infer<typeof donateSchema>;

const PayPalInfo = () => {
  const form = useForm<DonateForm>({
    resolver: zodResolver(donateSchema),
    defaultValues: {
      mount: "",
      typeDonative: "",
    },
  });

  const { watch, formState: { isSubmitting } } = form;
  const mountValue = watch("mount");
  const typeDonativeValue = watch("typeDonative");

  const createOrder = async (): Promise<string> => {
    try {
      const response = await axios.post("/api/payPalCheckout", {
        mount: form.getValues("mount"),
        typeDonative: form.getValues("typeDonative"),
      });
      return response.data.id;
    } catch (error) {
      console.error("Error al crear la orden de PayPal:", error);
      toast.error("No se pudo crear la orden. Inténtalo de nuevo.");
      throw error;
    }
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
    if (actions.order) {
      window.location.href = "/success";
      await actions.order.capture();
    }
  };

  const onError = (err: unknown): void => {
    console.error("PayPal error:", err);
    toast.error("Error en el pago. Por favor, inténtalo de nuevo.");
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl mx-auto shadow-2xl border border-gray-100 overflow-hidden">
      <div className="bg-linear-to-r from-blue-600 to-blue-700 p-6 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">PayPal</h2>
        <p className="text-white/90 text-sm mt-1">Pago seguro con PayPal</p>
      </div>

      <Form {...form}>
        <form className="p-8 space-y-6">
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

          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
              currency: "EUR",
              disableFunding: "card",
            }}
          >
            <PayPalButtons
              style={{
                color: "blue",
                layout: "vertical",
                label: "donate",
                shape: "rect",
                height: 45,
              }}
              disabled={!mountValue || !typeDonativeValue || isSubmitting}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </PayPalScriptProvider>

          <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Pago 100% seguro</span>
            </div>
            <p>Protegido por PayPal y SSL</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PayPalInfo;

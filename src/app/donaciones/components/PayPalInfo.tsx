"use client";

import Input from "@/ui/Input";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRef, useState } from "react";
import { DollarSign, Shield, CheckCircle } from "lucide-react";

const PayPalInfo = () => {
  const mount = useRef<HTMLInputElement | null>(null);
  const typeDonative = useRef<HTMLSelectElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateOrder = async () => {
    try {
      if (!mount.current?.value || !typeDonative.current?.value) {
        alert('Por favor, completa todos los campos');
        return;
      }

      if (parseFloat(mount.current.value) <= 0) {
        alert('El monto debe ser mayor a 0');
        return;
      }

      setIsProcessing(true);

      const response = await axios.post("/api/payPalCheckout", {
        mount: mount.current.value,
        typeDonative: typeDonative.current.value,
      });
      return response.data.id;
    } catch (error) {
      console.error("Error al crear la orden de PayPal:", error);
      alert("No se pudo crear la orden. Inténtalo de nuevo.");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl mx-auto shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">PayPal</h2>
        <p className="text-white/90 text-sm mt-1">Pago seguro con PayPal</p>
      </div>

      {/* Form */}
      <div className="p-8 space-y-6">
        {/* Donation Type Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <DollarSign className="w-4 h-4" />
            Tipo de Donativo
          </label>
          <Input
            ref={typeDonative}
            type="select"
            className="w-full"
          />
        </div>

        {/* Amount Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <DollarSign className="w-4 h-4" />
            Monto (€)
          </label>
          <Input
            ref={mount}
            placeholder="0.00"
            type="number"
            className="w-full"
          />
        </div>

        {/* PayPal Buttons */}
        <div className="space-y-4">
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
              currency: "EUR",
              disableFunding: "card"
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
              disabled={isProcessing}
              createOrder={handleCreateOrder}
              onApprove={(data, actions) => {
                if (actions.order) {
                  window.location.href = "/success";
                  console.log(data);
                  return actions.order.capture().then((details) => {
                    console.log("Payment completed!", details);
                  });
                } else {
                  return Promise.resolve();
                }
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                alert("Error en el pago. Por favor, inténtalo de nuevo.");
              }}
            />
          </PayPalScriptProvider>
        </div>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="font-medium">Pago 100% seguro</span>
          </div>
          <p>Protegido por PayPal y SSL</p>
        </div>
      </div>
    </div>
  );
};

export default PayPalInfo;

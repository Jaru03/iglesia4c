"use client";

import Input from "@/ui/Input";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRef } from "react";

const PayPalInfo = () => {
  const handleCreateOrder = async () => {
    try {
      if (mount.current && typeDonative.current) {
        const response = await axios.post("/api/payPalCheckout", {
          mount: mount.current.value,
          typeDonative: typeDonative.current.value,
        });
        return response.data.id;
      }
    } catch (error) {
      console.error("Error al crear la orden de PayPal:", error);
      throw new Error("No se pudo crear la orden. Inténtalo de nuevo.");
    }
  };

  const mount = useRef<HTMLInputElement | null>(null);
  const typeDonative = useRef<HTMLSelectElement | null>(null);

  return (
    <div className="w-full max-w-lg shadow-form p-6 rounded-[20px] text-base md:text-base-desktop">
      <form className="flex flex-col gap-4">
        <h2 className="text-secundary-3 text-center text-xl md:text-xl-desktop">
          PayPal
        </h2>
        <Input ref={typeDonative} type="select" />
        <Input ref={mount} placeholder="Monto del donativo" type="number" />

        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
          }}
        >
          <PayPalButtons
            style={{
              color: "blue",
              layout: "horizontal",
              label: "donate",
            }}
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
          />
        </PayPalScriptProvider>
      </form>
    </div>
  );
};

export default PayPalInfo;

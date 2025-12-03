import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET_ID;

const environment = new paypal.core.SandboxEnvironment(
  clientId as string,
  clientSecret as string
);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const orderRequest = new paypal.orders.OrdersCreateRequest();

    orderRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: body.mount,
            breakdown: {
              item_total: { currency_code: "EUR", value: body.mount },
              discount: { currency_code: "EUR", value: "0.00" },
              handling: { currency_code: "EUR", value: "0.00" },
              insurance: { currency_code: "EUR", value: "0.00" },
              shipping_discount: { currency_code: "EUR", value: "0.00" },
              shipping: { currency_code: "EUR", value: "0.00" },
              tax_total: { currency_code: "EUR", value: "0.00" }
            }
          },
          items: [
            {
              name: body.typeDonative,
              description: "Donación para la iglesia",
              quantity: "1",
              unit_amount: {
                currency_code: "EUR",
                value: body.mount
              },
              category: "DIGITAL_GOODS"
            }
          ]
        }
      ]
    });

    const response = await client.execute(orderRequest);

    return NextResponse.json({ id: response.result.id });

  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

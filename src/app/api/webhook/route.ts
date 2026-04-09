import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe"

export async function POST(request: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    const body = await request.text()

    const headerList = headers()

    const sig = (await headerList).get('stripe-signature')

    try {
        stripe.webhooks.constructEvent(body, sig as string | Buffer<ArrayBufferLike> | string[], endpointSecret as string)
    } catch (error: unknown) {

        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        } else {
            // Si el error no es un Error, devolvemos un mensaje genérico
            return new NextResponse("Error inesperado", { status: 500 });
        }
    }

    return new Response(null, {status: 200});
}
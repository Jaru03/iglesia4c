import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe("sk_test_51Qk9xlFTDIaTWkhjSy9FZIgNwfbIlsQbQXXaE9qXV0TC0zp1rdlhCOiJkXvjsFUjPZWGwFNgzZHhUZuYza4g17gu00mcF4egAF");

const endpointSecret = "whsec_RR2ewIBGAQfMnT3HqQZ7vjI2sp9O8x7X"

export async function POST(request: Request) {

    const body = await request.text()

    const headerList = headers()

    const sig = (await headerList).get('stripe-signature')

    try {
        stripe.webhooks.constructEvent(body, sig as string | Buffer<ArrayBufferLike> | string[], endpointSecret)
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
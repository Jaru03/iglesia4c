import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {

    const body = await request.json();

    const session = await stripe.checkout.sessions.create({
        success_url: 'https://iglesia4c.vercel.app/success', 
        line_items: [
            {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: body.typeDonative,
                    },
                    unit_amount: body.mount, 
                },
                quantity: 1
            },
        ],
        metadata:{
            typeDonative: body.typeDonative
        },
        mode: 'payment',
    });

    return NextResponse.json(session)
}
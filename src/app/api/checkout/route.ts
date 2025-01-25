import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51Qk9xlFTDIaTWkhjSy9FZIgNwfbIlsQbQXXaE9qXV0TC0zp1rdlhCOiJkXvjsFUjPZWGwFNgzZHhUZuYza4g17gu00mcF4egAF");

export async function POST(request: Request) {

    const body = await request.json();

    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/success',
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
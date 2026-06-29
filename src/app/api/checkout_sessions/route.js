import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';



export async function POST() {
  try {
    const headersList = await headers()
    const baseUrl = process.env.BETTER_AUTH_URL;


    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',

      success_url: `${baseUrl}/dashboard/user/paymant/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${baseUrl}/browse`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
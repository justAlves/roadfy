import { stripe } from '../../../../../lib/stripeClient';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const { user_id } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      metadata: {
        user_id, // Inclui o ID do usuário como metadata
      },
    });

    return NextResponse.json({ sessionUrl: session.url });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Erro ao criar assinatura:', error.message);
    return NextResponse.json(
      { error: 'Falha ao criar a assinatura', details: error.message },
      { status: 500 }
    );
  }
}

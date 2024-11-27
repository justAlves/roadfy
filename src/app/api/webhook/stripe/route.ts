import { supabase } from '../../../../../lib/supabaseClient'; 
import {stripe} from '../../../../../lib/stripeClient';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';


export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Erro ao verificar o webhook:', err.message);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }

  // Processar eventos específicos
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id; // Supor que o `user_id` foi enviado como metadata

      const subscriptionId = session.subscription as string;

      // Atualizar o usuário no Supabase
      if (userId) {
        const { error } = await supabase
          .from('users')
          .update({
            is_subscriber: true,
            subscription_id: subscriptionId,
          })
          .eq('id', userId);

        if (error) {
          console.error('Erro ao atualizar usuário no Supabase:', error.message);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;

      // Encontrar o usuário no Supabase pelo `subscription_id`
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('subscription_id', subscription.id)
        .single();

      if (fetchError) {
        console.error('Erro ao buscar usuário no Supabase:', fetchError.message);
        break;
      }

      if (user) {
        const { error } = await supabase
          .from('users')
          .update({
            is_subscriber: false,
            subscription_id: null,
          })
          .eq('id', user.id);

        if (error) {
          console.error('Erro ao atualizar usuário no Supabase:', error.message);
        }
      }
      break;
    }

    default:
      console.log(`Evento não tratado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

import { stripe } from '../../../../../lib/stripeClient'; 
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { subscriptionId } = await request.json();

  try {
    const cancellation = await stripe.subscriptions.cancel(subscriptionId);

    return NextResponse.json({ status: cancellation.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

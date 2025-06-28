import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { paymentIntentId } = body;

    if (!paymentIntentId) {
      return Response.json({ error: 'Missing paymentIntentId' }, { status: 400 });
    }

    await stripe.paymentIntents.cancel(paymentIntentId);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error cancelling payment intent:', error);
    return Response.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

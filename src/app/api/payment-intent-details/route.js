import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Missing payment intent id' }, { status: 400 });
    }

    const intent = await stripe.paymentIntents.retrieve(id);
    return Response.json({
      id: intent.id,
      amount: intent.amount,
      receipt_email: intent.receipt_email,
      customer_email: intent.customer_email,
      status: intent.status,
      metadata: intent.metadata,
    });
  } catch (error) {
    return Response.json(
      { error: error.message || 'Failed to fetch payment intent' },
      { status: 500 },
    );
  }
}

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, metadata = {}, paymentIntentId } = body;

    if (!amount || amount < 1) {
      return Response.json({ error: 'Please provide a valid amount' }, { status: 400 });
    }

    let paymentIntent;

    if (paymentIntentId) {
      // Try to update existing PaymentIntent
      try {
        paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
          amount,
          metadata,
        });
      } catch (err) {
        // If update fails (e.g., intent not found or already confirmed), create a new one
        paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
          metadata,
          automatic_payment_methods: { enabled: true },
        });
      }
    } else {
      // Create a new PaymentIntent
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        metadata,
        automatic_payment_methods: { enabled: true },
      });
    }

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating/updating payment intent:', error);
    return Response.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, metadata = {} } = body;

    if (!amount || amount < 1) {
      return Response.json({ error: 'Please provide a valid amount' }, { status: 400 });
    }

    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency: 'usd',
      metadata,
      // Configure automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client_secret to the client
    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return Response.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

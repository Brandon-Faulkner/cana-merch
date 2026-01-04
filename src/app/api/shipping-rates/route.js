import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const shippingRates = await stripe.shippingRates.list({
      active: true,
      limit: 5,
    });

    // Format the rates for the frontend
    const formattedRates = shippingRates.data.map((rate) => ({
      id: rate.id,
      label: rate.display_name,
      cost: rate.fixed_amount?.amount ? rate.fixed_amount.amount / 100 : 0,
      days: rate.metadata?.delivery_days || 'Standard',
      stripeRateId: rate.id,
    }));

    return Response.json(formattedRates);
  } catch (error) {
    console.error('Error fetching shipping rates:', error);
    return Response.json({ error: 'Failed to fetch shipping rates' }, { status: 500 });
  }
}

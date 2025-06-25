import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Fetch the specific product from Stripe
    const product = await stripe.products.retrieve(id, {
      expand: ['default_price'],
    });

    if (!product || !product.active) {
      return Response.json({ error: 'Product not found or inactive' }, { status: 404 });
    }

    // Format the product data
    const price = product.default_price;
    const priceAmount = price ? price.unit_amount / 100 : 0; // Convert from cents to dollars

    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: priceAmount,
      image: product.images[0] || 'https://placehold.co/400x500',
      category: product.metadata.category || 'uncategorized',
      isFeatured: product.metadata.featured === 'true',
      isNew: product.metadata.new === 'true',
      variants: product.metadata.variants ? product.metadata.variants.split(',') : [],
      colors: product.metadata.colors ? product.metadata.colors.split(',') : [],
      details: product.metadata.details ? product.metadata.details.split('|') : [],
      inStock: !product.metadata.out_of_stock,
      rating: parseFloat(product.metadata.rating || '4.5'),
      reviews: parseInt(product.metadata.reviews || '0'),
    };

    return Response.json(formattedProduct);
  } catch (error) {
    console.error(`Error fetching product ${params.id} from Stripe:`, error);

    if (error.statusCode === 404) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ error: error.message || 'Failed to fetch product' }, { status: 500 });
  }
}

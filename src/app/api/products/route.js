import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    // Get the search parameters from the request
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Fetch products from Stripe
    const products = await stripe.products.list({
      active: true,
      limit,
      expand: ['data.default_price'],
    });

    // Map Stripe products to our application format
    let formattedProducts = products.data.map((product) => {
      const price = product.default_price;
      const priceAmount = price ? price.unit_amount / 100 : 0; // Convert from cents to dollars

      return {
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
    });

    // Filter products by category if provided
    if (category && category !== 'all') {
      formattedProducts = formattedProducts.filter((p) => p.category === category);
    }

    // Filter by featured if provided
    if (featured === 'true') {
      formattedProducts = formattedProducts.filter((p) => p.isFeatured);
    }

    return Response.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products from Stripe:', error);
    return Response.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

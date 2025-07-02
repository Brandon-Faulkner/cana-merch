import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '100');

    const products = await stripe.products.list({
      active: true,
      limit,
      expand: ['data.default_price'],
    });

    let filteredProducts = products.data
      .filter((p) => p.metadata.category?.trim())
      .map((product) => {
        const price = product.default_price;
        const priceAmount = price ? price.unit_amount / 100 : 0;
        return {
          id: product.id,
          name: product.name,
          description: product.description || '',
          price: priceAmount,
          image: product.images[0] || 'https://placehold.co/400x500',
          category: product.metadata.category,
          isFeatured: product.metadata.featured === 'true',
          isNew: product.metadata.new === 'true',
          variants: product.metadata.variants ? product.metadata.variants.split(',') : [],
          colors: product.metadata.colors ? product.metadata.colors.split(',') : [],
          details: product.metadata.details ? product.metadata.details.split('|') : [],
          inStock: product.metadata.in_stock === 'true',
        };
      });

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    if (featured === 'true') {
      filteredProducts = filteredProducts.filter((p) => p.isFeatured);
    }

    return Response.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products from Stripe:', error);
    return Response.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

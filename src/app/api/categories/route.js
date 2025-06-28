import { getCategories } from '@/lib/api/products';

export async function GET() {
  try {
    const categories = await getCategories();

    return Response.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json({ error: error.message || 'Failed to fetch categories' }, { status: 500 });
  }
}

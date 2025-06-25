'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

// Mock product data - in a real app, this would come from an API or database
const products = [
  {
    id: '1',
    name: 'Cana Logo T-Shirt',
    description: 'A comfortable cotton t-shirt featuring our church logo',
    price: 20.0,
    image: 'https://placehold.co/400x500',
    category: 't-shirts',
    isFeatured: true,
    isNew: true,
  },
  {
    id: '2',
    name: 'Faith Coffee Mug',
    description: 'Start your morning with faith using this 12oz ceramic mug',
    price: 12.5,
    image: 'https://placehold.co/400x500',
    category: 'mugs',
    isFeatured: true,
    isNew: false,
  },
  {
    id: '3',
    name: 'Cross Pendant Necklace',
    description: 'Beautiful stainless steel cross necklace with 18-inch chain',
    price: 18.99,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Scripture Journal',
    description: 'Hardcover journal with scripture verses on each page',
    price: 15.0,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: true,
    isNew: false,
  },
  {
    id: '5',
    name: 'Be Still T-Shirt',
    description: "Comfortable t-shirt with 'Be Still and Know' verse",
    price: 22.0,
    image: 'https://placehold.co/400x500',
    category: 't-shirts',
    isFeatured: false,
    isNew: true,
  },
  {
    id: '6',
    name: 'Prayer Journal',
    description: 'Guided prayer journal with prompts and scripture references',
    price: 16.5,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: false,
    isNew: false,
  },
  {
    id: '7',
    name: 'Church Logo Cap',
    description: 'Embroidered cap with church logo',
    price: 18.0,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: false,
    isNew: true,
  },
  {
    id: '8',
    name: 'Scripture Mug - Psalm 23',
    description: 'Ceramic mug with Psalm 23 verse',
    price: 14.0,
    image: 'https://placehold.co/400x500',
    category: 'mugs',
    isFeatured: false,
    isNew: false,
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Search products based on the query
  const searchResults = products.filter((product) => {
    const searchTerm = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <div className='mb-8 space-y-4'>
        <h1 className='text-3xl font-bold'>Search Results: "{query}"</h1>
        <p className='text-muted-foreground'>
          {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {searchResults.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className='py-16 text-center'>
          <div className='bg-muted mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full'>
            <Search className='text-muted-foreground h-8 w-8' />
          </div>
          <h2 className='mb-2 text-xl font-medium'>No products found</h2>
          <p className='text-muted-foreground mb-6'>
            We couldn't find any products matching "{query}". Please try a different search term.
          </p>
          <Button asChild>
            <Link href='/category/all'>Browse All Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

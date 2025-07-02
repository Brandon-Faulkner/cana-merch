import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';

export function FeaturedSection({ featuredProducts }) {
  return (
    <section className='py-12'>
      <div className='m-auto max-w-7xl px-4 md:px-6'>
        <h2 className='mb-10 text-center text-2xl font-bold'>Featured Merch</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className='mt-10 text-center'>
          <Button variant='outline' size='lg' asChild>
            <Link href='/category/all'>View All Merch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

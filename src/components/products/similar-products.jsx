import { ProductCard } from '@/components/products/product-card';

export function SimilarProducts({ similarProducts }) {
  return (
    <div className='animate-in fade-in-0 zoom-in-95 mt-16 transition-all duration-300 ease-in-out'>
      <h2 className='mb-6 text-2xl font-bold'>You May Also Like</h2>
      {similarProducts.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {similarProducts.map((similarProduct) => (
            <ProductCard key={similarProduct.id} product={similarProduct} />
          ))}
        </div>
      ) : (
        <p className='text-muted-foreground'>No similar merch found.</p>
      )}
    </div>
  );
}

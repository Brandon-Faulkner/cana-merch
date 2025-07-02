import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

export function SimilarProducts({ similarProducts }) {
  return (
    <div className='mt-16'>
      <h2 className='mb-6 text-2xl font-bold'>You May Also Like</h2>
      {similarProducts.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {similarProducts.map((similarProduct) => (
            <Card key={similarProduct.id} className='overflow-hidden'>
              <div className='relative aspect-square'>
                <Image
                  src={similarProduct.image}
                  alt={similarProduct.name}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 50vw, 25vw'
                />
              </div>
              <CardContent className='p-4'>
                <h3 className='line-clamp-1 font-medium'>{similarProduct.name}</h3>
                <p className='mt-1 text-sm'>{formatPrice(similarProduct.price)}</p>
                <Button asChild variant='outline' size='sm' className='mt-2 w-full'>
                  <Link href={`/product/${similarProduct.id}`}>View</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className='text-muted-foreground'>No similar merch found.</p>
      )}
    </div>
  );
}

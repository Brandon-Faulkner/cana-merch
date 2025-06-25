import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product }) {
  return (
    <Card className='h-full overflow-hidden'>
      <div className='relative aspect-square overflow-hidden'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          className='object-cover transition-transform duration-300 hover:scale-105'
        />
        {product.isNew && <Badge className='absolute top-3 right-3'>New</Badge>}
      </div>
      <CardContent className='p-4'>
        <CardTitle className='mb-2 line-clamp-1'>{product.name}</CardTitle>
        <p className='text-muted-foreground mb-2 line-clamp-2 text-sm'>{product.description}</p>
        <p className='font-medium'>{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        <Button asChild className='w-full'>
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className='h-full overflow-hidden py-0'>
      <div className='relative aspect-square overflow-hidden'>
        {imageLoading && <Skeleton className='absolute inset-0 z-10' />}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          className='object-cover transition-transform duration-300 hover:scale-105'
          onLoad={() => setImageLoading(false)}
        />
        {product.isNew && <Badge className='absolute top-3 right-3 z-20'>New</Badge>}
      </div>
      <CardContent className='p-4'>
        <CardTitle className='mb-2 line-clamp-1 leading-5'>{product.name}</CardTitle>
        <p className='text-muted-foreground mb-2 line-clamp-2 text-sm'>{product.description}</p>
        <p className='font-medium'>{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        <Button asChild className='w-full'>
          <Link href={`/product/${product.id}`}>
            <Info />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

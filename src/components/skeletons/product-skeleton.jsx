import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeleton() {
  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <Skeleton className='mb-6 h-10 w-36' />

      <div className='grid gap-8 md:grid-cols-2'>
        {/* Product Image Skeleton */}
        <div className='bg-muted relative aspect-square overflow-hidden rounded-lg border'>
          <Skeleton className='h-full w-full' />
        </div>

        {/* Product Details Skeleton */}
        <div className='space-y-6'>
          <div>
            <Skeleton className='mb-2 h-8 w-3/4' />
            <Skeleton className='h-6 w-1/3' />
          </div>

          <Skeleton className='h-24 w-full' />

          <div className='space-y-4'>
            <div>
              <Skeleton className='mb-2 h-4 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>

            <div>
              <Skeleton className='mb-2 h-4 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <Skeleton className='h-10 w-28' />
            <Skeleton className='h-10 w-full' />
          </div>

          <Separator />

          <div>
            <Skeleton className='mb-2 h-5 w-36' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
              <Skeleton className='h-4 w-4/6' />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Merch Skeleton */}
      <div className='mt-16'>
        <Skeleton className='mb-6 h-7 w-48' />
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className='h-full overflow-hidden py-0'>
              <Skeleton className='aspect-square w-full' />
              <CardContent className='p-4'>
                <Skeleton className='mb-2 h-5 w-4/5' />
                <Skeleton className='mb-3 h-4 w-1/3' />
                <Skeleton className='h-8 w-full' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

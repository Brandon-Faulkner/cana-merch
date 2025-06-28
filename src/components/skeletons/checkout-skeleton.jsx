import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function CheckoutSkeleton() {
  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <div className='grid gap-8 lg:grid-cols-2'>
        {/* Order Summary Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className='h-7 w-40' />
            <Skeleton className='h-5 w-60' />
          </CardHeader>
          <CardContent className='space-y-4'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='flex gap-4'>
                <Skeleton className='h-20 w-20 rounded-md' />
                <div className='flex flex-1 flex-col justify-between py-1'>
                  <Skeleton className='h-5 w-3/4' />
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                </div>
              </div>
            ))}
            <Separator />
            <div className='space-y-1'>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-16' />
              </div>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-16' />
              </div>
              <div className='flex justify-between font-bold'>
                <Skeleton className='h-5 w-24' />
                <Skeleton className='h-5 w-20' />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className='h-7 w-40' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-10 w-full' />
            </div>
            <Separator />
            <div className='space-y-2'>
              <Skeleton className='h-5 w-48' />
              <Skeleton className='h-36 w-full' />
            </div>
            <Skeleton className='h-12 w-full' />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

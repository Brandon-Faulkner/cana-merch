import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoriesSkeleton() {
  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <div className='mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0'>
        <Skeleton className='h-9 w-48' />
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-10 w-[180px]' />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className='h-full overflow-hidden py-0'>
            <div className='relative'>
              <Skeleton className='aspect-square w-full' />
            </div>
            <div className='space-y-3 p-4'>
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-4 w-1/3' />
              <Skeleton className='h-10 w-full' />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

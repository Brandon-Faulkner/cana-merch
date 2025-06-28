import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SearchSkeleton() {
  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <div className='mb-8'>
        <div className='flex items-center gap-2'>
          <Search className='text-muted-foreground h-5 w-5' />
          <Skeleton className='h-9 w-64' />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className='overflow-hidden'>
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

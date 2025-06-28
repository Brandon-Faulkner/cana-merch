import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className='relative overflow-hidden py-24'>
      <div className='m-auto max-w-7xl px-4 md:px-6'>
        <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Quality Church Merchandise for Your Faith Journey
            </h1>
            <p className='text-gray-500 md:text-xl dark:text-gray-400'>
              Share your faith with our premium collection of church merchandise. From comfortable
              t-shirts to inspiring accessories.
            </p>
            <div className='flex flex-col gap-2 sm:flex-row'>
              <Button size='lg' asChild>
                <Link href='/category/all'>Shop Now</Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href='#categories'>Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className='relative h-[400px] w-full'>
            <Image
              src='https://placehold.co/800x600'
              alt='Featured church merchandise'
              fill
              className='rounded-lg object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

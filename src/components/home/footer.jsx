import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function FooterSection() {
  return (
    <section className='bg-muted/50 py-12'>
      <div className='m-auto max-w-7xl px-4 md:px-6'>
        <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='relative h-[300px] w-full'>
            <Image
              src='https://placehold.co/600x400'
              alt='Our church community'
              fill
              className='rounded-lg object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tighter'>Our Mission</h2>
            <p className='text-gray-500 dark:text-gray-400'>
              Our merchandise isn't just about fashion—it's about sharing faith and supporting our
              church's mission. Every purchase helps fund community outreach programs and church
              initiatives.
            </p>
            <Button variant='outline' asChild>
              <Link href='/about'>Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

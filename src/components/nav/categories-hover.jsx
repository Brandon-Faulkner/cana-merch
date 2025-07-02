import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export function CategoriesHover({ pathname, categories }) {
  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant='ghost' className='flex items-center gap-1 px-3 py-2'>
          Categories
          <ChevronDown className='h-4 w-4 opacity-50' />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-64 p-2'>
        <div className='grid gap-1'>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`hover:bg-muted flex items-center rounded-md px-3 py-2 text-sm ${
                pathname === category.href ? 'bg-muted font-medium' : ''
              }`}
            >
              {category.image && (
                <div className='mr-2 h-8 w-8 overflow-hidden rounded-md'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={32}
                    height={32}
                    className='h-full w-full object-cover'
                  />
                </div>
              )}
              {category.name}
            </Link>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

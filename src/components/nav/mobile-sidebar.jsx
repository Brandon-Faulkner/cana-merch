import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export function MobileSidebar({
  pathname,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleSearch,
  searchQuery,
  setSearchQuery,
  categories,
}) {
  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild className='md:hidden'>
        <Button size='icon' variant='ghost'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-60 px-4 sm:w-[300px]'>
        <div className='flex flex-col gap-6 pt-6'>
          <SheetTitle>
            <Link
              href='/'
              className='flex items-center gap-2 text-xl font-bold'
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src='/android-chrome-192x192.png'
                alt='Cana Merch Logo'
                width={24}
                height={24}
              />
              Cana Merch
            </Link>
          </SheetTitle>

          <Separator />

          <form onSubmit={handleSearch} className='flex gap-2'>
            <Input
              type='search'
              placeholder='Search merch...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full'
            />
            <Button type='submit' size='icon' variant='ghost'>
              <Search className='h-4 w-4' />
              <span className='sr-only'>Search</span>
            </Button>
          </form>
          <nav className='flex max-h-[60vh] flex-col gap-2 overflow-y-auto'>
            <h3 className='mb-2 font-medium'>Categories</h3>
            <div className='border-sidebar-border mx-3.5 border-l px-2.5'>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`hover:bg-muted flex items-center rounded-md px-3 py-2 text-sm ${
                    pathname === category.href ? 'bg-muted font-medium' : ''
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.image && (
                    <div className='mr-2 h-6 w-6 overflow-hidden rounded-md'>
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={24}
                        height={24}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  )}
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

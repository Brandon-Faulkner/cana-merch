'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/components/cart/cart-provider';
import CartSidebar from '@/components/cart/cart-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';

const categories = [
  { name: 'T-Shirts', href: '/category/t-shirts' },
  { name: 'Mugs', href: '/category/mugs' },
  { name: 'Accessories', href: '/category/accessories' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { getCartCount, toggleCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const cartCount = getCartCount();

  return (
    <header className='bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur'>
      <div className='m-auto flex h-16 w-full max-w-7xl items-center justify-between'>
        <div className='flex items-center gap-2 pl-2 md:gap-4'>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button size='icon' variant='ghost'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-60 px-2 sm:w-[300px]'>
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
                    placeholder='Search products...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full'
                  />
                  <Button type='submit' size='icon' variant='ghost'>
                    <Search className='h-4 w-4' />
                    <span className='sr-only'>Search</span>
                  </Button>
                </form>
                <nav className='flex flex-col gap-2'>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className={`hover:bg-muted rounded-md px-3 py-2 text-sm ${
                        pathname === category.href ? 'bg-muted font-medium' : ''
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href='/' className='flex items-center gap-2'>
            <Image src='/android-chrome-192x192.png' alt='Cana Merch Logo' width={28} height={28} />
            <span className='hidden text-xl font-bold sm:inline-block'>Cana Merch</span>
          </Link>

          <nav className='hidden items-center gap-1 md:flex'>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`hover:bg-muted rounded-md px-3 py-2 text-sm ${
                  pathname === category.href ? 'bg-muted font-medium' : ''
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-4 pr-6'>
          <form onSubmit={handleSearch} className='hidden gap-2 md:flex'>
            <Input
              type='search'
              placeholder='Search products...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-52'
            />
            <Button type='submit' size='icon' variant='ghost'>
              <Search className='h-4 w-4' />
              <span className='sr-only'>Search</span>
            </Button>
          </form>

          <ThemeToggle />

          <Button
            variant='outline'
            size='icon'
            className='relative'
            onClick={toggleCart}
            aria-label='Open cart'
          >
            <ShoppingCart className='h-5 w-5' />
            {cartCount > 0 && (
              <span className='bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
      <CartSidebar />
    </header>
  );
}

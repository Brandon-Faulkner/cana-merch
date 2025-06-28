'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useCart } from '@/context/cart-provider';
import CartSidebar from '@/components/cart/cart-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { getBaseUrl } from '@/lib/utils';

// Fallback categories in case the API call fails
const fallbackCategories = [{ name: 'All Products', href: '/category/all' }];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState(fallbackCategories);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${getBaseUrl()}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Add "All Products" category if it doesn't exist
            const hasAllProducts = data.some((cat) => cat.href === '/category/all');
            const updatedCategories = hasAllProducts
              ? data
              : [{ name: 'All Products', href: '/category/all' }, ...data];
            setCategories(updatedCategories);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
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

          <Link href='/' className='flex items-center gap-2 md:pl-4'>
            <Image src='/android-chrome-192x192.png' alt='Cana Merch Logo' width={28} height={28} />
            <span className='hidden text-xl font-bold sm:inline-block'>Cana Merch</span>
          </Link>

          <nav className='hidden items-center gap-1 md:flex'>
            <Link
              href='/category/all'
              className={`hover:bg-muted rounded-md px-3 py-2 text-sm ${
                pathname === '/category/all' ? 'bg-muted font-medium' : ''
              }`}
            >
              All Products
            </Link>
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
            <Button type='submit' size='icon' variant='ghost' className='cursor-pointer'>
              <Search className='h-4 w-4' />
              <span className='sr-only'>Search</span>
            </Button>
          </form>

          <ThemeToggle />

          <Button
            variant='outline'
            size='icon'
            className='relative cursor-pointer'
            onClick={toggleCart}
            aria-label='Open cart'
            disabled={pathname.startsWith('/checkout')}
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
      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </header>
  );
}

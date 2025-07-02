'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-provider';
import CartSidebar from '@/components/cart/cart-sidebar';
import { MobileSidebar } from '@/components/nav/mobile-sidebar';
import { CategoriesHover } from '@/components/nav/categories-hover';
import { ThemeToggle } from '@/components/theme-toggle';
import { getBaseUrl } from '@/lib/utils';

// Fallback categories in case the API call fails
const fallbackCategories = [{ name: 'All Merch', href: '/category/all' }];

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
            // Add "All Merch" category if it doesn't exist
            const hasAllProducts = data.some((cat) => cat.href === '/category/all');
            const updatedCategories = hasAllProducts
              ? data
              : [{ name: 'All Merch', href: '/category/all' }, ...data];
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
          <MobileSidebar
            pathname={pathname}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
          />

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
              All Merch
            </Link>

            <CategoriesHover pathname={pathname} categories={categories} />
          </nav>
        </div>

        <div className='flex items-center gap-4 pr-6'>
          <form onSubmit={handleSearch} className='hidden gap-2 md:flex'>
            <Input
              type='search'
              placeholder='Search merch...'
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

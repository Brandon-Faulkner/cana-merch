'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import { SearchSkeleton } from '@/components/skeletons/search-skeleton';
import { getProducts } from '@/lib/api/products';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className='m-auto max-w-7xl px-4 py-16 text-center'>
          <Loader2 className='text-primary mx-auto h-12 w-12 animate-spin' />
          <p className='mt-4 text-lg'>Loading...</p>
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}

export function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts(products, query);
  }, [query, products]);

  const filterProducts = (productsToFilter, searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase().trim();

    const filtered = productsToFilter.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery),
    );

    setSearchResults(filtered);
  };

  if (loading) {
    return <SearchSkeleton />;
  }

  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      {/* Search results header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Search Results</h1>
        {query ? (
          <p className='text-muted-foreground mt-2'>
            {searchResults.length === 0
              ? 'No results found'
              : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`}
            for &quot;{query}&quot;
          </p>
        ) : (
          <p className='text-muted-foreground mt-2'>Enter a search term to find products</p>
        )}
      </div>

      {/* No query entered */}
      {!query && (
        <div className='mt-12 flex flex-col items-center justify-center py-12'>
          <Search className='text-muted-foreground h-12 w-12' />
          <p className='text-muted-foreground mt-4 text-center text-lg'>
            Enter a search term to find products
          </p>
          <Button asChild className='mt-4'>
            <Link href='/category/all'>Browse all products</Link>
          </Button>
        </div>
      )}

      {/* No results found */}
      {query && searchResults.length === 0 && (
        <div className='mt-12 flex flex-col items-center justify-center py-12'>
          <Search className='text-muted-foreground h-12 w-12' />
          <p className='text-muted-foreground mt-4 text-center text-lg'>
            No products found matching &quot;{query}&quot;
          </p>
          <Button asChild className='mt-4'>
            <Link href='/category/all'>Browse all products</Link>
          </Button>
        </div>
      )}

      {/* Search results */}
      {searchResults.length > 0 && (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

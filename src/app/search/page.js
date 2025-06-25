'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/api/products';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products when component mounts
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        setProducts(allProducts);

        // Apply initial search
        filterProducts(allProducts, query);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter products when query changes
  useEffect(() => {
    filterProducts(products, query);
  }, [query, products]);

  // Function to filter products based on search query
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

  // Show loading state
  if (loading) {
    return (
      <div className='container mx-auto py-16 text-center'>
        <div className='animate-pulse text-xl'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8'>
      {/* Search results header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Search Results</h1>
        {query ? (
          <p className='text-muted-foreground mt-2'>
            {searchResults.length === 0
              ? 'No results found'
              : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`}{' '}
            for "{query}"
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
            No products found matching "{query}"
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

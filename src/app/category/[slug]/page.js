'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from '@/components/products/product-card';
import { getProducts } from '@/lib/api/products';
import { CategoriesSkeleton } from '@/components/skeletons/categories-skeleton';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug;

  // State for products and filtering
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // If "all" is specified, fetch all products, otherwise filter by category
        const categoryFilter = categorySlug === 'all' ? null : categorySlug;
        const productsData = await getProducts({ category: categoryFilter });
        setProducts(productsData);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load merch. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [categorySlug]);

  useEffect(() => {
    sortProducts(products, sortBy);
  }, [sortBy, products]);

  const sortProducts = (productsToSort, sortOption) => {
    if (!productsToSort.length) return;

    let sorted = [...productsToSort];

    switch (sortOption) {
      case 'featured':
        sorted.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
        break;
      case 'newest':
        sorted.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  const getCategoryTitle = () => {
    if (categorySlug === 'all') {
      return 'All Merch';
    }
    return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  };

  if (loading) {
    return <CategoriesSkeleton />;
  }

  if (error) {
    return (
      <div className='m-auto max-w-7xl px-4 py-16 text-center'>
        <div className='text-destructive text-xl'>{error}</div>
        <Button asChild className='mt-4'>
          <Link href='/'>Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold tracking-tight'>{getCategoryTitle()}</h1>
      <div className='xxs:gap-0 xxs:flex-row mb-6 flex flex-col items-center justify-between gap-6'>
        <p className='text-muted-foreground text-sm'>{`${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`}</p>

        <div className='flex items-center gap-2'>
          <span className='text-muted-foreground text-sm'>Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='featured'>Featured</SelectItem>
              <SelectItem value='newest'>Newest</SelectItem>
              <SelectItem value='price-low'>Price: Low to High</SelectItem>
              <SelectItem value='price-high'>Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className='py-12 text-center'>
          <p className='text-muted-foreground text-lg'>No merch found in this category</p>
          <Button asChild className='mt-4'>
            <Link href='/category/all'>View all merch</Link>
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

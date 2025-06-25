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
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/api/products';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug;

  // State for products and filtering
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products when component mounts or category changes
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // If "all" is specified, fetch all products, otherwise filter by category
        const categoryFilter = categorySlug === 'all' ? null : categorySlug;
        const productsData = await getProducts({ category: categoryFilter });
        setProducts(productsData);

        // Apply initial sorting
        sortProducts(productsData, sortBy);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [categorySlug]);

  // Apply sorting when sortBy changes
  useEffect(() => {
    sortProducts(products, sortBy);
  }, [sortBy, products]);

  // Function to sort products
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

  // Category title formatting
  const getCategoryTitle = () => {
    if (categorySlug === 'all') {
      return 'All Products';
    }
    return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  };

  // Loading state
  if (loading) {
    return (
      <div className='container mx-auto py-16 text-center'>
        <div className='animate-pulse text-xl'>Loading products...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='container mx-auto py-16 text-center'>
        <div className='text-xl text-red-500'>{error}</div>
        <Button asChild className='mt-4'>
          <Link href='/'>Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0'>
        <h1 className='text-3xl font-bold tracking-tight'>{getCategoryTitle()}</h1>

        <div className='flex items-center space-x-4'>
          <span className='text-muted-foreground text-sm'>Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[180px]'>
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
          <p className='text-muted-foreground text-lg'>No products found in this category</p>
          <Button asChild className='mt-4'>
            <Link href='/category/all'>View all products</Link>
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

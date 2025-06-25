'use client';
import { useState } from 'react';
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

// Mock product data - in a real app, this would come from an API or database
const products = [
  {
    id: '1',
    name: 'Cana Logo T-Shirt',
    description: 'A comfortable cotton t-shirt featuring our church logo',
    price: 20.0,
    image: 'https://placehold.co/400x500',
    category: 't-shirts',
    isFeatured: true,
    isNew: true,
  },
  {
    id: '2',
    name: 'Faith Coffee Mug',
    description: 'Start your morning with faith using this 12oz ceramic mug',
    price: 12.5,
    image: 'https://placehold.co/400x500',
    category: 'mugs',
    isFeatured: true,
    isNew: false,
  },
  {
    id: '3',
    name: 'Cross Pendant Necklace',
    description: 'Beautiful stainless steel cross necklace with 18-inch chain',
    price: 18.99,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Scripture Journal',
    description: 'Hardcover journal with scripture verses on each page',
    price: 15.0,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: true,
    isNew: false,
  },
  {
    id: '5',
    name: 'Be Still T-Shirt',
    description: "Comfortable t-shirt with 'Be Still and Know' verse",
    price: 22.0,
    image: 'https://placehold.co/400x500',
    category: 't-shirts',
    isFeatured: false,
    isNew: true,
  },
  {
    id: '6',
    name: 'Prayer Journal',
    description: 'Guided prayer journal with prompts and scripture references',
    price: 16.5,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: false,
    isNew: false,
  },
  {
    id: '7',
    name: 'Church Logo Cap',
    description: 'Embroidered cap with church logo',
    price: 18.0,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: false,
    isNew: true,
  },
  {
    id: '8',
    name: 'Scripture Mug - Psalm 23',
    description: 'Ceramic mug with Psalm 23 verse',
    price: 14.0,
    image: 'https://placehold.co/400x500',
    category: 'mugs',
    isFeatured: false,
    isNew: false,
  },
];

// Category data
const categoryData = {
  't-shirts': {
    title: 'T-Shirts',
    description: 'Comfortable, stylish t-shirts featuring Christian messages and our church logo.',
  },
  mugs: {
    title: 'Mugs',
    description:
      'Start your day with inspiration from our collection of faith-focused coffee mugs.',
  },
  accessories: {
    title: 'Accessories',
    description: 'Faith-inspired accessories including jewelry, journals, and more.',
  },
  all: {
    title: 'All Products',
    description: 'Browse our complete collection of church merchandise.',
  },
};

const sortOptions = [
  {
    title: 'Featured',
    value: 'featured',
  },
  {
    title: 'Price: Low to High',
    value: 'price-low',
  },
  {
    title: 'Price: High to Low',
    value: 'price-high',
  },
  {
    title: 'Newest',
    value: 'newest',
  },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const [sortOption, setSortOption] = useState('featured');

  // Filter products based on category
  let filteredProducts =
    slug === 'all' ? products : products.filter((product) => product.category === slug);

  // Sort products based on selected option
  if (sortOption === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOption === 'newest') {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1,
    );
  }
  // Default is "featured" which uses the original order

  const categoryInfo = categoryData[slug] || {
    title: 'Products',
    description: 'Browse our collection of products.',
  };

  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <div className='mb-8 space-y-4 text-center'>
        <h1 className='text-3xl font-bold'>{categoryInfo.title}</h1>
        <p className='text-muted-foreground mx-auto max-w-2xl'>{categoryInfo.description}</p>
      </div>

      <div className='xxs:gap-0 xxs:flex-row mb-6 flex flex-col items-center justify-between gap-6'>
        <p className='text-muted-foreground text-sm'>{filteredProducts.length} products</p>

        <div className='flex items-center gap-2'>
          <label htmlFor='sort' className='w-full text-sm'>
            Sort by:
          </label>
          <Select id='sort' value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Featured' />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className='py-16 text-center'>
          <h2 className='mb-2 text-xl font-medium'>No products found</h2>
          <p className='text-muted-foreground mb-6'>
            Sorry, there are no products available in this category.
          </p>
          <Button asChild>
            <Link href='/category/all'>Browse All Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

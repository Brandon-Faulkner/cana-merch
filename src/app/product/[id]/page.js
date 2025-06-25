'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/components/cart/cart-provider';
import { ChevronLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { getProduct } from '@/lib/api/products';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;
  const { addToCart } = useCart();

  // State for product data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for product options
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Fetch product data when component mounts
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const productData = await getProduct(productId);

        if (productData) {
          setProduct(productData);
          // Set default selections
          if (productData.variants && productData.variants.length > 0) {
            setSelectedVariant(productData.variants[0]);
          }
          if (productData.colors && productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <div className='container mx-auto mt-8 flex justify-center py-20'>
        <div className='animate-pulse text-xl'>Loading product...</div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className='container mx-auto mt-8 flex flex-col items-center py-20'>
        <div className='text-xl text-red-500'>{error || 'Product not found'}</div>
        <Button asChild className='mt-4'>
          <Link href='/category/all'>Browse Products</Link>
        </Button>
      </div>
    );
  }

  // Handle quantity changes
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle adding to cart
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      variant: selectedVariant,
      color: selectedColor,
    });
  };

  // Product details
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Back to shop link */}
      <Link
        href='/category/all'
        className='text-muted-foreground hover:text-foreground mt-4 mb-6 inline-flex items-center text-sm'
      >
        <ChevronLeft className='mr-1 h-4 w-4' />
        Back to shop
      </Link>

      {/* Product details */}
      <div className='mt-6 grid gap-8 lg:grid-cols-2'>
        {/* Product image */}
        <div className='bg-muted relative aspect-square overflow-hidden rounded-lg'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority
          />
          {product.isNew && (
            <Badge className='absolute top-2 left-2' variant='secondary'>
              New
            </Badge>
          )}
        </div>

        {/* Product info */}
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>{product.name}</h1>
          <div className='mt-2 flex items-center'>
            <div className='text-2xl font-bold'>{formatPrice(product.price)}</div>
            {!product.inStock && (
              <Badge variant='destructive' className='ml-3'>
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className='mt-4 flex items-center'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              ))}
            </div>
            <span className='text-muted-foreground ml-2 text-sm'>
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Description */}
          <p className='text-muted-foreground mt-4'>{product.description}</p>

          {/* Variant selection */}
          {product.variants && product.variants.length > 0 && (
            <div className='mt-6'>
              <label className='mb-2 block text-sm font-medium'>Size</label>
              <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a size' />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant} value={variant}>
                      {variant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Color selection */}
          {product.colors && product.colors.length > 0 && (
            <div className='mt-6'>
              <label className='mb-2 block text-sm font-medium'>Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a color' />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Quantity selector */}
          <div className='mt-6'>
            <label className='mb-2 block text-sm font-medium'>Quantity</label>
            <div className='flex items-center'>
              <Button
                variant='outline'
                size='icon'
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className='h-4 w-4' />
              </Button>
              <span className='mx-4 w-8 text-center'>{quantity}</span>
              <Button variant='outline' size='icon' onClick={incrementQuantity}>
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Add to cart button */}
          <Button
            className='mt-8 flex w-full items-center justify-center gap-2'
            size='lg'
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className='h-5 w-5' />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>

          {/* Product details */}
          <div className='mt-8'>
            <h3 className='mb-2 text-lg font-semibold'>Product Details</h3>
            <Separator />
            <ul className='mt-4 space-y-2'>
              {product.details &&
                product.details.map((detail, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    <span className='bg-primary h-1.5 w-1.5 rounded-full'></span>
                    <span>{detail}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related products section would go here */}
    </div>
  );
}

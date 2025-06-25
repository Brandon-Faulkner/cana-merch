'use client';

import { useState } from 'react';
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

// Mock product data - in a real app, we would fetch this from an API
const products = [
  {
    id: '1',
    name: 'Cana Logo T-Shirt',
    description:
      'A comfortable cotton t-shirt featuring our church logo. Perfect for casual wear or church events. Made with 100% premium cotton for maximum comfort.',
    price: 20.0,
    image: 'https://placehold.co/400x500',
    category: 't-shirts',
    isFeatured: true,
    isNew: true,
    variants: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: ['Black', 'White', 'Navy Blue'],
    inStock: true,
    rating: 4.8,
    reviews: 24,
    details: [
      '100% premium cotton',
      'Machine washable',
      'Church logo printed on front',
      'Scripture verse on back',
      'Unisex sizing',
    ],
  },
  {
    id: '2',
    name: 'Faith Coffee Mug',
    description:
      'Start your morning with faith using this 12oz ceramic mug. Features an inspiring scripture verse and our church logo.',
    price: 12.5,
    image: 'https://placehold.co/400x500',
    category: 'mugs',
    isFeatured: true,
    isNew: false,
    variants: ['12oz'],
    colors: ['White', 'Black'],
    inStock: true,
    rating: 4.6,
    reviews: 18,
    details: [
      'Ceramic construction',
      'Microwave and dishwasher safe',
      '12oz capacity',
      'Scripture verse printed on side',
      'Church logo on reverse',
    ],
  },
  {
    id: '3',
    name: 'Cross Pendant Necklace',
    description:
      'Beautiful stainless steel cross necklace with 18-inch chain. A perfect way to express your faith with an elegant accessory.',
    price: 18.99,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: true,
    isNew: true,
    variants: ['18-inch chain'],
    colors: ['Silver', 'Gold'],
    inStock: true,
    rating: 4.9,
    reviews: 32,
    details: [
      'Stainless steel construction',
      'Tarnish resistant',
      '18-inch chain included',
      'Gift box included',
      'Hypoallergenic',
    ],
  },
  {
    id: '4',
    name: 'Scripture Journal',
    description:
      'Hardcover journal with scripture verses on each page. Perfect for daily reflections, sermon notes, or personal study.',
    price: 15.0,
    image: 'https://placehold.co/400x500',
    category: 'accessories',
    isFeatured: true,
    isNew: false,
    variants: ['200 pages'],
    colors: ['Brown', 'Black', 'Blue'],
    inStock: true,
    rating: 4.7,
    reviews: 15,
    details: [
      'Hardcover construction',
      '200 lined pages',
      'Scripture verse on each page',
      'Ribbon bookmark',
      'Elastic closure',
    ],
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;

  // In a real app, we would fetch the product based on the ID
  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');

  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className='m-auto max-w-7xl py-16 text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Product Not Found</h1>
        <p className='mb-6'>Sorry, the product you are looking for does not exist.</p>
        <Button asChild>
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        variant: `${selectedColor} / ${selectedVariant}`,
      },
      quantity,
    );
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <Button variant='ghost' asChild className='mb-6'>
        <Link href='/' className='flex items-center gap-2'>
          <ChevronLeft className='h-4 w-4' />
          Back to Products
        </Link>
      </Button>

      <div className='grid gap-8 md:grid-cols-2'>
        <div className='bg-muted relative aspect-square overflow-hidden rounded-lg border'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority
          />
          {product.isNew && <Badge className='absolute top-3 right-3'>New</Badge>}
        </div>

        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <p className='mt-2 text-2xl font-semibold'>{formatPrice(product.price)}</p>
          </div>

          <p className='text-muted-foreground'>{product.description}</p>

          <div className='space-y-4'>
            {product.variants?.length > 0 && (
              <div>
                <label className='mb-1 block text-sm font-medium'>Size</label>
                <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select size' />
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

            {product.colors?.length > 0 && (
              <div>
                <label className='mb-1 block text-sm font-medium'>Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select color' />
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
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center rounded-md border'>
              <Button
                variant='ghost'
                size='icon'
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className='h-10 rounded-r-none'
              >
                <Minus className='h-4 w-4' />
              </Button>
              <span className='w-10 text-center'>{quantity}</span>
              <Button
                variant='ghost'
                size='icon'
                onClick={incrementQuantity}
                className='h-10 rounded-l-none'
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>

            <Button onClick={handleAddToCart} className='flex-1' disabled={!product.inStock}>
              <ShoppingCart className='mr-2 h-4 w-4' />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className='mb-2 font-medium'>Product Details</h3>
            <ul className='list-inside list-disc space-y-1 text-sm'>
              {product.details.map((detail, index) => (
                <li key={index} className='text-muted-foreground'>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='mt-16'>
        <h2 className='mb-6 text-2xl font-bold'>You May Also Like</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((product) => (
              <Card key={product.id} className='overflow-hidden'>
                <div className='relative aspect-square'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 50vw, 25vw'
                  />
                </div>
                <CardContent className='p-4'>
                  <h3 className='line-clamp-1 font-medium'>{product.name}</h3>
                  <p className='mt-1 text-sm'>{formatPrice(product.price)}</p>
                  <Button asChild variant='outline' size='sm' className='mt-2 w-full'>
                    <Link href={`/product/${product.id}`}>View</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

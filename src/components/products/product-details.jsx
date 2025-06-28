import Image from 'next/image';
import { Button } from '@/components/ui/button';
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
import { Minus, Plus, ShoppingCart } from 'lucide-react';

export function ProductDetails({
  product,
  quantity,
  selectedVariant,
  setSelectedVariant,
  selectedColor,
  setSelectedColor,
  incrementQuantity,
  decrementQuantity,
  handleAddToCart,
}) {
  return (
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
          <div className='mt-2 flex items-center'>
            <div className='text-2xl font-bold'>{formatPrice(product.price)}</div>
            {!product.inStock && (
              <Badge variant='destructive' className='ml-3'>
                Out of Stock
              </Badge>
            )}
          </div>
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
              disabled={quantity == 0}
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
            {product.details &&
              product.details.map((detail, index) => (
                <li key={index} className='text-muted-foreground'>
                  {detail}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

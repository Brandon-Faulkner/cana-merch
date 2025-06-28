import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

export function CartSummary({ cart, updateQuantity, removeFromCart, getCartTotal, getCartCount }) {
  return (
    <div className='lg:col-span-1'>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>
            {getCartCount()} item{getCartCount() !== 1 ? 's' : ''} in cart
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {cart.map((item) => (
            <div key={item.id} className='flex items-start gap-4'>
              <div className='bg-muted relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className='object-cover'
                  sizes='80px'
                />
              </div>

              <div className='flex flex-1 flex-col'>
                <div className='flex justify-between'>
                  <h3 className='font-medium'>{item.name}</h3>
                  <p className='font-semibold'>{formatPrice(item.price * item.quantity)}</p>
                </div>

                <p className='text-muted-foreground mt-1 text-sm'>{formatPrice(item.price)} each</p>

                {item.variant && (
                  <p className='text-muted-foreground mt-1 text-sm'>Size: {item.variant}</p>
                )}

                {item.color && (
                  <p className='text-muted-foreground mt-1 text-sm'>Color: {item.color}</p>
                )}

                <div className='mt-2 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className='h-3 w-3' />
                    </Button>
                    <span className='mx-2 w-8 text-center text-sm'>{item.quantity}</span>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className='h-3 w-3' />
                    </Button>
                  </div>

                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-muted-foreground text-xs'
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Separator className='my-4' />

          <div className='space-y-1.5'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <div className='flex justify-between'>
              <span>Tax</span>
              <span className='text-muted-foreground'>Calculated at next step</span>
            </div>
            <Separator className='my-2' />
            <div className='flex justify-between text-lg font-semibold'>
              <span>Total</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

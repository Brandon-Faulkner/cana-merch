'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-provider';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CartSidebar({ isCartOpen, setIsCartOpen }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal();

  return (
    <Sheet open={isCartOpen} onOpenChange={() => setIsCartOpen((prev) => !prev)}>
      <SheetContent className='flex w-full flex-col px-4 sm:max-w-lg'>
        <SheetHeader className='px-1'>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <Separator />

        {cart.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-center space-y-4'>
            <div className='text-center'>
              <h3 className='text-lg font-medium'>Your cart is empty</h3>
              <p className='text-muted-foreground mt-1 text-sm'>
                Add items to your cart to see them here
              </p>
            </div>
            <Button onClick={() => setIsCartOpen(false)} className='mt-2' asChild>
              <Link href='/'>Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className='flex flex-1 flex-col gap-5'>
            <div className='flex-1 overflow-auto py-6'>
              <div className='space-y-5'>
                {cart.map((item) => (
                  <div key={item.id} className='flex gap-4'>
                    <div className='bg-muted relative h-20 w-20 overflow-hidden rounded-md border'>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className='object-cover'
                          sizes='80px'
                        />
                      )}
                    </div>

                    <div className='flex flex-1 flex-col justify-between'>
                      <div className='flex justify-between'>
                        <div>
                          <h4 className='font-medium'>{item.name}</h4>
                          {item.variant && (
                            <p className='text-muted-foreground text-xs'>{item.variant}</p>
                          )}
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6'
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                          <Button
                            variant='outline'
                            size='icon'
                            className='h-7 w-7'
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label='Decrease quantity'
                          >
                            <Minus className='h-3 w-3' />
                          </Button>
                          <span className='w-8 text-center text-sm'>{item.quantity}</span>
                          <Button
                            variant='outline'
                            size='icon'
                            className='h-7 w-7'
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label='Increase quantity'
                          >
                            <Plus className='h-3 w-3' />
                          </Button>
                        </div>
                        <span className='font-medium'>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='space-y-4 pb-4'>
              <Separator />
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span className='font-medium'>{formatPrice(total)}</span>
              </div>
              <Button className='w-full' size='lg' asChild onClick={() => setIsCartOpen(false)}>
                <Link href='/checkout'>Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

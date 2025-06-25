'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/components/cart/cart-provider';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { Minus, Plus, Loader2 } from 'lucide-react';

// Initialize Stripe - replace with your actual publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
);

function CheckoutForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { cart, getCartTotal, clearCart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);

    // In a real app, you would first create a payment intent on your server
    // Here we'll simulate a successful payment

    // Simulate API call delay
    setTimeout(async () => {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      });

      if (result.error) {
        toast.error(result.error.message || 'Payment failed. Please try again.');
        setIsSubmitting(false);
      } else {
        // Since we're simulating, we'll assume success
        clearCart();
        router.push('/checkout/success');
      }
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Contact Information</h2>
        <div className='space-y-4'>
          <div>
            <label htmlFor='name' className='mb-1 block text-sm font-medium'>
              Full Name
            </label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='John Doe'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='mb-1 block text-sm font-medium'>
              Email Address
            </label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='john@example.com'
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className='mb-4 text-xl font-semibold'>Payment Method</h2>
        <div className='bg-muted/30 rounded-md p-4'>
          <PaymentElement />
        </div>
      </div>

      <div>
        <Button type='submit' className='w-full' size='lg' disabled={!stripe || isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Processing...
            </>
          ) : (
            `Pay ${formatPrice(getCartTotal())}`
          )}
        </Button>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const total = getCartTotal();

  // For demo purposes, we'll use a mock client secret
  const options = {
    clientSecret: 'mock_client_secret',
    appearance: {
      theme: 'stripe',
    },
  };

  if (cart.length === 0) {
    return (
      <div className='container mx-auto max-w-md py-16 text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Your cart is empty</h1>
        <p className='mb-6'>Add items to your cart before proceeding to checkout.</p>
        <Button asChild>
          <Link href='/'>Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='container max-w-6xl px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Checkout</h1>

      <div className='grid gap-8 md:grid-cols-5'>
        <div className='md:col-span-3'>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </div>

        <div className='md:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {cart.map((item) => (
                <div key={item.id} className='flex gap-4'>
                  <div className='bg-muted relative h-16 w-16 overflow-hidden rounded-md border'>
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className='object-cover'
                        sizes='64px'
                      />
                    )}
                  </div>

                  <div className='flex flex-1 flex-col justify-between'>
                    <div>
                      <h4 className='line-clamp-1 text-sm font-medium'>{item.name}</h4>
                      {item.variant && (
                        <p className='text-muted-foreground text-xs'>{item.variant}</p>
                      )}
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        <Button
                          variant='outline'
                          size='icon'
                          className='h-5 w-5'
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label='Decrease quantity'
                        >
                          <Minus className='h-2 w-2' />
                        </Button>
                        <span className='w-4 text-center text-xs'>{item.quantity}</span>
                        <Button
                          variant='outline'
                          size='icon'
                          className='h-5 w-5'
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label='Increase quantity'
                        >
                          <Plus className='h-2 w-2' />
                        </Button>
                      </div>
                      <span className='text-sm'>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Tax</span>
                  <span>{formatPrice(total * 0.08)}</span>
                </div>
                <Separator />
                <div className='flex justify-between font-semibold'>
                  <span>Total</span>
                  <span>{formatPrice(total * 1.08)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

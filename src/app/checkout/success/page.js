'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/components/cart/cart-provider';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('processing');

  // Generate a random order number (in a real app, this would come from your database)
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;

  useEffect(() => {
    // Clear the cart when payment is successful
    // In a real application, you might want to verify the payment with Stripe here
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded' && paymentIntent) {
      clearCart();
      setPaymentStatus('success');
    } else if (redirectStatus === 'failed') {
      setPaymentStatus('failed');
    }

    setLoading(false);
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className='container mx-auto max-w-md px-4 py-16 text-center'>
        <Loader2 className='text-primary mx-auto h-12 w-12 animate-spin' />
        <p className='mt-4 text-lg'>Verifying your payment...</p>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className='container mx-auto max-w-md px-4 py-16 text-center'>
        <Card className='border-red-200'>
          <CardContent className='flex flex-col items-center pt-6 pb-4'>
            <svg
              className='mb-4 h-16 w-16 text-red-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <h1 className='mb-2 text-2xl font-bold'>Payment Failed</h1>
            <p className='text-muted-foreground mb-4'>
              There was an issue processing your payment. Please try again.
            </p>
          </CardContent>
          <CardFooter className='flex flex-col gap-2'>
            <Button asChild className='w-full'>
              <Link href='/checkout'>Return to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-md px-4 py-16 text-center'>
      <Card className='border-green-200'>
        <CardContent className='flex flex-col items-center pt-6 pb-4'>
          <CheckCircle className='mb-4 h-16 w-16 text-green-500' />
          <h1 className='mb-2 text-2xl font-bold'>Payment Successful!</h1>
          <p className='text-muted-foreground mb-4'>
            Thank you for your purchase. Your order has been received.
          </p>
          <div className='bg-muted mb-4 w-full rounded-lg p-4'>
            <p className='text-muted-foreground text-sm'>Order Number</p>
            <p className='font-medium'>{orderNumber}</p>
          </div>
          <p className='text-muted-foreground text-sm'>
            A confirmation email has been sent to your email address.
          </p>
        </CardContent>
        <CardFooter className='flex flex-col gap-2'>
          <Button asChild className='w-full'>
            <Link href='/'>Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-provider';
import { getBaseUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { CheckoutSkeleton } from '@/components/skeletons/checkout-skeleton';
import { CartSummary } from '@/components/cart/cart-summary';
import { StripeForm } from '@/components/forms/stripe-form';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('paymentIntentId') || '';
    }
    return '';
  });
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();
  const [loading, setLoading] = useState(true);
  const [appearance, setAppearance] = useState({ theme: 'stripe' });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const createOrUpdatePaymentIntent = async () => {
      try {
        if (cart.length === 0) {
          setLoading(false);
          return;
        }

        setLoading(true);
        const amountInCents = Math.round(getCartTotal() * 100);
        const metadata = {
          items: JSON.stringify(
            cart.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
          ),
        };

        const storedIntentId = sessionStorage.getItem('paymentIntentId');
        const response = await fetch(`${getBaseUrl()}/api/create-payment-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountInCents,
            metadata,
            paymentIntentId: storedIntentId || undefined,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        sessionStorage.setItem('paymentIntentId', data.paymentIntentId);
      } catch (error) {
        console.error('Error creating/updating payment intent:', error);
        toast.error('There was a problem setting up the payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    createOrUpdatePaymentIntent();
  }, [cart, getCartTotal]);

  useEffect(() => {
    if (cart.length === 0 && paymentIntentId) {
      const cancelPaymentIntent = async () => {
        try {
          await fetch(`${getBaseUrl()}/api/cancel-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentIntentId }),
          });
        } catch (error) {
          console.error('Error cancelling payment intent:', error);
        } finally {
          setPaymentIntentId('');
          sessionStorage.removeItem('paymentIntentId');
        }
      };
      cancelPaymentIntent();
    }
  }, [cart, paymentIntentId]);

  useEffect(() => {
    setAppearance({
      theme: 'stripe',
      variables: {
        colorPrimary: resolvedTheme === 'light' ? '#00884f' : '#02aa63',
        colorBackground: resolvedTheme === 'light' ? '#ffffff' : '#373737',
        colorText: resolvedTheme === 'light' ? '#09090b' : '#fafafa',
        fontFamily: 'Futura, sans-serif',
      },
    });
  }, [resolvedTheme]);

  if (loading) {
    return <CheckoutSkeleton />;
  }

  if (cart.length === 0) {
    return (
      <div className='m-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20'>
        <p className='text-xl'>Your cart is empty</p>
        <Button asChild className='mt-4'>
          <Link href='/category/all'>View Merch</Link>
        </Button>
      </div>
    );
  }
  const options = {
    clientSecret,
    appearance,
    fonts: [
      {
        cssSrc: `${getBaseUrl()}/stripe-font.css`,
      },
    ],
  };

  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Checkout</h1>

      <div className='grid gap-8 lg:grid-cols-3'>
        <CartSummary
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getCartTotal={getCartTotal}
          getCartCount={getCartCount}
        />

        {clientSecret && (
          <Elements stripe={stripePromise} options={options} key={resolvedTheme}>
            <StripeForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

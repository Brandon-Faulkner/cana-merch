'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/context/cart-provider';
import { PaymentSuccess } from '@/components/payment/payment-success';
import { PaymentFailed } from '@/components/payment/payment-failed';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className='m-auto max-w-7xl px-4 py-16 text-center'>
          <Loader2 className='text-primary mx-auto h-12 w-12 animate-spin' />
          <p className='mt-4 text-lg'>Loading...</p>
        </div>
      }
    >
      <CheckoutSuccessPage />
    </Suspense>
  );
}

export function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(null);
  const [cartCleared, setCartCleared] = useState(false);
  const paymentIntent = searchParams.get('payment_intent');
  const redirectStatus = searchParams.get('redirect_status');

  useEffect(() => {
    async function fetchPaymentIntentDetails() {
      if (paymentIntent && redirectStatus === 'succeeded') {
        try {
          const res = await fetch(`/api/payment-intent-details?id=${paymentIntent}`);
          if (res.ok) {
            const data = await res.json();
            setOrderNumber(data.id || paymentIntent);
            setEmail(data.receipt_email || data.customer_email || '');
            setAmount(data.amount ? (data.amount / 100).toFixed(2) : null);
          } else {
            setOrderNumber(paymentIntent);
          }
        } catch {
          setOrderNumber(paymentIntent);
        } finally {
          setLoading(false);
        }
      }
    }

    if (redirectStatus === 'succeeded' && paymentIntent && !cartCleared) {
      clearCart();
      setCartCleared(true);
      setPaymentStatus('success');
      fetchPaymentIntentDetails();
    } else if (redirectStatus === 'failed') {
      setPaymentStatus('failed');
      setLoading(false);
    }
  }, [paymentIntent, redirectStatus, clearCart, cartCleared]);

  if (loading) {
    return (
      <div className='m-auto max-w-7xl px-4 py-16 text-center'>
        <Loader2 className='text-primary mx-auto h-12 w-12 animate-spin' />
        <p className='mt-4 text-lg'>Verifying your payment...</p>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return <PaymentFailed />;
  }

  return <PaymentSuccess orderNumber={orderNumber} amount={amount} email={email} />;
}

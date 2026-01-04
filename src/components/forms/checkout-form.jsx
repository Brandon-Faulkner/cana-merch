import { useState } from 'react';
import { AddressElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-provider';
import { formatPrice, getBaseUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { Loader2, CreditCard } from 'lucide-react';

export function CheckoutForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { shippingOption, getTotalWithShipping } = useCart();
  const [shippingComplete, setShippingComplete] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shippingOption) {
      toast.error('Please select a shipping method.');
      return;
    }

    if (shippingOption?.id !== 'pickup' && !shippingComplete) {
      toast.error('Please enter a complete shipping address.');
      return;
    }

    if (!stripe || !elements) {
      toast.error('Stripe has not loaded. Please try again.');
      return;
    }

    if (!email) {
      toast.error('Please provide your email address.');
      return;
    }

    if (!name && shippingOption?.id === 'pickup') {
      toast.error('Please provide your name.');
      return;
    }

    setIsSubmitting(true);

    const shouldShip = shippingOption?.id !== 'pickup';

    const shipping = shouldShip
      ? {
          name: shippingAddress?.name || name || '',
          phone: shippingAddress?.phone || undefined,
          address: {
            line1: shippingAddress?.address?.line1 || '',
            line2: shippingAddress?.address?.line2 || undefined,
            city: shippingAddress?.address?.city || '',
            state: shippingAddress?.address?.state || '',
            postal_code: shippingAddress?.address?.postal_code || '',
            country: shippingAddress?.address?.country || 'US',
          },
        }
      : undefined;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${getBaseUrl()}/checkout/success`,
        receipt_email: email,
        ...(shouldShip ? { shipping } : {}),
        payment_method_data: {
          billing_details: {
            name: shipping?.name || name,
            email,
          },
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message || 'Payment failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Contact Information</h2>
        <div className='space-y-4'>
          {shippingOption?.id === 'pickup' && (
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
          )}
          <div>
            <label htmlFor='email' className='mb-1 block text-sm font-medium'>
              Email Address
            </label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your@email.com'
              required
            />
          </div>
        </div>
      </div>

      {shippingOption?.id !== 'pickup' && (
        <div>
          <h2 className='mb-4 text-xl font-semibold'>Shipping Information</h2>
          <AddressElement
            options={{
              mode: 'shipping',
              allowedCountries: ['US'],
            }}
            onChange={(event) => {
              if (event.complete) {
                setShippingComplete(true);
                setShippingAddress(event.value);
              } else if (shippingComplete) {
                setShippingComplete(false);
                setShippingAddress(null);
              }
            }}
          />
        </div>
      )}

      <div>
        <h2 className='mb-4 text-xl font-semibold'>Payment Information</h2>
        <PaymentElement />
      </div>

      <Button
        type='submit'
        className='w-full'
        size='lg'
        disabled={isSubmitting || !stripe || !elements || !shippingOption}
      >
        {isSubmitting ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Processing...
          </>
        ) : (
          <>
            <CreditCard />
            Pay {formatPrice(getTotalWithShipping())}
          </>
        )}
      </Button>
    </form>
  );
}

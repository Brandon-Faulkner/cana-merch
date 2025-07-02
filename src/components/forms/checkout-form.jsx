import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
  const { cart, getCartTotal, clearCart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe has not loaded. Please try again.');
      return;
    }

    if (!email || !name) {
      toast.error('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${getBaseUrl()}/checkout/success`,
        receipt_email: email,
        payment_method_data: {
          billing_details: {
            name,
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
              placeholder='your@email.com'
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className='mb-4 text-xl font-semibold'>Payment Information</h2>
        <PaymentElement />
      </div>

      <Button
        type='submit'
        className='w-full'
        size='lg'
        disabled={isSubmitting || !stripe || !elements}
      >
        {isSubmitting ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Processing...
          </>
        ) : (
          <>
            <CreditCard />
            Pay {formatPrice(getCartTotal())}
          </>
        )}
      </Button>
    </form>
  );
}

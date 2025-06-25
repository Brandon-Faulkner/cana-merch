'use client';

import { useState, useEffect } from 'react';
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

// Initialize Stripe with the publishable key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

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
      toast.error('Stripe has not loaded. Please try again.');
      return;
    }

    if (!email || !name) {
      toast.error('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);

    // Process payment through Stripe
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return to the success page after successful payment
        return_url: `${window.location.origin}/checkout/success`,
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
      // Show error to customer
      toast.error(result.error.message || 'Payment failed. Please try again.');
      setIsSubmitting(false);
    }
    // The payment will redirect to return_url on success
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
        <div className='rounded-md border p-4'>
          <PaymentElement />
        </div>
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
          `Pay ${formatPrice(getCartTotal())}`
        )}
      </Button>
    </form>
  );
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Get the payment intent client secret when the page loads
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (cart.length === 0) {
          router.push('/category/all');
          return;
        }

        setLoading(true);

        // Calculate amount in cents
        const amountInCents = Math.round(getCartTotal() * 100);

        // Prepare metadata with cart items
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

        // Create a payment intent on the server
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountInCents,
            metadata,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast.error('There was a problem setting up the payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      createPaymentIntent();
    } else {
      setLoading(false);
    }
  }, [cart, getCartTotal, router]);

  if (loading) {
    return (
      <div className='container mx-auto flex justify-center py-20'>
        <div className='animate-pulse text-xl'>Loading checkout...</div>
      </div>
    );
  }

  // Redirect to products page if the cart is empty
  if (cart.length === 0) {
    return (
      <div className='container mx-auto flex flex-col items-center justify-center py-20'>
        <p className='text-xl'>Your cart is empty</p>
        <Button asChild className='mt-4'>
          <Link href='/category/all'>View Products</Link>
        </Button>
      </div>
    );
  }

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#6366F1', // Match your site's primary color
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Checkout</h1>

      <div className='grid gap-8 lg:grid-cols-3'>
        {/* Cart Summary */}
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

                    <p className='text-muted-foreground mt-1 text-sm'>
                      {formatPrice(item.price)} each
                    </p>

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
                  <span>Shipping</span>
                  <span className='text-muted-foreground'>Free</span>
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

        {/* Checkout Form */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete your purchase securely with Stripe</CardDescription>
            </CardHeader>
            <CardContent>
              {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements>
              )}
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 border-t px-6 py-4'>
              <p className='text-muted-foreground text-sm'>
                By completing this purchase, you agree to our{' '}
                <Link href='#' className='underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='#' className='underline'>
                  Privacy Policy
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

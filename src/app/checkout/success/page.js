import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')}`;

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

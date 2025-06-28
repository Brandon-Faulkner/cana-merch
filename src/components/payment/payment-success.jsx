import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export function PaymentSuccess({ orderNumber, amount, email }) {
  return (
    <div className='flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-16'>
      <Card className='w-full max-w-md border border-primary/30 shadow-xl'>
        <CardContent className='flex flex-col items-center px-6 pt-8 pb-4 text-center'>
          <div className='mb-6 rounded-full bg-primary/10 p-4'>
            <CheckCircle className='h-10 w-10 text-primary' />
          </div>
          <h1 className='mb-1 text-2xl font-semibold tracking-tight'>Payment Successful</h1>
          <p className='text-muted-foreground mb-6 text-sm'>
            Thank you for your order! We've received your payment.
          </p>

          <div className='w-full rounded-lg border bg-muted/50 p-4 text-left'>
            <div className='mb-2'>
              <p className='text-xs text-muted-foreground'>Order Number</p>
              <p className='text-sm font-medium'>{orderNumber}</p>
            </div>
            {amount && (
              <div className='mb-2'>
                <p className='text-xs text-muted-foreground'>Amount Paid</p>
                <p className='text-sm font-medium'>${amount}</p>
              </div>
            )}
            {email && (
              <div>
                <p className='text-xs text-muted-foreground'>Confirmation Email</p>
                <p className='text-sm font-medium'>{email}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex justify-center px-6 pb-6'>
          <Button asChild className='w-full'>
            <Link href='/'>Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

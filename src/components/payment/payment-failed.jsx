import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { BanknoteX } from 'lucide-react';

export function PaymentFailed() {
  return (
    <div className='flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-12'>
      <Card className='w-full max-w-md border border-destructive/30 shadow-xl'>
        <CardContent className='flex flex-col items-center px-6 pt-8 pb-4 text-center'>
          <div className='mb-6 rounded-full bg-destructive/10 p-4'>
            <BanknoteX className='h-10 w-10 text-destructive' />
          </div>
          <h1 className='mb-1 text-2xl font-semibold tracking-tight'>Payment Failed</h1>
          <p className='text-muted-foreground mb-6 text-sm'>
            There was an issue processing your payment. Please try again.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center px-6 pb-6'>
          <Button asChild className='w-full' variant='destructive'>
            <Link href='/checkout'>Return to Checkout</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

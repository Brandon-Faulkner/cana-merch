import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckoutForm } from '@/components/forms/checkout-form';

export function StripeForm() {
  return (
    <div className='lg:col-span-2'>
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Complete your purchase securely with Stripe</CardDescription>
        </CardHeader>
        <CardContent>
          <CheckoutForm />
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 border-t px-6 py-4'>
          <p className='text-muted-foreground text-sm'>
            By completing this purchase, you agree to our &thinsp;
            <Link href='/legal/terms' className='underline'>
              Terms of Service
            </Link>
            &thinsp; and &thinsp;
            <Link href='/legal/privacy' className='underline'>
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className='m-auto max-w-7xl px-4 py-16'>
      <Card>
        <CardContent className='space-y-6 pt-6'>
          <h1 className='text-3xl font-bold'>Terms of Service</h1>

          <p className='text-muted-foreground'>
            These Terms of Service (&quot;Terms&quot;) apply to the merchandise payment platform
            provided by Cana Church (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By
            completing a payment through this website, you agree to the terms below.
          </p>

          <div>
            <h2 className='text-xl font-semibold'>1. Overview</h2>
            <p className='text-muted-foreground'>
              This site allows you to pay for church merchandise that you have picked up in person
              at Cana Church. No shipping or delivery is provided. All items are selected and taken
              by the customer before payment.
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold'>2. Payment</h2>
            <p className='text-muted-foreground'>
              Payments are processed securely through Stripe. Prices are listed in USD. By
              submitting your payment, you authorize the transaction and agree that the item has
              already been received.
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold'>3. Returns</h2>
            <p className='text-muted-foreground'>
              Since you physically select and take your items before paying, all sales are final.
              Exchanges may be granted for defective items at our discretion. Please contact us
              within 7 days if needed.
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold'>4. Contact</h2>
            <p className='text-muted-foreground'>
              For any questions, please contact us at &thinsp;
              <a href='mailto:info@canachurch.com' className='underline'>
                cana@canachurch.com
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className='m-auto max-w-7xl px-4 py-16'>
      <Card>
        <CardContent className='space-y-6 pt-6'>
          <h1 className='text-3xl font-bold'>Privacy Policy</h1>

          <p className='text-muted-foreground'>
            This Privacy Policy explains how Cana Church ("we," "us," or "our") collects and uses
            your personal information when you pay for merchandise through our website.
          </p>

          <div>
            <h2 className='text-xl font-semibold'>1. Information Collected</h2>
            <p className='text-muted-foreground'>
              We collect your name and email address when you complete a payment. This information
              is used solely to identify your transaction in Stripe.
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold'>2. How We Store and Use Your Data</h2>
            <p className='text-muted-foreground'>
              We do not store any of your information on our own servers. All data is securely
              handled and stored by Stripe, our payment processor.
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold'>3. Data Sharing</h2>
            <p className='text-muted-foreground'>
              We do not sell or share your data. Your payment and contact details are handled
              entirely through Stripe in accordance with their &thinsp;
              <a
                href='https://stripe.com/privacy'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold'>4. Your Rights</h2>
            <p className='text-muted-foreground'>
              You may contact us to request confirmation or deletion of your name or email stored in
              Stripe. We will comply in accordance with Stripe's capabilities and applicable laws.
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold'>5. Contact</h2>
            <p className='text-muted-foreground'>
              If you have any questions about this policy, please email &thinsp;
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

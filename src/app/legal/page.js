import Link from 'next/link';

export const metadata = {
  title: 'Cana Merch | Legal',
};

export default function LegalPage() {
  return (
    <div className='m-auto max-w-7xl px-4 py-16'>
      <h1 className='mb-4 text-2xl font-bold'>Legal Information</h1>
      <ul className='text-muted-foreground space-y-2'>
        <li>
          <Link href='/legal/terms' className='underline'>
            Terms of Service
          </Link>
        </li>
        <li>
          <Link href='/legal/privacy' className='underline'>
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}

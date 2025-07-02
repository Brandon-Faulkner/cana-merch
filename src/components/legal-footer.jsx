import Link from 'next/link';

export default function LegalFooter() {
  return (
    <div className='text-muted-foreground border-t py-6 text-center text-xs'>
      <Link href='/legal/terms' className='underline'>
        Terms of Service
      </Link>
      &thinsp;|&thinsp;
      <Link href='/legal/privacy' className='underline'>
        Privacy Policy
      </Link>
    </div>
  );
}

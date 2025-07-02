import Image from 'next/image';

export function FooterSection() {
  return (
    <section className='bg-muted/50 py-12'>
      <div className='m-auto max-w-7xl px-4 md:px-6'>
        <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='relative h-[300px] w-full'>
            <Image
              src='https://placehold.co/600x400'
              alt='Our church community'
              fill
              className='rounded-lg object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tighter'>More Than Just Merch</h2>
            <p className='text-muted-foreground'>
              Every item you pick up supports Cana Church and its mission. Your purchase helps fund
              local outreach, events, and ministry efforts—while giving you something meaningful to
              wear or use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

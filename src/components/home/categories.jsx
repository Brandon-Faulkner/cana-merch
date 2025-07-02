import Image from 'next/image';
import Link from 'next/link';

export function CategoriesSection({ categories }) {
  return (
    <section id='categories' className='bg-muted/50 py-12'>
      <div className='m-auto max-w-7xl px-4 md:px-6'>
        <h2 className='mb-10 text-center text-2xl font-bold'>Browse by Category</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className='group relative h-80 overflow-hidden rounded-lg'
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              <div className='absolute bottom-0 left-0 p-4'>
                <h3 className='text-xl font-semibold text-white'>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

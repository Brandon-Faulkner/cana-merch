import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getProducts, getCategories } from '@/lib/api/products';

// Fetch data from Stripe
async function getHomePageData() {
  // Fetch featured products from Stripe
  const featuredProducts = await getProducts({ featured: true, limit: 4 });

  // Fetch categories
  const categories = await getCategories();

  return {
    featuredProducts,
    categories,
  };
}

export default async function Home() {
  // Fetch data from Stripe
  const { featuredProducts, categories } = await getHomePageData();
  return (
    <>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-24'>
        <div className='m-auto max-w-7xl px-4 md:px-6'>
          <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Quality Church Merchandise for Your Faith Journey
              </h1>
              <p className='text-gray-500 md:text-xl dark:text-gray-400'>
                Share your faith with our premium collection of church merchandise. From comfortable
                t-shirts to inspiring accessories.
              </p>
              <div className='flex flex-col gap-2 sm:flex-row'>
                <Button size='lg' asChild>
                  <Link href='/category/all'>Shop Now</Link>
                </Button>
                <Button variant='outline' size='lg' asChild>
                  <Link href='#categories'>Browse Categories</Link>
                </Button>
              </div>
            </div>
            <div className='relative h-[400px] w-full'>
              <Image
                src='https://placehold.co/800x600'
                alt='Featured church merchandise'
                fill
                className='rounded-lg object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id='categories' className='bg-muted/50 py-12'>
        <div className='m-auto max-w-7xl px-4 md:px-6'>
          <h2 className='mb-10 text-center text-2xl font-bold'>Shop by Category</h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className='group relative h-[200px] overflow-hidden rounded-lg'
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

      {/* Featured Products Section */}
      <section className='py-12'>
        <div className='m-auto max-w-7xl px-4 md:px-6'>
          <h2 className='mb-10 text-center text-2xl font-bold'>Featured Products</h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='mt-10 text-center'>
            <Button variant='outline' size='lg' asChild>
              <Link href='/category/all'>View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
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
              <h2 className='text-3xl font-bold tracking-tighter'>Our Mission</h2>
              <p className='text-gray-500 dark:text-gray-400'>
                Our merchandise isn't just about fashion—it's about sharing faith and supporting our
                church's mission. Every purchase helps fund community outreach programs and church
                initiatives.
              </p>
              <Button variant='outline' asChild>
                <Link href='/about'>Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

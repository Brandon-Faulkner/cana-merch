import { getProducts, getCategories } from '@/lib/api/products';
import { HeroSection } from '@/components/home/hero';
import { CategoriesSection } from '@/components/home/categories';
import { FeaturedSection } from '@/components/home/featured';
import { FooterSection } from '@/components/home/footer';

// Fetch data from Stripe
async function getHomePageData() {
  const featuredProducts = await getProducts({ featured: true });
  const categories = await getCategories();

  return {
    featuredProducts,
    categories,
  };
}

export default async function Home() {
  const { featuredProducts, categories } = await getHomePageData();

  return (
    <>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturedSection featuredProducts={featuredProducts} />
      <FooterSection />
    </>
  );
}

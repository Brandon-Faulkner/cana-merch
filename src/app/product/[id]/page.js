'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-provider';
import { ChevronLeft } from 'lucide-react';
import { getProduct, getProducts } from '@/lib/api/products';
import { ProductDetails } from '@/components/products/product-details';
import { SimilarProducts } from '@/components/products/similar-products';
import { ProductSkeleton } from '@/components/skeletons/product-skeleton';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;
  const { addToCart } = useCart();

  // State for product data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  // State for product options
  const [quantity, setQuantity] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (!product) return;
    document.title = `Cana Merch | ${product.name}`;
  }, [product]);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const productData = await getProduct(productId);

        if (productData) {
          setProduct(productData);

          // Set default selections
          if (productData.variants && productData.variants.length > 0) {
            setSelectedVariant(productData.variants[0]);
          }
          if (productData.colors && productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
          if (productData.inStock) {
            setQuantity(1);
          }

          // Fetch similar products from the same category
          const category = productData.category;
          const similar = await getProducts({ category });
          setSimilarProducts(similar.filter((p) => p.id !== productData.id).slice(0, 4));
        } else {
          setError('Merch not found');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Sorry, the merch you are looking for does not exist or could not be found.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error || !product) {
    return (
      <div className='m-auto max-w-7xl py-16 text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Merch Not Found</h1>
        <p className='mb-6'>{error}</p>
        <Button asChild>
          <Link href='/category/all'>Browse Merch</Link>
        </Button>
      </div>
    );
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        quantity,
        variant: selectedVariant,
        color: selectedColor,
      },
      quantity,
    );
  };

  return (
    <div className='m-auto max-w-7xl px-4 py-8'>
      <Button variant='ghost' asChild className='mb-6'>
        <Link href='/category/all' className='flex items-center gap-2'>
          <ChevronLeft className='h-4 w-4' />
          Back to Merch
        </Link>
      </Button>

      <ProductDetails
        product={product}
        quantity={quantity}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        handleAddToCart={handleAddToCart}
      />

      <SimilarProducts similarProducts={similarProducts} />
    </div>
  );
}

import { getBaseUrl } from '../utils';

/**
 * Fetches all products from the API
 * @param {Object} [options={}] - Options for fetching products
 * @param {string} options.category - Category filter
 * @param {boolean} options.featured - Only fetch featured products
 * @param {number} options.limit - Maximum number of products to fetch
 * @returns {Promise<Array>} - Promise resolving to an array of products
 */
export async function getProducts(options = {}) {
  try {
    const { category, featured, limit } = options;

    // Build the query string
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (featured) params.append('featured', 'true');
    if (limit) params.append('limit', limit.toString());
    const queryString = params.toString();

    const url = `${getBaseUrl()}/api/products${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
}

/**
 * Fetches a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object|null>} - Promise resolving to a product object or null
 */
export async function getProduct(id) {
  try {
    const url = `${getBaseUrl()}/api/products/${id}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error in getProduct for ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetches categories from products and returns them sorted alphabetically
 * @returns {Promise<Array>} - Promise resolving to an array of category objects
 */
export async function getCategories() {
  try {
    const products = await getProducts();

    const categoryMap = products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = {
          name: category.charAt(0).toUpperCase() + category.slice(1),
          href: `/category/${category}`,
          image: product.image,
        };
      }
      return acc;
    }, {});

    return Object.values(categoryMap).sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}

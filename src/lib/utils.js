import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Take a currency amount and formats it into a US dollar value or by the options provided
 * @param {number} price The numerical currency amount to format
 * @param {Object} [options={}] Custom format options
 * @param {string} options.currency The currency locale to use. Ex: 'USD'
 * @param {string} options.notation The different ways to display the currency string. Ex: 'Standard'
 * @returns {string} The formatted currency value
 */
export function formatPrice(price, options = {}) {
  const { currency = 'USD', notation = 'standard' } = options;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Converts a numerical dollar amount into cents
 * @param {number} dollars The dollar amount to convert to cents
 * @returns {number} The converted dollar amount in cents
 */
export function toCents(dollars) {
  return Math.round(dollars * 100);
}

/**
 * Gets the base URL for API requests, handling both client and server environments
 * @returns {string} The base URL to use for API requests
 */
export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  );
}

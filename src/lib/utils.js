import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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

export function toCents(dollars) {
  return Math.round(dollars * 100);
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function truncate(text, length) {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

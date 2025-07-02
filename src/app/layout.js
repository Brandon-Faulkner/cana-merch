import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/header';
import LegalFooter from '@/components/legal-footer';
import { CartProvider } from '@/context/cart-provider';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';

const futura = localFont({
  src: [
    {
      path: '../resources/fonts/FuturaCyrillicLight.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../resources/fonts/FuturaCyrillicBook.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../resources/fonts/FuturaCyrillicMedium.woff',
      weight: '450',
      style: 'normal',
    },
    {
      path: '../resources/fonts/FuturaCyrillicDemi.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../resources/fonts/FuturaCyrillicHeavy.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../resources/fonts/FuturaCyrillicBold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../resources/fonts/FuturaCyrillicExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-futura',
  display: 'swap',
});

export const metadata = {
  title: 'Cana Merch',
  description:
    'Grab your Cana Church merch at the counter, then pay online in seconds. No shipping, no hassle—just simple, secure checkout.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${futura.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className='relative flex min-h-screen flex-col'>
              <Header />
              <main className='flex-1'>{children}</main>
              <LegalFooter />
            </div>
            <Toaster richColors />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

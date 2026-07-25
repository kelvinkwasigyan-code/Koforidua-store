import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/store/CartContext';
import CartDrawer from '@/components/store/CartDrawer';
import WhatsAppButton from '@/components/store/WhatsAppButton';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/store/Header';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Joe Rich Phones & Accessories',
  description: 'Buy mobile phones, tablets, and accessories in Ghana.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-red-50/40 via-gray-50 to-red-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <CartProvider>
            <Header />
            {children}
            <CartDrawer />
            <WhatsAppButton />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

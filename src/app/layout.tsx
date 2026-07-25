import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Header from '@/components/store/Header';
import Footer from '@/components/store/Footer';
import CartDrawer from '@/components/store/CartDrawer';
import LoadingBar from '@/components/store/LoadingBar';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Joe Rich Phones & Accessories',
  description: 'Your trusted store in Ghana for genuine devices and accessories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <CartProvider>
          <LoadingBar />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
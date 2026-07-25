import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Header from '@/components/store/Header';
import Footer from '@/components/store/Footer';
import CartDrawer from '@/components/store/CartDrawer';

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
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
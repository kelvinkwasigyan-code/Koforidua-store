import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Header from '@/components/store/Header';
import Footer from '@/components/store/Footer';
import CartDrawer from '@/components/store/CartDrawer';
import LoadingBar from '@/components/store/LoadingBar';
import MobileBottomNav from '@/components/store/MobileBottomNav';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Joerich Phones & Accessories',
  description: 'Your trusted store in Ghana for genuine devices and accessories.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <CartProvider>
          <LoadingBar />
          <Header />
          <div className="pb-16 md:pb-0 min-h-screen">
            {children}
          </div>
          <Footer />
          <CartDrawer />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
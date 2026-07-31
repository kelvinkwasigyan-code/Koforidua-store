import type { Metadata, Viewport } from 'next';
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
  description: 'Your trusted store in Ghana for genuine smartphones, tablets, watches, and accessories.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Joerich Store',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative min-h-screen selection:bg-red-500 selection:text-white">
        
        {/* Apple Ambient Glass Light Spheres */}
        <div className="fixed -top-32 -left-32 w-96 h-96 bg-red-500/10 dark:bg-red-600/15 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="fixed top-1/2 -right-32 w-[30rem] h-[30rem] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="fixed -bottom-32 left-1/4 w-[28rem] h-[28rem] bg-rose-500/10 dark:bg-rose-600/15 rounded-full blur-[140px] pointer-events-none z-0" />

        <CartProvider>
          <LoadingBar />
          <Header />
          <div className="pb-24 md:pb-0 min-h-screen relative z-10">
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
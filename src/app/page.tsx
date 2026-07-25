import Header from '@/components/store/Header';
import ProductGrid from '@/components/store/ProductGrid';
import TrustBadges from '@/components/store/TrustBadges';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductGrid />
        <TrustBadges />
      </div>
    </main>
  );
}

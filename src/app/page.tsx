import CategoryRow from '@/components/store/CategoryRow';
import ProductGrid from '@/components/store/ProductGrid';
import TrustBadges from '@/components/store/TrustBadges';
import Footer from '@/components/store/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <CategoryRow />
        <ProductGrid />
        <TrustBadges />
      </div>
      <Footer />
    </main>
  );
}

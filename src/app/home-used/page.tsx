import Header from '@/components/store/Header';
import Footer from '@/components/store/Footer';
import ProductGrid from '@/components/store/ProductGrid';

export default function HomeUsedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <main className="flex-1 w-full pb-20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Used Phones
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Get premium devices at a fraction of the cost. All our home-used products are fully tested, verified, and come with a reliable warranty.
          </p>
        </div>
        
        <ProductGrid condition="USED" />
      </main>
    </div>
  );
}

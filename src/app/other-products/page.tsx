import ProductGrid from '@/components/store/ProductGrid';

export default function OtherProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <main className="flex-1 w-full pb-20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Other Products & Accessories
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Discover our premium collection of smartwatches, high-quality speakers, luxury fragrances, and essential accessories.
          </p>
        </div>
        
        {/* Pass keywords to filter out any smartphones or iPhones */}
        <ProductGrid excludeKeywords={['phone', 'iphone', 'smartphone', 'galaxy', 'pixel']} />
      </main>
    </div>
  );
}

import Header from '@/components/store/Header';
import Footer from '@/components/store/Footer';
import ProductGrid from '@/components/store/ProductGrid';

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <main className="flex-1 w-full pb-20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
            New Arrivals
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Check out the latest and greatest devices that just hit our shelves. 
            All our new arrivals are brand new and factory sealed.
          </p>
        </div>
        
        {/* Pass condition="NEW" if you only want new items, or omit it to just get the latest items across both */}
        <ProductGrid condition="NEW" />
      </main>
    </div>
  );
}

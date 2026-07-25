'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, CheckCircle2, ShieldCheck, Truck, Minus, Plus } from 'lucide-react';

interface ProductDetailsClientProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stockQuantity: number;
    images: string[];
    features: any;
    category: {
      name: string;
    };
  };
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart, openCart } = useCart();
  const [activeImage, setActiveImage] = useState(product.images[0] || '/file.svg');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

  const handleAddToCart = () => {
    setIsAdding(true);
    // Add multiple if quantity > 1
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 400);
  };

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => Math.min(product.stockQuantity || 10, prev + 1));

  const featuresList = product.features ? (Array.isArray(product.features) ? product.features : typeof product.features === 'object' ? Object.entries(product.features).map(([k, v]) => `${k}: ${v}`) : [product.features]) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Column: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-square bg-gray-100 rounded-3xl overflow-hidden flex items-center justify-center p-8 border border-gray-200">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-red-600 shadow-md scale-105' : 'border-transparent bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover mix-blend-multiply p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider rounded-full">
              {product.category.name}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-end gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              GH₵{Number(product.price).toFixed(2)}
            </span>
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600 mb-1.5">
                <CheckCircle2 size={16} /> In Stock
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-red-500 mb-1.5">
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-gray-600 text-base leading-relaxed mb-8">
            {product.description || 'No description available for this product.'}
          </p>

          {/* Features / Specs */}
          {featuresList.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {featuresList.map((feature: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span>{String(feature)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Storage Capacity Selection (If available) */}
          {product.features?.storage && Array.isArray(product.features.storage) && product.features.storage.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  Select Storage Capacity
                </span>
                <span className="text-xs font-bold text-red-600">
                  {selectedStorage || product.features.storage[0]}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.features.storage.map((st: string, idx: number) => {
                  const isSelected = (selectedStorage || product.features.storage[0]) === st;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedStorage(st)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                        isSelected
                          ? 'border-gray-900 bg-gray-900 text-white shadow-sm ring-2 ring-gray-900/10'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Selection (If available for Brand New Products) */}
          {product.features?.colors && Array.isArray(product.features.colors) && product.features.colors.length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                  Available Color Options
                </span>
                <span className="text-xs font-semibold text-red-600">
                  {selectedColor?.name || product.features.colors[0]?.name}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.features.colors.map((c: any, idx: number) => {
                  const isSelected = (selectedColor?.name || product.features.colors[0]?.name) === c.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'border-red-600 bg-white text-gray-900 shadow-sm ring-2 ring-red-600/20'
                          : 'border-gray-200 bg-white/60 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="h-px bg-gray-200 w-full mb-8" />

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border-2 border-gray-200 rounded-2xl px-2 h-14 w-full sm:w-36">
              <button 
                onClick={handleDecrease}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
              <button 
                onClick={handleIncrease}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                disabled={quantity >= (product.stockQuantity || 10)}
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={product.stockQuantity <= 0 || isAdding}
              className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-lg transition-all shadow-sm ${
                product.stockQuantity <= 0 
                  ? 'bg-gray-300 cursor-not-allowed'
                  : isAdding
                    ? 'bg-red-700 scale-[0.98]'
                    : 'bg-red-600 hover:bg-red-700 hover:shadow-md hover:-translate-y-0.5 active:scale-95'
              }`}
            >
              <ShoppingBag size={22} />
              <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm text-red-600">
                <Truck size={20} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Nationwide<br/>Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm text-red-600">
                <ShieldCheck size={20} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Verified<br/>Authentic</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRecordView } from '@/hooks/useRecordView';
import WishlistButton from '@/components/store/WishlistButton';
import { ShoppingBag, CheckCircle2, ShieldCheck, Truck, Minus, Plus, Star, MessageSquare, BadgeCheck, X, AlertCircle } from 'lucide-react';

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

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  useRecordView(product.id);
  const { addToCart, openCart } = useCart();
  const [activeImage, setActiveImage] = useState(product.images[0] || '/file.svg');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Write Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [uploadingReviewImage, setUploadingReviewImage] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  async function fetchReviews() {
    try {
      const res = await fetch(`/api/reviews?productId=${product.id}`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews || []);
        setTotalReviews(data.totalReviews || 0);
        setAverageRating(data.averageRating || 0);
        setRatingCounts(data.ratingCounts || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    const variantStr = selectedVariant || (product.features?.variants && product.features.variants[0]);
    const storageStr = selectedStorage || (product.features?.storage && product.features.storage[0]);

    let titleSuffix = [];
    if (variantStr) titleSuffix.push(variantStr);
    if (storageStr) titleSuffix.push(storageStr);

    const customProduct = {
      ...product,
      name: titleSuffix.length > 0 ? `${product.name} (${titleSuffix.join(' - ')})` : product.name,
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(customProduct);
    }
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 400);
  };

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => Math.min(product.stockQuantity || 10, prev + 1));

  const handleReviewFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingReviewImage(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.urls) {
        setReviewImages((prev) => [...prev, ...data.urls]);
      }
    } catch (err) {
      console.error('Error uploading review image:', err);
    } finally {
      setUploadingReviewImage(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !customerName || !comment) return;

    setReviewSubmitting(true);
    setReviewError('');
    setReviewSuccess(false);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          productId: product.id,
          rating,
          comment,
          customerName,
          images: reviewImages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setReviewSuccess(true);
      await fetchReviews();

      // Reset Form
      setOrderId('');
      setCustomerName('');
      setComment('');
      setRating(5);
      setReviewImages([]);

      setTimeout(() => {
        setIsReviewModalOpen(false);
        setReviewSuccess(false);
      }, 1500);
    } catch (err: any) {
      setReviewError(err.message || 'An error occurred during verification.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const featuresList = product.features
    ? Array.isArray(product.features)
      ? product.features
      : typeof product.features === 'object' && !product.features.colors && !product.features.storage
      ? Object.entries(product.features).map(([k, v]) => `${k}: ${v}`)
      : []
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="flex flex-col gap-3">
          <div className="w-full h-56 sm:h-80 lg:aspect-square lg:h-auto max-h-[280px] sm:max-h-[380px] lg:max-h-none bg-gradient-to-b from-gray-100/80 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl overflow-hidden flex items-center justify-center p-4 sm:p-8 border border-gray-200/80 dark:border-white/10 shadow-xs relative">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full max-h-[240px] sm:max-h-[340px] lg:max-h-none object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2.5 sm:gap-4 overflow-x-auto pb-1.5 snap-x scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === img
                      ? 'border-red-600 shadow-md scale-105'
                      : 'border-transparent bg-gray-100 dark:bg-slate-800 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover mix-blend-multiply p-1.5" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider rounded-full">
              {product.category.name}
            </span>

            {/* Star Rating Summary Header */}
            {totalReviews > 0 && (
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span>{averageRating}</span>
                <span className="text-gray-400 font-normal">({totalReviews} reviews)</span>
              </div>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-3">
            {product.name}
          </h1>

          <div className="flex items-end gap-3 mb-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              GH₵{Number(product.price).toFixed(2)}
            </span>
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 mb-1">
                <CheckCircle2 size={16} /> In Stock
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-500 mb-1">
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-5">
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

          {/* Model Variant Selection (Pro / Pro Max / Standard / Plus) */}
          {product.features?.variants && Array.isArray(product.features.variants) && product.features.variants.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-200/80 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                  Select Model Variant
                </span>
                <span className="text-xs font-bold text-red-600">
                  {selectedVariant || product.features.variants[0]}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.features.variants.map((variant: string, idx: number) => {
                  const isSelected = (selectedVariant || product.features.variants[0]) === variant;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
                        isSelected
                          ? 'border-red-600 bg-red-600 text-white shadow-md shadow-red-600/20'
                          : 'border-gray-200 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      {variant}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Storage Capacity Selection (Smartphones & Tablets Only) */}
          {['Smartphones', 'Tablets', 'iPhones', 'iPads'].includes(product.category?.name || '') &&
            product.features?.storage &&
            Array.isArray(product.features.storage) &&
            product.features.storage.length > 0 && (
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

          {/* Color Selection */}
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

            <button
              onClick={handleAddToCart}
              disabled={product.stockQuantity <= 0 || isAdding}
              className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-lg transition-all shadow-sm ${
                product.stockQuantity <= 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : isAdding
                  ? 'bg-gray-800 scale-[0.98]'
                  : 'bg-gray-900 hover:bg-black hover:shadow-md hover:-translate-y-0.5 active:scale-95'
              }`}
            >
              <ShoppingBag size={22} />
              <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
            </button>

            <div className="flex items-center justify-center h-14 w-14 shrink-0 border-2 border-gray-200 rounded-2xl bg-white shadow-xs">
              <WishlistButton productId={product.id} />
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm text-red-600">
                <Truck size={20} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Nationwide<br />Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm text-red-600">
                <ShieldCheck size={20} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Verified<br />Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Customer Reviews Section */}
      <div className="mt-16 pt-12 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Verified Customer Reviews</h2>
            <p className="text-sm text-gray-500 mt-1">
              Only authentic reviews left by customers who purchased this item.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-6 py-3.5 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-2xl shadow-sm transition active:scale-95 flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <MessageSquare size={18} />
            <span>Write a Verified Review</span>
          </button>
        </div>

        {/* Rating Breakdown & Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Card */}
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200/80 h-fit space-y-4">
            <div className="text-center pb-4 border-b border-gray-200">
              <div className="text-5xl font-black text-gray-900">{averageRating}</div>
              <div className="flex justify-center text-amber-400 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">Based on {totalReviews} verified ratings</p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2 text-xs">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingCounts[stars] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-8 font-bold text-gray-600 flex items-center gap-1">
                      {stars} <Star size={12} className="fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="w-8 text-right font-medium text-gray-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            {loadingReviews ? (
              <div className="py-8 text-center text-sm text-gray-500">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200/80 text-center">
                <p className="text-gray-500 font-medium mb-3">No reviews submitted for this device yet.</p>
                <p className="text-xs text-gray-400">Did you purchase this item? Click above to submit your verified review!</p>
              </div>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">{rev.customerName}</span>
                      {rev.isVerifiedPurchase && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-[10px] font-extrabold">
                          <BadgeCheck size={12} className="text-green-600" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">{rev.comment}</p>

                  {/* Review Images */}
                  {rev.images && rev.images.length > 0 && (
                    <div className="flex gap-2 pt-2 overflow-x-auto">
                      {rev.images.map((imgUrl, imgIdx) => (
                        <div key={imgIdx} className="w-16 h-16 rounded-xl border bg-gray-50 overflow-hidden shrink-0">
                          <img src={imgUrl} alt="Review attachment" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Write Verified Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsReviewModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-md w-full relative z-10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900">Write a Verified Review</h3>
                <p className="text-xs text-gray-500">Only verified buyers can leave reviews.</p>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-2 text-gray-400 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {reviewSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="font-bold text-gray-900">Review Verified & Submitted!</h4>
                <p className="text-xs text-gray-500">Thank you for sharing your experience.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {reviewError && (
                  <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-xs font-medium flex items-start gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{reviewError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Order Reference ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. cm0v... (Found in your checkout receipt)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-red-600 outline-none text-xs font-medium"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">We check this to verify you purchased this product.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame Mensah"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-red-600 outline-none text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-2 transition active:scale-95"
                      >
                        <Star
                          size={24}
                          className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="How is the battery life, condition, or delivery experience?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-red-600 outline-none text-xs font-medium"
                  />
                </div>

                {/* Upload Product Photo */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Attach Unboxing / Product Photos (Optional)
                  </label>
                  <label className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-red-500 transition">
                    <span className="text-xs font-bold text-gray-600">
                      {uploadingReviewImage ? 'Uploading...' : '📷 Add Photos'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleReviewFileUpload}
                      disabled={uploadingReviewImage}
                    />
                  </label>

                  {reviewImages.length > 0 && (
                    <div className="flex gap-2 mt-2 overflow-x-auto">
                      {reviewImages.map((url, idx) => (
                        <div key={idx} className="w-12 h-12 rounded-lg border bg-gray-50 overflow-hidden shrink-0 relative">
                          <img src={url} alt="Review Upload" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-red-600/30 transition disabled:opacity-50"
                >
                  {reviewSubmitting ? 'Verifying Purchase...' : 'Submit Verified Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

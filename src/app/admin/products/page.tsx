'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Upload, CheckCircle2, Image as ImageIcon, AlertCircle, Check, RotateCcw, Edit2, Tag } from 'lucide-react';
import Image from 'next/image';
import { getColorsForQuery, iPhoneColor, IPHONE_COLORS } from '@/lib/iphoneColors';

const STORAGE_OPTIONS = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const MODEL_VARIANTS = ['Standard', 'Plus', 'Pro', 'Pro Max'];
const SHOWCASE_IMAGES = ['/iphones.PNG', '/tablet.PNG', '/Watches.png', '/speaker.PNG', '/fragrance.PNG', '/Covers.png'];

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  condition: string;
  images: string[];
  category: Category;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCondition, setFilterCondition] = useState<'ALL' | 'NEW' | 'USED'>('ALL');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('ALL');
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState('Smartphones');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [condition, setCondition] = useState('NEW');
  const [description, setDescription] = useState('');
  
  // Image Upload State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  // Color Selection State
  const [selectedColors, setSelectedColors] = useState<iPhoneColor[]>([]);
  
  // Storage Selection State
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);

  // Model Variant Selection State (Pro, Pro Max, etc.)
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategoriesList(data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
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
        setImageUrls((prev) => [...prev, ...data.urls]);
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('File upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const [customImageUrl, setCustomImageUrl] = useState('');

  const handleAddCustomUrl = () => {
    if (!customImageUrl.trim()) return;
    setImageUrls((prev) => [...prev, customImageUrl.trim()]);
    setCustomImageUrl('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetMainImage = (indexToMakeMain: number) => {
    setImageUrls((prev) => {
      const newArr = [...prev];
      const [selected] = newArr.splice(indexToMakeMain, 1);
      return [selected, ...newArr];
    });
  };

  const resetForm = () => {
    setName('');
    setCategoryName(selectedCategoryTab !== 'ALL' ? selectedCategoryTab : 'Smartphones');
    setPrice('');
    setStockQuantity('');
    setDescription('');
    setCondition('NEW');
    setImageUrls([]);
    setCustomImageUrl('');
    setSelectedColors([]);
    setSelectedStorage([]);
    setSelectedVariants([]);
    setEditingProductId(null);
  };

  const openEditModal = (product: any) => {
    setEditingProductId(product.id);
    setName(product.name || '');
    setCategoryName(product.category?.name || 'Smartphones');
    setPrice(product.price ? String(product.price) : '');
    setStockQuantity(product.stockQuantity !== undefined ? String(product.stockQuantity) : '0');
    setCondition(product.condition || 'NEW');
    setDescription(product.description || '');
    setImageUrls(product.images || []);
    setSelectedColors(product.features?.colors || []);
    setSelectedStorage(product.features?.storage || []);
    setSelectedVariants(product.features?.variants || []);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    setSubmitting(true);
    const finalStockQuantity = (categoryName === 'Smartphones' || stockQuantity !== '') ? (stockQuantity || '10') : '10';

    try {
      const endpoint = editingProductId ? `/api/products/${editingProductId}` : '/api/admin/products';
      const method = editingProductId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          categoryName,
          price: parseFloat(price),
          stockQuantity: parseInt(finalStockQuantity, 10),
          condition,
          description,
          images: imageUrls.length > 0 ? imageUrls : ['/logo.jpg'],
          features: {
            colors: selectedColors,
            storage: selectedStorage,
            variants: selectedVariants,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save product');
      }

      await fetchProducts();
      setIsModalOpen(false);
      resetForm();
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleCondition = async (product: Product) => {
    const newCondition = product.condition === 'USED' ? 'NEW' : 'USED';
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition: newCondition }),
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === product.id ? { ...p, condition: newCondition } : p));
      }
    } catch (err) {
      console.error('Failed to toggle condition:', err);
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    const newQuantity = product.stockQuantity > 0 ? 0 : 10;
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockQuantity: newQuantity }),
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === product.id ? { ...p, stockQuantity: newQuantity } : p));
      }
    } catch (err) {
      console.error('Failed to toggle availability:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error('Delete product error:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Product Inventory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add, update, or remove items available on Joe Rich Phones.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95 flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Filter Toolbar: Category Selector Menu Dropdown & Condition Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/60 dark:bg-slate-900/60 p-3.5 rounded-3xl border border-white/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
        
        {/* Category Selection Menu Dropdown */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <label className="text-xs font-black uppercase text-gray-500 dark:text-gray-400 shrink-0 flex items-center gap-1.5">
            <Tag size={15} className="text-red-600" />
            <span>Product Category:</span>
          </label>
          <select
            value={selectedCategoryTab}
            onChange={(e) => setSelectedCategoryTab(e.target.value)}
            className="w-full sm:w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2.5 text-xs font-extrabold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-2xs transition cursor-pointer"
          >
            <option value="ALL">All Categories ({products.length} Products)</option>
            {categoriesList.map((cat) => {
              const catCount = products.filter((p) => p.category?.name === cat.name).length;
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({catCount})
                </option>
              );
            })}
          </select>
        </div>

        {/* Condition Filter Tabs */}
        {(() => {
          const categoryFilteredProducts = products.filter(
            (p) =>
              !p.images?.some((img: string) => SHOWCASE_IMAGES.includes(img)) &&
              (selectedCategoryTab === 'ALL' || p.category?.name === selectedCategoryTab)
          );
          const brandNewCount = categoryFilteredProducts.filter((p) => p.condition !== 'USED').length;
          const homeUsedCount = categoryFilteredProducts.filter((p) => p.condition === 'USED').length;

          return (
            <div className="flex items-center gap-1.5 bg-gray-100/80 dark:bg-slate-800/80 p-1 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
              <button
                onClick={() => setFilterCondition('ALL')}
                className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl transition-all ${
                  filterCondition === 'ALL'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                All Conditions
              </button>
              <button
                onClick={() => setFilterCondition('NEW')}
                className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl transition-all ${
                  filterCondition === 'NEW'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600'
                }`}
              >
                Brand New ({brandNewCount})
              </button>
              <button
                onClick={() => setFilterCondition('USED')}
                className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl transition-all ${
                  filterCondition === 'USED'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-amber-600'
                }`}
              >
                Home Used ({homeUsedCount})
              </button>
            </div>
          );
        })()}
      </div>

      {/* Product Inventory Display */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-sm font-semibold text-gray-500">Loading inventory...</div>
        ) : products.filter(p => 
            (filterCondition === 'ALL' || (filterCondition === 'USED' ? p.condition === 'USED' : p.condition !== 'USED')) &&
            (selectedCategoryTab === 'ALL' || p.category?.name === selectedCategoryTab)
          ).length === 0 ? (
          <div className="py-12 text-center text-sm font-semibold text-gray-400">No products found in {selectedCategoryTab !== 'ALL' ? selectedCategoryTab : 'this view'}.</div>
        ) : (
          <div>
            {/* Mobile View Inventory Cards (md:hidden) */}
            <div className="md:hidden divide-y divide-gray-200/80 dark:divide-slate-800">
              {products
                .filter((p) => 
                  !p.images?.some((img: string) => SHOWCASE_IMAGES.includes(img)) &&
                  (filterCondition === 'ALL' || (filterCondition === 'USED' ? p.condition === 'USED' : p.condition !== 'USED')) &&
                  (selectedCategoryTab === 'ALL' || p.category?.name === selectedCategoryTab)
                )
                .map((product) => (
                  <div key={product.id} className="p-4 space-y-3 bg-white/40 dark:bg-slate-900/40">
                    {/* Top Row: Product Info & Price */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-800 p-1 flex-shrink-0 flex items-center justify-center relative overflow-hidden border border-gray-200/60 dark:border-slate-700/60">
                          {product.images && product.images[0] ? (
                            <Image src={product.images[0]} alt={product.name} width={48} height={48} className="object-contain" />
                          ) : (
                            <ImageIcon className="text-gray-400 w-6 h-6" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-extrabold text-sm text-gray-900 dark:text-white line-clamp-1">
                            {product.name}
                          </h3>
                          <span className="inline-block text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-md border border-red-100 dark:border-red-900/50">
                            {product.category?.name || 'Uncategorized'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-gray-900 dark:text-white">
                          GH₵ {Number(product.price).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Middle Interactive Status Toggles */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => handleToggleCondition(product)}
                        title="Click to toggle Brand New / Home Used"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition active:scale-95 border ${
                          product.condition === 'USED' 
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800'
                        }`}
                      >
                        <span>{product.condition === 'USED' ? 'Home Used' : 'Brand New'}</span>
                      </button>

                      <button
                        onClick={() => handleToggleAvailability(product)}
                        title="Click to toggle In Stock / Out of Stock"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition active:scale-95 border ${
                          product.stockQuantity > 0
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800'
                            : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${product.stockQuantity > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        <span>
                          {product.stockQuantity > 0 
                            ? (product.category?.name === 'Smartphones' && product.condition === 'USED' ? `In Stock (${product.stockQuantity})` : 'In Stock') 
                            : 'Out of Stock'}
                        </span>
                      </button>
                    </div>

                    {/* Bottom Row Actions */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-slate-800/80">
                      <button
                        onClick={() => openEditModal(product)}
                        className="flex-1 py-2 px-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold text-xs rounded-xl border border-blue-200/60 dark:border-blue-900/50 flex items-center justify-center gap-1.5 active:scale-95 transition"
                      >
                        <Edit2 size={14} /> Edit Item
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 py-2 px-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-extrabold text-xs rounded-xl border border-red-200/60 dark:border-red-900/50 flex items-center justify-center gap-1.5 active:scale-95 transition"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Desktop View Table (hidden md:block) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-100/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase font-extrabold text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Condition</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Stock</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {products
                    .filter((p) => 
                      !p.images?.some((img: string) => SHOWCASE_IMAGES.includes(img)) &&
                      (filterCondition === 'ALL' || (filterCondition === 'USED' ? p.condition === 'USED' : p.condition !== 'USED')) &&
                      (selectedCategoryTab === 'ALL' || p.category?.name === selectedCategoryTab)
                    )
                    .map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                          {product.images && product.images[0] ? (
                            <Image src={product.images[0]} alt={product.name} width={40} height={40} className="object-contain" />
                          ) : (
                            <ImageIcon className="text-gray-400 w-5 h-5" />
                          )}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                          {product.name}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-500 dark:text-gray-400">
                        {product.category?.name || 'Uncategorized'}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleCondition(product)}
                          title="Click to toggle Brand New / Home Used"
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition cursor-pointer hover:scale-105 active:scale-95 border ${
                            product.condition === 'USED' 
                              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                          }`}
                        >
                          <span>{product.condition === 'USED' ? 'Home Used' : 'Brand New'}</span>
                        </button>
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">
                        GH₵ {Number(product.price).toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleAvailability(product)}
                          title="Click to toggle In Stock / Out of Stock"
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition cursor-pointer hover:scale-105 active:scale-95 border ${
                            product.stockQuantity > 0
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                              : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${product.stockQuantity > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                          <span>
                            {product.stockQuantity > 0 
                              ? (product.category?.name === 'Smartphones' && product.condition === 'USED' ? `In Stock (${product.stockQuantity})` : 'In Stock') 
                              : 'Out of Stock'}
                          </span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition inline-flex items-center gap-1"
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition inline-flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full p-6 shadow-2xl z-10 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {editingProductId ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} id="productForm" className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        categoryName === 'Speakers'
                          ? 'e.g. JBL Flip 6'
                          : categoryName === 'Tablets'
                          ? 'e.g. iPad Pro 12.9'
                          : categoryName === 'Watches'
                          ? 'e.g. Apple Watch Ultra 2'
                          : categoryName === 'Fragrance & Scalp Care'
                          ? 'e.g. Luxury Designer Perfume'
                          : categoryName === 'Accessories'
                          ? 'e.g. 20W Fast Power Adapter'
                          : 'e.g. iPhone 16 Pro Max'
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                    >
                      <option value="Smartphones">Smartphones</option>
                      <option value="Tablets">Tablets</option>
                      <option value="Watches">Watches</option>
                      <option value="Speakers">Speakers</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Fragrance & Scalp Care">Fragrance & Scalp Care</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Condition
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                    >
                      <option value="NEW">Brand New</option>
                      <option value="USED">Home Used</option>
                    </select>
                  </div>

                  {/* Model Variant Selection (Pro / Pro Max / Standard / Plus) */}
                  {(categoryName === 'Smartphones' || categoryName === 'Tablets' || name.toLowerCase().includes('iphone')) && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-extrabold text-gray-800 dark:text-gray-200 uppercase">
                          Available Model Variants
                        </label>
                        <span className="text-[10px] text-gray-500 font-semibold">
                          {selectedVariants.length} selected
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-500">
                        Indicate stock availability for <strong>Pro</strong>, <strong>Pro Max</strong>, etc. to combine listings:
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {MODEL_VARIANTS.map((variant) => {
                          const isSelected = selectedVariants.includes(variant);
                          return (
                            <button
                              type="button"
                              key={variant}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedVariants(selectedVariants.filter((v) => v !== variant));
                                } else {
                                  setSelectedVariants([...selectedVariants, variant]);
                                }
                              }}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
                                isSelected
                                  ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
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
                  {(categoryName === 'Smartphones' || categoryName === 'Tablets' || categoryName === 'iPhones' || categoryName === 'iPads') && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-extrabold text-gray-800 dark:text-gray-200 uppercase">
                          Storage Capacity Options
                        </label>
                        <span className="text-[10px] text-gray-500 font-semibold">
                          {selectedStorage.length} selected
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {STORAGE_OPTIONS.map((opt) => {
                          const isSelected = selectedStorage.includes(opt);
                          return (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedStorage(selectedStorage.filter((s) => s !== opt));
                                } else {
                                  setSelectedStorage([...selectedStorage, opt]);
                                }
                              }}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                isSelected
                                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-gray-900 dark:border-white shadow-xs'
                                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {categoryName === 'Smartphones' && condition === 'NEW' && name.trim().length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-extrabold text-gray-800 dark:text-gray-200 uppercase">
                          Available Colors (iPhone Palettes)
                        </label>
                        <span className="text-[10px] text-gray-500 font-semibold">
                          {selectedColors.length} selected
                        </span>
                      </div>

                      {getColorsForQuery(name).length === 0 ? (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                          💡 Type an iPhone model in Product Name (e.g. <em>iPhone 15 Pro</em>, <em>iPhone 13</em>) to reveal official colors.
                        </p>
                      ) : (
                        <>
                          <p className="text-[11px] text-gray-500">
                            Colors matching <strong>"{name}"</strong>:
                          </p>

                          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pt-1">
                            {getColorsForQuery(name).map((c) => {
                              const isSelected = selectedColors.some((sc) => sc.name === c.name);
                              return (
                                <button
                                  type="button"
                                  key={c.name}
                                  onClick={() => {
                                    if (isSelected) {
                                      setSelectedColors(selectedColors.filter((sc) => sc.name !== c.name));
                                    } else {
                                      setSelectedColors([...selectedColors, c]);
                                    }
                                  }}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                    isSelected
                                      ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300 shadow-xs ring-1 ring-red-500'
                                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                                  }`}
                                >
                                  <span
                                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                                    style={{ backgroundColor: c.hex }}
                                  />
                                  <span>{c.name}</span>
                                  {isSelected && <Check size={12} className="text-red-600" />}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div className={`grid ${categoryName === 'Smartphones' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                        Price (GH₵)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="14500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                      />
                    </div>

                    {categoryName === 'Smartphones' && (
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="5"
                          value={stockQuantity}
                          onChange={(e) => setStockQuantity(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Photos Manager (Upload, Remove & Order Photos) */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-extrabold text-gray-800 dark:text-gray-200 uppercase">
                        Product Photos ({imageUrls.length})
                      </label>
                      <span className="text-[10px] text-gray-500 font-semibold">
                        Upload, remove or reorder photos
                      </span>
                    </div>

                    {/* File Upload Area */}
                    <label className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition bg-white dark:bg-gray-900">
                      <Upload className="w-6 h-6 text-red-500 mb-1" />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {uploadingImage ? 'Uploading...' : 'Click to Upload Product Photo(s)'}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP formats supported</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploadingImage}
                      />
                    </label>

                    {/* Add Photo via URL */}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="url"
                        placeholder="Or paste photo image URL..."
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-red-600 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomUrl}
                        className="px-3 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs font-bold rounded-xl hover:bg-gray-800 transition"
                      >
                        Add URL
                      </button>
                    </div>

                    {/* Uploaded Gallery Manager */}
                    {imageUrls.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="block text-[11px] font-bold text-gray-500 uppercase">
                          Uploaded Gallery (First photo is Main Cover):
                        </span>

                        <div className="grid grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                          {imageUrls.map((url, idx) => (
                            <div
                              key={idx}
                              className={`relative rounded-xl border p-1 bg-white dark:bg-gray-900 group transition-all ${
                                idx === 0 ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="h-16 w-full flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
                                <Image src={url} alt={`Photo ${idx + 1}`} width={60} height={60} className="object-contain" />
                              </div>

                              {/* Main Cover Badge */}
                              {idx === 0 && (
                                <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                                  Main
                                </span>
                              )}

                              {/* Delete/Remove Photo Button */}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                title="Remove this photo"
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-md transition active:scale-95 z-10"
                              >
                                ✕
                              </button>

                              {/* Set as Main Action */}
                              {idx !== 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleSetMainImage(idx)}
                                  className="w-full mt-1 py-0.5 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-600 dark:text-gray-300 hover:text-red-600 text-[10px] font-extrabold rounded-md transition text-center"
                                >
                                  Set Main
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief details about warranty, storage, or condition..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                    />
                  </div>
                </form>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-xs font-bold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="productForm"
                  disabled={submitting}
                  className="w-1/2 py-3 rounded-2xl bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-600/30 hover:bg-red-700 transition disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

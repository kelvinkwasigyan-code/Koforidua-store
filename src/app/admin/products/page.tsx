'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Upload, CheckCircle2, Image as ImageIcon, AlertCircle, Check, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { getColorsForQuery, iPhoneColor, IPHONE_COLORS } from '@/lib/iphoneColors';

const STORAGE_OPTIONS = ['64GB', '128GB', '256GB', '512GB', '1TB'];

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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stockQuantity) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          categoryName,
          price: parseFloat(price),
          stockQuantity: parseInt(stockQuantity, 10),
          condition,
          description,
          images: imageUrls.length > 0 ? imageUrls : ['/logo.jpg'],
          colors: selectedColors,
          storage: selectedStorage,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create product');
      }

      await fetchProducts();
      setIsModalOpen(false);

      // Reset Form
      setName('');
      setPrice('');
      setStockQuantity('');
      setDescription('');
      setCondition('NEW');
      setImageUrls([]);
      setSelectedColors([]);
      setSelectedStorage([]);
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
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
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Product Inventory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add, update, or remove items available on Joe Rich Phones.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={async () => {
              await fetch('/api/admin/restore-defaults');
              fetchProducts();
            }}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm rounded-2xl transition active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} /> Restore Defaults
          </button>
          <button
            onClick={async () => {
              if (confirm('Delete all default sample products?')) {
                await fetch('/api/admin/clean-defaults');
                fetchProducts();
              }
            }}
            className="px-4 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold text-sm rounded-2xl transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Trash2 size={16} /> Clear Defaults
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>
      </div>

      {/* Product Table Card */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-sm text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">No products found in database.</div>
        ) : (
          <div className="overflow-x-auto">
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
                {products.map((product) => (
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
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        product.condition === 'USED' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {product.condition === 'USED' ? 'Home Used' : 'Brand New'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">
                      GH₵ {Number(product.price).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                        product.stockQuantity > 0
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                      }`}>
                        {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
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
                    Add New Product
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddProduct} id="productForm" className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. iPhone 15 Pro Max 256GB"
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

                  {/* Storage Capacity Selection */}
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
                  {categoryName === 'Smartphones' && condition === 'NEW' && (
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

                  <div className="grid grid-cols-2 gap-3">
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
                  </div>

                  {/* Image File Upload Integration */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Product Images
                    </label>
                    <label className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition">
                      <Upload className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                        {uploadingImage ? 'Uploading...' : 'Click to Upload Product Image(s)'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploadingImage}
                      />
                    </label>

                    {imageUrls.length > 0 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto">
                        {imageUrls.map((url, idx) => (
                          <div key={idx} className="w-14 h-14 rounded-xl border p-1 bg-gray-50 relative shrink-0">
                            <Image src={url} alt="Uploaded preview" width={50} height={50} className="object-contain" />
                          </div>
                        ))}
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

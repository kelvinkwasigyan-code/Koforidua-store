'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Tag, Search, X, Check, AlertCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  _count?: {
    products: number;
  };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form states
  const [categoryName, setCategoryName] = useState('');
  const [editName, setEditName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create category');
      }

      setCategoryName('');
      setIsAddModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editName.trim()) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update category');
      }

      setEditingCategory(null);
      setEditName('');
      fetchCategories();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    const productCount = category._count?.products || 0;
    if (productCount > 0) {
      alert(`Cannot delete "${category.name}". There are ${productCount} product(s) attached to this category.`);
      return;
    }

    if (!confirm(`Are you sure you want to delete category "${category.name}"?`)) return;

    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete category');
        return;
      }

      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Category Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create new store categories or edit existing ones.
          </p>
        </div>

        <button
          onClick={() => {
            setCategoryName('');
            setErrorMsg('');
            setIsAddModalOpen(true);
          }}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories by name..."
          className="w-full bg-transparent text-xs font-semibold text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Categories Table Card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-bold text-sm">Loading categories...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-bold text-sm">No categories found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 text-[11px] font-black uppercase tracking-wider text-gray-400 bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="py-4 px-6">Category Name</th>
                  <th className="py-4 px-6">Attached Products</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-semibold text-gray-900 dark:text-white">
                {filteredCategories.map((category) => {
                  const productCount = category._count?.products || 0;
                  return (
                    <tr key={category.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center font-bold shrink-0">
                          <Tag size={18} />
                        </div>
                        <span className="font-extrabold text-sm text-gray-900 dark:text-white">{category.name}</span>
                      </td>

                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold ${
                          productCount > 0 
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {productCount} product{productCount !== 1 && 's'}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setEditName(category.name);
                            setErrorMsg('');
                          }}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"
                          title="Edit Category"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition"
                          title="Delete Category"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD CATEGORY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Add New Category</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Category Name</label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Smartwatches, AirPods, Game Consoles"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95 disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Edit Category</h2>
              <button onClick={() => setEditingCategory(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleEditCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Category Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

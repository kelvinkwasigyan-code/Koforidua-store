'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, Store, ShoppingBag, MapPin, Phone, Mail, RotateCcw, ShieldCheck, CheckCircle2, LogOut, Lock, MessageSquare } from 'lucide-react';
import { fetchStoreSettings } from '@/lib/storeSettings';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('Joerich Phones');
  const [phone, setPhone] = useState('0547654736');
  const [whatsappNumber, setWhatsappNumber] = useState('0547654736');
  const [location, setLocation] = useState('Koforidua, Accra Station');
  
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savingStore, setSavingStore] = useState(false);
  const [restoringDefaults, setRestoringDefaults] = useState(false);

  // Admin Credential Form State
  const [adminEmail, setAdminEmail] = useState('admin@joerichphones.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [credSubmitting, setCredSubmitting] = useState(false);
  const [credMessage, setCredMessage] = useState('');
  const [credError, setCredError] = useState('');

  useEffect(() => {
    async function loadSettings() {
      const s = await fetchStoreSettings();
      setStoreName(s.storeName);
      setPhone(s.storePhone);
      setWhatsappNumber(s.whatsappNumber);
      setLocation(s.storeLocation);
    }
    loadSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStore(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsappNumber,
          storeName,
          storePhone: phone,
          storeLocation: location,
        }),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingStore(false);
    }
  };

  const handleUpdateAdminCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredMessage('');
    setCredError('');
    setCredSubmitting(true);

    try {
      const res = await fetch('/api/admin/update-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCredMessage('Admin login credentials updated successfully!');
        setAdminPassword('');
      } else {
        setCredError(data.error || 'Failed to update credentials.');
      }
    } catch (err) {
      setCredError('Connection error. Please try again.');
    } finally {
      setCredSubmitting(false);
    }
  };

  const handleRestoreDefaults = async () => {
    setRestoringDefaults(true);
    try {
      await fetch('/api/admin/restore-defaults');
      alert('Default showcase products restored successfully!');
    } catch (e) {
      console.error(e);
    } finally {
      setRestoringDefaults(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('joerich_user');
    localStorage.removeItem('admin_session');
    router.push('/admin/login');
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Admin Portal Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure WhatsApp Business order routing line, store details, and portal security.</p>
        </div>
        <button
          onClick={handleSignOut}
          className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-400 font-extrabold text-xs rounded-2xl transition border border-red-200 dark:border-red-900 flex items-center gap-2 active:scale-95 shrink-0"
        >
          <LogOut size={16} />
          <span>Sign Out of Portal</span>
        </button>
      </div>

      {/* PROMINENT CUSTOMER SHOP PORTAL REDIRECT CARD */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-red-600/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
            <Store size={14} /> Customer Portal Switch
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Visit Customer Shop Front</h2>
          <p className="text-white/90 text-sm leading-relaxed">
            Redirect to your live customer-facing storefront to view available devices, test the shopping cart, wishlist, and customer checkout experience.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-100 text-red-600 font-extrabold text-sm rounded-2xl transition shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <ShoppingBag size={18} /> Open Live Shop Portal
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto px-5 py-3.5 bg-red-700/60 hover:bg-red-800/80 text-white font-bold text-sm rounded-2xl transition border border-white/20 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Browse Products</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>

      {/* Saved Notification */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-2xs">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>WhatsApp Business line & store settings updated successfully! All new customer orders will route directly to this WhatsApp line.</span>
        </div>
      )}

      {/* WHATSAPP BUSINESS LINE & STORE CONFIGURATION FORM */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-gray-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageSquare size={20} className="text-emerald-600 dark:text-emerald-400" />
              WhatsApp Business Line & Store Configuration
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Specify the WhatsApp phone number where all customer order notifications and direct checkout messages are automatically routed.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold rounded-full self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Order Route
          </span>
        </div>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* WhatsApp Destination Phone Number */}
          <div className="md:col-span-2 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 p-4 sm:p-5 rounded-2xl space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Destination WhatsApp Order Phone Number *
            </label>
            <div className="relative flex items-center">
              <MessageSquare size={18} className="absolute left-3.5 text-emerald-600 dark:text-emerald-400" />
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
                className="w-full bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-extrabold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                placeholder="e.g. 0547654736 or 233547654736"
              />
            </div>
            <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              💡 All "Order via WhatsApp" clicks, customer cart submissions, and order receipts will be instantly routed to this WhatsApp line.
            </p>
          </div>

          {/* Store Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Store Display Name</label>
            <div className="relative flex items-center">
              <Store size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Customer Support Phone */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Customer Support Direct Line</label>
            <div className="relative flex items-center">
              <Phone size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Physical Store Location */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Physical Store Location</label>
            <div className="relative flex items-center">
              <MapPin size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={savingStore}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-600/30 transition active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              <MessageSquare size={16} />
              <span>{savingStore ? 'Saving Configuration...' : 'Save Store & WhatsApp Settings'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* ADMIN CREDENTIALS & SECURITY CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-gray-100 dark:border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck size={20} className="text-red-600" /> Admin Security & Credentials
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Update the email address and password used to access <code className="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">/admin/login</code>.</p>
          </div>
          <Link
            href="/admin/login"
            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            <span>Login Page</span>
            <ExternalLink size={12} />
          </Link>
        </div>

        {credMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-bold flex items-center gap-2 shadow-2xs">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>{credMessage}</span>
          </div>
        )}

        {credError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-bold flex items-center gap-2 shadow-2xs">
            <span>{credError}</span>
          </div>
        )}

        <form onSubmit={handleUpdateAdminCredentials} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Admin Login Email</label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="admin@joerichphones.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">New Admin Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter new password (min 6 chars)"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-between pt-2">
            <div className="text-xs text-gray-400 font-medium">
              Current Default Email: <span className="font-bold text-gray-700 dark:text-gray-200">admin@joerichphones.com</span>
            </div>
            <button
              type="submit"
              disabled={credSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95 disabled:opacity-50"
            >
              {credSubmitting ? 'Saving Credentials...' : 'Update Admin Credentials'}
            </button>
          </div>
        </form>
      </div>

      {/* Maintenance & Data Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b border-gray-100 dark:border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Database Maintenance</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Quick data operations for sample inventory management.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-200/60 dark:border-slate-700/60">
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Restore Showcase Products</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Reset database with official showcase devices (iPhone 17 Pro Max, Apple Watch, iPad Pro, etc.).</p>
          </div>
          <button
            onClick={handleRestoreDefaults}
            disabled={restoringDefaults}
            className="px-4 py-2.5 bg-gray-900 hover:bg-black dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 active:scale-95 shrink-0"
          >
            <RotateCcw size={14} />
            <span>{restoringDefaults ? 'Restoring...' : 'Restore Showcase Inventory'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

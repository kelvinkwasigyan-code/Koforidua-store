'use client';

import { useState } from 'react';
import { RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function SwapSellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    actionType: 'swap',
    deviceModel: '',
    storage: '',
    condition: 'Good',
    desiredDevice: '',
    phoneContact: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-10">
          
          {/* Header Banner */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex p-3 bg-red-50 text-red-600 rounded-2xl mb-3">
              <RefreshCw size={28} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Swap or Sell Your Device
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Upgrade your smartphone or get instant cash. Fill out the details below, and our team will evaluate your device and reach out via phone or WhatsApp.
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-md mx-auto">
              <CheckCircle2 className="mx-auto text-green-600 mb-3" size={48} />
              <h3 className="font-bold text-lg text-green-900">Request Submitted Successfully!</h3>
              <p className="text-sm text-green-700 mt-2">
                We have received your details for your {formData.deviceModel}. Our evaluation team will contact you shortly on {formData.phoneContact}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors"
              >
                Submit Another Device
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Choice: Swap or Sell */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What would you like to do?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, actionType: 'swap' })}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      formData.actionType === 'swap'
                        ? 'border-red-600 bg-red-50 text-red-600 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    🔄 Swap Device (Upgrade)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, actionType: 'sell' })}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      formData.actionType === 'sell'
                        ? 'border-red-600 bg-red-50 text-red-600 shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    💵 Sell for Cash
                  </button>
                </div>
              </div>

              {/* Device Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Device Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 13 Pro, Samsung S21"
                    value={formData.deviceModel}
                    onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Storage Capacity *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 128GB, 256GB"
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Device Condition *</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    <option value="Brand New / Sealed">Brand New / Sealed</option>
                    <option value="Pristine / Foreign Used">Pristine / Foreign Used (Like New)</option>
                    <option value="Good / Minor Scratches">Good (Minor signs of use)</option>
                    <option value="Faulty / Cracked Screen">Faulty / Screen Cracked</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0547654736"
                    value={formData.phoneContact}
                    onChange={(e) => setFormData({ ...formData, phoneContact: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {formData.actionType === 'swap' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Which phone do you want to swap for?</label>
                  <input
                    type="text"
                    placeholder="e.g. iPhone 15 Pro Max"
                    value={formData.desiredDevice}
                    onChange={(e) => setFormData({ ...formData, desiredDevice: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Description or Faults (If any)</label>
                <textarea
                  rows={3}
                  placeholder="Mention battery health percentage, accessories included, or any functional issues..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send size={18} />
                <span>Submit Evaluation Request</span>
              </button>

            </form>
          )}

        </div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { RefreshCw, Send, CheckCircle2, Upload, X as XIcon, Loader2 } from 'lucide-react';

export default function SwapSellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    actionType: 'swap',
    deviceModel: '',
    storage: '',
    condition: 'Good',
    desiredDevice: '',
    phoneContact: '',
    description: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray].slice(0, 5)); // max 5 images
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let uploadedUrls: string[] = [];
    
    // Upload files if any are selected
    if (selectedFiles.length > 0) {
      try {
        const uploadData = new FormData();
        selectedFiles.forEach((file) => uploadData.append('files', file));
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        
        const result = await res.json();
        if (result.success && result.urls) {
          // Convert relative URLs to absolute URLs so they can be clicked in WhatsApp
          const baseUrl = window.location.origin;
          uploadedUrls = result.urls.map((url: string) => baseUrl + url);
        }
      } catch (err) {
        console.error("Upload failed", err);
        // Continue even if upload fails
      }
    }
    
    const message = `*Device Evaluation Request*
*Action:* ${formData.actionType === 'swap' ? 'Swap Device' : 'Sell for Cash'}
*Device Model:* ${formData.deviceModel}
*Storage:* ${formData.storage}
*Condition:* ${formData.condition}
*Contact Number:* ${formData.phoneContact}
${formData.actionType === 'swap' ? `*Desired Device:* ${formData.desiredDevice}\n` : ''}
*Description/Faults:* ${formData.description || 'None'}
${uploadedUrls.length > 0 ? `\n*Device Images:*\n${uploadedUrls.join('\n')}` : ''}`;

    const whatsappUrl = `https://wa.me/233547654736?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitting(false);
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

              {/* Image Upload UI */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Device Images (Optional, Max 5)</label>
                
                <div className="flex flex-wrap gap-3 mb-3">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="relative w-20 h-20 bg-gray-100 rounded-lg border flex items-center justify-center overflow-hidden group">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt="preview" 
                        className="w-full h-full object-cover opacity-90"
                      />
                      <button 
                        type="button" 
                        onClick={() => removeFile(idx)}
                        className="absolute inset-0 m-auto w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XIcon size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {selectedFiles.length < 5 && (
                    <label className="w-20 h-20 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors">
                      <Upload size={20} className="text-gray-400 mb-1" />
                      <span className="text-[10px] text-gray-500 font-semibold">Upload</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500">Add clear pictures of the front, back, and any damages to get an accurate evaluation faster.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{isSubmitting ? 'Uploading & Submitting...' : 'Submit Evaluation Request'}</span>
              </button>

            </form>
          )}

        </div>
      </main>
    </div>
  );
}

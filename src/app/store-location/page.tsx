'use client';

import Image from 'next/image';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function StoreLocationPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Store Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Store Details Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  📍 Address
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Accra Bus Station<br />
                  Koforidua<br />
                  Ghana
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  🕒 Opening Hours
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Mon - Sat: 8:00 AM - 8:00 PM<br />
                  Sunday: 1:00 PM - 6:00 PM
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  📞 Contact Us
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  +233 54 765 4736<br />
                  support@joerichphones.com
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=6.093222880814832,-0.25654429724346883"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#111827] text-white py-3 rounded-xl font-medium hover:bg-black transition text-center block"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Store Images Gallery Section */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Store Exterior */}
            <div className="relative h-96 md:h-[450px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src="https://wfpbqtrbobkoffxkltrl.supabase.co/storage/v1/object/public/store-image/store-exterior2.png"
                alt="Joerich Phones Store Exterior"
                className="object-cover w-full h-full hover:scale-105 transition duration-300"
              />
            </div>

            {/* Store Interior */}
            <div className="relative h-96 md:h-[450px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src="https://wfpbqtrbobkoffxkltrl.supabase.co/storage/v1/object/public/store-image/store-interior.png"
                alt="Joerich Phones Store Interior"
                className="object-cover w-full h-full hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { fetchStoreSettings, formatWhatsAppNumber } from '@/lib/storeSettings';

export default function WhatsAppButton() {
  const [waNumber, setWaNumber] = useState('233547654736');

  useEffect(() => {
    async function load() {
      const s = await fetchStoreSettings();
      if (s.whatsappNumber) {
        setWaNumber(formatWhatsAppNumber(s.whatsappNumber));
      }
    }
    load();
  }, []);

  const message = encodeURIComponent('Hello Joerich PHONES! I am inquiring about products on your store.');

  return (
    <motion.a
      href={`https://wa.me/${waNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white stroke-[2]" />
    </motion.a>
  );
}

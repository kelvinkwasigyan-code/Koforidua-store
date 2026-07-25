'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    const whatsappNumber = process.env.NEXT_PUBLIC_STORE_PHONE || '0547654736';

    // Automatically converts '0547654736' -> '233547654736' for WhatsApp API
    const formattedForWhatsApp = `233${whatsappNumber.substring(1)}`;
    const message = encodeURIComponent('Hello! I am inquiring about a product on your store.');

    return (
        <motion.a
            href={`https://wa.me/${formattedForWhatsApp}?text=${message}`}
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

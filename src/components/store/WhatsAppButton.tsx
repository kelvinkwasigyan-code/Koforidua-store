'use client';

import React from 'react';

export default function WhatsAppButton() {
    const phoneNumber = process.env.NEXT_PUBLIC_STORE_PHONE || "+233241234567";
    const message = encodeURIComponent('Hello Joe Rich Phones & Accessories, I have an inquiry about a product.');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full backdrop-blur-2xl bg-emerald-500/85 hover:bg-emerald-600 text-white font-medium text-xs shadow-[0_8px_32px_rgba(16,185,129,0.3)] border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all duration-300 group"
        >
            {/* WhatsApp Icon */}
            <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
            >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.687-.833-1.948-.929-.262-.095-.453-.143-.644.143-.19.285-.738.929-.905 1.119-.167.19-.333.214-.619.071-.285-.143-1.207-.445-2.299-1.419-.85-.759-1.424-1.697-1.591-1.983-.167-.285-.018-.439.125-.581.129-.128.285-.333.428-.5.143-.167.19-.285.285-.476.095-.19.048-.357-.024-.5-.071-.143-.644-1.552-.882-2.123-.232-.557-.468-.482-.644-.491l-.548-.01c-.19 0-.5.071-.762.357s-1.001.977-1.001 2.38 1.024 2.762 1.167 2.952c.143.19 2.016 3.079 4.885 4.319.683.295 1.216.471 1.632.603.686.218 1.311.187 1.805.114.551-.082 1.687-.69 1.925-1.356.238-.667.238-1.238.167-1.356-.07-.118-.261-.19-.546-.333z" />
            </svg>
            <span>Chat on WhatsApp</span>
        </a>
    );
}

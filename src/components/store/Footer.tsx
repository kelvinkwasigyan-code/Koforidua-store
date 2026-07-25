import React from 'react';

export default function Footer() {
    const phoneNumber = process.env.NEXT_PUBLIC_STORE_PHONE || "+233241234567";

    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-3">About Us</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Joe Rich Phones & Accessories provides genuine mobile devices and accessories across Ghana with reliable delivery.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-3">Contact Us</h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                        <li>📍 Koforidua, Ghana</li>
                        <li>
                            📞 Call: <a href={`tel:${phoneNumber}`} className="hover:text-red-600 font-semibold">{phoneNumber}</a>
                        </li>
                        <li>
                            💬 WhatsApp: <a href={`https://wa.me/${phoneNumber.replace('+', '')}`} target="_blank" className="hover:text-emerald-600 font-semibold">{phoneNumber}</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-3">Follow Us</h4>
                    <p className="text-xs text-gray-600">Stay updated with our latest deals on social media.</p>
                </div>
            </div>
        </footer>
    );
}

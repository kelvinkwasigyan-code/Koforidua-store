import React from 'react';

const TrustBadges = () => {
    const items = [
        { icon: '🚚', title: 'Fast Delivery', desc: 'Directly to your location' },
        { icon: '✅', title: '100% Verified', desc: 'Authentic products guaranteed' },
        { icon: '💳', title: 'MoMo & Cards', desc: 'MTN, Telecel & Visa/Mastercard' },
        { icon: '🛡️', title: 'Warranty Support', desc: 'Protected items & return options' },
    ];

    return (
        <section className="bg-white py-8 border-t border-b border-gray-200 my-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-gray-50">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustBadges;

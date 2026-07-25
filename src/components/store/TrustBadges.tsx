import { ShieldCheck, Truck, Clock, Headphones } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: <Truck className="text-red-600" size={24} />, title: 'Nationwide Delivery', desc: 'Fast delivery across Ghana' },
    { icon: <ShieldCheck className="text-red-600" size={24} />, title: '100% Authentic', desc: 'Original devices & accessories' },
    { icon: <Clock className="text-red-600" size={24} />, title: 'Warranty Protected', desc: 'Guaranteed quality assurance' },
    { icon: <Headphones className="text-red-600" size={24} />, title: '24/7 Support', desc: 'Call or WhatsApp: 0547654736' },
  ];

  return (
    <section className="bg-white border-y my-6 py-6 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((b, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-3 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
              {b.icon}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{b.title}</h4>
              <p className="text-xs text-gray-500">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { ShieldCheck, Truck, Clock, Headphones, Phone, MessageCircle } from 'lucide-react';

export default function TrustBadges() {
  return (
    <section className="bg-white dark:bg-slate-900 border-y border-gray-200/80 dark:border-gray-800 my-6 py-6 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Badge 1 */}
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
          <div className="p-3 bg-red-50 dark:bg-red-950/50 rounded-xl flex items-center justify-center shrink-0">
            <Truck className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Nationwide Delivery</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Fast delivery across Ghana</p>
          </div>
        </div>

        {/* Badge 2 */}
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
          <div className="p-3 bg-red-50 dark:bg-red-950/50 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">100% Authentic</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Original devices & accessories</p>
          </div>
        </div>

        {/* Badge 3 */}
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
          <div className="p-3 bg-red-50 dark:bg-red-950/50 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Warranty Protected</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Guaranteed quality assurance</p>
          </div>
        </div>

        {/* Badge 4 - Interactive Customer Support Number */}
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-red-50/50 dark:bg-slate-800/80 border border-red-100 dark:border-gray-700 hover:border-red-300 transition-all">
          <div className="p-3 bg-red-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-xs">
            <Headphones size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">24/7 Support</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <a
                href="tel:0547654736"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-red-600 dark:text-red-400 hover:underline"
                title="Call 0547654736"
              >
                <Phone size={12} />
                <span>0547654736</span>
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://wa.me/233547654736"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={12} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

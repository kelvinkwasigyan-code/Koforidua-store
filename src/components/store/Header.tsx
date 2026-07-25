import React, { useState } from 'react';

const categories = ['All', 'Smartphones', 'Watches', 'Audio', 'Laptops', 'Accessories'];

const Header = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            {/* Top Announcement Bar */}
            <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium flex justify-between items-center max-w-7xl mx-auto">
                <p>🚚 Delivery available across Ghana | Pay with Mobile Money & Cards</p>
                <div className="hidden sm:flex space-x-4">
                    <span>Contact Us</span>
                    <span>FAQ</span>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 tracking-tight">
                        Koforidua Store
                    </span>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-6 relative">
                    <input
                        type="text"
                        placeholder="Search products, brands, categories..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Cart / Account */}
                <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-700 font-medium text-sm hover:text-indigo-600">
                        🛒 Cart <span className="ml-1 bg-indigo-600 text-white rounded-full text-xs px-2 py-0.5">0</span>
                    </button>
                </div>
            </div>

            {/* Category Navigation Bar */}
            <div className="border-b border-gray-200 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 flex space-x-6 overflow-x-auto py-2 scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-sm whitespace-nowrap font-medium transition-colors ${activeCategory === cat
                                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
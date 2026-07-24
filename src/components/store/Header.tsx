import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 tracking-tight">
                        Koforidua Store
                    </span>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-8 relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Navigation / Actions */}
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                        Cart
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
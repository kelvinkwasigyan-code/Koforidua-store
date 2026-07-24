// src/components/store/Header.tsx
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // Assuming Heroicons are available

const Header = () => {
    const cartItemCount = 0; // Placeholder for cart item count

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand Title */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            Koforidua Store
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex md:ml-6">
                        <div className="relative w-full max-w-lg">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                        d="M21 21l-6-6m0 0a9 9 0 100-18 9 9 0 000 18z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links & Cart */}
                    <div className="flex items-center">
                        <nav className="hidden md:flex space-x-4">
                            <Link href="/categories/electronics" className="text-gray-600 hover:text-gray-900">
                                Electronics
                            </Link>
                            <Link href="/categories/clothing" className="text-gray-600 hover:text-gray-900">
                                Clothing
                            </Link>
                            <Link href="/categories/home" className="text-gray-600 hover:text-gray-900">
                                Home & Kitchen
                            </Link>
                            <Link href="/categories/groceries" className="text-gray-600 hover:text-gray-900">
                                Groceries
                            </Link>
                        </nav>

                        {/* Shopping Cart */}
                        <div className="ml-4 flow-root text-sm lg:ml-6">
                            <Link href="/cart" className="group -m-2 flex items-center p-2">
                                <ShoppingCartIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                    {cartItemCount}
                                </span>
                                <span className="sr-only">items in cart, update</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden pb-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                    d="M21 21l-6-6m0 0a9 9 0 100-18 9 9 0 000 18z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

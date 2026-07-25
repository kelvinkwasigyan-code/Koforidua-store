'use client';

import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    salePrice?: number | null;
    imageUrl: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    cartCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Calculate total items and subtotal
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => {
        const itemPrice = item.salePrice ?? item.price;
        return total + itemPrice * item.quantity;
    }, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setIsOpen(true); // Auto-open drawer on add
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.id === id) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter(Boolean) as CartItem[]
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                isOpen,
                openCart,
                closeCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                cartCount,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};

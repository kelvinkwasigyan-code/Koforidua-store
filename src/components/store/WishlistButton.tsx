'use client';

import { useState, useEffect } from 'react';
import { getWishlist, toggleWishlist } from '@/lib/wishlist';

export default function WishlistButton({ productId }: { productId: string }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      const wishlist = getWishlist();
      setIsSaved(wishlist.includes(productId));
    };
    checkWishlist();
    window.addEventListener('wishlistUpdated', checkWishlist);
    return () => window.removeEventListener('wishlistUpdated', checkWishlist);
  }, [productId]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:scale-110 transition text-red-600 cursor-pointer"
      title="Save to Wishlist"
    >
      {isSaved ? '❤️' : '🤍'}
    </button>
  );
}

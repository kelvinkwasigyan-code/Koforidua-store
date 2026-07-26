export function getWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  } catch {
    return [];
  }
}

export function toggleWishlist(productId: string): string[] {
  const current = getWishlist();
  const updated = current.includes(productId)
    ? current.filter(id => id !== productId)
    : [...current, productId];
  
  localStorage.setItem('wishlist', JSON.stringify(updated));
  window.dispatchEvent(new Event('wishlistUpdated'));
  return updated;
}

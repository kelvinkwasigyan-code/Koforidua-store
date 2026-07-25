'use client';

import { useEffect } from 'react';

export function useRecordView(productId: string) {
  useEffect(() => {
    if (!productId) return;
    try {
      const existing = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const updated = [productId, ...existing.filter((id: string) => id !== productId)].slice(0, 6);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }, [productId]);
}

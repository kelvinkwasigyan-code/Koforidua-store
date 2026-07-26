export interface StoreSettings {
  whatsappNumber: string;
  storeName: string;
  storePhone: string;
  storeLocation: string;
}

export function formatWhatsAppNumber(phone: string): string {
  const digits = (phone || '').replace(/\D/g, '');
  if (!digits) return '233547654736';
  
  if (digits.startsWith('0') && digits.length === 10) {
    return '233' + digits.slice(1);
  }
  if (digits.startsWith('233')) {
    return digits;
  }
  return digits;
}

export async function fetchStoreSettings(): Promise<StoreSettings> {
  try {
    const res = await fetch('/api/settings', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return {
        whatsappNumber: data.whatsappNumber || '0547654736',
        storeName: data.storeName || 'Joerich Phones',
        storePhone: data.storePhone || '0547654736',
        storeLocation: data.storeLocation || 'Koforidua, Accra Station',
      };
    }
  } catch (err) {
    console.error('Failed to fetch store settings:', err);
  }

  return {
    whatsappNumber: '0547654736',
    storeName: 'Joerich Phones',
    storePhone: '0547654736',
    storeLocation: 'Koforidua, Accra Station',
  };
}

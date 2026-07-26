export interface ProductMetadata {
  series: string;
  tier: string;
  badgeColor: string;
  isLatest: boolean;
}

export function getProductMetadata(name: string): ProductMetadata {
  const lowerName = (name || '').toLowerCase();
  
  // Future / Next-Gen Releases
  if (lowerName.includes('iphone 17 pro max')) {
    return {
      series: 'iPhone 17',
      tier: 'Pro Max',
      badgeColor: 'bg-purple-600 text-white',
      isLatest: true,
    };
  }
  if (lowerName.includes('iphone 17 pro')) {
    return {
      series: 'iPhone 17',
      tier: 'Pro',
      badgeColor: 'bg-purple-600 text-white',
      isLatest: true,
    };
  }
  if (lowerName.includes('iphone 17')) {
    return {
      series: 'iPhone 17',
      tier: 'Standard',
      badgeColor: 'bg-purple-600 text-white',
      isLatest: true,
    };
  }

  // iPhone 16 Flagship Series
  if (lowerName.includes('iphone 16 pro max')) {
    return {
      series: 'iPhone 16',
      tier: 'Pro Max',
      badgeColor: 'bg-blue-600 text-white',
      isLatest: true,
    };
  }
  if (lowerName.includes('iphone 16 pro')) {
    return {
      series: 'iPhone 16',
      tier: 'Pro',
      badgeColor: 'bg-blue-600 text-white',
      isLatest: true,
    };
  }
  if (lowerName.includes('iphone 16 plus')) {
    return {
      series: 'iPhone 16',
      tier: 'Plus',
      badgeColor: 'bg-blue-600 text-white',
      isLatest: true,
    };
  }
  if (lowerName.includes('iphone 16')) {
    return {
      series: 'iPhone 16',
      tier: 'Standard',
      badgeColor: 'bg-blue-600 text-white',
      isLatest: true,
    };
  }

  // iPhone 15 Series
  if (lowerName.includes('iphone 15 pro max')) {
    return {
      series: 'iPhone 15',
      tier: 'Pro Max',
      badgeColor: 'bg-indigo-600 text-white',
      isLatest: false,
    };
  }
  if (lowerName.includes('iphone 15 pro')) {
    return {
      series: 'iPhone 15',
      tier: 'Pro',
      badgeColor: 'bg-indigo-600 text-white',
      isLatest: false,
    };
  }
  if (lowerName.includes('iphone 15 plus')) {
    return {
      series: 'iPhone 15',
      tier: 'Plus',
      badgeColor: 'bg-indigo-600 text-white',
      isLatest: false,
    };
  }
  if (lowerName.includes('iphone 15')) {
    return {
      series: 'iPhone 15',
      tier: 'Standard',
      badgeColor: 'bg-indigo-600 text-white',
      isLatest: false,
    };
  }

  // iPhone 14 Series
  if (lowerName.includes('iphone 14 pro max')) {
    return {
      series: 'iPhone 14',
      tier: 'Pro Max',
      badgeColor: 'bg-slate-700 text-white',
      isLatest: false,
    };
  }
  if (lowerName.includes('iphone 14 pro')) {
    return {
      series: 'iPhone 14',
      tier: 'Pro',
      badgeColor: 'bg-slate-700 text-white',
      isLatest: false,
    };
  }
  if (lowerName.includes('iphone 14')) {
    return {
      series: 'iPhone 14',
      tier: 'Standard',
      badgeColor: 'bg-slate-700 text-white',
      isLatest: false,
    };
  }

  // iPhone 13 Series
  if (lowerName.includes('iphone 13 pro max')) {
    return {
      series: 'iPhone 13',
      tier: 'Pro Max',
      badgeColor: 'bg-slate-600 text-white',
      isLatest: false,
    };
  }
  if (lowerName.includes('iphone 13 pro')) {
    return {
      series: 'iPhone 13',
      tier: 'Pro',
      badgeColor: 'bg-slate-600 text-white',
      isLatest: false,
    };
  }
  if (lowerName.includes('iphone 13')) {
    return {
      series: 'iPhone 13',
      tier: 'Standard',
      badgeColor: 'bg-slate-600 text-white',
      isLatest: false,
    };
  }

  // Default fallback
  return {
    series: 'Standard',
    tier: '',
    badgeColor: 'bg-gray-600 text-white',
    isLatest: false,
  };
}

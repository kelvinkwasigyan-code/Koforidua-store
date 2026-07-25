export interface iPhoneColor {
  name: string;
  hex: string;
  models: string[]; // Key models this color applies to e.g. ["16 pro", "16 pro max"]
}

export const IPHONE_COLORS: iPhoneColor[] = [
  // iPhone 16 & 16 Pro / 16 Pro Max
  { name: 'Desert Titanium', hex: '#cba885', models: ['16 pro', '16 pro max', '17 pro', '17 pro max'] },
  { name: 'Natural Titanium', hex: '#8a8782', models: ['15 pro', '15 pro max', '16 pro', '16 pro max', '17 pro', '17 pro max'] },
  { name: 'Black Titanium', hex: '#2e2e30', models: ['15 pro', '15 pro max', '16 pro', '16 pro max', '17 pro', '17 pro max'] },
  { name: 'White Titanium', hex: '#f2f1ed', models: ['15 pro', '15 pro max', '16 pro', '16 pro max', '17 pro', '17 pro max'] },
  { name: 'Teal', hex: '#80a3a2', models: ['16'] },
  { name: 'Ultramarine', hex: '#4c6085', models: ['16'] },
  
  // iPhone 15 & 15 Pro / 15 Pro Max
  { name: 'Blue Titanium', hex: '#3b4859', models: ['15 pro', '15 pro max'] },
  { name: 'Pink', hex: '#e8c3c8', models: ['13', '15', '16'] },
  { name: 'Yellow', hex: '#f5e5be', models: ['11', '14', '15'] },
  { name: 'Green', hex: '#d4e5d6', models: ['11', '12', '13', '15'] },
  { name: 'Blue', hex: '#d0dce5', models: ['12', '13', '14', '15'] },
  
  // iPhone 14 & 14 Pro / 14 Pro Max
  { name: 'Deep Purple', hex: '#483e59', models: ['14 pro', '14 pro max'] },
  { name: 'Space Black', hex: '#363539', models: ['14 pro', '14 pro max'] },
  { name: 'Purple', hex: '#e3dbe7', models: ['11', '12', '14'] },
  { name: 'Midnight', hex: '#1e252b', models: ['13', '14', '15', '16'] },
  { name: 'Starlight', hex: '#f0ece3', models: ['13', '14', '15', '16'] },
  { name: 'Product(RED)', hex: '#e30016', models: ['11', '12', '13', '14'] },

  // iPhone 13 & 13 Pro / 13 Pro Max
  { name: 'Sierra Blue', hex: '#9bb5ce', models: ['13 pro', '13 pro max'] },
  { name: 'Alpine Green', hex: '#506253', models: ['13 pro', '13 pro max'] },
  { name: 'Graphite', hex: '#545350', models: ['12 pro', '12 pro max', '13 pro', '13 pro max'] },
  { name: 'Gold', hex: '#fad7a0', models: ['11 pro', '11 pro max', '12 pro', '12 pro max', '13 pro', '13 pro max', '14 pro', '14 pro max'] },
  { name: 'Silver', hex: '#f2f3f5', models: ['11 pro', '11 pro max', '12 pro', '12 pro max', '13 pro', '13 pro max', '14 pro', '14 pro max'] },

  // iPhone 12 & 12 Pro / 12 Pro Max
  { name: 'Pacific Blue', hex: '#2c4d5e', models: ['12 pro', '12 pro max'] },

  // iPhone 11 & 11 Pro / 11 Pro Max
  { name: 'Midnight Green', hex: '#4e5851', models: ['11 pro', '11 pro max'] },
  { name: 'Space Gray', hex: '#535152', models: ['11 pro', '11 pro max'] },
  { name: 'Black', hex: '#1f2125', models: ['11', '12', '13', '14', '15', '16'] },
  { name: 'White', hex: '#f9f6ef', models: ['11', '12', '13', '14', '15', '16'] }
];

export function getColorsForQuery(query: string): iPhoneColor[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const matched = IPHONE_COLORS.filter((color) =>
    color.models.some((m) => q.includes(m))
  );

  return matched;
}

import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Joerich Phones & Accessories',
    short_name: 'Joerich Store',
    description: 'Your trusted store in Ghana for genuine smartphones, tablets, watches, and accessories.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#dc2626',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getColorsForQuery } from '@/lib/iphoneColors';

const SHOWCASE_IMAGES = [
  '/iphones.PNG',
  '/tablet.PNG',
  '/Watches.png',
  '/speaker.PNG',
  '/fragrance.PNG',
  '/Covers.png',
];

export async function GET(request: NextRequest) {
  try {
    // 1. Ensure categories exist
    let watchesCat = await prisma.category.findFirst({
      where: { OR: [{ name: 'Watches' }, { name: 'Smart Watches' }] },
    });
    if (!watchesCat) {
      watchesCat = await prisma.category.create({ data: { name: 'Watches' } });
    }

    let chargersCat = await prisma.category.findFirst({
      where: { OR: [{ name: 'Chargers' }, { name: 'Accessories' }] },
    });
    if (!chargersCat) {
      chargersCat = await prisma.category.create({ data: { name: 'Chargers' } });
    }

    let fragranceCat = await prisma.category.findFirst({
      where: { OR: [{ name: 'Fragrance & Scalp Care' }, { name: 'Fragrance' }] },
    });
    if (!fragranceCat) {
      fragranceCat = await prisma.category.create({ data: { name: 'Fragrance & Scalp Care' } });
    }

    let smartphonesCat = await prisma.category.findFirst({
      where: { OR: [{ name: 'Smartphones' }, { name: 'iPhones' }] },
    });
    if (!smartphonesCat) {
      smartphonesCat = await prisma.category.create({ data: { name: 'Smartphones' } });
    }

    let tabletsCat = await prisma.category.findFirst({
      where: { OR: [{ name: 'Tablets' }, { name: 'iPads' }] },
    });
    if (!tabletsCat) {
      tabletsCat = await prisma.category.create({ data: { name: 'Tablets' } });
    }

    let speakersCat = await prisma.category.findFirst({
      where: { OR: [{ name: 'Speakers' }, { name: 'Audio' }] },
    });
    if (!speakersCat) {
      speakersCat = await prisma.category.create({ data: { name: 'Speakers' } });
    }

    // 2. Remove static category showcase images from products database
    for (const showcaseImg of SHOWCASE_IMAGES) {
      const showcaseProds = await prisma.product.findMany({
        where: {
          images: {
            has: showcaseImg,
          },
        },
      });
      for (const p of showcaseProds) {
        await prisma.product.delete({ where: { id: p.id } });
      }
    }

    // 3. Define default products (iPhone models with verified high-res image paths)
    const productsToRestore = [
      {
        name: 'iPhone 16 Series',
        description: 'Apple A18 Pro chip, Titanium build, 48MP Fusion Camera, and Camera Control.',
        price: 14500.00,
        stockQuantity: 10,
        images: [
          '/iphones-default/iphone-16-pro-colors.png',
          '/iphones-default/iphone-16-colors.png',
          '/iphones-default/iphone-16-plus-colors.png',
        ],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 16 Pro Max'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
          variants: ['Standard', 'Plus', 'Pro', 'Pro Max'],
        },
      },
      {
        name: 'iPhone 15 Series',
        description: 'Dynamic Island, A17 Pro Chip, 48MP Main Camera with 5x Telephoto Zoom.',
        price: 11800.00,
        stockQuantity: 10,
        images: [
          '/iphones-default/iphone-15-pro.png',
          '/iphones-default/fall-2023-iphone-colors-iphone-15-pro.png',
          '/iphones-default/fall-2023-iphone-colors-iphone-15.png',
        ],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 15 Pro'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
          variants: ['Standard', 'Plus', 'Pro', 'Pro Max'],
        },
      },
      {
        name: 'iPhone 14 Series',
        description: 'Emergency SOS via satellite, Crash Detection, A16 Bionic chip, and ProMotion Display.',
        price: 9200.00,
        stockQuantity: 10,
        images: [
          '/iphones-default/iphone-14-pro-colors.png',
          '/iphones-default/iphone-14-colors-spring-2023.png',
        ],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 14 Pro Max'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
          variants: ['Standard', 'Plus', 'Pro', 'Pro Max'],
        },
      },
      {
        name: 'iPhone 13 Series',
        description: 'Super Retina XDR display, Cinematic mode in 1080p, A15 Bionic chip, All-day battery.',
        price: 7500.00,
        stockQuantity: 10,
        images: [
          '/iphones-default/2022-spring-iphone13-pro-colors.png',
          '/iphones-default/2022-spring-iphone13-colors.png',
        ],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 13 Pro Max'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
          variants: ['Standard', 'Pro', 'Pro Max'],
        },
      },
      {
        name: 'iPhone 12 Series',
        description: 'Ceramic Shield front cover, A14 Bionic chip, Night mode on all cameras, MagSafe wireless charging.',
        price: 5800.00,
        stockQuantity: 10,
        images: [
          '/iphones-default/iphone12-pro-colors.jpg',
          '/iphones-default/2021-iphone12-colors.png',
        ],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 12 Pro Max'),
          storage: ['128GB', '256GB', '512GB'],
          variants: ['Standard', 'Pro', 'Pro Max'],
        },
      },
      {
        name: 'iPhone 11 Series',
        description: 'Dual-camera system with Ultra Wide, Night mode, 4K Video, and A13 Bionic chip.',
        price: 4200.00,
        stockQuantity: 10,
        images: [
          '/iphones-default/identify-iphone-11pro.jpg',
          '/iphones-default/identify-iphone-11-colors.jpg',
        ],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 11 Pro'),
          storage: ['64GB', '128GB', '256GB', '512GB'],
          variants: ['Standard', 'Pro', 'Pro Max'],
        },
      },
      {
        name: 'iPhone XS & XS Max',
        description: 'Super Retina OLED display, Dual 12MP cameras with Smart HDR, Stainless steel band.',
        price: 3200.00,
        stockQuantity: 10,
        images: [
          '/iphones-default/iphone-xs-max-colors.jpg',
          '/iphones-default/identify-iphone-xr-colors.jpg',
          '/iphones-default/iphone-x-colors.jpg',
        ],
        categoryId: smartphonesCat.id,
        condition: 'USED',
        features: {
          colors: getColorsForQuery('iPhone XS Max'),
          storage: ['64GB', '256GB', '512GB'],
          variants: ['Standard', 'Max'],
        },
      },
      {
        name: 'iPhone SE 3rd Gen',
        description: 'Compact 4.7-inch Retina HD display, A15 Bionic chip, 5G connectivity, and Home button with Touch ID.',
        price: 2900.00,
        stockQuantity: 10,
        images: [
          '/iphones-default/iphone-se-3rd-gen-colors.png',
        ],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone SE'),
          storage: ['64GB', '128GB', '256GB'],
          variants: ['Standard'],
        },
      },
    ];

    const restoredProducts = [];
    for (const item of productsToRestore) {
      const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const prod = await (prisma as any).product.upsert({
        where: { slug },
        update: {
          name: item.name,
          price: item.price,
          stockQuantity: item.stockQuantity,
          images: item.images,
          condition: item.condition,
          features: item.features || null,
        },
        create: {
          name: item.name,
          slug,
          description: item.description,
          price: item.price,
          stockQuantity: item.stockQuantity,
          images: item.images,
          condition: item.condition,
          categoryId: item.categoryId,
          features: item.features || null,
        },
      });
      restoredProducts.push(prod);
    }

    return NextResponse.json({
      success: true,
      restoredCount: restoredProducts.length,
      products: restoredProducts,
    });
  } catch (error) {
    console.error('Failed to restore default products:', error);
    return NextResponse.json({ error: 'Failed to restore default products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}

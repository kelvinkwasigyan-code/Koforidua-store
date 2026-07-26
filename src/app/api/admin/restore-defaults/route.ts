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

const SERIES_NAMES_TO_PURGE = [
  'iPhone 16 Series',
  'iPhone 15 Series',
  'iPhone 14 Series',
  'iPhone 13 Series',
  'iPhone 12 Series',
  'iPhone 11 Series',
  'iPhone XS & XS Max',
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

    // 2. Delete old series-grouped products and showcase items
    await prisma.product.deleteMany({
      where: {
        name: { in: SERIES_NAMES_TO_PURGE },
      },
    });

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

    // 3. Define individual default iPhone models
    const productsToRestore = [
      // iPhone 17 Series
      {
        name: 'iPhone 17 Pro Max',
        description: 'Next-Generation Apple A19 Pro chip, 6.9-inch ProMotion Super Retina XDR display, Ultra-Titanium design, 48MP Triple Fusion Cameras with 10x Optical Zoom, and Wi-Fi 7.',
        price: 18500.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-17-pro-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          storage: ['256GB', '512GB', '1TB'],
          colors: getColorsForQuery('iPhone 16 Pro Max'),
        },
      },
      {
        name: 'iPhone 17 Pro',
        description: 'Next-Generation Apple A19 Pro chip, 6.3-inch ProMotion 120Hz display, Lightweight Titanium chassis, advanced Camera Control, and all-day battery life.',
        price: 16800.00,
        stockQuantity: 8,
        images: ['/iphones-default/iphone-17-pro-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: getColorsForQuery('iPhone 16 Pro'),
        },
      },
      {
        name: 'iPhone 17',
        description: 'Next-Generation Apple A19 Bionic chip, 6.1-inch Super Retina XDR OLED display, Dynamic Island, 48MP Dual Fusion Camera system, and Action Button.',
        price: 14200.00,
        stockQuantity: 12,
        images: ['/iphones-default/iphone-17-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          storage: ['128GB', '256GB', '512GB'],
          colors: getColorsForQuery('iPhone 16'),
        },
      },

      // iPhone 16
      {
        name: 'iPhone 16 Pro Max',
        description: 'Apple A18 Pro chip, 6.9-inch Super Retina XDR display, Grade 5 Titanium finish, 48MP Fusion Camera, and Camera Control.',
        price: 16500.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-16-pro-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 16 Pro Max'),
          storage: ['256GB', '512GB', '1TB'],
        },
      },
      {
        name: 'iPhone 16 Pro',
        description: 'Apple A18 Pro chip, 6.3-inch Super Retina XDR display, Grade 5 Titanium build, 48MP Ultra Wide camera.',
        price: 14800.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-16-pro-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 16 Pro'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
        },
      },
      {
        name: 'iPhone 16',
        description: 'A18 chip, Camera Control, 48MP Fusion Camera, Action Button, Ceramic Shield.',
        price: 12500.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-16-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 16'),
          storage: ['128GB', '256GB', '512GB'],
        },
      },
      // iPhone 15
      {
        name: 'iPhone 15 Pro Max',
        description: 'Dynamic Island, A17 Pro Chip, 48MP Main Camera with 5x Telephoto Zoom, Titanium finish.',
        price: 13800.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-15-pro.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 15 Pro Max'),
          storage: ['256GB', '512GB', '1TB'],
        },
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Dynamic Island, A17 Pro Chip, Lightweight Titanium design, Action Button, USB-C.',
        price: 11800.00,
        stockQuantity: 10,
        images: ['/iphones-default/fall-2023-iphone-colors-iphone-15-pro.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 15 Pro'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
        },
      },
      {
        name: 'iPhone 15',
        description: 'Dynamic Island, 48MP Main camera with 2x Telephoto, A16 Bionic chip, USB-C charging.',
        price: 9800.00,
        stockQuantity: 10,
        images: ['/iphones-default/fall-2023-iphone-colors-iphone-15.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 15'),
          storage: ['128GB', '256GB', '512GB'],
        },
      },
      // iPhone 14
      {
        name: 'iPhone 14 Pro Max',
        description: 'Dynamic Island, Always-On display, Emergency SOS via satellite, A16 Bionic chip, 48MP camera.',
        price: 10500.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-14-pro-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 14 Pro Max'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
        },
      },
      {
        name: 'iPhone 14 Pro',
        description: 'Dynamic Island, ProMotion 120Hz display, Crash Detection, A16 Bionic chip.',
        price: 9200.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-14-pro-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 14 Pro'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
        },
      },
      {
        name: 'iPhone 14',
        description: 'Advanced dual-camera system, Action mode, Crash Detection, A15 Bionic chip with 5-core GPU.',
        price: 7800.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-14-colors-spring-2023.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 14'),
          storage: ['128GB', '256GB', '512GB'],
        },
      },
      // iPhone 13
      {
        name: 'iPhone 13 Pro Max',
        description: 'Super Retina XDR display with ProMotion, Cinematic mode in 1080p, A15 Bionic chip.',
        price: 8500.00,
        stockQuantity: 10,
        images: ['/iphones-default/2022-spring-iphone13-pro-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 13 Pro Max'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
        },
      },
      {
        name: 'iPhone 13 Pro',
        description: 'ProMotion display, Telephoto camera, Macro photography, A15 Bionic chip.',
        price: 7500.00,
        stockQuantity: 10,
        images: ['/iphones-default/2022-spring-iphone13-pro-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 13 Pro'),
          storage: ['128GB', '256GB', '512GB', '1TB'],
        },
      },
      {
        name: 'iPhone 13',
        description: 'Super Retina XDR display, Cinematic mode, A15 Bionic chip, durable flat-edge design.',
        price: 6200.00,
        stockQuantity: 10,
        images: ['/iphones-default/2022-spring-iphone13-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 13'),
          storage: ['128GB', '256GB', '512GB'],
        },
      },
      // iPhone 12
      {
        name: 'iPhone 12 Pro Max',
        description: '6.7-inch Super Retina XDR display, LiDAR Scanner, Night mode portraits, A14 Bionic chip.',
        price: 6800.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone12-pro-colors.jpg'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 12 Pro Max'),
          storage: ['128GB', '256GB', '512GB'],
        },
      },
      {
        name: 'iPhone 12 Pro',
        description: 'Surgical-grade stainless steel, LiDAR Scanner, MagSafe accessories compatibility, A14 Bionic.',
        price: 5800.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone12-pro-colors.jpg'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 12 Pro'),
          storage: ['128GB', '256GB', '512GB'],
        },
      },
      {
        name: 'iPhone 12',
        description: 'Ceramic Shield front cover, A14 Bionic chip, Night mode on all cameras, MagSafe wireless charging.',
        price: 4800.00,
        stockQuantity: 10,
        images: ['/iphones-default/2021-iphone12-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 12'),
          storage: ['64GB', '128GB', '256GB'],
        },
      },
      // iPhone 11 & Older
      {
        name: 'iPhone 11 Pro Max',
        description: 'Triple-camera system with Ultra Wide, Wide, and Telephoto cameras, Night mode, A13 Bionic chip.',
        price: 4800.00,
        stockQuantity: 10,
        images: ['/iphones-default/identify-iphone-11pro.jpg'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 11 Pro Max'),
          storage: ['64GB', '256GB', '512GB'],
        },
      },
      {
        name: 'iPhone 11 Pro',
        description: 'Triple-camera system, Textured matte glass and stainless steel design, Super Retina XDR display.',
        price: 4200.00,
        stockQuantity: 10,
        images: ['/iphones-default/identify-iphone-11pro.jpg'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 11 Pro'),
          storage: ['64GB', '256GB', '512GB'],
        },
      },
      {
        name: 'iPhone 11',
        description: 'Dual-camera system with Ultra Wide, Night mode, 4K Video, and A13 Bionic chip.',
        price: 3500.00,
        stockQuantity: 10,
        images: ['/iphones-default/identify-iphone-11-colors.jpg'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone 11'),
          storage: ['64GB', '128GB', '256GB'],
        },
      },
      {
        name: 'iPhone XS Max',
        description: 'Super Retina OLED display, Dual 12MP cameras with Smart HDR, Stainless steel band.',
        price: 3200.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-xs-max-colors.jpg'],
        categoryId: smartphonesCat.id,
        condition: 'USED',
        features: {
          colors: getColorsForQuery('iPhone XS Max'),
          storage: ['64GB', '256GB', '512GB'],
        },
      },
      {
        name: 'iPhone XR',
        description: '6.1-inch Liquid Retina HD display, Single 12MP Wide camera, A12 Bionic chip, Face ID.',
        price: 2800.00,
        stockQuantity: 10,
        images: ['/iphones-default/identify-iphone-xr-colors.jpg'],
        categoryId: smartphonesCat.id,
        condition: 'USED',
        features: {
          colors: getColorsForQuery('iPhone XR'),
          storage: ['64GB', '128GB', '256GB'],
        },
      },
      {
        name: 'iPhone X',
        description: '5.8-inch Super Retina HD display, Dual 12MP cameras with dual OIS, Stainless steel band, Face ID.',
        price: 2500.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-x-colors.jpg'],
        categoryId: smartphonesCat.id,
        condition: 'USED',
        features: {
          colors: getColorsForQuery('iPhone X'),
          storage: ['64GB', '256GB'],
        },
      },
      {
        name: 'iPhone SE 3rd Gen',
        description: 'Compact 4.7-inch Retina HD display, A15 Bionic chip, 5G connectivity, and Home button with Touch ID.',
        price: 2900.00,
        stockQuantity: 10,
        images: ['/iphones-default/iphone-se-3rd-gen-colors.png'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
        features: {
          colors: getColorsForQuery('iPhone SE'),
          storage: ['64GB', '128GB', '256GB'],
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

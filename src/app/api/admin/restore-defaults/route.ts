import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    // 2. Define default products to restore with matching showcase images
    const productsToRestore = [
      {
        name: 'iPhone 16 Pro Max 256GB',
        description: 'Titanium design with A18 Pro chip, 48MP Fusion camera, and All-Day Battery Life.',
        price: 15500.00,
        stockQuantity: 8,
        images: ['/iphones.PNG'],
        categoryId: smartphonesCat.id,
        condition: 'NEW',
      },
      {
        name: 'Apple Watch Ultra 2 Titanium',
        description: 'Ultimate sports smartwatch with precision dual-frequency GPS and 36-hour battery.',
        price: 9800.00,
        stockQuantity: 5,
        images: ['/Watches.png'],
        categoryId: watchesCat.id,
        condition: 'NEW',
      },
      {
        name: 'iPad Pro 12.9" M2 Chip',
        description: 'Liquid Retina XDR display with ProMotion and Apple Pencil hover support.',
        price: 11200.00,
        stockQuantity: 4,
        images: ['/tablet.PNG'],
        categoryId: tabletsCat.id,
        condition: 'NEW',
      },
      {
        name: 'Bluetooth Surround Speaker',
        description: 'Deep bass 360-degree wireless speaker with waterproof IPX7 rating.',
        price: 850.00,
        stockQuantity: 12,
        images: ['/speaker.PNG'],
        categoryId: speakersCat.id,
        condition: 'NEW',
      },
      {
        name: 'Designer Fragrance Spray',
        description: 'Long-lasting luxury scent with woody and amber notes.',
        price: 280.00,
        stockQuantity: 15,
        images: ['/fragrance.PNG'],
        categoryId: fragranceCat.id,
        condition: 'NEW',
      },
      {
        name: 'Wireless Fast Charger',
        description: '15W high-speed Qi-certified wireless charging pad for modern devices.',
        price: 120.00,
        stockQuantity: 25,
        images: ['/Covers.png'],
        categoryId: chargersCat.id,
        condition: 'NEW',
      },
    ];

    const restoredProducts = [];
    for (const item of productsToRestore) {
      const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const prod = await prisma.product.upsert({
        where: { slug },
        update: {
          name: item.name,
          price: item.price,
          stockQuantity: item.stockQuantity,
          images: item.images,
          condition: item.condition,
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

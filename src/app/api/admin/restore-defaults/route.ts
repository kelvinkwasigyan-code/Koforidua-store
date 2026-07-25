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

    // 2. Define default products to restore
    const productsToRestore = [
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
      {
        name: 'Luxury Steel Smartwatch',
        description: 'High-end stainless steel body with advanced fitness tracking.',
        price: 650.00,
        stockQuantity: 5,
        images: ['/speaker.PNG'],
        categoryId: watchesCat.id,
        condition: 'NEW',
      },
      {
        name: 'Classic Chronograph Watch',
        description: 'A sleek, premium watch with minimalist dial design.',
        price: 350.00,
        stockQuantity: 10,
        images: ['/iphones.PNG'],
        categoryId: watchesCat.id,
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

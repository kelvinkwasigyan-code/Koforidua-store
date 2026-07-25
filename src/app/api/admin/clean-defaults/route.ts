import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const defaultProductNames = [
      'Designer Fragrance Spray',
      'Wireless Fast Charger',
      'Luxury Steel Smartwatch',
      'Classic Chronograph Watch',
    ];

    // Find sample products matching names or placeholder images
    const sampleProducts = await prisma.product.findMany({
      where: {
        OR: [
          { name: { in: defaultProductNames } },
          { images: { hasSome: ['/fragrance.PNG', '/Covers.png', '/speaker.PNG', '/iphones.PNG', '/file.svg'] } },
        ],
      },
    });

    const sampleIds = sampleProducts.map((p) => p.id);

    if (sampleIds.length > 0) {
      await prisma.orderItem.deleteMany({ where: { productId: { in: sampleIds } } });
      await prisma.review.deleteMany({ where: { productId: { in: sampleIds } } });
      await prisma.product.deleteMany({ where: { id: { in: sampleIds } } });
    }

    return NextResponse.json({
      success: true,
      deletedCount: sampleIds.length,
      deletedNames: sampleProducts.map((p) => p.name),
    });
  } catch (error) {
    console.error('Failed to clean default products:', error);
    return NextResponse.json({ error: 'Failed to delete default products' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  return GET(request);
}

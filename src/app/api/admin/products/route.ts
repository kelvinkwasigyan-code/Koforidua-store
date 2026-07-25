import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, description, price, stockQuantity, categoryName, images, condition, colors, storage } = data;

    if (!name || !price || !categoryName) {
      return NextResponse.json({ error: 'Name, price, and category are required' }, { status: 400 });
    }

    // Find or create category
    let category = await prisma.category.findUnique({
      where: { name: categoryName }
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName }
      });
    }

    // Generate unique slug
    let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || '',
        price: parseFloat(price),
        stockQuantity: parseInt(stockQuantity || '0', 10),
        categoryId: category.id,
        images: Array.isArray(images) && images.length > 0 ? images : ['/logo.jpg'],
        condition: condition || 'NEW',
        features: {
          colors: Array.isArray(colors) ? colors : [],
          storage: Array.isArray(storage) ? storage : [],
        },
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

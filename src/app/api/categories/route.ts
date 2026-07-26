import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Reassign outdated/duplicate category names to clean standardized names
    const mobilePhonesCat = await prisma.category.findUnique({ where: { name: 'Mobile Phones' } });
    if (mobilePhonesCat) {
      let smartphonesCat = await prisma.category.findUnique({ where: { name: 'Smartphones' } });
      if (!smartphonesCat) {
        smartphonesCat = await prisma.category.create({ data: { name: 'Smartphones' } });
      }
      // Reassign all products from Mobile Phones to Smartphones
      await (prisma as any).product.updateMany({
        where: { categoryId: mobilePhonesCat.id },
        data: { categoryId: smartphonesCat.id },
      });
      // Delete old Mobile Phones category
      await prisma.category.delete({ where: { id: mobilePhonesCat.id } });
    }

    // Merge Chargers / Phone Accessories into Accessories
    const chargersCat = await prisma.category.findUnique({ where: { name: 'Chargers' } });
    const phoneAccCat = await prisma.category.findUnique({ where: { name: 'Phone Accessories' } });
    if (chargersCat || phoneAccCat) {
      let accessoriesCat = await prisma.category.findFirst({
        where: { OR: [{ name: 'Accessories' }, { name: 'Covers & Accessories' }] },
      });
      if (!accessoriesCat) {
        accessoriesCat = await prisma.category.create({ data: { name: 'Accessories' } });
      }

      if (chargersCat) {
        await (prisma as any).product.updateMany({
          where: { categoryId: chargersCat.id },
          data: { categoryId: accessoriesCat.id },
        });
        await prisma.category.delete({ where: { id: chargersCat.id } });
      }

      if (phoneAccCat) {
        await (prisma as any).product.updateMany({
          where: { categoryId: phoneAccCat.id },
          data: { categoryId: accessoriesCat.id },
        });
        await prisma.category.delete({ where: { id: phoneAccCat.id } });
      }
    }

    const categories = await (prisma as any).category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const trimmedName = name.trim();

    // Check if category already exists
    const existing = await prisma.category.findUnique({
      where: { name: trimmedName },
    });

    if (existing) {
      return NextResponse.json({ error: 'A category with this name already exists' }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: { name: trimmedName },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

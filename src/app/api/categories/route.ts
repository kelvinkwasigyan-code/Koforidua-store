import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
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

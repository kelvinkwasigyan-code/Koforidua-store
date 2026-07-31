import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    const smartphonesCategory = categories.find(c => c.name.toLowerCase() === 'smartphones');
    const watchesCategory = categories.find(c => c.name.toLowerCase() === 'watches');
    
    if (!smartphonesCategory) return NextResponse.json({ error: 'Smartphones category not found' });

    // Find all watches to see if one is named iPhone 17
    const watches = await prisma.product.findMany({
      where: { categoryId: watchesCategory?.id },
      select: { id: true, name: true }
    });

    // Find all products containing '17'
    const sevens = await prisma.product.findMany({
      where: { name: { contains: '17', mode: 'insensitive' } },
      include: { category: true }
    });

    return NextResponse.json({ watches, sevens });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

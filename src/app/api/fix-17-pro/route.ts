import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    const smartphonesCategory = categories.find(c => c.name.toLowerCase() === 'smartphones');
    
    if (!smartphonesCategory) return NextResponse.json({ error: 'Smartphones category not found' });

    // Find all products containing '17 pro'
    const products = await prisma.product.findMany({
      where: { name: { contains: '17', mode: 'insensitive' } }
    });

    const updated = [];
    for (const p of products) {
      if (p.categoryId !== smartphonesCategory.id) {
        const result = await prisma.product.update({
          where: { id: p.id },
          data: { categoryId: smartphonesCategory.id }
        });
        updated.push(result.name);
      }
    }

    return NextResponse.json({ success: true, updated, allSevens: products.map(p => p.name) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

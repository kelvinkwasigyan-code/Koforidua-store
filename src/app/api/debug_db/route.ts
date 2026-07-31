import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    const watchesCategory = categories.find(c => c.name.toLowerCase() === 'watches');
    
    // Find all products containing '17 pro'
    const products = await prisma.product.findMany({
      where: { name: { contains: '17 pro', mode: 'insensitive' } }
    });

    const updated = [];
    for (const p of products) {
      const result = await prisma.product.update({
        where: { id: p.id },
        data: { categoryId: smartphonesCategory.id }
      });
      updated.push(result.name);
    }

    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

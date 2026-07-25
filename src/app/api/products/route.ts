import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const condition = searchParams.get('condition');
        const ids = searchParams.get('ids');
        
        let whereClause: any = {};
        if (condition) whereClause.condition = condition;
        if (ids) {
            const idsArray = ids.split(',').filter(Boolean);
            if (idsArray.length > 0) {
                whereClause.id = { in: idsArray };
            }
        }

        const products = await prisma.product.findMany({
            where: whereClause,
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
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

        const products = await (prisma as any).product.findMany({
            where: whereClause,
            include: {
                category: true,
                reviews: {
                    select: { rating: true }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const formattedProducts = products.map((p: any) => {
            const reviews = p.reviews || [];
            const reviewCount = reviews.length;
            const averageRating = reviewCount > 0
                ? Number((reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount).toFixed(1))
                : 5.0;

            return {
                ...p,
                averageRating,
                reviewCount,
            };
        });

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

function getPhoneReleaseRank(name: string): number {
  const n = (name || '').toLowerCase();
  
  if (n.includes('iphone 17') || n.includes('iphone17')) {
    return 170 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('plus') ? 2 : 1);
  }
  if (n.includes('iphone 16') || n.includes('iphone16')) {
    return 160 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('plus') ? 2 : 1);
  }
  if (n.includes('iphone 15') || n.includes('iphone15')) {
    return 150 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('plus') ? 2 : 1);
  }
  if (n.includes('iphone 14') || n.includes('iphone14')) {
    return 140 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('plus') ? 2 : 1);
  }
  if (n.includes('iphone 13') || n.includes('iphone13')) {
    return 130 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('mini') ? 2 : 1);
  }
  if (n.includes('iphone 12') || n.includes('iphone12')) {
    return 120 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('mini') ? 2 : 1);
  }
  if (n.includes('iphone 11') || n.includes('iphone11')) {
    return 110 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : 1);
  }
  if (n.includes('xs max')) return 104;
  if (n.includes('xs')) return 103;
  if (n.includes('xr')) return 102;
  if (n.includes('iphone x')) return 101;
  if (n.includes('se 3') || n.includes('se')) return 90;

  return 0;
}

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

        // Pre-sort products strictly by newest phone release generation first
        formattedProducts.sort((a: any, b: any) => {
            const rankDiff = getPhoneReleaseRank(b.name) - getPhoneReleaseRank(a.name);
            if (rankDiff !== 0) return rankDiff;
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
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
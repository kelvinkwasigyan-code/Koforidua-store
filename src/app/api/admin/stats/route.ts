import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const [totalProducts, pendingOrdersCount, orders, recentProducts] = await Promise.all([
      prisma.product.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          orderItems: {
            include: {
              product: { select: { name: true } }
            }
          }
        }
      }),
      prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          category: { select: { name: true } }
        }
      })
    ]);

    const totalSalesAgg = await prisma.order.aggregate({
      _sum: {
        totalAmount: true
      }
    });

    const totalSales = totalSalesAgg._sum.totalAmount ? Number(totalSalesAgg._sum.totalAmount) : 0;

    return NextResponse.json({
      totalSales,
      totalProducts,
      pendingOrders: pendingOrdersCount,
      recentOrders: orders,
      recentProducts
    });
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch admin statistics' }, { status: 500 });
  }
}

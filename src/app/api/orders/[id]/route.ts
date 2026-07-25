import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const orderId = params.id;

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                images: true,
                            }
                        }
                    }
                }
            }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Failed to fetch order:', error);
        return NextResponse.json(
            { error: 'Failed to fetch order details' },
            { status: 500 }
        );
    }
}

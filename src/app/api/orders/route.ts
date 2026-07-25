import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      region,
      city,
      address,
      paymentMethod,
      totalAmount,
      cartItems
    } = data;

    if (!customerName || !customerPhone || !region || !city || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Determine payment status based on method (MoMo mock flow resolves before hitting this API)
    const paymentStatus = paymentMethod === 'MOMO' ? 'SUCCESS' : 'PENDING';

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        customerEmail,
        region,
        city,
        address,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderItems: {
          create: cartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      }
    });

    return NextResponse.json({ success: true, orderId: newOrder.id }, { status: 201 });
  } catch (error: any) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Failed to process order. Please try again.' }, { status: 500 });
  }
}

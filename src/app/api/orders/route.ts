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
      cartItems,
      paystackReference
    } = data;

    if (!customerName || !customerPhone || !region || !city || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let paymentStatus = 'PENDING';

    if (paymentMethod === 'MOMO') {
      if (!paystackReference) {
        return NextResponse.json({ error: 'Missing payment reference' }, { status: 400 });
      }

      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      if (!secretKey) {
        console.error('PAYSTACK_SECRET_KEY is missing in environment');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
      }

      try {
        // Verify transaction with Paystack API
        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${paystackReference}`, {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        });
        
        const verifyData = await verifyRes.json();
        
        if (!verifyData.status || verifyData.data.status !== 'success') {
          return NextResponse.json({ error: 'Payment verification failed. The transaction was not successful.' }, { status: 400 });
        }

        // Verify the amount paid matches the totalAmount (Paystack amount is in pesewas)
        if (verifyData.data.amount !== Math.round(totalAmount * 100)) {
          return NextResponse.json({ error: 'Payment amount mismatch. Possible tampering.' }, { status: 400 });
        }

        paymentStatus = 'SUCCESS';
      } catch (error) {
        console.error('Paystack API error:', error);
        return NextResponse.json({ error: 'Failed to communicate with payment provider' }, { status: 500 });
      }
    }

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

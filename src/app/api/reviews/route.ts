import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'productId query param is required' }, { status: 400 });
    }

    const reviews: any[] = await (prisma as any).review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? Number((reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews).toFixed(1))
      : 0;

    const ratingCounts = {
      5: reviews.filter((r: any) => r.rating === 5).length,
      4: reviews.filter((r: any) => r.rating === 4).length,
      3: reviews.filter((r: any) => r.rating === 3).length,
      2: reviews.filter((r: any) => r.rating === 2).length,
      1: reviews.filter((r: any) => r.rating === 1).length,
    };

    return NextResponse.json({
      reviews,
      totalReviews,
      averageRating,
      ratingCounts,
    });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, productId, rating, comment, customerName, images } = body;

    if (!orderId || !productId || !rating || !comment || !customerName) {
      return NextResponse.json(
        { error: 'Order Reference ID, Product, Rating, Comment, and Name are required.' },
        { status: 400 }
      );
    }

    // 1. Verify that Order exists and contains the Product
    const order: any = await (prisma as any).order.findUnique({
      where: { id: orderId.trim() },
      include: { orderItems: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order Reference ID not found. Please check your order confirmation.' },
        { status: 404 }
      );
    }

    const purchasedItem = order.orderItems.find((item: any) => item.productId === productId);
    if (!purchasedItem) {
      return NextResponse.json(
        { error: 'Verification failed: This product was not found in the specified order.' },
        { status: 403 }
      );
    }

    // 2. Prevent duplicate reviews for the same order & product
    const existingReview = await (prisma as any).review.findFirst({
      where: {
        orderId: order.id,
        productId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already submitted a review for this product on this order.' },
        { status: 409 }
      );
    }

    // 3. Create Verified Review
    const review = await (prisma as any).review.create({
      data: {
        productId,
        orderId: order.id,
        customerName: customerName.trim(),
        rating: Math.min(5, Math.max(1, parseInt(rating, 10))),
        comment: comment.trim(),
        images: Array.isArray(images) ? images : [],
        isVerifiedPurchase: true,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Failed to create review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

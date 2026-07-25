import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Retrieve all products for the store
export async function GET() {
    try {
        const products = await prisma.storeProduct.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST: Add a new product (Admin)
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const product = await prisma.storeProduct.create({
            data: {
                name: body.name,
                brand: body.brand || 'Generic', // Provide default or pass brand from form
                os: body.os || null,
                description: body.description,
                price: parseFloat(body.price),
                salePrice: body.salePrice ? parseFloat(body.salePrice) : null,
                category: body.category,
                imageUrl: body.imageUrl,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}

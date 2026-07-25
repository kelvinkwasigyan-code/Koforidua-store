import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailsClient from '@/components/store/ProductDetailsClient';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    }
  });

  if (!product) {
    notFound();
  }

  // Ensure decimal price is converted to number to avoid Client Component serialization errors
  const serializedProduct = {
    ...product,
    price: Number(product.price),
  };

  return (
    <div className="min-h-screen bg-white">
      <ProductDetailsClient product={serializedProduct as any} />
    </div>
  );
}

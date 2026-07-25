import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Updating products with local public images...');

  // 1. Fetch category IDs
  const watchesCategory = await prisma.category.findFirst({ where: { name: 'Smart Watches' } }) 
    || await prisma.category.findFirst({ where: { name: 'Watches' } });
  const accessoriesCategory = await prisma.category.findFirst({ where: { name: 'Chargers' } }) 
    || await prisma.category.findFirst({ where: { name: 'Phone Accessories' } });
  const fragrancesCategory = await prisma.category.findFirst({ where: { name: 'Fragrance & Scalp Care' } }) 
    || await prisma.category.findFirst({ where: { name: 'Fragrances & Air Fresheners' } });

  if (!watchesCategory || !accessoriesCategory || !fragrancesCategory) {
    throw new Error('Categories not found! Make sure category seeding was run.');
  }

  // 2. Define products mapped directly to your /public filenames
  const productsData = [
    {
      name: 'Designer Fragrance Spray',
      description: 'Long-lasting luxury scent with woody and amber notes.',
      price: 280.00,
      stockQuantity: 15,
      images: ['/fragrance.PNG'],
      categoryId: fragrancesCategory.id,
    },
    {
      name: 'Wireless Fast Charger',
      description: '15W high-speed Qi-certified wireless charging pad for modern devices.',
      price: 120.00,
      stockQuantity: 25,
      images: ['/airpods.PNG'],
      categoryId: accessoriesCategory.id,
    },
    {
      name: 'Luxury Steel Smartwatch',
      description: 'High-end stainless steel body with advanced fitness tracking.',
      price: 650.00,
      stockQuantity: 5,
      images: ['/speaker.PNG'],
      categoryId: watchesCategory.id,
    },
    {
      name: 'Classic Chronograph Watch',
      description: 'A sleek, premium watch with minimalist dial design.',
      price: 350.00,
      stockQuantity: 10,
      images: ['/iphones.PNG'],
      categoryId: watchesCategory.id,
    }
  ];

  for (const item of productsData) {
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await prisma.product.upsert({
      where: { slug },
      update: {
        images: item.images,
        price: item.price,
        stockQuantity: item.stockQuantity,
      },
      create: {
        name: item.name,
        slug,
        description: item.description,
        price: item.price,
        stockQuantity: item.stockQuantity,
        images: item.images,
        category: {
          connect: { id: item.categoryId },
        },
      },
    });
  }

  console.log('✅ Products successfully updated with local public images!');
}

main()
  .catch((e) => {
    console.error('Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
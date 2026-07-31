import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const categories = await prisma.category.findMany();
  console.log("CATEGORIES:");
  console.log(categories);

  const products = await prisma.product.findMany({
    where: {
      name: { contains: '17 pro', mode: 'insensitive' }
    },
    include: { category: true }
  });
  console.log("PRODUCTS:");
  console.log(products);

  const smartphonesCategory = categories.find(c => c.name.toLowerCase() === 'smartphones');
  
  if (smartphonesCategory) {
    for (const p of products) {
      if (p.category?.name.toLowerCase() !== 'smartphones') {
        await prisma.product.update({
          where: { id: p.id },
          data: { categoryId: smartphonesCategory.id }
        });
        console.log(`Updated ${p.name} to category Smartphones`);
      }
    }
  } else {
    console.log("Could not find Smartphones category!");
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

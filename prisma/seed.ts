import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = [
    { name: "Phones", slug: "phones" },
    { name: "Electronics", slug: "electronics" },
    { name: "Accessories", slug: "accessories" },
    { name: "Sprays & Liquids", slug: "sprays-liquids" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  const deliveryZones = [
    { region: "Eastern", city: "Koforidua", baseFee: 15, estimatedDays: 1 },
    { region: "Greater Accra", city: "Accra", baseFee: 25, estimatedDays: 2 },
    { region: "Ashanti", city: "Kumasi", baseFee: 30, estimatedDays: 2 },
    { region: "Northern", city: "Tamale", baseFee: 50, estimatedDays: 4 },
    { region: "Western", city: "Takoradi", baseFee: 35, estimatedDays: 3 },
  ];

  for (const zone of deliveryZones) {
    await prisma.deliveryZone.upsert({
      where: {
        region_city: { region: zone.region, city: zone.city },
      },
      update: { baseFee: zone.baseFee, estimatedDays: zone.estimatedDays },
      create: zone,
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

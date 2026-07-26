import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Auto-create "StoreSettings" table if missing
    try {
      await (prisma as any).$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "StoreSettings" (
          "id" TEXT PRIMARY KEY DEFAULT 'default-store-settings',
          "whatsappNumber" TEXT NOT NULL DEFAULT '0547654736',
          "storeName" TEXT NOT NULL DEFAULT 'Joerich Phones',
          "storePhone" TEXT NOT NULL DEFAULT '0547654736',
          "storeLocation" TEXT NOT NULL DEFAULT 'Koforidua, Accra Station',
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (e: any) {
      console.warn('StoreSettings table info:', e?.message);
    }

    let settings: any[] = [];
    try {
      settings = await (prisma as any).$queryRawUnsafe(
        `SELECT * FROM "StoreSettings" WHERE "id" = 'default-store-settings' LIMIT 1;`
      );
    } catch (e) {
      console.warn('Select StoreSettings query info:', e);
    }

    if (settings && settings.length > 0) {
      return NextResponse.json(settings[0]);
    }

    // Default settings fallback
    return NextResponse.json({
      id: 'default-store-settings',
      whatsappNumber: '0547654736',
      storeName: 'Joerich Phones',
      storePhone: '0547654736',
      storeLocation: 'Koforidua, Accra Station',
    });
  } catch (error) {
    console.error('Failed to fetch store settings:', error);
    return NextResponse.json({
      id: 'default-store-settings',
      whatsappNumber: '0547654736',
      storeName: 'Joerich Phones',
      storePhone: '0547654736',
      storeLocation: 'Koforidua, Accra Station',
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { whatsappNumber, storeName, storePhone, storeLocation } = await req.json();

    const cleanWhatsapp = (whatsappNumber || '').trim();
    const cleanName = (storeName || 'Joerich Phones').trim();
    const cleanPhone = (storePhone || '0547654736').trim();
    const cleanLocation = (storeLocation || 'Koforidua, Accra Station').trim();

    if (!cleanWhatsapp) {
      return NextResponse.json(
        { error: 'WhatsApp destination phone number is required.' },
        { status: 400 }
      );
    }

    // Ensure table exists
    await (prisma as any).$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "StoreSettings" (
        "id" TEXT PRIMARY KEY DEFAULT 'default-store-settings',
        "whatsappNumber" TEXT NOT NULL DEFAULT '0547654736',
        "storeName" TEXT NOT NULL DEFAULT 'Joerich Phones',
        "storePhone" TEXT NOT NULL DEFAULT '0547654736',
        "storeLocation" TEXT NOT NULL DEFAULT 'Koforidua, Accra Station',
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Upsert store settings
    await (prisma as any).$executeRawUnsafe(`
      INSERT INTO "StoreSettings" ("id", "whatsappNumber", "storeName", "storePhone", "storeLocation", "updatedAt")
      VALUES ('default-store-settings', '${cleanWhatsapp}', '${cleanName}', '${cleanPhone}', '${cleanLocation}', NOW())
      ON CONFLICT ("id")
      DO UPDATE SET 
        "whatsappNumber" = '${cleanWhatsapp}',
        "storeName" = '${cleanName}',
        "storePhone" = '${cleanPhone}',
        "storeLocation" = '${cleanLocation}',
        "updatedAt" = NOW();
    `);

    return NextResponse.json({
      success: true,
      message: 'WhatsApp Business order destination and store settings updated successfully!',
      settings: {
        whatsappNumber: cleanWhatsapp,
        storeName: cleanName,
        storePhone: cleanPhone,
        storeLocation: cleanLocation,
      },
    });
  } catch (error: any) {
    console.error('Failed to update store settings:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update store settings' },
      { status: 500 }
    );
  }
}

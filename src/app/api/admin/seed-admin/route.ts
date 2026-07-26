import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function GET() {
  try {
    const defaultEmail = 'admin@joerichphones.com';
    const defaultPassword = 'adminpassword123';

    const hashedPassword = hashPassword(defaultPassword);

    try {
      await (prisma as any).$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "User" (
          "id" TEXT PRIMARY KEY,
          "email" TEXT UNIQUE NOT NULL,
          "password" TEXT NOT NULL,
          "role" TEXT NOT NULL DEFAULT 'USER',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await (prisma as any).$executeRawUnsafe(`
        INSERT INTO "User" ("id", "email", "password", "role", "createdAt")
        VALUES ('admin-id-001', '${defaultEmail}', '${hashedPassword}', 'ADMIN', NOW())
        ON CONFLICT ("email")
        DO UPDATE SET "password" = '${hashedPassword}', "role" = 'ADMIN';
      `);
    } catch (e: any) {
      console.warn('DB seed raw error:', e?.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Admin account initialized successfully!',
      credentials: {
        loginUrl: 'http://localhost:3000/admin/login',
        email: defaultEmail,
        password: defaultPassword,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    });
  }
}

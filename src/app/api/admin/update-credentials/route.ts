import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Both email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);

    // Auto-create "User" table if missing
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
    } catch (e: any) {
      console.warn('Table creation info:', e?.message);
    }

    // Upsert Admin User in Database
    await (prisma as any).$executeRawUnsafe(`
      INSERT INTO "User" ("id", "email", "password", "role", "createdAt")
      VALUES ('admin-id-001', '${email.toLowerCase()}', '${hashedPassword}', 'ADMIN', NOW())
      ON CONFLICT ("email")
      DO UPDATE SET "password" = '${hashedPassword}', "role" = 'ADMIN';
    `);

    return NextResponse.json({
      success: true,
      message: 'Admin credentials updated successfully!',
      credentials: {
        email: email.toLowerCase(),
      },
    });
  } catch (error: any) {
    console.error('Failed to update admin credentials:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update admin credentials' },
      { status: 500 }
    );
  }
}

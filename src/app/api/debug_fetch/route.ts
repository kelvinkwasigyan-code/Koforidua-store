import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await fetch('http://localhost:3000/api/products');
  const data = await res.json();
  const pro17 = data.find((d: any) => d.name === 'iPhone 17 Pro');
  return NextResponse.json({ pro17 });
}

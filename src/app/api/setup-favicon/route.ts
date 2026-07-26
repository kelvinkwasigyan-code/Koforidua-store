import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const appDir = path.join(process.cwd(), 'src', 'app');

    const sourceIco = path.join(publicDir, 'favicon (1).ico');
    const targetPublicIco = path.join(publicDir, 'favicon.ico');
    const targetAppIco = path.join(appDir, 'favicon.ico');

    if (fs.existsSync(sourceIco)) {
      fs.copyFileSync(sourceIco, targetPublicIco);
      fs.copyFileSync(sourceIco, targetAppIco);
      return NextResponse.json({
        success: true,
        message: 'Favicon updated successfully across public and src/app directories!',
      });
    }

    return NextResponse.json({ error: 'Source favicon (1).ico not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}

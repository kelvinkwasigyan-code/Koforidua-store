import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { uploadToSupabaseStorage } from '@/lib/supabaseStorage';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files: File[] = data.getAll('files') as unknown as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure upload directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }

    const fileUrls: string[] = [];

    for (const file of files) {
      // 1. Try uploading to Supabase Storage first to get a permanent public URL
      const supabasePublicUrl = await uploadToSupabaseStorage(file, file.name, 'products');

      if (supabasePublicUrl) {
        fileUrls.push(supabasePublicUrl);
      } else {
        // 2. Fallback to local server filesystem upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        fileUrls.push(`/uploads/${filename}`);
      }
    }

    return NextResponse.json({ success: true, urls: fileUrls });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload files' }, { status: 500 });
  }
}

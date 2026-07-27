import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wfpbqtrbobkoffxkltrl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * Uploads a file to Supabase Storage and returns its public URL.
 * Bucket defaults to 'products' or 'koforidua-store'.
 */
export async function uploadToSupabaseStorage(
  file: File | Buffer,
  fileName: string,
  bucketName: string = 'products'
): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase client credentials not set.');
    return null;
  }

  try {
    const filePath = `products/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.]/g, '')}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error.message);
      return null;
    }

    if (data) {
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      console.log('Generated Supabase Public URL:', publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    }

    return null;
  } catch (err) {
    console.error('Failed to upload to Supabase storage:', err);
    return null;
  }
}

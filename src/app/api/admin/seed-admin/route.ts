import { NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const defaultEmail = 'admin@joerichphones.com';
    const defaultPassword = 'adminpassword123';

    // Initialize Supabase Admin client to bypass RLS and create users directly
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      throw new Error('Failed to fetch users: ' + listError.message);
    }

    const existingAdmin = existingUsers.users.find(u => u.email === defaultEmail);

    if (!existingAdmin) {
      // 2. Create the user with email_confirm set to true
      const { error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: defaultEmail,
        password: defaultPassword,
        email_confirm: true, // Automatically verify the email
      });

      if (createError) {
        throw new Error('Failed to create admin: ' + createError.message);
      }
    } else {
      // 3. If exists, ensure password is set to default and email is confirmed
      await supabaseAdmin.auth.admin.updateUserById(existingAdmin.id, {
        password: defaultPassword,
        email_confirm: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin account initialized successfully in Supabase Auth!',
      credentials: {
        loginUrl: 'http://localhost:3000/login',
        email: defaultEmail,
        password: defaultPassword,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    }, { status: 500 });
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  // If email confirmation is required, session will be null
  if (!data.session) {
    return redirect('/login?error=Please check your email to verify your account before logging in.')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendPasswordResetEmail } from '@/lib/email'

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return redirect('/forgot-password?error=Email is required')
  }

  // Use service role to generate a recovery link directly
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email: email,
  })

  if (error || !data.properties?.action_link) {
    // Return generic message to prevent email enumeration
    return redirect('/forgot-password?message=If an account exists, a reset link has been sent.')
  }

  // Extract the hashed token from the action link if you want, or just send the action link directly!
  // By default, Supabase's action_link looks like: https://[project].supabase.co/auth/v1/verify?token=[token]&type=recovery&redirect_to=[url]
  // We can just point them to our own `/reset-password?token=[token]` or just let them click the action_link directly, which will redirect them to our app.
  // Actually, Supabase's action_link handles the verification and then redirects to the site URL with a session!
  // So we just send the action_link.

  await sendPasswordResetEmail(email, data.properties.action_link)

  redirect('/forgot-password?message=Reset link sent! Please check your email.')
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return redirect('/reset-password?error=Passwords do not match')
  }

  const supabase = await createClient()

  // Update the user's password using their current session
  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return redirect(`/reset-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/login?message=Password updated successfully! Please log in.')
}


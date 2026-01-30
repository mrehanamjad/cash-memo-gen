'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: unknown, formData: FormData) {
  const password = formData.get('password') as string;

  // 1. Check if password matches your Environment Variable
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'Invalid password. Access denied.' };
  }

  // 2. Set a secure, HTTP-only cookie (users cannot fake this)
  const cookieStore = await cookies();
  
  // Set cookie to expire in 7 days
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set('session_token', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  // 3. Redirect to the dashboard
  redirect('/');
}
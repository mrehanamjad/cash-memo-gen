import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Get the current path
  const path = request.nextUrl.pathname;

  // 2. Define public paths (Login page, static assets, logos)
  // We allow /logo.jpg so it shows up on the login screen!
  const isPublicPath = path === '/login' || path.includes('.') || path.startsWith('/_next');

  // 3. Get the session cookie
  const sessionToken = request.cookies.get('session_token')?.value;

  // 4. LOGIC: 
  
  // If user is ON the login page but ALREADY has a cookie -> send to Dashboard
  if (path === '/login' && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is trying to access a protected page (like /) WITHOUT a cookie -> send to Login
  if (!isPublicPath && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Otherwise, continue
  return NextResponse.next();
}

// Configure paths to check
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
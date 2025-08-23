import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { JWT } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/register' || path === '/';
  const isProtectedRoute = !isPublicPath;
  const isAdminRoute = path.startsWith('/admin');
  const isUserRoute = path.startsWith('/dashboard');

  // Log all incoming cookies
  console.log('Middleware - All Request Cookies:', request.cookies.getAll());
  // Log the specific session cookie if present
  console.log('Middleware - Session Cookie:', request.cookies.get('next-auth.session-token'));


  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    // Optional: Add logging for raw token if available for getToken
    // raw: true, // This would make `token` the raw JWT string before parsing
  });
  console.log('Middleware - Decoded Token:', { token });

  // If already logged in, redirect from public pages to role home
  if (isPublicPath && token) {
    const role = (token as JWT).role;
    const destination = role === 'ADMIN' ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based route protection
  if (token) {
    const role = (token as JWT).role;

    // Block non-admins from admin routes
    if (isAdminRoute && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Optionally keep admins on admin routes when hitting user dashboard
    if (isUserRoute && role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
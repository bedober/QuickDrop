import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes by role
const adminPaths = ['/admin'];
const riderPaths = ['/rider'];
const customerPaths = ['/account', '/my-orders', '/tracking', '/food', '/checkout'];
const publicPaths = ['/login', '/signup', '/'];

// Get required role for a path
function getRequiredRole(pathname: string): 'admin' | 'rider' | 'customer' | null {
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return 'admin';
  if (pathname === '/rider' || pathname.startsWith('/rider/')) return 'rider';
  if (customerPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return 'customer';
  }
  return null;
}

// Check if path is public
function isPublicPath(pathname: string): boolean {
  return publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'));
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requiredRole = getRequiredRole(pathname);

  // Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  if (requiredRole) {
    const userRole = request.cookies.get('userRole')?.value;
    const userToken = request.cookies.get('authToken')?.value;

    // No token = redirect to login
    if (!userToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Token exists but role doesn't match
    if (userRole !== requiredRole) {
      // Redirect to appropriate dashboard based on actual role
      const dashboardMap: Record<string, string> = {
        admin: '/admin',
        rider: '/rider',
        customer: '/account',
      };
      const redirectPath = dashboardMap[userRole] || '/login';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

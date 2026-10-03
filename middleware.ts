import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const customerPaths = ['/account', '/my-orders', '/tracking', '/courier'];
const publicPaths = ['/login', '/signup', '/'];

function getRequiredRole(pathname: string): 'rider' | 'customer' | null {
  if (pathname === '/rider' || pathname.startsWith('/rider/')) return 'rider';
  if (customerPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) return 'customer';
  return null;
}

function isPublicPath(pathname: string) {
  return publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'));
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requiredRole = getRequiredRole(pathname);
  if (isPublicPath(pathname)) return NextResponse.next();

  if (requiredRole) {
    const userRole = request.cookies.get('userRole')?.value;
    const userToken = request.cookies.get('authToken')?.value;
    if (!userToken) return NextResponse.redirect(new URL('/login', request.url));

    if (userRole !== requiredRole) {
      const dashboardMap: Record<string, string> = { rider: '/rider', customer: '/account' };
      return NextResponse.redirect(new URL(dashboardMap[userRole] || '/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

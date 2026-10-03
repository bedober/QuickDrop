import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const customerPaths = ['/account', '/my-orders', '/tracking', '/courier'];
const publicPaths = ['/login', '/signup', '/'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublic = publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'));
  const isCustomer = customerPaths.some(path => pathname === path || pathname.startsWith(path + '/'));

  if (isPublic) return NextResponse.next();

  if (pathname === '/rider' || pathname.startsWith('/rider/') || pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isCustomer) {
    const userToken =
      request.cookies.get('authToken')?.value ||
      request.cookies.get('next-auth.session-token')?.value ||
      request.cookies.get('__Secure-next-auth.session-token')?.value;

    if (!userToken) {
      return NextResponse.redirect(new URL('/login?next=' + encodeURIComponent(pathname), request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

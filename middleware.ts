import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const customerPaths=['/account','/my-orders','/tracking','/food','/courier','/ride','/checkout'];
function requiredRole(pathname:string){if(pathname==='/admin'||pathname.startsWith('/admin/'))return 'admin';if(pathname==='/rider'||pathname.startsWith('/rider/'))return 'rider';if(customerPaths.some((path)=>pathname===path||pathname.startsWith(`${path}/`)))return 'customer';return null;}
export function middleware(request:NextRequest){const pathname=request.nextUrl.pathname;const required=requiredRole(pathname);if(!required)return NextResponse.next();const current=request.cookies.get('quickdrop_role')?.value;if(!current)return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(pathname)}`,request.url));if(current!==required){const destination=current==='admin'?'/admin':current==='rider'?'/rider':'/account';return NextResponse.redirect(new URL(destination,request.url));}return NextResponse.next();}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const roleForPath=(pathname:string)=>pathname.startsWith('/admin')?'admin':pathname.startsWith('/rider')?'rider':['/account','/my-orders','/tracking','/food','/courier','/ride','/checkout'].some(p=>pathname===p||pathname.startsWith(`${p}/`))?'customer':null;
export function middleware(request:NextRequest){const path=request.nextUrl.pathname;const role=roleForPath(path);if(!role)return NextResponse.next();const current=request.cookies.get('quickdrop_role')?.value;if(!current)return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(path)}`,request.url));if(current!==role)return NextResponse.redirect(new URL(current==='admin'?'/admin':current==='rider'?'/rider':'/',request.url));return NextResponse.next()}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};

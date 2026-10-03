import { NextRequest, NextResponse } from 'next/server';

function quote(km: number, base = 3000) {
  const distanceKm = Number.isFinite(km) && km > 0 ? km : 2;
  return { currency: 'UGX', distanceKm, fee: base + Math.ceil(distanceKm) * 1000, etaMinutes: Math.ceil(distanceKm * 5) + 10 };
}

export function GET(request: NextRequest) {
  return NextResponse.json(quote(Number(request.nextUrl.searchParams.get('km'))));
}

import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const value = Number(request.nextUrl.searchParams.get('km'));
  return NextResponse.json({ currency: 'UGX', distanceKm: Number.isFinite(value) && value > 0 ? value : 4, fares: { 'Boda Boda': 6500, TukTuk: 8500, Car: 12000 } });
}

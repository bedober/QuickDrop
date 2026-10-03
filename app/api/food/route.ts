import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ restaurants: 6 });
}

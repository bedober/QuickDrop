import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ id: `QD-R${Date.now().toString().slice(-5)}`, status: 'searching', ...body }, { status: 201 });
}

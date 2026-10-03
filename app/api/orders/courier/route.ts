import { NextRequest, NextResponse } from 'next/server';

function fee(km: number) {
  const distance = Number.isFinite(km) && km > 0 ? km : 2;
  return 3000 + Math.ceil(distance) * 1000;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ id: `QD-C${Date.now().toString().slice(-5)}`, type: 'courier', status: 'searching', deliveryFee: fee(Number(body?.distance)), ...body }, { status: 201 });
}

import { NextResponse } from 'next/server';

const BOT_URL = process.env.BOT_API_URL || 'http://localhost:3001';
const API_KEY = process.env.API_KEY || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '50';
  try {
    const res = await fetch(`${BOT_URL}/api/ranking?limit=${limit}`, {
      headers: { 'x-api-key': API_KEY },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 });
  }
}

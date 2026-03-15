import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

const BOT_URL = process.env.BOT_API_URL || 'http://localhost:3001';
const API_KEY = process.env.API_KEY || '';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const discordId = searchParams.get('discordId');
  const id = discordId || (session?.user as { id?: string })?.id;
  if (!id) return NextResponse.json({ error: 'Non connecté' }, { status: 401 });
  try {
    const res = await fetch(`${BOT_URL}/api/user/${encodeURIComponent(id)}`, {
      headers: { 'x-api-key': API_KEY },
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 });
  }
}

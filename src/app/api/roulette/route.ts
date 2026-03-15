import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

const BOT_URL = process.env.BOT_API_URL || 'http://localhost:3001';
const API_KEY = process.env.API_KEY || '';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Connecte-toi avec Discord' }, { status: 401 });
  const discordId = (session.user as { id?: string }).id;
  const username = session.user.name || session.user.email || '';
  try {
    const res = await fetch(`${BOT_URL}/api/roulette`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({ discordId, username }),
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 });
  }
}

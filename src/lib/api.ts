function getBase(): string {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export type RankingEntry = {
  position: number;
  discordId: string;
  username: string;
  sayucoins: number;
};

export type UserBalance = {
  discordId: string;
  username: string;
  sayucoins: number;
  gamesPlayed?: number;
};

export async function fetchRanking(limit = 50): Promise<RankingEntry[]> {
  const res = await fetch(`${getBase()}/api/ranking?limit=${limit}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Erreur classement');
  const data = await res.json();
  return data.ranking || [];
}

export async function fetchUserBalance(discordId: string): Promise<UserBalance | null> {
  const res = await fetch(`${getBase()}/api/user?discordId=${encodeURIComponent(discordId)}`);
  if (!res.ok) return null;
  return res.json();
}

export async function earnSayucoins(
  discordId: string,
  username: string,
  amount: number,
  difficulty?: string
): Promise<{ sayucoins: number; earned: number }> {
  const res = await fetch(`${getBase()}/api/earn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ discordId, username, amount, difficulty }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Erreur');
  }
  return res.json();
}

export async function spinRoulette(discordId: string, username: string): Promise<{
  success: boolean;
  sayucoins: number;
  wonRoleId: string;
  wonRoleName: string;
}> {
  const res = await fetch(`${getBase()}/api/roulette`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ discordId, username }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur roulette');
  return data;
}

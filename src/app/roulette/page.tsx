'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ClientHeader } from '@/components/ClientHeader';
import { RouletteGame } from '@/components/RouletteGame';

export default function RoulettePage() {
  const { data: session, status } = useSession();
  const [sayucoins, setSayucoins] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const fetchUser = useCallback(() => {
    if (!session?.user?.id) return;
    fetch('/api/user')
      .then((r) => r.json())
      .then((u) => setSayucoins(u.sayucoins ?? 0))
      .catch(() => setSayucoins(0));
  }, [session?.user?.id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user?.id) fetchUser();
  }, [session?.user?.id, fetchUser]);

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 border-b border-pink-200/50 bg-white/80 backdrop-blur" />
        <main className="flex-1 flex items-center justify-center py-12">
          <p className="text-sayuri-dark">Chargement...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader session={session} />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-sayuri-dark mb-2">Roulette des rôles</h1>
        <p className="text-pink-800/80 mb-6 text-center">
          Coût : 1000 Sayucoins par tour. Tu peux gagner un rôle Discord !
        </p>
        {session ? (
          <RouletteGame />
        ) : (
          <p className="text-lg text-gray-600">
            <Link href="/api/auth/signin" className="text-sayuri-pink font-bold hover:underline">
              Connecte-toi avec Discord
            </Link>{' '}
            pour jouer.
          </p>
        )}
      </main>
    </div>
  );
}

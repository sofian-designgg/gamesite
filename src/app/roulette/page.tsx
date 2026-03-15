import { Header } from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { RouletteGame } from '@/components/RouletteGame';

export default async function RoulettePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-sayuri-dark mb-2">Roulette des rôles</h1>
        <p className="text-pink-800/80 mb-6 text-center">
          Coût : 1000 Sayucoins par tour. Tu peux gagner un rôle Discord !
        </p>
        {session ? (
          <RouletteGame />
        ) : (
          <p className="text-lg text-gray-600">
            <a href="/api/auth/signin" className="text-sayuri-pink font-bold hover:underline">
              Connecte-toi avec Discord
            </a>{' '}
            pour jouer.
          </p>
        )}
      </main>
    </div>
  );
}

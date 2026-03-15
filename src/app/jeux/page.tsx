import Link from 'next/link';
import { Header } from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GameLinks } from '@/components/GameLinks';

export default async function JeuxPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sayuri-dark mb-2">Jeux</h1>
        <p className="text-pink-800/80 mb-8">
          Gagne des Sayucoins selon la difficulté. Utilise-les pour la roulette !
        </p>
        {session ? (
          <GameLinks />
        ) : (
          <p className="text-lg text-gray-600">
            <a href="/api/auth/signin" className="text-sayuri-pink font-bold hover:underline">
              Connecte-toi avec Discord
            </a>{' '}
            pour jouer.
          </p>
        )}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white/90 p-6 border border-pink-100 shadow">
            <h3 className="font-bold text-sayuri-dark mb-2">Facile</h3>
            <p className="text-sm text-gray-600">5 à 15 Sayucoins par partie</p>
          </div>
          <div className="rounded-xl bg-white/90 p-6 border border-pink-100 shadow">
            <h3 className="font-bold text-sayuri-dark mb-2">Moyen</h3>
            <p className="text-sm text-gray-600">20 à 50 Sayucoins par partie</p>
          </div>
          <div className="rounded-xl bg-white/90 p-6 border border-pink-100 shadow">
            <h3 className="font-bold text-sayuri-dark mb-2">Difficile</h3>
            <p className="text-sm text-gray-600">60 à 120 Sayucoins par partie</p>
          </div>
        </div>
        <Link href="/" className="mt-6 inline-block text-sayuri-pink hover:underline font-medium">
          ← Accueil
        </Link>
      </main>
    </div>
  );
}

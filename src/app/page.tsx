import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Header } from '@/components/Header';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-sayuri-dark drop-shadow-lg animate-pulse-soft mb-4">
          Sayuri Games
        </h1>
        <p className="text-xl text-pink-800/90 mb-8 max-w-lg">
          Joue, gagne des Sayucoins et monte dans le classement. Rejoins l&apos;aventure !
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {session ? (
            <>
              <Link
                href="/jeux"
                className="px-8 py-4 rounded-2xl bg-sayuri-pink text-white font-bold shadow-lg hover:bg-sayuri-dark transition animate-float"
              >
                Jouer
              </Link>
              <Link
                href="/classement"
                className="px-8 py-4 rounded-2xl bg-white/90 text-sayuri-dark font-bold shadow-lg hover:bg-white transition"
              >
                Classement
              </Link>
              <Link
                href="/roulette"
                className="px-8 py-4 rounded-2xl bg-rose-400 text-white font-bold shadow-lg hover:bg-rose-500 transition"
              >
                Roulette (1000 Sayucoins)
              </Link>
            </>
          ) : (
            <Link
              href="/api/auth/signin"
              className="px-8 py-4 rounded-2xl bg-sayuri-pink text-white font-bold shadow-lg hover:bg-sayuri-dark transition animate-float"
            >
              Se connecter avec Discord
            </Link>
          )}
        </div>
        <a
          href="https://discord.gg/sayuri"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500/90 text-white font-medium hover:bg-indigo-600 transition"
        >
          Rejoindre le serveur Discord
        </a>
      </main>
    </div>
  );
}

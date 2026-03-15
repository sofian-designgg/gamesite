import Link from 'next/link';
import { Header } from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchRanking } from '@/lib/api';

export const revalidate = 3600;

export default async function ClassementPage() {
  const session = await getServerSession(authOptions);
  let ranking: { position: number; discordId: string; username: string; sayucoins: number }[] = [];
  try {
    ranking = await fetchRanking(50);
  } catch {
    ranking = [];
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold text-sayuri-dark mb-2">Classement</h1>
        <p className="text-pink-800/80 mb-6">
          Mis à jour toutes les heures. Joue aux jeux pour grimper !
        </p>
        <div className="rounded-2xl bg-white/90 shadow-xl overflow-hidden border border-pink-100">
          <ul className="divide-y divide-pink-100">
            {ranking.length === 0 ? (
              <li className="px-6 py-8 text-center text-gray-500">Aucun joueur pour le moment.</li>
            ) : (
              ranking.map((u) => (
                <li
                  key={u.discordId}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-pink-50/50 transition"
                >
                  <span
                    className={`text-xl font-bold w-10 ${
                      u.position === 1
                        ? 'text-amber-500'
                        : u.position === 2
                          ? 'text-gray-400'
                          : u.position === 3
                            ? 'text-amber-700'
                            : 'text-sayuri-dark'
                    }`}
                  >
                    #{u.position}
                  </span>
                  <span className="flex-1 font-medium text-gray-800 truncate">
                    {u.username || u.discordId}
                  </span>
                  <span className="font-bold text-sayuri-dark tabular-nums">{u.sayucoins} 🪙</span>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="mt-6 flex gap-4">
          <Link href="/" className="text-sayuri-pink hover:underline font-medium">
            ← Accueil
          </Link>
          {session && (
            <Link href="/jeux" className="text-sayuri-pink hover:underline font-medium">
              Jouer pour monter
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

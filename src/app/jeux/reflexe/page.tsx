import { Header } from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { JeuReflexe } from '@/components/JeuReflexe';

export default async function ReflexePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-sayuri-dark mb-4">Réflexe</h1>
        <p className="text-pink-800/80 mb-6">Clique quand le carré devient vert. Gain : 20 à 50 Sayucoins.</p>
        {session ? <JeuReflexe /> : <p className="text-gray-600">Connecte-toi avec Discord pour jouer.</p>}
      </main>
    </div>
  );
}

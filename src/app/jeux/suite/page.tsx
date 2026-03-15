import { Header } from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { JeuSuite } from '@/components/JeuSuite';

export default async function SuitePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-sayuri-dark mb-4">Suite</h1>
        <p className="text-pink-800/80 mb-6">Mémorise et reproduis la séquence. Gain : 60 à 120 Sayucoins.</p>
        {session ? <JeuSuite /> : <p className="text-gray-600">Connecte-toi avec Discord pour jouer.</p>}
      </main>
    </div>
  );
}

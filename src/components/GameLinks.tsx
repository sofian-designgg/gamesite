'use client';

import Link from 'next/link';

export function GameLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Link
        href="/jeux/memoire"
        className="rounded-2xl bg-white/90 p-6 border-2 border-pink-200 shadow-lg hover:border-sayuri-pink hover:shadow-xl transition text-center"
      >
        <span className="text-3xl mb-2 block">🧠</span>
        <h2 className="font-bold text-sayuri-dark text-lg">Mémoire</h2>
        <p className="text-sm text-gray-600">Facile — 5 à 15 Sayucoins</p>
      </Link>
      <Link
        href="/jeux/reflexe"
        className="rounded-2xl bg-white/90 p-6 border-2 border-pink-200 shadow-lg hover:border-sayuri-pink hover:shadow-xl transition text-center"
      >
        <span className="text-3xl mb-2 block">⚡</span>
        <h2 className="font-bold text-sayuri-dark text-lg">Réflexe</h2>
        <p className="text-sm text-gray-600">Moyen — 20 à 50 Sayucoins</p>
      </Link>
      <Link
        href="/jeux/suite"
        className="rounded-2xl bg-white/90 p-6 border-2 border-pink-200 shadow-lg hover:border-sayuri-pink hover:shadow-xl transition text-center"
      >
        <span className="text-3xl mb-2 block">🔢</span>
        <h2 className="font-bold text-sayuri-dark text-lg">Suite</h2>
        <p className="text-sm text-gray-600">Difficile — 60 à 120 Sayucoins</p>
      </Link>
    </div>
  );
}

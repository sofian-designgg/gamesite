'use client';

import Link from 'next/link';
import { SignOutBtn } from './SignOutBtn';
import type { Session } from 'next-auth';

export function ClientHeader({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-50 border-b border-pink-200/50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-sayuri-dark">
          Sayuri Games
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/classement" className="text-sayuri-dark hover:text-sayuri-pink font-medium">
            Classement
          </Link>
          {session ? (
            <>
              <Link href="/jeux" className="text-sayuri-dark hover:text-sayuri-pink font-medium">
                Jeux
              </Link>
              <Link href="/roulette" className="text-sayuri-dark hover:text-sayuri-pink font-medium">
                Roulette
              </Link>
              <span className="text-sm text-gray-600">{session.user?.name}</span>
              <SignOutBtn />
            </>
          ) : (
            <Link
              href="/api/auth/signin"
              className="rounded-lg bg-sayuri-pink px-4 py-2 text-white font-medium hover:bg-sayuri-dark"
            >
              Connexion Discord
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

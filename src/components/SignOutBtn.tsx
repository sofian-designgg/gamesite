'use client';

import { signOut } from 'next-auth/react';

export function SignOutBtn() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="rounded-lg border border-pink-300 px-3 py-1.5 text-sm text-sayuri-dark hover:bg-pink-50"
    >
      Déconnexion
    </button>
  );
}

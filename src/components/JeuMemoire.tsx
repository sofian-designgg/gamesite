'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

const EMOJIS = ['🌸', '🎀', '🎮', '⭐', '💖', '🎵', '🌸', '🎀', '🎮', '⭐', '💖', '🎵'];
const SHUFFLE = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

export function JeuMemoire() {
  const [cards, setCards] = useState<string[]>(() => SHUFFLE(EMOJIS));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [won, setWon] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(
    (i: number) => {
      if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
      const next = [...flipped, i];
      setFlipped(next);
      if (next.length === 2) {
        if (cards[next[0]] === cards[next[1]]) {
          setMatched((m) => [...m, next[0], next[1]]);
          setFlipped([]);
        } else {
          setTimeout(() => setFlipped([]), 600);
        }
      }
    },
    [cards, flipped, matched]
  );

  useEffect(() => {
    if (matched.length === EMOJIS.length && !won && !loading) {
      setLoading(true);
      const amount = 5 + Math.floor(Math.random() * 11);
      fetch('/api/earn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, difficulty: 'easy' }),
      })
        .then((r) => r.json())
        .then(() => setWon(amount))
        .catch(() => setWon(0))
        .finally(() => setLoading(false));
    }
  }, [matched.length, won, loading]);

  const reset = () => {
    setCards(SHUFFLE(EMOJIS));
    setFlipped([]);
    setMatched([]);
    setWon(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-4 gap-2">
        {cards.map((emoji, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            disabled={won !== null}
            className="w-16 h-16 rounded-xl bg-white/90 border-2 border-pink-200 flex items-center justify-center text-2xl shadow hover:border-sayuri-pink transition disabled:opacity-80"
          >
            {flipped.includes(i) || matched.includes(i) ? emoji : '?'}
          </button>
        ))}
      </div>
      {won !== null && (
        <div className="text-center">
          <p className="text-xl font-bold text-green-700">+{won} Sayucoins !</p>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 rounded-lg bg-sayuri-pink text-white font-medium"
            >
              Rejouer
            </button>
            <Link href="/jeux" className="px-4 py-2 rounded-lg border border-pink-300 font-medium">
              Autres jeux
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

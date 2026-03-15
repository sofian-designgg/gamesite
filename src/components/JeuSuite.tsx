'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

const COLS = ['🔴', '🟢', '🔵', '🟡'];

export function JeuSuite() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [player, setPlayer] = useState<number[]>([]);
  const [phase, setPhase] = useState<'watch' | 'play' | 'wrong' | 'won'>('watch');
  const [index, setIndex] = useState(0);
  const [won, setWon] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const addStep = useCallback(() => {
    const next = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(next);
    setIndex(0);
    setPlayer([]);
    setPhase('watch');
  }, [sequence]);

  useEffect(() => {
    if (sequence.length === 0) {
      addStep();
      return;
    }
    if (phase !== 'watch') return;
    const t = setTimeout(() => {
      if (index < sequence.length) {
        setIndex(index + 1);
      } else {
        setPhase('play');
        setIndex(0);
      }
    }, 600);
    return () => clearTimeout(t);
  }, [sequence, phase, index, addStep]);

  const press = useCallback(
    (i: number) => {
      if (phase !== 'play') return;
      const next = [...player, i];
      setPlayer(next);
      if (next[next.length - 1] !== sequence[next.length - 1]) {
        setPhase('wrong');
        return;
      }
      if (next.length === sequence.length) {
        setPhase('won');
        setLoading(true);
        const amount = 60 + Math.floor(Math.random() * 61);
        fetch('/api/earn', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, difficulty: 'hard' }),
        })
          .then((r) => r.json())
          .then(() => setWon(amount))
          .catch(() => setWon(0))
          .finally(() => setLoading(false));
      }
    },
    [phase, player, sequence]
  );

  const replay = () => {
    setSequence([]);
    setPlayer([]);
    setPhase('watch');
    setIndex(0);
    setWon(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm text-gray-600">
        Niveau {sequence.length}. Regarde la séquence puis reproduis-la.
      </p>
      {phase === 'watch' && (
        <div className="flex gap-2 text-4xl min-h-[4rem] items-center justify-center">
          {index > 0 && <span>{COLS[sequence[index - 1]]}</span>}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {COLS.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => press(i)}
            disabled={phase !== 'play'}
            className="w-24 h-24 rounded-2xl text-4xl shadow-lg disabled:opacity-70 hover:scale-105 transition"
          >
            {c}
          </button>
        ))}
      </div>
      {phase === 'wrong' && (
        <p className="text-red-600 font-bold">Mauvaise séquence !</p>
      )}
      {won !== null && (
        <div className="text-center">
          <p className="text-xl font-bold text-green-700">+{won} Sayucoins !</p>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={replay}
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

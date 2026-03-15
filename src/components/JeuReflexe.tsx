'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';

export function JeuReflexe() {
  const [state, setState] = useState<'idle' | 'wait' | 'go' | 'early' | 'won'>('idle');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const startRef = useRef<number>(0);

  const start = useCallback(() => {
    setState('wait');
    setResult(null);
    const delay = 1500 + Math.random() * 2500;
    timerRef.current = setTimeout(() => {
      setState('go');
      startRef.current = Date.now();
    }, delay);
  }, []);

  const click = useCallback(() => {
    if (state === 'wait') {
      clearTimeout(timerRef.current);
      setState('early');
      return;
    }
    if (state === 'go') {
      const ms = Date.now() - startRef.current;
      setState('won');
      setLoading(true);
      const amount = ms < 300 ? 50 : ms < 500 ? 35 : ms < 700 ? 25 : 20;
      fetch('/api/earn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, difficulty: 'medium' }),
      })
        .then((r) => r.json())
        .then(() => setResult(amount))
        .catch(() => setResult(0))
        .finally(() => setLoading(false));
    }
  }, [state]);

  const bg =
    state === 'go'
      ? 'bg-green-500'
      : state === 'early'
        ? 'bg-red-500'
        : state === 'won'
          ? 'bg-green-400'
          : 'bg-sayuri-pink';

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm text-gray-600">Clique sur &quot;Démarrer&quot;, puis sur le carré dès qu&apos;il devient vert.</p>
      <button
        type="button"
        onClick={start}
        disabled={state === 'wait' || state === 'go'}
        className="px-6 py-2 rounded-lg bg-sayuri-dark text-white font-medium disabled:opacity-50"
      >
        Démarrer
      </button>
      <button
        type="button"
        onClick={click}
        disabled={state === 'idle'}
        className={`w-48 h-48 rounded-2xl ${bg} transition-colors duration-150 disabled:opacity-50 cursor-pointer flex items-center justify-center text-lg font-bold`}
      >
        {state === 'idle' && '—'}
        {state === 'wait' && 'Attends...'}
        {state === 'go' && 'CLIQUE !'}
        {state === 'early' && 'Trop tôt !'}
        {state === 'won' && (result !== null ? `+${result} 🪙` : '...')}
      </button>
      {(state === 'early' || (result !== null && state === 'won')) && (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => { setState('idle'); setResult(null); }}
            className="px-4 py-2 rounded-lg bg-sayuri-pink text-white font-medium"
          >
            Rejouer
          </button>
          <Link href="/jeux" className="px-4 py-2 rounded-lg border border-pink-300 font-medium">
            Autres jeux
          </Link>
        </div>
      )}
    </div>
  );
}

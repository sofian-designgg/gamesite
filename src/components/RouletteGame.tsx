'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const ROLES_ORDER = [
  '1479163259297861845',
  '1478138748616052756',
  '1478480011303452735',
  '1470854476859441242',
  '1477763567167082506',
  '1477766282299572254',
];

const SEGMENT_COLORS = ['#ff6b9d', '#c44569', '#ffb7c5', '#ff8fab', '#e8a0b0', '#ffc0cb'];

export function RouletteGame() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!session?.user) return;
    try {
      const res = await fetch('/api/user');
      if (res.ok) {
        const data = await res.json();
        setBalance(data.sayucoins);
      }
    } catch {
      setBalance(null);
    }
  }, [session?.user]);

  const spin = useCallback(async () => {
    if (!session?.user || spinning || (balance !== null && balance < 1000)) return;
    setSpinning(true);
    setResult(null);
    setError(null);
    const currentRotation = rotation;
    const extraSpins = 5 + Math.random() * 3;
    const baseRotation = currentRotation + extraSpins * 360;

    try {
      const res = await fetch('/api/roulette', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur');
        setSpinning(false);
        return;
      }

      const roleIndex = ROLES_ORDER.indexOf(data.wonRoleId);
      const segmentAngle = 60;
      const targetSegment = roleIndex >= 0 ? roleIndex : 0;
      const finalAngle = baseRotation + 360 * 5 - targetSegment * segmentAngle - segmentAngle / 2;
      setRotation(finalAngle);
      setResult({ name: data.wonRoleName });
      setBalance(data.sayucoins);
    } catch (e) {
      setError('Erreur réseau');
      setSpinning(false);
      return;
    }

    setTimeout(() => {
      setSpinning(false);
    }, 6000);
  }, [session?.user, spinning, balance, rotation]);

  useEffect(() => {
    if (session?.user) fetchBalance();
  }, [session?.user, fetchBalance]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl font-bold text-sayuri-dark">
        Ton solde : {balance === null ? '...' : `${balance} Sayucoins`}
      </div>
      <div className="relative">
        <div
          className="absolute left-1/2 -top-2 -translate-x-1/2 z-10 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-500 drop-shadow"
          style={{ transform: 'translateX(-50%) rotate(0deg)' }}
        />
        <div
          className="w-[320px] h-[320px] rounded-full border-8 border-sayuri-dark shadow-2xl transition-transform duration-[6000ms] ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${SEGMENT_COLORS.map((c, i) => `${c} ${i * 60}deg ${(i + 1) * 60}deg`).join(', ')})`,
          }}
        />
      </div>
      <button
        type="button"
        onClick={spin}
        disabled={spinning || (balance !== null && balance < 1000)}
        className="px-8 py-4 rounded-2xl bg-sayuri-pink text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sayuri-dark transition"
      >
        {spinning ? 'Rotation...' : balance !== null && balance < 1000 ? 'Pas assez de Sayucoins (1000)' : 'Tourner (1000 🪙)'}
      </button>
      {result && <p className="text-xl font-bold text-green-700 animate-pulse-soft">Tu as gagné : {result.name} !</p>}
      {error && <p className="text-red-600 font-medium">{error}</p>}
    </div>
  );
}

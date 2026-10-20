import { useMemo } from 'react';

/** Floating glow particles around the hero logo: position (%), size (px), animation delay (s). */
export const heroParticles = [
  { x: 12, y: 70, s: 3, d: 0 },
  { x: 24, y: 30, s: 4, d: 1.2 },
  { x: 38, y: 82, s: 3, d: 2.1 },
  { x: 47, y: 12, s: 5, d: 0.6 },
  { x: 58, y: 60, s: 3, d: 3.2 },
  { x: 66, y: 22, s: 4, d: 1.8 },
  { x: 74, y: 78, s: 3, d: 2.7 },
  { x: 82, y: 40, s: 5, d: 0.3 },
  { x: 90, y: 14, s: 3, d: 3.8 },
  { x: 93, y: 66, s: 4, d: 1.5 },
  { x: 31, y: 56, s: 3, d: 4.2 },
  { x: 70, y: 48, s: 3, d: 2.4 },
];

/** Decorative candlesticks + trend line behind the hero logo (deterministic pseudo-random). */
export function useHeroCandles(count = 30) {
  return useMemo(() => {
    const candles = [];
    const points = [];
    let seed = 7;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count; i += 1) {
      const center = 360 - (i / (count - 1)) * 250 + Math.sin(i * 0.9) * 22;
      const open = center + (random() - 0.5) * 26;
      const close = center + (random() - 0.5) * 26 - 6;
      const high = Math.min(open, close) - random() * 18 - 4;
      const low = Math.max(open, close) + random() * 18 + 4;

      candles.push({ i, x: 20 + i * 19, open, close, high, low, up: close < open });
      points.push(`${20 + i * 19},${(open + close) / 2}`);
    }

    return { candles, path: `M${points.join(' L')}` };
  }, [count]);
}

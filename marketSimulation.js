/**
 * Deterministic, simulated OHLC data for the performance chart.
 * This is illustrative data only — it is NOT real market data.
 */

export const DEFAULT_SAMPLE_COUNT = 400;

/** Small seeded PRNG (mulberry32) so every page load draws the same series. */
function createRandom(seed) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 1831565813) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * @param {{start:number, volatility:number, drift:number, decimals:number, seed:number}} market
 * @param {number} count number of daily candles to generate (ending today)
 * @returns {{candles: Array, volumes: Array}}
 */
export function generateMarketData(market, count = DEFAULT_SAMPLE_COUNT) {
  const random = createRandom(market.seed);
  const candles = [];
  const volumes = [];
  let previousClose = market.start;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  for (let index = 0; index < count; index += 1) {
    const day = new Date(today);
    day.setUTCDate(today.getUTCDate() - (count - 1 - index));
    const time = Math.floor(day.getTime() / 1000);

    const wave = Math.sin(index / 38) * market.volatility * 0.35;
    const change = market.drift + wave + (random() - 0.48) * market.volatility;

    const open = previousClose;
    const close = Math.max(open * (1 + change), market.start * 0.2);
    const wick = market.volatility * 0.55;
    const high = Math.max(open, close) * (1 + random() * wick);
    const low = Math.min(open, close) * (1 - random() * wick);
    const round = (value) => Number(value.toFixed(market.decimals));

    candles.push({ time, open: round(open), high: round(high), low: round(low), close: round(close) });

    const body = Math.abs(close - open) / open;
    volumes.push({
      time,
      value: Math.round((0.4 + random() * 0.6 + body / market.volatility) * 1000),
      color: close >= open ? 'rgba(157, 37, 255, 0.45)' : 'rgba(123, 22, 255, 0.22)',
    });

    previousClose = close;
  }

  return { candles, volumes };
}

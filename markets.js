/**
 * Simulated markets for the performance chart.
 * `seed` makes the generated price series deterministic (see lib/marketSimulation.js).
 */
export const markets = [
  { id: 'BTCUSDT', label: 'BTC/USDT', start: 40000, volatility: 0.022, drift: 0.0004, decimals: 2, seed: 11 },
  { id: 'EURUSD', label: 'EUR/USD', start: 1.07, volatility: 0.0035, drift: -0.0001, decimals: 4, seed: 23 },
  { id: 'XAUUSD', label: 'XAU/USD', start: 2050, volatility: 0.007, drift: 0.0001, decimals: 2, seed: 37 },
  { id: 'AUDUSD', label: 'AUD/USD', start: 0.655, volatility: 0.0045, drift: -0.00015, decimals: 4, seed: 53 },
];

/** Time-range buttons. `days: null` = show the full sample. */
export const timeRanges = [
  { id: '1D', label: '1D', days: 30, note: 'Last 30 sessions' },
  { id: '1W', label: '1W', days: 60, note: 'Last 60 sessions' },
  { id: '1M', label: '1M', days: 90, note: 'Last 90 sessions' },
  { id: '3M', label: '3M', days: 130, note: 'Last 130 sessions' },
  { id: '6M', label: '6M', days: 200, note: 'Last 200 sessions' },
  { id: '1Y', label: '1Y', days: 300, note: 'Last 300 sessions' },
  { id: 'ALL', label: 'ALL', days: null, note: 'Full sample history' },
];

export const DEFAULT_MARKET_ID = markets[0].id;
export const DEFAULT_RANGE_ID = '1Y';

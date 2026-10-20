/** Trading strategy cards (accordion in the Strategy section). */
export const strategies = [
  {
    id: 'price-action',
    number: '01',
    icon: 'BarChart3',
    title: 'Price Action',
    description: 'Follow the trend, key levels, and market structure.',
    details: [
      'Read higher-timeframe structure first, then refine entries on lower timeframes.',
      'Mark key support and resistance zones before the session starts.',
      'Wait for confirmation (rejection, break & retest) instead of anticipating moves.',
    ],
  },
  {
    id: 'risk-management',
    number: '02',
    icon: 'ShieldCheck',
    title: 'Risk Management',
    description: 'Protect capital, control emotion, and trade with a plan.',
    details: [
      'Define risk per trade as a fixed small percentage of the account.',
      'Place the stop-loss where the trade idea is invalidated, then size the position.',
      'Keep a daily loss limit and step away when it is reached.',
    ],
  },
  {
    id: 'macro-news',
    number: '03',
    icon: 'Globe',
    title: 'Macro & News',
    description: 'Use fundamental data and market sentiment for confirmation.',
    details: [
      'Track the economic calendar and avoid entering right before high-impact events.',
      'Use macro context as confirmation, not as the sole reason to trade.',
      'Watch sentiment and positioning for signs of crowded trades.',
    ],
  },
];

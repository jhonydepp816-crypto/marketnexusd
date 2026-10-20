/**
 * Journal articles. `preview` selects the thumbnail illustration:
 * 'btc' | 'forex' | 'mountain' (see components/sections/Journal/ArticleThumb.jsx).
 * Replace the sample `body` paragraphs with real content.
 */
export const articles = [
  {
    id: 'btc-weekly-outlook',
    category: 'BTC',
    type: 'Analysis',
    date: 'Oct 12, 2026',
    title: 'BTC Weekly Outlook',
    description: 'Key levels, structure, and potential scenarios for the coming week.',
    preview: 'btc',
    body: [
      'This is a sample article to show how a weekly outlook can be structured. Replace it with your own analysis.',
      'Structure: start with the higher-timeframe trend, list the key support and resistance zones you are watching, then describe the scenarios you would act on and — just as important — the ones that invalidate your idea.',
      'Scenario A (continuation): price holds above the marked support and breaks the prior high with strong participation. Scenario B (pullback): price rejects resistance and retests lower support before any new entry is considered.',
      'Reminder: scenarios are conditional plans, not predictions. Nothing here is financial advice.',
    ],
  },
  {
    id: 'eurusd-breakdown',
    category: 'FOREX',
    type: 'Analysis',
    date: 'Oct 9, 2026',
    title: 'EUR/USD Breakdown',
    description: 'Trend continuation, key levels to watch, and possible scenarios.',
    preview: 'forex',
    body: [
      'Sample forex write-up. Use this space to document how you break down a currency pair.',
      'Suggested outline: trend direction on the daily chart, the levels that matter, the macro calendar for the week, and the trigger you need to see before taking a trade.',
      'Keep the plan falsifiable: write down exactly what would make you stand aside or exit.',
      'This text is placeholder content and does not describe the current EUR/USD market.',
    ],
  },
  {
    id: 'risk-management-lessons',
    category: 'TRADING',
    type: 'Journal',
    date: 'Oct 5, 2026',
    title: 'Risk Management Lessons',
    description: 'What I learned from past mistakes and how I approach risk.',
    preview: 'mountain',
    body: [
      'Sample journal entry. Share the lessons that shaped your process — in your own words.',
      'Ideas to cover: a trade that went wrong and what the rules should have prevented, how position sizing changed your results, and the routines that help you stay patient.',
      'Good journaling is honest and specific: what happened, what you felt, what you will change.',
      'This is placeholder text, not a record of real trades.',
    ],
  },
];

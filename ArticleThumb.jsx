/** Inline SVG thumbnails for article previews. `kind`: 'btc' | 'forex' | anything else = mountain. */

// [x, lineBottom, lineTop, bodyY] for each candle in the forex thumbnail.
const FOREX_BARS = [
  [20, 70, 40, 52],
  [38, 60, 30, 44],
  [56, 74, 46, 58],
  [74, 48, 24, 36],
  [92, 56, 34, 46],
  [110, 38, 18, 28],
  [128, 62, 40, 50],
  [146, 44, 22, 34],
  [164, 52, 28, 40],
  [182, 30, 12, 22],
];

export default function ArticleThumb({ kind }) {
  if (kind === 'btc') {
    return (
      <svg viewBox="0 0 200 118" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="th-btc-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#9d25ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9d25ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="118" fill="url(#th-btc-glow)" />
        <path
          d="M0 96 L24 88 L44 92 L66 74 L86 80 L110 58 L132 64 L156 40 L178 46 L200 24"
          fill="none"
          stroke="#c04dff"
          strokeWidth="1.6"
          opacity="0.7"
        />
        <circle cx="100" cy="59" r="30" fill="#14081f" stroke="#c04dff" strokeWidth="2" />
        <circle cx="100" cy="59" r="23" fill="none" stroke="#7b16ff" strokeWidth="1" opacity="0.7" />
        <text
          x="100"
          y="71"
          textAnchor="middle"
          fontSize="34"
          fontWeight="700"
          fill="#e9d2ff"
          fontFamily="Montserrat, sans-serif"
        >
          {'\u20BF'}
        </text>
      </svg>
    );
  }

  if (kind === 'forex') {
    return (
      <svg viewBox="0 0 200 118" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[30, 60, 90].map((y) => (
          <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgba(157,37,255,0.15)" />
        ))}
        {FOREX_BARS.map(([x, lineBottom, lineTop, bodyY], index) => (
          <g key={x}>
            <line x1={x} x2={x} y1={lineTop + 6} y2={lineBottom + 22} stroke="#9d25ff" opacity="0.8" />
            <rect
              x={x - 5}
              y={bodyY + 10}
              width="10"
              height={16 + (index % 3) * 6}
              rx="1.5"
              fill={index % 3 === 1 ? 'rgba(123,22,255,0.3)' : '#9d25ff'}
              stroke="#c04dff"
            />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 118" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="th-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a0e4d" />
          <stop offset="100%" stopColor="#0a0612" />
        </linearGradient>
      </defs>
      <rect width="200" height="118" fill="url(#th-sky)" />
      <circle cx="140" cy="34" r="12" fill="#c04dff" opacity="0.75" />
      <path d="M0 118 L0 84 L40 52 L70 78 L110 36 L160 82 L200 62 L200 118 Z" fill="#3a1470" />
      <path d="M0 118 L0 98 L50 74 L90 96 L130 70 L200 100 L200 118 Z" fill="#1c0a38" />
    </svg>
  );
}

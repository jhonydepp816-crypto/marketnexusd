import heroLogo from '@/assets/images/hero-logo.webp';
import Icon from '@/components/ui/Icon';
import { scrollToSection } from '@/lib/scroll';
import { heroParticles, useHeroCandles } from './heroDecor';

export default function Hero() {
  const { candles, path } = useHeroCandles();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Trader Portfolio</p>
          <h1 id="hero-title" className="hero-title">
            <span className="metal-text">Discipline Builds</span>
            <span className="accent">Real Freedom.</span>
          </h1>
          <p className="hero-desc">
            I'm a trader focused on crypto, forex, and market analysis. This portfolio showcases my trading journey,
            strategy, and performance over time.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => scrollToSection('performance')}>
              View Performance <Icon name="ArrowRight" size={18} />
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToSection('about')}>
              About Me
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <svg className="hero-candles" viewBox="0 0 620 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="candle-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c04dff" />
                <stop offset="100%" stopColor="#7b16ff" />
              </linearGradient>
            </defs>
            {candles.map((candle) => {
              const bodyTop = Math.min(candle.open, candle.close);
              const bodyHeight = Math.max(Math.abs(candle.open - candle.close), 4);
              return (
                <g className="candle" style={{ '--i': candle.i }} key={candle.i}>
                  <line
                    x1={candle.x}
                    x2={candle.x}
                    y1={candle.high}
                    y2={candle.low}
                    stroke="#9d25ff"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  <rect
                    x={candle.x - 5}
                    y={bodyTop}
                    width="10"
                    height={bodyHeight}
                    rx="1.5"
                    fill={candle.up ? 'url(#candle-fill)' : 'rgba(123,22,255,0.25)'}
                    stroke="#9d25ff"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
            <path className="trend" d={path} fill="none" stroke="#c04dff" strokeWidth="1.5" opacity="0.6" />
          </svg>

          {heroParticles.map((particle, index) => (
            <span
              className="particle"
              aria-hidden="true"
              key={index}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                '--s': `${particle.s}px`,
                '--d': `${particle.d}s`,
              }}
            />
          ))}

          <img
            className="hero-logo"
            src={heroLogo}
            alt={'Market\u039BNexus logo \u2014 Precision \u00B7 Discipline \u00B7 Profit'}
            width="900"
            height="900"
          />

          <ul className="hero-steps" aria-label="Process: analyze, plan, execute, improve">
            <li>ANALYZE</li>
            <li>PLAN</li>
            <li>EXECUTE</li>
            <li>IMPROVE</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

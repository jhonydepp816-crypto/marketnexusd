import { useMemo, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { keyPerformance } from '@/data/stats';
import { DEFAULT_MARKET_ID, DEFAULT_RANGE_ID, markets, timeRanges } from '@/data/markets';
import { useReveal } from '@/hooks/useReveal';
import { generateMarketData } from '@/lib/marketSimulation';
import CandleChart from './CandleChart';

export default function Performance() {
  const revealRef = useReveal();
  const [marketId, setMarketId] = useState(DEFAULT_MARKET_ID);
  const [rangeId, setRangeId] = useState(DEFAULT_RANGE_ID);

  const market = markets.find((item) => item.id === marketId);
  const range = timeRanges.find((item) => item.id === rangeId);

  // Generate every market's series once; slice per selected range.
  const allData = useMemo(() => Object.fromEntries(markets.map((item) => [item.id, generateMarketData(item)])), []);

  const { candles, volumes } = useMemo(() => {
    const data = allData[marketId];
    return range.days
      ? { candles: data.candles.slice(-range.days), volumes: data.volumes.slice(-range.days) }
      : data;
  }, [allData, marketId, range]);

  const last = candles[candles.length - 1];
  const previous = candles[candles.length - 2];
  const changePct = previous ? ((last.close - previous.close) / previous.close) * 100 : 0;
  const formatPrice = (value) =>
    value.toLocaleString('en-US', { minimumFractionDigits: market.decimals, maximumFractionDigits: market.decimals });

  return (
    <section
      id="performance"
      className="performance area-perf reveal"
      ref={revealRef}
      aria-labelledby="performance-title"
    >
      <p className="eyebrow">Performance</p>
      <h2 id="performance-title" className="section-title metal-text">
        Track My Journey.
      </h2>

      <div className="perf-layout">
        <div className="card chart-card">
          <div className="chart-tabs" role="tablist" aria-label="Market">
            {markets.map((item) => (
              <button
                type="button"
                role="tab"
                key={item.id}
                id={`tab-${item.id}`}
                aria-selected={item.id === marketId}
                aria-controls="chart-panel"
                className="chart-tab"
                onClick={() => setMarketId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="chart-head">
            <div>
              <div className="chart-symbol">{market.label} {'\u00B7'} daily</div>
              <div className="chart-price">
                {formatPrice(last.close)}
                <span className={`chart-change ${changePct >= 0 ? 'up' : 'down'}`}>
                  {changePct >= 0 ? '\u25B2' : '\u25BC'} {Math.abs(changePct).toFixed(2)}% vs prev. session
                </span>
              </div>
            </div>
            <span className="chart-badge">Simulated data</span>
          </div>

          <div id="chart-panel" role="tabpanel" aria-labelledby={`tab-${marketId}`} className="chart-wrap">
            <div style={{ position: 'absolute', inset: 0 }} className="chart-canvas-anim" key={`${marketId}-${rangeId}`}>
              <CandleChart candles={candles} volumes={volumes} decimals={market.decimals} />
            </div>
          </div>

          <div className="chart-ranges" role="group" aria-label="Time range">
            {timeRanges.map((item) => (
              <button
                type="button"
                key={item.id}
                className="range-btn"
                aria-pressed={item.id === rangeId}
                onClick={() => setRangeId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="disclaimer chart-note">
            {range.note}. Simulated chart data for illustration {'\u2014'} not live prices and not verified trading
            results.
          </p>
        </div>

        <div className="perf-side">
          <div className="card summary-card">
            <h3 className="summary-title">Key Performance</h3>
            <dl className="summary-list">
              {keyPerformance.map((row) => (
                <div className="summary-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd className={`tone-${row.tone}`}>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="disclaimer" style={{ marginTop: 8 }}>
              Sample figures
            </p>
          </div>

          <div className="card quote-card">
            <span className="quote-icon">
              <Icon name="TrendingUp" size={22} />
            </span>
            <span>Consistent process, not luck.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

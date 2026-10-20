import { useEffect, useRef } from 'react';
import { ColorType, CrosshairMode, createChart } from '@/lib/candleChart';

const formatDate = (unixSeconds) => new Date(unixSeconds * 1000).toISOString().slice(0, 10);

/** Candlestick chart. Chart instance is created once; data updates in a second effect. */
export default function CandleChart({ candles, volumes, decimals }) {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);

  // Create the chart once.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const chart = createChart(container, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#AAA2BA',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 11,
      },
      grid: { vertLines: { visible: false }, horzLines: { color: 'rgba(157, 37, 255, 0.10)' } },
      rightPriceScale: { borderVisible: false, scaleMargins: { top: 0.08, bottom: 0.26 } },
      timeScale: { borderVisible: false, timeVisible: false, rightOffset: 3, fixLeftEdge: true },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: 'rgba(192, 77, 255, 0.5)', labelBackgroundColor: '#7B16FF' },
        horzLine: { color: 'rgba(192, 77, 255, 0.5)', labelBackgroundColor: '#7B16FF' },
      },
      handleScale: { mouseWheel: false },
      handleScroll: { mouseWheel: false },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#9D25FF',
      borderUpColor: '#C04DFF',
      wickUpColor: '#C04DFF',
      downColor: 'rgba(123, 22, 255, 0.28)',
      borderDownColor: '#7B16FF',
      wickDownColor: '#7B16FF',
    });

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
      lastValueVisible: false,
      priceLineVisible: false,
    });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });

    // Floating OHLC tooltip that follows the crosshair.
    chart.subscribeCrosshairMove((param) => {
      const tooltip = tooltipRef.current;
      const host = containerRef.current;
      if (!tooltip || !host) return;

      const bar = param.seriesData ? param.seriesData.get(candleSeries) : undefined;
      if (!param.point || !param.time || !bar || param.point.x < 0 || param.point.y < 0) {
        tooltip.style.display = 'none';
        return;
      }

      const digits = Number(tooltip.dataset.decimals || 2);
      const fmt = (value) =>
        value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

      tooltip.innerHTML =
        `<div class="tt-date">${formatDate(param.time)}</div>` +
        `<dl><dt>Open</dt><dd>${fmt(bar.open)}</dd><dt>High</dt><dd>${fmt(bar.high)}</dd>` +
        `<dt>Low</dt><dd>${fmt(bar.low)}</dd><dt>Close</dt><dd>${fmt(bar.close)}</dd></dl>` +
        '<div class="tt-date" style="margin:4px 0 0;color:#D6B36A;font-weight:500">Simulated</div>';
      tooltip.style.display = 'block';

      const gap = 14;
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      let left = param.point.x + gap;
      if (left + tooltipWidth > host.clientWidth) left = param.point.x - tooltipWidth - gap;
      const top = Math.min(Math.max(param.point.y - tooltipHeight / 2, 4), host.clientHeight - tooltipHeight - 4);
      tooltip.style.left = `${Math.max(left, 4)}px`;
      tooltip.style.top = `${top}px`;
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, []);

  // Push new data / price precision into the chart.
  useEffect(() => {
    const chart = chartRef.current;
    const candleSeries = candleSeriesRef.current;
    const volumeSeries = volumeSeriesRef.current;
    if (!chart || !candleSeries || !volumeSeries) return;

    const minMove = Number((1 / 10 ** decimals).toFixed(decimals));
    candleSeries.applyOptions({ priceFormat: { type: 'price', precision: decimals, minMove } });
    candleSeries.setData(candles);
    volumeSeries.setData(volumes);
    chart.timeScale().fitContent();

    if (tooltipRef.current) {
      tooltipRef.current.dataset.decimals = String(decimals);
      tooltipRef.current.style.display = 'none';
    }
  }, [candles, volumes, decimals]);

  return (
    <>
      <div ref={containerRef} className="chart-canvas" role="img" aria-label="Simulated candlestick price chart" />
      <div ref={tooltipRef} className="chart-tooltip" aria-hidden="true" />
    </>
  );
}

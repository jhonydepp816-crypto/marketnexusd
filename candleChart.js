/**
 * Minimal canvas candlestick renderer.
 *
 * It exposes only the small slice of the lightweight-charts (v4) API that
 * <CandleChart /> uses, so the real library can be dropped in later by changing
 * a single import. Volume bars, crosshair and tooltip are no-ops here — exactly
 * as in the original preview build.
 */

export const ColorType = { Solid: 'solid' };
export const CrosshairMode = { Normal: 0 };

export function createChart(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  container.appendChild(canvas);

  let candles = [];

  const draw = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!candles.length) return;

    const min = Math.min(...candles.map((c) => c.low));
    const max = Math.max(...candles.map((c) => c.high));
    const step = width / candles.length;

    candles.forEach((candle, index) => {
      const y = (price) => 10 + ((max - price) / (max - min)) * (height * 0.7);
      ctx.strokeStyle = '#9d25ff';
      ctx.fillStyle = candle.close >= candle.open ? '#9d25ff' : '#3a1470';
      ctx.beginPath();
      ctx.moveTo(index * step + step / 2, y(candle.high));
      ctx.lineTo(index * step + step / 2, y(candle.low));
      ctx.stroke();
      ctx.fillRect(
        index * step + 1,
        y(Math.max(candle.open, candle.close)),
        Math.max(step - 2, 1),
        Math.max(Math.abs(y(candle.open) - y(candle.close)), 1),
      );
    });
  };

  return {
    addCandlestickSeries: () => ({
      setData: (data) => {
        candles = data;
        draw();
      },
      applyOptions() {},
    }),
    addHistogramSeries: () => ({ setData() {} }),
    priceScale: () => ({ applyOptions() {} }),
    timeScale: () => ({ fitContent() {} }),
    subscribeCrosshairMove() {},
    remove() {
      canvas.remove();
    },
  };
}

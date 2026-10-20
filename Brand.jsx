import brandMark from '@/assets/images/brand-mark.webp';
import { siteConfig } from '@/config';

/** Logo mark + wordmark, used in the navbar and footer. */
export default function Brand({ markWidth = 56 }) {
  return (
    <div className="brand">
      <img
        className="brand-mark"
        src={brandMark}
        alt=""
        width={markWidth}
        height={Math.round(markWidth * 0.595)}
        style={{ width: markWidth, height: 'auto' }}
      />
      <div className="brand-text">
        <span className="brand-name">
          Market<span className="lambda">{'\u039B'}</span>Nexus
        </span>
        <span className="brand-sub">Trader Portfolio</span>
      </div>
      <span className="sr-only">{siteConfig.brand} {'\u2014'} Trader Portfolio</span>
    </div>
  );
}

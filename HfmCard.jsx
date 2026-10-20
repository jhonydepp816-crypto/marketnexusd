import Icon from '@/components/ui/Icon';

/** Featured full-width card with the HFM referral / registration link. */
export default function HfmCard({ url }) {
  return (
    <article className="card contact-card contact-card--hfm" aria-labelledby="hfm-title">
      <span className="contact-card-icon contact-card-icon--hfm">
        <Icon name="ExternalLink" size={26} strokeWidth={1.5} />
      </span>
      <div className="hfm-text">
        <span className="hfm-badge">Partner Link</span>
        <h3 id="hfm-title" className="contact-card-label">
          Join HFM
        </h3>
        <p className="contact-card-desc">Register for an HFM account using my referral link.</p>
        <p className="hfm-note">
          You will be redirected to the HFM registration page (external site, opens in a new tab). Trading involves
          risk, including the loss of your capital.
        </p>
      </div>
      <a className="btn btn-primary contact-card-btn hfm-btn" href={url} target="_blank" rel="noopener noreferrer sponsored">
        Register with HFM <Icon name="ArrowRight" size={18} />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </article>
  );
}

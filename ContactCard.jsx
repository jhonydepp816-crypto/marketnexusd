import Icon from '@/components/ui/Icon';

/**
 * One contact channel (WhatsApp, Email, WhatsApp group, TikTok, ...).
 *
 * @param {object} props
 * @param {string} props.icon         Icon name (see components/ui/Icon.jsx)
 * @param {string} props.label        Card title
 * @param {string} [props.value]      Highlighted value, e.g. phone number / email / handle
 * @param {string} [props.valueClassName] Extra modifier class for the value
 * @param {string} props.description  Short helper text
 * @param {{label:string, href:string, variant?:'primary'|'ghost', external?:boolean}} props.cta
 */
export default function ContactCard({ icon, label, value, valueClassName = '', description, cta }) {
  const { label: ctaLabel, href, variant = 'primary', external = false } = cta;
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <article className="card contact-card">
      <span className="contact-card-icon">
        <Icon name={icon} size={26} strokeWidth={1.5} />
      </span>
      <h3 className="contact-card-label">{label}</h3>
      {value && <p className={`contact-card-value${valueClassName ? ` ${valueClassName}` : ''}`}>{value}</p>}
      <p className="contact-card-desc">{description}</p>
      <a className={`btn btn-${variant} contact-card-btn`} href={href} {...externalProps}>
        {ctaLabel} <Icon name="ArrowRight" size={18} />
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    </article>
  );
}

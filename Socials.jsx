import Icon from '@/components/ui/Icon';
import { siteConfig } from '@/config';

const SOCIAL_ICONS = {
  x: 'Twitter',
  instagram: 'Instagram',
  youtube: 'Youtube',
  linkedin: 'Linkedin',
  tiktok: 'TikTok',
};

/** Icon links for every social in config.js that has a URL. Renders nothing if none. */
export default function Socials() {
  const socials = siteConfig.socials.filter((social) => social.url);
  if (!socials.length) return null;

  return (
    <ul className="socials" aria-label="Social links">
      {socials.map((social) => (
        <li key={social.id}>
          <a
            className="social-link"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            <Icon name={SOCIAL_ICONS[social.id] || 'ArrowUpRight'} size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}

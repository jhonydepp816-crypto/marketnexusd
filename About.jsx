import Icon from '@/components/ui/Icon';
import { siteConfig } from '@/config';
import { useReveal } from '@/hooks/useReveal';

export default function About() {
  const revealRef = useReveal();
  const { role, experience, location } = siteConfig.profile;

  const facts = [
    { icon: 'Briefcase', text: role },
    { icon: 'CalendarDays', text: experience },
    { icon: 'MapPin', text: `Location: ${location}` },
  ];

  return (
    <section id="about" className="area-about reveal" ref={revealRef} aria-labelledby="about-title">
      <p className="eyebrow">About Me</p>
      <h2 id="about-title" className="section-title metal-text">
        Trading Is a Long Game.
      </h2>

      <div className="card about-card">
        <p className="about-desc">
          I'm a trader who believes in discipline, patience, and continuous learning. This portfolio documents my
          process, market observations, and development as a trader.
        </p>
        <ul className="about-list">
          {facts.map((fact) => (
            <li key={fact.text}>
              <Icon name={fact.icon} size={18} />
              <span>{fact.text}</span>
            </li>
          ))}
        </ul>
        <span className="signature" aria-label={`${siteConfig.brand} signature`}>
          {siteConfig.brand}
        </span>
      </div>

      <p className="disclaimer about-note">Profile details are editable placeholders (src/config.js).</p>
    </section>
  );
}

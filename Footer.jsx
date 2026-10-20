import Brand from '@/components/ui/Brand';
import Icon from '@/components/ui/Icon';
import Socials from '@/components/ui/Socials';
import { siteConfig } from '@/config';
import { handleAnchorClick } from '@/lib/scroll';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Brand markWidth={48} />
        <p className="footer-quote">{'\u201C'}The market rewards those who are patient, not perfect.{'\u201D'}</p>
        <div className="footer-right">
          <Socials />
          <a className="footer-link" href="#contact" onClick={(event) => handleAnchorClick(event, 'contact')}>
            Contact Me <Icon name="ArrowRight" size={14} />
          </a>
        </div>
      </div>
      <p className="container disclaimer footer-copy">
        {'\u00A9'} {year} {siteConfig.brand}. Sample data and placeholder content for illustration only {'\u2014'} not
        financial advice.
      </p>
    </footer>
  );
}

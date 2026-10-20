import { useEffect, useState } from 'react';
import Brand from '@/components/ui/Brand';
import Icon from '@/components/ui/Icon';
import { siteConfig } from '@/config';
import { navItems, navSectionIds } from '@/data/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { handleAnchorClick, scrollToSection } from '@/lib/scroll';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(navSectionIds);

  // Close the mobile menu on Escape, or when the viewport grows to desktop width.
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth > 960 && setMenuOpen(false);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const goTo = (event, id) => {
    handleAnchorClick(event, id);
    setMenuOpen(false);
  };

  const links = navItems.map((item) => (
    <li key={item.id}>
      <a
        href={`#${item.id}`}
        className={`nav-link${activeId === item.id ? ' is-active' : ''}`}
        aria-current={activeId === item.id ? 'true' : undefined}
        onClick={(event) => goTo(event, item.id)}
      >
        {item.label}
      </a>
    </li>
  ));

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#home" aria-label={`${siteConfig.brand} \u2014 back to top`} onClick={(event) => goTo(event, 'home')}>
          <Brand />
        </a>

        <nav aria-label="Primary" className="nav-desktop">
          <ul className="nav-links">{links}</ul>
        </nav>

        <button type="button" className="btn btn-outline nav-cta" onClick={() => scrollToSection('contact')}>
          Let's Connect <Icon name="ArrowRight" size={16} />
        </button>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
        <div className="mobile-menu-inner">
          <nav aria-label="Mobile">
            <ul>{links}</ul>
          </nav>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              scrollToSection('contact');
              setMenuOpen(false);
            }}
          >
            Let's Connect <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import Socials from '@/components/ui/Socials';
import { siteConfig } from '@/config';
import { useReveal } from '@/hooks/useReveal';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/contactLinks';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import HfmCard from './HfmCard';
import { useContactForm } from './useContactForm';

/**
 * Contact section. All numbers and links come from src/config.js:
 *   WhatsApp, Email, WhatsApp group, TikTok, and the HFM registration link.
 * A card is hidden automatically when its link is empty in the config.
 */
export default function Contact() {
  const revealRef = useReveal();
  const [formOpen, setFormOpen] = useState(false);
  const form = useContactForm();

  const { email, whatsappNumber, whatsappDisplay, whatsappGroupUrl, hfmUrl } = siteConfig.contact;
  const tiktok = siteConfig.socials.find((social) => social.id === 'tiktok' && social.url);

  return (
    <section id="contact" className="contact reveal" ref={revealRef} aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-banner">
          <h2 id="contact-title" className="contact-title metal-text">
            Let's Build Something Meaningful.
          </h2>
          <p className="contact-text">
            Have a question about my work, trading process, or potential collaboration? Feel free to get in touch.
          </p>

          <div className="contact-cards">
            <ContactCard
              icon="MessageCircle"
              label="WhatsApp"
              value={whatsappDisplay}
              description="Chat with me directly about my trading process or a potential collaboration."
              cta={{
                label: 'Contact Me on WhatsApp',
                href: buildWhatsAppUrl(whatsappNumber),
                variant: 'primary',
                external: true,
              }}
            />

            <ContactCard
              icon="Mail"
              label="Email"
              value={email}
              valueClassName="contact-card-value--email"
              description="Prefer email? Write to me and your email app will open."
              cta={{ label: 'Send Me an Email', href: buildMailtoUrl(email), variant: 'ghost' }}
            />

            {whatsappGroupUrl && (
              <ContactCard
                icon="Users"
                label="WhatsApp Group"
                description="Join my WhatsApp group to stay connected."
                cta={{ label: 'Join WhatsApp Group', href: whatsappGroupUrl, variant: 'primary', external: true }}
              />
            )}

            {tiktok && (
              <ContactCard
                icon="TikTok"
                label="TikTok"
                value={tiktok.handle}
                description="Follow me on TikTok to see my content."
                cta={{ label: 'Follow on TikTok', href: tiktok.url, variant: 'ghost', external: true }}
              />
            )}

            <HfmCard url={hfmUrl} />
          </div>

          <div className="contact-actions">
            <button
              type="button"
              className="btn btn-ghost"
              aria-expanded={formOpen}
              aria-controls="contact-form"
              onClick={() => setFormOpen((open) => !open)}
            >
              {formOpen ? 'Hide Message Form' : 'Write a Message'} <Icon name="ArrowRight" size={18} />
            </button>
            <Socials />
          </div>

          {formOpen && <ContactForm form={form} />}
        </div>
      </div>
    </section>
  );
}

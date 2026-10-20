/**
 * Central site configuration.
 * Edit contact details, social links and profile info here —
 * every component reads from this single file.
 */
export const siteConfig = {
  brand: 'Market\u039BNexus',
  tagline: 'Precision. Discipline. Profit.',

  contact: {
    email: 'dilahygy5@gmail.com',
    // International format for wa.me links: country code, no "+" and no leading 0.
    // 0858-9127-5152  ->  62 858-9127-5152
    whatsappNumber: '6285891275152',
    whatsappDisplay: '0858-9127-5152',
    whatsappGroupUrl: 'https://chat.whatsapp.com/BcO0sl6cpiX03Z3gL2GK0Y',
    hfmUrl: 'https://register.hfmtrade-ind.com/sv/id/new-live-account/?refid=30567768',
    // Optional: a form endpoint (e.g. Formspree). Empty = the form opens the visitor's email app.
    formEndpoint: '',
  },

  // Links with an empty `url` are hidden automatically.
  socials: [
    { id: 'x', label: 'X (Twitter)', url: '' },
    { id: 'instagram', label: 'Instagram', url: '' },
    { id: 'youtube', label: 'YouTube', url: '' },
    { id: 'linkedin', label: 'LinkedIn', url: '' },
    {
      id: 'tiktok',
      label: 'TikTok',
      handle: '@fadilahygy5',
      url: 'https://www.tiktok.com/@fadilahygy5?_r=1&_t=ZS-9AgRjnAQmnc',
    },
  ],

  profile: {
    role: 'Crypto & Forex Trader',
    experience: '2+ Years Experience',
    location: 'Indonesia',
  },
};

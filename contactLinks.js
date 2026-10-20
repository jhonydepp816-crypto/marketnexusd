/** Builders for outbound contact links. */

/** @param {string} number international format, digits only (e.g. 6285891275152) */
export const buildWhatsAppUrl = (number) => `https://wa.me/${number}`;

/** mailto: link, optionally pre-filled with a subject and body. */
export function buildMailtoUrl(email, { subject, body } = {}) {
  if (subject === undefined && body === undefined) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject ?? '')}&body=${encodeURIComponent(body ?? '')}`;
}

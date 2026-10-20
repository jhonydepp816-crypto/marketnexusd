import { useState } from 'react';
import { siteConfig } from '@/config';
import { buildMailtoUrl } from '@/lib/contactLinks';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_VALUES = { name: '', email: '', message: '' };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
  return errors;
}

/**
 * State + submit logic for the contact form.
 * - With `contact.formEndpoint` set in config.js: POSTs the message as JSON.
 * - Without it: opens the visitor's email app with the message pre-filled (mailto:).
 * Kept in a hook (called from <Contact />) so typed text survives hiding/showing the form.
 */
export function useContactForm() {
  const { email, formEndpoint } = siteConfig.contact;
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ type: 'error', text: 'Please fix the highlighted fields.' });
      return;
    }

    if (formEndpoint) {
      setStatus({ type: 'info', text: 'Sending\u2026' });
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setStatus({ type: 'success', text: 'Thank you! Your message has been sent.' });
        setValues(EMPTY_VALUES);
      } catch {
        setStatus({
          type: 'error',
          text: 'Sorry, the message could not be sent. Please try again or email directly.',
        });
      }
      return;
    }

    window.location.href = buildMailtoUrl(email, {
      subject: `Message from ${values.name.trim()}`,
      body: `${values.message.trim()}\n\n\u2014 ${values.name.trim()} (${values.email.trim()})`,
    });
    setStatus({
      type: 'info',
      text: 'Your email app should open with the message ready to send. No message has been sent from this website.',
    });
  };

  return { values, errors, status, handleChange, handleSubmit, hasEndpoint: Boolean(formEndpoint) };
}

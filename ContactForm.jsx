import Icon from '@/components/ui/Icon';

/** Text field with an accessible error message. */
function Field({ id, name, label, type, as: Control = 'input', autoComplete, full, value, error, onChange }) {
  const errorId = `${id}-err`;
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <Control
        id={id}
        name={name}
        type={Control === 'input' ? type : undefined}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} className="field-error">
          {error}
        </span>
      )}
    </div>
  );
}

/** Presentational form. State and submit logic come from useContactForm(). */
export default function ContactForm({ form }) {
  const { values, errors, status, handleChange, handleSubmit, hasEndpoint } = form;

  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
      <Field id="cf-name" name="name" label="Name" type="text" autoComplete="name" value={values.name} error={errors.name} onChange={handleChange} />
      <Field id="cf-email" name="email" label="Email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={handleChange} />
      <Field id="cf-message" name="message" label="Message" as="textarea" full value={values.message} error={errors.message} onChange={handleChange} />

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {hasEndpoint ? 'Send Message' : 'Open in Email App'} <Icon name="ArrowRight" size={18} />
        </button>
        {status.text && (
          <p className={`form-status ${status.type}`} role="status" aria-live="polite">
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}

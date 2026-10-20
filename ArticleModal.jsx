import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/Icon';
import ArticleThumb from './ArticleThumb';

const FOCUSABLE = 'button, [href], [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal dialog for a full article: locks body scroll, traps Tab focus,
 * closes on Escape / backdrop click, and restores focus to the trigger on close.
 */
export default function ArticleModal({ article, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        <button ref={closeButtonRef} type="button" className="modal-close" aria-label="Close article" onClick={onClose}>
          <Icon name="X" size={18} />
        </button>
        <div className="modal-hero">
          <ArticleThumb kind={article.preview} />
        </div>
        <div className="modal-content">
          <span className="badge">{article.category}</span>
          <h3 id="article-modal-title" className="modal-title metal-text">
            {article.title}
          </h3>
          <p className="modal-meta">
            <span>{article.date}</span>
            <span>{article.type}</span>
            <span>Sample content</span>
          </p>
          <div className="modal-body">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>,
    document.body,
  );
}

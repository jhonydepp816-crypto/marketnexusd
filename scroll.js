/** Smooth-scroll to a section by id and keep the URL hash in sync. */
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });

  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', `#${id}`);
  }
}

/** onClick handler for in-page anchors: prevents the jump and scrolls smoothly instead. */
export function handleAnchorClick(event, id) {
  event.preventDefault();
  scrollToSection(id);
}

'use strict';
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  // Content is visible by default, including without JavaScript.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reduced.matches) entry.target.classList.add('story-arrive');
      observer.unobserve(entry.target);
    });
  }, {threshold: .12});
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  window.addEventListener('pagehide', event => { if (!event.persisted) observer.disconnect(); });
})();

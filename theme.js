'use strict';
(() => {
  const root = document.documentElement;
  const controls = document.querySelectorAll('.theme-toggle');
  const apply = theme => {
    root.dataset.theme = theme;
    controls.forEach(button => button.setAttribute('aria-checked', String(theme === 'dark')));
    window.dispatchEvent(new Event('frame:themechange'));
  };
  controls.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => apply(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  });
  // The supplied Editorial palette is the default. The complete Local 15-inspired
  // dark appearance is an explicit, session-only choice, with no preference storage.
  apply(root.dataset.theme || 'light');
})();

'use strict';
(() => {
  const menu = document.querySelector('.menu-toggle'), navigation = document.querySelector('#main-nav');
  const narrow = matchMedia('(max-width: 900px)'), reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const setMenu = open => { menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); navigation.dataset.open = String(open); };
  document.body.classList.add('menu-ready'); menu.hidden = false;
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) setMenu(false); });
  if (narrow.addEventListener) narrow.addEventListener('change', () => setMenu(false));
  else narrow.addListener(() => setMenu(false));

  const filters = [...document.querySelectorAll('[data-filter]')], cards = [...document.querySelectorAll('.content-card')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
    document.querySelector('#gallery-status').textContent = count + (count === 1 ? ' item shown.' : ' items shown.');
  }));

  const dialog = document.querySelector('#media-dialog'), stage = document.querySelector('#media-stage');
  let returnFocus, scrollBeforeDialog = '';
  const closeMedia = () => { stage.querySelector('video')?.pause(); dialog.close(); };
  document.querySelectorAll('[data-media]').forEach(button => button.addEventListener('click', () => {
    const item = button.dataset; returnFocus = button;
    if (!dialog.showModal) { window.open(item.src, '_blank', 'noopener'); return; }
    const media = document.createElement(item.media === 'video' ? 'video' : 'img');
    if (item.media === 'video') { media.controls = true; media.playsInline = true; media.preload = 'metadata'; media.poster = button.querySelector('img').src; media.setAttribute('aria-label', 'Socially Curated launch film'); }
    else media.alt = button.querySelector('img').alt;
    media.src = item.src; stage.replaceChildren(media);
    document.querySelector('#media-title').textContent = item.title;
    document.querySelector('#media-description').textContent = item.description;
    document.querySelector('#media-credit').textContent = item.credit;
    scrollBeforeDialog = document.body.style.overflow; document.body.style.overflow = 'hidden';
    dialog.showModal(); document.querySelector('.dialog-close').focus();
    if (item.media === 'video') media.play().catch(() => {});
  }));
  document.querySelector('.dialog-close').addEventListener('click', closeMedia);
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) closeMedia(); } });
  dialog.addEventListener('close', () => { stage.querySelector('video')?.pause(); stage.replaceChildren(); document.body.style.overflow = scrollBeforeDialog; returnFocus?.focus({preventScroll:true}); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stage.querySelector('video')?.pause(); });

  const creators = document.querySelector('.creators');
  const reveal = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { if (!reduce.matches) creators.classList.add('animate-in'); reveal.disconnect(); }
  }, {threshold:.18}) : null;
  reveal?.observe(creators);

  window.addEventListener('pagehide', e => { stage.querySelector('video')?.pause(); if (!e.persisted) reveal?.disconnect(); });
})();

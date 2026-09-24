'use strict';
(() => {
  const hero = document.querySelector('.hero');
  const canvas = document.querySelector('#hero-canvas');
  const replayButton = document.querySelector('#replay');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const theme = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => document.documentElement?.dataset.theme
    ? document.documentElement.dataset.theme === 'dark' : theme.matches;
  let renderer, seconds = reduce.matches ? 3.2 : 0, raf = 0, last = 0;
  let visible = true, paused = reduce.matches, initialized = false, disposed = false, frame = 0, generation = 0;

  function updateMotionState() {
    hero.dataset.motionState = paused ? 'paused' : 'playing';
  }
  function draw() {
    if (!initialized) return;
    renderer.draw(seconds, { settled: reduce.matches && paused });
    hero.dataset.motionTime = seconds.toFixed(3);
  }
  function size() {
    if (!initialized) return;
    const bounds = hero.getBoundingClientRect();
    renderer.resize(bounds.width, bounds.height, Math.min(window.devicePixelRatio || 1, 1.5));
    draw();
  }
  function tick(now) {
    raf = 0;
    if (disposed || paused || !visible || document.hidden || !initialized) { last = 0; return; }
    if (last) seconds += Math.min((now - last) / 1000, .1);
    last = now;
    renderer.draw(seconds, { settled: false });
    if (++frame % 15 === 0) hero.dataset.motionTime = seconds.toFixed(3);
    raf = requestAnimationFrame(tick);
  }
  function schedule() {
    cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
    if (initialized && !paused && visible && !document.hidden && !disposed) raf = requestAnimationFrame(tick);
  }
  function reduceChanged() {
    paused = reduce.matches;
    if (paused) seconds = Math.max(seconds, 1.32);
    if (initialized) { updateMotionState(); draw(); schedule(); }
  }
  function themeChanged() {
    if (renderer) { renderer.dark = isDark(); draw(); }
  }
  function replay() {
    if (!initialized) return;
    seconds = reduce.matches ? 3.2 : 0;
    paused = reduce.matches;
    updateMotionState(); draw(); schedule();
    hero.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth' });
    const title = document.querySelector('#hero-title');
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
  }
  function fallback(error) {
    console.warn('Film ribbon poster fallback:', error.message || error);
    initialized = false;
    cancelAnimationFrame(raf); raf = 0; last = 0;
    hero.dataset.motionState = 'poster';
    hero.dataset.ready = 'false';
    replayButton.hidden = true;
    renderer?.dispose();
  }
  // Older browsers can keep the poster and all page content usable.
  const intersection = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    visible = entries[0].intersectionRatio > .05; schedule();
  }, { threshold: .05 }) : null;
  intersection?.observe(hero);
  const resize = 'ResizeObserver' in window ? new ResizeObserver(size) : null;
  resize?.observe(hero);
  window.addEventListener('resize', size, { passive: true });
  const listen = (query, callback) => {
    if (query.addEventListener) {
      query.addEventListener('change', callback);
      return () => query.removeEventListener('change', callback);
    }
    query.addListener(callback);
    return () => query.removeListener(callback);
  };
  const unlistenReduce = listen(reduce, reduceChanged);
  const unlistenTheme = listen(theme, themeChanged);
  window.addEventListener('frame:themechange', themeChanged);
  replayButton.addEventListener('click', replay);
  document.addEventListener('visibilitychange', schedule);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault(); generation++;
    fallback(new Error('Graphics context interrupted'));
  });
  canvas.addEventListener('webglcontextrestored', () => { if (!disposed) start(); });

  async function start() {
    const current = ++generation;
    try {
      renderer = new FilmRibbon(canvas, {
        dark: isDark(), brand: 'SOCIALLY CURATED',
        images: ['duo-4-front-smiling.png','launch-day.jpg','hero-portrait.jpg','duo-1-sitting-back2back.png','beauty-flatlay.jpg','duo-3-profile-phones.png','creator-at-work.jpg','desk-flatlay.jpg'].map(file => 'assets/socially-curated/' + file)
      });
      await renderer.ready;
      if (disposed || current !== generation) return;
      initialized = true; size();
      hero.dataset.ready = 'true';
      replayButton.hidden = false;
      updateMotionState(); schedule();
    } catch (error) {
      if (!disposed && current === generation) fallback(error);
    }
  }
  window.addEventListener('pagehide', event => {
    cancelAnimationFrame(raf); last = 0;
    if (event.persisted) return;
    disposed = true; generation++;
    intersection?.disconnect(); resize?.disconnect(); renderer?.dispose();
    unlistenReduce(); unlistenTheme();
    window.removeEventListener('frame:themechange', themeChanged);
    document.removeEventListener('visibilitychange', schedule);
    window.removeEventListener('resize', size);
  });
  window.addEventListener('pageshow', event => { if (event.persisted) { size(); schedule(); } });
  start();
})();

/* Homepage usage stats: fetched on load, hidden until 20+ videos exist, then count-up animated. */
(function () {
  'use strict';
  const MIN_VIDEOS = 20;
  const box = document.getElementById('stats');
  if (!box) return;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (n) => Math.round(n).toLocaleString('en-US');

  function animate(el, to) {
    if (reduce || !to) { el.textContent = fmt(to); return; }
    const start = performance.now(), dur = 1400;
    (function tick(now) {
      const p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * e);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  fetch('/api/stats', { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((t) => {
      if (!t || !(t.videos >= MIN_VIDEOS)) return;
      const vals = { videos: t.videos, decks: t.decks, slides: t.slides, minutes: t.seconds / 60 };
      box.hidden = false;
      requestAnimationFrame(() => {
        box.classList.add('is-in');
        box.querySelectorAll('[data-stat]').forEach((el) => animate(el, vals[el.dataset.stat] || 0));
      });
    })
    .catch(() => {});
})();

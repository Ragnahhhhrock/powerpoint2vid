/* PowerPoint2Vid homepage motion: header state, deck tilt, scroll-driven deck-to-film story,
   demo reveal and video-style tiles. No dependencies. Respects prefers-reduced-motion. */
(function () {
  'use strict';
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia && matchMedia('(pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- header: dark while over dark sections ---------- */
  const header = $('.site-header');
  const darks = $$('[data-dark]');
  function headerState() {
    if (!header) return;
    const y = header.offsetHeight / 2;
    header.classList.toggle('is-dark', darks.some((el) => { const r = el.getBoundingClientRect(); return r.top <= y && r.bottom >= y; }));
  }

  /* ---------- hero deck: tilt towards the pointer ---------- */
  const hero = $('.hero2'), rig = $('.deck');
  if (hero && rig && fine && !reduce) {
    let tx = 0, ty = 0, raf = 0;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 14;
      ty = ((e.clientY - r.top) / r.height - 0.5) * -10;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; rig.style.setProperty('--ry', tx.toFixed(2) + 'deg'); rig.style.setProperty('--rx', ty.toFixed(2) + 'deg'); });
    });
    hero.addEventListener('pointerleave', () => { rig.style.setProperty('--ry', '0deg'); rig.style.setProperty('--rx', '0deg'); });
  }

  /* ---------- story: deck to film ---------- */
  const story = $('.story');
  let words = [], els = [], steps = [], cap = null, tc = null, size = null, exp = null;
  const captions = ['This quarter we shipped three features.', 'Sign-ups grew 18 percent.', 'Support tickets fell by a third.'];
  if (story) {
    const notes = $('.notes p', story);
    if (notes) {
      notes.innerHTML = notes.textContent.trim().split(/\s+/).map((w) => '<span class="w">' + w + '</span> ').join('');
      words = $$('.w', notes);
    }
    els = $$('.el', story);
    steps = $$('.steps li', story);
    cap = $('.cap', story); tc = $('[data-tc]', story); size = $('[data-size]', story); exp = $('.export', story);
  }
  const fmtTime = (s) => '0:' + String(Math.floor(s)).padStart(2, '0');
  let lastStep = -1;
  function storyUpdate() {
    if (!story) return;
    let p;
    if (reduce) p = 1;
    else {
      const r = story.getBoundingClientRect();
      const total = story.offsetHeight - window.innerHeight;
      p = clamp(-r.top / Math.max(1, total), 0, 1);
    }
    // four phases with a short hold at the end of each
    const local = [0, 1, 2, 3].map((i) => clamp((p - i * 0.25) / 0.2, 0, 1));
    const step = reduce ? 3 : Math.min(3, Math.floor(p * 4 + 0.0001));
    const st = story.style;
    st.setProperty('--p', p.toFixed(4));
    local.forEach((v, i) => st.setProperty('--p' + (i + 1), v.toFixed(4)));
    if (step !== lastStep) {
      story.dataset.step = step; lastStep = step;
      steps.forEach((li, i) => { li.classList.toggle('is-on', i === step); li.classList.toggle('is-done', i < step); });
    }
    // phase 2: speaker notes read aloud word by word
    const said = step >= 2 ? words.length : Math.floor(local[1] * words.length);
    words.forEach((w, i) => { w.classList.toggle('is-said', i < said); w.classList.toggle('is-now', step === 1 && i === said); });
    // phase 3: slide elements build in, captions follow
    const p3 = step >= 3 ? 1 : local[2];
    els.forEach((el, i) => el.classList.toggle('is-built', p3 > (i + 0.3) / (els.length + 0.6)));
    if (cap) cap.textContent = captions[Math.min(captions.length - 1, Math.floor((step >= 3 ? local[3] : p3) * captions.length))];
    // phase 4: render and export
    if (tc) tc.textContent = fmtTime(local[3] * 46) + ' / 0:46';
    if (size) size.textContent = local[3] >= 0.98 ? 'Saved' : Math.round(local[3] * 100) + '%';
    if (exp) exp.classList.toggle('is-done', local[3] >= 0.98);
  }

  /* ---------- demo video: tilts up into place as it enters ---------- */
  const demo = $('.demo2');
  function demoUpdate() {
    if (!demo || reduce) return;
    const r = demo.getBoundingClientRect(), vh = window.innerHeight;
    demo.style.setProperty('--d', clamp((vh - r.top) / (vh * 0.85), 0, 1).toFixed(4));
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { ticking = false; headerState(); storyUpdate(); demoUpdate(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  headerState(); storyUpdate(); demoUpdate();

  /* ---------- video style tiles: pick a style, jump to the converter ---------- */
  $$('.sty').forEach((b) => {
    b.addEventListener('click', () => {
      const sel = document.getElementById('vstyle');
      if (sel) { sel.value = b.dataset.style; sel.dispatchEvent(new Event('change', { bubbles: true })); }
      const app = document.getElementById('app');
      if (app) app.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      try { if (typeof window.gtag === 'function') window.gtag('event', 'style_pick', { video_style: b.dataset.style }); } catch (e) { /* ignore */ }
    });
  });
  // touch screens have no hover: play each tile once as it scrolls into view
  if (!fine && !reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-play'); io.unobserve(en.target); } }), { threshold: 0.6 });
    $$('.sty').forEach((b) => io.observe(b));
  }
})();

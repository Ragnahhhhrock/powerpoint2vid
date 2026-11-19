/* Scene 0 — "Most decks have too many pictures, too small, placed wherever there was room.
 * The fix isn't design talent. It's a few simple rules."
 * Storyboard: a dark stage crammed with ~two dozen small slate-grey photo thumbnails, tilted and
 * overlapping like a messy pinboard, slowly drifting. On "too small" they jitter. On "wherever there
 * was room" six more pile into the gaps. On "isn't design talent" everything freezes and dims.
 * On "simple rules" the thumbnails sweep off-frame with quick ease-in exits. The original title is
 * kept: the "USING IMAGES" kicker and the "Without the Clutter" headline (paper white, 140px) settle
 * in slowly, and a thin amber underline draws across. A slow push-in runs throughout.
 */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, word, fb) => { const v = ctx.at(i, word); return (v == null || isNaN(v)) ? fb : v; };
  const tSmall = W(0, 'small', 2.6);
  const tWhere = W(0, 'wherever', 3.6);
  const tFreeze = W(1, 'design', 5.9) - 0.25;
  const tSweep = ctx.beats[2] ? ctx.beats[2].t : 7.22;
  const tSimple = W(2, 'simple', 7.7);
  const tRules = W(2, 'rules', 8.1);
  const rng = ctx.rand(11);

  stage.style.background = 'radial-gradient(80% 70% at 50% 45%, #1f2230 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const front = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });

  /* ---- thumbnails ---- */
  const thumbs = [];
  function makeThumb(x, y, w, h, r) {
    const outer = el('div', 'abs', cam, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
    const inner = el('div', 'abs', outer, {
      inset: 0, borderRadius: '6px', padding: '7px', background: '#d9d6cf',
      boxShadow: '0 18px 40px rgba(0,0,0,.55), 0 2px 6px rgba(0,0,0,.4)'
    });
    const ph = el('div', 'abs', inner, {
      inset: '7px', borderRadius: '3px', overflow: 'hidden',
      background: `linear-gradient(180deg, #8a90a0 0%, #6b7284 55%, #4c5262 100%)`
    });
    const sx = 20 + rng() * 60, sy = 18 + rng() * 20, peak = 30 + rng() * 40;
    ph.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 100 75" preserveAspectRatio="none">
      <circle cx="${sx}" cy="${sy}" r="7" fill="#c3c7d1" opacity=".8"/>
      <path d="M0 75 L0 55 L${peak - 18} 38 L${peak} 50 L${peak + 22} 28 L100 52 L100 75 Z" fill="#454b5a"/>
      <path d="M0 75 L0 64 L30 52 L58 62 L82 50 L100 60 L100 75 Z" fill="#363b48"/></svg>`;
    gsap.set(outer, { rotation: r });
    const t = { outer, inner, x, y, w, h, cx: x + w / 2, cy: y + h / 2, ph1: rng() * 6.28, ph2: rng() * 6.28, sp: 0.4 + rng() * 0.5 };
    thumbs.push(t);
    return t;
  }

  const COLS = 6, ROWS = 4;
  const base = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const w = 200 + rng() * 110, h = w * (rng() < 0.5 ? 0.75 : 0.66);
      const cx = 170 + c * 316 + (rng() - 0.5) * 120;
      const cy = 150 + r * 260 + (rng() - 0.5) * 90;
      base.push(makeThumb(cx - w / 2, cy - h / 2, w, h, (rng() - 0.5) * 28));
    }
  }
  const extras = [];
  const gaps = [[480, 300], [1290, 420], [820, 640], [300, 760], [1560, 820], [1080, 200]];
  gaps.forEach(([cx, cy]) => {
    const w = 170 + rng() * 80, h = w * 0.72;
    extras.push(makeThumb(cx - w / 2, cy - h / 2, w, h, (rng() - 0.5) * 34));
  });

  /* drift / jitter driven per-frame from tweened state */
  const drift = { a: 1 }, jit = { a: 0 };
  ctx.onFrame((t) => {
    thumbs.forEach((k) => {
      const dx = drift.a * Math.sin(t * k.sp + k.ph1) * 6 + jit.a * Math.sin(t * 47 + k.ph2 * 3) * 7;
      const dy = drift.a * Math.cos(t * k.sp * 0.8 + k.ph2) * 5 + jit.a * Math.cos(t * 53 + k.ph1 * 2) * 6;
      const dr = drift.a * Math.sin(t * k.sp * 0.6 + k.ph1) * 1.2 + jit.a * Math.sin(t * 61 + k.ph1) * 3;
      k.inner.style.transform = `translate(${dx}px, ${dy}px) rotate(${dr}deg)`;
    });
  });

  /* ---- headline ---- */
  const glow = el('div', 'abs', front, { left: '360px', top: '300px', width: '1200px', height: '480px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(242,165,65,.14), transparent 75%)', opacity: 0 });
  const kicker = el('div', 'abs', front, { left: '0', width: '1920px', top: '400px', textAlign: 'center',
    font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.28em', color: 'var(--amber)' });
  kicker.textContent = 'USING IMAGES';
  const head = el('div', 'abs', front, { left: '100px', width: '1720px', top: '458px', textAlign: 'center', whiteSpace: 'nowrap',
    font: '800 140px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const words = ctx.split(head, 'Without the Clutter', 'word');
  const line = el('div', 'abs', front, { left: '460px', width: '1000px', top: '640px', height: '4px', borderRadius: '2px',
    background: 'var(--amber)', boxShadow: '0 0 18px rgba(242,165,65,.6)', transformOrigin: '0% 50%' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(cam, { filter: 'brightness(1) saturate(1)' });
  gsap.set([kicker, line], { opacity: 0 });
  gsap.set(words, { opacity: 0, y: 70, filter: 'blur(10px)' });
  gsap.set(line, { scaleX: 0 });
  gsap.set(extras.map((k) => k.outer), { opacity: 0 });

  // crowded board pops in fast
  base.forEach((k, i) => {
    tl.fromTo(k.outer, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, 0.02 + i * 0.022);
  });
  tl.to(cam, { scale: 1.05, duration: tSweep, ease: 'none' }, 0);

  // "too small": jitter
  tl.to(jit, { a: 1, duration: 0.15, ease: 'power2.out' }, tSmall - 0.1);
  tl.to(jit, { a: 0, duration: 0.6, ease: 'power2.in' }, tSmall + 0.35);

  // "wherever there was room": more pile into the gaps
  extras.forEach((k, i) => {
    const fromX = (k.cx < 960 ? -1 : 1) * (300 + rng() * 200);
    tl.fromTo(k.outer, { opacity: 0, x: fromX, y: -260, scale: 1.3 },
      { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)', immediateRender: false }, tWhere + i * 0.12);
  });

  // "isn't design talent": freeze
  tl.to(drift, { a: 0, duration: 0.25, ease: 'power3.out' }, tFreeze);
  tl.to(cam, { filter: 'brightness(.6) saturate(.4)', duration: 0.35, ease: 'power2.out' }, tFreeze);

  // "simple rules": sweep everything off-frame
  thumbs.forEach((k) => {
    const dx = k.cx - 960, dy = k.cy - 540, d = Math.hypot(dx, dy) || 1;
    const t = tSweep + (1 - Math.min(d / 1100, 1)) * 0.25 + rng() * 0.12;
    tl.to(k.outer, { x: (dx / d) * 1500, y: (dy / d) * 900, rotation: '+=' + ((rng() - 0.5) * 40), duration: 0.55, ease: 'power3.in' }, t);
  });

  // headline settles in
  tl.to(glow, { opacity: 1, duration: 1.2, ease: 'power2.out' }, tSimple - 0.3);
  tl.to(kicker, { opacity: 1, duration: 0.7, ease: 'power2.out' }, tSimple - 0.3);
  tl.fromTo(kicker, { y: 20 }, { y: 0, duration: 1.0, ease: 'power3.out', immediateRender: false }, tSimple - 0.3);
  tl.to(words, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out', stagger: 0.09 }, tSimple - 0.2);
  tl.to(line, { opacity: 1, duration: 0.2 }, tRules);
  tl.to(line, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, tRules);
  tl.fromTo(front, { scale: 1 }, { scale: 1.03, duration: Math.max(1, ctx.dur - (tSimple - 0.2)), ease: 'power1.out', immediateRender: false }, tSimple - 0.2);
});

/* Scene 2 — "Your content stays yours. The look changes the framing, the motion, how text arrives,
 * where captions sit, and the overall texture."
 * Storyboard: paper stage. The word "message" is locked in ink at the centre (150px) and never moves.
 * On "content" a thin ink underline and a LOCKED tag pin it down. The deck's bullet list returns as a
 * row of five chips, and each chip lights as its demo plays around the anchor:
 * "framing": crop marks tighten in from the frame edges.
 * "motion": a teal arc swings over the word with a comet head.
 * "text arrives": coral letters cascade down onto the ink glyphs.
 * "captions": an ink caption bar slides up beneath the word.
 * "texture": a grain wash sweeps across the whole stage.
 * The camera holds; only the light drifts. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tContent = A(0, 'content'), tYours = A(0, 'yours.');
  const tFrame = A(1, 'framing,'), tMotion = A(1, 'motion,'), tText = A(1, 'text'), tCap = A(1, 'captions'), tTex = A(1, 'texture.');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'var(--paper)';
  const light = el('div', 'abs', stage, { inset: '-200px', background: 'radial-gradient(45% 45% at 50% 48%, rgba(255,255,255,.9), rgba(246,243,238,0) 70%), radial-gradient(35% 40% at 80% 85%, rgba(232,163,61,.10), transparent 70%)' });
  ctx.onFrame((t) => { light.style.transform = `translate(${Math.sin(t * 0.35) * 40}px, ${Math.cos(t * 0.27) * 25}px)`; });

  /* chips: the bullet list, rebuilt */
  const chipRow = el('div', 'abs', stage, { left: 0, width: '1920px', top: '130px', display: 'flex', justifyContent: 'center', gap: '22px' });
  const chips = ['FRAMING', 'MOTION', 'REVEALS', 'CAPTIONS', 'TEXTURE'].map((s) => {
    const c = el('div', '', chipRow, { font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--slate)', padding: '14px 22px', borderRadius: '999px', border: '2px solid rgba(91,107,140,.35)', background: 'rgba(255,255,255,.4)' });
    c.textContent = s; return c;
  });

  /* the anchor */
  const CX = 960, CY = 520;
  const anchor = el('div', 'abs', stage, { left: 0, width: '1920px', top: CY - 90 + 'px', height: '180px', textAlign: 'center', font: '800 150px/180px Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  anchor.textContent = 'message';
  const under = el('div', 'abs', stage, { left: '700px', width: '520px', top: CY + 104 + 'px', height: '4px', borderRadius: '2px', background: 'var(--ink)', transformOrigin: '0% 50%' });
  const lock = el('div', 'abs', stage, { left: 0, width: '1920px', top: CY - 150 + 'px', textAlign: 'center', font: `600 20px/1 ${MONO}`, letterSpacing: '.22em', color: 'var(--slate)' });
  lock.textContent = 'YOUR CONTENT · LOCKED';

  /* crop marks */
  const marks = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([sx, sy]) => {
    const m = el('div', 'abs', stage, { width: '70px', height: '70px', borderColor: 'var(--coral)', borderStyle: 'solid', borderWidth: 0 });
    m.style[sy ? 'borderBottomWidth' : 'borderTopWidth'] = '5px';
    m.style[sx ? 'borderRightWidth' : 'borderLeftWidth'] = '5px';
    return { m, sx, sy };
  });
  const placeMarks = (l, tp, r, b) => marks.forEach(({ m, sx, sy }) => gsap.set(m, { left: (sx ? r - 70 : l), top: (sy ? b - 70 : tp) }));

  /* motion arc */
  const svgWrap = el('div', 'abs', stage, { left: 0, top: 0, width: '1920px', height: '1080px' });
  svgWrap.innerHTML = `<svg width="1920" height="1080"><path id="mArc" d="M 520 700 C 560 300, 1360 300, 1400 700" fill="none" stroke="#2BB3A3" stroke-width="8" stroke-linecap="round"/><circle id="mDot" cx="0" cy="0" r="16" fill="#2BB3A3"/></svg>`;
  const arcP = svgWrap.querySelector('#mArc'), dot = svgWrap.querySelector('#mDot');
  const L = arcP.getTotalLength ? arcP.getTotalLength() : 1100;
  gsap.set(arcP, { attr: { 'stroke-dasharray': `${L} ${L}`, 'stroke-dashoffset': L } });
  gsap.set(dot, { opacity: 0, x: 520, y: 700, filter: 'drop-shadow(0 0 12px rgba(43,179,163,.8))' });

  /* cascading letters overlay */
  const casc = el('div', 'abs', stage, { left: 0, width: '1920px', top: CY - 90 + 'px', height: '180px', textAlign: 'center', font: '800 150px/180px Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--coral)' });
  const letters = ctx.split(casc, 'message', 'char');

  /* caption bar */
  const cap = el('div', 'abs', stage, { left: '560px', width: '800px', top: '760px', height: '96px', borderRadius: '18px', background: 'var(--ink)', boxShadow: '0 30px 60px rgba(14,18,32,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', font: '700 40px/1 Inter', letterSpacing: '-.01em', color: 'var(--paper)' });
  const capWords = ['Your', 'content', 'stays', 'yours.'].map((w) => { const s = el('span', '', cap, {}); s.textContent = w; return s; });

  /* texture wash */
  const tex = el('div', 'abs', stage, { inset: 0, mixBlendMode: 'multiply', pointerEvents: 'none' });
  tex.innerHTML = `<svg width="1920" height="1080"><filter id="nz"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.28  0 0 0 0 0.2  0 0 0 0.9 0"/></filter><rect width="1920" height="1080" filter="url(#nz)"/></svg>`;
  const warm = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(70% 70% at 50% 50%, transparent 40%, rgba(232,163,61,.18))', pointerEvents: 'none' });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  const lit = (c, color, t) => {
    tl.to(c, { background: color, borderColor: color, color: '#F6F3EE', duration: 0.3, ease: 'power2.out' }, t);
    tl.fromTo(c, { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, t);
  };

  gsap.set([lock, ...chips, tex, warm, cap, ...capWords], { opacity: 0 });
  gsap.set(under, { scaleX: 0 });
  gsap.set(letters, { opacity: 0, y: -260, rotation: -20 });
  marks.forEach(({ m }) => gsap.set(m, { opacity: 0 }));
  placeMarks(100, 100, 1820, 980);

  tl.from(anchor, { opacity: 0, duration: 0.25, ease: 'none' }, 0);
  tl.to(chips, { opacity: 1, duration: 0.5, stagger: 0.06 }, 0.3);
  tl.to(under, { scaleX: 1, duration: 0.6, ease: 'expo.inOut' }, tContent - 0.1);
  tl.fromTo(lock, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, tYours - 0.15);

  // framing: crop marks tighten, staying clear of the glyphs even through the overshoot
  tl.to(marks.map((o) => o.m), { opacity: 1, duration: 0.25 }, tFrame - 0.35);
  const box = { l: 100, t: 100, r: 1820, b: 980 };
  tl.to(box, { l: 590, t: 382, r: 1330, b: 668, duration: 0.8, ease: 'back.out(1.1)', onUpdate: () => placeMarks(box.l, box.t, box.r, box.b) }, tFrame - 0.2);
  lit(chips[0], 'var(--coral)', tFrame);

  // motion: teal arc swings past
  tl.to(dot, { opacity: 1, duration: 0.1 }, tMotion - 0.3);
  tl.to(arcP, { attr: { 'stroke-dashoffset': 0 }, duration: 0.7, ease: 'power2.inOut' }, tMotion - 0.3);
  tl.to(dot, { motionPath: { path: arcP, align: arcP, alignOrigin: [0.5, 0.5] }, duration: 0.7, ease: 'power2.inOut' }, tMotion - 0.3);
  tl.to(arcP, { attr: { 'stroke-dashoffset': -L }, duration: 0.6, ease: 'power2.in' }, tMotion + 0.45);
  tl.to(dot, { opacity: 0, scale: 2, transformOrigin: '50% 50%', duration: 0.4 }, tMotion + 0.45);
  lit(chips[1], 'var(--teal)', tMotion);

  // reveals: letters cascade onto the anchor
  tl.to(letters, { opacity: 1, y: 0, rotation: 0, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.05 }, tText - 0.2);
  tl.to(casc, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, tText + 0.75);
  lit(chips[2], 'var(--amber)', tText);

  // captions: bar slides under
  tl.fromTo(cap, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)', immediateRender: false }, tCap - 0.25);
  tl.to(capWords, { opacity: 1, duration: 0.25, stagger: 0.09 }, tCap);
  lit(chips[3], 'var(--ink)', tCap);

  // texture: grain wash sweeps across
  gsap.set(tex, { clipPath: 'inset(0px 1920px 0px 0px)' });
  tl.to(tex, { opacity: 0.3, duration: 0.2 }, tTex - 0.3);
  tl.to(tex, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.9, ease: 'expo.inOut' }, tTex - 0.3);
  tl.to(warm, { opacity: 1, duration: 1.0, ease: 'power1.inOut' }, tTex - 0.2);
  lit(chips[4], 'var(--slate)', tTex);

  // hold: crop marks breathe gently outward so the frame never freezes
  tl.to(box, { l: 578, t: 374, r: 1342, b: 676, duration: ctx.dur - (tFrame + 1), ease: 'sine.inOut', onUpdate: () => placeMarks(box.l, box.t, box.r, box.b) }, tFrame + 1);
});

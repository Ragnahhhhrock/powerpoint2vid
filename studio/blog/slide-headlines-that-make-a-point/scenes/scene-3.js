/* Scene 3 — "Now read your headlines in order, as a list. In a rewritten sales deck, the new headlines alone make a complete pitch."
 * Storyboard: bright paper desk, wide two-column layout. Slate labels 'About us', 'Pricing', 'Next steps' snap in on the left.
 * On "in order" an editor's pen strikes each label, a coral arrow sweeps across, and the real headline is written in on the right.
 * On "alone" the left column falls away and the camera pushes into the right column. On "complete" a mint bracket draws
 * down the three headlines, and on "pitch" it is labeled THE PITCH. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : f; };
  const order = T(0, 'order', 1.734), alone = T(1, 'alone', 5.484), complete = T(1, 'complete', 6.123), pitch = T(1, 'pitch', 6.552);

  const MONO = 'ui-monospace, Menlo, monospace';
  stage.style.background = 'radial-gradient(80% 70% at 55% 45%, #fffdf8 0%, var(--paper) 60%, #e9e4d8 100%)';

  const drift = el('div', 'abs', stage, { inset: 0, transformOrigin: '1300px 540px' });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: '1300px 540px' });

  // column headers
  const hL = el('div', 'abs', cam, { left: '140px', top: '150px', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' });
  hL.textContent = 'LABEL';
  const hR = el('div', 'abs', cam, { left: '840px', top: '150px', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--signal)' });
  hR.textContent = 'HEADLINE';
  const rule = el('div', 'abs', cam, { left: '140px', top: '190px', width: '1640px', height: '2px', background: 'rgba(20,22,31,.12)', transformOrigin: '0 50%' });

  const ROWS = [
    ['About us', 'We help mid-sized retailers cut stock write-offs'],
    ['Pricing', 'One flat monthly fee, scaled to your number of stores'],
    ['Next steps', 'A two-week pilot with three of your stores'],
  ];
  const Y = [250, 480, 710];

  const rows = ROWS.map(([lab, head], i) => {
    const y = Y[i];
    const label = el('div', 'abs', cam, { left: '140px', top: y + 36 + 'px', font: '700 48px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--slate)', whiteSpace: 'nowrap' });
    const lt = el('span', '', label); lt.textContent = lab;
    const strike = el('div', 'abs', label, { left: '-8px', right: '-8px', top: '52%', height: '5px', borderRadius: '3px', background: 'var(--signal)', transformOrigin: '0 50%' });
    const arrow = el('div', 'abs', cam, { left: '610px', top: y + 40 + 'px', width: '190px', height: '44px' });
    arrow.innerHTML = `<svg width="190" height="44"><path d="M4 22 H176" stroke="#FF5A3C" stroke-width="5" stroke-linecap="round"/><path d="M160 8 L180 22 L160 36" fill="none" stroke="#FF5A3C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const hl = el('div', 'abs', cam, { left: '840px', top: y + 'px', width: '940px', font: '800 54px/1.12 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
    const words = ctx.split(hl, head, 'word');
    return { label, strike, arrow, hl, words };
  });

  // mint bracket + label
  const bracket = el('div', 'abs', cam, { left: '770px', top: '240px', width: '50px', height: '600px' });
  bracket.innerHTML = `<svg width="50" height="600" style="overflow:visible"><path d="M44 4 H12 V596 H44" fill="none" stroke="#2EC4A0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="filter:drop-shadow(0 0 10px rgba(46,196,160,.45))"/></svg>`;
  const bPath = bracket.querySelector('path');
  const pitchTag = el('div', 'abs', cam, { left: '520px', top: '522px', width: '220px', textAlign: 'right', font: `700 26px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mint)' });
  pitchTag.textContent = 'THE PITCH';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- initial states ---- */
  gsap.set([hL, hR, pitchTag], { opacity: 0 });
  gsap.set(rule, { scaleX: 0 });
  rows.forEach((r) => {
    gsap.set(r.label, { opacity: 0, x: -30 });
    gsap.set(r.strike, { scaleX: 0 });
    gsap.set(r.arrow, { clipPath: 'inset(0px 190px 0px 0px)' });
    gsap.set(r.words, { opacity: 0, y: 22 });
  });

  /* ---- timeline ---- */
  tl.to(drift, { scale: 1.025, x: -14, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(rule, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, 0.05);
  tl.to([hL, hR], { opacity: 1, duration: 0.25 }, 0.12);
  rows.forEach((r, i) => tl.to(r.label, { opacity: 1, x: 0, duration: 0.28, ease: 'power3.out' }, 0.2 + i * 0.12));

  // "in order": pen strikes, arrow sweeps, headline gets written
  rows.forEach((r, i) => {
    const t = order - 0.15 + i * 0.55;
    tl.to(r.strike, { scaleX: 1, duration: 0.22, ease: 'power2.out' }, t);
    tl.to(r.label, { opacity: 0.55, duration: 0.3 }, t + 0.15);
    tl.to(r.arrow, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.32, ease: 'power2.out' }, t + 0.08);
    tl.to(r.words, { opacity: 1, y: 0, duration: 0.26, stagger: 0.03, ease: 'power3.out' }, t + 0.28);
  });

  // "alone": left column falls away, camera pushes into the story
  const leftStuff = [hL, ...rows.map((r) => r.label), ...rows.map((r) => r.arrow)];
  tl.to(leftStuff, { opacity: 0, x: -40, duration: 0.45, ease: 'power2.in', stagger: 0.03 }, alone - 0.15);
  tl.to(rule, { opacity: 0, duration: 0.4 }, alone - 0.1);
  tl.to(cam, { scale: 1.15, x: -290, duration: 1.1, ease: 'expo.inOut' }, alone - 0.05);

  // "complete": bracket draws; "pitch": label
  tl.to(bPath, { attr: { 'stroke-dashoffset': 0 }, duration: 0.5, ease: 'power2.inOut' }, complete - 0.05);
  tl.fromTo(pitchTag, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.28, ease: 'power3.out', immediateRender: false }, pitch - 0.05);
  tl.to(rows.map((r) => r.hl), { color: '#0B0D17', duration: 0.4 }, pitch);
});

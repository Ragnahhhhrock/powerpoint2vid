/* Scene 0 — "Every audience sees, hears and processes information differently. A few simple fixes make
 * your slides work for every viewer, and clearer for everyone."
 * Storyboard: murky pale-grey stage; the headline "Accessible slides are better slides" sits in
 * washed-out mist grey, soft and barely readable, briefly straining into focus on "sees / hears /
 * processes" and wavering on "differently". A contrast dial in the corner wakes on "fixes"; on "every
 * viewer" it spins to full, the stage turns to paper, the type snaps to crisp ink at 140px and a
 * focus ring tightens around it. On "clearer for everyone" four signal-blue chips slide up:
 * Contrast · Text · Colour · Video. Slow push-in throughout. The original's overlap and clipping are gone. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const sees = W(0, 'sees'), hears = W(0, 'hears'), proc = W(0, 'processes'), diff = W(0, 'differently');
  const fixes = W(1, 'fixes'), every = W(1, 'every'), viewer = W(1, 'viewer'), clearer = W(1, 'clearer');

  stage.style.background = '#D6D7D4';
  const paper = el('div', 'abs', stage, { inset: 0, opacity: 0,
    background: 'radial-gradient(80% 70% at 30% 40%, #FFFFFF 0%, var(--paper) 60%, #ECE9E1 100%)' });
  const murk = el('div', 'abs', stage, { inset: 0,
    background: 'radial-gradient(70% 60% at 35% 45%, rgba(255,255,255,.25), transparent 70%)' });

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '30% 45%' });

  /* headline */
  const head = el('div', 'abs', cam, { left: '160px', top: '250px', width: '1500px',
    font: '800 140px/1.02 Inter Display, Inter', letterSpacing: '-.045em', color: '#AEB2B9' });
  const l1 = el('div', '', head); const l2 = el('div', '', head);
  const w1 = ctx.split(l1, 'Accessible slides', 'word');
  const w2 = ctx.split(l2, 'are better slides', 'word');
  const words = [...w1, ...w2];

  /* focus ring */
  const ring = el('div', 'abs', cam, { left: '120px', top: '222px', width: '1320px', height: '340px',
    borderRadius: '28px', border: '4px solid var(--signal)', boxShadow: '0 0 0 10px rgba(47,107,255,.15)',
    opacity: 0, transformOrigin: '50% 50%' });

  /* rule + chips */
  const rule = el('div', 'abs', cam, { left: '160px', top: '640px', width: '1180px', height: '3px',
    background: 'var(--ink)', transformOrigin: '0% 50%', opacity: 0.9 });
  const chipRow = el('div', 'abs', cam, { left: '160px', top: '700px', display: 'flex', gap: '22px' });
  const chips = ['Contrast', 'Text', 'Colour', 'Video'].map((t, i) => {
    const c = el('div', '', chipRow, { display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 34px',
      borderRadius: '999px', background: 'var(--signal)', color: '#fff', font: '700 38px/1 Inter',
      letterSpacing: '-.01em', boxShadow: '0 18px 40px rgba(47,107,255,.28)' });
    const n = el('span', '', c, { font: '600 22px/1 ui-monospace, Menlo, monospace', opacity: 0.7, letterSpacing: '.08em' });
    n.textContent = '0' + (i + 1);
    const s = el('span', '', c); s.textContent = t;
    return c;
  });

  /* contrast dial (top-right) */
  const dial = el('div', 'abs', stage, { left: '1600px', top: '110px', width: '200px', height: '240px' });
  dial.innerHTML = `<svg width="200" height="200" viewBox="0 0 200 200">
    <g transform="rotate(135 100 100)">
      <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(20,22,28,.12)" stroke-width="12" stroke-linecap="round" stroke-dasharray="329.9 999"/>
      <circle id="dArcM" cx="100" cy="100" r="70" fill="none" stroke="#9AA0AB" stroke-width="12" stroke-linecap="round" stroke-dasharray="0 999"/>
      <circle id="dArcS" cx="100" cy="100" r="70" fill="none" stroke="#2F6BFF" stroke-width="12" stroke-linecap="round" stroke-dasharray="0 999" opacity="0"/>
    </g>
    <g id="dNeedle"><line x1="100" y1="100" x2="100" y2="46" stroke="#14161C" stroke-width="6" stroke-linecap="round"/></g>
    <circle cx="100" cy="100" r="11" fill="#14161C"/>
    <g id="dIcon"><circle cx="100" cy="150" r="13" fill="none" stroke="#14161C" stroke-width="3"/><path d="M100 137 A13 13 0 0 1 100 163 Z" fill="#14161C"/></g>
  </svg>`;
  const dLab = el('div', 'abs', dial, { left: 0, width: '200px', top: '206px', textAlign: 'center',
    font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.18em', color: 'var(--mist)' });
  dLab.textContent = 'CONTRAST';
  const arcM = dial.querySelector('#dArcM'), arcS = dial.querySelector('#dArcS'), needle = dial.querySelector('#dNeedle');
  const dv = { v: 0.14, s: 0 };
  ctx.onFrame(() => {
    const len = 329.9 * dv.v;
    arcM.setAttribute('stroke-dasharray', `${len} 999`);
    arcS.setAttribute('stroke-dasharray', `${len} 999`);
    arcS.setAttribute('opacity', dv.s);
    needle.setAttribute('transform', `rotate(${-135 + 270 * dv.v} 100 100)`);
  });

  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(50% 50% at 35% 40%, rgba(255,255,255,.9), transparent 70%)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(head, { filter: 'blur(4px)' });
  gsap.set(dial, { opacity: 0.55, filter: 'grayscale(1)' });
  gsap.set(rule, { scaleX: 0 });
  gsap.set(chips, { opacity: 0, y: 60 });

  tl.from(words, { opacity: 0, y: 24, duration: 0.9, stagger: 0.06, ease: 'power2.out' }, 0.05);
  tl.from(dial, { opacity: 0, duration: 0.8 }, 0.2);
  tl.to(cam, { scale: 1.06, x: -20, duration: ctx.dur, ease: 'none' }, 0);

  // straining to see
  [sees, hears, proc].forEach((t, i) => {
    tl.to(head, { filter: `blur(${2.4 - i * 0.4}px)`, duration: 0.22, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t - 0.05);
    tl.to(dv, { v: 0.14 + 0.05 * (i + 1), duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
  });
  // "differently": words waver independently
  words.forEach((w, i) => {
    tl.to(w, { y: (i % 2 ? 10 : -10), x: (i % 3 - 1) * 6, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, diff + i * 0.05);
  });

  // "fixes": the dial wakes
  tl.to(dial, { opacity: 1, filter: 'grayscale(0)', scale: 1.06, duration: 0.5, ease: 'back.out(1.8)' }, fixes - 0.1);
  tl.to(dial, { scale: 1, duration: 0.5, ease: 'power2.out' }, fixes + 0.4);
  tl.to(dv, { v: 0.24, duration: 0.6 }, fixes);

  // "every viewer": spin to full, contrast snaps up
  tl.to(dv, { v: 1, duration: 0.6, ease: 'expo.inOut' }, every - 0.1);
  tl.to(dial, { rotation: 360, duration: 0.6, ease: 'expo.inOut' }, every - 0.1);
  tl.to(dv, { s: 1, duration: 0.3 }, every + 0.1);
  tl.to(dLab, { color: '#2F6BFF', duration: 0.3 }, every + 0.2);
  tl.to(paper, { opacity: 1, duration: 0.4, ease: 'power2.out' }, viewer - 0.15);
  tl.to(murk, { opacity: 0, duration: 0.4 }, viewer - 0.15);
  tl.to(head, { color: '#14161C', filter: 'blur(0px)', duration: 0.32, ease: 'power3.out' }, viewer - 0.1);
  tl.fromTo(head, { scale: 1 }, { scale: 1.015, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false, transformOrigin: '0% 50%' }, viewer);
  tl.fromTo(ring, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', immediateRender: false }, viewer - 0.1);
  tl.to(ring, { opacity: 0, duration: 0.6, ease: 'power1.in' }, viewer + 0.55);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 0.6, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, viewer);

  // "clearer for everyone": rule + chips
  tl.to(rule, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, clearer - 0.3);
  tl.to(chips, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' }, clearer);
});

/* Scene 4 — "Take a chart with six bars in six brand colours. Grey out five, put the north in the
 * accent, and the slide says exactly one thing."
 * Storyboard: night stage, close on a live bar chart with six bars, each a different loud colour, over
 * noisy coloured glows. On "grey out five" five bars drain to light grey in a ripple and the noise calms.
 * On "north… accent" the north bar ignites coral and the camera pushes in. On "exactly one thing" the
 * headline "The north grew fastest this quarter" types in above in paper white.
 * Bars are illustrative only: there is no numeric axis and no values. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const sixBars = ctx.at(0, 'bars'), brand = ctx.at(0, 'brand');
  const grey = ctx.at(1, 'Grey'), north = ctx.at(1, 'north'), accent = ctx.at(1, 'accent,');
  const exactly = ctx.at(1, 'exactly'), thing = ctx.at(1, 'thing.');

  stage.style.background = 'radial-gradient(70% 65% at 50% 60%, #1a2236 0%, var(--night) 75%)';

  /* noisy over-coloured glows (the chaos) */
  const noise = el('div', 'abs', stage, { inset: 0 });
  const LOUD = ['#FF2E93', '#B6F23A', '#2EC4FF', '#FFD02E', '#9B5CFF', '#FF8A1F'];
  const blobs = LOUD.map((c, i) => el('div', 'abs', noise, {
    left: 120 + i * 290 + 'px', top: (i % 2 ? 160 : 520) + 'px', width: '520px', height: '520px', borderRadius: '50%',
    background: `radial-gradient(circle, ${c}40 0%, transparent 65%)`, mixBlendMode: 'screen' }));

  const drift = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 55%' });
  const NX = 310 + 2 * 230 + 75; // north bar centre
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: `${NX}px 540px` });

  const BASE = 860, X0 = 310, STEP = 230, BW = 150;
  const H = [340, 410, 560, 300, 380, 270]; // illustrative heights, north (index 2) tallest
  const NI = 2;

  const floor = el('div', 'abs', cam, { left: '230px', width: '1460px', top: BASE + 'px', height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(201,204,211,.4), transparent)' });

  const bars = H.map((h, i) => {
    const x = X0 + i * STEP;
    const b = el('div', 'abs', cam, { left: x + 'px', top: BASE - h + 'px', width: BW + 'px', height: h + 'px',
      borderRadius: '12px 12px 3px 3px', transformOrigin: '50% 100%', backgroundColor: LOUD[i],
      boxShadow: `0 0 50px ${LOUD[i]}88` });
    const tick = el('div', 'abs', cam, { left: x + BW / 2 - 1 + 'px', top: BASE + 10 + 'px', width: '2px', height: '14px', background: 'rgba(201,204,211,.35)' });
    return { b, tick };
  });
  const nb = bars[NI].b;
  const nLabel = el('div', 'abs', cam, { left: X0 + NI * STEP - 40 + 'px', width: BW + 80 + 'px', top: BASE + 36 + 'px', textAlign: 'center',
    font: '700 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.18em', color: 'var(--accent)' });
  nLabel.textContent = 'NORTH';
  const halo = el('div', 'abs', cam, { left: NX - 260 + 'px', top: BASE - H[NI] - 120 + 'px', width: '520px', height: '640px',
    background: 'radial-gradient(50% 50% at 50% 45%, rgba(255,90,54,.35), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  /* annotation + headline */
  const tag = el('div', 'abs', stage, { left: '120px', top: '96px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--grey-mid)' });
  const head = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '160px', textAlign: 'center',
    font: '800 76px/1.05 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const HEAD = 'The north grew fastest this quarter';
  const type = { p: 0 }, caret = { o: 0 };

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    tag.textContent = t < north ? 'SIX BARS · SIX BRAND COLOURS' : 'FIVE GREY · ONE ACCENT';
    const n = Math.round(type.p * HEAD.length);
    const blink = caret.o * (Math.floor(t * 2.5) % 2 === 0 || type.p < 1 ? 1 : 0);
    head.innerHTML = HEAD.slice(0, n) + `<span style="color:var(--accent);opacity:${blink}">|</span>`;
    blobs.forEach((b, i) => { b.style.transform = `translate(${Math.sin(t * 0.6 + i) * 40}px, ${Math.cos(t * 0.5 + i * 2) * 30}px)`; });
  });

  /* ---- timeline ---- */
  gsap.set(bars.map((o) => o.b), { scaleY: 0, filter: 'saturate(1)' });
  gsap.set(nLabel, { opacity: 0, y: 10 });
  tl.from(noise, { opacity: 0, duration: 0.4 }, 0);
  tl.from(floor, { opacity: 0, scaleX: 0.3, duration: 0.8 }, 0.1);
  tl.from(tag, { opacity: 0, y: 10, duration: 0.6 }, 0.2);
  tl.from(bars.map((o) => o.tick), { opacity: 0, duration: 0.4, stagger: 0.05 }, 0.2);
  // bars build, loud and all at once-ish
  tl.to(bars.map((o) => o.b), { scaleY: 1, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.09 }, Math.min(sixBars - 0.6, 1.2));
  tl.to(bars.map((o) => o.b), { filter: 'saturate(1.3)', duration: 0.3, yoyo: true, repeat: 1, stagger: 0.05 }, brand);
  tl.to(drift, { scale: 1.025, duration: ctx.dur, ease: 'none' }, 0);

  // "grey out five": ripple drain outward from the north bar
  const others = [0, 1, 3, 4, 5].sort((a, b) => Math.abs(a - NI) - Math.abs(b - NI));
  others.forEach((i, k) => {
    tl.to(bars[i].b, { backgroundColor: '#C9CCD3', opacity: 0.48, boxShadow: '0 0 0px rgba(0,0,0,0)', duration: 0.55, ease: 'power2.out' }, grey + k * 0.11);
  });
  tl.to(noise, { opacity: 0, duration: 1.2, ease: 'power2.out' }, grey);
  tl.to(nb, { backgroundColor: '#5a6072', boxShadow: '0 0 0px rgba(0,0,0,0)', duration: 0.5 }, grey + 0.2);

  // "north… accent": ignite, snap, push in
  tl.to(nb, { backgroundColor: '#FF5A36', boxShadow: '0 0 90px rgba(255,90,54,.8)', duration: 0.25, ease: 'power4.out' }, north);
  tl.fromTo(nb, { scaleX: 1 }, { scaleX: 1.08, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, north);
  tl.to(halo, { opacity: 1, duration: 0.5 }, north);
  tl.to(nLabel, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)' }, north + 0.1);
  tl.to(cam, { scale: 1.06, y: 16, duration: 1.4, ease: 'expo.inOut' }, accent - 0.3);

  // "exactly one thing": headline types in
  tl.to(caret, { o: 1, duration: 0.1 }, exactly - 0.3);
  tl.to(type, { p: 1, duration: Math.max(0.6, thing - exactly + 0.2), ease: 'none' }, exactly - 0.2);
  tl.to(halo, { opacity: 0.7, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, thing);
});

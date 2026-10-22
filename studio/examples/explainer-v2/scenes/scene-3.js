/* Scene 3 — "So a flat chart becomes a moment. The numbers build, and the result lands right as it's said."
 * Storyboard: the deck's real default chart, shown as-is, literally tips flat on "flat". On "moment"
 * it sinks away and the same data rises as glowing columns on a dark stage. Columns and counters build
 * one by one on "numbers build"; on "result lands" Q4 ignites, the others dim and "+117%" slams in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const flat = ctx.at(0, 'flat'), moment = ctx.at(0, 'moment'), build = ctx.at(1, 'numbers'), lands = ctx.at(1, 'lands'), said = ctx.at(1, 'said');
  const DATA = [['Q1', 1.2], ['Q2', 1.5], ['Q3', 1.9], ['Q4', 2.6]];
  const BASE = 860, PX = 200, X0 = 430, STEP = 300, BW = 170;

  stage.style.background = 'radial-gradient(70% 60% at 50% 60%, #171c48 0%, var(--night) 72%)';
  const persp = el('div', 'abs', stage, { inset: 0, perspective: '1600px' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1000px 520px' });

  /* the original, ordinary chart slide */
  const orig = el('div', 'abs', persp, { left: '400px', top: '200px', width: '1120px', height: '630px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.5)', transformOrigin: '50% 100%' });
  const oi = el('img', 'abs', orig, { inset: 0, width: '100%', height: '100%' }); oi.src = ctx.asset('slide-4.png');
  const origTag = el('div', 'abs', stage, { left: '400px', top: '148px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--muted)' });
  origTag.textContent = 'SLIDE 4 · AS WRITTEN';

  /* the designed chart */
  const title = el('div', 'abs', cam, { left: '150px', top: '110px', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' });
  title.textContent = 'Quarterly revenue';
  const tag = el('div', 'abs', cam, { left: '154px', top: '200px', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: 'var(--muted)' });
  tag.textContent = 'EXAMPLE DATA · $M';
  const floor = el('div', 'abs', cam, { left: '330px', width: '1300px', top: BASE + 'px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)' });
  const grid = [1, 2].map((v) => el('div', 'abs', cam, { left: '360px', width: '1240px', top: BASE - v * PX + 'px', height: '1px', background: 'rgba(255,255,255,.06)' }));

  const cols = DATA.map(([q, v], i) => {
    const x = X0 + i * STEP, h = v * PX;
    const bar = el('div', 'abs', cam, { left: x + 'px', top: BASE - h + 'px', width: BW + 'px', height: h + 'px', borderRadius: '14px 14px 4px 4px', transformOrigin: '50% 100%',
      background: 'linear-gradient(180deg, #8f75ff 0%, #5b3df0 70%, #3a27a8 100%)', boxShadow: '0 0 40px rgba(109,74,255,.35), inset 0 1px 0 rgba(255,255,255,.4)' });
    const refl = el('div', 'abs', cam, { left: x + 'px', top: BASE + 6 + 'px', width: BW + 'px', height: h * 0.35 + 'px', borderRadius: '4px', transformOrigin: '50% 0%', background: 'linear-gradient(180deg, rgba(109,74,255,.28), transparent)', filter: 'blur(3px)' });
    const lab = el('div', 'abs', cam, { left: x + 'px', width: BW + 'px', top: BASE + 24 + 'px', textAlign: 'center', font: '700 30px/1 Inter', color: 'rgba(255,255,255,.65)' }); lab.textContent = q;
    const num = el('div', 'abs', cam, { left: x - 40 + 'px', width: BW + 80 + 'px', top: BASE - h - 66 + 'px', textAlign: 'center', font: '800 46px/1 Inter', letterSpacing: '-.02em', color: '#fff', fontVariantNumeric: 'tabular-nums' });
    return { bar, refl, lab, num, v, x, h, val: { n: 0 } };
  });
  const q4 = cols[3];
  const hot = el('div', 'abs', cam, { left: q4.x + 'px', top: BASE - q4.h + 'px', width: BW + 'px', height: q4.h + 'px', borderRadius: '14px 14px 4px 4px', transformOrigin: '50% 100%', background: 'linear-gradient(180deg, #ffb199 0%, #ff6b4a 55%, #d8432a 100%)', boxShadow: '0 0 90px rgba(255,107,74,.75)', opacity: 0 });

  // growth arc Q1 -> Q4 and callout
  const arc = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const a0 = [X0 + BW / 2, BASE - cols[0].h - 90], a1 = [q4.x - 34, BASE - q4.h - 40];
  arc.innerHTML = `<svg width="1920" height="1080"><path id="arc" d="M${a0[0]} ${a0[1]} Q ${(a0[0] + a1[0]) / 2 - 80} ${a1[1] - 120}, ${a1[0]} ${a1[1]}" fill="none" stroke="#ff8f72" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 16"/>
    <path id="head" d="M${a1[0] - 30} ${a1[1] - 8} L ${a1[0]} ${a1[1]} L ${a1[0] - 4} ${a1[1] - 32}" fill="none" stroke="#ff8f72" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  gsap.set(arc, { clipPath: `inset(0px ${1920 - a0[0] + 10}px 0px 0px)` });
  const callout = el('div', 'abs', cam, { left: '1180px', top: '52px', textAlign: 'right', width: '600px', transformOrigin: '70% 60%' });
  const big = el('div', '', callout, { font: '900 168px/0.9 Inter Display, Inter', letterSpacing: '-.05em', background: 'linear-gradient(100deg, #ffd0c2, #ff6b4a)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' });
  big.textContent = '+117%';
  const yoy = el('div', '', callout, { font: '600 30px/1.2 Inter', color: 'rgba(255,255,255,.8)', marginTop: '6px' }); yoy.textContent = 'Q4 vs Q1';
  const burst = el('div', 'abs', cam, { left: q4.x + BW / 2 - 120 + 'px', top: BASE - q4.h - 120 + 'px', width: '240px', height: '240px', borderRadius: '50%', border: '6px solid #ff6b4a', opacity: 0 });
  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 40% at 73% 35%, rgba(255,140,110,.55), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.07 });
  ctx.onFrame(() => cols.forEach((c) => { c.num.textContent = '$' + c.val.n.toFixed(1) + 'M'; }));

  /* ---- timeline ---- */
  gsap.set([title, tag, floor, ...grid, ...cols.flatMap((c) => [c.bar, c.refl, c.lab, c.num])], { opacity: 0 });
  gsap.set(cols.flatMap((c) => [c.bar, c.refl]), { scaleY: 0 });
  gsap.set([orig, origTag], { filter: 'brightness(1) blur(0px)' });
  tl.from(orig, { y: 50, opacity: 0, duration: 0.7 }, 0.05);
  tl.from(origTag, { opacity: 0, duration: 0.5 }, 0.3);
  // "flat": the chart literally lies down
  tl.to(orig, { rotationX: 62, y: 110, filter: 'brightness(.7) blur(0px)', duration: 0.9, ease: 'power3.inOut' }, flat - 0.1);
  // "moment": it sinks away, the stage takes over
  tl.to([orig, origTag], { opacity: 0, y: '+=120', filter: 'brightness(.3) blur(6px)', duration: 0.7, ease: 'power2.in' }, moment - 0.25);
  tl.to([floor, ...grid], { opacity: 1, duration: 0.6 }, moment);
  tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' }, moment);
  tl.to(tag, { opacity: 1, duration: 0.5 }, moment + 0.3);
  tl.to(cols.map((c) => c.lab), { opacity: 1, duration: 0.4, stagger: 0.06 }, moment + 0.2);

  // "numbers build": columns + counters, one by one
  cols.forEach((c, i) => {
    const t = build - 0.15 + i * 0.32;
    tl.to([c.bar, c.refl], { opacity: 1, scaleY: 1, duration: 0.85, ease: 'back.out(1.35)' }, t);
    tl.to(c.num, { opacity: 1, duration: 0.3 }, t + 0.1);
    tl.fromTo(c.num, { y: c.h * 0.9 }, { y: 0, duration: 0.85, ease: 'back.out(1.35)', immediateRender: false }, t);
    tl.to(c.val, { n: c.v, duration: 0.85, ease: 'power2.out' }, t);
  });

  // "result lands"
  tl.to(arc, { clipPath: 'inset(0px 0px 0px 0px)', duration: Math.max(0.5, lands - (build + 1.3)), ease: 'power2.inOut' }, build + 1.3);
  tl.to(hot, { opacity: 1, duration: 0.25 }, lands);
  tl.to(cols.slice(0, 3).flatMap((c) => [c.bar, c.refl, c.num]), { opacity: 0.35, duration: 0.5 }, lands);
  tl.fromTo(callout, { scale: 2.2, opacity: 0, rotation: -4 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'power4.in' }, lands - 0.38);
  tl.to(callout, { y: 6, duration: 0.08, yoyo: true, repeat: 1 }, lands + 0.07);
  tl.fromTo(burst, { scale: 0.4, opacity: 1 }, { scale: 2.2, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, lands);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, lands);
  tl.to(cam, { scale: 1.045, duration: ctx.dur - lands, ease: 'power1.inOut' }, lands);
  tl.to(hot, { boxShadow: '0 0 140px rgba(255,107,74,.95)', duration: 0.6, yoyo: true, repeat: 1 }, said);
});

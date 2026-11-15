/* Scene 3 — "When in doubt, use a bar chart. And sometimes the best chart is no chart at all,
 * just forty hours a month in large type."
 * Storyboard: night stage. A small grey bar chart builds off-centre (left third) on "bar chart".
 * On "no chart at all" the bars collapse into the baseline and dissolve. On "forty hours a month"
 * a huge "40 hours/month" snaps in at 160px in paper white, "40" in signal orange.
 * Camera holds wide with generous negative space; only a slow, calm push-in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const barW = ctx.at(0, 'bar'), noW = ctx.at(1, 'no'), allW = ctx.at(1, 'all,');
  const fortyW = ctx.at(1, 'forty'), hoursW = ctx.at(1, 'hours'), monthW = ctx.at(1, 'month');

  stage.style.background = 'radial-gradient(60% 55% at 50% 48%, #1a2335 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });

  /* soft ambient light behind the eventual number */
  const glow = el('div', 'abs', cam, { left: '460px', top: '240px', width: '1000px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(255,90,60,.16), transparent)', opacity: 0 });

  /* ---- small grey bar chart, off-centre ---- */
  const CX = 300, BASE = 760, BW = 70, GAP = 34;
  const H = [320, 250, 200, 140, 90]; // illustrative shape only, no data claimed
  const chart = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const tag = el('div', 'abs', chart, { left: CX + 'px', top: '330px', font: '600 22px/1 ui-monospace, Menlo, monospace',
    letterSpacing: '.16em', color: 'var(--grey)' });
  tag.textContent = 'WHEN IN DOUBT';
  const baseW = H.length * (BW + GAP) - GAP + 40;
  const base = el('div', 'abs', chart, { left: CX - 20 + 'px', top: BASE + 'px', width: baseW + 'px', height: '3px',
    background: 'rgba(163,169,179,.55)', borderRadius: '2px', transformOrigin: '0% 50%' });
  const bars = H.map((h, i) => el('div', 'abs', chart, {
    left: CX + i * (BW + GAP) + 'px', top: BASE - h + 'px', width: BW + 'px', height: h + 'px',
    borderRadius: '8px 8px 2px 2px', transformOrigin: '50% 100%',
    background: 'linear-gradient(180deg, #b5bac3 0%, #8e949f 100%)',
    boxShadow: '0 20px 50px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.35)' }));
  const label = el('div', 'abs', chart, { left: CX + 'px', top: BASE + 30 + 'px', font: '800 44px/1 Inter Display, Inter',
    letterSpacing: '-.03em', color: 'var(--mist)' });
  label.textContent = 'Bar chart';

  /* ---- the big number ---- */
  const hero = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '440px', textAlign: 'center', whiteSpace: 'nowrap',
    font: '900 160px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)' });
  const n40 = el('span', '', hero, { display: 'inline-block', color: 'var(--signal)', textShadow: '0 0 60px rgba(255,90,60,.45)' });
  n40.textContent = '40';
  const sp = el('span', '', hero, { display: 'inline-block', width: '0.28em' });
  const hrs = el('span', '', hero, { display: 'inline-block' }); hrs.textContent = 'hours';
  const mon = el('span', '', hero, { display: 'inline-block', color: 'var(--grey)' }); mon.textContent = '/month';
  const under = el('div', 'abs', cam, { left: '860px', top: '640px', width: '200px', height: '4px', borderRadius: '2px',
    background: 'var(--signal)', transformOrigin: '50% 50%' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(bars, { scaleY: 0, opacity: 1 });
  gsap.set(chart, { filter: 'blur(0px)' });
  gsap.set([n40, hrs, mon], { opacity: 0 });
  gsap.set(under, { scaleX: 0 });

  // opening: stage is already set
  tl.fromTo(base, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.out' }, 0.05);
  tl.fromTo(tag, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.7 }, 0.15);

  // "bar chart": bars build
  tl.to(bars, { scaleY: 1, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.07 }, barW - 0.15);
  tl.fromTo(label, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, barW + 0.1);

  // "no chart at all": collapse and dissolve
  tl.to(bars, { scaleY: 0.02, duration: 0.5, ease: 'power3.in', stagger: 0.05 }, noW - 0.05);
  tl.to([label, tag], { opacity: 0, y: -10, duration: 0.45, ease: 'power2.in' }, noW);
  tl.to(chart, { opacity: 0, filter: 'blur(10px)', duration: 0.6, ease: 'power2.in' }, allW - 0.05);

  // "forty hours a month": the number snaps in
  tl.fromTo(n40, { opacity: 0, scale: 1.6, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, fortyW - 0.08);
  tl.to(glow, { opacity: 1, duration: 1.2, ease: 'power2.out' }, fortyW);
  tl.fromTo(hrs, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)', immediateRender: false }, hoursW - 0.05);
  tl.fromTo(mon, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)', immediateRender: false }, monthW - 0.05);
  tl.to(under, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, monthW + 0.25);

  // camera: calm, continuous push-in, never wandering
  tl.fromTo(cam, { scale: 1 }, { scale: 1.025, duration: fortyW, ease: 'none', immediateRender: false }, 0);
  tl.to(cam, { scale: 1.06, duration: ctx.dur - fortyW, ease: 'power1.out' }, fortyW);
});

/* Scene 4: "Here's the biggest improvement you can make: grey everything, and colour only the one thing
 * that carries your message. Then label it directly."
 * Storyboard: Paper stage. A rainbow bar chart of five quarters builds. On "grey everything" every bar
 * drains to grey in a left-to-right wave. On "colour only the one thing" the last bar fills signal orange
 * from the bottom, and the camera pushes in toward it. On "label it directly" a small leader line draws
 * out and "Q4" writes itself beside the bar. The headline "Grey everything, colour one thing" sits
 * top-left at 96px. Bars are illustrative heights only, with no invented numbers. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tGrey = W(0, 'grey', 2.7), tEvery = W(0, 'everything', 3.04), tColour = W(0, 'colour', 3.84),
        tOne = W(0, 'one', 4.61), tMsg = W(0, 'message', 5.74), tLabel = W(1, 'label', 7.31), tDirect = W(1, 'directly', 7.73);

  stage.style.background = 'radial-gradient(80% 70% at 70% 60%, #FFFFFF 0%, var(--paper) 55%, #ECE8DF 100%)';

  /* soft light layer */
  el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 35% at 78% 62%, rgba(255,90,60,.0), transparent)', pointerEvents: 'none' });
  const warm = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 32% at 77% 60%, rgba(255,90,60,.16), transparent 70%)', opacity: 0 });

  /* camera holds the chart */
  const BASE = 930, X0 = 380, STEP = 250, BW = 170;
  const HS = [210, 270, 330, 400, 500];
  const lastX = X0 + 4 * STEP, lastTop = BASE - HS[4];
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: `${lastX + BW / 2}px ${BASE - 220}px` });

  const floor = el('div', 'abs', cam, { left: '320px', width: '1340px', top: BASE + 'px', height: '3px', background: '#C9CDD4', borderRadius: '2px', transformOrigin: '0% 50%' });

  const RAINBOW = ['#4E79F5', '#F5B83D', '#9B5DE5', '#2BB3A3', '#E84393'];
  const GREY = '#BCC1C9';
  const bars = HS.map((h, i) => {
    const x = X0 + i * STEP;
    const b = el('div', 'abs', cam, { left: x + 'px', top: BASE - h + 'px', width: BW + 'px', height: h + 'px', borderRadius: '12px 12px 3px 3px',
      background: RAINBOW[i], transformOrigin: '50% 100%', overflow: 'hidden', boxShadow: '0 24px 50px rgba(26,34,51,.10)' });
    return b;
  });
  const last = bars[4];
  const fill = el('div', 'abs', last, { inset: 0, background: 'linear-gradient(180deg, #FF8A6E 0%, #FF5A3C 45%, #E6452A 100%)', transformOrigin: '50% 100%' });
  const sheen = el('div', 'abs', last, { left: 0, right: 0, top: 0, height: '40%', background: 'linear-gradient(180deg, rgba(255,255,255,.28), transparent)', opacity: 0 });

  /* direct label */
  const lead = el('div', 'abs', cam, { left: lastX + BW + 14 + 'px', top: lastTop + 46 + 'px', width: '56px', height: '4px', borderRadius: '2px', background: 'var(--signal)', transformOrigin: '0% 50%' });
  const lab = el('div', 'abs', cam, { left: lastX + BW + 84 + 'px', top: lastTop + 12 + 'px', font: '800 68px/1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--signal)', whiteSpace: 'nowrap' });
  const labChars = ctx.split(lab, 'Q4', 'char');

  /* headline (outside camera so it never drifts off frame) */
  const head = el('div', 'abs', stage, { left: '120px', top: '96px', width: '1300px', font: '800 96px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  const l1 = el('div', '', head, {}); l1.textContent = 'Grey everything,';
  const l2 = el('div', '', head, {});
  const l2a = el('span', '', l2, {}); l2a.textContent = 'colour ';
  const l2b = el('span', '', l2, { color: 'var(--ink)' }); l2b.textContent = 'one thing';
  const kicker = el('div', 'abs', stage, { left: '124px', top: '322px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--grey)' });
  kicker.textContent = 'RULE · ONE ACCENT';

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  gsap.set(bars, { scaleY: 0 });
  gsap.set(fill, { scaleY: 0 });
  gsap.set(lead, { scaleX: 0 });
  gsap.set(labChars, { opacity: 0, y: 18 });
  gsap.set(cam, { scale: 1 });

  tl.from(floor, { scaleX: 0, duration: 0.8, ease: 'power3.out' }, 0.05);
  tl.to(bars, { scaleY: 1, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.09 }, 0.15);
  tl.from(l1, { y: 40, opacity: 0, duration: 0.7 }, 0.3);
  tl.from(l2, { y: 40, opacity: 0, duration: 0.7 }, 0.45);
  tl.from(kicker, { opacity: 0, duration: 0.6 }, 0.8);

  // slow drift while the problem chart sits there
  tl.to(cam, { scale: 1.02, duration: Math.max(1, tOne - 0.2), ease: 'none' }, 0);

  // "grey everything": left-to-right drain
  const drain = Math.max(0.08, Math.min(0.14, (tEvery + 0.4 - tGrey) / 5));
  bars.forEach((b, i) => {
    tl.to(b, { backgroundColor: GREY, boxShadow: '0 18px 40px rgba(26,34,51,.06)', duration: 0.55, ease: 'power2.inOut' }, tGrey - 0.05 + i * drain);
  });

  // "colour only the one thing": last bar fills orange, headline accent
  tl.to(fill, { scaleY: 1, duration: 0.8, ease: 'power3.out' }, tColour);
  tl.to(sheen, { opacity: 1, duration: 0.6 }, tColour + 0.3);
  tl.to(last, { boxShadow: '0 0 70px rgba(255,90,60,.45), 0 24px 50px rgba(255,90,60,.25)', duration: 0.8 }, tColour + 0.1);
  tl.to(l2b, { color: '#FF5A3C', duration: 0.5, ease: 'power2.out' }, tColour + 0.2);
  tl.to(warm, { opacity: 1, duration: 1.0 }, tColour + 0.2);
  tl.to(bars.slice(0, 4), { backgroundColor: '#CDD1D7', duration: 0.6 }, tOne);

  // camera push toward the one bar
  tl.to(cam, { scale: 1.1, x: -30, y: 10, duration: 1.6, ease: 'expo.inOut' }, tOne - 0.2);
  tl.to(cam, { scale: 1.13, duration: Math.max(1, ctx.dur - (tOne + 1.4)), ease: 'power1.out' }, tOne + 1.4);
  tl.to(last, { scaleY: 1.03, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, tMsg);

  // "label it directly"
  tl.to(lead, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, tLabel - 0.1);
  tl.to(labChars, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)', stagger: 0.1 }, tLabel + 0.1);
  tl.fromTo(lab, { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false, transformOrigin: '0% 50%' }, tDirect + 0.1);
});

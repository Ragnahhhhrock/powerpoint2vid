/* Scene 3: "If a slide needs more than about forty-five seconds, it's probably carrying two ideas. Split it."
 * Storyboard: close-up on the timeline. The camera pushes toward the 45s line, which thickens into a
 * coral wall on "forty-five". A slide bar overshoots the wall on "seconds" and glows warning red.
 * On "two ideas" two overlapping cards appear inside the bar. On "Split it" a clean vertical cut slices
 * the bar into two teal pieces that restack so both fit under the wall. "Split it." lands at 140px. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const safe = (i, words, fb) => {
    for (const w of words) {
      try { const v = ctx.at(i, w); if (typeof v === 'number' && isFinite(v)) return v; } catch (e) {}
    }
    return fb;
  };
  const tWall = Math.max(1.6, safe(0, ['forty-five', 'forty', '45'], 2.6));
  const tSec = Math.max(tWall + 0.4, safe(0, ['seconds', 'seconds,'], tWall + 0.6));
  const tTwo = Math.max(tSec + 0.4, safe(0, ['two'], 4.7));
  const tSplit = Math.max(tTwo + 0.6, safe(1, ['Split', 'split'], 6.03));

  const X0 = 200, PX = 24, AXIS = 820, BT = 520, BH = 110;
  const sx = (s) => X0 + s * PX;
  const WALLX = sx(45);
  const mono = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 62% 50%, #1d2540 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 40% at 67% 52%, rgba(239,99,81,.28), transparent 70%)', opacity: 0 });
  const calm = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(45% 45% at 35% 60%, rgba(46,196,182,.18), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: `${WALLX}px 600px` });

  /* axis */
  el('div', 'abs', cam, { left: X0 + 'px', width: sx(64) - X0 + 'px', top: AXIS + 'px', height: '2px', background: 'rgba(154,163,184,.45)' });
  [0, 15, 30, 45, 60].forEach((s) => {
    el('div', 'abs', cam, { left: sx(s) - 1 + 'px', top: AXIS - 10 + 'px', width: '2px', height: '20px', background: 'rgba(154,163,184,.6)' });
    const l = el('div', 'abs', cam, { left: sx(s) - 60 + 'px', width: '120px', top: AXIS + 26 + 'px', textAlign: 'center', font: mono, letterSpacing: '.1em', color: 'var(--mist)' });
    l.textContent = s + 's';
  });
  for (let s = 5; s < 64; s += 5) if (s % 15) el('div', 'abs', cam, { left: sx(s) + 'px', top: AXIS - 5 + 'px', width: '1px', height: '10px', background: 'rgba(154,163,184,.35)' });
  const head = el('div', 'abs', cam, { left: X0 + 'px', top: '440px', font: mono, letterSpacing: '.14em', color: 'var(--mist)' });
  head.textContent = 'ONE SLIDE ON SCREEN';

  /* the 45s wall */
  const wall = el('div', 'abs', cam, { left: WALLX - 8 + 'px', top: '440px', width: '16px', height: AXIS - 440 + 'px', borderRadius: '8px', background: 'linear-gradient(180deg, #ff8a78, var(--coral))', transformOrigin: '50% 100%', boxShadow: '0 0 0 rgba(239,99,81,0)' });
  const wallLab = el('div', 'abs', cam, { left: WALLX - 100 + 'px', width: '200px', top: '382px', textAlign: 'center', font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--mist)' });
  wallLab.textContent = '45s';

  /* the bar */
  const bar = el('div', 'abs', cam, { left: X0 + 'px', top: BT + 'px', width: '0px', height: BH + 'px', borderRadius: '14px', overflow: 'hidden', background: 'linear-gradient(180deg, #ffc56a, var(--amber))', boxShadow: '0 20px 50px rgba(0,0,0,.45)' });
  const barHot = el('div', 'abs', bar, { inset: 0, background: 'linear-gradient(180deg, #ff7a66, #d63f2e)', opacity: 0 });
  const tooLong = el('div', 'abs', cam, { left: sx(62) - 300 + 'px', width: '300px', top: '470px', textAlign: 'right', font: mono, letterSpacing: '.14em', color: 'var(--coral)', opacity: 0 });
  tooLong.textContent = 'TOO LONG';

  /* pieces after the split */
  const half = (sx(62) - X0) / 2, MID = X0 + half;
  const mkPiece = (x) => el('div', 'abs', cam, { left: x + 'px', top: BT + 'px', width: half - 6 + 'px', height: BH + 'px', borderRadius: '14px', background: 'linear-gradient(180deg, #ff7a66, #d63f2e)', opacity: 0, boxShadow: '0 20px 50px rgba(0,0,0,.45)' });
  const pL = mkPiece(X0), pR = mkPiece(MID + 6);

  /* two idea cards */
  const mkCard = (x, label, col) => {
    const c = el('div', 'abs', cam, { left: x + 'px', top: BT + 17 + 'px', width: '200px', height: '76px', borderRadius: '12px', background: 'var(--paper)', boxShadow: '0 12px 30px rgba(0,0,0,.35)', opacity: 0 });
    el('div', 'abs', c, { left: '16px', top: '18px', width: '14px', height: '40px', borderRadius: '4px', background: col });
    const t = el('div', 'abs', c, { left: '44px', top: '18px', font: '700 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--ink)' });
    t.textContent = label;
    el('div', 'abs', c, { left: '44px', top: '46px', width: '120px', height: '8px', borderRadius: '4px', background: 'rgba(27,34,53,.18)' });
    return c;
  };
  const cardA = mkCard(MID - 160, 'IDEA A', 'var(--teal)');
  const cardB = mkCard(MID - 40, 'IDEA B', 'var(--amber)');

  /* cut */
  const cut = el('div', 'abs', cam, { left: MID - 2 + 'px', top: BT - 50 + 'px', width: '4px', height: BH + 100 + 'px', background: '#fff', boxShadow: '0 0 24px #fff, 0 0 60px rgba(46,196,182,.9)', transformOrigin: '50% 0%', opacity: 0 });

  /* headline */
  const split = el('div', 'abs', stage, { left: '0px', width: '1920px', top: '110px', textAlign: 'center', font: '900 140px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', opacity: 0 });
  split.textContent = 'Split it.';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(wall, { scaleX: 0.25 });
  tl.from(cam, { opacity: 0.6, duration: 0.3, ease: 'none' }, 0);
  tl.to(cam, { scale: 1.08, duration: tSplit - 0.2, ease: 'power1.inOut' }, 0.1);

  // bar runs up to the line
  tl.to(bar, { width: WALLX - X0 + 'px', duration: tWall - 0.9, ease: 'power1.inOut' }, 0.9);
  // "forty-five": the line becomes a wall
  tl.to(wall, { scaleX: 1, boxShadow: '0 0 50px rgba(239,99,81,.8)', duration: 0.5, ease: 'back.out(2)' }, tWall - 0.15);
  tl.to(wallLab, { color: '#EF6351', scale: 1.15, duration: 0.4, ease: 'back.out(2)' }, tWall - 0.15);
  // "seconds": overshoot, glow red
  tl.to(bar, { width: sx(62) - X0 + 'px', duration: 0.75, ease: 'power2.out' }, tSec - 0.35);
  tl.to(barHot, { opacity: 1, duration: 0.3 }, tSec - 0.1);
  tl.to(bar, { boxShadow: '0 0 70px rgba(239,99,81,.75)', duration: 0.4 }, tSec - 0.1);
  tl.to(glow, { opacity: 1, duration: 0.6 }, tSec - 0.1);
  tl.to(wall, { x: 6, duration: 0.06, yoyo: true, repeat: 3, ease: 'none' }, tSec - 0.05);
  tl.fromTo(tooLong, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, tSec + 0.15);

  // "two ideas": overlapping cards
  tl.fromTo(cardA, { opacity: 0, scale: 0.6, rotation: -6 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, tTwo - 0.1);
  tl.fromTo(cardB, { opacity: 0, scale: 0.6, rotation: 6 }, { opacity: 1, scale: 1, rotation: 3, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, tTwo + 0.05);

  // "Split it": the cut
  const c0 = tSplit - 0.25;
  tl.set(cut, { opacity: 1, scaleY: 0 }, c0);
  tl.to(cut, { scaleY: 1, duration: 0.18, ease: 'power4.in' }, c0);
  tl.set(bar, { opacity: 0 }, c0 + 0.18);
  tl.set([pL, pR], { opacity: 1 }, c0 + 0.18);
  tl.to(cut, { opacity: 0, duration: 0.35 }, c0 + 0.22);
  tl.to(cam, { scale: 1, duration: 0.9, ease: 'expo.inOut' }, c0 + 0.1);
  tl.to(cam, { scale: 1.03, duration: ctx.dur - (c0 + 1), ease: 'power1.inOut' }, c0 + 1);
  tl.to([pL, pR], { background: 'linear-gradient(180deg, #5fe0d3, #2EC4B6)', boxShadow: '0 0 50px rgba(46,196,182,.45)', duration: 0.5 }, c0 + 0.2);
  tl.to(pL, { x: -6, duration: 0.25 }, c0 + 0.2);
  tl.to(pR, { x: X0 - (MID + 6), y: 140, duration: 0.7, ease: 'expo.inOut' }, c0 + 0.3);
  const centerX = X0 + (half - 6) / 2 - 100;
  tl.to(cardA, { x: centerX - (MID - 160) - 6, rotation: 0, duration: 0.7, ease: 'expo.inOut' }, c0 + 0.3);
  tl.to(cardB, { x: centerX - (MID - 40), y: 140, rotation: 0, duration: 0.7, ease: 'expo.inOut' }, c0 + 0.3);
  tl.to([barHot, glow, tooLong], { opacity: 0, duration: 0.5 }, c0 + 0.2);
  tl.to(calm, { opacity: 1, duration: 0.8 }, c0 + 0.3);
  tl.to(wall, { boxShadow: '0 0 16px rgba(239,99,81,.35)', duration: 0.6 }, c0 + 0.3);
  tl.to(head, { y: -10, duration: 0.5 }, c0 + 0.3);
  tl.fromTo(split, { opacity: 0, scale: 1.6, y: -10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power4.in', immediateRender: false }, tSplit - 0.15);
  tl.to(split, { y: 6, duration: 0.07, yoyo: true, repeat: 1 }, tSplit + 0.25);
});

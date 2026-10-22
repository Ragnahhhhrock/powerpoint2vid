/* Scene 0 — "Sunlight carries energy in tiny packets called photons. This is how a solar panel turns them into electricity."
 * Storyboard: dark sky; a sun rises from below frame with a bloom. On "photons" streaks of light rain
 * diagonally onto a solar panel that tilts into view in 3D; on "electricity" the panel's cells light up
 * row by row and the title typesets over it. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const sunlight = ctx.at(0, 'sunlight'), photons = ctx.at(0, 'photons'), panel = ctx.at(1, 'solar panel'), elec = ctx.at(1, 'electricity');
  const r = ctx.rand(7);

  stage.style.background = 'linear-gradient(180deg, #02060f 0%, #071730 55%, #12284a 78%, #3a2a3a 100%)';
  const sky = el('div', 'abs', stage, { inset: 0 });
  const stars = Array.from({ length: 90 }, () => el('div', 'abs', sky, { left: r() * 1920 + 'px', top: r() * 640 + 'px', width: '3px', height: '3px', borderRadius: '50%', background: '#cfe3ff', opacity: 0.2 + r() * 0.6 }));
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '60% 60%' });

  /* sun with rotating rays and bloom */
  const sunWrap = el('div', 'abs', cam, { left: '230px', top: '330px', width: '420px', height: '420px' });
  const rays = el('div', 'abs', sunWrap, { left: '-290px', top: '-290px', width: '1000px', height: '1000px', borderRadius: '50%', opacity: 0.55,
    background: 'repeating-conic-gradient(from 0deg, rgba(255,190,90,.20) 0deg 4deg, transparent 4deg 15deg)', WebkitMaskImage: 'radial-gradient(circle, #000 18%, transparent 62%)', maskImage: 'radial-gradient(circle, #000 18%, transparent 62%)' });
  const bloom = el('div', 'abs', sunWrap, { left: '-380px', top: '-380px', width: '1180px', height: '1180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,170,60,.55) 0%, rgba(255,120,30,.18) 32%, transparent 62%)' });
  const sun = el('div', 'abs', sunWrap, { inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 42% 38%, #fff6d8 0%, #ffd27a 30%, #ffb547 58%, #ff7a1a 100%)', boxShadow: '0 0 120px 30px rgba(255,160,60,.65)' });
  const horizon = el('div', 'abs', cam, { left: '-100px', right: '-100px', top: '760px', bottom: '-200px', background: 'linear-gradient(180deg, #0b1a2b 0%, #050d18 100%)', borderTop: '2px solid rgba(255,181,71,.35)' });
  const haze = el('div', 'abs', cam, { left: 0, right: 0, top: '600px', height: '200px', background: 'linear-gradient(180deg, transparent, rgba(255,140,50,.18), transparent)' });

  /* 3D panel */
  const persp = el('div', 'abs', cam, { left: '980px', top: '410px', width: '760px', height: '470px', perspective: '1400px' });
  const pnl = el('div', 'abs', persp, { inset: 0, borderRadius: '10px', background: '#0d1f3d', border: '10px solid #c9d3e0', boxShadow: '0 60px 90px rgba(0,0,0,.6)', transformOrigin: '50% 100%', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', gap: '5px', padding: '6px', overflow: 'hidden' });
  const cells = Array.from({ length: 60 }, () => el('div', '', pnl, { position: 'relative', borderRadius: '3px', background: 'linear-gradient(135deg, #1d3f74 0%, #16325c 55%, #10264a 100%)' }));
  const cellGlow = cells.map((c) => el('div', 'abs', c, { inset: 0, borderRadius: '3px', background: 'linear-gradient(135deg, #b9e3ff 0%, #3aa0ff 60%, #1d6fd6 100%)', boxShadow: '0 0 18px rgba(58,160,255,.9)', opacity: 0 }));
  const sheen = el('div', 'abs', pnl, { top: '-20%', bottom: '-20%', width: '22%', left: '-30%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent)', transform: 'skewX(-18deg)' });
  const leg = el('div', 'abs', cam, { left: '1340px', top: '820px', width: '14px', height: '120px', background: '#5e6b7d' });

  /* photon streaks: from sun towards the panel */
  const SX = 440, SY = 540;
  const streaks = Array.from({ length: 48 }, (_, i) => {
    const tx = 1060 + r() * 600, ty = 470 + r() * 330;
    const ang = Math.atan2(ty - SY, tx - SX) * 180 / Math.PI;
    const s = el('div', 'abs', cam, { left: SX + 'px', top: SY + 'px', width: '240px', height: '6px', marginTop: '-3px', borderRadius: '2px', transformOrigin: '100% 50%', rotate: ang + 'deg',
      background: 'linear-gradient(90deg, transparent, rgba(255,214,120,.95) 70%, #fff)', boxShadow: '0 0 12px rgba(255,190,80,.9)', opacity: 0 });
    const hit = el('div', 'abs', cam, { left: tx - 22 + 'px', top: ty - 22 + 'px', width: '44px', height: '44px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,200,.95), rgba(255,180,60,0) 70%)', opacity: 0 });
    return { s, hit, tx, ty, i };
  });
  const label = el('div', 'abs', cam, { left: '700px', top: '330px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: '#ffd27a', whiteSpace: 'nowrap' });
  label.textContent = 'PHOTONS  →';

  /* title */
  const kicker = el('div', 'abs', stage, { left: '120px', top: '120px', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'var(--muted)' });
  kicker.textContent = 'PHYSICS 101 · WEEK 6';
  const title = el('div', 'abs', stage, { left: '112px', top: '162px', font: '900 116px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', whiteSpace: 'nowrap' });
  const tw = ctx.split(title, 'How solar panels work', 'word');
  tw[1].style.background = 'linear-gradient(100deg, #ffe2a3, #ffb547 50%, #ff7a1a)'; tw[1].style.webkitBackgroundClip = 'text'; tw[1].style.backgroundClip = 'text'; tw[1].style.color = 'transparent';
  const zap = el('div', 'abs', stage, { left: '1460px', top: '930px', font: '700 30px/1 Inter', color: '#9fd2ff', whiteSpace: 'nowrap', textShadow: '0 0 20px rgba(58,160,255,.8)' });
  zap.textContent = '⚡ electricity';

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  gsap.set([label, zap], { opacity: 0 });
  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.08 }, { scale: 1, duration: ctx.dur, ease: 'power1.out' }, 0);
  stars.forEach((s, i) => tl.to(s, { opacity: 0.1, duration: 0.6 + (i % 5) * 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, (i % 7) * 0.3));
  tl.to(sky, { opacity: 0.35, duration: 4, ease: 'power1.in' }, 1);
  tl.fromTo(sunWrap, { y: 520 }, { y: 0, duration: 3.2, ease: 'expo.out' }, 0.05);
  tl.fromTo(bloom, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' }, sunlight);
  tl.to(rays, { rotation: 40, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(haze, { opacity: 0, duration: 2 }, 0.6);
  tl.from(kicker, { opacity: 0, x: -20, duration: 0.6 }, 0.25);

  // panel tilts in
  gsap.set(pnl, { rotationX: 78, rotationY: -12, opacity: 0 });
  tl.to(pnl, { rotationX: 38, rotationY: -14, opacity: 1, duration: 1.6, ease: 'expo.out' }, 0.6);
  tl.from(leg, { scaleY: 0, transformOrigin: '50% 0%', duration: 0.6 }, 0.9);
  tl.to(pnl, { rotationX: 30, rotationY: -8, duration: ctx.dur - 2.2, ease: 'sine.inOut' }, 2.2);

  // photons rain in
  tl.fromTo(label, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, immediateRender: false }, photons - 0.1);
  streaks.forEach((k) => {
    const t = photons - 0.25 + k.i * 0.1;
    tl.set(k.s, { opacity: 1 }, t);
    tl.fromTo(k.s, { x: 0, y: 0 }, { x: k.tx - SX, y: k.ty - SY, duration: 0.55, ease: 'power1.in', immediateRender: false }, t);
    tl.set(k.s, { opacity: 0 }, t + 0.55);
    tl.fromTo(k.hit, { opacity: 1, scale: 0.4 }, { opacity: 0, scale: 1.6, duration: 0.45, ease: 'power2.out', immediateRender: false }, t + 0.55);
  });

  // title typesets on beat 2
  tl.from(tw, { yPercent: 90, opacity: 0, filter: 'blur(12px)', duration: 0.6, stagger: 0.09, ease: 'back.out(1.6)' }, ctx.beat(1) - 0.15);
  tl.fromTo(sheen, { left: '-30%' }, { left: '120%', duration: 1.0, ease: 'power2.inOut', immediateRender: false }, panel - 0.1);

  // electricity: cells light row by row
  for (let row = 0; row < 6; row++) {
    tl.to(cellGlow.slice(row * 10, row * 10 + 10), { opacity: 1, duration: 0.25, stagger: 0.03, ease: 'power2.out' }, elec - 0.55 + row * 0.11);
  }
  tl.to(pnl, { boxShadow: '0 60px 90px rgba(0,0,0,.6), 0 0 120px rgba(58,160,255,.55)', duration: 0.6 }, elec + 0.1);
  tl.fromTo(zap, { opacity: 0, y: 20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(2)', immediateRender: false }, elec + 0.15);
});

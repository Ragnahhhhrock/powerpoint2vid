/* Scene 5 — "Keep confidential videos in approved internal storage."
 * Storyboard: hard cut to a night stage, tight close-up. A single glowing video tile sits left of a
 * solid ink vault. On "confidential" a coral lock snaps onto the tile. The camera makes one lateral
 * pan as the tile slides into the vault. On "approved" the door swings shut and "Approved storage only"
 * lands at 120px; on "storage" a mint check pops on the door. Long hold on the locked vault, slow push-in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (w, fb) => { const v = ctx.at(0, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const conf = T('confidential', 1.3), appr = T('approved', 2.5), stor = T('storage', 3.3);

  stage.style.background = 'radial-gradient(60% 55% at 55% 42%, #1c2740 0%, var(--night) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1300px 470px' });
  const glow = el('div', 'abs', cam, { left: '880px', top: '120px', width: '900px', height: '700px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(79,163,255,.18), transparent)', opacity: 0.6 });

  /* vault */
  const VX = 1060, VY = 160, VW = 540, VH = 540;
  const vault = el('div', 'abs', cam, { left: VX + 'px', top: VY + 'px', width: VW + 'px', height: VH + 'px', borderRadius: '34px',
    background: 'linear-gradient(160deg, #26314a 0%, var(--ink) 60%, #121a29 100%)',
    boxShadow: '0 60px 120px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.12), inset 0 0 0 2px rgba(255,255,255,.05)' });
  [[30, 30], [VW - 46, 30], [30, VH - 46], [VW - 46, VH - 46]].forEach(([x, y]) =>
    el('div', 'abs', vault, { left: x + 'px', top: y + 'px', width: '16px', height: '16px', borderRadius: '50%', background: '#3a4762', boxShadow: 'inset 0 2px 2px rgba(0,0,0,.5)' }));
  const SX = 70, SY = 110, SW = 400, SH = 260;
  el('div', 'abs', vault, { left: SX + 'px', top: SY + 'px', width: SW + 'px', height: SH + 'px', borderRadius: '18px',
    background: '#070b13', boxShadow: 'inset 0 10px 30px rgba(0,0,0,.9)' });
  const vlab = el('div', 'abs', vault, { left: 0, width: VW + 'px', top: '420px', textAlign: 'center',
    font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--mist)' });
  vlab.textContent = 'INTERNAL';

  /* tile */
  const TW = 340, TH = 200;
  const tX1 = VX + SX + (SW - TW) / 2, tY1 = VY + SY + (SH - TH) / 2;
  const tX0 = 280;
  const tile = el('div', 'abs', cam, { left: tX1 + 'px', top: tY1 + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '16px',
    background: 'linear-gradient(135deg, #2b6fd6 0%, #4FA3FF 55%, #8cc4ff 100%)',
    boxShadow: '0 0 60px rgba(79,163,255,.55), 0 30px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.5)' });
  el('div', 'abs', tile, { left: '138px', top: '62px', width: 0, height: 0, borderTop: '36px solid transparent', borderBottom: '36px solid transparent', borderLeft: '60px solid rgba(255,255,255,.95)' });
  el('div', 'abs', tile, { left: '22px', right: '22px', bottom: '20px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.3)' });
  el('div', 'abs', tile, { left: '22px', width: '120px', bottom: '20px', height: '8px', borderRadius: '4px', background: '#fff' });
  const lock = el('div', 'abs', tile, { right: '-34px', top: '-34px', width: '92px', height: '92px', borderRadius: '50%',
    background: 'var(--signal)', boxShadow: '0 0 40px rgba(255,107,74,.7), 0 10px 20px rgba(0,0,0,.4)' });
  lock.innerHTML = `<svg width="92" height="92" viewBox="0 0 92 92"><path d="M33 42 V33 a13 13 0 0 1 26 0 V42" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    <rect x="25" y="41" width="42" height="30" rx="6" fill="#fff"/><circle cx="46" cy="55" r="4.5" fill="var(--signal)"/></svg>`;

  /* door */
  const persp = el('div', 'abs', cam, { left: VX + SX - 10 + 'px', top: VY + SY - 10 + 'px', width: SW + 20 + 'px', height: SH + 20 + 'px', perspective: '1400px' });
  const door = el('div', 'abs', persp, { inset: 0, borderRadius: '20px', transformOrigin: '0% 50%',
    background: 'linear-gradient(150deg, #334061 0%, #222c42 70%)',
    boxShadow: '0 20px 50px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 0 3px rgba(255,255,255,.06)' });
  el('div', 'abs', door, { right: '34px', top: '110px', width: '16px', height: '60px', borderRadius: '8px', background: '#5a6a8c' });
  const check = el('div', 'abs', door, { left: '150px', top: '40px', width: '120px', height: '120px', borderRadius: '50%',
    background: 'var(--mint)', boxShadow: '0 0 60px rgba(61,214,165,.7)' });
  check.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120"><path id="ck" d="M36 62 L53 79 L86 44" fill="none" stroke="#0E1420" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="80" stroke-dashoffset="80"/></svg>`;
  const ck = check.querySelector('#ck');
  const ring = el('div', 'abs', cam, { left: VX + SX + 160 + 'px', top: VY + SY + 50 + 'px', width: '120px', height: '120px', borderRadius: '50%', border: '5px solid var(--mint)', opacity: 0 });

  /* headline */
  const head = el('div', 'abs', stage, { left: '80px', width: '1760px', top: '790px', textAlign: 'center',
    font: '800 120px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  head.textContent = 'Approved storage only';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(tile, { x: tX0 - tX1 });
  gsap.set(cam, { x: 260, scale: 1.06 });
  gsap.set(door, { rotationY: -108, opacity: 0.9 });
  gsap.set(check, { scale: 0, opacity: 0 });
  gsap.set(lock, { scale: 0, opacity: 0, rotation: -30 });
  gsap.set(head, { opacity: 0, y: 40 });

  tl.from(tile, { scale: 0.85, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' }, 0);
  tl.from([vault, persp], { opacity: 0, x: 60, duration: 0.5 }, 0.08);
  tl.to(tile, { x: tX0 - tX1 + 70, duration: Math.max(0.6, conf), ease: 'power1.inOut' }, 0.1);

  // "confidential": lock snaps on
  tl.to(lock, { scale: 1, opacity: 1, rotation: 0, duration: 0.4, ease: 'back.out(2.2)' }, conf - 0.08);
  tl.to(tile, { y: 6, duration: 0.07, yoyo: true, repeat: 1 }, conf + 0.02);

  // one decisive lateral pan as the tile slides into the vault
  const slideT = conf + 0.3, slideD = Math.max(0.5, appr - 0.15 - slideT);
  tl.to(tile, { x: 0, duration: slideD, ease: 'expo.inOut' }, slideT);
  tl.to(cam, { x: -120, duration: slideD + 0.2, ease: 'expo.inOut' }, slideT);

  // "approved": door shuts, headline lands
  tl.to(door, { rotationY: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.3)' }, appr - 0.15);
  tl.to(vault, { x: 4, duration: 0.06, yoyo: true, repeat: 1 }, appr + 0.25);
  tl.to(head, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, appr);

  // "storage": mint check
  tl.to(check, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, stor - 0.1);
  tl.to(ck, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, stor + 0.05);
  tl.fromTo(ring, { scale: 0.8, opacity: 0.9 }, { scale: 2.4, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, stor);
  tl.to(glow, { opacity: 1, background: 'radial-gradient(closest-side, rgba(61,214,165,.2), transparent)', duration: 0.8 }, stor);

  // long hold: slow push-in on the locked vault
  tl.to(cam, { scale: 1.12, duration: Math.max(0.5, ctx.dur - (appr + 0.2)), ease: 'power1.inOut' }, appr + 0.2);
  tl.to({}, { duration: 0.01 }, ctx.dur - 0.01);
});

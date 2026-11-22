/* Scene 3 — "To find space, delete repeated logos and decorative shapes first. Then move reminders into
 * your speaker notes, the single biggest source of new space in most decks."
 * Storyboard: night stage, a cramped paper slide mock-up sits centre. On "repeated logos" and
 * "decorative shapes" the logos and swooshes flick off one by one with small snaps. On "speaker notes"
 * the block of tiny detail text lifts off the slide and drops into a notes panel below, and the bullets
 * spread out into the room. On "biggest source" the emptied area glows faintly coral, labelled "New space".
 * Then margins widen: two blue guide lines appear and the remaining items snap into alignment. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const logos = T(0, 'logos', 2.4), shapes = T(0, 'shapes', 3.9);
  const notes = T(1, 'notes', 7.0), biggest = T(1, 'biggest', 8.4);
  const align = Math.min(biggest + 1.3, ctx.dur - 1.9);
  const MONO = '600 18px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #1c222c 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 420px' });

  /* ---- the slide ---- */
  const SX = 400, SY = 80, SW = 1120, SH = 630;
  const slide = el('div', 'abs', cam, { left: SX + 'px', top: SY + 'px', width: SW + 'px', height: SH + 'px', borderRadius: '10px',
    background: 'var(--paper)', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.05)' });
  const clip = el('div', 'abs', slide, { inset: 0, overflow: 'hidden', borderRadius: '10px' });

  // decorative swooshes
  const deco = el('div', 'abs', clip, { inset: 0 });
  deco.innerHTML = `<svg width="${SW}" height="${SH}">
    <path class="d" d="M-20 600 C 260 500, 520 660, 820 560 S 1100 520, 1160 470" fill="none" stroke="#3B6EF5" stroke-width="26" stroke-linecap="round" opacity=".55"/>
    <path class="d" d="M-20 640 C 300 560, 560 700, 1140 600" fill="none" stroke="#FF5A3C" stroke-width="14" stroke-linecap="round" opacity=".6"/>
    <circle class="d" cx="1110" cy="-10" r="120" fill="#3B6EF5" opacity=".18"/>
    <rect class="d" x="520" y="-40" width="40" height="200" fill="#FF5A3C" opacity=".25" transform="rotate(30 540 60)"/>
    <circle class="d" cx="560" cy="300" r="34" fill="none" stroke="#6B7280" stroke-width="4" stroke-dasharray="6 8" opacity=".5"/></svg>`;
  const decoParts = [...deco.querySelectorAll('.d')];
  decoParts.forEach((p) => gsap.set(p, { transformOrigin: '50% 50%' }));

  const title = el('div', 'abs', slide, { left: '30px', top: '22px', font: '800 46px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)', whiteSpace: 'nowrap', transformOrigin: '0 0' });
  title.textContent = 'Find space in a crowded deck';

  const BUL = ['Remove what doesn\u2019t help', 'Move detail into speaker notes', 'Set generous margins', 'Group with gaps, align to a few lines'];
  const bullets = BUL.map((t, i) => {
    const b = el('div', 'abs', slide, { left: '36px', top: 104 + i * 50 + 'px', font: '600 28px/1.1 Inter', letterSpacing: '-.01em', color: 'var(--ink)', whiteSpace: 'nowrap', transformOrigin: '0 50%' });
    b.innerHTML = `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#1A1D23;margin-right:16px;vertical-align:middle"></span>${t}`;
    return b;
  });

  // repeated logos
  const mkLogo = (x, y) => {
    const l = el('div', 'abs', slide, { left: x + 'px', top: y + 'px', height: '48px', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '8px', background: '#1A1D23', color: '#fff', font: '800 20px/1 Inter', letterSpacing: '.02em' });
    l.innerHTML = '<span style="width:22px;height:22px;border-radius:50%;background:#FF5A3C;display:inline-block"></span>ACME';
    return l;
  };
  const logoEls = [mkLogo(950, 24), mkLogo(30, 556), mkLogo(950, 556)];

  // tiny detail block
  const RX = 640, RY = 110;
  const detail = el('div', 'abs', slide, { left: RX + 'px', top: RY + 'px', width: '420px', padding: '18px 20px', borderRadius: '8px', background: '#ECE9E2', boxShadow: '0 0 0 rgba(0,0,0,0)' });
  const W = [0.95, 0.88, 0.97, 0.7, 0.92, 0.85, 0.96, 0.6, 0.9, 0.93, 0.8, 0.98, 0.72, 0.9, 0.65];
  W.forEach((w) => el('div', '', detail, { height: '9px', width: w * 100 + '%', background: '#9aa0aa', borderRadius: '3px', marginBottom: '13px' }));

  // glow for new space
  const glow = el('div', 'abs', slide, { left: '600px', top: '90px', width: '480px', height: '400px', borderRadius: '18px',
    background: 'radial-gradient(60% 60% at 50% 50%, rgba(255,90,60,.22), rgba(255,90,60,.06) 70%, transparent)', border: '2px dashed rgba(255,90,60,.55)', opacity: 0 });
  const glowLab = el('div', 'abs', glow, { left: 0, right: 0, top: '182px', textAlign: 'center', font: '700 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'var(--signal)' });
  glowLab.textContent = 'NEW SPACE';

  // guides
  const GX = 96, GY = 196;
  const gV = el('div', 'abs', slide, { left: GX - 1 + 'px', top: '-30px', width: '2px', height: SH + 60 + 'px', background: 'repeating-linear-gradient(180deg, #3B6EF5 0 10px, transparent 10px 18px)', transformOrigin: '50% 0', opacity: 0.9 });
  const gH = el('div', 'abs', slide, { left: '-30px', top: GY + 'px', width: SW + 60 + 'px', height: '2px', background: 'repeating-linear-gradient(90deg, #3B6EF5 0 10px, transparent 10px 18px)', transformOrigin: '0 50%', opacity: 0.9 });
  gsap.set([gV], { scaleY: 0 }); gsap.set([gH], { scaleX: 0 });

  /* ---- notes panel ---- */
  const NY = SY + SH + 34;
  const panel = el('div', 'abs', cam, { left: SX + 'px', top: NY + 'px', width: SW + 'px', height: '190px', borderRadius: '10px', background: 'var(--ink)', border: '1px solid rgba(255,255,255,.08)', boxShadow: '0 30px 70px rgba(0,0,0,.4)' });
  const pLab = el('div', 'abs', panel, { left: '30px', top: '24px', font: MONO, letterSpacing: '.18em', color: 'var(--slate)' });
  pLab.textContent = 'SPEAKER NOTES';
  const nLines = [0.82, 0.9, 0.7, 0.86, 0.55].map((w, i) => el('div', 'abs', panel, { left: '30px', top: 66 + i * 22 + 'px', width: w * 1040 + 'px', height: '9px', borderRadius: '3px', background: 'rgba(217,221,227,.55)', transformOrigin: '0 50%' }));

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.from(slide, { y: 40, opacity: 0, duration: 0.9 }, 0);
  tl.fromTo(cam, { scale: 1.02 }, { scale: 1, duration: notes - 0.6, ease: 'none' }, 0);

  // logos flick off one by one
  logoEls.forEach((l, i) => {
    const t = logos - 0.25 + i * 0.2;
    tl.to(l, { scale: 1.12, duration: 0.06, ease: 'power2.out' }, t);
    tl.to(l, { scale: 0, opacity: 0, duration: 0.16, ease: 'back.in(2.5)' }, t + 0.06);
  });
  // decorative shapes snap off
  decoParts.forEach((p, i) => {
    tl.to(p, { scale: 0, opacity: 0, duration: 0.18, ease: 'back.in(2.5)' }, shapes - 0.2 + i * 0.13);
  });

  // notes panel arrives, detail block lifts and drops into it
  gsap.set(panel, { opacity: 0, y: 30 });
  tl.to(panel, { opacity: 1, y: 0, duration: 0.7 }, notes - 0.9);
  tl.to(detail, { y: -14, scale: 1.04, boxShadow: '0 30px 60px rgba(0,0,0,.35)', duration: 0.35, ease: 'power2.out' }, notes - 0.3);
  tl.to(detail, { x: 30 - RX, y: SH + 34 + 40 - RY, scale: 0.35, opacity: 0, transformOrigin: '0 0', duration: 0.75, ease: 'power3.inOut' }, notes + 0.05);
  tl.from(nLines, { scaleX: 0, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }, notes + 0.55);

  // slide grows roomier
  bullets.forEach((b, i) => tl.to(b, { y: 40 + i * 28, scale: 1.12, duration: 1.0, ease: 'power3.out' }, notes + 0.6 + i * 0.05));
  tl.to(title, { y: 14, scale: 1.12, duration: 1.0 }, notes + 0.55);

  // "biggest source": coral glow on the new space
  tl.fromTo(glow, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', immediateRender: false }, biggest - 0.1);
  tl.from(glowLab, { opacity: 0, y: 10, duration: 0.6 }, biggest + 0.2);

  // margins expand, items align to two guides
  tl.to(gV, { scaleY: 1, duration: 0.6, ease: 'expo.inOut' }, align);
  tl.to(gH, { scaleX: 1, duration: 0.6, ease: 'expo.inOut' }, align + 0.1);
  tl.to(title, { x: GX - 30, y: 60, duration: 0.22, ease: 'power4.out' }, align + 0.55);
  bullets.forEach((b, i) => tl.to(b, { x: GX - 36, y: 140 + i * 34, duration: 0.22, ease: 'power4.out' }, align + 0.62 + i * 0.05));
  tl.to(cam, { scale: 1.035, duration: ctx.dur - align, ease: 'power1.inOut' }, align);
});

/* Scene 0 — "You've turned your deck into a video. Now it needs an audience, and where you share it
 * decides who watches to the end."
 * Storyboard: night stage, one paper-white video tile glows at centre with a coral play triangle (close-up, slow push-in).
 * On "audience" faint mist dots fade in around it like an empty crowd. On "share" the camera pulls wide with one
 * lateral pan, and three thin paths sweep from the tile to glowing nodes at the edges. On "watches … end" a coral
 * progress bar fills along the tile's bottom edge and the kept title "Where to share your video" lands at 120px above. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const safe = (v, d) => (typeof v === 'number' && isFinite(v) ? v : d);
  const tVideo = safe(ctx.at(0, 'video'), 2.2);
  const tAud = safe(ctx.at(1, 'audience'), 3.7);
  const tShare = safe(ctx.at(1, 'share'), 4.6);
  const tWatch = safe(ctx.at(1, 'watches'), 6.2);
  const tEnd = safe(ctx.at(1, 'end'), 7.0);

  stage.style.background = 'radial-gradient(60% 55% at 50% 56%, #1c2740 0%, var(--night) 70%)';

  const cam = el('div', 'abs', stage, { left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: '960px 600px' });

  /* tile geometry (camera space) */
  const TW = 640, TH = 360, TX = 960 - TW / 2, TY = 420, CX = 960, CY = TY + TH / 2;

  /* soft halo behind tile */
  const halo = el('div', 'abs', cam, { left: CX - 520 + 'px', top: CY - 380 + 'px', width: '1040px', height: '760px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(255,107,74,.22), rgba(79,163,255,.08) 55%, transparent)', opacity: 0 });

  /* crowd dots */
  const R = ctx.rand(7);
  const dots = [];
  for (let i = 0; i < 260 && dots.length < 90; i++) {
    const x = 90 + R() * 1740, y = 360 + R() * 660;
    if (x > TX - 70 && x < TX + TW + 70 && y > TY - 70 && y < TY + TH + 70) continue;
    const s = 8 + R() * 10;
    const d = el('div', 'abs', cam, { left: x + 'px', top: y + 'px', width: s + 'px', height: s + 'px', borderRadius: '50%', background: 'var(--mist)', opacity: 0 });
    d._o = 0.18 + R() * 0.25; d._d = Math.hypot(x - CX, y - CY);
    dots.push(d);
  }
  dots.sort((a, b) => a._d - b._d);

  /* paths */
  const ends = [[150, 860, '#4FA3FF'], [1770, 860, '#3DD6A5'], [960, 1020, '#FF6B4A']];
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const pd = [
    `M${CX} ${CY} C ${CX - 420} ${CY - 40}, 380 ${CY + 40}, ${ends[0][0]} ${ends[0][1]}`,
    `M${CX} ${CY} C ${CX + 420} ${CY - 40}, 1540 ${CY + 40}, ${ends[1][0]} ${ends[1][1]}`,
    `M${CX} ${CY} C ${CX + 40} ${CY + 200}, ${CX - 40} 900, ${ends[2][0]} ${ends[2][1]}`,
  ];
  svgWrap.innerHTML = `<svg width="1920" height="1080">${pd.map((d, i) =>
    `<path d="${d}" pathLength="1" fill="none" stroke="${ends[i][2]}" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1" opacity=".75"/>`).join('')}</svg>`;
  const paths = [...svgWrap.querySelectorAll('path')];
  const nodes = ends.map(([x, y, c]) => {
    const n = el('div', 'abs', cam, { left: x - 16 + 'px', top: y - 16 + 'px', width: '32px', height: '32px', borderRadius: '50%', background: c, boxShadow: `0 0 30px ${c}, 0 0 70px ${c}`, opacity: 0 });
    const ring = el('div', 'abs', cam, { left: x - 40 + 'px', top: y - 40 + 'px', width: '80px', height: '80px', borderRadius: '50%', border: `3px solid ${c}`, opacity: 0 });
    return { n, ring };
  });

  /* the tile */
  const tile = el('div', 'abs', cam, { left: TX + 'px', top: TY + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '22px', overflow: 'hidden',
    background: 'linear-gradient(160deg, #fffdf8 0%, var(--paper) 60%, #e9e3d6 100%)',
    boxShadow: '0 0 0 1px rgba(255,255,255,.5), 0 40px 120px rgba(0,0,0,.6), 0 0 90px rgba(246,243,236,.25)' });
  // faint slide content suggestion
  el('div', 'abs', tile, { left: '48px', top: '46px', width: '230px', height: '18px', borderRadius: '9px', background: 'rgba(26,34,51,.16)' });
  el('div', 'abs', tile, { left: '48px', top: '78px', width: '150px', height: '12px', borderRadius: '6px', background: 'rgba(26,34,51,.09)' });
  const tag = el('div', 'abs', tile, { right: '40px', top: '44px', font: '700 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'rgba(26,34,51,.45)' });
  tag.textContent = 'MP4';
  const play = el('div', 'abs', tile, { left: TW / 2 - 64 + 'px', top: TH / 2 - 64 + 'px', width: '128px', height: '128px', borderRadius: '50%',
    background: 'var(--signal)', boxShadow: '0 16px 40px rgba(255,107,74,.5)' });
  play.innerHTML = '<svg width="128" height="128" viewBox="0 0 128 128"><path d="M52 38 L94 64 L52 90 Z" fill="#fff" stroke="#fff" stroke-width="6" stroke-linejoin="round"/></svg>';
  const track = el('div', 'abs', tile, { left: 0, bottom: 0, width: '100%', height: '12px', background: 'rgba(26,34,51,.12)' });
  const bar = el('div', 'abs', track, { left: 0, top: 0, width: '100%', height: '100%', background: 'var(--signal)', transformOrigin: '0% 50%', boxShadow: '0 0 18px rgba(255,107,74,.8)' });

  /* headline (stage space, unaffected by camera) */
  const head = el('div', 'abs', stage, { left: '80px', width: '1760px', top: '150px', textAlign: 'center', font: '800 120px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const words = ctx.split(head, 'Where to share your video', 'word');

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(cam, { scale: 1.16, x: 0 });
  gsap.set(bar, { scaleX: 0 });
  gsap.set(words, { opacity: 0, y: 50 });
  gsap.set(tile, { filter: 'brightness(1)' });

  // opening: tile already present, settling in
  tl.from(tile, { scale: 0.86, opacity: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.0);
  tl.to(halo, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.1);
  tl.from(play, { scale: 0, rotation: -40, duration: 0.6, ease: 'back.out(2)' }, Math.min(tVideo - 0.2, 1.6));
  tl.to(play, { scale: 1.12, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, tVideo);

  // slow push-in on the single file
  tl.to(cam, { scale: 1.24, duration: Math.max(0.5, tShare - 0.35), ease: 'power1.inOut' }, 0);

  // "audience": empty crowd fades in
  dots.forEach((d, i) => tl.to(d, { opacity: d._o, duration: 0.5, ease: 'power2.out' }, tAud - 0.25 + i * 0.012));

  // "where you share it": decisive pull wide + lateral pan, paths sweep out
  tl.to(cam, { scale: 0.88, x: -30, duration: 1.2, ease: 'expo.inOut' }, tShare - 0.35);
  paths.forEach((p, i) => tl.to(p, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, ease: 'power2.inOut' }, tShare + 0.1 + i * 0.1));
  nodes.forEach(({ n, ring }, i) => {
    const t = tShare + 0.9 + i * 0.1;
    tl.fromTo(n, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, t);
    tl.fromTo(ring, { scale: 0.4, opacity: 0.9 }, { scale: 1.8, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, t);
  });
  tl.to(cam, { scale: 0.92, x: -10, duration: Math.max(0.5, ctx.dur - (tShare + 0.85)), ease: 'power1.inOut' }, tShare + 0.85);

  // "watches to the end": bar fills, headline lands
  tl.to(bar, { scaleX: 1, duration: Math.max(0.6, tEnd - tWatch + 0.4), ease: 'power1.inOut' }, tWatch);
  tl.to(words, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.7)', stagger: 0.07 }, tWatch - 0.15);
  tl.to(tile, { filter: 'brightness(1.06)', boxShadow: '0 0 0 1px rgba(255,255,255,.5), 0 40px 120px rgba(0,0,0,.6), 0 0 140px rgba(255,107,74,.45)', duration: 0.5 }, tEnd + 0.2);
  tl.to(dots.slice(0, 40), { opacity: 0.6, duration: 0.6, stagger: 0.01 }, tEnd);
});

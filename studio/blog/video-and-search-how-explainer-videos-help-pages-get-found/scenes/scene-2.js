/* Scene 2 — "Put each explainer on the page whose topic it explains, and place it where people see it.
 *            A video buried at the bottom is easy to miss."
 * Storyboard: ink stage, close on a tall paper wireframe "Product page". On "topic … explains" a
 * "Product explainer" video tile flies in and snaps onto the matching page, and the labels flash amber.
 * On "place" the camera tilts down the long page and the tile sinks to the very bottom, past the fold.
 * On "buried" it greys out, and on "miss" it dims further into mist. The camera whips back up
 * and the tile springs into the slot right under the page headline, glowing amber.
 * Headline: "One topic." lands on "topic", "Near the top." lands with the tile. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tTopic = A(0, 'topic', 2.2), tExpl = Math.max(tTopic + 0.4, A(0, 'explains', 2.9));
  const tPlace = Math.max(tExpl + 0.5, A(0, 'place', 3.6)), tSee = A(0, 'see', 4.8);
  const tBur = Math.max(tPlace + 0.8, A(1, 'buried', 6.2)), tBot = Math.max(tBur + 0.2, A(1, 'bottom', 6.9));
  const tMiss = Math.max(tBot + 0.2, A(1, 'miss', 7.8));
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 70% at 70% 40%, #26304e 0%, var(--ink) 55%, var(--night) 100%)';
  const root = el('div', 'abs', stage, { inset: 0, transformOrigin: '60% 50%' });

  /* ---- headline column ---- */
  const kicker = el('div', 'abs', root, { left: '120px', top: '330px', font: MONO, letterSpacing: '.18em', color: 'var(--mist)' });
  kicker.textContent = 'WHERE THE VIDEO GOES';
  const h1 = el('div', 'abs', root, { left: '112px', top: '380px', font: '800 110px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', whiteSpace: 'nowrap' });
  h1.textContent = 'One topic.';
  const h2 = el('div', 'abs', root, { left: '112px', top: '500px', font: '800 110px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', whiteSpace: 'nowrap' });
  h2.innerHTML = 'Near the <span style="color:var(--amber)">top.</span>';
  const rule = el('div', 'abs', root, { left: '120px', top: '650px', width: '140px', height: '6px', borderRadius: '3px', background: 'var(--amber)', transformOrigin: '0 50%' });

  /* ---- tall wireframe page (in camera) ---- */
  const PX = 1020, PY = 120, PW = 760, PH = 2620;
  const view = el('div', 'abs', root, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const cam = el('div', 'abs', view, { left: PX + 'px', top: PY + 'px', width: PW + 'px', height: PH + 'px' });
  const page = el('div', 'abs', cam, { inset: 0, borderRadius: '18px', background: 'var(--paper)', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08)', overflow: 'hidden' });
  const bar = el('div', 'abs', page, { left: 0, top: 0, width: '100%', height: '64px', background: '#E8E3D8', borderBottom: '1px solid #d9d2c3' });
  ['#FF6B5A', '#FFB547', '#7fc77f'].forEach((c, i) => el('div', 'abs', bar, { left: 24 + i * 24 + 'px', top: '25px', width: '14px', height: '14px', borderRadius: '50%', background: c, opacity: 0.8 }));
  const chip = el('div', 'abs', bar, { left: '120px', top: '16px', height: '32px', padding: '0 18px', borderRadius: '16px', background: '#fff', font: '700 16px/32px ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--ink)' });
  chip.textContent = 'PRODUCT PAGE';
  const g = (x, y, w, h, c = '#D8D1C2', r = 8) => el('div', 'abs', page, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', background: c, borderRadius: r + 'px' });
  g(60, 110, 520, 52, 'var(--ink)', 10); g(60, 176, 380, 24);
  const slot = el('div', 'abs', page, { left: '60px', top: '240px', width: '640px', height: '360px', borderRadius: '14px', border: '3px dashed #cfc6b3', boxSizing: 'border-box' });
  const R = ctx.rand(31);
  let y = 650;
  while (y < 2120) {
    if (R() < 0.3) { g(60, y, 300, 180, '#E2DCCF', 12); g(390, y + 10, 300, 18); g(390, y + 44, 260, 18); g(390, y + 78, 280, 18); y += 230; }
    else { const n = 3 + Math.floor(R() * 3); for (let k = 0; k < n; k++) { g(60, y, 560 + R() * 80 - (k === n - 1 ? 200 : 0), 18); y += 36; } y += 40; }
  }
  g(0, PH - 80, PW, 80, '#E2DCCF', 0);
  const fold = el('div', 'abs', cam, { left: '-30px', top: '960px', width: PW + 60 + 'px', height: '0', borderTop: '2px dashed rgba(255,181,71,.6)' });
  const foldTag = el('div', 'abs', cam, { left: PW + 20 + 'px', top: '946px', font: MONO, fontSize: '16px', letterSpacing: '.16em', color: 'var(--amber)' });
  foldTag.textContent = 'FOLD';

  /* ---- the video tile ---- */
  const tile = el('div', 'abs', cam, { left: '60px', top: '240px', width: '640px', height: '360px', borderRadius: '14px', overflow: 'hidden',
    background: 'linear-gradient(135deg, #24305a 0%, var(--night) 100%)', boxShadow: '0 30px 60px rgba(14,20,36,.45)', transformOrigin: '50% 50%' });
  const glowL = el('div', 'abs', tile, { inset: 0, background: 'radial-gradient(60% 70% at 50% 45%, rgba(61,123,255,.45), transparent 70%)' });
  const play = el('div', 'abs', tile, { left: '270px', top: '130px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,.95)' });
  el('div', 'abs', play, { left: '40px', top: '30px', width: 0, height: 0, borderTop: '20px solid transparent', borderBottom: '20px solid transparent', borderLeft: '32px solid var(--ink)' });
  const tLab = el('div', 'abs', tile, { left: '28px', top: '28px', font: '700 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: '#fff' });
  tLab.textContent = 'PRODUCT EXPLAINER';
  const prog = el('div', 'abs', tile, { left: '28px', bottom: '28px', width: '584px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.2)' });
  el('div', 'abs', prog, { left: 0, top: 0, width: '34%', height: '100%', borderRadius: '3px', background: 'var(--signal)' });
  const mistL = el('div', 'abs', tile, { inset: 0, background: 'var(--mist)', opacity: 0 });
  const ring = el('div', 'abs', cam, { left: '48px', top: '228px', width: '664px', height: '384px', borderRadius: '20px', border: '4px solid var(--amber)', boxShadow: '0 0 60px rgba(255,181,71,.7)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  const SNAP_Y = 760 - 240, BOT_Y = 2160 - 240;
  gsap.set(tile, { filter: 'grayscale(0) brightness(1)', x: -1000, y: SNAP_Y, rotation: -6, opacity: 0 });
  gsap.set([h1, h2], { opacity: 0, y: 40 });
  gsap.set(rule, { scaleX: 0 });
  gsap.set([fold, foldTag], { opacity: 0 });

  tl.from(cam, { y: 80, opacity: 0, duration: 0.8 }, 0);
  tl.from(kicker, { opacity: 0, x: -20, duration: 0.6 }, 0.25);
  tl.fromTo(root, { scale: 1 }, { scale: 1.04, duration: ctx.dur, ease: 'none' }, 0);

  tl.to(h1, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, tTopic - 0.1);
  tl.to(tile, { opacity: 1, duration: 0.2 }, tTopic);
  tl.to(tile, { x: 0, rotation: 0, duration: Math.max(0.5, tExpl - tTopic), ease: 'back.out(1.5)' }, tTopic);
  tl.to([chip], { background: '#FFB547', duration: 0.2, yoyo: true, repeat: 1, repeatDelay: 0.4 }, tExpl);
  tl.to(tLab, { color: '#FFB547', duration: 0.2, yoyo: true, repeat: 1, repeatDelay: 0.4 }, tExpl);
  tl.to(tile, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, tExpl);

  const down = Math.max(0.9, Math.min(1.8, tBur - tPlace));
  tl.to([fold, foldTag], { opacity: 1, duration: 0.4 }, tPlace);
  tl.to(cam, { y: -(PH - 940), duration: down, ease: 'expo.inOut' }, tPlace);
  tl.to(tile, { y: BOT_Y, duration: down * 0.9, ease: 'power2.inOut' }, tPlace + down * 0.05);

  // "buried": greyed out as it settles at the bottom; "easy to miss": dims into mist
  tl.to(tile, { filter: 'grayscale(1) brightness(.75)', boxShadow: '0 6px 14px rgba(14,20,36,.2)', duration: 0.5, ease: 'power2.out' }, tBur - 0.05);
  tl.to(glowL, { opacity: 0, duration: 0.5 }, tBur - 0.05);
  tl.to(mistL, { opacity: 0.55, duration: 0.5 }, tMiss - 0.05);
  tl.to(tile, { opacity: 0.45, scale: 0.97, duration: 0.5 }, tMiss - 0.05);

  const up = tMiss + 0.2, whip = 0.55, land = up + whip;
  tl.to(cam, { y: 0, duration: whip, ease: 'expo.inOut' }, up);
  tl.to([fold, foldTag], { opacity: 0, duration: 0.3 }, up);
  tl.to(tile, { y: 0, duration: whip + 0.15, ease: 'back.out(1.7)' }, up + 0.05);
  tl.to(tile, { opacity: 1, scale: 1, filter: 'grayscale(0) brightness(1)', boxShadow: '0 30px 80px rgba(255,181,71,.45)', duration: 0.4, ease: 'power2.out' }, land - 0.15);
  tl.to(mistL, { opacity: 0, duration: 0.3 }, land - 0.15);
  tl.to(glowL, { opacity: 1, duration: 0.4 }, land - 0.15);
  tl.to(slot, { opacity: 0, duration: 0.2 }, land - 0.1);
  tl.fromTo(ring, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, land - 0.05);
  tl.to(h2, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, land - 0.1);
  tl.to(rule, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, land + 0.1);
});

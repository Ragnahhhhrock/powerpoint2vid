/* Scene 0 — "The same deck can feel like a product launch, a quiet documentary, or a punchy social clip.
 * It all depends on how it moves."
 * Storyboard: night stage, one rebuilt slide card centre frame (fully redrawn, not the plain white original).
 * On "product launch" it glides in on a polished teal light sweep. On "quiet documentary" it eases into a
 * slow amber grade: letterbox bars, vignette, film grain. On "punchy social clip" it snaps with a coral
 * zoom-punch and a ring burst. On "how it moves" the card settles up and the title "How to Choose a
 * Video Style" rises beneath it in 140px paper type. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const L = ctx.at(0, 'product'), D = ctx.at(0, 'quiet'), S = ctx.at(0, 'punchy'), CLIP = ctx.at(0, 'clip');
  const DEP = ctx.at(1, 'depends'), HOW = ctx.at(1, 'how');
  const mono = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 45%, #161b2e 0%, var(--night) 70%)';
  const glowBg = (c) => el('div', 'abs', stage, { inset: 0, opacity: 0, background: `radial-gradient(45% 45% at 50% 46%, ${c}, transparent 72%)` });
  const bgTeal = glowBg('rgba(43,179,163,.30)'), bgAmber = glowBg('rgba(232,163,61,.26)'), bgCoral = glowBg('rgba(240,96,77,.32)');
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  /* ---- the card ---- */
  const wrap = el('div', 'abs', cam, { left: '480px', top: '230px', width: '960px', height: '540px', transformOrigin: '50% 50%' });
  const halo = (c) => el('div', 'abs', wrap, { inset: 0, borderRadius: '22px', opacity: 0, boxShadow: `0 0 120px 10px ${c}` });
  const hTeal = halo('rgba(43,179,163,.55)'), hAmber = halo('rgba(232,163,61,.4)'), hCoral = halo('rgba(240,96,77,.7)');
  const card = el('div', 'abs', wrap, { inset: 0, borderRadius: '22px', overflow: 'hidden', background: 'var(--paper)', boxShadow: '0 50px 110px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.8)' });
  // rebuilt slide layout (abstract blocks, no invented content)
  el('div', 'abs', card, { left: '70px', top: '84px', width: '84px', height: '10px', borderRadius: '5px', background: 'var(--teal)' });
  el('div', 'abs', card, { left: '70px', top: '124px', width: '520px', height: '46px', borderRadius: '10px', background: 'var(--ink)' });
  el('div', 'abs', card, { left: '70px', top: '186px', width: '360px', height: '46px', borderRadius: '10px', background: 'var(--ink)' });
  [0, 1, 2].forEach((i) => el('div', 'abs', card, { left: '70px', top: 280 + i * 34 + 'px', width: [440, 400, 300][i] + 'px', height: '14px', borderRadius: '7px', background: 'rgba(91,107,140,.35)' }));
  const img = el('div', 'abs', card, { left: '620px', top: '84px', width: '270px', height: '270px', borderRadius: '18px', background: 'linear-gradient(140deg, #5B6B8C, #1B2133)', overflow: 'hidden' });
  el('div', 'abs', img, { left: '60px', top: '70px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #f3c27a, var(--amber) 60%, #a86a1a)' });
  [0.5, 0.8, 0.65, 1].forEach((h, i) => el('div', 'abs', card, { left: 70 + i * 70 + 'px', top: 470 - h * 70 + 'px', width: '46px', height: h * 70 + 'px', borderRadius: '6px 6px 2px 2px', background: i === 3 ? 'var(--teal)' : 'rgba(27,33,51,.75)' }));
  // style overlays
  const sweep = el('div', 'abs', card, { top: '-100px', left: 0, width: '380px', height: '740px', transform: 'skewX(-18deg)', opacity: 0.9,
    background: 'linear-gradient(90deg, transparent, rgba(43,179,163,.45) 40%, rgba(255,255,255,.85) 52%, rgba(43,179,163,.4) 62%, transparent)', mixBlendMode: 'screen' });
  const amberTint = el('div', 'abs', card, { inset: 0, opacity: 0, background: 'rgba(232,163,61,.35)', mixBlendMode: 'multiply' });
  const vig = el('div', 'abs', card, { inset: 0, opacity: 0, background: 'radial-gradient(70% 70% at 50% 50%, transparent 35%, rgba(14,18,32,.75))' });
  const grain = el('canvas', 'abs', card, { inset: 0, width: '100%', height: '100%', opacity: 0, mixBlendMode: 'overlay' });
  grain.width = 240; grain.height = 135;
  const gctx = grain.getContext('2d'), gimg = gctx.createImageData(240, 135);
  const barT = el('div', 'abs', card, { left: 0, right: 0, top: 0, height: '64px', background: 'var(--night)', transformOrigin: '50% 0%' });
  const barB = el('div', 'abs', card, { left: 0, right: 0, bottom: 0, height: '64px', background: 'var(--night)', transformOrigin: '50% 100%' });
  const coralRim = el('div', 'abs', card, { inset: 0, borderRadius: '22px', border: '10px solid var(--coral)', opacity: 0 });
  const ring = el('div', 'abs', cam, { left: '660px', top: '200px', width: '600px', height: '600px', borderRadius: '50%', border: '8px solid var(--coral)', opacity: 0 });

  /* label + title */
  const label = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '840px', textAlign: 'center', font: mono, fontSize: '28px', letterSpacing: '.22em', color: 'var(--teal)', opacity: 0 });
  const title = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '560px', textAlign: 'center', font: '800 140px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const words = ['How to Choose', 'a Video Style'].flatMap((line) => ctx.split(el('div', '', title, {}), line, 'word'));
  const titleGlow = el('div', 'abs', cam, { left: '360px', top: '560px', width: '1200px', height: '300px', opacity: 0, background: 'radial-gradient(50% 50% at 50% 50%, rgba(246,243,238,.12), transparent 70%)' });
  stage.insertBefore(titleGlow.parentNode === cam ? titleGlow : titleGlow, null);

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const hash = (n) => { n = (n ^ 61) ^ (n >>> 16); n = Math.imul(n, 9); n ^= n >>> 4; n = Math.imul(n, 0x27d4eb2d); return ((n ^ (n >>> 15)) >>> 0) / 4294967295; };
  ctx.onFrame((t) => {
    if (t < S - 0.05) { label.textContent = 'PRODUCT LAUNCH'; label.style.color = 'var(--teal)'; }
    if (t >= D - 0.2 && t < S - 0.05) { label.textContent = 'QUIET DOCUMENTARY'; label.style.color = 'var(--amber)'; }
    if (t >= S - 0.05) { label.textContent = 'PUNCHY SOCIAL CLIP'; label.style.color = 'var(--coral)'; }
    if (parseFloat(grain.style.opacity) > 0.01) {
      const f = Math.floor(t * 30) * 7919, d = gimg.data;
      for (let i = 0; i < 240 * 135; i++) { const v = hash(i + f) * 255; d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = v; d[i * 4 + 3] = 255; }
      gctx.putImageData(gimg, 0, 0);
    }
  });

  /* ---- timeline ---- */
  gsap.set(card, { transformPerspective: 1400, x: -150, rotationY: 20, scale: 0.94, filter: 'brightness(0.5) saturate(1) sepia(0)' });
  gsap.set(sweep, { x: -500 });
  gsap.set([barT, barB], { scaleY: 0 });
  gsap.set(words, { opacity: 0, y: 90 });
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'power1.inOut' }, 0);
  tl.from(wrap, { opacity: 0, y: 30, duration: 0.8 }, 0.05);

  // product launch: polished glide + teal sweep
  tl.to(card, { x: 0, rotationY: 0, scale: 1, filter: 'brightness(1) saturate(1) sepia(0)', duration: 1.1, ease: 'power3.inOut' }, L - 0.3);
  tl.to(sweep, { x: 1450, duration: 1.1, ease: 'power2.inOut' }, L - 0.05);
  tl.to([bgTeal, hTeal], { opacity: 1, duration: 0.8, ease: 'sine.inOut' }, L - 0.1);
  tl.fromTo(label, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, L);

  // quiet documentary: slow amber grade, letterbox, grain
  tl.to([bgTeal, hTeal], { opacity: 0, duration: 1.1, ease: 'sine.inOut' }, D - 0.25);
  tl.to([bgAmber, hAmber, amberTint, vig], { opacity: 1, duration: 1.3, ease: 'sine.inOut' }, D - 0.25);
  tl.to([barT, barB], { scaleY: 1, duration: 1.2, ease: 'sine.inOut' }, D - 0.15);
  tl.to(grain, { opacity: 0.45, duration: 1.2, ease: 'sine.inOut' }, D - 0.15);
  tl.to(card, { scale: 1.04, filter: 'brightness(0.9) saturate(0.8) sepia(0.35)', duration: 1.6, ease: 'sine.inOut' }, D - 0.25);
  tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'sine.inOut', immediateRender: false }, D - 0.2);

  // punchy social clip: snap cut + zoom punch
  tl.to([bgAmber, hAmber, amberTint, vig, grain], { opacity: 0, duration: 0.12, ease: 'none' }, S - 0.05);
  tl.to([barT, barB], { scaleY: 0, duration: 0.12, ease: 'power2.in' }, S - 0.05);
  tl.to(card, { filter: 'brightness(1.05) saturate(1.2) sepia(0)', duration: 0.12, ease: 'none' }, S - 0.05);
  tl.to([bgCoral, hCoral, coralRim], { opacity: 1, duration: 0.12, ease: 'none' }, S - 0.05);
  tl.to(card, { scale: 1.17, rotation: -2.5, duration: 0.12, ease: 'power4.out' }, S - 0.05);
  tl.to(card, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2.6)' }, S + 0.07);
  tl.fromTo(ring, { scale: 0.6, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, S - 0.05);
  tl.fromTo(label, { scale: 1.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2.5)', immediateRender: false }, S - 0.05);
  tl.to(card, { scale: 1.07, rotation: 1.6, duration: 0.09, ease: 'power4.out' }, CLIP - 0.04);
  tl.to(card, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.6)' }, CLIP + 0.05);
  tl.fromTo(ring, { scale: 0.7, opacity: 0.8 }, { scale: 1.7, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, CLIP - 0.04);

  // how it moves: settle + title rises
  tl.to([bgCoral, hCoral, coralRim], { opacity: 0, duration: 0.8, ease: 'sine.inOut' }, DEP - 0.1);
  tl.to(hTeal, { opacity: 0.35, duration: 0.8, ease: 'sine.inOut' }, DEP);
  tl.to(card, { filter: 'brightness(1) saturate(1) sepia(0)', duration: 0.6 }, DEP);
  tl.to(label, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.in' }, DEP - 0.1);
  tl.to(wrap, { scale: 0.72, y: -220, duration: 1.0, ease: 'expo.inOut' }, HOW - 0.55);
  tl.to(words, { opacity: 1, y: 0, duration: 0.75, ease: 'back.out(1.5)', stagger: 0.07 }, HOW - 0.3);
  tl.to(titleGlow, { opacity: 1, duration: 1 }, HOW - 0.2);
});

/* Scene 0 — "A video won't rescue a weak page. But a good explainer, placed well and described
 * properly, can help your page get found."
 * Storyboard: night stage, dozens of faint search-result cards drift downward like a dark ocean.
 * On "weak page" one grey card sinks and fades out. On "good explainer" one card lights up in
 * signal blue, gains a play icon and rises toward camera. On "found" the camera pushes in and
 * "Found" (the slide's sparse title) lands at 150px in paper white beside the glowing card. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const R = ctx.rand(7);
  const weak = ctx.at(0, 'weak'), expl = ctx.at(1, 'explainer'), found = ctx.at(1, 'found');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 40% 45%, #172038 0%, var(--night) 70%)';

  /* ---------- result card face ---------- */
  function face(parent, w, h, tone, thumb) {
    const c = el('div', 'abs', parent, { left: 0, top: 0, width: w + 'px', height: h + 'px', borderRadius: Math.round(w * 0.04) + 'px',
      background: `rgba(${tone},.07)`, border: `1px solid rgba(${tone},.16)`, overflow: 'hidden' });
    const pad = w * 0.06;
    let x0 = pad;
    if (thumb) {
      el('div', 'abs', c, { left: pad + 'px', top: pad + 'px', width: w * 0.38 + 'px', height: h - pad * 2 + 'px', borderRadius: w * 0.025 + 'px', background: `rgba(${tone},.1)` });
      x0 = pad * 2 + w * 0.38;
    }
    const lw = w - x0 - pad;
    el('div', 'abs', c, { left: x0 + 'px', top: pad + 'px', width: lw * 0.45 + 'px', height: h * 0.05 + 'px', borderRadius: '99px', background: `rgba(${tone},.22)` });
    el('div', 'abs', c, { left: x0 + 'px', top: pad + h * 0.12 + 'px', width: lw * (0.7 + R() * 0.25) + 'px', height: h * 0.09 + 'px', borderRadius: '99px', background: `rgba(${tone},.34)` });
    [0, 1, 2].forEach((k) => el('div', 'abs', c, { left: x0 + 'px', top: pad + h * (0.34 + k * 0.13) + 'px', width: lw * (k === 2 ? 0.55 : 0.85 + R() * 0.15) + 'px', height: h * 0.05 + 'px', borderRadius: '99px', background: `rgba(${tone},.14)` }));
    return c;
  }

  /* ---------- drifting ocean of results ---------- */
  const field = el('div', 'abs', stage, { inset: 0 });
  const cards = [];
  [{ w: 260, h: 150, cols: 8, sp: 210, v: 38, op: 0.35, blur: 2 }, { w: 380, h: 220, cols: 5, sp: 300, v: 64, op: 0.75, blur: 0 }].forEach((L, li) => {
    const rows = Math.ceil((1080 + L.h + 120) / L.sp) + 1, span = rows * L.sp;
    for (let r = 0; r < rows; r++) for (let c = 0; c < L.cols; c++) {
      const x = -60 + c * (2040 / L.cols) + (r % 2) * (L.w * 0.4) + (R() - 0.5) * 40;
      const holder = el('div', 'abs', field, { left: 0, top: 0, width: L.w + 'px', height: L.h + 'px', opacity: L.op * (0.6 + R() * 0.4), filter: `blur(${L.blur}px)` });
      face(holder, L.w, L.h, '169,179,201', li === 1 && R() < 0.3);
      cards.push({ el: holder, x, y0: r * L.sp + R() * 30, v: L.v, span, h: L.h });
    }
  });
  ctx.onFrame((t) => cards.forEach((c) => {
    const y = ((c.y0 + t * c.v) % c.span) - c.h - 60;
    c.el.style.transform = `translate(${c.x}px, ${y}px)`;
  }));
  const shade = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(55% 55% at 34% 50%, rgba(14,20,36,.0), rgba(14,20,36,.75) 100%)' });

  /* ---------- camera ---------- */
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '900px 540px' });
  const beam = el('div', 'abs', cam, { left: '140px', top: '140px', width: '1000px', height: '800px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(61,123,255,.45), rgba(61,123,255,0))', opacity: 0 });

  /* the weak page */
  const weakCard = el('div', 'abs', cam, { left: '1240px', top: '330px', width: '380px', height: '220px' });
  face(weakCard, 380, 220, '169,179,201', false);
  const weakTag = el('div', 'abs', weakCard, { left: 0, top: '-40px', font: MONO, fontSize: '18px', letterSpacing: '.14em', color: 'var(--mist)', opacity: 0 });
  weakTag.textContent = 'WEAK PAGE';

  /* the hero page */
  const hero = el('div', 'abs', cam, { left: '380px', top: '390px', width: '520px', height: '300px', transformOrigin: '50% 50%' });
  const dim = face(hero, 520, 300, '169,179,201', true);
  const lit = el('div', 'abs', hero, { left: 0, top: 0, width: '520px', height: '300px', borderRadius: '20px', overflow: 'hidden', opacity: 0,
    background: 'linear-gradient(150deg, #5b92ff 0%, #3D7BFF 45%, #2453c9 100%)', boxShadow: '0 0 0 2px rgba(255,255,255,.35) inset, 0 40px 90px rgba(0,0,0,.5), 0 0 120px rgba(61,123,255,.6)' });
  const th = el('div', 'abs', lit, { left: '31px', top: '31px', width: '198px', height: '238px', borderRadius: '13px', background: 'linear-gradient(160deg, #0f1c44, #1B2238)' });
  const play = el('div', 'abs', th, { left: '59px', top: '79px', width: '80px', height: '80px', borderRadius: '50%', background: 'var(--paper)', boxShadow: '0 0 40px rgba(246,243,236,.6)' });
  el('div', 'abs', play, { left: '31px', top: '23px', width: 0, height: 0, borderTop: '17px solid transparent', borderBottom: '17px solid transparent', borderLeft: '27px solid #3D7BFF' });
  const x0 = 260;
  el('div', 'abs', lit, { left: x0 + 'px', top: '31px', width: '100px', height: '14px', borderRadius: '99px', background: 'rgba(246,243,236,.55)' });
  el('div', 'abs', lit, { left: x0 + 'px', top: '67px', width: '220px', height: '26px', borderRadius: '99px', background: 'var(--paper)' });
  [0, 1, 2].forEach((k) => el('div', 'abs', lit, { left: x0 + 'px', top: 133 + k * 39 + 'px', width: (k === 2 ? 130 : 220) + 'px', height: '14px', borderRadius: '99px', background: 'rgba(246,243,236,.4)' }));
  const tagV = el('div', 'abs', lit, { left: x0 + 'px', top: '250px', font: MONO, fontSize: '16px', letterSpacing: '.14em', color: 'var(--paper)' });
  tagV.textContent = '▶ VIDEO';

  /* the title, rebuilt */
  const ttl = el('div', 'abs', cam, { left: '1060px', top: '400px', width: '640px' });
  const kicker = el('div', '', ttl, { font: MONO, letterSpacing: '.12em', color: 'var(--mist)', marginBottom: '18px' });
  kicker.textContent = 'HOW EXPLAINER VIDEOS HELP PAGES GET';
  const word = el('div', '', ttl, { font: '800 150px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', textShadow: '0 0 60px rgba(61,123,255,.45), 0 20px 50px rgba(0,0,0,.5)' });
  const chars = ctx.split(word, 'Found', 'char');

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---------- timeline ---------- */
  gsap.set(weakCard, { filter: 'blur(0px) grayscale(1)' });
  gsap.set(hero, { filter: 'brightness(1)' });
  gsap.set(chars, { opacity: 0, y: 90, rotationX: -60 });
  gsap.set(kicker, { opacity: 0 });
  gsap.set(play, { scale: 0 });

  tl.fromTo(field, { opacity: 0.35 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0);
  tl.from([weakCard, hero], { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.05);
  tl.to(cam, { scale: 1.035, duration: found - 0.4, ease: 'none' }, 0);
  // idle drift with the ocean
  tl.to(weakCard, { y: 60, duration: weak, ease: 'none' }, 0);
  tl.to(hero, { y: 40, duration: expl, ease: 'none' }, 0);

  // "weak page" sinks away
  tl.to(weakTag, { opacity: 0.8, duration: 0.35 }, weak - 0.5);
  tl.to(weakCard, { y: 360, opacity: 0, filter: 'blur(8px) grayscale(1)', duration: 1.3, ease: 'power2.in' }, weak);

  // "good explainer" lights up and rises
  tl.to(lit, { opacity: 1, duration: 0.45, ease: 'power2.out' }, expl - 0.1);
  tl.to(dim, { opacity: 0, duration: 0.45 }, expl - 0.1);
  tl.to(beam, { opacity: 1, duration: 1.2, ease: 'power2.out' }, expl);
  tl.to(play, { scale: 1, duration: 0.6, ease: 'back.out(2)' }, expl + 0.25);
  tl.to(hero, { y: -30, scale: 1.25, duration: 1.8, ease: 'power3.out' }, expl);
  tl.to(field, { opacity: 0.55, duration: 1.5 }, expl + 0.3);
  tl.to(hero, { y: -42, duration: found - expl - 1.8, ease: 'sine.inOut' }, expl + 1.8);

  // "found": push in, title lands
  tl.to(cam, { scale: 1.14, duration: 1.2, ease: 'expo.inOut' }, found - 0.6);
  tl.to(kicker, { opacity: 1, duration: 0.5 }, found - 0.35);
  tl.to(chars, { opacity: 1, y: 0, rotationX: 0, duration: 0.7, stagger: 0.05, ease: 'back.out(1.6)' }, found - 0.15);
  tl.to(lit, { boxShadow: '0 0 0 2px rgba(255,255,255,.45) inset, 0 40px 90px rgba(0,0,0,.5), 0 0 200px rgba(61,123,255,.9)', duration: 0.5, ease: 'power2.out' }, found);
  tl.to(field, { opacity: 0.4, duration: 1 }, found);
  tl.to(cam, { scale: 1.16, duration: Math.max(0.3, ctx.dur - found - 0.6), ease: 'none' }, found + 0.6);
});

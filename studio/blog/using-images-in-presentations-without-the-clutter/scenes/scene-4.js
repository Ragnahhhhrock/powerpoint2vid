/* Scene 4 — "Four tiny product photos became one large shot of the Trail Pack. One image, one claim,
 * one sentence of support. The narration does the rest."
 * Storyboard: paper stage, split BEFORE / AFTER. Left: a cramped slide with four stamp-sized photos and
 * eight slate feature bullets. On "tiny" the stamps pulse. On "became" the cramped slide collapses
 * (quick ease-in). On "large" the backpack stamp grows into a big amber Trail Pack hero, labelled on
 * "Trail". The other three stamps park in a small pile. "Under 1 kg" lands at 120px on "claim",
 * "Fits a 15-inch laptop" settles beneath in slate on "support". On "rest" the three leftover photos
 * fan out to the right as their own mini slides. Slow push-in throughout.
 */
P2V.scene((ctx) => {
  const { tl, el, stage, at } = ctx;
  const tiny = at(0, 'tiny'), became = at(0, 'became'), large = at(0, 'large'), trail = at(0, 'Trail');
  const image = at(1, 'image'), claim = at(1, 'claim'), support = at(1, 'support'), rest = at(2, 'rest');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 40% 40%, #FFFDF7 0%, var(--paper) 60%, #ECE6D8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });

  /* ---------- SVG art ---------- */
  const pack = (fill, pocket, shadow) => `<svg viewBox="0 0 400 500" width="100%" height="100%">
    ${shadow ? '<ellipse cx="200" cy="482" rx="160" ry="14" fill="rgba(60,30,0,.22)"/>' : ''}
    <path d="M165 115 Q165 52 200 52 Q235 52 235 115" fill="none" stroke="${fill}" stroke-width="20" stroke-linecap="round"/>
    <rect x="58" y="262" width="30" height="150" rx="15" fill="${pocket}"/>
    <rect x="312" y="262" width="30" height="150" rx="15" fill="${pocket}"/>
    <rect x="80" y="100" width="240" height="372" rx="80" fill="${fill}"/>
    <path d="M84 205 Q200 140 316 205 L316 246 Q200 188 84 246Z" fill="${pocket}"/>
    <rect x="118" y="298" width="164" height="134" rx="34" fill="${pocket}"/>
    <path d="M140 330 H260" stroke="#F2A541" stroke-width="5" stroke-dasharray="10 8" opacity=".75"/></svg>`;
  const ICONS = [
    pack('#fff', 'rgba(255,255,255,.75)', false),
    `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 16 L90 82 H10Z" fill="#fff"/><path d="M50 42 L63 82 H37Z" fill="#2BB3A3"/></svg>`,
    `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="39" y="12" width="22" height="12" rx="3" fill="#fff"/><rect x="30" y="24" width="40" height="64" rx="12" fill="#fff"/><rect x="30" y="44" width="40" height="10" fill="#E8604C" opacity=".5"/></svg>`,
    `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M28 14 H56 V56 L84 64 Q92 67 92 76 V86 H22 V56Z" fill="#fff"/></svg>`,
  ];
  const TILE = ['var(--amber)', 'var(--teal)', 'var(--coral)', 'var(--slate)'];

  /* ---------- BEFORE / AFTER split ---------- */
  const labB = el('div', 'abs', cam, { left: '120px', top: '150px', font: MONO, letterSpacing: '.16em', color: 'var(--slate)' });
  labB.textContent = 'BEFORE';
  const labA = el('div', 'abs', cam, { left: '1020px', top: '150px', font: MONO, letterSpacing: '.16em', color: 'var(--teal)' });
  labA.textContent = 'AFTER';

  const before = el('div', 'abs', cam, { left: '120px', top: '200px', width: '780px', height: '680px', borderRadius: '18px', background: '#fff', boxShadow: '0 30px 70px rgba(31,34,48,.14)', transformOrigin: '0% 50%' });
  el('div', 'abs', before, { left: '40px', top: '34px', width: '380px', height: '18px', borderRadius: '9px', background: 'rgba(91,98,117,.45)' });
  const W = [330, 280, 360, 250, 310, 340, 230, 300];
  const bullets = W.map((w, i) => {
    const row = el('div', 'abs', before, { left: '300px', top: 92 + i * 62 + 'px', width: '440px', height: '20px' });
    el('div', 'abs', row, { left: 0, top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--slate)' });
    el('div', 'abs', row, { left: '24px', top: '4px', width: Math.min(w, 400) + 'px', height: '12px', borderRadius: '6px', background: 'rgba(91,98,117,.32)' });
    return row;
  });

  const after = el('div', 'abs', cam, { left: '1020px', top: '200px', width: '780px', height: '680px', borderRadius: '18px', border: '3px dashed rgba(91,98,117,.35)', boxSizing: 'border-box' });

  /* stamp-sized photos (live in cam so they can travel) */
  const SLOT = [[160, 290], [282, 290], [160, 382], [282, 382]];
  const thumbs = ICONS.map((svg, i) => {
    const t = el('div', 'abs', cam, { left: SLOT[i][0] + 'px', top: SLOT[i][1] + 'px', width: '110px', height: '80px', borderRadius: '8px', background: TILE[i], display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 0 0 0px #fff, 0 6px 14px rgba(31,34,48,.12)' });
    const ic = el('div', '', t, { width: '54px', height: '54px', flex: '0 0 auto' }); ic.innerHTML = svg;
    const bar = el('div', 'abs', t, { left: '12px', top: '12px', width: '70px', height: '7px', borderRadius: '4px', background: 'rgba(255,255,255,.85)', opacity: 0 });
    return { t, bar };
  });

  /* ---------- AFTER: the hero ---------- */
  const HX = 120, HY = 120, HW = 860, HH = 840;
  const hero = el('div', 'abs', cam, { left: HX + 'px', top: HY + 'px', width: HW + 'px', height: HH + 'px', borderRadius: '26px', overflow: 'hidden', transformOrigin: '0% 0%',
    background: 'radial-gradient(70% 65% at 50% 38%, #FFDCA3 0%, #F2A541 58%, #D4842A 100%)', boxShadow: '0 40px 90px rgba(120,70,10,.25), 0 0 0px rgba(242,165,65,0)' });
  const heroPack = el('div', 'abs', hero, { left: '190px', top: '110px', width: '480px', height: '600px', transformOrigin: '50% 80%' });
  heroPack.innerHTML = pack('#5A3510', '#74461A', true);
  const heroTag = el('div', 'abs', hero, { left: '50px', bottom: '48px', font: '700 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: '#3A2208' });
  heroTag.textContent = 'TRAIL PACK';

  /* ---------- claim + support ---------- */
  const claimEl = el('div', 'abs', cam, { left: '1060px', top: '250px', width: '780px', font: '900 120px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const chars = ctx.split(claimEl, 'Under 1 kg', 'char');
  const rule = el('div', 'abs', cam, { left: '1064px', top: '402px', width: '140px', height: '8px', borderRadius: '4px', background: 'var(--amber)', transformOrigin: '0% 50%' });
  const supportEl = el('div', 'abs', cam, { left: '1062px', top: '440px', width: '760px', font: '600 46px/1.2 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--slate)' });
  supportEl.textContent = 'Fits a 15-inch laptop';
  const ownLab = el('div', 'abs', cam, { left: '1060px', top: '700px', font: MONO, letterSpacing: '.16em', color: 'var(--slate)' });
  ownLab.textContent = 'OWN SLIDES →';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---------- timeline ---------- */
  gsap.set([hero, ...chars, rule, supportEl, ownLab], { opacity: 0 });
  gsap.set(rule, { scaleX: 0 });

  // opening: split builds in
  tl.from([labB, labA], { opacity: 0, duration: 0.5, stagger: 0.08 }, 0);
  tl.from(before, { opacity: 0, y: 30, duration: 0.7 }, 0);
  tl.from(after, { opacity: 0, y: 30, duration: 0.7 }, 0.1);
  tl.from(thumbs.map((o) => o.t), { opacity: 0, scale: 0.7, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.06 }, 0.15);
  tl.from(bullets, { opacity: 0, x: -14, duration: 0.4, stagger: 0.04 }, 0.25);

  // "tiny": the stamps pulse — look how small
  tl.to(thumbs.map((o) => o.t), { scale: 1.12, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.out', stagger: 0.05 }, tiny - 0.05);

  // "became": the cramped slide clears away fast
  tl.to(bullets, { opacity: 0, x: -20, duration: 0.25, ease: 'power3.in', stagger: 0.02 }, became - 0.1);
  tl.to(before, { scaleX: 0, opacity: 0, duration: 0.45, ease: 'power3.in' }, became);
  tl.to(after, { opacity: 0, scale: 0.97, duration: 0.4, ease: 'power3.in' }, became);
  tl.to([labB, labA], { opacity: 0, duration: 0.3, ease: 'power2.in' }, became);
  // the other three park in a small pile
  thumbs.slice(1).forEach((o, i) => {
    tl.to(o.t, { left: 1060 + i * 20 + 'px', top: 790 + i * 10 + 'px', width: '150px', height: '84px', rotation: -4 + i * 4, duration: 1.0, ease: 'power3.inOut' }, became + 0.15);
  });

  // "large": the backpack stamp grows into the hero
  const s0 = SLOT[0];
  tl.set(hero, { opacity: 1 }, large - 0.1);
  tl.set(thumbs[0].t, { opacity: 0 }, large - 0.1);
  tl.fromTo(hero, { x: s0[0] - HX, y: s0[1] - HY, scaleX: 110 / HW, scaleY: 80 / HH, borderRadius: '90px' },
    { x: 0, y: 0, scaleX: 1, scaleY: 1, borderRadius: '26px', duration: 1.4, ease: 'expo.out', immediateRender: false }, large - 0.1);
  tl.fromTo(heroPack, { scale: 1.25, y: 30 }, { scale: 1, y: 0, duration: 1.8, ease: 'power3.out', immediateRender: false }, large - 0.1);
  tl.fromTo(heroTag, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, immediateRender: false }, trail);

  // "One image": hero glows once
  tl.to(hero, { boxShadow: '0 40px 90px rgba(120,70,10,.25), 0 0 80px rgba(242,165,65,.65)', duration: 0.5, yoyo: true, repeat: 1, ease: 'power2.inOut' }, image - 0.1);
  tl.to(heroPack, { scale: 1.03, duration: 0.5, yoyo: true, repeat: 1, ease: 'power2.inOut' }, image - 0.1);

  // "claim"
  tl.fromTo(chars, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.035, immediateRender: false }, claim - 0.2);
  tl.to(rule, { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power3.out' }, claim + 0.25);

  // "support"
  tl.fromTo(supportEl, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', immediateRender: false }, support - 0.15);

  // "the rest": leftover photos file off right as their own mini slides
  tl.to(ownLab, { opacity: 1, duration: 0.5 }, rest - 0.3);
  thumbs.slice(1).forEach((o, i) => {
    const t0 = rest - 0.25 + i * 0.12;
    tl.to(o.t, { left: 1060 + i * 236 + 'px', top: 750 + 'px', width: '200px', height: '112px', rotation: 0, borderRadius: '6px',
      boxShadow: '0 0 0 5px #fff, 0 18px 40px rgba(31,34,48,.18)', duration: 0.9, ease: 'back.out(1.5)' }, t0);
    tl.to(o.bar, { opacity: 1, duration: 0.4 }, t0 + 0.4);
    tl.to(o.t, { x: 24, duration: ctx.dur - (t0 + 0.9), ease: 'power1.out' }, t0 + 0.9);
  });

  // slow push-in, the whole scene
  tl.fromTo(cam, { scale: 1 }, { scale: 1.035, duration: ctx.dur, ease: 'power1.inOut', immediateRender: false }, 0);
});

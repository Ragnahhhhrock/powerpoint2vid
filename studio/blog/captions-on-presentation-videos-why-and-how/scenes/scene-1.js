/* Scene 2 — "Captions help far more people than you'd think. Learners in a second language,
 * people on a train with the sound off, and anyone scanning back while revising."
 * Storyboard: the deck's slide drifts in under a title that builds word by word ("far more"
 * glows coral). On "Learners" the slide sinks away and three video-frame cards rise one per
 * audience: second language (bubbles), sound off (speaker waves cut by an X on "off"),
 * revising (a playhead scrubs back on "back"). Every card has a caption strip typing in.
 * At the end all three glow together under a slow camera push. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const tThink = W(0, 'think.', 2.57);
  const T1 = W(1, 'Learners', 3.673), T2 = W(1, 'people', 5.356), tOff = W(1, 'off,', 6.865);
  const T3 = W(1, 'anyone', 7.457), tBack = W(1, 'back', 8.259), tRev = W(1, 'revising.', 8.769);

  stage.style.background = 'radial-gradient(60% 55% at 30% 20%, #1c1f55 0%, transparent 70%), radial-gradient(55% 50% at 85% 85%, #2a1640 0%, transparent 70%), var(--night)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* title */
  const title = el('div', 'abs', cam, { left: '180px', top: '130px', width: '1560px', font: '800 96px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', whiteSpace: 'nowrap' });
  const words = ['Captions', 'help', 'far', 'more', 'people'];
  const wTimes = [W(0, 'Captions', 0.55), W(0, 'help', 1.095), W(0, 'far', 1.362), W(0, 'more', 1.652), W(0, 'people', 1.85)];
  const wEls = words.map((w, i) => {
    const s = el('span', '', title, { display: 'inline-block', marginRight: '0.24em' });
    s.textContent = w;
    if (i === 2 || i === 3) Object.assign(s.style, { background: 'linear-gradient(100deg, #ffc2b2, #ff6b4a)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' });
    return s;
  });
  const sub = el('div', 'abs', cam, { left: '184px', top: '262px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--muted)' });
  sub.textContent = 'BEYOND DEAF & HARD OF HEARING';
  const subLine = el('div', 'abs', cam, { left: '184px', top: '300px', width: '120px', height: '3px', borderRadius: '2px', background: 'var(--coral)', transformOrigin: '0 50%' });

  /* source slide */
  const slide = el('div', 'abs', cam, { left: '620px', top: '390px', width: '680px', height: '383px', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.1)' });
  const si = el('img', 'abs', slide, { inset: 0, width: '100%', height: '100%' }); si.src = ctx.asset('slide-2.png');
  const slideTag = el('div', 'abs', cam, { left: '620px', top: '800px', font: '600 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--muted)' });
  slideTag.textContent = 'SLIDE 2';

  /* cards */
  const CW = 480, CH = 470, GAP = 60, CX0 = 180, CY = 400;
  const specs = [
    { n: '01', label: 'Second language', accent: '#8f75ff' },
    { n: '02', label: 'Sound off', accent: '#ff6b4a' },
    { n: '03', label: 'Revising', accent: '#1fbf8f' },
  ];
  const baseShadow = '0 0 0px rgba(0,0,0,0), 0 30px 80px rgba(0,0,0,.5)';
  const cards = specs.map((s, i) => {
    const card = el('div', 'abs', cam, { left: CX0 + i * (CW + GAP) + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '28px', background: 'linear-gradient(180deg, #161c48 0%, #0e1330 100%)', border: '1px solid rgba(255,255,255,.09)', boxShadow: baseShadow });
    const screen = el('div', 'abs', card, { left: '28px', top: '28px', width: '424px', height: '250px', borderRadius: '16px', overflow: 'hidden', background: 'radial-gradient(80% 90% at 50% 30%, #262a66 0%, #0b0f28 100%)' });
    const icon = el('div', 'abs', screen, { left: '132px', top: '30px', width: '160px', height: '120px' });
    const capBox = el('div', 'abs', screen, { left: '52px', width: '320px', bottom: '16px', height: '52px', borderRadius: '8px', background: 'rgba(0,0,0,.6)' });
    const bars = [[260, 12], [180, 34]].map(([w, top]) => el('div', 'abs', capBox, { left: (320 - w) / 2 + 'px', top: top - 6 + 'px', width: w + 'px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.92)', transformOrigin: '50% 50%' }));
    const num = el('div', 'abs', card, { left: '32px', top: '312px', font: '700 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: s.accent });
    num.textContent = s.n;
    const lab = el('div', 'abs', card, { left: '32px', top: '350px', width: '416px', font: '800 44px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' });
    lab.textContent = s.label;
    const rule = el('div', 'abs', card, { left: '32px', top: '420px', width: '64px', height: '4px', borderRadius: '2px', background: s.accent, transformOrigin: '0 50%' });
    return { card, screen, icon, bars, rule, accent: s.accent };
  });

  // icon 1: speech bubbles
  cards[0].icon.innerHTML = `<svg width="160" height="120" viewBox="0 0 160 120">
    <path d="M8 10 h76 a10 10 0 0 1 10 10 v30 a10 10 0 0 1 -10 10 h-50 l-14 12 v-12 h-12 a10 10 0 0 1 -10 -10 v-30 a10 10 0 0 1 10 -10z" fill="#6d4aff"/>
    <text x="48" y="44" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="#fff">Hi</text>
    <path d="M66 50 h76 a10 10 0 0 1 10 10 v30 a10 10 0 0 1 -10 10 h-12 v12 l-14 -12 h-50 a10 10 0 0 1 -10 -10 v-30 a10 10 0 0 1 10 -10z" fill="#f8f7fc"/>
    <text x="104" y="84" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="#0e1330">Hola</text></svg>`;
  // icon 2: speaker, waves, X
  cards[1].icon.innerHTML = `<svg width="160" height="120" viewBox="0 0 160 120">
    <path d="M22 44 h22 l30 -26 v84 l-30 -26 h-22z" fill="#f8f7fc"/>
    <g class="waves" fill="none" stroke="#f8f7fc" stroke-width="7" stroke-linecap="round">
      <path d="M92 42 q12 18 0 36"/><path d="M108 30 q22 30 0 60"/></g>
    <g class="cross" fill="none" stroke="#ff6b4a" stroke-width="9" stroke-linecap="round">
      <path class="x1" d="M98 40 L138 80" stroke-dasharray="60" stroke-dashoffset="60"/>
      <path class="x2" d="M138 40 L98 80" stroke-dasharray="60" stroke-dashoffset="60"/></g></svg>`;
  // icon 3: rewind
  cards[2].icon.innerHTML = `<svg width="160" height="120" viewBox="0 0 160 120">
    <path d="M78 22 v76 l-52 -38z" fill="#1fbf8f"/><path d="M138 22 v76 l-52 -38z" fill="#1fbf8f" opacity=".7"/></svg>`;
  const track = el('div', 'abs', cards[2].screen, { left: '52px', width: '320px', top: '168px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.18)' });
  const played = el('div', 'abs', track, { left: 0, top: 0, height: '5px', width: '100%', borderRadius: '3px', background: '#1fbf8f', transformOrigin: '0 50%' });
  const head = el('div', 'abs', track, { left: '-9px', top: '-7px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 16px rgba(31,191,143,.9)' });
  const scrub = { p: 0.82 };
  ctx.onFrame(() => { gsap.set(played, { scaleX: scrub.p }); gsap.set(head, { x: scrub.p * 320 }); });

  const waves = cards[1].icon.querySelector('.waves');
  const x1 = cards[1].icon.querySelector('.x1'), x2 = cards[1].icon.querySelector('.x2');

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);

  gsap.set(slide, { filter: 'blur(0px) brightness(1)' });
  tl.fromTo(slide, { opacity: 0, y: 70, rotation: -2.5, scale: 0.94 }, { opacity: 1, y: 0, rotation: -1, scale: 1, duration: 1.1 }, 0.05);
  tl.fromTo(slideTag, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.4);
  tl.to(slide, { y: -16, rotation: 0.5, duration: T1 - 1.2, ease: 'sine.inOut' }, 1.15);
  tl.to(slide, { opacity: 0, y: 260, scale: 0.85, filter: 'blur(8px) brightness(.5)', duration: 0.6, ease: 'power2.in' }, T1 - 0.55);
  tl.to(slideTag, { opacity: 0, duration: 0.3 }, T1 - 0.55);

  wEls.forEach((w, i) => {
    tl.fromTo(w, { opacity: 0, y: 50, rotation: 4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: 'back.out(1.8)' }, Math.min(wTimes[i] - 0.12, 0.42 + i * 0.4 + 1));
  });
  tl.fromTo(sub, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, tThink);
  tl.fromTo(subLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, tThink + 0.1);

  const starts = [T1, T2, T3];
  cards.forEach((c, i) => {
    const t = starts[i] - 0.15;
    tl.fromTo(c.card, { opacity: 0, y: 120, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, t);
    tl.fromTo(c.icon, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, t + 0.2);
    tl.fromTo(c.bars, { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.18, ease: 'power2.out' }, t + 0.45);
    tl.fromTo(c.rule, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'expo.out' }, t + 0.4);
    tl.to(c.card, { boxShadow: `0 0 70px ${c.accent}88, 0 30px 80px rgba(0,0,0,.5)`, borderColor: c.accent, duration: 0.5 }, t + 0.3);
    if (i > 0) tl.to(cards[i - 1].card, { boxShadow: baseShadow, borderColor: 'rgba(255,255,255,.09)', duration: 0.5 }, t + 0.3);
  });

  // sound off
  tl.to(waves, { opacity: 0.15, duration: 0.3 }, tOff - 0.15);
  tl.to([x1, x2], { strokeDashoffset: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' }, tOff - 0.1);
  tl.fromTo(cards[1].icon, { x: 0 }, { x: 6, duration: 0.06, yoyo: true, repeat: 3, ease: 'none', immediateRender: false }, tOff + 0.15);

  // scanning back
  tl.to(scrub, { p: 0.3, duration: 0.7, ease: 'expo.inOut' }, tBack - 0.15);
  tl.fromTo(cards[2].icon, { x: 0 }, { x: -14, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, tBack - 0.15);

  // finale: everyone lit
  cards.forEach((c, i) => tl.to(c.card, { boxShadow: `0 0 60px ${c.accent}66, 0 30px 80px rgba(0,0,0,.5)`, borderColor: c.accent, duration: 0.6 }, tRev + 0.2 + i * 0.08));
  tl.to(cards.map((c) => c.card), { y: -10, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' }, tRev + 0.2);
});

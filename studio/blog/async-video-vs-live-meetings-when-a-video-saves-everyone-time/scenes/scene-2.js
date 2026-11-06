/* Scene 3 — "But keep the meeting for real conversation. A good rule: if it's mostly you talking,
 * send a video. If it's mostly them talking, meet."
 * Storyboard: night stage, close. Teal and sky speech bubbles face each other and pulse back and forth
 * on "real conversation". On "good rule" the camera pulls out and a divider splits the frame into two
 * columns. On "mostly you talking" the left bubble swells huge, then on "send" it morphs into a coral
 * play button labelled "Send a video". On "mostly them talking" the right side fills with small bubbles
 * that gather into a round table with seats on "meet", labelled "Meet". The two-column rule holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tReal = A(0, 'real'), tConv = A(0, 'conversation.'), tRule = A(1, 'good'), tMostly = A(1, 'mostly'),
    tYou = A(1, 'you'), tSend = A(1, 'send'), tVideo = A(1, 'video.'),
    tMostly2 = A(2, 'mostly'), tThem = A(2, 'them'), tTalk2 = A(2, 'talking,'), tMeet = A(2, 'meet.');
  const TEAL = '#2BB3A3', SKY = '#8FB8FF', SIG = '#FF6B4A', MIST = '#9AA3B5';
  const LX = 500, RX = 1420, CY = 520;
  const mono = '600 24px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 60% at 50% 50%, #1a2140 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const drift = el('div', 'abs', cam, { inset: 0 });

  // column glows
  const glowL = el('div', 'abs', drift, { left: LX - 450 + 'px', top: CY - 400 + 'px', width: '900px', height: '800px', background: 'radial-gradient(closest-side, rgba(43,179,163,.22), transparent)', opacity: 0.6 });
  const glowR = el('div', 'abs', drift, { left: RX - 450 + 'px', top: CY - 400 + 'px', width: '900px', height: '800px', background: 'radial-gradient(closest-side, rgba(143,184,255,.2), transparent)', opacity: 0.6 });

  // divider + labels
  const divider = el('div', 'abs', drift, { left: '959px', top: '180px', width: '2px', height: '720px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,.3), transparent)', transformOrigin: '50% 50%' });
  const ruleTag = el('div', 'abs', drift, { left: '660px', width: '600px', top: '110px', textAlign: 'center', font: mono, letterSpacing: '.22em', color: MIST });
  ruleTag.textContent = 'A GOOD RULE';
  const headL = el('div', 'abs', drift, { left: LX - 300 + 'px', width: '600px', top: '200px', textAlign: 'center', font: mono, letterSpacing: '.16em', color: TEAL });
  headL.textContent = 'MOSTLY YOU TALKING';
  const headR = el('div', 'abs', drift, { left: RX - 300 + 'px', width: '600px', top: '200px', textAlign: 'center', font: mono, letterSpacing: '.16em', color: SKY });
  headR.textContent = 'MOSTLY THEM TALKING';
  const big = (x, txt, col) => {
    const d = el('div', 'abs', drift, { left: x - 340 + 'px', width: '680px', top: '790px', textAlign: 'center', font: '800 76px/1 Inter Display, Inter', letterSpacing: '-.04em', color: col, transformOrigin: '50% 50%' });
    d.textContent = txt; return d;
  };
  const labSend = big(LX, 'Send a video', SIG);
  const labMeet = big(RX, 'Meet', SKY);

  // bubble factory
  const bubble = (x, y, w, h, color, side, dots = true) => {
    const wrap = el('div', 'abs', drift, { left: x + 'px', top: y + 'px', width: 0, height: 0 });
    const s = h * 0.42;
    const tail = el('div', 'abs', wrap, { width: s + 'px', height: s + 'px', top: h / 2 - s * 0.45 + 'px', left: (side > 0 ? w * 0.16 : -w * 0.16 - s) + 'px', background: color, clipPath: side > 0 ? 'polygon(0 0, 100% 100%, 100% 0)' : 'polygon(0 0, 0 100%, 100% 0)' });
    const body = el('div', 'abs', wrap, { left: -w / 2 + 'px', top: -h / 2 + 'px', width: w + 'px', height: h + 'px', borderRadius: h / 2 + 'px', background: color, boxShadow: '0 30px 70px rgba(0,0,0,.45), inset 0 2px 0 rgba(255,255,255,.35)' });
    const ds = [];
    if (dots) for (let i = 0; i < 3; i++) ds.push(el('div', 'abs', wrap, { left: (i - 1) * h * 0.2 - h * 0.05 + 'px', top: -h * 0.05 + 'px', width: h * 0.1 + 'px', height: h * 0.1 + 'px', borderRadius: '50%', background: 'rgba(15,20,36,.75)' }));
    return { wrap, body, tail, dots: ds, w, h };
  };

  const L = bubble(800, CY, 300, 220, TEAL, 1);
  const R = bubble(1120, CY - 10, 300, 220, SKY, -1);

  // play button parts
  const playGlow = el('div', 'abs', drift, { left: LX - 300 + 'px', top: CY - 300 + 'px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,107,74,.55), transparent)', opacity: 0 });
  drift.insertBefore(playGlow, L.wrap);
  const tri = el('div', 'abs', L.wrap, { left: '-34px', top: '-52px', width: '96px', height: '104px', background: '#fff', clipPath: 'polygon(0 0, 100% 50%, 0 100%)', opacity: 0, transformOrigin: '30% 50%' });

  // table + small bubbles
  const table = el('div', 'abs', drift, { left: RX - 105 + 'px', top: CY - 105 + 'px', width: '210px', height: '210px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #b7d0ff, #5f86d6)', boxShadow: '0 0 80px rgba(143,184,255,.45), 0 30px 60px rgba(0,0,0,.4)', opacity: 0 });
  const rnd = ctx.rand(23);
  const cols = [SKY, TEAL, MIST, SKY, TEAL];
  const smalls = [];
  for (let i = 0; i < 11; i++) {
    const b = bubble(RX, CY, 74, 56, cols[i % 5], rnd() < 0.5 ? 1 : -1, false);
    const sx = (rnd() - 0.5) * 520, sy = (rnd() - 0.5) * 420;
    smalls.push({ ...b, sx, sy });
  }

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  const allDots = [...L.dots, ...R.dots];
  ctx.onFrame((t) => allDots.forEach((d, i) => { d.style.transform = `translateY(${Math.sin(t * 7 - i * 0.9) * 6}px)`; }));

  /* ---- timeline ---- */
  gsap.set([divider], { scaleY: 0 });
  gsap.set([ruleTag, headL, headR, labSend, labMeet], { opacity: 0 });
  smalls.forEach((s) => gsap.set(s.wrap, { scale: 0, opacity: 0 }));
  gsap.set(cam, { scale: 1.22 });

  // opening: close on the conversation
  tl.from(L.wrap, { scale: 0, rotation: -12, duration: 0.6, ease: 'back.out(1.8)' }, 0.02);
  tl.from(R.wrap, { scale: 0, rotation: 12, duration: 0.6, ease: 'back.out(1.8)' }, 0.18);
  tl.to(drift, { x: -18, y: -8, duration: ctx.dur, ease: 'none' }, 0);

  // back-and-forth pulses on "real conversation"
  const pulse = (b, t) => tl.to(b.wrap, { scale: 1.14, y: -10, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  pulse(L, tReal - 0.05); pulse(R, tConv); pulse(L, tConv + 0.42); pulse(R, tConv + 0.84);

  // "good rule": decisive pull out, split screen
  tl.to(cam, { scale: 1, duration: 1.1, ease: 'expo.inOut' }, tRule - 0.35);
  tl.to(L.wrap, { left: LX, duration: 1.1, ease: 'expo.inOut' }, tRule - 0.35);
  tl.to(R.wrap, { left: RX, duration: 1.1, ease: 'expo.inOut' }, tRule - 0.35);
  tl.to(divider, { scaleY: 1, duration: 0.9, ease: 'expo.out' }, tRule + 0.2);
  tl.fromTo(ruleTag, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, A(1, 'rule:'));

  // "mostly you talking": left swells
  tl.fromTo(headL, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, tMostly);
  tl.to(R.wrap, { opacity: 0.4, scale: 0.85, duration: 0.5 }, tMostly);
  tl.to(L.wrap, { scale: 1.7, duration: 0.6, ease: 'back.out(1.6)' }, tYou - 0.1);
  tl.to(glowL, { opacity: 1, duration: 0.6 }, tYou);

  // "send": morph into a coral play button
  tl.to(L.body, { width: 280, height: 280, left: -140, top: -140, borderRadius: 140, backgroundColor: SIG, boxShadow: '0 0 90px rgba(255,107,74,.7), inset 0 2px 0 rgba(255,255,255,.4)', duration: 0.45, ease: 'power3.inOut' }, tSend - 0.12);
  tl.to(L.tail, { opacity: 0, scale: 0.3, duration: 0.25 }, tSend - 0.12);
  tl.to(L.dots, { opacity: 0, scale: 0, duration: 0.2 }, tSend - 0.12);
  tl.to(L.wrap, { scale: 1.12, duration: 0.55, ease: 'back.out(2)' }, tSend);
  tl.fromTo(tri, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)', immediateRender: false }, tSend + 0.15);
  tl.to(playGlow, { opacity: 1, duration: 0.5 }, tSend + 0.1);
  tl.fromTo(labSend, { opacity: 0, scale: 0.6, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, tVideo - 0.05);

  // "mostly them talking": right fills with voices
  tl.fromTo(headR, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, tMostly2);
  tl.to([L.wrap, labSend, headL, playGlow], { opacity: 0.45, duration: 0.5 }, tMostly2);
  tl.to(R.wrap, { opacity: 1, scale: 1, duration: 0.3 }, tMostly2);
  tl.to(glowR, { opacity: 1, duration: 0.6 }, tThem);
  tl.to(R.wrap, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }, tThem - 0.05);
  smalls.forEach((s, i) => {
    tl.to(s.wrap, { opacity: 1, scale: 1, x: s.sx, y: s.sy, duration: 0.55, ease: 'back.out(1.7)' }, tThem + i * 0.03);
    tl.to(s.wrap, { y: s.sy - 14, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, tTalk2 + (i % 4) * 0.06);
  });

  // "meet": they gather around a table
  tl.fromTo(table, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, tMeet - 0.05);
  smalls.forEach((s, i) => {
    const t = tMeet - 0.2 + i * 0.025;
    if (i < 8) {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
      tl.to(s.wrap, { x: Math.cos(a) * 165, y: Math.sin(a) * 165, rotation: 0, duration: 0.6, ease: 'back.out(1.5)' }, t);
      tl.to(s.body, { width: 62, height: 62, left: -31, top: -31, borderRadius: 31, duration: 0.4, ease: 'power3.inOut' }, t);
      tl.to(s.tail, { opacity: 0, duration: 0.2 }, t);
    } else {
      tl.to(s.wrap, { x: 0, y: 0, scale: 0, opacity: 0, duration: 0.4, ease: 'power2.in' }, t);
    }
  });
  tl.fromTo(labMeet, { opacity: 0, scale: 0.6, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, tMeet + 0.05);

  // hold the two-column rule: both sides back to full
  tl.to([L.wrap, labSend, headL, playGlow], { opacity: 1, duration: 0.5 }, tMeet + 0.25);
  tl.to(cam, { scale: 1.03, duration: ctx.dur - tMeet, ease: 'power1.inOut' }, tMeet);
});

/* Scene 2 — "Sales slides are built to be presented. Without your voice, readers jump to pricing,
 * your champion retells it from memory, and every slide gets the same weight."
 * Storyboard: dark ink stage, headline "A PDF strips out your reasoning". Five slide cards sit in a
 * neat row, each with its own emphasis, and a thin story line threads them together on "presented".
 * On "without your voice" the line snaps and the halves droop, broken. On "jump to pricing" a cursor
 * leaps over the middle of the story and clicks the last card, "Pricing". On "champion … retells it
 * from memory" a speech bubble carrying the story's coloured dots hops from person to person, blurring
 * and losing dots each hop. On "same weight" all five cards flatten to one identical grey. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (b, w, f) => { const v = ctx.at(b, w); return (v == null || isNaN(v)) ? f : v; };
  const presented = T(0, 'presented.', 1.98), voice = T(1, 'voice,', 3.42), readers = T(1, 'readers', 3.89),
    jump = T(1, 'jump', 4.29), pricing = T(1, 'pricing,', 4.66), champion = T(1, 'champion', 5.62),
    retells = T(1, 'retells', 6.12), memory = T(1, 'memory,', 6.91), every = T(1, 'every', 7.71),
    same = T(1, 'same', 8.72);

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #252d4a 0%, var(--ink) 45%, var(--night) 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });
  el('div', 'abs', cam, { inset: 0, background: 'radial-gradient(35% 30% at 50% 48%, rgba(76,125,255,.12), transparent 70%)' });

  /* headline */
  const kicker = el('div', 'abs', cam, { left: '0', width: '1920px', top: '96px', textAlign: 'center', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--slate)' });
  kicker.textContent = 'SENT AS A PDF';
  const head = el('div', 'abs', cam, { left: '0', width: '1920px', top: '138px', textAlign: 'center', font: '800 76px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const words = ctx.split(head, 'A PDF strips out your reasoning', 'word');

  /* story line (gap segments, each in two halves) */
  const CW = 250, CH = 170, STEP = 320, X0 = 195, CT = 430, LY = CT + CH / 2 - 2;
  const lineLayer = el('div', 'abs', cam, { inset: 0 });
  gsap.set(lineLayer, { clipPath: 'inset(0px 1920px 0px 0px)' });
  const halves = [];
  for (let i = 0; i < 4; i++) {
    const gx = X0 + i * STEP + CW;
    const l = el('div', 'abs', lineLayer, { left: gx + 'px', top: LY + 'px', width: '35px', height: '4px', borderRadius: '2px', background: 'var(--electric)', boxShadow: '0 0 12px rgba(76,125,255,.8)', transformOrigin: '0% 50%' });
    const r = el('div', 'abs', lineLayer, { left: gx + 35 + 'px', top: LY + 'px', width: '35px', height: '4px', borderRadius: '2px', background: 'var(--electric)', boxShadow: '0 0 12px rgba(76,125,255,.8)', transformOrigin: '100% 50%' });
    halves.push(l, r);
  }

  /* cards */
  const LABELS = ['SITUATION', 'PROBLEM', 'ANSWER', 'PROOF', 'PRICING'];
  const ACC = ['#4C7DFF', '#FF6B4A', '#3DD6A3', '#4C7DFF', '#8A93A8'];
  const SCALE = [1, 1.12, 1.04, 1.07, 0.97];
  const cards = LABELS.map((lab, i) => {
    const x = X0 + i * STEP;
    const c = el('div', 'abs', cam, { left: x + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '14px', backgroundColor: '#F7F4EE', overflow: 'hidden',
      boxShadow: i === 1 ? '0 0 50px rgba(255,107,74,.45), 0 24px 50px rgba(0,0,0,.45)' : '0 24px 50px rgba(0,0,0,.45)' });
    const acc = el('div', 'abs', c, { left: 0, top: 0, width: '100%', height: '12px', backgroundColor: ACC[i] });
    const t = el('div', 'abs', c, { left: '22px', top: '34px', font: '700 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: '#1B2238' });
    t.textContent = lab;
    const bars = [[70, 150, ACC[i]], [100, 190, '#c9c4ba'], [124, 120, '#c9c4ba']].map(([y, w, col]) =>
      el('div', 'abs', c, { left: '22px', top: y + 'px', width: w + 'px', height: '12px', borderRadius: '6px', backgroundColor: col }));
    return { c, acc, t, bars, x };
  });
  const priceRing = el('div', 'abs', cam, { left: X0 + 4 * STEP - 6 + 'px', top: CT - 6 + 'px', width: CW + 12 + 'px', height: CH + 12 + 'px', borderRadius: '18px', border: '4px solid var(--signal)', boxShadow: '0 0 50px rgba(255,107,74,.7)', opacity: 0, transform: 'scale(0.97)' });
  const clickRing = el('div', 'abs', cam, { left: X0 + 4 * STEP + CW / 2 - 50 + 'px', top: LY - 48 + 'px', width: '100px', height: '100px', borderRadius: '50%', border: '5px solid var(--signal)', opacity: 0 });

  /* cursor */
  const cursor = el('div', 'abs', cam, { left: 0, top: 0, width: '44px', height: '50px', opacity: 0, filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.5))' });
  cursor.innerHTML = '<svg width="44" height="50" viewBox="0 0 30 42"><path d="M2 2 L2 34 L10 27 L16 40 L22 37 L16 24 L27 24 Z" fill="#fff" stroke="#0F1424" stroke-width="2.5" stroke-linejoin="round"/></svg>';

  /* champion chain */
  const AX = [620, 960, 1300], AY = 790;
  const people = AX.map((x) => {
    const p = el('div', 'abs', cam, { left: x - 42 + 'px', top: AY + 'px', width: '84px', height: '84px', borderRadius: '50%', background: 'radial-gradient(circle at 50% 38%, #9aa3b8 0 22%, transparent 23%), radial-gradient(ellipse 60% 40% at 50% 92%, #9aa3b8 0 98%, transparent 100%), #2c3550', boxShadow: '0 12px 30px rgba(0,0,0,.4)', overflow: 'hidden' });
    return p;
  });
  const champLab = el('div', 'abs', cam, { left: AX[0] - 120 + 'px', width: '240px', top: AY + 102 + 'px', textAlign: 'center', font: '600 17px/1 ui-monospace, Menlo, monospace', letterSpacing: '.18em', color: 'var(--slate)' });
  champLab.textContent = 'CHAMPION';
  const arrows = [0, 1].map((i) => {
    const a = el('div', 'abs', cam, { left: AX[i] + 62 + 'px', top: AY + 40 + 'px', width: AX[i + 1] - AX[i] - 124 + 'px', height: '0', borderTop: '3px dashed rgba(138,147,168,.5)' });
    return a;
  });
  const bubble = el('div', 'abs', cam, { left: 0, top: 0, width: '190px', height: '72px' });
  el('div', 'abs', bubble, { left: '83px', top: '56px', width: '24px', height: '24px', background: 'var(--paper)', transform: 'rotate(45deg)', borderRadius: '3px' });
  const bub = el('div', 'abs', bubble, { inset: 0, borderRadius: '36px', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 14px 30px rgba(0,0,0,.4)' });
  const dots = ACC.map((col) => el('div', '', bub, { width: '20px', height: '20px', borderRadius: '50%', background: col }));
  const BY = AY - 102;
  gsap.set(bubble, { x: AX[0] - 95, y: BY, opacity: 0, filter: 'blur(0px)' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.03, duration: same - 0.2, ease: 'none' }, 0);
  tl.from(kicker, { opacity: 0, y: -10, duration: 0.5 }, 0.05);
  tl.from(words, { opacity: 0, y: 40, duration: 0.6, stagger: 0.06, ease: 'back.out(1.6)' }, 0.08);
  cards.forEach((k, i) => {
    gsap.set(k.c, { scale: SCALE[i] });
    tl.from(k.c, { opacity: 0, y: 70, rotation: -4 + i * 2, duration: 0.7, ease: 'back.out(1.5)' }, 0.3 + i * 0.09);
  });
  tl.to(lineLayer, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.9, ease: 'power2.inOut' }, presented - 0.3);

  // "without your voice": the line snaps
  const snap = voice - 0.05;
  halves.forEach((h, i) => {
    tl.to(h, { rotation: i % 2 ? -32 : 32, background: '#FF6B4A', boxShadow: '0 0 10px rgba(255,107,74,.6)', duration: 0.6, ease: 'bounce.out' }, snap + (i >> 1) * 0.04);
    tl.to(h, { opacity: 0.45, duration: 0.5 }, snap + 0.6);
  });
  tl.to(cards.map((k) => k.c), { x: '+=6', duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, snap);

  // "jump to pricing"
  tl.set(cursor, { x: X0 + CW / 2 - 10, y: LY + 20 }, readers - 0.3);
  tl.to(cursor, { opacity: 1, duration: 0.25 }, readers - 0.3);
  tl.to(cursor, { motionPath: { path: [{ x: X0 + CW / 2 - 10, y: LY + 20 }, { x: 960, y: 300 }, { x: X0 + 4 * STEP + CW / 2 - 10, y: LY + 6 }], curviness: 1.3 }, duration: pricing - jump + 0.05, ease: 'power2.inOut' }, jump);
  tl.to(cards.slice(1, 4).map((k) => k.c), { opacity: 0.35, duration: 0.35 }, jump + 0.1);
  tl.to(cursor, { scale: 0.8, duration: 0.08, yoyo: true, repeat: 1 }, pricing);
  tl.fromTo(clickRing, { scale: 0.3, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, pricing);
  tl.to(priceRing, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, pricing);
  tl.to(cards[4].c, { scale: 1.08, duration: 0.4, ease: 'back.out(2)' }, pricing);

  // "champion retells it from memory"
  tl.to(cursor, { opacity: 0, duration: 0.3 }, champion - 0.4);
  tl.to(cards.slice(1, 4).map((k) => k.c), { opacity: 1, duration: 0.4 }, champion - 0.4);
  tl.to(priceRing, { opacity: 0.4, duration: 0.4 }, champion - 0.4);
  tl.from(people, { opacity: 0, y: 30, scale: 0.6, duration: 0.5, stagger: 0.08, ease: 'back.out(1.8)' }, champion - 0.35);
  tl.from(champLab, { opacity: 0, duration: 0.4 }, champion - 0.2);
  tl.from(arrows, { opacity: 0, duration: 0.4, stagger: 0.1 }, champion);
  tl.fromTo(bubble, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, champion);
  const hop = (t, i, blur, gone, op) => {
    tl.to(bubble, { motionPath: { path: [{ x: AX[i - 1] - 95, y: BY }, { x: (AX[i - 1] + AX[i]) / 2 - 95, y: BY - 70 }, { x: AX[i] - 95, y: BY }], curviness: 1.2 }, duration: 0.5, ease: 'power2.inOut' }, t);
    tl.to(bubble, { filter: `blur(${blur}px)`, opacity: op, duration: 0.5 }, t);
    tl.to(gone.map((d) => dots[d]), { opacity: 0, scale: 0.2, y: 20, duration: 0.35, ease: 'power2.in' }, t + 0.2);
  };
  hop(retells - 0.1, 1, 2.5, [3, 4], 0.9);
  hop(memory - 0.1, 2, 6, [1, 2], 0.7);

  // "every slide gets the same weight": everything flattens to grey
  tl.to([...people, champLab, ...arrows], { opacity: 0.35, duration: 0.5 }, every);
  tl.to(priceRing, { opacity: 0, duration: 0.3 }, same - 0.3);
  cards.forEach((k, i) => {
    const t = same - 0.15 + i * 0.05;
    tl.to(k.c, { scale: 1, backgroundColor: '#4a5268', boxShadow: '0 18px 40px rgba(0,0,0,.4)', duration: 0.55, ease: 'power3.inOut' }, t);
    tl.to(k.acc, { backgroundColor: '#6b7388', duration: 0.5 }, t);
    tl.to(k.t, { color: '#c9cdd8', duration: 0.5 }, t);
    tl.to(k.bars, { backgroundColor: '#6b7388', width: 170, duration: 0.5 }, t);
  });
  tl.to(cam, { scale: 1.07, duration: ctx.dur - same + 0.2, ease: 'power1.inOut' }, same - 0.2);
});

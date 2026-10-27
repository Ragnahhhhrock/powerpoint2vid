/* Scene 4 — "Use situation, problem, answer, proof, next step. For a local bookkeeper, that's five slides,
 * a sentence or two each, and about a minute of video."
 * Storyboard: night stage, close. Five cards deal in, one on each spoken word: Situation, Problem, Answer,
 * Proof, Next step. On "bookkeeper" the Problem card flips to show "Your BAS takes a whole weekend" in coral,
 * then Next step flips to "Book a fifteen-minute call" in teal. "Five slides" pulses the row.
 * "A sentence or two" draws sentence lines on the cards. On "about a minute" the cards snap into a timeline,
 * a stopwatch sweeps to 1:00 with a playhead, and "5 slides = 1-minute script" lands at 120px. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tSit = A(0, 'situation', 0.85), tProb = A(0, 'problem', 1.72), tAns = A(0, 'answer', 2.36),
    tProof = A(0, 'proof', 2.95), tNext = A(0, 'next', 3.58);
  const tBook = A(1, 'bookkeeper', 5.43), tThats = A(1, "that's", 6.05), tFive = A(1, 'five', 6.33),
    tSent = A(1, 'sentence', 7.43), tAbout = A(1, 'about', 8.99), tMin = A(1, 'minute', 9.34);
  const deal = [tSit, tProb, tAns, tProof, tNext];
  const mono = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 50% 55%, #1b2a44 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 52%, rgba(242,165,65,.10), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* top label */
  const label = el('div', 'abs', cam, { left: '150px', top: '220px', font: `600 22px/1 ${mono}`, letterSpacing: '.16em', color: 'var(--mist)' });
  label.textContent = 'THE FIVE-PART SCRIPT';
  const bk = el('div', 'abs', cam, { left: '150px', top: '790px', font: `600 22px/1 ${mono}`, letterSpacing: '.16em', color: 'var(--amber)' });
  bk.textContent = 'EXAMPLE · A LOCAL BOOKKEEPER';

  /* empty slots */
  const slots = [0, 1, 2, 3, 4].map((i) => el('div', 'abs', cam, { left: 150 + i * 330 + 'px', top: '340px', width: '300px', height: '400px', borderRadius: '22px', border: '2px dashed rgba(154,166,184,.22)' }));

  /* cards */
  const NAMES = ['Situation', 'Problem', 'Answer', 'Proof', 'Next step'];
  const ACC = ['#F2A541', '#E8604C', '#F2A541', '#F2A541', '#2BB3A3'];
  const BACK = { 1: ['PROBLEM', '\u201CYour BAS takes a whole weekend\u201D', '#E8604C'], 4: ['NEXT STEP', '\u201CBook a fifteen-minute call\u201D', '#2BB3A3'] };
  const cards = NAMES.map((name, i) => {
    const wrap = el('div', 'abs', cam, { left: 0, top: 0, width: '300px', height: '400px', perspective: '1200px' });
    const inner = el('div', 'abs', wrap, { inset: 0, transformStyle: 'preserve-3d' });
    const face = { position: 'absolute', inset: 0, borderRadius: '22px', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' };
    const front = el('div', '', inner, { ...face, background: 'linear-gradient(160deg, #26324b 0%, #1C2433 100%)', border: '1px solid rgba(255,255,255,.09)', boxShadow: '0 30px 70px rgba(0,0,0,.45)' });
    el('div', 'abs', front, { left: 0, right: 0, top: 0, height: '6px', background: ACC[i] });
    const num = el('div', 'abs', front, { left: '30px', top: '36px', font: `700 26px/1 ${mono}`, letterSpacing: '.1em', color: ACC[i] });
    num.textContent = '0' + (i + 1);
    const nm = el('div', 'abs', front, { left: '30px', top: '96px', width: '240px', font: '800 44px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' });
    nm.textContent = name;
    const bars = [210, 150].map((w, k) => el('div', 'abs', front, { left: '30px', top: 300 + k * 30 + 'px', width: w + 'px', height: '10px', borderRadius: '5px', background: 'rgba(154,166,184,.4)', transformOrigin: '0 50%' }));
    let back = null;
    if (BACK[i]) {
      const [lab, q, c] = BACK[i];
      back = el('div', '', inner, { ...face, background: 'var(--paper)', transform: 'rotateY(180deg)', boxShadow: `0 30px 70px rgba(0,0,0,.45), 0 0 60px ${c}55` });
      el('div', 'abs', back, { left: 0, right: 0, top: 0, height: '6px', background: c });
      const bl = el('div', 'abs', back, { left: '24px', top: '36px', font: `700 20px/1 ${mono}`, letterSpacing: '.14em', color: c });
      bl.textContent = lab;
      const bq = el('div', 'abs', back, { left: '24px', top: '90px', width: '252px', font: '800 31px/1.15 Inter Display, Inter', letterSpacing: '-.02em', color: c });
      bq.textContent = q;
    }
    return { wrap, inner, bars, back };
  });

  /* timeline track + labels */
  const TX0 = 170, TSTEP = 254, TW = 240, TEND = TX0 + 4 * TSTEP + TW;
  const track = el('div', 'abs', cam, { left: TX0 + 'px', top: '780px', width: TEND - TX0 + 'px', height: '4px', borderRadius: '2px', background: 'rgba(154,166,184,.3)', transformOrigin: '0 50%' });
  const ticks = [0, 12, 24, 36, 48, 60].map((s, k) => {
    const x = k === 5 ? TEND : TX0 + k * TSTEP - (k ? 7 : 0);
    const t = el('div', 'abs', cam, { left: x - 50 + 'px', width: '100px', top: '802px', textAlign: 'center', font: `600 22px/1 ${mono}`, color: 'var(--mist)', letterSpacing: '.05em' });
    t.textContent = '0:' + String(s).padStart(2, '0');
    if (s === 60) t.textContent = '1:00';
    return t;
  });
  const playhead = el('div', 'abs', cam, { left: 0, top: '410px', width: '4px', height: '390px', borderRadius: '2px', background: 'var(--amber)', boxShadow: '0 0 24px rgba(242,165,65,.9)' });

  /* stopwatch */
  const SWX = 1480, SWY = 440;
  const sw = el('div', 'abs', cam, { left: SWX + 'px', top: SWY + 'px', width: '300px', height: '300px', transformOrigin: '50% 55%' });
  const C = 2 * Math.PI * 120;
  let tickMarks = '';
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; tickMarks += `<line x1="${150 + Math.sin(a) * 104}" y1="${160 - Math.cos(a) * 104}" x2="${150 + Math.sin(a) * 94}" y2="${160 - Math.cos(a) * 94}" stroke="rgba(154,166,184,.6)" stroke-width="4" stroke-linecap="round"/>`; }
  sw.innerHTML = `<svg width="300" height="300" style="overflow:visible">
    <rect x="132" y="0" width="36" height="22" rx="6" fill="#9AA6B8"/>
    <circle cx="150" cy="160" r="132" fill="#1C2433" stroke="rgba(255,255,255,.12)" stroke-width="3"/>
    <circle cx="150" cy="160" r="120" fill="none" stroke="rgba(154,166,184,.18)" stroke-width="10"/>
    <circle id="arcp" cx="150" cy="160" r="120" fill="none" stroke="#F2A541" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" transform="rotate(-90 150 160)" style="filter:drop-shadow(0 0 10px rgba(242,165,65,.8))"/>
    ${tickMarks}
    <line id="hand" x1="150" y1="160" x2="150" y2="70" stroke="#E8604C" stroke-width="6" stroke-linecap="round"/>
    <circle cx="150" cy="160" r="10" fill="#E8604C"/></svg>`;
  const arcp = sw.querySelector('#arcp'), hand = sw.querySelector('#hand');
  const swNum = el('div', 'abs', sw, { left: 0, width: '300px', top: '196px', textAlign: 'center', font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.02em', color: '#fff', fontVariantNumeric: 'tabular-nums' });
  const S = { p: 0 };

  /* headline */
  const head = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '120px', textAlign: 'center', font: '800 120px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', whiteSpace: 'nowrap' });
  const hw = ctx.split(head, '5 slides = 1-minute script', 'word');
  hw.forEach((w, k) => { if (k === 3) w.style.color = 'var(--amber)'; w.style.marginRight = '0.22em'; });
  hw[hw.length - 1].style.marginRight = '0';

  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 40% at 50% 50%, rgba(242,165,65,.35), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame(() => {
    const p = S.p;
    arcp.setAttribute('stroke-dashoffset', String(C * (1 - p)));
    hand.setAttribute('transform', `rotate(${p * 360} 150 160)`);
    const s = Math.round(p * 60);
    swNum.textContent = s >= 60 ? '1:00' : '0:' + String(s).padStart(2, '0');
    playhead.style.transform = `translateX(${TX0 + (TEND - TX0) * p - 2}px)`;
  });

  /* ---- timeline ---- */
  const r = ctx.rand(7);
  gsap.set([bk, track, ...ticks, playhead, sw, ...hw], { opacity: 0 });
  cards.forEach((c) => gsap.set(c.bars, { scaleX: 0 }));
  tl.from(label, { opacity: 0, x: -30, duration: 0.6 }, 0.05);
  tl.from(slots, { opacity: 0, scale: 0.94, duration: 0.6, stagger: 0.05 }, 0.08);
  tl.to(cam, { scale: 1.03, duration: tAbout, ease: 'sine.inOut' }, 0);

  // deal cards on each word
  cards.forEach((c, i) => {
    const t = deal[i] - 0.12;
    tl.fromTo(c.wrap, { x: 810, y: 1180, rotation: (r() - 0.5) * 40, opacity: 0, scale: 0.9 },
      { x: 150 + i * 330, y: 340, rotation: (r() - 0.5) * 3, opacity: 1, scale: 1, duration: 0.75, ease: 'back.out(1.5)' }, t);
    tl.to(slots[i], { opacity: 0, duration: 0.3 }, t + 0.3);
  });

  // bookkeeper: flip Problem and Next step
  tl.to(bk, { opacity: 1, duration: 0.5 }, tBook - 0.2);
  tl.fromTo(bk, { x: -20 }, { x: 0, duration: 0.6, immediateRender: false }, tBook - 0.2);
  [[1, tBook], [4, Math.max(tBook + 0.45, tThats)]].forEach(([i, t]) => {
    tl.to(cards[i].inner, { rotationY: 180, duration: 0.8, ease: 'back.out(1.3)' }, t);
    tl.to(cards[i].wrap, { y: 300, duration: 0.4, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  });

  // five slides: pulse the row
  cards.forEach((c, i) => tl.to(c.wrap, { scale: 1.05, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' }, tFive + i * 0.07));

  // a sentence or two each
  cards.forEach((c, i) => { if (!c.back) tl.to(c.bars, { scaleX: 1, duration: 0.5, stagger: 0.18, ease: 'power3.out' }, tSent + i * 0.06); });

  // about a minute: snap into a timeline
  tl.to([label, bk], { opacity: 0, y: -10, duration: 0.35 }, tAbout - 0.2);
  cards.forEach((c, i) => tl.to(c.wrap, { x: 140 + i * TSTEP, y: 390, scale: 0.8, rotation: 0, duration: 0.7, ease: 'expo.inOut' }, tAbout - 0.15 + i * 0.03));
  tl.to(track, { opacity: 1, duration: 0.2 }, tAbout + 0.2);
  tl.fromTo(track, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out', immediateRender: false }, tAbout + 0.2);
  tl.to(ticks, { opacity: 1, duration: 0.3, stagger: 0.04 }, tAbout + 0.35);
  tl.fromTo(sw, { opacity: 0, scale: 0.5, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)', immediateRender: false }, tAbout + 0.1);
  tl.to(playhead, { opacity: 1, duration: 0.2 }, tMin);
  const sweepEnd = Math.min(ctx.dur - 0.8, tMin + 1.1);
  tl.to(S, { p: 1, duration: sweepEnd - tMin, ease: 'power2.inOut' }, tMin);
  tl.to(sw, { scale: 1.08, duration: 0.14, yoyo: true, repeat: 1 }, sweepEnd);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, sweepEnd);

  // headline lands
  tl.fromTo(hw, { opacity: 0, y: 60, scale: 1.4 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.06, ease: 'back.out(1.8)', immediateRender: false }, tMin - 0.15);
  tl.to(glow, { opacity: 1.6, duration: 0.6 }, tMin);
  tl.to(cam, { scale: 1.06, duration: ctx.dur - tAbout, ease: 'power1.inOut' }, tAbout);
});

/* Scene 3 — "You don't need five separate productions. Duplicate one master deck, cut it down for each page,
 * and adjust the speaker notes for the audience."
 * Storyboard: night stage. On "five separate productions" five film-clapper icons pop in a row and are struck
 * through in coral. On "Duplicate… one master deck" the clappers collapse and one glowing deck card rises
 * centre frame under the headline "One master deck feeds every page". On "cut it down" the deck glides left
 * and four branches draw out to four cards of different lengths (Home / Feature / Pricing / Help centre).
 * On "speaker notes" a notes line ripples across each card; hold on the tree. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (b, w) => ctx.at(b, w);
  const tFive = A(0, 'five'), tSep = A(0, 'separate'), tProd = A(0, 'productions');
  const tDup = A(1, 'Duplicate'), tOne = A(1, 'one'), tMaster = A(1, 'master'), tCut = A(1, 'cut');
  const tEach = A(1, 'each'), tSpeaker = A(1, 'speaker'), tAud = A(1, 'audience.');

  stage.style.background = 'radial-gradient(60% 55% at 50% 55%, #1f2850 0%, var(--night) 72%)';
  const glow = el('div', 'abs', stage, { left: '460px', top: '240px', width: '1000px', height: '700px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(91,140,255,.22), transparent)', opacity: 0.4 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });
  const MONO = 'ui-monospace, Menlo, monospace';

  /* ---------- phase 1: five productions ---------- */
  const label = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '330px', textAlign: 'center',
    font: `600 24px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--mist)' });
  label.textContent = 'FIVE SEPARATE PRODUCTIONS?';

  const CW = 160, GAP = 60, X0 = 960 - (5 * CW + 4 * GAP) / 2, CY = 560;
  const clapSVG = `<svg width="160" height="140" viewBox="0 0 160 140">
    <rect x="10" y="52" width="140" height="80" rx="10" fill="#1B2238" stroke="#C9CEDB" stroke-width="5"/>
    <path d="M68 76 L96 92 L68 108 Z" fill="#C9CEDB" opacity=".75"/>
    <g transform="rotate(-14 10 48)">
      <rect x="10" y="20" width="140" height="26" rx="5" fill="#C9CEDB"/>
      <path d="M26 20 h18 l-14 26 h-18z M66 20 h18 l-14 26 h-18z M106 20 h18 l-14 26 h-18z" fill="#1B2238"/>
    </g></svg>`;
  const claps = [...Array(5)].map((_, i) => {
    const cx = X0 + i * (CW + GAP) + CW / 2;
    const w = el('div', 'abs', cam, { left: cx - 80 + 'px', top: CY - 70 + 'px', width: '160px', height: '140px' });
    w.innerHTML = clapSVG;
    const sw = el('div', 'abs', w, { left: '-30px', top: '67px', width: '220px', height: '8px', transform: 'rotate(-28deg)' });
    const bar = el('div', 'abs', sw, { inset: 0, borderRadius: '4px', background: 'var(--signal)', boxShadow: '0 0 24px rgba(255,107,74,.8)', transformOrigin: '0% 50%' });
    gsap.set(bar, { scaleX: 0 });
    return { w, bar, cx };
  });

  /* ---------- headline ---------- */
  const head = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '96px', textAlign: 'center',
    font: '800 72px/1.05 Inter Display, Inter', letterSpacing: '-.035em', color: '#fff' });
  const hw = ctx.split(head, 'One master deck feeds every page', 'word');
  gsap.set(hw, { opacity: 0, y: 40 });

  /* ---------- master deck ---------- */
  const DX = 140, DY = 500, DW = 340, DH = 220;
  const deck = el('div', 'abs', cam, { left: DX + 'px', top: DY + 'px', width: DW + 'px', height: DH + 'px' });
  [2, 1].forEach((k) => el('div', 'abs', deck, { left: k * 16 + 'px', top: -k * 16 + 'px', width: DW + 'px', height: DH + 'px',
    borderRadius: '16px', background: k === 2 ? '#2a3560' : '#3a4a86', border: '1px solid rgba(255,255,255,.12)' }));
  const front = el('div', 'abs', deck, { left: 0, top: 0, width: DW + 'px', height: DH + 'px', borderRadius: '16px',
    background: 'linear-gradient(150deg, #8fb0ff 0%, #5B8CFF 45%, #3b5fd0 100%)',
    boxShadow: '0 0 70px rgba(91,140,255,.55), 0 30px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.5)' });
  el('div', 'abs', front, { left: '28px', top: '30px', width: '170px', height: '16px', borderRadius: '8px', background: 'rgba(255,255,255,.9)' });
  el('div', 'abs', front, { left: '28px', top: '62px', width: '240px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.45)' });
  el('div', 'abs', front, { left: '28px', top: '84px', width: '200px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.45)' });
  const play = el('div', 'abs', front, { left: '250px', top: '120px', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,.95)' });
  play.innerHTML = '<svg width="60" height="60"><path d="M24 18 L42 30 L24 42Z" fill="#3b5fd0"/></svg>';
  const dlab = el('div', 'abs', front, { left: '28px', top: '160px', font: `700 18px/1 ${MONO}`, letterSpacing: '.14em', color: '#fff' });
  dlab.textContent = 'MASTER DECK';
  gsap.set(deck, { x: 650, opacity: 0 });

  /* ---------- branches + cards ---------- */
  const SX = DX + DW + 20, SY = DY + DH / 2, CX = 760;
  const CARDS = [
    ['Home', 'short, broad and clear', 430, 'var(--sky)'],
    ['Feature', 'step by step', 760, 'var(--mint)'],
    ['Pricing', 'factual, reassuring', 580, 'var(--mist)'],
    ['Help centre', 'as long as the task needs', 1000, 'var(--sky)'],
  ];
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const ys = [330, 510, 690, 870];
  svgWrap.innerHTML = `<svg width="1920" height="1080">${ys.map((y) =>
    `<path pathLength="1" d="M${SX} ${SY} C ${SX + 150} ${SY}, ${CX - 150} ${y}, ${CX - 14} ${y}" fill="none" stroke="rgba(91,140,255,.75)" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>
     <circle cx="${CX - 14}" cy="${y}" r="7" fill="#5B8CFF" opacity="0"/>`).join('')}</svg>`;
  const paths = [...svgWrap.querySelectorAll('path')], dots = [...svgWrap.querySelectorAll('circle')];

  const cards = CARDS.map(([t, d, w, col], i) => {
    const c = el('div', 'abs', cam, { left: CX + 'px', top: ys[i] - 75 + 'px', width: w + 'px', height: '150px', borderRadius: '14px',
      background: 'linear-gradient(180deg, #232c4a, #1B2238)', border: '1px solid rgba(255,255,255,.1)',
      boxShadow: '0 24px 50px rgba(0,0,0,.4)', overflow: 'hidden' });
    el('div', 'abs', c, { left: 0, top: 0, width: '8px', height: '100%', background: col });
    const tt = el('div', 'abs', c, { left: '32px', top: '22px', font: '800 36px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' });
    tt.textContent = t;
    const dd = el('div', 'abs', c, { left: '32px', top: '68px', font: '600 26px/1 Inter', color: 'var(--mist)', whiteSpace: 'nowrap' });
    dd.textContent = d;
    const nl = el('div', 'abs', c, { left: '32px', top: '112px', font: `700 15px/1 ${MONO}`, letterSpacing: '.16em', color: 'rgba(201,206,219,.55)' });
    nl.textContent = 'NOTES';
    const row = el('div', 'abs', c, { left: '112px', right: '32px', top: '112px', height: '14px', display: 'flex', gap: '8px', alignItems: 'center' });
    const n = Math.floor((w - 150) / 30);
    const bars = [...Array(n)].map(() => el('div', '', row, { flex: '0 0 22px', height: '4px', borderRadius: '2px',
      background: 'rgba(201,206,219,.35)', transformOrigin: '50% 50%' }));
    gsap.set(bars, { scaleY: 1 });
    gsap.set(c, { opacity: 0, x: -60, clipPath: 'inset(0% 100% 0% 0%)' });
    return { c, nl, bars };
  });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---------- timeline ---------- */
  tl.to(cam, { scale: 1.04, y: -6, duration: ctx.dur, ease: 'none' }, 0);
  tl.fromTo(label, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.08);
  tl.fromTo(glow, { opacity: 0.25 }, { opacity: 0.6, duration: 2 }, 0);

  claps.forEach((c, i) => {
    tl.fromTo(c.w, { opacity: 0, scale: 0.4, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(1.8)' }, tFive - 0.3 + i * 0.08);
    tl.to(c.bar, { scaleX: 1, duration: 0.28, ease: 'power2.out' }, tSep - 0.05 + i * 0.09);
  });
  tl.to(claps.map((c) => c.w), { opacity: 0.45, duration: 0.5 }, tProd + 0.35);
  tl.to(label, { color: 'var(--signal)', duration: 0.3 }, tSep);

  // collapse into one
  tl.to(label, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, tDup - 0.1);
  claps.forEach((c, i) => tl.to(c.w, { x: (960 - c.cx) * 0.9, scale: 0.3, opacity: 0, duration: 0.6, ease: 'power3.in' }, tDup + i * 0.03));

  tl.fromTo(deck, { y: 220, scale: 0.8, opacity: 0 }, { y: 0, scale: 1.3, opacity: 1, duration: 0.9, ease: 'back.out(1.6)', immediateRender: false }, tOne - 0.3);
  tl.to(glow, { opacity: 1, duration: 0.8 }, tOne - 0.2);
  tl.to(hw, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'back.out(1.5)' }, tMaster - 0.15);
  tl.to(front, { boxShadow: '0 0 120px rgba(91,140,255,.85), 0 30px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.5)', duration: 0.4, yoyo: true, repeat: 1 }, A(1, 'deck,'));

  // cut it down: deck glides left, branches fan out
  tl.to(deck, { x: 0, scale: 1, duration: 0.85, ease: 'expo.inOut' }, tCut - 0.1);
  tl.to(glow, { left: '-60px', duration: 0.9, ease: 'expo.inOut' }, tCut - 0.1);
  cards.forEach((k, i) => {
    const t = tCut + 0.4 + i * 0.12;
    tl.to(paths[i], { attr: { 'stroke-dashoffset': 0 }, duration: 0.55, ease: 'power2.inOut' }, t);
    tl.to(dots[i], { attr: { opacity: 1 }, duration: 0.2 }, t + 0.45);
    tl.to(k.c, { opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power3.out' }, t + 0.35);
  });
  tl.to(cards.map((k) => k.c), { borderColor: 'rgba(91,140,255,.55)', duration: 0.3, yoyo: true, repeat: 1, stagger: 0.08 }, tEach + 0.3);

  // speaker notes ripple on each card (both ripples start from and return to scaleY 1)
  cards.forEach((k, i) => {
    const t = tSpeaker - 0.05 + i * 0.12;
    tl.to(k.nl, { color: 'var(--mint)', duration: 0.3 }, t);
    tl.to(k.bars, { background: '#3DD6A3', duration: 0.3, stagger: 0.012 }, t);
    tl.fromTo(k.bars, { scaleY: 1 }, { scaleY: 3, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.012, immediateRender: false }, t);
    tl.fromTo(k.bars, { scaleY: 1 }, { scaleY: 2, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.012, immediateRender: false }, tAud + 0.3 + i * 0.1);
  });
  tl.to(dots, { attr: { fill: '#3DD6A3' }, duration: 0.4, stagger: 0.1 }, tSpeaker);
});

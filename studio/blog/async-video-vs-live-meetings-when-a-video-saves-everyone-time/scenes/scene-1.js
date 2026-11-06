/* Scene 2 — "If the content is mostly one-way, a video often wins. It reaches the manager, finance and IT,
 * and lands in their morning, whether that's Perth or London."
 * Storyboard: bright paper stage. Headline "Send a video when it's one-way" sits at the top. On "one-way" a
 * coral arrow shoots out of a video card on the left. On "manager", "finance" and "IT" it splits into three
 * branches, each ending in a labelled avatar. On "lands in their morning" a small sun rises behind each avatar.
 * On "Perth or London" the camera pulls back to reveal two clocks, Perth 7:00 and London 8:30. Each shows a
 * different time, and both have a sunrise. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const oneWay = W(0, 'one-way'), video = W(0, 'video'), wins = W(0, 'wins');
  const tMgr = W(1, 'manager,'), tFin = W(1, 'finance'), tIT = W(1, 'IT,');
  const lands = W(1, 'lands'), morning = W(1, 'morning,'), whether = W(1, 'whether');
  const perth = W(1, 'Perth'), london = W(1, 'London.');

  const SIG = '#FF6B4A', INK = '#1C2233';
  stage.style.background = 'radial-gradient(60% 55% at 55% 45%, #fffdf8 0%, var(--paper) 60%, #ece6da 100%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 72% 50%, rgba(255,107,74,.10), transparent 70%)', opacity: 0 });

  /* headline (fixed, outside camera) */
  const head = el('div', 'abs', stage, { left: '0', width: '1920px', top: '86px', textAlign: 'center', font: '800 74px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: INK });
  head.innerHTML = 'Send a video when it’s <span style="color:#FF6B4A">one-way</span>';
  const hiWord = head.querySelector('span');
  hiWord.style.display = 'inline-block';

  /* camera */
  const cam = el('div', 'abs', stage, { left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: '960px 300px' });

  /* SVG lines */
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1300px' });
  const AV = [{ y: 360, name: 'Manager', c: '#2BB3A3' }, { y: 540, name: 'Finance', c: '#8FB8FF' }, { y: 720, name: 'IT', c: '#9AA3B5' }];
  const AX = 1400, SPLIT = 960;
  svgWrap.innerHTML = `<svg width="1920" height="1300" style="overflow:visible">
    <path id="main" d="M452 540 L${SPLIT} 540" pathLength="1" fill="none" stroke="${SIG}" stroke-width="10" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
    ${AV.map((a, i) => `<path class="br" d="M${SPLIT} 540 C ${SPLIT + 200} 540, ${SPLIT + 180} ${a.y}, ${AX - 68} ${a.y}" pathLength="1" fill="none" stroke="${SIG}" stroke-width="8" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')}
    <circle id="node" cx="${SPLIT}" cy="540" r="14" fill="${SIG}"/>
  </svg>`;
  const mainP = svgWrap.querySelector('#main');
  const brs = [...svgWrap.querySelectorAll('.br')];
  const node = svgWrap.querySelector('#node');
  gsap.set(node, { transformOrigin: `${SPLIT}px 540px`, scale: 0 });

  const arrowHead = el('div', 'abs', cam, { left: '430px', top: '518px', width: '44px', height: '44px' });
  arrowHead.innerHTML = `<svg width="44" height="44"><path d="M8 4 L40 22 L8 40 Z" fill="${SIG}" stroke="${SIG}" stroke-width="4" stroke-linejoin="round"/></svg>`;

  /* video card */
  const card = el('div', 'abs', cam, { left: '160px', top: '450px', width: '280px', height: '180px', borderRadius: '22px', background: 'linear-gradient(150deg, #2a3150, #0F1424)', boxShadow: '0 30px 60px rgba(15,20,36,.28), inset 0 1px 0 rgba(255,255,255,.12)' });
  const playBtn = el('div', 'abs', card, { left: '95px', top: '45px', width: '90px', height: '90px', borderRadius: '50%', background: SIG, boxShadow: '0 0 40px rgba(255,107,74,.6)' });
  playBtn.innerHTML = '<svg width="90" height="90"><path d="M36 27 L64 45 L36 63 Z" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/></svg>';
  const bar = el('div', 'abs', card, { left: '24px', bottom: '18px', width: '232px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.15)' });
  const barFill = el('div', 'abs', bar, { left: 0, top: 0, height: '100%', width: '100%', borderRadius: '3px', background: SIG, transformOrigin: '0 50%' });
  gsap.set(barFill, { scaleX: 0 });
  const cardLab = el('div', 'abs', cam, { left: '160px', width: '280px', top: '656px', textAlign: 'center', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: '#9AA3B5' });
  cardLab.textContent = 'ONE VIDEO';
  const ring = el('div', 'abs', cam, { left: '210px', top: '450px', width: '180px', height: '180px', borderRadius: '50%', border: `5px solid ${SIG}`, opacity: 0 });

  /* avatars with suns */
  const avs = AV.map((a) => {
    const g = el('div', 'abs', cam, { left: AX - 60 + 'px', top: a.y - 60 + 'px', width: '120px', height: '120px' });
    const sunClip = el('div', 'abs', g, { left: '58px', top: '-52px', width: '96px', height: '70px', overflow: 'hidden' });
    const sun = el('div', 'abs', sunClip, { left: '18px', top: '12px', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle, #ffd27a 0%, #ffb547 55%, #ff8a4a 100%)', boxShadow: '0 0 30px rgba(255,170,70,.8)' });
    const rays = el('div', 'abs', sunClip, { left: '0', top: '-6px', width: '96px', height: '96px' });
    rays.innerHTML = `<svg width="96" height="96">${[...Array(7)].map((_, k) => { const an = Math.PI + (k * Math.PI) / 6; const x1 = 48 + Math.cos(an) * 40, y1 = 48 + Math.sin(an) * 40, x2 = 48 + Math.cos(an) * 48, y2 = 48 + Math.sin(an) * 48; return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffab45" stroke-width="4" stroke-linecap="round"/>`; }).join('')}</svg>`;
    const disc = el('div', 'abs', g, { inset: 0, borderRadius: '50%', background: '#fff', border: `6px solid ${a.c}`, boxShadow: '0 20px 40px rgba(15,20,36,.16)', overflow: 'hidden' });
    disc.innerHTML = `<svg width="108" height="108" style="position:absolute;left:0;top:0"><circle cx="54" cy="42" r="19" fill="${a.c}"/><path d="M18 108 C 20 76, 88 76, 90 108 Z" fill="${a.c}"/></svg>`;
    const lab = el('div', 'abs', cam, { left: AX + 86 + 'px', top: a.y - 22 + 'px', font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.03em', color: INK, whiteSpace: 'nowrap' });
    lab.textContent = a.name;
    gsap.set(sun, { y: 70 }); gsap.set(rays, { opacity: 0, y: 30 });
    return { g, sun, rays, lab };
  });

  /* clocks (below, off-frame until pull-back) */
  const CLK = [{ x: 680, name: 'PERTH', time: '7:00 AM', h: 7, m: 0 }, { x: 1240, name: 'LONDON', time: '8:30 AM', h: 8, m: 30 }];
  const clocks = CLK.map((c) => {
    const g = el('div', 'abs', cam, { left: c.x - 100 + 'px', top: '930px', width: '200px', height: '200px' });
    const face = el('div', 'abs', g, { inset: 0, borderRadius: '50%', background: 'linear-gradient(180deg, #ffffff 0%, #fff6ea 60%, #ffe2c4 100%)', border: `7px solid ${INK}`, boxShadow: '0 24px 50px rgba(15,20,36,.2)', overflow: 'hidden' });
    const sun = el('div', 'abs', face, { left: '58px', top: '150px', width: '70px', height: '70px', borderRadius: '50%', background: 'radial-gradient(circle, #ffd27a, #ff8a4a)', boxShadow: '0 0 30px rgba(255,150,70,.8)' });
    const ticks = el('div', 'abs', face, { inset: 0 });
    ticks.innerHTML = `<svg width="186" height="186">${[...Array(12)].map((_, k) => { const an = (k * Math.PI) / 6; const r1 = k % 3 ? 80 : 72; return `<line x1="${93 + Math.sin(an) * r1}" y1="${93 - Math.cos(an) * r1}" x2="${93 + Math.sin(an) * 86}" y2="${93 - Math.cos(an) * 86}" stroke="${INK}" stroke-width="${k % 3 ? 3 : 5}" stroke-linecap="round"/>`; }).join('')}</svg>`;
    const hh = el('div', 'abs', face, { left: '89px', top: '48px', width: '8px', height: '48px', borderRadius: '4px', background: INK, transformOrigin: '50% 45px' });
    const mh = el('div', 'abs', face, { left: '90px', top: '24px', width: '6px', height: '72px', borderRadius: '3px', background: SIG, transformOrigin: '50% 69px' });
    el('div', 'abs', face, { left: '84px', top: '84px', width: '18px', height: '18px', borderRadius: '50%', background: INK });
    const lab = el('div', 'abs', cam, { left: c.x - 200 + 'px', width: '400px', top: '1150px', textAlign: 'center', font: '800 48px/1 Inter Display, Inter', letterSpacing: '-.02em', color: INK });
    lab.innerHTML = `${c.name.charAt(0) + c.name.slice(1).toLowerCase()} <span style="font:600 34px/1 ui-monospace,Menlo,monospace;color:#FF6B4A;letter-spacing:.04em">${c.time}</span>`;
    gsap.set(sun, { y: 40 });
    return { ...c, g, sun, hh, mh, lab };
  });

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* ---- timeline ---- */
  // opening
  tl.from(head, { y: 30, opacity: 0, duration: 0.6 }, 0.05);
  tl.from(card, { scale: 0.85, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.15);
  tl.from(cardLab, { opacity: 0, duration: 0.5 }, 0.4);
  gsap.set(arrowHead, { opacity: 0 });
  gsap.set(avs.flatMap((a) => [a.g, a.lab]), { opacity: 0 });
  gsap.set(avs.map((a) => a.g), { scale: 0.4 });
  gsap.set(avs.map((a) => a.lab), { x: -20 });

  // camera drift, then the one decisive pull-back
  tl.fromTo(cam, { scale: 1, x: 0 }, { scale: 1.03, x: -10, duration: whether - 0.2, ease: 'none' }, 0);
  tl.to(cam, { scale: 0.72, x: 0, y: -10, duration: 1.1, ease: 'expo.inOut' }, whether - 0.2);
  tl.to(cam, { scale: 0.7, duration: ctx.dur - (whether + 0.9), ease: 'none' }, whether + 0.9);

  // "one-way": the arrow shoots out
  tl.to(hiWord, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, oneWay - 0.05);
  tl.to(barFill, { scaleX: 1, duration: ctx.dur - oneWay, ease: 'none' }, oneWay - 0.1);
  tl.to(arrowHead, { opacity: 1, duration: 0.1 }, oneWay - 0.1);
  tl.to(mainP, { attr: { 'stroke-dashoffset': 0 }, duration: 0.6, ease: 'power3.out' }, oneWay - 0.1);
  tl.fromTo(arrowHead, { x: 0 }, { x: SPLIT - 452, duration: 0.6, ease: 'power3.out', immediateRender: false }, oneWay - 0.1);

  // "video" / "wins"
  tl.to(playBtn, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, video - 0.05);
  tl.fromTo(ring, { scale: 0.5, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, wins - 0.05);
  tl.to(arrowHead, { x: SPLIT - 452 + 18, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, wins);
  tl.to(glow, { opacity: 1, duration: 1.2, ease: 'power1.out' }, wins);

  // split on manager / finance / IT
  tl.to(arrowHead, { opacity: 0, scale: 0.4, duration: 0.25, ease: 'power2.in' }, tMgr - 0.4);
  tl.to(node, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, tMgr - 0.35);
  [tMgr, tFin, tIT].forEach((t, i) => {
    const a = avs[i];
    tl.to(brs[i], { attr: { 'stroke-dashoffset': 0 }, duration: 0.42, ease: 'power2.out' }, t - 0.3);
    tl.to(a.g, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' }, t + 0.05);
    tl.to(a.lab, { opacity: 1, x: 0, duration: 0.45 }, t + 0.12);
  });

  // "lands in their morning": suns rise
  avs.forEach((a, i) => {
    const t = lands + i * 0.12;
    tl.to(a.sun, { y: 0, duration: 0.7, ease: 'back.out(1.5)' }, t);
    tl.to(a.rays, { opacity: 1, y: 0, duration: 0.6 }, t + 0.25);
    tl.to(a.g, { y: -8, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  });
  tl.to(avs.map((a) => a.rays), { rotation: 8, transformOrigin: '50% 100%', duration: ctx.dur - morning, ease: 'none' }, morning);

  // "Perth or London": the clocks
  [perth, london].forEach((t, i) => {
    const c = clocks[i];
    const start = t - 0.35;
    gsap.set([c.g, c.lab], { opacity: 0 });
    tl.fromTo(c.g, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, start);
    tl.fromTo(c.lab, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, immediateRender: false }, start + 0.15);
    tl.fromTo(c.hh, { rotation: 0 }, { rotation: c.h * 30 + c.m * 0.5, duration: 0.9, ease: 'power3.out', immediateRender: false }, start);
    tl.fromTo(c.mh, { rotation: 0 }, { rotation: 360 * 2 + c.m * 6, duration: 0.9, ease: 'power3.out', immediateRender: false }, start);
    tl.to(c.sun, { y: -8, duration: 0.9, ease: 'back.out(1.4)' }, start + 0.3);
  });
});

/* Scene 2 — "Plan short videos, not recorded lectures. A week on supply and demand becomes four short videos,
 * one concept each, and each one names what students will do in class."
 * Storyboard: night stage. A long ribbon labelled "Recorded lecture" stretches across the frame; on "four" it slices
 * into four amber tiles. Tile 1 "What a demand curve shows" draws a downward curve with a riding dot; tile 2
 * "What shifts demand" slides the curve right. On "names what students will do" a teal "Class activity" tag drops
 * under each tile. Wide shot holds on the four tiles. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tPlan = A(0, 'Plan'), tNot = A(0, 'not'), tLect = A(0, 'lectures.');
  const tWeek = A(1, 'week'), tFour = A(1, 'four'), tVideos = A(1, 'videos,');
  const tConcept = A(1, 'concept'), tEach = A(1, 'each,'), tNames = A(1, 'names'), tClass = A(1, 'class.');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 50% 55%, #1c2438 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 30% at 50% 58%, rgba(242,165,65,.16), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  const head = el('div', 'abs', cam, { left: '160px', top: '120px', width: '1600px', font: '800 64px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const words = ctx.split(head, 'Plan short videos, not recorded lectures.', 'word');
  const neg = words.slice(3);
  neg.forEach((w) => (w.style.color = 'rgba(221,230,225,.45)'));
  const strike = el('div', 'abs', cam, { top: '158px', height: '5px', borderRadius: '3px', background: 'var(--coral)', transformOrigin: '0% 50%' });

  const X0 = 160, SEG = 400, TW = 370, GAP = 40;
  const stripes = 'repeating-linear-gradient(90deg, rgba(221,230,225,.10) 0 2px, transparent 2px 22px), linear-gradient(180deg, #2a3248, #1e2433)';
  const segs = [0, 1, 2, 3].map((i) => {
    const s = el('div', 'abs', cam, { left: X0 + i * SEG + 'px', top: '440px', width: SEG + 'px', height: '200px', overflow: 'hidden',
      borderRadius: i === 0 ? '18px 0 0 18px' : i === 3 ? '0 18px 18px 0' : '0', boxShadow: '0 30px 70px rgba(0,0,0,.45)' });
    const tex = el('div', 'abs', s, { inset: 0, background: stripes, backgroundPosition: -i * SEG + 'px 0' });
    const amb = el('div', 'abs', s, { inset: 0, background: 'linear-gradient(160deg, #f7bd68 0%, var(--amber) 55%, #d98a2b 100%)', opacity: 0 });
    const body = el('div', 'abs', s, { left: '28px', top: '26px', width: TW - 56 + 'px', bottom: '24px', opacity: 0 });
    const num = el('div', '', body, { font: '700 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'rgba(18,24,38,.6)' });
    num.textContent = 'VIDEO 0' + (i + 1);
    return { s, tex, amb, body, i };
  });

  const ribLabel = el('div', 'abs', cam, { left: X0 + 'px', width: '1600px', top: '510px', textAlign: 'center', font: '800 56px/1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--chalk)' });
  const dot = el('span', '', ribLabel, { display: 'inline-block', width: '26px', height: '26px', borderRadius: '50%', background: 'var(--coral)', marginRight: '22px', verticalAlign: '4px', boxShadow: '0 0 24px rgba(231,111,81,.8)' });
  el('span', '', ribLabel).textContent = 'Recorded lecture';
  const ribTag = el('div', 'abs', cam, { left: X0 + 'px', top: '400px', font: MONO, letterSpacing: '.14em', color: 'rgba(221,230,225,.55)' });
  ribTag.textContent = 'ONE WEEK · SUPPLY & DEMAND';
  const playhead = el('div', 'abs', cam, { left: X0 + 'px', top: '428px', width: '4px', height: '224px', background: 'var(--amber)', borderRadius: '2px', boxShadow: '0 0 18px rgba(242,165,65,.8)' });

  const slashes = [1, 2, 3].map((k) => el('div', 'abs', cam, { left: X0 + k * SEG - 3 + 'px', top: '400px', width: '6px', height: '280px', background: '#fff', borderRadius: '3px', boxShadow: '0 0 30px #fff, 0 0 60px var(--amber)', transformOrigin: '50% 0%' }));
  gsap.set(slashes, { scaleY: 0 });

  const mkTitle = (seg, text) => {
    const t = el('div', '', seg.body, { marginTop: '16px', font: '800 34px/1.12 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--night)' });
    t.textContent = text; return t;
  };
  const t1 = mkTitle(segs[0], 'What a demand curve shows');
  const t2 = mkTitle(segs[1], 'What shifts demand');
  const svgNS = 'http://www.w3.org/2000/svg';
  const CURVE = 'M40 18 C 90 90, 170 118, 280 128';
  const mkGraph = (seg) => {
    const box = el('div', 'abs', seg.body, { left: 0, bottom: 0, width: '314px', height: '150px' });
    box.innerHTML = `<svg width="314" height="150" viewBox="0 0 314 150" xmlns="${svgNS}">
      <path d="M30 6 L30 140 L304 140" fill="none" stroke="rgba(18,24,38,.55)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="ghost"><path d="${CURVE}" fill="none" stroke="rgba(18,24,38,.25)" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 10"/></g>
      <g class="mover"><path class="c" d="${CURVE}" pathLength="1" fill="none" stroke="var(--night)" stroke-width="6" stroke-linecap="round"/>
      <circle class="d" r="9" fill="var(--coral)" opacity="0"/></g></svg>`;
    return { box, ghost: box.querySelector('.ghost'), mover: box.querySelector('.mover'), c: box.querySelector('.c'), d: box.querySelector('.d') };
  };
  const g1 = mkGraph(segs[0]), g2 = mkGraph(segs[1]);
  g1.ghost.style.display = 'none';
  gsap.set([g1.c, g2.c], { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(g2.ghost, { opacity: 0 });
  const arrow = el('div', 'abs', segs[1].body, { right: '6px', bottom: '96px', font: '800 34px/1 Inter', color: 'var(--night)', opacity: 0 });
  arrow.textContent = '→';

  const skel = [2, 3].flatMap((k) => {
    const b = segs[k].body;
    const lines = [260, 190].map((w) => el('div', '', b, { marginTop: '18px', width: w + 'px', height: '22px', borderRadius: '11px', background: 'rgba(18,24,38,.18)' }));
    const play = el('div', 'abs', b, { left: '0px', bottom: '10px', width: '0', height: '0', borderLeft: '58px solid rgba(18,24,38,.75)', borderTop: '34px solid transparent', borderBottom: '34px solid transparent' });
    return [...lines, play];
  });

  const tags = segs.map((sg, i) => {
    const x = X0 + i * (TW + GAP);
    const stem = el('div', 'abs', cam, { left: x + TW / 2 - 1 + 'px', top: '700px', width: '3px', height: '40px', background: 'var(--teal)', transformOrigin: '50% 0%' });
    const tag = el('div', 'abs', cam, { left: x + 40 + 'px', width: TW - 80 + 'px', top: '740px', height: '64px', borderRadius: '32px', background: 'var(--teal)',
      boxShadow: '0 16px 40px rgba(42,157,143,.4), inset 0 1px 0 rgba(255,255,255,.3)', textAlign: 'center', font: '700 22px/64px ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: '#fff', opacity: 0 });
    tag.textContent = 'CLASS ACTIVITY';
    return { stem, tag };
  });
  gsap.set(tags.map((g) => g.stem), { scaleY: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const ride = { p: 0 };
  const L1 = g1.c.getTotalLength ? g1.c.getTotalLength() : 0;
  ctx.onFrame(() => {
    if (!L1) return;
    const pt = g1.c.getPointAtLength(L1 * ride.p);
    g1.d.setAttribute('cx', pt.x); g1.d.setAttribute('cy', pt.y);
  });

  gsap.set(words, { opacity: 0, y: 24 });
  gsap.set(strike, { scaleX: 0 });
  const lw = words[words.length - 1];
  ctx.onFrame(() => { if (!strike._p) { strike.style.left = 160 + lw.offsetLeft - 4 + 'px'; strike.style.width = lw.offsetWidth + 8 + 'px'; strike._p = 1; } });

  tl.from(segs.map((s) => s.s), { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' }, 0.05);
  tl.from([ribLabel, ribTag, playhead], { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 }, 0.15);
  tl.to(playhead, { x: 1596, duration: 5.9, ease: 'none' }, 0.2);
  tl.to(dot, { opacity: 0.35, duration: 0.4, yoyo: true, repeat: 7, ease: 'sine.inOut' }, 0.6);

  tl.to(words.slice(0, 3), { opacity: 1, y: 0, duration: 0.55, stagger: 0.13, ease: 'back.out(1.6)' }, tPlan - 0.05);
  tl.to(neg, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, tNot - 0.05);
  tl.to(strike, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, tLect + 0.1);
  tl.to(ribTag, { color: 'var(--amber)', duration: 0.4 }, tWeek);

  tl.fromTo(cam, { scale: 1.0 }, { scale: 1.05, duration: tFour - 0.4, ease: 'sine.inOut' }, 0);
  tl.to(cam, { scale: 0.98, y: 10, duration: 1.0, ease: 'expo.inOut' }, tFour - 0.2);
  tl.to(cam, { scale: 1.0, y: 0, duration: ctx.dur - (tFour + 0.8), ease: 'sine.inOut' }, tFour + 0.8);

  slashes.forEach((sl, k) => {
    tl.fromTo(sl, { scaleY: 0, opacity: 1 }, { scaleY: 1, duration: 0.14, ease: 'power4.in', immediateRender: false }, tFour - 0.12 + k * 0.06);
    tl.to(sl, { opacity: 0, duration: 0.3 }, tFour + 0.12 + k * 0.06);
  });
  tl.to([ribLabel, playhead], { opacity: 0, duration: 0.2 }, tFour);
  tl.to(ribTag, { opacity: 0, y: -10, duration: 0.3 }, tFour);
  segs.forEach((sg) => {
    tl.to(sg.s, { left: X0 + sg.i * (TW + GAP), width: TW, top: 330, height: 360, borderRadius: '22px', duration: 0.7, ease: 'expo.inOut',
      boxShadow: '0 40px 90px rgba(0,0,0,.5), 0 0 60px rgba(242,165,65,.18)' }, tFour + 0.12 + sg.i * 0.04);
    tl.to(sg.amb, { opacity: 1, duration: 0.45 }, tFour + 0.35 + sg.i * 0.04);
    tl.to(sg.body, { opacity: 1, duration: 0.4 }, tVideos + sg.i * 0.06);
  });
  tl.to(glow, { opacity: 1, duration: 1 }, tFour + 0.3);

  gsap.set([t1, t2, ...skel], { opacity: 0, y: 14 });
  tl.to(t1, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, A(1, 'one') - 0.1);
  tl.to(t2, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, tConcept);
  tl.to(skel, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, tConcept + 0.15);
  tl.to([g1.c, g2.c], { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.15 }, tConcept);
  tl.to(g1.d, { attr: { opacity: 1 }, duration: 0.2 }, tConcept + 0.8);
  tl.to(ride, { p: 1, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: 3 }, tConcept + 0.8);
  tl.to(g2.ghost, { opacity: 1, duration: 0.3 }, tEach - 0.1);
  tl.to(arrow, { opacity: 1, duration: 0.3 }, tEach);
  tl.fromTo(g2.mover, { x: 0 }, { x: 34, duration: 1.0, ease: 'power2.inOut', yoyo: true, repeat: 3, immediateRender: false }, tEach);

  tags.forEach((g, i) => {
    const t = tNames + i * 0.12;
    tl.to(g.stem, { scaleY: 1, duration: 0.3, ease: 'power2.out' }, t);
    tl.fromTo(g.tag, { opacity: 0, y: -40, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, t + 0.1);
  });
  tl.to(tags.map((g) => g.tag), { boxShadow: '0 16px 60px rgba(42,157,143,.75), inset 0 1px 0 rgba(255,255,255,.3)', duration: 0.5, yoyo: true, repeat: 1, stagger: 0.06 }, tClass);
});

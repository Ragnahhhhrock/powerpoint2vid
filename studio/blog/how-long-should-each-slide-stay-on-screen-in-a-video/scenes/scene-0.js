/* Scene 0 — "In a video, viewers can't ask you to slow down. Get slide timing right and it feels calm.
 * Get it wrong, and it drags or rushes."
 * Storyboard: night stage. A single amber timeline bar glows at centre and ticks forward one stopwatch
 * step per second while the question "How long should each slide stay on screen?" (rebuilt, 120px)
 * settles in above it, dim. On "ask you to slow down" a faint hand-raise icon fades in and dissolves,
 * ignored. On "calm" the bar resets and fills smoothly in teal. On "drags" it crawls and stalls; on
 * "rushes" it whips across in coral. Then the bar snaps back to amber, the headline resolves to full
 * brightness, and a slow push-in holds the frame. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = 1200, BX = 360, BY = 690, BH = 26;
  const askT = ctx.at(0, 'ask'), slowT = ctx.at(0, 'slow'), calmT = ctx.at(1, 'calm');
  const wrongT = ctx.at(2, 'wrong'), dragT = ctx.at(2, 'drags'), rushT = ctx.at(2, 'rushes');
  const resolveT = Math.min(rushT + 0.45, ctx.dur - 1.4);

  stage.style.background = 'radial-gradient(60% 55% at 50% 58%, #1d2540 0%, #0E1220 70%)';
  const glowBg = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 22% at 50% 64%, rgba(242,169,59,.16), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* headline, rebuilt from the plain title */
  const head = el('div', 'abs', cam, { left: '120px', width: '1680px', top: '190px', textAlign: 'center',
    font: '800 120px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: '#F6F3EC' });
  const l1 = el('div', '', head), l2 = el('div', '', head);
  const words = [...ctx.split(l1, 'How long should each', 'word'), ...ctx.split(l2, 'slide stay on screen?', 'word')];
  words.forEach((w) => { w.style.marginRight = '0.22em'; });
  words[words.length - 1].style.marginRight = '0';
  l1.lastChild && (l1.lastChild.style.marginRight = '0');
  const accent = words.slice(-2);

  /* timeline bar */
  const track = el('div', 'abs', cam, { left: BX + 'px', top: BY + 'px', width: W + 'px', height: BH + 'px', borderRadius: '13px',
    background: 'rgba(255,255,255,.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)' });
  for (let i = 1; i < 10; i++) el('div', 'abs', track, { left: i * W / 10 + 'px', top: '-10px', width: '2px', height: BH + 20 + 'px', background: 'rgba(154,163,184,.22)' });
  const fill = el('div', 'abs', cam, { left: BX + 'px', top: BY + 'px', width: '0px', height: BH + 'px', borderRadius: '13px',
    backgroundColor: '#F2A93B', boxShadow: '0 0 40px rgba(242,169,59,.6)' });
  const dot = el('div', 'abs', cam, { left: BX - 22 + 'px', top: BY - 9 + 'px', width: '44px', height: '44px', borderRadius: '50%',
    backgroundColor: '#F6F3EC', boxShadow: '0 0 30px rgba(242,169,59,.8)' });
  const status = el('div', 'abs', cam, { left: BX + 'px', top: BY - 62 + 'px', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.18em', color: '#9AA3B8' });
  const clock = el('div', 'abs', cam, { left: BX + W - 300 + 'px', width: '300px', top: BY - 62 + 'px', textAlign: 'right',
    font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: '#9AA3B8', fontVariantNumeric: 'tabular-nums' });

  /* ignored hand-raise */
  const hand = el('div', 'abs', cam, { left: '900px', top: '470px', width: '120px', height: '130px' });
  hand.innerHTML = `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" stroke="#9AA3B8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M40 70 V22 a8 8 0 0 1 16 0 V62 M56 58 V14 a8 8 0 0 1 16 0 V60 M72 60 V22 a8 8 0 0 1 16 0 V70 M88 66 V40 a8 8 0 0 1 16 0 V82 c0 26 -18 42 -40 42 c-18 0 -28 -10 -38 -26 L14 76 a8 8 0 0 1 13 -9 L40 82"/></svg>`;

  const S = { w: 0, t: 0 };
  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(45% 30% at 70% 64%, rgba(239,99,81,.4), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });
  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    fill.style.width = Math.max(0, S.w) + 'px';
    dot.style.left = BX + S.w - 22 + 'px';
    status.textContent = t < calmT - 0.3 ? '● PLAYING' : t < wrongT - 0.2 ? '● CALM' : t < rushT - 0.15 ? '● DRAGS' : t < resolveT ? '● RUSHES' : '● ON TIME';
    const secs = (S.w / W) * 10;
    clock.textContent = '0:' + String(Math.floor(secs)).padStart(2, '0') + '.' + Math.floor((secs % 1) * 10);
  });

  /* ---- timeline ---- */
  gsap.set(hand, { opacity: 0, filter: 'blur(0px)' });
  gsap.set(words, { opacity: 0, y: 40, filter: 'blur(8px)' });
  tl.from([track, status, clock], { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0);
  tl.from([fill, dot], { opacity: 0, scale: 0.6, duration: 0.5, ease: 'back.out(1.6)' }, 0.1);
  tl.to(words, { opacity: 0.38, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 0.3);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.035, duration: resolveT, ease: 'none' }, 0);

  // metronomic stopwatch ticks, one per second until "calm"
  for (let k = 1; 0.6 + (k - 1) < calmT - 0.7; k++) {
    const tt = 0.6 + (k - 1);
    tl.to(S, { w: k * 60, duration: 0.22, ease: 'power4.out' }, tt);
    tl.fromTo(dot, { scale: 1.25 }, { scale: 1, duration: 0.35, ease: 'power2.out', immediateRender: false }, tt);
  }

  // "ask you to slow down": a raised hand appears, then dissolves, ignored
  tl.fromTo(hand, { opacity: 0, y: 20 }, { opacity: 0.55, y: 0, duration: 0.5, ease: 'power2.out' }, askT - 0.1);
  tl.to(hand, { opacity: 0, filter: 'blur(10px)', y: -30, scale: 1.1, duration: 0.8, ease: 'power2.in' }, Math.max(askT + 0.6, slowT - 0.1));

  // "calm": reset, then a smooth teal fill
  tl.to(S, { w: 0, duration: 0.35, ease: 'power2.inOut' }, calmT - 0.5);
  tl.to(fill, { backgroundColor: '#2EC4B6', boxShadow: '0 0 44px rgba(46,196,182,.65)', duration: 0.4 }, calmT - 0.3);
  tl.to(dot, { boxShadow: '0 0 30px rgba(46,196,182,.8)', duration: 0.4 }, calmT - 0.3);
  tl.to(glowBg, { opacity: 0.5, duration: 0.6 }, calmT - 0.3);
  tl.to(S, { w: W, duration: Math.max(0.6, wrongT - calmT - 0.45), ease: 'sine.inOut' }, calmT - 0.1);

  // "wrong" -> "drags": crawl and stall
  tl.to(S, { w: 0, duration: 0.3, ease: 'power2.inOut' }, wrongT - 0.3);
  tl.to(fill, { backgroundColor: '#EF6351', boxShadow: '0 0 30px rgba(239,99,81,.45)', duration: 0.3 }, wrongT - 0.2);
  tl.to(dot, { boxShadow: '0 0 26px rgba(239,99,81,.8)', duration: 0.3 }, wrongT - 0.2);
  const crawl = Math.max(0.4, rushT - dragT - 0.25);
  tl.to(S, { w: 110, duration: crawl * 0.55, ease: 'none' }, dragT - 0.1);
  tl.to(S, { w: 124, duration: crawl * 0.25, ease: 'power3.out' }, dragT - 0.1 + crawl * 0.6);
  tl.to(dot, { x: 4, duration: 0.06, yoyo: true, repeat: 3, ease: 'none' }, dragT - 0.1 + crawl * 0.7);

  // "rushes": whips across
  tl.to(S, { w: W, duration: 0.22, ease: 'expo.in' }, rushT - 0.12);
  tl.to(fill, { boxShadow: '0 0 70px rgba(239,99,81,.9)', duration: 0.15 }, rushT + 0.1);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, rushT + 0.1);
  tl.to(track, { x: 8, duration: 0.05, yoyo: true, repeat: 1 }, rushT + 0.1);

  // resolve: amber again, headline lands, slow push-in holds
  tl.to(fill, { backgroundColor: '#F2A93B', boxShadow: '0 0 50px rgba(242,169,59,.7)', duration: 0.5, ease: 'power2.out' }, resolveT);
  tl.to(dot, { boxShadow: '0 0 34px rgba(242,169,59,.9)', duration: 0.5 }, resolveT);
  tl.to(S, { w: W * 0.5, duration: 0.6, ease: 'back.out(1.4)' }, resolveT);
  tl.to(glowBg, { opacity: 1, duration: 0.6 }, resolveT);
  tl.to(words, { opacity: 1, duration: 0.5, stagger: 0.03, ease: 'power2.out' }, resolveT);
  tl.to(accent, { color: '#F2A93B', textShadow: '0 0 40px rgba(242,169,59,.45)', duration: 0.5 }, resolveT + 0.15);
  tl.to(cam, { scale: 1.08, duration: Math.max(0.5, ctx.dur - resolveT), ease: 'power1.inOut' }, resolveT);
});

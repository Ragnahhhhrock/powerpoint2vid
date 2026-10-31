/* Scene 2: "A real script tells the viewer where to look, and links smoothly to the next slide."
 * Storyboard: ink stage. A miniature slide frame sits centre and assembles itself. Its chart builds on "script".
 * On "where to look" a teal spotlight glides onto the chart's key bar, the rest of the slide dims, and the label
 * "Where to look" appears. On "links smoothly" the camera eases left as a second frame slides in from the right.
 * An amber thread draws from the spotlit bar to the new frame, and "What's next" lands on "next".
 * A speech-driven waveform pulses along the bottom throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (w, d) => { try { return ctx.at(0, w); } catch (e) { return d; } };
  const tScript = W('script', 1.04), tWhere = W('where', 2.22), tLook = W('look,', 2.56) || 2.56,
    tLinks = W('links', 3.31), tSmooth = W('smoothly', 3.59), tNext = W('next', 4.27), tSlide = W('slide.', 4.52) || 4.52;

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #262c40 0%, var(--ink) 55%, var(--night) 100%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 30% 50%, rgba(46,196,182,.10), transparent 70%), radial-gradient(35% 30% at 75% 45%, rgba(255,181,71,.08), transparent 70%)' });

  const drift = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });
  const cam = el('div', 'abs', drift, { inset: 0 });

  const FW = 720, FH = 405, FT = 300, AX = 230, BX = 1090;
  const frameCss = (x) => ({ left: x + 'px', top: FT + 'px', width: FW + 'px', height: FH + 'px', borderRadius: '16px', overflow: 'hidden',
    background: 'linear-gradient(180deg, #fbf8f2, var(--paper))', boxShadow: '0 40px 100px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.08)' });

  /* ---- frame A: slide with a chart ---- */
  const A = el('div', 'abs', cam, frameCss(AX));
  const aBar = el('div', 'abs', A, { left: 0, top: 0, right: 0, height: '10px', background: 'var(--teal)' });
  const aLines = [[48, 56, 250, 22, 'var(--ink)'], [48, 104, 200, 12, '#c9c3b8'], [48, 132, 230, 12, '#c9c3b8'], [48, 160, 170, 12, '#c9c3b8'], [48, 210, 210, 12, '#c9c3b8'], [48, 238, 150, 12, '#c9c3b8']]
    .map(([x, y, w, h, c]) => el('div', 'abs', A, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', borderRadius: '6px', background: c }));
  const axis = el('div', 'abs', A, { left: '370px', top: '362px', width: '310px', height: '3px', background: '#bdb6aa', borderRadius: '2px' });
  const HS = [90, 140, 110, 200];
  const bars = HS.map((h, i) => el('div', 'abs', A, { left: 380 + i * 72 + 'px', top: 362 - h + 'px', width: '50px', height: h + 'px', borderRadius: '8px 8px 2px 2px', background: 'var(--slate)', transformOrigin: '50% 100%' }));
  const hotBar = el('div', 'abs', A, { left: 380 + 3 * 72 + 'px', top: 362 - 200 + 'px', width: '50px', height: '200px', borderRadius: '8px 8px 2px 2px', background: 'linear-gradient(180deg, #5fe0d4, var(--teal))', boxShadow: '0 0 30px rgba(46,196,182,.7)', opacity: 0 });
  const dim = el('div', 'abs', A, { inset: 0, pointerEvents: 'none' });
  /* ring lives in the camera layer (not inside A) so A's overflow:hidden can't clip it */
  const ring = el('div', 'abs', cam, { left: 0, top: 0, width: '0px', height: '0px', borderRadius: '50%', border: '4px solid var(--teal)', boxShadow: '0 0 40px rgba(46,196,182,.8), inset 0 0 30px rgba(46,196,182,.35)', opacity: 0, pointerEvents: 'none' });
  const spot = { x: 120, y: 90, r: 50, o: 0, d: 0 };

  /* ---- frame B: the next slide ---- */
  const B = el('div', 'abs', cam, frameCss(BX));
  el('div', 'abs', B, { left: 0, top: 0, right: 0, height: '10px', background: 'var(--amber)' });
  const bLines = [[48, 56, 300, 22, 'var(--ink)'], [48, 110, 260, 12, '#c9c3b8'], [48, 138, 220, 12, '#c9c3b8'], [48, 166, 240, 12, '#c9c3b8']]
    .map(([x, y, w, h, c]) => el('div', 'abs', B, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', borderRadius: '6px', background: c }));
  const bCards = [0, 1, 2].map((i) => el('div', 'abs', B, { left: 48 + i * 212 + 'px', top: '226px', width: '188px', height: '130px', borderRadius: '12px', background: i === 0 ? 'rgba(255,181,71,.28)' : '#ebe5da', border: i === 0 ? '2px solid var(--amber)' : '2px solid transparent' }));

  /* ---- amber thread ---- */
  const sx = AX + 380 + 3 * 72 + 25, sy = FT + 250, ex = BX, ey = FT + 140;
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', pointerEvents: 'none' });
  svgWrap.innerHTML = `<svg width="1920" height="1080"><path id="thr" d="M${sx} ${sy} C ${sx + 160} ${sy + 170}, ${ex - 140} ${ey - 40}, ${ex} ${ey}" fill="none" stroke="#FFB547" stroke-width="5" stroke-linecap="round" style="filter:drop-shadow(0 0 10px rgba(255,181,71,.8))"/></svg>`;
  const thr = svgWrap.querySelector('#thr');
  const LEN = thr.getTotalLength();
  thr.style.strokeDasharray = LEN; thr.style.strokeDashoffset = LEN;
  const thread = { p: 0 };
  const dot = el('div', 'abs', cam, { left: 0, top: 0, width: '22px', height: '22px', marginLeft: '-11px', marginTop: '-11px', borderRadius: '50%', background: '#ffe0a8', boxShadow: '0 0 24px 6px rgba(255,181,71,.85)', opacity: 0 });
  const endPulse = el('div', 'abs', cam, { left: ex - 40 + 'px', top: ey - 40 + 'px', width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--amber)', opacity: 0 });

  /* ---- labels ---- */
  const labCss = (x, c) => ({ left: x + 'px', top: '236px', font: '700 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: c, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '14px' });
  const labA = el('div', 'abs', cam, labCss(AX + 4, 'var(--teal)'));
  el('span', '', labA, { width: '14px', height: '14px', borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 14px var(--teal)', display: 'inline-block' });
  el('span', '', labA).textContent = 'WHERE TO LOOK';
  const labB = el('div', 'abs', cam, labCss(BX + 4, 'var(--amber)'));
  el('span', '', labB, { width: '14px', height: '14px', borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 14px var(--amber)', display: 'inline-block' });
  el('span', '', labB).textContent = "WHAT'S NEXT";

  /* ---- waveform motif ---- */
  const NB = 64, WV = el('div', 'abs', stage, { left: '560px', width: '800px', top: '880px', height: '110px' });
  const wbars = Array.from({ length: NB }, (_, i) => el('div', 'abs', WV, { left: i * 12.5 + 'px', width: '6px', top: '55px', height: '4px', borderRadius: '3px', background: 'var(--slate)' }));
  const words = (ctx.beats[0] && ctx.beats[0].words) ? ctx.beats[0].words.map((w) => w.t) : [];
  const r = ctx.rand(7); const ph = wbars.map(() => r() * 6.28), fq = wbars.map(() => 3 + r() * 5);
  const wave = { o: 0 };

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    const R = spot.r;
    dim.style.background = `radial-gradient(circle at ${spot.x}px ${spot.y}px, transparent 0px, transparent ${R}px, rgba(14,18,32,${0.6 * spot.d}) ${R + 30}px)`;
    gsap.set(ring, { x: AX + spot.x - R, y: FT + spot.y - R, width: R * 2, height: R * 2, opacity: spot.o });
    thr.style.strokeDashoffset = LEN * (1 - thread.p);
    const pt = thr.getPointAtLength(LEN * thread.p);
    gsap.set(dot, { x: pt.x, y: pt.y });
    let env = 0.12;
    words.forEach((wt) => { const d = (t - wt - 0.08) / 0.13; env += Math.exp(-d * d) * 0.9; });
    if (t > 5.2) env = 0.12 + 0.05 * Math.sin(t * 2);
    wbars.forEach((b, i) => {
      const c = 1 - Math.abs(i - NB / 2) / (NB / 2);
      const h = 4 + 90 * Math.min(1, env) * (0.35 + 0.65 * c) * (0.5 + 0.5 * Math.abs(Math.sin(t * fq[i] + ph[i])));
      b.style.height = h + 'px'; b.style.top = 55 - h / 2 + 'px';
      b.style.opacity = wave.o * (0.35 + 0.65 * c);
      b.style.background = t > tLinks ? 'var(--amber)' : (t > tWhere ? 'var(--teal)' : 'var(--slate)');
    });
  });

  /* ---- timeline ---- */
  const camStart = 960 - (AX + FW / 2), camEnd = 960 - (AX + BX + FW) / 2;
  gsap.set(cam, { x: camStart });
  gsap.set(B, { x: 700, opacity: 0 });
  gsap.set([labA, labB], { opacity: 0, y: 14 });
  gsap.set(bars, { scaleY: 0 });
  gsap.set([...aLines, ...bLines, ...bCards], { scaleX: 0, transformOrigin: '0% 50%' });

  tl.to(drift, { scale: 1.04, duration: ctx.dur, ease: 'none' }, 0);
  tl.fromTo(A, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, 0.05);
  tl.to(wave, { o: 1, duration: 0.6 }, 0.1);
  tl.to(aLines, { scaleX: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out' }, 0.35);
  tl.to(bars, { scaleY: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.6)' }, tScript - 0.1);

  tl.to(spot, { o: 1, d: 1, duration: 0.4, ease: 'power2.out' }, tWhere - 0.2);
  tl.to(spot, { x: 380 + 3 * 72 + 25, y: 250, r: 125, duration: 0.85, ease: 'power3.inOut' }, tWhere - 0.2);
  tl.to(hotBar, { opacity: 1, duration: 0.35 }, tLook);
  tl.to(labA, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)' }, tLook - 0.05);
  tl.to(ring, { boxShadow: '0 0 70px rgba(46,196,182,1), inset 0 0 40px rgba(46,196,182,.5)', duration: 0.3, yoyo: true, repeat: 1 }, tLook + 0.1);

  tl.to(cam, { x: camEnd, duration: 1.1, ease: 'expo.inOut' }, tLinks - 0.3);
  tl.to(B, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, tLinks - 0.2);
  tl.to([...bLines, ...bCards], { scaleX: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }, tLinks + 0.3);
  tl.to(spot, { d: 0.55, duration: 0.6 }, tLinks);
  tl.to(dot, { opacity: 1, duration: 0.2 }, tSmooth - 0.1);
  tl.to(thread, { p: 1, duration: 0.85, ease: 'power2.inOut' }, tSmooth - 0.1);
  tl.to(labB, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)' }, tNext - 0.05);
  tl.fromTo(endPulse, { scale: 0.4, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, tSmooth + 0.75);
  tl.to(B, { boxShadow: '0 40px 100px rgba(0,0,0,.55), 0 0 60px rgba(255,181,71,.45)', duration: 0.6 }, tSlide);
  tl.to(bCards[0], { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, tSlide);
});

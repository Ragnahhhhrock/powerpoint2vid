/* Scene 3 — "A flat chart becomes a moment. The numbers build, and the result lands as it's said."
 * Storyboard: the deck's default chart, as-is, tips back on "flat" and becomes the floor. On "moment" the
 * same data erupts from it as extruded 3D columns under an orbiting camera. Counters build column by column
 * on "numbers build"; on "lands" Q4 ignites ember, the rest dim, and "+117%" (Q4 vs Q1, computed from the
 * deck's own numbers: 2.6 / 1.2 = 2.17) slams in. Data labelled as example data, as in the deck. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const MONO = '"DejaVu Sans Mono", ui-monospace, monospace';
  const flat = ctx.at(0, 'flat'), moment = ctx.at(0, 'moment'), build = ctx.at(1, 'numbers'), lands = ctx.at(1, 'lands'), said = ctx.at(1, 'said');
  const DATA = [['Q1', 1.2], ['Q2', 1.5], ['Q3', 1.9], ['Q4', 2.6]];
  const K = 215, W = 150, Dp = 150, GX = 290;

  stage.style.background = 'radial-gradient(80% 70% at 60% 75%, #1b1611 0%, #0b0a0b 55%, var(--night) 100%)';
  const cool = el('div', 'abs', stage, { left: '-300px', top: '-300px', width: '1300px', height: '1000px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(63,217,198,.10), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '60% 60%' });

  /* the original, ordinary chart slide */
  const opersp = el('div', 'abs', cam, { inset: 0, perspective: '1600px', perspectiveOrigin: '50% 30%' });
  const orig = el('div', 'abs', opersp, { left: '320px', top: '170px', width: '1280px', height: '720px', borderRadius: '6px', overflow: 'hidden', transformOrigin: '50% 100%', boxShadow: '0 40px 90px rgba(0,0,0,.5)' });
  const oi = el('img', 'abs', orig, { inset: 0, width: '100%', height: '100%' }); oi.src = ctx.asset('slide-3.png');
  const otag = el('div', 'abs', cam, { left: '320px', top: '122px', font: `500 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--muted)' }); otag.textContent = 'SLIDE 3  ·  AS WRITTEN';

  /* 3D world */
  const persp = el('div', 'abs', cam, { inset: 0, perspective: '2400px', perspectiveOrigin: '60% 45%' });
  const world = el('div', 'abs', persp, { left: '1130px', top: '800px', width: '0px', height: '0px', transformStyle: 'preserve-3d' });
  const floor = el('div', 'abs', world, { left: '-900px', top: '-600px', width: '1800px', height: '1200px', transform: 'rotateX(90deg)',
    backgroundImage: 'linear-gradient(rgba(63,217,198,.16) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(63,217,198,.16) 1.5px, transparent 1.5px)', backgroundSize: '100px 100px', backgroundPosition: '50px 50px',
    WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, #000 30%, transparent 75%)', maskImage: 'radial-gradient(50% 50% at 50% 50%, #000 30%, transparent 75%)' });
  const floorGlow = el('div', 'abs', world, { left: '-700px', top: '-500px', width: '1400px', height: '1000px', transform: 'rotateX(90deg) translateZ(1px)', background: 'radial-gradient(50% 50% at 62% 50%, rgba(255,150,60,.22), transparent 70%)' });

  const st = DATA.map(() => ({ g: 0, n: 0, dim: 0, hot: 0 }));
  const bars = DATA.map(([q, v], i) => {
    const x = (i - 1.5) * GX;
    const b = el('div', 'abs', world, { left: x + 'px', top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' });
    const f = (css) => el('div', 'abs', b, Object.assign({ backfaceVisibility: 'hidden' }, css));
    const front = f({ left: -W / 2 + 'px', width: W + 'px' }), back = f({ left: -W / 2 + 'px', width: W + 'px' });
    const right = f({ left: -Dp / 2 + 'px', width: Dp + 'px' }), left = f({ left: -Dp / 2 + 'px', width: Dp + 'px' });
    const top = f({ left: -W / 2 + 'px', top: -Dp / 2 + 'px', width: W + 'px', height: Dp + 'px' });
    const val = el('div', 'abs', b, { left: -W / 2 - 60 + 'px', width: W + 120 + 'px', textAlign: 'center', font: '800 54px/1 Inter', letterSpacing: '-.03em', color: '#fff', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' });
    const lab = el('div', 'abs', b, { left: -W / 2 + 'px', width: W + 'px', top: '28px', textAlign: 'center', font: `600 30px/1 ${MONO}`, color: 'rgba(244,238,227,.7)', transform: `translateZ(${Dp / 2}px)` }); lab.textContent = q;
    return { b, front, back, right, left, top, val, lab, v, x };
  });

  /* overlays */
  const title = el('div', 'abs', cam, { left: '150px', top: '120px', font: '800 76px/1 "Inter Display", Inter', letterSpacing: '-.035em', color: 'var(--paper)' }); title.textContent = 'Quarterly revenue';
  const tag = el('div', 'abs', cam, { left: '154px', top: '216px', font: `500 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--muted)' }); tag.textContent = 'EXAMPLE DATA  ·  $M';
  const callout = el('div', 'abs', cam, { left: '146px', top: '292px', transformOrigin: '20% 60%' });
  const big = el('div', '', callout, { font: '900 196px/0.9 "Inter Display", Inter', letterSpacing: '-.055em', backgroundImage: 'linear-gradient(100deg, #ffe0b0, #ffb340 40%, #ff5a2c)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: '10px' }); big.textContent = '+117%';
  const sub = el('div', '', callout, { font: `600 26px/1 ${MONO}`, letterSpacing: '.16em', color: 'rgba(244,238,227,.8)', marginTop: '18px' }); sub.textContent = 'Q4 VS Q1';
  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 45% at 74% 32%, rgba(255,130,70,.5), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.065 });

  const mix = (a, b, t) => a.map((x, k) => Math.round(x + (b[k] - x) * t));
  const rgb = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;
  const P = { // [frontTop, frontBottom, side, top]
    amber: [[255, 200, 112], [226, 128, 44], [150, 80, 26], [255, 228, 176]],
    dim: [[78, 82, 92], [44, 46, 54], [30, 31, 37], [104, 108, 120]],
    hot: [[255, 168, 112], [255, 84, 40], [170, 44, 18], [255, 214, 180]] };
  ctx.onFrame(() => {
    bars.forEach((B, i) => {
      const s = st[i], h = Math.max(0.5, s.g * B.v * K);
      const pal = P.amber.map((c, k) => { let x = mix(c, P.dim[k], s.dim); return mix(x, P.hot[k], s.hot); });
      Object.assign(B.front.style, { top: -h + 'px', height: h + 'px', transform: `translateZ(${Dp / 2}px)`, background: `linear-gradient(180deg, ${rgb(pal[0])}, ${rgb(pal[1])})`,
        boxShadow: s.hot > 0 ? `0 0 ${120 * s.hot}px rgba(255,90,44,${0.75 * s.hot})` : 'none' });
      Object.assign(B.back.style, { top: -h + 'px', height: h + 'px', transform: `rotateY(180deg) translateZ(${Dp / 2}px)`, background: rgb(pal[2]) });
      Object.assign(B.right.style, { top: -h + 'px', height: h + 'px', transform: `rotateY(90deg) translateZ(${W / 2}px)`, background: `linear-gradient(180deg, ${rgb(mix(pal[2], [255, 255, 255], 0.12))}, ${rgb(pal[2])})` });
      Object.assign(B.left.style, { top: -h + 'px', height: h + 'px', transform: `rotateY(-90deg) translateZ(${W / 2}px)`, background: rgb(pal[2]) });
      Object.assign(B.top.style, { transform: `translateY(${-h}px) rotateX(90deg)`, background: rgb(pal[3]) });
      B.b.style.visibility = s.g > 0.002 ? 'visible' : 'hidden';
      B.val.style.top = -h - 112 + 'px'; B.val.style.transform = `translateZ(${Dp / 2}px)`;
      B.val.textContent = '$' + s.n.toFixed(1) + 'M';
      B.val.style.opacity = Math.min(1, s.n * 4) * (1 - 0.55 * s.dim);
    });
  });

  /* ---- timeline ---- */
  gsap.set(world, { rotationX: -24, rotationY: -36 });
  gsap.set([floor, floorGlow, title, tag, callout, ...bars.map((b) => b.lab)], { opacity: 0 });
  tl.fromTo(cam, { scale: 1 }, { scale: 1.04, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(orig, { y: 40, opacity: 0, duration: 0.5 }, 0);
  tl.from(otag, { opacity: 0, duration: 0.4 }, 0.1);
  // "flat": the chart tips back and lies down
  tl.to(orig, { rotationX: 78, y: 40, scale: 1.1, duration: 1.1, ease: 'power3.inOut' }, flat - 0.15);
  tl.to(otag, { opacity: 0, duration: 0.3 }, flat);
  // "moment": chart dissolves into the floor, the world takes over
  tl.to(orig, { opacity: 0, duration: 0.5 }, moment - 0.45);
  tl.to([floor, floorGlow], { opacity: 1, duration: 0.7 }, moment - 0.5);
  tl.to(world, { rotationY: -14, rotationX: -18, duration: ctx.dur - moment + 0.5, ease: 'power1.inOut' }, moment - 0.5);
  tl.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, moment);
  tl.to(tag, { opacity: 1, duration: 0.5 }, moment + 0.2);
  tl.to(bars.map((b) => b.lab), { opacity: 1, duration: 0.4, stagger: 0.06 }, moment - 0.1);
  // erupt: all rise a little on "moment", then build fully one by one on "numbers build"
  st.forEach((s, i) => tl.to(s, { g: 0.18, duration: 0.5, ease: 'back.out(2)' }, moment - 0.15 + i * 0.05));
  st.forEach((s, i) => {
    const t = build - 0.1 + i * 0.3;
    tl.to(s, { g: 1, duration: 0.85, ease: 'back.out(1.3)' }, t);
    tl.fromTo(s, { n: 0 }, { n: DATA[i][1], duration: 0.85, ease: 'power2.out', immediateRender: false }, t);
  });
  // "lands": Q4 ignites, others dim, callout slams
  st.slice(0, 3).forEach((s) => tl.to(s, { dim: 1, duration: 0.5 }, lands));
  tl.to(st[3], { hot: 1, duration: 0.25 }, lands);
  tl.fromTo(callout, { opacity: 0, scale: 2.1, rotation: -3 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.42, ease: 'power4.in', immediateRender: false }, lands - 0.36);
  tl.to(cam, { y: 8, duration: 0.07, yoyo: true, repeat: 1 }, lands + 0.06);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, lands);
  tl.to(st[3], { hot: 0.8, duration: 0.5, yoyo: true, repeat: 1 }, said);
});

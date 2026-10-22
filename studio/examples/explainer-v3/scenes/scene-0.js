/* Scene 0 — "This is an ordinary slide. Watch it get directed."
 * Storyboard: the real default title slide sits in a plain editor window. On "directed": flash, cinema
 * letterbox bars slam in, and the slide breaks into a radial wave of tiles tumbling toward camera,
 * revealing a dark stage with a projector beam and dust. The slide's own line is rebuilt as heavy
 * kinetic type rising through masks, with an amber light sweep and a film-credit line. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const ordinary = ctx.at(0, 'ordinary'), D = ctx.at(1, 'directed');
  const MONO = '"DejaVu Sans Mono", ui-monospace, monospace';
  stage.style.background = 'var(--night)';

  /* ---------- AFTER: the directed stage (built first, sits underneath) ---------- */
  const after = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 55%' });
  el('div', 'abs', after, { inset: 0, background: 'radial-gradient(80% 70% at 62% 58%, #1a1612 0%, #0b0a0a 55%, var(--night) 100%)' });
  // projector beam from top-left, slowly breathing
  const beam = el('div', 'abs', after, { left: '-300px', top: '-420px', width: '2600px', height: '1900px', transformOrigin: '300px 420px', mixBlendMode: 'screen',
    background: 'conic-gradient(from 118deg at 300px 420px, transparent 0deg, rgba(255,190,110,.0) 2deg, rgba(255,190,110,.20) 9deg, rgba(255,220,170,.30) 14deg, rgba(255,190,110,.16) 20deg, transparent 28deg)', filter: 'blur(18px)' });
  const pool = el('div', 'abs', after, { left: '760px', top: '420px', width: '1300px', height: '700px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,170,80,.22), transparent 70%)', mixBlendMode: 'screen' });
  const teal = el('div', 'abs', after, { left: '-200px', top: '600px', width: '1000px', height: '700px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(63,217,198,.14), transparent 70%)' });
  // dust in the beam (procedural, deterministic)
  const dust = el('canvas', 'abs', after, { inset: 0, width: '1920px', height: '1080px', mixBlendMode: 'screen' }); dust.width = 1920; dust.height = 1080;
  const dg = dust.getContext('2d'); const r = ctx.rand(7);
  const motes = Array.from({ length: 140 }, () => ({ u: r(), v: r(), s: 0.6 + r() * 2.4, sp: 0.2 + r() * 0.8, ph: r() * 6.28 }));

  const txt = el('div', 'abs', after, { left: '140px', top: '238px', width: '1700px' });
  const eyebrow = el('div', '', txt, { font: `600 26px/1 ${MONO}`, letterSpacing: '.32em', color: 'var(--amber)', marginBottom: '34px' });
  const ebs = ctx.split(eyebrow, 'POWERPOINT2VID');
  const mk = (text, css) => { const wrap = el('div', '', txt, { overflow: 'hidden', paddingBottom: '.12em', marginBottom: '-.12em' }); const line = el('div', '', wrap, Object.assign({ whiteSpace: 'nowrap' }, css)); return ctx.split(line, text); };
  const c1 = mk('Turn slides into', { font: '800 176px/1.0 "Inter Display", Inter', letterSpacing: '-.045em', color: 'var(--paper)' });
  const c2 = mk('explainer videos.', { font: '900 204px/1.0 "Inter Display", Inter', letterSpacing: '-.05em' });
  c2.forEach((s) => Object.assign(s.style, { backgroundImage: 'linear-gradient(90deg, #ffc65a 0%, #ff8a3d 18%, #ff5a2c 34%, #ff8a3d 47%, #fff3dc 50%, #ff8a3d 53%, #ff5a2c 66%, #ff8a3d 82%, #ffc65a 100%)', backgroundSize: '4000px 100%', backgroundPositionX: (-s.offsetLeft) + 'px', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }));
  const sweep = { x: 0 };
  const rule = el('div', '', txt, { height: '4px', width: '420px', marginTop: '46px', background: 'linear-gradient(90deg, var(--amber), rgba(255,179,64,0))', transformOrigin: '0 50%' });
  const credit = el('div', 'abs', after, { left: '146px', top: '900px', font: `500 22px/1 ${MONO}`, letterSpacing: '.24em', color: 'var(--muted)' });
  credit.innerHTML = 'DIRECTED BY <span style="color:var(--paper)">A.I.</span>';

  /* ---------- BEFORE: a plain editor window with the real slide ---------- */
  const before = el('div', 'abs', stage, { inset: 0, background: '#d9d9dc', transformOrigin: '58% 52%' });
  const win = el('div', 'abs', before, { left: '110px', top: '70px', width: '1700px', height: '940px', background: '#f3f3f3', borderRadius: '12px', boxShadow: '0 30px 80px rgba(0,0,0,.25)', overflow: 'hidden' });
  const bar = el('div', 'abs', win, { left: 0, top: 0, right: 0, height: '56px', background: '#e4e4e6', borderBottom: '1px solid #cfcfd2' });
  ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => el('div', 'abs', bar, { left: 22 + i * 26 + 'px', top: '20px', width: '15px', height: '15px', borderRadius: '50%', background: c }));
  const fname = el('div', 'abs', bar, { left: 0, right: 0, top: '18px', textAlign: 'center', font: '500 20px/1 Inter', color: '#55565c' }); fname.textContent = 'input-deck.pptx';
  const rail = el('div', 'abs', win, { left: 0, top: '56px', width: '250px', bottom: 0, background: '#ebebed', borderRight: '1px solid #d4d4d7' });
  [1, 2, 3, 4, 5].forEach((k, i) => {
    const n = el('div', 'abs', rail, { left: '18px', top: 34 + i * 150 + 'px', font: '500 16px/1 Inter', color: '#77787e' }); n.textContent = k;
    const im = el('img', 'abs', rail, { left: '44px', top: 22 + i * 150 + 'px', width: '180px', height: '101px', border: k === 1 ? '3px solid #d0832a' : '1px solid #c9c9cc', background: '#fff' }); im.src = ctx.asset(`slide-${k}.png`);
  });
  // slide canvas = 16x9 grid of 80px tiles cut from the real slide (no seams: integer px everywhere)
  const SX = 110 + 250 + 85, SY = 70 + 56 + 82; // slide position on stage
  const slideBox = el('div', 'abs', stage, { left: SX + 'px', top: SY + 'px', width: '1280px', height: '720px', perspective: '1500px', perspectiveOrigin: '50% 50%' });
  const plane = el('div', 'abs', slideBox, { inset: 0, transformStyle: 'preserve-3d', boxShadow: '0 6px 24px rgba(0,0,0,.18)' });
  const tiles = [];
  for (let y = 0; y < 9; y++) for (let x = 0; x < 16; x++) {
    const t = el('div', 'abs', plane, { left: x * 80 + 'px', top: y * 80 + 'px', width: '81px', height: '81px', backgroundImage: `url(${ctx.asset('slide-1.png')})`, backgroundSize: '1280px 720px', backgroundPosition: `${-x * 80}px ${-y * 80}px`, backfaceVisibility: 'hidden' });
    const dx = x - 7.5, dy = y - 4, d = Math.sqrt(dx * dx + dy * dy * 1.6);
    tiles.push({ t, x, y, d, dx, dy });
  }
  const whole = el('img', 'abs', plane, { left: 0, top: 0, width: '1280px', height: '720px' }); whole.src = ctx.asset('slide-1.png');
  const label = el('div', 'abs', stage, { left: SX + 'px', top: SY + 740 + 'px', font: `500 20px/1 ${MONO}`, letterSpacing: '.12em', color: '#77787e' });
  label.textContent = 'SLIDE 1 OF 5  ·  DEFAULT TEMPLATE';

  /* ---------- finishing layers ---------- */
  const flash = el('div', 'abs', stage, { inset: 0, background: '#fff6e6', opacity: 0 });
  const lbTop = el('div', 'abs', stage, { left: 0, right: 0, top: 0, height: '96px', background: '#000', transform: 'translateY(-100%)', zIndex: 50 });
  const lbBot = el('div', 'abs', stage, { left: 0, right: 0, bottom: 0, height: '96px', background: '#000', transform: 'translateY(100%)', zIndex: 50 });
  const vig = ctx.fx.vignette({ strength: 0.6 }); gsap.set(vig, { opacity: 0 });
  ctx.fx.grain({ opacity: 0.065 });

  ctx.onFrame((t) => {
    dg.clearRect(0, 0, 1920, 1080);
    const on = Math.max(0, Math.min(1, (t - D) / 0.8));
    if (on <= 0) return;
    for (const m of motes) {
      // motes live inside the beam wedge: angle from the beam origin, distance along it
      const dist = 250 + m.u * 2000, ang = (132 + (m.v - 0.5) * 12) * Math.PI / 180;
      const drift = t * 18 * m.sp;
      const x = Math.sin(ang) * dist + Math.sin(t * m.sp + m.ph) * 14 + drift * 0.4;
      const y = -Math.cos(ang) * dist + Math.cos(t * 0.7 * m.sp + m.ph) * 10 - drift * 0.2;
      const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.3 * m.sp + m.ph));
      dg.globalAlpha = on * tw * 0.75; dg.fillStyle = '#ffe2b8';
      dg.beginPath(); dg.arc(x, y, m.s, 0, 6.283); dg.fill();
    }
    dg.globalAlpha = 1;
    c2.forEach((s) => { s.style.backgroundPositionX = (-s.offsetLeft + sweep.x) + 'px'; });
  });

  /* ---------- timeline ---------- */
  // before: gentle push in; on "ordinary" the chrome greys a touch
  tl.fromTo(before, { scale: 1.0 }, { scale: 1.035, duration: D, ease: 'sine.inOut' }, 0);
  gsap.set(slideBox, { transformOrigin: `${1114 - SX}px ${562 - SY}px` });
  tl.fromTo(slideBox, { scale: 1.0 }, { scale: 1.035, duration: D, ease: 'sine.inOut' }, 0);
  tl.fromTo(label, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, ordinary - 0.1);

  // "directed": flash, letterbox, tiles tumble toward camera in a radial wave
  tl.to(flash, { opacity: 0.85, duration: 0.05 }, D - 0.05);
  tl.to(flash, { opacity: 0, duration: 0.45, ease: 'power2.out' }, D);
  tl.to(before, { opacity: 0, duration: 0.25 }, D - 0.02);
  tl.to(label, { opacity: 0, duration: 0.15 }, D - 0.05);
  tl.set(whole, { opacity: 0 }, D);
  tl.to(plane, { boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.1 }, D);
  tiles.forEach(({ t, d, dx, dy }) => {
    const st = D + 0.02 + d * 0.028;
    tl.to(t, { z: 700 + d * 70, x: dx * 46, y: dy * 40 - 60, rotationX: -80 - dy * 14, rotationY: dx * 12, rotationZ: dx * dy * 1.4, duration: 0.8, ease: 'power3.in' }, st);
    tl.to(t, { opacity: 0, duration: 0.3, ease: 'power1.in' }, st + 0.5);
  });
  tl.to([lbTop, lbBot], { y: 0, duration: 0.45, ease: 'expo.out' }, D + 0.02);
  tl.to(vig, { opacity: 1, duration: 0.6 }, D);

  // after: light comes up, type builds
  gsap.set(beam, { opacity: 0, rotation: -3 });
  tl.to(beam, { opacity: 1, duration: 0.9, ease: 'power2.out' }, D + 0.1);
  tl.to(beam, { rotation: 2, duration: ctx.dur - D, ease: 'sine.inOut' }, D);
  tl.fromTo([pool, teal], { opacity: 0 }, { opacity: 1, duration: 1.2 }, D + 0.2);
  tl.fromTo(after, { scale: 1.08 }, { scale: 1.0, duration: ctx.dur - D + 0.2, ease: 'power2.out' }, D - 0.1);
  const T = D + 0.45;
  tl.fromTo(ebs, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.02 }, T);
  tl.fromTo(c1, { yPercent: 115, rotationX: -60 }, { yPercent: 0, rotationX: 0, duration: 0.8, stagger: 0.025, ease: 'expo.out' }, T + 0.1);
  tl.fromTo(c2, { yPercent: 115, rotationX: -60 }, { yPercent: 0, rotationX: 0, duration: 0.9, stagger: 0.025, ease: 'expo.out' }, T + 0.4);
  tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.inOut' }, T + 1.0);
  tl.fromTo(credit, { opacity: 0, letterSpacing: '.5em' }, { opacity: 1, letterSpacing: '.24em', duration: 1.1, ease: 'expo.out' }, T + 1.3);
  tl.fromTo(sweep, { x: 0 }, { x: -2400, duration: 1.8, ease: 'power2.inOut' }, T + 1.1);
  tl.fromTo(txt, { x: 0 }, { x: 24, duration: ctx.dur - T, ease: 'none' }, T);
});

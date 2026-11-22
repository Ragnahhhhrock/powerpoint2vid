/* Scene 0 — "See empty room on a slide, and your instinct is to fill it. That instinct makes slides harder
 * to read. White space is how you fix it."
 * Storyboard: night stage, a paper slide with only its small top-pinned title. On "empty" a dashed outline
 * marks the unused room. On "instinct… fill" bullets, logos, shapes, a sticker and a tiny chart pile in,
 * overlapping, and the slide starts to jitter. On "harder to read" the clutter blurs, drains to slate grey
 * and vibrates harder. On "White space" everything snaps away in one beat. The slide floods the frame as a
 * vast paper field, "White Space" (150px, ink) eases in centred with a coral "PowerPoint's most underused
 * tool" beneath, and the camera slowly pushes in on the emptiness and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const EMPTY = A(0, 'empty', 1.2), INST = A(0, 'instinct', 2.6), FILL = A(0, 'fill', 3.7);
  const HARD = A(1, 'harder', 5.9), WS = A(2, 'White', 7.45), FIX = A(2, 'fix', 8.8);
  const R = ctx.rand(7);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 50% 45%, #1b2029 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });
  const shake = el('div', 'abs', cam, { inset: 0 });
  const slide = el('div', 'abs', shake, { left: '360px', top: '200px', width: '1200px', height: '675px', background: 'var(--paper)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06)' });

  /* original top-pinned title */
  const origTitle = el('div', 'abs', slide, { left: 0, right: 0, top: '22px', textAlign: 'center', font: '300 46px/1 Inter, Arial', color: '#111' });
  origTitle.textContent = 'Underused Tool';

  /* empty-room outline */
  const dash = el('div', 'abs', slide, { left: '110px', top: '110px', width: '980px', height: '500px', border: '3px dashed var(--slate)', borderRadius: '14px', opacity: 0 });
  const dashLab = el('div', 'abs', dash, { left: 0, right: 0, top: '228px', textAlign: 'center', font: `600 22px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--slate)' });
  dashLab.textContent = 'EMPTY ROOM';

  /* clutter */
  const clutter = el('div', 'abs', slide, { inset: 0 });
  const items = [];
  const mk = (x, y, w, h, css = {}) => {
    const o = el('div', 'abs', clutter, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
    const inner = el('div', 'abs', o, Object.assign({ inset: 0 }, css));
    items.push({ o, inner, p: R() * 6.28, q: R() * 6.28, rot: (R() - 0.5) * 10 });
    return inner;
  };
  const bars = (inner, n, col, w0) => {
    let h = '';
    for (let k = 0; k < n; k++) h += `<div style="position:absolute;left:${k === 0 ? 0 : 30}px;top:${k * 22 + 6}px;width:${k === 0 ? 14 : w0 - k * 90}px;height:${k === 0 ? 14 : 12}px;border-radius:7px;background:${col}"></div>`;
    inner.innerHTML = h;
  };
  // seven bullets
  for (let i = 0; i < 7; i++) {
    const b = mk(60 + R() * 30, 96 + i * 66 + R() * 10, 640, 44);
    bars(b, 2, '#2a2e36', 520 + R() * 100);
  }
  // overlapping second text box
  const tb = mk(470, 170, 520, 230, { background: 'rgba(59,110,245,.08)', border: '2px solid rgba(59,110,245,.4)', borderRadius: '6px' });
  bars(tb, 1, '#000', 0);
  tb.innerHTML = [0, 1, 2, 3, 4].map((k) => `<div style="position:absolute;left:24px;top:${28 + k * 40}px;width:${440 - k * 50}px;height:12px;border-radius:6px;background:var(--slate)"></div>`).join('');
  // two logos
  const l1 = mk(36, 20, 92, 92, { borderRadius: '50%', background: 'linear-gradient(135deg,#6b95ff,var(--calm))', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '900 36px/1 Inter', color: '#fff' });
  l1.textContent = 'AC';
  const l2 = mk(1068, 20, 96, 96, { borderRadius: '22px', background: 'linear-gradient(135deg,#ff8f72,var(--signal))', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '900 44px/1 Inter', color: '#fff' });
  l2.textContent = 'N';
  // decorative shapes
  const star = mk(840, 110, 170, 170);
  star.innerHTML = '<svg viewBox="0 0 100 100" width="170" height="170"><path d="M50 4 L62 38 L98 38 L69 59 L80 94 L50 73 L20 94 L31 59 L2 38 L38 38 Z" fill="#FFC83D" stroke="#e0a200" stroke-width="2"/></svg>';
  const arrow = mk(250, 400, 260, 130);
  arrow.innerHTML = '<svg viewBox="0 0 260 130" width="260" height="130"><path d="M10 45 H170 V10 L250 65 L170 120 V85 H10 Z" fill="rgba(59,110,245,.75)"/></svg>';
  mk(640, 380, 270, 150, { background: 'rgba(255,90,60,.45)', borderRadius: '30px' });
  mk(110, 470, 170, 170, { borderRadius: '50%', background: 'rgba(217,221,227,.9)', border: '6px solid #b8bec8' });
  // sticker
  const st = mk(990, 300, 140, 140, { borderRadius: '50%', background: 'var(--signal)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '900 38px/1 Inter', color: '#fff', boxShadow: '0 0 0 8px rgba(255,90,60,.3)' });
  st.textContent = 'NEW!';
  // tiny chart
  const ch = mk(890, 470, 230, 170, { background: '#fff', border: '2px solid #c9ced6', borderRadius: '6px' });
  ch.innerHTML = [38, 62, 50, 90].map((h, k) => `<div style="position:absolute;left:${28 + k * 48}px;bottom:22px;width:30px;height:${h}px;background:var(--calm);border-radius:3px 3px 0 0"></div>`).join('') + '<div style="position:absolute;left:18px;right:18px;bottom:20px;height:2px;background:#9aa1ab"></div>';

  const tint = el('div', 'abs', slide, { inset: 0, background: 'var(--slate)', mixBlendMode: 'multiply', opacity: 0, pointerEvents: 'none' });

  /* hero */
  const hero = el('div', 'abs', cam, { left: '80px', right: '80px', top: 0, height: '1080px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' });
  const title = el('div', '', hero, { font: '800 150px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const chars = ctx.split(title, 'White Space', 'char');
  const sub = el('div', '', hero, { marginTop: '34px', font: `600 30px/1 ${MONO}`, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--signal)' });
  sub.textContent = "PowerPoint's most underused tool";
  const rule = el('div', '', hero, { marginTop: '30px', width: '120px', height: '4px', borderRadius: '2px', background: 'var(--signal)', transformOrigin: '50% 50%' });

  const flash = el('div', 'abs', stage, { inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' });
  ctx.fx.vignette({ strength: 0.3 });
  ctx.fx.grain({ opacity: 0.05 });

  /* jitter driven per frame */
  const J = { a: 0 };
  ctx.onFrame((t) => {
    const a = J.a;
    items.forEach((it) => {
      const sx = Math.sin(t * 23 + it.p) * a * 2.2, sy = Math.cos(t * 19 + it.q) * a * 1.8, r = Math.sin(t * 17 + it.q) * a * 0.6;
      it.inner.style.transform = `translate(${sx}px,${sy}px) rotate(${r}deg)`;
    });
    shake.style.transform = `translate(${Math.sin(t * 31) * a * 1.3}px,${Math.cos(t * 27) * a * 1}px)`;
  });

  /* ---- timeline ---- */
  gsap.set(items.map((i) => i.o), { opacity: 0 });
  gsap.set([...chars, sub], { opacity: 0 });
  gsap.set(rule, { scaleX: 0 });
  gsap.set(clutter, { filter: 'blur(0px) grayscale(0) contrast(1)' });

  tl.fromTo(slide, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, 0);
  // "empty room"
  tl.to(dash, { opacity: 0.9, duration: 0.6 }, EMPTY - 0.15);
  tl.fromTo(dash, { scale: 0.97 }, { scale: 1, duration: 1.2, ease: 'power2.out', immediateRender: false }, EMPTY - 0.15);
  tl.to(dash, { opacity: 0, duration: 0.25 }, INST);

  // "instinct is to fill it": clutter piles in
  const span = Math.max(0.8, FILL + 0.35 - INST);
  items.forEach((it, i) => {
    const t = INST + (span * i) / (items.length - 1);
    tl.fromTo(it.o, { opacity: 0, scale: 0.4, y: -50, rotation: it.rot * 3 }, { opacity: 1, scale: 1, y: 0, rotation: it.rot, duration: 0.45, ease: 'back.out(2)' }, t);
  });
  tl.to(J, { a: 1.2, duration: span, ease: 'power1.in' }, INST);

  // "harder to read": blur, drain to slate, vibrate
  tl.to(clutter, { filter: 'blur(3.5px) grayscale(1) contrast(0.75)', duration: 0.7, ease: 'power2.out' }, HARD - 0.1);
  tl.to(origTitle, { filter: 'blur(3px)', opacity: 0.6, duration: 0.7 }, HARD - 0.1);
  tl.to(tint, { opacity: 0.28, duration: 0.7 }, HARD - 0.1);
  tl.to(J, { a: 3.2, duration: 0.6, ease: 'power2.out' }, HARD - 0.1);

  // "White space": one snap
  const S = WS - 0.12;
  tl.to(items.map((i) => i.o), { scale: 0, opacity: 0, duration: 0.18, ease: 'power4.in', stagger: { each: 0.006, from: 'center' } }, S);
  tl.to([origTitle, tint], { opacity: 0, duration: 0.15, ease: 'power4.in' }, S);
  tl.to(J, { a: 0, duration: 0.12 }, S);
  tl.to(slide, { left: 0, top: 0, width: 1920, height: 1080, borderRadius: 0, duration: 0.45, ease: 'expo.inOut' }, WS + 0.02);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 0.35, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, WS + 0.35);

  // calm hero
  tl.fromTo(chars, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', stagger: 0.04 }, WS + 0.4);
  tl.to(rule, { scaleX: 1, duration: 1.0, ease: 'power3.out' }, Math.min(FIX - 0.3, WS + 1.0));
  tl.fromTo(sub, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, Math.min(FIX - 0.2, WS + 1.1));

  // slow push-in on the emptiness
  tl.to(cam, { scale: 1.05, duration: Math.max(1, ctx.dur - (WS + 0.4)), ease: 'power1.inOut' }, WS + 0.4);
});

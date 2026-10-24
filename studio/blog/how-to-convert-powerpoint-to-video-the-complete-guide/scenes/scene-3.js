/* Scene 3: "Ten minutes of tidying saves a lot of re-exporting. Keep one idea per slide, and make each
 * headline the point, like 'Returns are processed within five days'."
 * Storyboard: the title "Get the deck ready for video" builds word by word while the original slide drifts in
 * on the right. "Ten minutes": a 10-MIN ring fills. "re-exporting": stacked export files appear and are struck
 * out. Beat 2: two key lines land on "one idea" and "headline", and "point" gets highlighted. On "like", the
 * cluttered slide flips away and a clean slide lands. Its headline, "Returns are processed within five days",
 * builds word by word as it is spoken. */
P2V.scene((ctx) => {
  const { tl, el, stage, split } = ctx;
  const A = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const tTen = A(0, 'Ten', 0.55), tSaves = A(0, 'saves', 1.72), tRe = A(0, 're-exporting.', 2.44);
  const tOne = A(1, 'one', 3.96), tHead = A(1, 'headline', 5.75), tPoint = A(1, 'point,', 6.26), tLike = A(1, 'like', 7.26);
  const tAre = A(1, 'are', 7.98), tProc = A(1, 'processed', 8.07), tWithin = A(1, 'within', 8.56), tFive = A(1, 'five', 8.87), tDays = A(1, 'days\'.', tFive + 0.31);
  const wordTimes = [tAre - 0.45, tAre, tProc, tWithin, tFive, tDays];

  stage.style.background = 'radial-gradient(60% 70% at 72% 45%, #1b1f55 0%, var(--ink) 45%, var(--night) 100%)';
  const glow = el('div', 'abs', stage, { left: '1000px', top: '180px', width: '900px', height: '700px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(109,74,255,.28), transparent)', filter: 'blur(20px)' });
  const persp = el('div', 'abs', stage, { inset: 0, perspective: '1800px' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '700px 540px' });

  /* title */
  const title = el('div', 'abs', cam, { left: '140px', top: '110px', width: '1640px', font: '800 76px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const tw = split(title, 'Get the deck ready for video', 'word');
  const kicker = el('div', 'abs', cam, { left: '144px', top: '78px', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--violet-hi)' });
  kicker.textContent = 'STEP 1 · PREP';

  /* original slide (drifts in) */
  const orig = el('div', 'abs', persp, { left: '1040px', top: '300px', width: '740px', height: '416px', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 50px 110px rgba(0,0,0,.55)', transformOrigin: '50% 50%' });
  const oi = el('img', 'abs', orig, { inset: 0, width: '100%', height: '100%' }); oi.src = ctx.asset('slide-4.png');
  const origTag = el('div', 'abs', persp, { left: '1040px', top: '262px', font: '600 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--muted)' });
  origTag.textContent = 'SLIDE 4 · AS WRITTEN';

  /* clean slide */
  const clean = el('div', 'abs', persp, { left: '1040px', top: '300px', width: '740px', height: '416px', borderRadius: '14px', background: 'linear-gradient(160deg, #ffffff, var(--paper))', boxShadow: '0 50px 110px rgba(0,0,0,.55), 0 0 80px rgba(109,74,255,.35)', overflow: 'hidden', transformOrigin: '50% 50%' });
  el('div', 'abs', clean, { left: 0, top: 0, width: '12px', height: '100%', background: 'var(--violet)' });
  const cTag = el('div', 'abs', clean, { left: '56px', top: '50px', font: '700 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--violet)' });
  cTag.textContent = 'HEADLINE = THE POINT';
  const cHead = el('div', 'abs', clean, { left: '56px', top: '100px', width: '630px', font: '800 60px/1.08 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  const cw = split(cHead, 'Returns are processed within five days', 'word');
  const cBar = el('div', 'abs', clean, { left: '56px', top: '350px', width: '220px', height: '8px', borderRadius: '4px', background: 'var(--mint)', transformOrigin: '0 50%' });

  /* beat 0: ten-minute ring + re-exports */
  const b0 = el('div', 'abs', cam, { left: '140px', top: '340px', width: '860px', height: '320px' });
  const ring = el('div', 'abs', b0, { left: 0, top: 0, width: '260px', height: '260px' });
  ring.innerHTML = `<svg width="260" height="260" viewBox="0 0 260 260"><circle cx="130" cy="130" r="112" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="14"/>
    <circle id="arc" cx="130" cy="130" r="112" fill="none" stroke="#1fbf8f" stroke-width="14" stroke-linecap="round" stroke-dasharray="704" stroke-dashoffset="704" transform="rotate(-90 130 130)" style="filter:drop-shadow(0 0 12px rgba(31,191,143,.7))"/></svg>`;
  const arc = ring.querySelector('#arc');
  const ten = el('div', 'abs', ring, { left: 0, top: '62px', width: '260px', textAlign: 'center', font: '900 110px/1 Inter Display, Inter', letterSpacing: '-.05em', color: '#fff' });
  ten.textContent = '10';
  const minL = el('div', 'abs', ring, { left: 0, top: '176px', width: '260px', textAlign: 'center', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: 'var(--mint)' });
  minL.textContent = 'MIN';
  const chips = ['deck_v2.mp4', 'deck_v3.mp4', 'deck_v4_FINAL.mp4'].map((s, i) => {
    const c = el('div', 'abs', b0, { left: '330px', top: 20 + i * 76 + 'px', width: '400px', height: '58px', borderRadius: '10px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', font: '600 24px/58px ui-monospace, Menlo, monospace', color: 'var(--muted)', paddingLeft: '24px', boxSizing: 'border-box' });
    c.textContent = '↻ ' + s;
    const strike = el('div', 'abs', c, { left: '14px', right: '14px', top: '28px', height: '4px', borderRadius: '2px', background: 'var(--coral)', boxShadow: '0 0 12px rgba(255,107,74,.8)', transformOrigin: '0 50%' });
    return { c, strike };
  });

  /* beat 1: key lines */
  const mkLine = (txt, top, color) => {
    const row = el('div', 'abs', cam, { left: '140px', top: top + 'px', display: 'flex', alignItems: 'center', gap: '26px' });
    const dot = el('div', '', row, { width: '56px', height: '56px', borderRadius: '50%', background: color, boxShadow: `0 0 30px ${color}`, font: '900 32px/56px Inter', textAlign: 'center', color: 'var(--night)', flex: '0 0 auto' });
    dot.textContent = '✓';
    const t = el('div', '', row, { font: '700 52px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff', whiteSpace: 'nowrap', position: 'relative' });
    return { row, dot, t };
  };
  const L1 = mkLine('', 360, '#1fbf8f'); L1.t.textContent = 'One idea per slide';
  const L2 = mkLine('', 470, '#8f75ff');
  L2.t.innerHTML = 'Headline = <span style="position:relative;display:inline-block">the point<span class="hl" style="position:absolute;left:-6px;right:-6px;bottom:4px;height:18px;background:rgba(255,107,74,.55);z-index:-1;border-radius:4px;transform-origin:0 50%"></span></span>';
  L2.t.style.zIndex = 1; L2.t.style.isolation = 'isolate';
  const hl = L2.t.querySelector('.hl');

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  // camera drift
  tl.fromTo(cam, { scale: 1 }, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);
  tl.fromTo(glow, { x: -40 }, { x: 40, duration: ctx.dur, ease: 'sine.inOut' }, 0);

  // title builds word by word
  tl.from(kicker, { opacity: 0, x: -20, duration: 0.5 }, 0.05);
  tl.from(tw, { opacity: 0, y: 40, rotationX: -50, duration: 0.6, stagger: 0.09, ease: 'back.out(1.6)' }, 0.1);

  // slide drifts in
  gsap.set(orig, { filter: 'brightness(1) blur(0px)' });
  tl.fromTo(orig, { opacity: 0, x: 160, rotationY: -28, rotationZ: 2 }, { opacity: 1, x: 0, rotationY: -12, rotationZ: 1, duration: 1.3, ease: 'expo.out' }, 0.3);
  tl.from(origTag, { opacity: 0, duration: 0.5 }, 0.8);
  tl.to(orig, { rotationY: -6, y: -14, duration: tLike - 1.6, ease: 'sine.inOut' }, 1.6);

  // beat 0: ring
  tl.from(ring, { scale: 0.6, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' }, tTen - 0.15);
  tl.to(arc, { attr: { 'stroke-dashoffset': 0 }, duration: 1.6, ease: 'power2.inOut' }, tTen);
  tl.fromTo(ring, { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, tSaves);
  // re-exports appear then struck
  chips.forEach((c, i) => {
    tl.from(c.c, { opacity: 0, x: 60, duration: 0.45, ease: 'back.out(1.6)' }, tSaves - 0.1 + i * 0.12);
    tl.from(c.strike, { scaleX: 0, duration: 0.3, ease: 'power2.out' }, tRe + 0.1 + i * 0.12);
    tl.to(c.c, { opacity: 0.35, duration: 0.3 }, tRe + 0.3 + i * 0.12);
  });
  // clear beat 0
  tl.to(b0, { opacity: 0, y: -40, filter: 'blur(6px)', duration: 0.5, ease: 'power2.in' }, tOne - 0.55);
  gsap.set(b0, { filter: 'blur(0px)' });

  // beat 1 key lines
  [[L1, tOne], [L2, tHead]].forEach(([L, t]) => {
    tl.from(L.dot, { scale: 0, rotation: -90, duration: 0.5, ease: 'back.out(2)' }, t - 0.2);
    tl.from(L.t, { opacity: 0, x: -40, duration: 0.55, ease: 'back.out(1.4)' }, t - 0.1);
  });
  tl.from(hl, { scaleX: 0, duration: 0.4, ease: 'power2.out' }, tPoint);
  tl.to(L1.row, { opacity: 0.5, duration: 0.4 }, tHead);

  // "like": cluttered slide flips away, clean slide lands
  tl.to(orig, { rotationY: 80, opacity: 0, x: -60, filter: 'brightness(.4) blur(4px)', duration: 0.55, ease: 'power3.in' }, tLike - 0.3);
  tl.to(origTag, { opacity: 0, duration: 0.3 }, tLike - 0.3);
  tl.fromTo(clean, { opacity: 0, rotationY: -80, x: 60 }, { opacity: 1, rotationY: -6, x: 0, duration: 0.7, ease: 'back.out(1.3)' }, tLike + 0.2);
  tl.to(clean, { rotationY: -2, y: -10, duration: ctx.dur - tLike - 0.9, ease: 'sine.inOut' }, tLike + 0.9);
  tl.from(cTag, { opacity: 0, y: 10, duration: 0.4 }, tLike + 0.5);
  cw.forEach((w, i) => tl.from(w, { opacity: 0, y: 30, duration: 0.4, ease: 'back.out(1.8)' }, wordTimes[i] - 0.05));
  tl.from(cBar, { scaleX: 0, duration: 0.6, ease: 'expo.out' }, tDays + 0.15);
  tl.to(glow, { opacity: 1.4, duration: 0.5 }, tDays);
});

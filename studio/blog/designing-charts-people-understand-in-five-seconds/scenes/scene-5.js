/* Scene 5 — "The eye goes straight to the colour, and a direct label means people with colour vision
 * deficiency get the message too."
 * Storyboard: the same grey-plus-one-orange chart, held on the ink stage as two side-by-side views.
 * On "straight to the colour" an eye-path darts from an eye icon straight to the orange bar.
 * "direct label" makes the Q4 labels pulse. On "colour vision deficiency" the right view fully
 * desaturates (its orange bar turns grey), yet its Q4 label still glows. On "message" a second
 * eye-path lands on that label, and the camera pushes slowly toward it as the anchor.
 * Bar heights are illustrative (no deck numbers shown). */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (w, fb) => { const v = ctx.at(0, w); return Number.isFinite(v) ? v : fb; };
  const tEye = W('eye', 0.75), tStraight = W('straight', 1.19), tColour = W('colour,', W('colour', 1.71));
  const tDirect = W('direct', 2.44), tLabel = W('label', 2.8), tVision = W('vision', 4.21);
  const tCvd = W('deficiency', 4.52), tMsg = W('message', 5.62);
  const tCvdWord = tVision - 0.3;

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #232d42 0%, var(--ink) 55%, var(--night) 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1580px 380px' });

  const PW = 780, PH = 620, PT = 250, BASE = 520;
  const HEIGHTS = [180, 230, 280, 400];
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  function panel(left) {
    const p = el('div', 'abs', cam, { left: left + 'px', top: PT + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '22px',
      background: 'linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))', border: '1px solid rgba(255,255,255,.08)',
      boxShadow: '0 40px 90px rgba(0,0,0,.45)' });
    const bars = el('div', 'abs', p, { inset: 0 });
    gsap.set(bars, { filter: 'grayscale(0) brightness(1)' });
    el('div', 'abs', bars, { left: '80px', width: '660px', top: BASE + 'px', height: '2px', background: 'rgba(221,225,231,.25)' });
    const cols = HEIGHTS.map((h, i) => {
      const x = 110 + i * 160, hot = i === 3;
      const b = el('div', 'abs', bars, { left: x + 'px', top: BASE - h + 'px', width: '110px', height: h + 'px', borderRadius: '10px 10px 3px 3px',
        background: hot ? 'linear-gradient(180deg, #ff8a6f, var(--signal))' : 'linear-gradient(180deg, #8b919b, #6b717b)',
        boxShadow: hot ? '0 0 50px rgba(255,90,60,.45)' : 'none' });
      if (!hot) {
        const l = el('div', 'abs', p, { left: x + 'px', width: '110px', top: BASE + 22 + 'px', textAlign: 'center', font: '700 28px/1 Inter', color: 'rgba(163,169,179,.75)' });
        l.textContent = 'Q' + (i + 1);
      }
      return b;
    });
    // direct label beside the hot bar (kept outside the desaturated layer)
    const lab = el('div', 'abs', p, { left: '590px', width: '110px', top: BASE - 400 - 84 + 'px', textAlign: 'center',
      font: '900 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', textShadow: '0 0 24px rgba(255,255,255,.35)' });
    lab.textContent = 'Q4';
    const tick = el('div', 'abs', p, { left: '643px', top: BASE - 400 - 18 + 'px', width: '4px', height: '14px', borderRadius: '2px', background: 'var(--paper)', transformOrigin: '50% 0%' });
    return { p, bars, cols, lab, tick };
  }
  const L = panel(150), R = panel(990);

  const tagL = el('div', 'abs', cam, { left: '150px', top: '205px', font: mono, letterSpacing: '.14em', color: 'var(--grey)' });
  tagL.textContent = 'TYPICAL VISION';
  const tagR = el('div', 'abs', cam, { left: '990px', top: '205px', font: mono, letterSpacing: '.14em', color: 'var(--grey)' });
  tagR.textContent = 'SAME CHART';
  const tagR2 = el('div', 'abs', cam, { left: '990px', top: '205px', font: mono, letterSpacing: '.14em', color: 'var(--paper)' });
  tagR2.textContent = 'COLOUR VISION DEFICIENCY';

  // eye icon + paths
  const EX = 960, EY = 120;
  const eye = el('div', 'abs', cam, { left: EX - 50 + 'px', top: EY - 30 + 'px', width: '100px', height: '60px' });
  eye.innerHTML = `<svg width="100" height="60" viewBox="0 0 100 60"><path d="M6 30 Q50 -6 94 30 Q50 66 6 30 Z" fill="none" stroke="#F6F4EF" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="30" r="13" fill="#F6F4EF"/><circle cx="50" cy="30" r="5" fill="#0E1420"/></svg>`;
  const lx = 150 + 645, ly = PT + BASE - 400 - 10;
  const rx = 990 + 590 - 14, ry = PT + BASE - 400 - 52;
  const svg = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', pointerEvents: 'none' });
  svg.innerHTML = `<svg width="1920" height="1080">
    <path id="p1" pathLength="1" d="M${EX - 40} ${EY + 30} Q ${EX - 80} ${ly - 120}, ${lx} ${ly}" fill="none" stroke="#FF5A3C" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>
    <path id="p2" pathLength="1" d="M${EX + 40} ${EY + 30} Q ${EX + 260} ${ry - 140}, ${rx} ${ry}" fill="none" stroke="#F6F4EF" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>`;
  const p1 = svg.querySelector('#p1'), p2 = svg.querySelector('#p2');
  const ring = el('div', 'abs', cam, { left: lx - 70 + 'px', top: ly - 70 + 'px', width: '140px', height: '140px', borderRadius: '50%', border: '5px solid var(--signal)', opacity: 0 });
  const ring2 = el('div', 'abs', cam, { left: rx - 10 + 'px', top: ry - 10 + 'px', width: '170px', height: '170px', borderRadius: '50%', border: '5px solid var(--paper)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set([tagR2, eye], { opacity: 0 });
  gsap.set([L.tick, R.tick], { scaleY: 0 });
  tl.from([L.p, R.p], { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0);
  tl.from([tagL, tagR], { opacity: 0, duration: 0.5, stagger: 0.1 }, 0.15);
  tl.to(cam, { scale: 1.02, duration: tCvd, ease: 'none' }, 0);

  // the eye
  tl.fromTo(eye, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.8)', immediateRender: false }, tEye - 0.3);
  tl.to(eye, { scaleY: 0.15, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.inOut' }, tEye + 0.15);

  // "straight to the colour"
  tl.to(p1, { attr: { 'stroke-dashoffset': 0 }, duration: Math.max(0.35, tColour - tStraight), ease: 'power3.in' }, tStraight);
  tl.fromTo(ring, { scale: 0.4, opacity: 1 }, { scale: 1.8, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, tColour);
  tl.to(L.cols[3], { boxShadow: '0 0 90px rgba(255,90,60,.8)', duration: 0.4 }, tColour);
  tl.to(L.cols.slice(0, 3), { opacity: 0.6, duration: 0.5 }, tColour);

  // "direct label"
  [L, R].forEach((P, i) => {
    tl.to(P.tick, { scaleY: 1, duration: 0.35, ease: 'power2.out' }, tDirect + i * 0.08);
    tl.fromTo(P.lab, { scale: 1 }, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tLabel + i * 0.08);
  });

  // "colour vision deficiency"
  tl.to(tagR, { opacity: 0, duration: 0.3 }, tCvdWord);
  tl.fromTo(tagR2, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.45, immediateRender: false }, tCvdWord + 0.1);
  tl.to(R.bars, { filter: 'grayscale(1) brightness(0.95)', duration: 0.9, ease: 'power2.inOut' }, tCvd - 0.2);
  tl.to(R.cols[3], { boxShadow: '0 0 0px rgba(255,90,60,0)', duration: 0.9, ease: 'power2.inOut' }, tCvd - 0.2);
  tl.to(R.lab, { textShadow: '0 0 40px rgba(255,255,255,.85)', duration: 0.6 }, tCvd + 0.4);
  tl.to(L.p, { opacity: 0.75, duration: 0.8 }, tCvd + 0.4);
  tl.to(tagL, { opacity: 0.5, duration: 0.8 }, tCvd + 0.4);

  // "get the message": second eye-path lands on the label, slow push-in
  tl.to(p2, { attr: { 'stroke-dashoffset': 0 }, duration: 0.45, ease: 'power3.in' }, tMsg - 0.45);
  tl.fromTo(ring2, { scale: 0.5, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, tMsg);
  tl.fromTo(R.lab, { scale: 1 }, { scale: 1.12, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tMsg);
  tl.to(cam, { scale: 1.09, duration: Math.max(1, ctx.dur - tCvd), ease: 'power2.out' }, tCvd);
});

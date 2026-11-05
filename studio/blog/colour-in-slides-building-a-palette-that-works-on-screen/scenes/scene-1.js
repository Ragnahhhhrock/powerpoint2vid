/* Scene 1 — "Most slide palettes trip over the same things: too many colours, brand colours everywhere,
 * weak contrast, and colour carrying meaning on its own."
 * Storyboard: ink-dark stage, one mock slide in the centre. On "too many colours" it floods with a rainbow
 * of shapes. On "brand colours everywhere" every element turns one loud brand hue. On "weak contrast"
 * everything fades to grey-on-grey and nearly vanishes. On "meaning on its own" two identical lines differ
 * only by red and green, then a coral "?" lands and the lines drain to grey, indistinguishable.
 * One 90px label per failure, with a mono 01/04 counter. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const tA = ctx.at(0, 'too'), tB = ctx.at(0, 'brand'), tC = ctx.at(0, 'weak');
  const tD = ctx.at(0, 'carrying') - 0.35, tE = ctx.at(0, 'meaning'), tF = ctx.at(0, 'own');
  const RAINBOW = ['#FF3B3B', '#FFB800', '#2EC4B6', '#7B2CFF', '#00A3FF', '#FF5AC8', '#7ED321', '#FF7A00'];
  const BRAND = '#D4148C', BRAND_BG = '#FBD3EA';

  stage.style.background = 'radial-gradient(70% 70% at 50% 40%, #1C2333 0%, #0F1420 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 420px' });

  /* noisy rainbow glow behind slide (phase 1) */
  const glow = el('div', 'abs', cam, { left: '300px', top: '20px', width: '1320px', height: '730px', borderRadius: '50%', opacity: 0,
    background: 'conic-gradient(from 0deg, #FF3B3B, #FFB800, #7ED321, #2EC4B6, #00A3FF, #7B2CFF, #FF5AC8, #FF3B3B)', filter: 'blur(90px)' });

  /* mock slide */
  const SL = el('div', 'abs', cam, { left: '400px', top: '70px', width: '1120px', height: '630px', borderRadius: '14px', overflow: 'hidden',
    background: '#F6F4EF', boxShadow: '0 50px 110px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06)' });
  const content = el('div', 'abs', SL, { inset: 0 });
  const title = el('div', 'abs', content, { left: '70px', top: '58px', font: '800 60px/1 Inter Display, Inter', letterSpacing: '-.035em', color: '#1C2333' });
  title.textContent = 'Quarterly Review';
  const lines = [[420, 178], [360, 220], [390, 262]].map(([w, y]) =>
    el('div', 'abs', content, { left: '70px', top: y + 'px', width: w + 'px', height: '18px', borderRadius: '9px', background: '#C9CCD3' }));
  const circle = el('div', 'abs', content, { left: '70px', top: '340px', width: '170px', height: '170px', borderRadius: '50%', background: '#7A8091' });
  const box = el('div', 'abs', content, { left: '280px', top: '340px', width: '250px', height: '170px', borderRadius: '16px', background: '#C9CCD3' });
  const axis = el('div', 'abs', content, { left: '610px', top: '540px', width: '440px', height: '3px', background: '#1C2333' });
  const bars = [170, 250, 205, 320].map((h, i) =>
    el('div', 'abs', content, { left: 640 + i * 100 + 'px', top: 540 - h + 'px', width: '66px', height: h + 'px', borderRadius: '8px 8px 2px 2px', background: '#7A8091' }));
  const shapes = [...lines, circle, box, ...bars];

  const r = ctx.rand(7);
  const confetti = Array.from({ length: 14 }, (_, i) => {
    const s = 26 + r() * 46;
    return el('div', 'abs', content, { left: 40 + r() * 1020 + 'px', top: 30 + r() * 560 + 'px', width: s + 'px', height: s + 'px',
      borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '6px' : '0', background: RAINBOW[i % RAINBOW.length], transform: `rotate(${r() * 90}deg)` });
  });

  /* meaning-alone chart */
  const svgWrap = el('div', 'abs', SL, { inset: 0, opacity: 0 });
  const ptsA = [[140, 470], [300, 400], [460, 430], [620, 300], [780, 330], [940, 210]];
  const toD = (pts, dy) => 'M' + pts.map(([x, y]) => `${x} ${y + dy}`).join(' L ');
  svgWrap.innerHTML = `<svg width="1120" height="630">
    <line x1="120" y1="540" x2="1000" y2="540" stroke="#7A8091" stroke-width="3"/>
    <line x1="120" y1="140" x2="120" y2="540" stroke="#7A8091" stroke-width="3"/>
    <path class="ln" d="${toD(ptsA, 0)}" pathLength="1" fill="none" stroke="#E53935" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="ln" d="${toD(ptsA, 60)}" pathLength="1" fill="none" stroke="#43A047" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="160" cy="90" r="16" fill="#E53935"/><circle cx="210" cy="90" r="16" fill="#43A047"/></svg>`;
  const lnPaths = [...svgWrap.querySelectorAll('.ln')];
  gsap.set(lnPaths, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(svgWrap, { filter: 'grayscale(0)' });
  const qm = el('div', 'abs', cam, { left: '1370px', top: '40px', width: '260px', textAlign: 'center', font: '900 300px/1 Inter Display, Inter',
    color: '#FF5A36', textShadow: '0 0 60px rgba(255,90,54,.6)', opacity: 0, transformOrigin: '50% 70%' });
  qm.textContent = '?';

  /* labels */
  const count = el('div', 'abs', cam, { left: 0, width: '1920px', top: '748px', textAlign: 'center', font: '600 24px/1 ui-monospace, Menlo, monospace',
    letterSpacing: '.24em', color: '#FF5A36' });
  const intro = el('div', 'abs', cam, { left: 0, width: '1920px', top: '790px', textAlign: 'center', font: '600 26px/1 ui-monospace, Menlo, monospace',
    letterSpacing: '.22em', color: '#7A8091' });
  intro.textContent = 'WHERE PALETTES GO WRONG';
  const LABELS = ['Too many colours', 'Brand everywhere', 'Weak contrast', 'Colour alone'];
  const labs = LABELS.map((t) => {
    const d = el('div', 'abs', cam, { left: 0, width: '1920px', top: '785px', textAlign: 'center', font: '800 90px/1.05 Inter Display, Inter',
      letterSpacing: '-.04em', color: '#F6F4EF', opacity: 0 });
    d.textContent = t; return d;
  });
  const times = [tA, tB, tC, tD];
  ctx.onFrame((t) => {
    let n = 0; times.forEach((x, i) => { if (t >= x - 0.1) n = i + 1; });
    count.textContent = n ? `0${n} / 04` : '';
  });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.from(SL, { y: 40, opacity: 0, scale: 0.97, duration: 0.8, ease: 'power3.out' }, 0.05);
  tl.from(intro, { opacity: 0, y: 14, duration: 0.6 }, 0.35);
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);

  // label swaps
  tl.to(intro, { opacity: 0, y: -14, duration: 0.3, ease: 'power2.in' }, tA - 0.3);
  labs.forEach((l, i) => {
    tl.fromTo(l, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)', immediateRender: false }, times[i] - 0.05);
    if (i < 3) tl.to(l, { opacity: 0, y: -24, duration: 0.25, ease: 'power2.in' }, times[i + 1] - 0.3);
  });
  tl.from(count, { opacity: 0, duration: 0.3 }, tA - 0.1);

  // 1. too many colours
  shapes.forEach((s, i) => tl.to(s, { backgroundColor: RAINBOW[i % RAINBOW.length], duration: 0.35, ease: 'power2.out' }, tA + i * 0.04));
  tl.to(title, { color: '#7B2CFF', duration: 0.3 }, tA);
  tl.to(SL, { backgroundColor: '#FFF6C9', duration: 0.4 }, tA + 0.1);
  tl.to(glow, { opacity: 0.35, duration: 0.6 }, tA);
  tl.from(confetti, { scale: 0, opacity: 0, duration: 0.45, ease: 'back.out(2)', stagger: 0.04 }, tA + 0.1);
  tl.to(glow, { rotation: 40, duration: tC - tA, ease: 'none' }, tA);

  // 2. brand everywhere
  tl.to([...shapes, ...confetti], { backgroundColor: BRAND, duration: 0.3, ease: 'power3.out', stagger: 0.015 }, tB - 0.05);
  tl.to(title, { color: BRAND, duration: 0.3 }, tB);
  tl.to(axis, { backgroundColor: BRAND, duration: 0.3 }, tB);
  tl.to(SL, { backgroundColor: BRAND_BG, duration: 0.35 }, tB);
  tl.to(glow, { opacity: 0, duration: 0.4 }, tB);
  tl.to(stage, { background: 'radial-gradient(70% 70% at 50% 40%, #3a1830 0%, #0F1420 75%)', duration: 0.4 }, tB);

  // 3. weak contrast
  tl.to(confetti, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in', stagger: 0.01 }, tC - 0.2);
  tl.to(SL, { backgroundColor: '#CDD0D6', duration: 0.7, ease: 'power2.inOut' }, tC);
  tl.to([...shapes, axis], { backgroundColor: '#C2C5CC', duration: 0.7, ease: 'power2.inOut' }, tC);
  tl.to(title, { color: '#BDC0C7', duration: 0.7, ease: 'power2.inOut' }, tC);
  tl.to(stage, { background: 'radial-gradient(70% 70% at 50% 40%, #1C2333 0%, #0F1420 75%)', duration: 0.5 }, tC);

  // 4. colour carrying meaning alone
  tl.to(content, { opacity: 0, duration: 0.3, ease: 'power2.in' }, tD - 0.15);
  tl.to(SL, { backgroundColor: '#F6F4EF', duration: 0.4 }, tD);
  tl.to(svgWrap, { opacity: 1, duration: 0.3 }, tD + 0.05);
  tl.to(lnPaths, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.12 }, tD + 0.1);
  tl.fromTo(qm, { opacity: 0, scale: 0.3, rotation: -12 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tE + 0.1);
  tl.to(svgWrap, { filter: 'grayscale(1)', duration: 0.6, ease: 'power2.inOut' }, tF + 0.1);
  tl.to(qm, { rotation: 6, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tF + 0.2);
});

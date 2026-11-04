/* Scene 2 — "Short sentences add weight. Longer ones carry the listener along. And give each sentence
 * just one idea, so nobody has to hold two at once."
 * Storyboard: warm paper stage with a big amber dial on the left. On "Short sentences" the needle snaps
 * to SHORT and a heavy ink slab, "Short.", thuds down. On "carry the listener along" the needle swings
 * to LONG and a long coral ribbon glides across like a conveyor. On "one idea" the ribbon collapses and
 * "One idea." pops in at 120px on the right. On "two" a second idea chip tries to squeeze in and is knocked away. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const tShort = A(0, 'Short', 0.55), tSent = A(0, 'sentences', 0.887), tWeight = A(0, 'weight.', 1.769);
  const tLonger = A(1, 'Longer', 2.617), tCarry = A(1, 'carry', 3.302), tAlong = A(1, 'along.', 4.114);
  const tOne = A(2, 'one', 6.227), tIdea = A(2, 'idea,', 6.425), tHold = A(2, 'hold', 7.818), tTwo = A(2, 'two', 8.062);
  const MONO = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 70% at 30% 45%, #fffaf0 0%, var(--paper) 55%, #e9e0cf 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '420px 560px' });

  const CX = 420, CY = 580, R = 230;
  const glow = el('div', 'abs', cam, { left: CX - 380 + 'px', top: CY - 380 + 'px', width: '760px', height: '760px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,181,71,.35) 0%, rgba(255,181,71,0) 65%)' });
  const dial = el('div', 'abs', cam, { left: CX - R + 'px', top: CY - R + 'px', width: R * 2 + 'px', height: R * 2 + 'px', borderRadius: '50%',
    background: 'radial-gradient(circle at 38% 32%, #ffd58a 0%, var(--amber) 45%, #e8932a 100%)',
    boxShadow: '0 40px 80px rgba(120,70,10,.28), inset 0 -10px 30px rgba(160,80,0,.35), inset 0 6px 14px rgba(255,255,255,.5)' });
  el('div', 'abs', dial, { inset: '34px', borderRadius: '50%', background: 'radial-gradient(circle at 50% 40%, #fffaf0, #f3e8d4)', boxShadow: 'inset 0 4px 16px rgba(120,70,10,.25)' });
  let ticks = '';
  for (let a = -90; a <= 90; a += 10) {
    const rad = a * Math.PI / 180, big = a % 30 === 0;
    const r1 = 180, r2 = big ? 148 : 162;
    ticks += `<line x1="${R + r1 * Math.sin(rad)}" y1="${R - r1 * Math.cos(rad)}" x2="${R + r2 * Math.sin(rad)}" y2="${R - r2 * Math.cos(rad)}" stroke="#1C2333" stroke-opacity="${big ? .8 : .35}" stroke-width="${big ? 6 : 3}" stroke-linecap="round"/>`;
  }
  const svgT = el('div', 'abs', dial, { inset: 0 });
  svgT.innerHTML = `<svg width="${R * 2}" height="${R * 2}">${ticks}</svg>`;
  const needle = el('div', 'abs', cam, { left: CX - 9 + 'px', top: CY - 170 + 'px', width: '18px', height: '190px', borderRadius: '9px 9px 6px 6px',
    background: 'linear-gradient(180deg, var(--coral), #d94a3a)', transformOrigin: '50% 160px', boxShadow: '0 8px 18px rgba(0,0,0,.25)' });
  el('div', 'abs', cam, { left: CX - 30 + 'px', top: CY - 30 + 'px', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--ink)', boxShadow: '0 6px 14px rgba(0,0,0,.3), inset 0 2px 4px rgba(255,255,255,.2)' });
  const lab = (txt, a) => {
    const rad = a * Math.PI / 180, rr = R + 52;
    const d = el('div', 'abs', cam, { left: CX + rr * Math.sin(rad) - 100 + 'px', top: CY - rr * Math.cos(rad) - 11 + 'px', width: '200px', textAlign: 'center', font: MONO, letterSpacing: '.18em', color: 'var(--mist)' });
    d.textContent = txt; return d;
  };
  const lShort = lab('SHORT', -72), lOne = lab('ONE IDEA', 0), lLong = lab('LONG', 72);
  const dialTag = el('div', 'abs', cam, { left: CX - 200 + 'px', width: '400px', top: CY + R + 50 + 'px', textAlign: 'center', font: MONO, letterSpacing: '.2em', color: '#7a6e5c' });
  dialTag.textContent = 'SENTENCE LENGTH';

  const shadow = el('div', 'abs', cam, { left: '900px', top: '640px', width: '760px', height: '40px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(60,40,10,.35), transparent)', opacity: 0 });
  const block = el('div', 'abs', cam, { left: '900px', top: '350px', width: '760px', height: '290px', borderRadius: '22px', background: 'var(--ink)',
    boxShadow: '0 30px 60px rgba(28,35,51,.35)', transformOrigin: '50% 100%', display: 'flex', alignItems: 'center', justifyContent: 'center' });
  const bt = el('div', '', block, { font: '900 190px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'var(--paper)' });
  bt.textContent = 'Short.';
  const dust = [0, 1, 2, 3, 4, 5].map((i) => el('div', 'abs', cam, { left: (i < 3 ? 880 - i * 40 : 1680 + (i - 3) * 40) + 'px', top: 628 - (i % 3) * 8 + 'px', width: '16px', height: '6px', borderRadius: '3px', background: '#b9a98c', opacity: 0 }));

  const track = el('div', 'abs', cam, { left: '780px', top: '470px', width: '1060px', height: '130px', overflow: 'hidden',
    WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' });
  const strip = el('div', 'abs', track, { left: 0, top: '15px', height: '100px', padding: '0 60px', borderRadius: '50px', whiteSpace: 'nowrap',
    background: 'linear-gradient(180deg, #ff8070, var(--coral))', boxShadow: '0 16px 30px rgba(255,107,90,.35)',
    display: 'flex', alignItems: 'center', font: '700 52px/1 Inter Display, Inter', letterSpacing: '-.02em', color: '#fff' });
  strip.textContent = 'longer ones carry the listener along, clause after clause, one easy breath at a time…';

  const oneWrap = el('div', 'abs', cam, { left: '780px', width: '1060px', top: '450px', textAlign: 'center', transformOrigin: '50% 60%' });
  const oneT = el('div', '', oneWrap, { font: '900 120px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)' });
  oneT.textContent = 'One idea.';
  const bar = el('div', 'abs', cam, { left: '1110px', top: '600px', width: '400px', height: '12px', borderRadius: '6px', background: 'var(--amber)', transformOrigin: '0 50%' });
  const chip = el('div', 'abs', cam, { left: '1380px', top: '300px', padding: '16px 26px', borderRadius: '14px', border: '3px solid var(--coral)', background: '#fffaf0',
    font: '700 34px/1 Inter Display, Inter', color: 'var(--coral)', boxShadow: '0 14px 30px rgba(0,0,0,.12)', whiteSpace: 'nowrap' });
  chip.textContent = '+ idea two';

  ctx.fx.vignette({ strength: 0.3 });
  ctx.fx.grain({ opacity: 0.06 });

  gsap.set([block, track, oneWrap, bar, chip], { opacity: 0 });
  gsap.set(bar, { scaleX: 0 });
  gsap.set(needle, { rotation: 0 });
  tl.to(cam, { scale: 1.02, duration: ctx.dur, ease: 'none' }, 0);

  tl.from([glow, dial], { scale: 0.85, opacity: 0, duration: 0.6, ease: 'back.out(1.5)' }, 0.02);
  tl.from(needle, { opacity: 0, rotation: 30, duration: 0.6 }, 0.1);
  tl.from([lShort, lOne, lLong, dialTag], { opacity: 0, y: 10, duration: 0.5, stagger: 0.06 }, 0.15);

  tl.to(needle, { rotation: -72, duration: 0.3, ease: 'back.out(2.2)' }, tShort);
  tl.to(lShort, { color: '#1C2333', duration: 0.2 }, tShort);
  tl.fromTo(block, { y: -700, opacity: 1 }, { y: 0, opacity: 1, duration: 0.38, ease: 'power4.in', immediateRender: false }, tSent - 0.25);
  const land = tSent + 0.13;
  tl.to(block, { scaleY: 0.9, scaleX: 1.03, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.out' }, land);
  tl.to(shadow, { opacity: 1, duration: 0.1 }, land);
  tl.to(cam, { y: 8, duration: 0.06, yoyo: true, repeat: 1 }, land);
  dust.forEach((d, i) => tl.fromTo(d, { opacity: 0.9, x: 0, y: 0 }, { opacity: 0, x: (i < 3 ? -1 : 1) * (40 + i * 12), y: -20 - (i % 3) * 10, duration: 0.6, ease: 'power2.out', immediateRender: false }, land));
  tl.to(block, { scaleY: 0.95, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, tWeight);
  tl.to(block, { boxShadow: '0 12px 24px rgba(28,35,51,.5)', duration: 0.12, yoyo: true, repeat: 1 }, tWeight);

  tl.to(block, { y: -80, opacity: 0, scale: 0.9, duration: 0.5, ease: 'power2.in' }, tLonger - 0.1);
  tl.to(shadow, { opacity: 0, duration: 0.4 }, tLonger - 0.1);
  tl.to(lShort, { color: '#9AA4B8', duration: 0.3 }, tLonger);
  tl.to(needle, { rotation: 72, duration: 1.1, ease: 'power2.inOut' }, tLonger + 0.1);
  tl.to(lLong, { color: '#1C2333', duration: 0.3 }, tCarry);
  tl.to(track, { opacity: 1, duration: 0.3 }, tLonger + 0.3);
  tl.fromTo(strip, { x: 1100 }, { x: -1700, duration: tOne - (tLonger + 0.3), ease: 'none', immediateRender: false }, tLonger + 0.3);
  tl.to(strip, { y: -6, duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, tCarry);

  tl.to(strip, { scaleX: 0.03, scaleY: 0.4, transformOrigin: '50% 50%', duration: 0.3, ease: 'power3.in' }, tOne - 0.25);
  tl.to(track, { opacity: 0, duration: 0.15 }, tOne + 0.02);
  tl.to(needle, { rotation: 0, duration: 0.45, ease: 'back.out(2)' }, tOne - 0.1);
  tl.to(lLong, { color: '#9AA4B8', duration: 0.3 }, tOne);
  tl.to(lOne, { color: '#1C2333', duration: 0.2 }, tOne);
  tl.fromTo(oneWrap, { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)', immediateRender: false }, tIdea - 0.12);
  tl.to(bar, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'expo.out' }, tIdea + 0.15);
  tl.to(cam, { scale: 1.06, duration: 1.0, ease: 'expo.inOut' }, tIdea);
  tl.to(glow, { scale: 1.15, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tIdea);

  tl.fromTo(chip, { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out', immediateRender: false }, tHold - 0.15);
  tl.to(oneWrap, { x: -14, duration: 0.08, yoyo: true, repeat: 1 }, tTwo);
  tl.to(chip, { x: 200, y: -60, rotation: 24, opacity: 0, duration: 0.45, ease: 'power2.in' }, tTwo + 0.05);
});

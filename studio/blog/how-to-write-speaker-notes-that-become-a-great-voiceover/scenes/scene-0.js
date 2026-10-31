/* Scene 0 — "Your speaker notes are written for you, not for a listener. Here's how to turn rough notes
 * into a voiceover that sounds clear and natural."
 * Storyboard: night stage, slate scribbled note fragments (some crossed out) float in a loose cloud.
 * On "for you" they huddle; on "not for a listener" a coral speaker icon pops and pulses, but the cloud
 * ignores it. On "rough" the notes jitter. On "voiceover" they straighten into one clean line that grows
 * into a teal waveform fed by the (now teal) speaker. "Written to be heard" rises in 140px paper type.
 * The subtitle lands on "clear". The original title and subtitle are rebuilt; the overlapping text is cut. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = 1920, H = 1080, CX = 960, CY = 520;
  const tYou = ctx.at(0, 'you'), tNot = ctx.at(0, 'not'), tList = ctx.at(0, 'listener');
  const tRough = ctx.at(1, 'rough'), tVo = ctx.at(1, 'voiceover'), tClear = ctx.at(1, 'clear');
  const rnd = ctx.rand(7);

  stage.style.background = 'radial-gradient(60% 55% at 50% 48%, #1b2236 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 62%, rgba(46,196,182,.22), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  const label = el('div', 'abs', cam, { left: '0px', width: W + 'px', top: '110px', textAlign: 'center', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--slate)' });
  label.textContent = 'SPEAKER NOTES → VOICEOVER';

  /* scribbled note fragments, laid out in loose staggered rows so they never overprint */
  const NOTES = [['results', 0], ['3 groups', 1], ['control flat', 0], ['n=240', 0], ['→ slide 4', 0], ['utilise', 1], ['3.5%', 0],
    ['in order to', 1], ['low-light??', 0], ['TODO', 1], ['ctrl vs B', 0], ['mention fig.', 0], ['etc.', 1], ['re: Q3', 0]];
  const N = NOTES.length;
  const HX = 840, HY = 520;
  const ROWS = [[-165, [-330, 0, 330]], [-55, [-495, -165, 165, 495]], [55, [-495, -165, 165, 495]], [165, [-330, 0, 330]]];
  const SLOTS = ROWS.flatMap(([dy, xs]) => xs.map((dx) => [dx, dy]));
  const order = [6, 0, 9, 3, 12, 1, 8, 13, 4, 10, 2, 7, 11, 5];
  const LX0 = 420, LX1 = 1500, LY = 640;
  const frags = NOTES.map(([txt, strike], i) => {
    const [dx, dy] = SLOTS[order[i]];
    const bx = HX + dx + (rnd() - 0.5) * 40, by = HY + dy + (rnd() - 0.5) * 24;
    const outer = el('div', 'abs', cam, { left: bx + 'px', top: by + 'px', whiteSpace: 'nowrap' });
    const inner = el('div', '', outer, { position: 'relative', font: `${rnd() > 0.5 ? 'italic ' : ''}500 ${30 + Math.floor(rnd() * 9)}px/1.1 Inter`, color: 'var(--slate)', letterSpacing: '-.01em' });
    inner.textContent = txt;
    if (strike) el('div', 'abs', inner, { left: '-6px', right: '-6px', top: '52%', height: '3px', background: 'var(--slate)', transform: `rotate(${(rnd() - 0.5) * 8}deg)`, opacity: 0.9 });
    else if (rnd() > 0.5) el('div', 'abs', inner, { left: '0', right: '10%', bottom: '-6px', height: '2px', background: 'rgba(138,147,166,.6)', transform: `rotate(${(rnd() - 0.5) * 6}deg)` });
    gsap.set(outer, { xPercent: -50, yPercent: -50, rotation: (rnd() - 0.5) * 16 });
    return { outer, inner, bx, by, ph: rnd() * 6.28, sp: 0.6 + rnd() * 0.6, tx: LX0 + (i + 0.5) * (LX1 - LX0) / N };
  });

  const SPX = 1560, SPY = 520;
  const spk = el('div', 'abs', cam, { left: SPX - 70 + 'px', top: SPY - 70 + 'px', width: '140px', height: '140px', color: 'var(--coral)' });
  spk.innerHTML = `<svg width="140" height="140" viewBox="0 0 140 140" style="overflow:visible">
    <circle cx="70" cy="70" r="66" fill="currentColor" opacity=".14"/>
    <path d="M38 56 H56 L80 36 V104 L56 84 H38 Z" fill="currentColor"/>
    <path d="M92 52 Q104 70 92 88" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
    <path d="M102 42 Q120 70 102 98" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" opacity=".7"/></svg>`;
  spk.style.filter = 'drop-shadow(0 0 30px rgba(255,107,87,.55))';
  const rings = [0, 1, 2].map(() => el('div', 'abs', cam, { left: SPX - 80 + 'px', top: SPY - 80 + 'px', width: '160px', height: '160px', borderRadius: '50%', border: '4px solid var(--coral)', opacity: 0 }));

  const BARS = 72, WX0 = 400, WX1 = 1640;
  const wv = el('div', 'abs', cam, { left: 0, top: 0, width: W + 'px', height: H + 'px' });
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('width', W); svg.setAttribute('height', H); wv.appendChild(svg);
  const bw = (WX1 - WX0) / BARS;
  const rects = Array.from({ length: BARS }, (_, i) => {
    const r = document.createElementNS(ns, 'rect');
    r.setAttribute('x', WX0 + i * bw + bw * 0.22); r.setAttribute('width', bw * 0.56); r.setAttribute('rx', bw * 0.28);
    r.setAttribute('fill', '#2EC4B6'); svg.appendChild(r); return r;
  });
  wv.style.filter = 'drop-shadow(0 0 18px rgba(46,196,182,.6))';
  const flatLine = el('div', 'abs', cam, { left: WX0 + 'px', width: WX1 - WX0 + 'px', top: LY - 2 + 'px', height: '4px', borderRadius: '2px', background: 'var(--teal)', transformOrigin: '0% 50%', boxShadow: '0 0 20px rgba(46,196,182,.7)' });
  const wave = { amp: 0, show: 0 };

  const head = el('div', 'abs', cam, { left: '80px', width: W - 160 + 'px', top: '250px', textAlign: 'center', font: '800 140px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)' });
  const words = ctx.split(head, 'Written to be heard', 'word');
  const sub = el('div', 'abs', cam, { left: '80px', width: W - 160 + 'px', top: '800px', textAlign: 'center', font: '600 30px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--teal)' });
  sub.textContent = 'FROM ROUGH NOTES TO A CLEAR SCRIPT';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    frags.forEach((f) => {
      const k = 1 - Math.min(1, Math.max(0, (t - tVo + 0.1) / 0.5));
      f.inner.style.transform = `translate(${Math.sin(t * f.sp + f.ph) * 8 * k}px, ${Math.cos(t * f.sp * 0.8 + f.ph) * 6 * k}px)`;
    });
    rects.forEach((r, i) => {
      const u = i / (BARS - 1);
      const env = Math.sin(u * Math.PI) ** 0.8;
      const v = Math.abs(Math.sin(i * 0.55 + t * 3.1) * 0.6 + Math.sin(i * 0.23 - t * 1.7) * 0.4);
      const h = Math.max(4, 4 + wave.amp * env * (20 + 150 * v));
      r.setAttribute('y', LY - h / 2); r.setAttribute('height', h);
    });
    wv.style.opacity = wave.show;
  });

  gsap.set([spk, ...words, sub], { opacity: 0 });
  gsap.set(flatLine, { scaleX: 0, opacity: 0 });
  tl.from(label, { opacity: 0, y: -12, duration: 0.8 }, 0.05);
  tl.from(frags.map((f) => f.outer), { opacity: 0, scale: 0.7, duration: 0.7, stagger: 0.03, ease: 'back.out(1.6)' }, 0.02);
  tl.to(cam, { scale: 1.05, duration: ctx.dur, ease: 'none' }, 0);

  frags.forEach((f, i) => {
    tl.to(f.outer, { x: (HX - f.bx) * 0.25, y: (HY - f.by) * 0.25, duration: 0.9, ease: 'power3.inOut' }, tYou - 0.25 + i * 0.015);
  });
  tl.fromTo(spk, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, tNot - 0.05);
  rings.forEach((r, i) => tl.fromTo(r, { scale: 0.8, opacity: 0.8 }, { scale: 2.2, opacity: 0, duration: 1.1, ease: 'power2.out', immediateRender: false }, tList - 0.1 + i * 0.3));
  tl.to(spk, { opacity: 0.45, scale: 0.92, duration: 0.6, ease: 'power2.inOut' }, tList + 0.9);

  frags.forEach((f, i) => tl.to(f.outer, { rotation: `+=${i % 2 ? 6 : -6}`, duration: 0.07, yoyo: true, repeat: 3, ease: 'none' }, tRough + i * 0.01));

  frags.forEach((f, i) => {
    tl.to(f.outer, { x: f.tx - f.bx, y: LY - f.by, rotation: 0, scale: 0.6, duration: 0.7, ease: 'expo.inOut' }, tVo - 0.45 + i * 0.012);
    tl.to(f.outer, { scaleY: 0.05, opacity: 0, duration: 0.3, ease: 'power2.in' }, tVo + 0.2 + i * 0.012);
  });
  tl.to(flatLine, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, tVo + 0.15);
  tl.to(flatLine, { opacity: 0, duration: 0.4 }, tVo + 0.7);
  tl.to(wave, { show: 1, duration: 0.3 }, tVo + 0.55);
  tl.to(wave, { amp: 1, duration: 1.0, ease: 'power2.out' }, tVo + 0.6);
  tl.to(glow, { opacity: 1, duration: 1.2 }, tVo + 0.5);
  tl.to(spk, { left: WX0 - 190 + 'px', top: LY - 70 + 'px', opacity: 1, scale: 0.85, color: '#2EC4B6', filter: 'drop-shadow(0 0 30px rgba(46,196,182,.6))', duration: 0.9, ease: 'expo.inOut' }, tVo - 0.2);

  tl.fromTo(words, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'back.out(1.5)', immediateRender: false }, tVo + 0.25);
  tl.fromTo(sub, { opacity: 0, y: 16, letterSpacing: '.3em' }, { opacity: 1, y: 0, letterSpacing: '.16em', duration: 0.8, ease: 'power3.out', immediateRender: false }, tClear - 0.1);
});

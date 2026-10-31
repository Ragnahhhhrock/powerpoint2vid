/* Scene 3: "Write the way you speak. 'Utilise' becomes 'use'. 'In order to' becomes 'to'.
 * Keep one idea per sentence, because a listener can't scan back up the page."
 * Storyboard: warm paper stage, huge centred type. "Write the way you speak" pops word by word, then
 * shrinks into a small kicker at the top. On "Utilise" the word lands at 150px. On "becomes" its middle
 * letters collapse, and it resolves into a coral "use". On "In order to" the phrase builds; on "becomes"
 * it collapses letter by letter into a coral "to". On "one idea per sentence" a headline sits over a
 * faint page of one-line sentences. On "scan" the page scrolls upward, a slate arrow tries to go back
 * up twice, and it fades. A speech waveform pulses along the bottom throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage, dur } = ctx;
  const A = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const INK = '#1A1F2E', CORAL = '#FF6B57', SLATE = '#8A93A6', PAPER = '#F6F2EA';
  const FONT = '"Inter Display", Inter, system-ui, sans-serif';
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = `radial-gradient(60% 55% at 50% 42%, #fffdf8 0%, ${PAPER} 60%, #ebe4d6 100%)`;
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 46%, rgba(255,181,71,.10), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  /* helper: centred line of per-char spans */
  function charLine(text, top, size, color) {
    const lh = Math.round(size * 1.3);
    const line = el('div', 'abs', cam, { left: 0, width: '1920px', top: top + 'px', height: lh + 'px', textAlign: 'center', whiteSpace: 'nowrap',
      font: `800 ${size}px/${lh}px ${FONT}`, letterSpacing: '-.04em', color, transformOrigin: '50% 50%' });
    const spans = [...text].map((c) => { const s = el('span', '', line, { display: 'inline-block', lineHeight: lh + 'px', fontSize: size + 'px' }); s.textContent = c === ' ' ? '\u00a0' : c; return s; });
    return { line, spans };
  }
  function wordLine(words, top, size, color) {
    const lh = Math.round(size * 1.3);
    const line = el('div', 'abs', cam, { left: 0, width: '1920px', top: top + 'px', height: lh + 'px', textAlign: 'center', whiteSpace: 'nowrap',
      font: `800 ${size}px/${lh}px ${FONT}`, letterSpacing: '-.04em', color, transformOrigin: '50% 50%' });
    const spans = words.map((w, i) => { const s = el('span', '', line, { display: 'inline-block', marginRight: i < words.length - 1 ? size * 0.24 + 'px' : 0 }); s.textContent = w; return s; });
    return { line, spans };
  }

  /* ---- intro title -> kicker ---- */
  const kick = wordLine(['Write', 'the', 'way', 'you', 'speak.'], 400, 110, INK);
  const kDash = el('div', 'abs', cam, { left: '930px', top: '196px', width: '60px', height: '4px', borderRadius: '2px', background: CORAL, transformOrigin: '50% 50%' });

  /* ---- utilise -> use ---- */
  const uti = charLine('Utilise', 400, 150, INK);
  const use = charLine('use', 400, 150, CORAL);
  const useLine = el('div', 'abs', cam, { left: '880px', top: '610px', width: '160px', height: '6px', borderRadius: '3px', background: CORAL, transformOrigin: '50% 50%' });

  /* ---- in order to -> to ---- */
  const ord = charLine('In order to', 400, 140, INK);

  /* ---- one idea per sentence ---- */
  const head = wordLine(['One', 'idea', 'per', 'sentence.'], 236, 96, INK);
  head.spans[0].style.color = CORAL;
  const win = el('div', 'abs', cam, { left: '560px', top: '420px', width: '800px', height: '400px', borderRadius: '22px', overflow: 'hidden',
    background: 'rgba(255,255,255,.7)', boxShadow: '0 40px 90px rgba(26,31,46,.12), inset 0 0 0 1px rgba(26,31,46,.06)',
    WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)' });
  const content = el('div', 'abs', win, { left: 0, top: '40px', width: '800px', height: '1200px' });
  const R = ctx.rand(7);
  const rows = [];
  for (let i = 0; i < 18; i++) {
    const y = i * 58;
    const dot = el('div', 'abs', content, { left: '70px', top: y + 10 + 'px', width: '14px', height: '14px', borderRadius: '50%', background: SLATE, opacity: 0.6 });
    const bar = el('div', 'abs', content, { left: '104px', top: y + 8 + 'px', width: 260 + R() * 360 + 'px', height: '18px', borderRadius: '9px', background: 'rgba(26,31,46,.14)' });
    rows.push({ dot, bar });
  }
  const hiRow = rows[2];
  const arrow = el('div', 'abs', cam, { left: '1410px', top: '520px', width: '90px', height: '130px' });
  arrow.innerHTML = `<svg width="90" height="130" viewBox="0 0 90 130"><path d="M45 120 L45 18 M14 48 L45 14 L76 48" fill="none" stroke="${SLATE}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ---- waveform motif ---- */
  const NB = 72, WX0 = 250, WSTEP = 20, WY = 940;
  const wave = el('div', 'abs', stage, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('width', '1920'); svg.setAttribute('height', '1080'); wave.appendChild(svg);
  const bars = [];
  for (let i = 0; i < NB; i++) {
    const r = document.createElementNS(svgNS, 'rect');
    const mid = 1 - Math.abs(i - NB / 2) / (NB / 2);
    r.setAttribute('x', WX0 + i * WSTEP); r.setAttribute('width', '10'); r.setAttribute('rx', '5');
    r.setAttribute('fill', mid > 0.55 ? CORAL : INK); r.setAttribute('opacity', mid > 0.55 ? 0.75 : 0.18);
    svg.appendChild(r); bars.push({ r, mid });
  }
  const WORDS = [0.55, 0.91, 1.026, 1.2, 1.339, 2.326, 3, 3.406, 4.323, 4.555, 4.822, 5.1, 5.484, 6.668, 6.97, 7.179, 7.562, 7.724, 8.433, 8.723, 8.804, 9.176, 9.477, 9.872, 10.07, 10.232, 10.348];
  ctx.onFrame((t) => {
    let env = 0;
    for (const w of WORDS) { const d = (t - w - 0.1) / 0.16; env += Math.exp(-d * d); }
    env = Math.min(1, env);
    bars.forEach((b, i) => {
      const n = Math.abs(Math.sin(i * 0.71 + t * 8.3) * Math.sin(i * 0.23 - t * 3.7));
      const h = 8 + 4 * Math.sin(t * 1.5 + i * 0.4) + env * (20 + 70 * n) * (0.35 + 0.65 * b.mid);
      b.r.setAttribute('y', WY - h / 2); b.r.setAttribute('height', Math.max(6, h));
    });
  });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06, blend: 'multiply' });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1 }, { scale: 1.04, duration: dur, ease: 'none' }, 0);
  tl.fromTo(wave, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0);

  // intro words land with the voice
  const kw = ['Write', 'the', 'way', 'you', 'speak.'], kf = [0.55, 0.91, 1.026, 1.2, 1.339];
  kick.spans.forEach((s, i) => {
    const t = Math.max(0.1, A(0, kw[i], kf[i]) - 0.15);
    tl.fromTo(s, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, i === 0 ? 0.1 : t);
  });
  gsap.set(kDash, { scaleX: 0 });
  tl.to(kick.line, { scale: 0.32, y: -320, color: SLATE, duration: 0.8, ease: 'expo.inOut' }, 1.95);
  tl.to(kDash, { scaleX: 1, duration: 0.5 }, 2.55);

  // utilise -> use
  const tU = A(1, 'Utilise', 2.326), tB1 = A(1, 'becomes', 3.0), tUse = A(1, 'use', 3.406);
  tl.fromTo(uti.line, { opacity: 0, scale: 1.15, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(1.5)' }, tU - 0.1);
  tl.to(uti.line, { scale: 0.85, duration: 0.5, ease: 'power2.inOut' }, tB1);
  tl.to([1, 2, 3, 4].map((i) => uti.spans[i]), { fontSize: 0, opacity: 0, duration: 0.35, stagger: 0.05, ease: 'power2.in' }, tB1);
  tl.to([0, 5, 6].map((i) => uti.spans[i]), { color: CORAL, duration: 0.3 }, tB1 + 0.15);
  tl.to(uti.line, { opacity: 0, duration: 0.15 }, tUse - 0.05);
  tl.fromTo(use.line, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' }, tUse - 0.05);
  tl.fromTo(useLine, { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, tUse + 0.1);
  tl.to([use.line, useLine], { opacity: 0, y: -60, duration: 0.35, ease: 'power2.in' }, 3.95);

  // in order to -> to
  const tIn = A(2, 'In', 4.323), tOr = A(2, 'order', 4.555), tTo = A(2, 'to', 4.822), tB2 = A(2, 'becomes', 5.1), tTo2 = A(2, 'to', 5.484) > tB2 ? A(2, 'to', 5.484) : 5.484;
  [[[0, 1], tIn], [[2, 3, 4, 5, 6, 7], tOr], [[8, 9, 10], tTo]].forEach(([idx, t]) => {
    tl.fromTo(idx.map((i) => ord.spans[i]), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)', stagger: 0.02 }, t - 0.12);
  });
  tl.to([0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ord.spans[i]), { fontSize: 0, opacity: 0, duration: 0.3, stagger: 0.035, ease: 'power2.in' }, tB2);
  tl.to([9, 10].map((i) => ord.spans[i]), { color: CORAL, duration: 0.25 }, tTo2 - 0.1);
  tl.fromTo(ord.line, { scale: 1 }, { scale: 1.25, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tTo2 - 0.1);
  tl.to(ord.line, { opacity: 0, y: -60, duration: 0.35, ease: 'power2.in' }, 6.3);

  // one idea per sentence
  const hw = ['one', 'idea', 'per', 'sentence'], hf = [6.97, 7.179, 7.562, 7.724];
  head.spans.forEach((s, i) => {
    tl.fromTo(s, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, A(3, hw[i], hf[i]) - 0.15);
  });
  tl.fromTo(win, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, A(3, 'Keep', 6.668));
  tl.from(rows.map((r) => r.bar), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.5, stagger: 0.04 }, 6.8);
  tl.to(hiRow.bar, { background: 'rgba(255,107,87,.55)', duration: 0.4 }, A(3, 'idea', 7.179));
  tl.to(hiRow.dot, { background: CORAL, opacity: 1, scale: 1.4, duration: 0.4, ease: 'back.out(2)' }, A(3, 'idea', 7.179));

  // can't scan back up the page
  const tScan = A(3, 'scan', 9.477), tBack = A(3, 'back', 9.872), tUp = A(3, 'up', 10.07), tPage = A(3, 'page', 10.348);
  tl.fromTo(arrow, { opacity: 0, y: 30 }, { opacity: 0.9, y: 0, duration: 0.5 }, A(3, 'because', 8.433));
  tl.to(content, { y: -320, duration: 1.4, ease: 'power2.inOut' }, tScan - 0.1);
  tl.to(arrow, { y: -50, duration: 0.18, ease: 'power2.out' }, tBack - 0.05);
  tl.to(arrow, { y: 0, duration: 0.35, ease: 'back.out(2.5)' }, tBack + 0.13);
  tl.to(arrow, { y: -30, duration: 0.15, ease: 'power2.out' }, tUp);
  tl.to(arrow, { y: 0, duration: 0.3, ease: 'back.out(2.5)' }, tUp + 0.15);
  tl.to(arrow, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.in' }, tPage + 0.1);
  tl.to(head.line, { y: -6, duration: 0.6, ease: 'power2.out' }, tPage);
});

/* Scene 2 — "Before you open the chart tool, write the one sentence you want people to remember.
 * That sentence decides the chart type, what to highlight, and what to cut."
 * Storyboard: a calm paper stage with lots of white space. A blinking cursor waits, then types
 * "Renewals rose every quarter after we changed onboarding" in 90px ink on "write the one sentence".
 * On "chart type" a faint grey line chart sketches itself underneath. On "highlight" the word "rose"
 * turns signal orange with a hand-drawn underline. On "cut" the slide's two other sentences slide in
 * grey, get crossed out and drop away. Hold on the single sentence and its sketched line. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const write = ctx.at(0, 'write'), remember = ctx.at(0, 'remember.');
  const chartT = ctx.at(1, 'chart'), highlight = ctx.at(1, 'highlight,'), cut = ctx.at(1, 'cut.');
  const andT = ctx.at(1, 'and');

  stage.style.background = 'radial-gradient(80% 70% at 45% 35%, #ffffff 0%, var(--paper) 60%, #ebe8e1 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '600px 300px' });

  /* label */
  const label = el('div', 'abs', cam, { left: '160px', top: '130px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--grey)' });
  label.textContent = 'STEP 1 · WRITE IT FIRST';
  const rule = el('div', 'abs', cam, { left: '160px', top: '170px', width: '64px', height: '3px', background: 'var(--signal)', transformOrigin: '0 50%' });

  /* the sentence, built char by char */
  const SENT = 'Renewals rose every quarter after we changed onboarding';
  const box = el('div', 'abs', cam, { left: '160px', top: '215px', width: '1600px', font: '800 90px/1.12 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  const chars = [];
  let roseChars = [], roseWord = null;
  SENT.split(' ').forEach((w, wi, arr) => {
    const ws = el('span', '', box, { display: 'inline-block', whiteSpace: 'nowrap', position: 'relative' });
    const cs = [...w].map((c) => { const s = el('span', '', ws, { visibility: 'hidden' }); s.textContent = c; return s; });
    chars.push(...cs);
    if (w === 'rose') { roseChars = cs; roseWord = ws; }
    if (wi < arr.length - 1) { const sp = el('span', '', box, {}); sp.textContent = ' '; chars.push(sp); }
  });
  // underline swoosh under "rose"
  const swoosh = el('div', 'abs', roseWord, { left: '-4px', right: '-4px', bottom: '2px', height: '22px' });
  swoosh.innerHTML = '<svg width="100%" height="22" viewBox="0 0 200 22" preserveAspectRatio="none"><path d="M4 14 C 50 6, 120 4, 196 10" pathLength="1" fill="none" stroke="#FF5A3C" stroke-width="7" stroke-linecap="round"/></svg>';
  const swPath = swoosh.querySelector('path');
  gsap.set(swPath, { strokeDasharray: 1, strokeDashoffset: 1 });

  // cursor (zero-width, moved through the DOM each frame)
  const cursor = el('span', '', null, { display: 'inline-block', position: 'relative', width: '0px', height: '1em' });
  const bar = el('div', 'abs', cursor, { left: '4px', top: '0.08em', width: '7px', height: '0.92em', background: 'var(--signal)', borderRadius: '2px' });
  const curState = { o: 1 };

  /* faint line chart sketch */
  const chart = el('div', 'abs', cam, { left: '160px', top: '470px', width: '1600px', height: '360px' });
  const PTS = [[140, 290], [560, 230], [980, 150], [1400, 60]];
  const d = 'M' + PTS.map((p) => p.join(' ')).join(' L ');
  chart.innerHTML = `<svg width="1600" height="360">
    <line id="ax" x1="60" y1="330" x2="1540" y2="330" stroke="#A3A9B3" stroke-width="2" pathLength="1"/>
    <path id="ln" d="${d}" pathLength="1" fill="none" stroke="#A3A9B3" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    ${PTS.map((p, i) => `<circle class="dot" cx="${p[0]}" cy="${p[1]}" r="13" fill="${i === 3 ? '#FF5A3C' : '#A3A9B3'}"/>`).join('')}
  </svg>`;
  const ax = chart.querySelector('#ax'), ln = chart.querySelector('#ln'), dots = [...chart.querySelectorAll('.dot')];
  const qs = PTS.map((p, i) => {
    const q = el('div', 'abs', chart, { left: p[0] - 50 + 'px', width: '100px', top: '345px', textAlign: 'center', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--grey)' });
    q.textContent = 'Q' + (i + 1); return q;
  });
  gsap.set([ax, ln], { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(dots, { scale: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' });
  gsap.set(qs, { opacity: 0 });

  /* the two other sentences from the slide */
  const ALT = ['Support tickets fell by about half in the first month', 'Region B is now our largest market'];
  const alts = ALT.map((s, i) => {
    const wrap = el('div', 'abs', cam, { left: '160px', top: 870 + i * 66 + 'px', font: '600 42px/1.1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--grey)', whiteSpace: 'nowrap' });
    const txt = el('span', '', wrap, { position: 'relative', display: 'inline-block' }); txt.textContent = s;
    const strike = el('div', 'abs', txt, { left: '-8px', right: '-8px', top: '52%', height: '5px', background: 'var(--ink)', borderRadius: '3px', transformOrigin: '0 50%' });
    gsap.set(strike, { scaleX: 0 });
    gsap.set(wrap, { opacity: 0, x: 120 });
    return { wrap, strike };
  });

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* typing + cursor, derived from t */
  const typeStart = write, typeEnd = Math.min(remember + 0.2, write + 2.2);
  let lastIdx = -2;
  ctx.onFrame((t) => {
    const p = Math.max(0, Math.min(1, (t - typeStart) / (typeEnd - typeStart)));
    const n = Math.floor(p * chars.length + 1e-6);
    if (n !== lastIdx) {
      chars.forEach((c, i) => { c.style.visibility = i < n ? 'visible' : 'hidden'; });
      if (n === 0) box.insertBefore(cursor, box.firstChild);
      else { const c = chars[n - 1]; c.parentNode.insertBefore(cursor, c.nextSibling); }
      lastIdx = n;
    }
    const typing = t > typeStart && t < typeEnd;
    const blink = typing ? 1 : (Math.floor(t * 1.9) % 2 === 0 ? 1 : 0.1);
    bar.style.opacity = String(blink * curState.o);
  });

  /* ---- timeline ---- */
  tl.from(label, { opacity: 0, y: 14, duration: 0.6 }, 0.1);
  tl.from(rule, { scaleX: 0, duration: 0.6 }, 0.25);
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.to(curState, { o: 0, duration: 0.4 }, chartT - 0.6);

  // "chart type": sketch the line
  tl.to(ax, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, chartT - 0.25);
  tl.to(ln, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, chartT);
  dots.forEach((dd, i) => tl.to(dd, { scale: 1, duration: 0.45, ease: 'back.out(2)' }, chartT + 0.1 + i * 0.25));
  tl.to(qs, { opacity: 1, duration: 0.4, stagger: 0.08 }, chartT + 0.2);

  // "highlight": rose turns signal orange
  tl.to(roseChars, { color: '#FF5A3C', duration: 0.35, stagger: 0.04, ease: 'power2.out' }, highlight - 0.05);
  tl.to(swPath, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, highlight + 0.1);
  tl.to(ln, { stroke: '#7d8591', duration: 0.5 }, highlight);

  // "cut": alternatives slide in, get struck, drop away
  alts.forEach((a, i) => {
    tl.to(a.wrap, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, andT - 0.15 + i * 0.12);
    tl.to(a.strike, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' }, cut + i * 0.1);
    tl.to(a.wrap, { y: 140, rotation: i ? -4 : 3, opacity: 0, duration: 0.6, ease: 'power2.in' }, cut + 0.45 + i * 0.1);
  });
});

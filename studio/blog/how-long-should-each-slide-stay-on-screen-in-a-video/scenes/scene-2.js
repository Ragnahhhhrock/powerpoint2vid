/* Scene 2 — "Use these ranges as starting points: titles three to six seconds, headline with image
 * eight to twenty, charts fifteen to thirty, processes twenty to forty-five."
 * Storyboard: night stage, wide range chart on a 0–45 s axis. The axis and ticks build first. Each
 * floating range bar grows on its spoken label: Title or divider 3–6s (mist), Headline + image 8–20s
 * (teal), Chart or data 15–30s (amber), Process 20–45s (coral). A stopwatch playhead snaps to each
 * range's end. The camera drifts right toward the 45 s mark and holds there. Data matches the slide. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (w, f) => { const v = ctx.at(0, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const cTitle = T('titles', 3.2), cHead = T('headline', 5.0), cChart = T('charts', 6.9), cProc = T('processes', 8.6);

  const X0 = 200, X1 = 1720, PPS = (X1 - X0) / 45, AXIS = 880;
  const xs = (s) => X0 + s * PPS;
  const ROWS = [
    { name: 'Title or divider', a: 3, b: 6, col: '#9AA3B8', t: cTitle },
    { name: 'Headline + image', a: 8, b: 20, col: '#2EC4B6', t: cHead },
    { name: 'Chart or data', a: 15, b: 30, col: '#F2A93B', t: cChart },
    { name: 'Process', a: 20, b: 45, col: '#EF6351', t: cProc },
  ];
  const Y = [360, 500, 640, 780];

  stage.style.background = 'radial-gradient(60% 55% at 70% 55%, #1c2440 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 35% at 88% 70%, rgba(239,99,81,.18), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1700px 600px' });

  /* header (outside camera) */
  const head = el('div', 'abs', stage, { left: '200px', top: '110px', font: '800 66px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)' });
  head.textContent = 'Practical ranges by slide type';
  const sub = el('div', 'abs', stage, { left: '204px', top: '200px', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--mist)' });
  sub.textContent = 'STARTING POINTS · SECONDS ON SCREEN';

  /* grid + axis */
  const grid = [], ticks = [];
  for (let s = 0; s <= 45; s += 5) {
    grid.push(el('div', 'abs', cam, { left: xs(s) + 'px', top: '300px', width: '1px', height: AXIS - 300 + 'px', background: 'rgba(154,163,184,.09)' }));
    const tk = el('div', 'abs', cam, { left: xs(s) - 40 + 'px', width: '80px', top: AXIS + 22 + 'px', textAlign: 'center', font: '600 22px/1 ui-monospace, Menlo, monospace', color: 'var(--mist)' });
    tk.textContent = s + (s === 45 ? 's' : '');
    ticks.push(tk);
  }
  const axis = el('div', 'abs', cam, { left: X0 + 'px', top: AXIS + 'px', width: X1 - X0 + 'px', height: '3px', borderRadius: '2px', background: 'rgba(246,243,236,.45)', transformOrigin: '0 50%' });

  /* range bars */
  const bars = ROWS.map((r, i) => {
    const x = xs(r.a), w = (r.b - r.a) * PPS, y = Y[i];
    const track = el('div', 'abs', cam, { left: X0 + 'px', top: y + 21 + 'px', width: X1 - X0 + 'px', height: '2px', background: 'rgba(154,163,184,.08)' });
    const bar = el('div', 'abs', cam, { left: x + 'px', top: y + 'px', width: w + 'px', height: '44px', borderRadius: '22px', transformOrigin: '0 50%',
      background: `linear-gradient(90deg, ${r.col}aa, ${r.col})`, boxShadow: `0 0 36px ${r.col}55, inset 0 1px 0 rgba(255,255,255,.35)` });
    const capA = el('div', 'abs', cam, { left: x - 2 + 'px', top: y - 8 + 'px', width: '4px', height: '60px', borderRadius: '2px', background: r.col });
    const capB = el('div', 'abs', cam, { left: x + w - 2 + 'px', top: y - 8 + 'px', width: '4px', height: '60px', borderRadius: '2px', background: r.col });
    const lab = el('div', 'abs', cam, { left: x + 'px', top: y - 50 + 'px', whiteSpace: 'nowrap', font: '700 30px/1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--paper)' });
    lab.innerHTML = `${r.name} <span style="color:${r.col};font-weight:800;margin-left:10px">${r.a}–${r.b}s</span>`;
    return { ...r, x, w, track, bar, capA, capB, lab };
  });

  /* stopwatch playhead */
  const ph = el('div', 'abs', cam, { left: X0 + 'px', top: '290px', width: '0px', height: '0px' });
  const phLine = el('div', 'abs', ph, { left: '-1.5px', top: '10px', width: '3px', height: AXIS - 290 - 10 + 'px', background: 'linear-gradient(180deg, rgba(246,243,236,.9), rgba(246,243,236,.15))' });
  const phKnob = el('div', 'abs', ph, { left: '-11px', top: '-6px', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--paper)', boxShadow: '0 0 24px rgba(246,243,236,.6)' });
  const phNum = el('div', 'abs', ph, { left: '-70px', width: '140px', top: '-48px', textAlign: 'center', font: '700 26px/1 ui-monospace, Menlo, monospace', color: 'var(--paper)', fontVariantNumeric: 'tabular-nums' });
  const st = { s: 0 };
  ctx.onFrame(() => { gsap.set(ph, { x: st.s * PPS }); phNum.textContent = Math.round(st.s) + 's'; });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.from(head, { opacity: 0, y: 24, duration: 0.7 }, 0.05);
  tl.from(sub, { opacity: 0, duration: 0.6 }, 0.3);
  tl.from(axis, { scaleX: 0, duration: 1.1, ease: 'expo.inOut' }, 0.2);
  tl.from(grid, { opacity: 0, duration: 0.6, stagger: 0.05 }, 0.5);
  tl.from(ticks, { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, 0.6);
  tl.from(bars.map((b) => b.track), { opacity: 0, duration: 0.6, stagger: 0.08 }, 0.9);
  tl.from(ph, { opacity: 0, duration: 0.5 }, 1.2);

  bars.forEach((b) => {
    gsap.set(b.bar, { scaleX: 0, opacity: 0 });
    gsap.set([b.capA, b.capB, b.lab], { opacity: 0 });
    const t = b.t - 0.1;
    tl.to(b.capA, { opacity: 1, duration: 0.2 }, t);
    tl.to(b.bar, { opacity: 1, duration: 0.15 }, t);
    tl.to(b.bar, { scaleX: 1, duration: 0.8, ease: 'back.out(1.5)' }, t);
    tl.fromTo(b.capB, { opacity: 0, x: -b.w }, { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.5)', immediateRender: false }, t);
    tl.fromTo(b.lab, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, immediateRender: false }, t + 0.1);
    tl.to(st, { s: b.b, duration: 0.7, ease: 'back.out(1.3)' }, t);
    tl.fromTo(phKnob, { scale: 1.5 }, { scale: 1, duration: 0.4, ease: 'power2.out', immediateRender: false }, t + 0.6);
  });

  // dim earlier rows slightly as process takes the stage, then hold on 45
  tl.to(bars.slice(0, 3).map((b) => b.bar), { opacity: 0.6, duration: 0.6 }, cProc + 0.4);
  tl.to(glow, { opacity: 1, duration: 1.2, ease: 'sine.inOut' }, cProc);
  tl.to(bars[3].bar, { boxShadow: '0 0 70px #EF6351aa, inset 0 1px 0 rgba(255,255,255,.35)', duration: 0.7, yoyo: true, repeat: 1 }, cProc + 0.8);
  tl.to(ticks[9], { color: '#EF6351', scale: 1.25, duration: 0.5, ease: 'back.out(2)' }, cProc + 0.6);

  // camera: slow drift right toward the 45 s mark, then settle and hold
  tl.to(cam, { x: -10, scale: 1.02, duration: cProc - 0.2, ease: 'sine.inOut' }, 0.2);
  tl.to(cam, { x: -20, scale: 1.05, duration: Math.max(1, ctx.dur - cProc), ease: 'power2.out' }, cProc);
});

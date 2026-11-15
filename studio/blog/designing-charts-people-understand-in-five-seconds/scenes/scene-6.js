/* Scene 6 — "Now cut the clutter: legends, gridlines, 3D effects. Then let the headline say what the chart
 * shows, not what it is."
 * Storyboard: a bright paper stage holds a deliberately cluttered 3D bar chart. It has default-office colours,
 * a tinted plot panel, gridlines and a legend. On "legends" the legend flies off. On "gridlines" the grid and
 * plot panel wipe away. On "3D effects" the chart untilts and the extruded faces collapse, leaving clean grey
 * 2D bars with only the final bar in signal orange. On "what the chart shows" the label-style title
 * "Quarterly renewals FY26" is struck through. It is replaced at 96px by "Renewals rose every quarter /
 * after the new onboarding". The deck gives no values, so the bars carry no numbers (illustrative shape only). */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tLegend = W(0, 'legends'), tGrid = W(0, 'gridlines'), t3D = W(0, '3D'), tEff = W(0, 'effects');
  const tHead = W(1, 'headline'), tWhat = W(1, 'what'), tShows = W(1, 'shows'), tNot = W(1, 'not');

  stage.style.background = 'radial-gradient(80% 70% at 50% 40%, #ffffff 0%, var(--paper) 60%, #ebe8e0 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 45%' });

  /* ---------- headline zone ---------- */
  const oldT = el('div', 'abs', cam, { left: '160px', top: '140px', font: '700 64px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)', whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: '10px' });
  const oldTxt = el('span', '', oldT, {}); oldTxt.textContent = 'Quarterly renewals FY26';
  const strike = el('div', 'abs', oldT, { left: '4px', right: '4px', top: '52%', height: '7px', borderRadius: '4px', background: 'var(--signal)', transformOrigin: '0% 50%' });
  const tag = el('div', 'abs', cam, { left: '174px', top: '96px', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--grey)' });
  tag.textContent = 'TITLE · WHAT IT IS';

  const newH = el('div', 'abs', cam, { left: '160px', top: '72px', width: '1600px', font: '800 96px/1.04 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  const words = [];
  ['Renewals rose every quarter', 'after the new onboarding'].forEach((line) => {
    const d = el('div', '', newH, { whiteSpace: 'nowrap' });
    words.push(...ctx.split(d, line, 'word'));
  });

  /* ---------- chart ---------- */
  const persp = el('div', 'abs', cam, { inset: 0, perspective: '1800px' });
  const chart = el('div', 'abs', persp, { inset: 0, transformOrigin: '850px 760px', transformStyle: 'preserve-3d' });
  const BASE = 930, X0 = 300, STEP = 300, BW = 190, D = 34;
  const H = [210, 290, 370, 455];
  const OFFICE = ['#4472C4', '#ED7D31', '#A5A5A5', '#FFC000'];
  const SHADE = ['#2f5597', '#b85d1f', '#7f7f7f', '#c49300'];
  const TOPC = ['#7a9de0', '#f4a56b', '#c9c9c9', '#ffd75e'];

  // clutter: plot panel + gridlines
  const gridWrap = el('div', 'abs', chart, { inset: 0 });
  el('div', 'abs', gridWrap, { left: '240px', top: '420px', width: '1210px', height: BASE - 420 + 'px', borderRadius: '6px', background: 'linear-gradient(180deg, #e6ecf5, #f3eee2)', border: '1px solid rgba(26,34,51,.15)' });
  for (let k = 1; k <= 5; k++) {
    el('div', 'abs', gridWrap, { left: '240px', width: '1210px', top: BASE - k * 95 + 'px', height: '2px', background: 'rgba(26,34,51,.16)' });
  }
  for (let k = 0; k < 4; k++) {
    el('div', 'abs', gridWrap, { left: X0 + k * STEP + BW / 2 + 'px', width: '1px', top: '420px', height: BASE - 420 + 'px', background: 'rgba(26,34,51,.08)' });
  }
  const axis = el('div', 'abs', chart, { left: '240px', width: '1210px', top: BASE + 'px', height: '3px', background: 'rgba(26,34,51,.45)' });

  const bars = H.map((h, i) => {
    const x = X0 + i * STEP;
    const g = el('div', 'abs', chart, { left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: `${x + BW / 2}px ${BASE}px` });
    const side = el('div', 'abs', g, { left: x + BW + 'px', top: BASE - h + 'px', width: D + 'px', height: h + 'px', background: SHADE[i], transform: 'skewY(-45deg)', transformOrigin: '0 0' });
    const top = el('div', 'abs', g, { left: x + 'px', top: BASE - h - D + 'px', width: BW + 'px', height: D + 'px', background: TOPC[i], transform: 'skewX(-45deg)', transformOrigin: '0 100%' });
    const front = el('div', 'abs', g, { left: x + 'px', top: BASE - h + 'px', width: BW + 'px', height: h + 'px', overflow: 'hidden',
      background: `linear-gradient(90deg, ${OFFICE[i]}, ${SHADE[i]})`, boxShadow: '14px 18px 30px rgba(0,0,0,.25), inset 0 2px 0 rgba(255,255,255,.4)' });
    const flat = el('div', 'abs', front, { inset: 0, background: i === 3 ? 'var(--signal)' : 'var(--grey)' });
    const lab = el('div', 'abs', chart, { left: x + 'px', width: BW + 'px', top: BASE + 22 + 'px', textAlign: 'center', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: i === 3 ? 'var(--ink)' : 'var(--grey)' });
    lab.textContent = 'Q' + (i + 1);
    return { g, side, top, front, flat, lab };
  });
  const last = bars[3];

  // clutter: legend
  const legend = el('div', 'abs', cam, { left: '1500px', top: '500px', width: '260px', padding: '22px 26px', background: '#fff', border: '2px solid rgba(26,34,51,.2)', borderRadius: '8px', boxShadow: '0 16px 40px rgba(0,0,0,.12)' });
  OFFICE.forEach((c, i) => {
    const row = el('div', '', legend, { display: 'flex', alignItems: 'center', gap: '14px', margin: i ? '14px 0 0' : 0, font: '500 26px/1 Inter', color: 'var(--ink)' });
    el('div', '', row, { width: '26px', height: '26px', borderRadius: '4px', background: c });
    el('span', '', row, {}).textContent = 'Series ' + (i + 1);
  });

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---------- initial states ---------- */
  gsap.set(chart, { rotationY: -16, rotationX: 8, x: 0 });
  gsap.set(bars.map((b) => b.flat), { opacity: 0 });
  gsap.set(strike, { scaleX: 0 });
  gsap.set(words, { opacity: 0, y: 50 });
  gsap.set(gridWrap, { clipPath: 'inset(0% 0% 0% 0%)' });
  gsap.set(oldT, { backgroundColor: 'rgba(221,225,231,0)' });

  /* ---------- timeline ---------- */
  tl.from(chart, { opacity: 0, y: 40, duration: 0.7 }, 0.05);
  tl.from(bars.map((b) => b.g), { scaleY: 0, duration: 0.8, stagger: 0.07, ease: 'back.out(1.4)' }, 0.1);
  tl.from(legend, { opacity: 0, x: 40, duration: 0.6 }, 0.3);
  tl.from([oldT, tag], { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 }, 0.15);
  tl.to(cam, { scale: 1.02, duration: tWhat, ease: 'power1.inOut' }, 0);

  // "legends": the legend flies off
  tl.to(legend, { x: 640, rotation: 14, opacity: 0, duration: 0.6, ease: 'power3.in' }, tLegend - 0.25);

  // "gridlines": wipe away
  tl.to(gridWrap, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.7, ease: 'power2.inOut' }, tGrid - 0.1);
  tl.to(axis, { background: 'rgba(26,34,51,.3)', duration: 0.5 }, tGrid);

  // "3D effects": flatten, grey, final bar orange
  tl.to(chart, { rotationY: 0, rotationX: 0, x: 120, duration: 1.0, ease: 'expo.inOut' }, t3D - 0.15);
  tl.to(bars.map((b) => b.top), { scaleY: 0, opacity: 0, duration: 0.5, ease: 'power2.in' }, t3D);
  tl.to(bars.map((b) => b.side), { scaleX: 0, opacity: 0, duration: 0.5, ease: 'power2.in' }, t3D);
  tl.to(bars.map((b) => b.flat), { opacity: 1, duration: 0.5, stagger: 0.05 }, tEff - 0.2);
  tl.to(bars.map((b) => b.front), { boxShadow: '0px 0px 0px rgba(0,0,0,0), inset 0 0px 0 rgba(255,255,255,0)', borderRadius: '6px 6px 0 0', duration: 0.5 }, tEff - 0.2);
  tl.to(last.front, { boxShadow: '0 0 50px rgba(255,90,60,.4)', duration: 0.6 }, tEff + 0.2);

  // "headline": draw attention to the label-title
  tl.to(oldT, { backgroundColor: 'rgba(221,225,231,1)', duration: 0.4 }, tHead);
  // "what the chart shows": strike and replace
  tl.to(strike, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, tWhat - 0.05);
  tl.to([oldT, tag], { opacity: 0, y: 30, duration: 0.4, ease: 'power2.in' }, tWhat + 0.4);
  tl.to(words, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(1.6)' }, tShows - 0.15);
  tl.to(cam, { scale: 1.04, duration: ctx.dur - tWhat, ease: 'power1.inOut' }, tWhat);
  tl.to(last.front, { boxShadow: '0 0 90px rgba(255,90,60,.6)', duration: 0.5, yoyo: true, repeat: 1 }, tNot);
});

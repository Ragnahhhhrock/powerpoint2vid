/* Scene 3 — "Output follows the sun. It climbs through the morning, peaks around midday, and fades by evening."
 * Storyboard: the plain line chart is shown, then the stage turns to a dusk-to-day sky. The sun travels an
 * arc while the real data curve draws beneath it in sync; area fills amber; "peaks" pins 3.9 kW at 12pm;
 * on "fades" the sky dims and the lecture title card settles. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const follows = ctx.at(0, 'follows'), climbs = ctx.at(1, 'climbs'), peaks = ctx.at(1, 'peaks'), fades = ctx.at(1, 'fades'), evening = ctx.at(1, 'evening');
  const DATA = [['6am', 0.2], ['8am', 1.4], ['10am', 3.1], ['12pm', 3.9], ['2pm', 3.5], ['4pm', 2.0], ['6pm', 0.3]];
  const X0 = 300, X1 = 1620, BASE = 880, PX = 105;
  const P = DATA.map(([, v], i) => [X0 + (i * (X1 - X0)) / 6, BASE - v * PX]);

  // Catmull-Rom -> cubic bezier through the real points
  let d = `M${P[0][0]} ${P[0][1]}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`;
  }
  const area = d + ` L${X1} ${BASE} L${X0} ${BASE} Z`;

  const sky = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 700px' });
  const sunX = (p) => X0 + p * (X1 - X0), sunY = (p) => 480 - Math.sin(Math.PI * p) * 230;
  const sun = el('div', 'abs', cam, { left: 0, top: 0, width: '120px', height: '120px', marginLeft: '-60px', marginTop: '-60px', borderRadius: '50%', background: 'radial-gradient(circle at 42% 38%, #fff6d8, #ffd27a 40%, #ffb547 70%, #ff7a1a)', boxShadow: '0 0 90px 30px rgba(255,170,60,.55)' });
  const sunPath = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  let arc = ''; for (let k = 0; k <= 40; k++) { const p = k / 40; arc += (k ? ' L' : 'M') + sunX(p) + ' ' + sunY(p); }
  sunPath.innerHTML = `<svg width="1920" height="1080"><path d="${arc}" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="3" stroke-dasharray="4 14" stroke-linecap="round"/></svg>`;

  const chart = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  chart.innerHTML = `<svg width="1920" height="1080"><defs><linearGradient id="fa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb547" stop-opacity=".75"/><stop offset="1" stop-color="#ff7a1a" stop-opacity=".05"/></linearGradient>
    <linearGradient id="st" x1="0" x2="1"><stop offset="0" stop-color="#ffd27a"/><stop offset=".5" stop-color="#fff2c4"/><stop offset="1" stop-color="#ff7a1a"/></linearGradient></defs>
    ${[1, 2, 3, 4].map((v) => `<line x1="${X0 - 30}" x2="${X1 + 30}" y1="${BASE - v * PX}" y2="${BASE - v * PX}" stroke="rgba(255,255,255,.10)" stroke-width="2"/>`).join('')}
    <line x1="${X0 - 30}" x2="${X1 + 30}" y1="${BASE}" y2="${BASE}" stroke="rgba(255,255,255,.4)" stroke-width="3"/>
    <path id="area" d="${area}" fill="url(#fa)"/><path id="line" d="${d}" fill="none" stroke="url(#st)" stroke-width="9" stroke-linecap="round" style="filter:drop-shadow(0 0 14px rgba(255,180,70,.8))"/></svg>`;
  const reveal = el('div', 'abs', cam, { inset: 0 }); reveal.appendChild(chart);
  const yl = [1, 2, 3, 4].map((v) => { const t = el('div', 'abs', cam, { left: X0 - 120 + 'px', top: BASE - v * PX - 14 + 'px', width: '70px', textAlign: 'right', font: '600 24px/1 Inter', color: 'rgba(255,255,255,.5)' }); t.textContent = v + ' kW'; return t; });
  const xl = DATA.map(([q], i) => { const t = el('div', 'abs', cam, { left: P[i][0] - 60 + 'px', top: BASE + 22 + 'px', width: '120px', textAlign: 'center', font: '700 26px/1 Inter', color: 'rgba(255,255,255,.7)' }); t.textContent = q; return t; });
  const dots = P.map(([x, y]) => el('div', 'abs', cam, { left: x - 11 + 'px', top: y - 11 + 'px', width: '22px', height: '22px', borderRadius: '50%', background: '#fff', border: '5px solid #ff9d3a', opacity: 0 }));

  const pin = el('div', 'abs', cam, { left: P[3][0] - 620 + 'px', top: P[3][1] - 140 + 'px', width: '380px', textAlign: 'right' });
  pin.innerHTML = '<div style="font:900 104px/0.95 Inter Display,Inter;letter-spacing:-.05em;color:#fff;text-shadow:0 0 40px rgba(255,180,70,.6)">3.9 kW</div><div style="font:600 24px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;color:#ffd27a;margin-top:12px">PEAK · 12PM</div>';
  const pinLine = el('div', 'abs', cam, { left: P[3][0] - 222 + 'px', top: P[3][1] - 2 + 'px', width: '200px', height: '4px', background: 'linear-gradient(90deg, rgba(255,210,122,0), #ffd27a)', transformOrigin: '100% 50%' });

  const orig = el('div', 'abs', stage, { left: '400px', top: '200px', width: '1120px', height: '630px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.5)' });
  const oi = el('img', 'abs', orig, { inset: 0, width: '100%', height: '100%' }); oi.src = ctx.asset('slide-4.png');
  const tagO = el('div', 'abs', stage, { left: '400px', top: '150px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'rgba(255,255,255,.6)' }); tagO.textContent = 'SLIDE 4 · AS WRITTEN';

  const head = el('div', 'abs', stage, { left: '120px', top: '100px', font: '800 76px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', whiteSpace: 'nowrap' });
  head.textContent = 'Output follows the sun';
  const sub = el('div', 'abs', stage, { left: '124px', top: '192px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'rgba(255,255,255,.55)' });
  sub.textContent = 'ONE SUNNY DAY · EXAMPLE DATA';
  const card = el('div', 'abs', stage, { right: '120px', bottom: '70px', padding: '18px 26px', borderRadius: '16px', background: 'rgba(5,13,24,.6)', border: '1px solid rgba(255,255,255,.18)', font: '700 28px/1 Inter', color: '#fff', whiteSpace: 'nowrap' });
  card.innerHTML = 'How solar panels work <span style="color:#ffd27a">· Physics 101</span>';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const st = { p: 0, night: 1 };
  const T0 = climbs - 0.35, T1 = evening + 0.15;
  const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  ctx.onFrame((t) => {
    const p = Math.max(0, Math.min(1, (t - T0) / (T1 - T0)));
    const day = Math.sin(Math.PI * p) * (1 - st.night * 0.0);
    const top = mix([12, 10, 34], [40, 108, 190], day), mid = mix([60, 30, 60], [110, 170, 230], day), low = mix([230, 110, 60], [255, 220, 170], day * 0.6 + 0.2);
    const dim = st.night;
    sky.style.background = `linear-gradient(180deg, rgb(${mix(top, [5, 9, 20], dim)}) 0%, rgb(${mix(mid, [12, 20, 40], dim)}) 60%, rgb(${mix(low, [30, 26, 40], dim)}) 100%)`;
    sun.style.transform = `translate(${sunX(p)}px, ${sunY(p)}px)`;
    reveal.style.clipPath = `inset(0px ${1920 - (X0 + p * (X1 - X0)) - 2}px 0px 0px)`;
  });

  /* ---- timeline ---- */
  tl.from(orig, { y: 40, opacity: 0, duration: 0.5 }, 0.0);
  tl.from(tagO, { opacity: 0, duration: 0.4 }, 0.2);
  gsap.set([orig, tagO], { filter: 'blur(0px)' });
  tl.to([orig, tagO], { opacity: 0, scale: 0.92, filter: 'blur(8px)', duration: 0.6, ease: 'power2.in' }, follows - 0.3);
  tl.to(st, { night: 0.15, duration: 1.2, ease: 'power2.out' }, follows - 0.2);
  tl.from(head, { opacity: 0, y: 24, duration: 0.6, ease: 'back.out(1.6)' }, follows - 0.1);
  tl.from(sub, { opacity: 0, duration: 0.5 }, follows + 0.2);
  tl.from([...yl, ...xl], { opacity: 0, duration: 0.4, stagger: 0.03 }, follows + 0.1);
  tl.from([sun, sunPath], { opacity: 0, duration: 0.5 }, follows + 0.2);
  P.forEach((pt, i) => tl.to(dots[i], { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)' }, T0 + (i / 6) * (T1 - T0) - 0.05));
  tl.from(pinLine, { scaleX: 0, duration: 0.35 }, peaks);
  tl.from(pin, { opacity: 0, y: 30, scale: 0.8, duration: 0.5, ease: 'back.out(2)' }, peaks + 0.05);
  tl.to(dots[3], { scale: 1.7, duration: 0.25, yoyo: true, repeat: 1 }, peaks);
  tl.to(st, { night: 0.75, duration: 1.4, ease: 'power2.inOut' }, fades);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.03, duration: ctx.dur - follows, ease: 'sine.inOut', immediateRender: false }, follows);
  tl.from(card, { opacity: 0, y: 20, duration: 0.6, ease: 'back.out(1.6)' }, evening + 0.3);
});

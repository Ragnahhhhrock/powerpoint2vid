/* Scene 1 — "On Monday, you'll meet your team and your buddy. Midweek is tools training. On Thursday, you'll
 *            shadow a customer call, and Friday ends with a check-in with your manager."
 * Storyboard: a hand-drawn route line runs left to right like a voyage chart through the week's stops; a
 * little boat travels it. Each day card pops on its spoken day with an ink icon (people, laptop, headset,
 * coffee). */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const INK = '#1d1a16';
  const T = [ctx.at(0, 'monday'), ctx.at(1, 'midweek'), ctx.at(2, 'thursday'), ctx.at(2, 'friday')];

  stage.style.background = 'var(--paper)';
  el('div', 'abs', stage, { inset: 0, backgroundImage: 'radial-gradient(rgba(29,26,22,.16) 1.6px, transparent 1.6px)', backgroundSize: '40px 40px' });
  el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(60% 50% at 50% 60%, rgba(63,143,166,.14), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  const head = el('div', 'abs', cam, { left: '150px', top: '96px', font: '800 84px/1 Inter Display, Inter', letterSpacing: '-.045em', color: INK, whiteSpace: 'nowrap' }); head.textContent = 'Your first week';
  const kick = el('div', 'abs', cam, { left: '154px', top: '196px', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: '#d9483b' }); kick.textContent = 'MON → FRI';

  /* route */
  const STOPS = [[260, 560], [740, 620], [1200, 540], [1660, 600]];
  let d = `M120 590`;
  const pts = [[120, 590], ...STOPS, [1840, 560]];
  for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; d += ` C${x0 + (x1 - x0) * 0.5} ${y0 + 90 * (i % 2 ? 1 : -1)}, ${x0 + (x1 - x0) * 0.5} ${y1 - 90 * (i % 2 ? 1 : -1)}, ${x1} ${y1}`; }
  const svgW = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  svgW.innerHTML = `<svg width="1920" height="1080"><path id="route" d="${d}" fill="none" stroke="${INK}" stroke-width="6" stroke-dasharray="18 14" stroke-linecap="round"/></svg>`;
  const route = svgW.querySelector('#route'); const RL = route.getTotalLength();
  const cover = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' }); cover.appendChild(svgW);

  const stopEls = STOPS.map(([x, y]) => el('div', 'abs', cam, { left: x - 22 + 'px', top: y - 22 + 'px', width: '44px', height: '44px', borderRadius: '50%', background: '#f4efe4', border: `6px solid ${INK}` }));

  /* icons */
  const IC = {
    people: `<circle cx="34" cy="28" r="13"/><circle cx="68" cy="30" r="11"/><path d="M12 76 C 14 52, 54 52, 56 76"/><path d="M50 72 C 54 54, 86 54, 90 74"/>`,
    laptop: `<rect x="20" y="20" width="60" height="40" rx="5"/><path d="M8 72 L92 72 L84 62 L16 62 Z"/>`,
    headset: `<path d="M18 58 L18 46 C 18 20, 82 20, 82 46 L82 58"/><rect x="12" y="50" width="16" height="24" rx="5"/><rect x="72" y="50" width="16" height="24" rx="5"/><path d="M80 74 C 80 84, 64 86, 54 86"/>`,
    cup: `<path d="M20 34 L72 34 L66 80 L26 80 Z"/><path d="M72 44 C 92 44, 92 66, 68 66"/><path d="M36 14 C 30 22, 42 24, 36 30 M52 14 C 46 22, 58 24, 52 30"/>`
  };
  const CARDS = [['MON', 'Meet your team and buddy', 'people', -1], ['TUE–WED', 'Systems and tools training', 'laptop', 1], ['THU', 'Shadow a customer call', 'headset', -1], ['FRI', 'Check-in with your manager', 'cup', 1]];
  const cards = CARDS.map(([day, txt, icon, side], i) => {
    const [x, y] = STOPS[i];
    const c = el('div', 'abs', cam, { left: x - 190 + 'px', top: (side < 0 ? y - 330 : y + 70) + 'px', width: '380px', height: '250px', borderRadius: '10px', background: '#fffdf8', border: `4px solid ${INK}`, boxShadow: '9px 10px 0 rgba(29,26,22,.18)', rotate: (i % 2 ? 1.5 : -1.5) + 'deg', transformOrigin: side < 0 ? '50% 100%' : '50% 0%' });
    const ic = el('div', 'abs', c, { left: '22px', top: '22px', width: '100px', height: '100px', borderRadius: '50%', background: ['#e8a33d', '#a9cbd2', '#f2b8ae', '#d9e4c8'][i] });
    ic.innerHTML = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${IC[icon]}</svg>`;
    const dl = el('div', 'abs', c, { left: '142px', top: '40px', font: '800 30px/1 ui-monospace, Menlo, monospace', letterSpacing: '.08em', color: '#d9483b' }); dl.textContent = day;
    const tx = el('div', 'abs', c, { left: '24px', top: '140px', right: '20px', font: '800 34px/1.12 Inter', letterSpacing: '-.02em', color: INK }); tx.textContent = txt;
    const stem = el('div', 'abs', cam, { left: x - 3 + 'px', top: (side < 0 ? y - 80 : y + 22) + 'px', width: '6px', height: '58px', background: INK, transformOrigin: side < 0 ? '50% 100%' : '50% 0%' });
    return { c, stem };
  });

  /* boat */
  const boat = el('div', 'abs', cam, { left: 0, top: 0, width: '90px', height: '90px', marginLeft: '-45px', marginTop: '-78px' });
  boat.innerHTML = `<svg width="90" height="90" viewBox="0 0 90 90" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"><path d="M10 64 L80 64 L68 80 L22 80 Z" fill="#1f3a5f"/><path d="M44 10 L44 60"/><path d="M48 14 L76 56 L48 56 Z" fill="#fffdf8"/><path d="M40 20 L18 56 L40 56 Z" fill="#d9483b"/></svg>`;

  ctx.fx.grain({ opacity: 0.07, blend: 'multiply' });

  // boat progress: reaches each stop as its day is spoken
  const stopLen = STOPS.map(([sx]) => { let lo = 0, hi = RL; for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2; if (route.getPointAtLength(m).x < sx) lo = m; else hi = m; } return lo; });
  const st = { L: 0 };
  ctx.onFrame(() => {
    const p = route.getPointAtLength(Math.max(0, Math.min(RL, st.L)));
    const q = route.getPointAtLength(Math.max(0, Math.min(RL, st.L + 4)));
    boat.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${Math.atan2(q.y - p.y, q.x - p.x) * 57.3 * 0.5}deg)`;
    cover.style.clipPath = `inset(0px ${1920 - p.x - 4}px 0px 0px)`;
  });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.05 }, { scale: 1, duration: ctx.dur, ease: 'power1.out' }, 0);
  tl.from([head, kick], { opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)' }, 0.05);
  tl.from(boat, { opacity: 0, scale: 0.5, duration: 0.5, ease: 'back.out(2)' }, 0.1);
  tl.from(stopEls, { scale: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(2.5)' }, 0.3);
  T.forEach((t, i) => {
    tl.to(st, { L: stopLen[i], duration: Math.max(0.5, i ? t - T[i - 1] - 0.1 : t - 0.2), ease: 'power2.inOut' }, i ? T[i - 1] + 0.05 : 0.2);
    tl.to(stopEls[i], { background: '#e8a33d', scale: 1.25, duration: 0.25, ease: 'back.out(3)' }, t - 0.05);
    tl.from(cards[i].stem, { scaleY: 0, duration: 0.25 }, t - 0.05);
    tl.from(cards[i].c, { scale: 0.4, opacity: 0, duration: 0.55, ease: 'back.out(1.9)' }, t + 0.05);
  });
  tl.to(st, { L: RL, duration: ctx.dur - T[3] - 0.2, ease: 'power1.inOut' }, T[3] + 0.6);
});

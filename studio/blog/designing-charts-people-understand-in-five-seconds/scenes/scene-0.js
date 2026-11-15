/* Scene 0 — "A chart gets about five seconds to do its job. In a video, you can't point at the bar
 * that matters, so the chart has to explain itself."
 * Storyboard: night stage. A thin signal-orange stopwatch ring draws itself on "five seconds", with a
 * big 160px "5" that ticks down to 4. The slide title is rebuilt as a small caption under the ring
 * (the overlapping "Seconds" text is cut). On "video" the stopwatch slides left. On "point at the bar"
 * a grey bar chart fades in and a ghostly hand reaches for one bar, falls short and dissolves. On
 * "explain itself" that bar turns signal orange and the camera pushes in on it.
 */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const five = ctx.at(0, 'five'), seconds = ctx.at(0, 'seconds'), job = ctx.at(0, 'job.');
  const video = ctx.at(1, 'video,'), point = ctx.at(1, 'point'), bar = ctx.at(1, 'bar');
  const matters = ctx.at(1, 'matters,'), explain = ctx.at(1, 'explain');

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #1a2335 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 30% at 50% 41%, rgba(255,90,60,.10), transparent 70%)', opacity: 0 });
  const drift = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: '1405px 570px' });

  /* ---------- stopwatch ---------- */
  const watch = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: '960px 440px' });
  const R = 180, C = 2 * Math.PI * R;
  const ringWrap = el('div', 'abs', watch, { left: '760px', top: '240px', width: '400px', height: '400px' });
  let ticks = '';
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i / 5) * Math.PI * 2;
    const x1 = 200 + Math.cos(a) * 196, y1 = 200 + Math.sin(a) * 196, x2 = 200 + Math.cos(a) * 210, y2 = 200 + Math.sin(a) * 210;
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#A3A9B3" stroke-width="3" stroke-linecap="round" opacity=".5"/>`;
  }
  ringWrap.innerHTML = `<svg width="400" height="400" style="overflow:visible">
    <circle cx="200" cy="200" r="${R}" fill="none" stroke="rgba(163,169,179,.18)" stroke-width="6"/>
    ${ticks}
    <circle id="prog" cx="200" cy="200" r="${R}" fill="none" stroke="#FF5A3C" stroke-width="6" stroke-linecap="round"
      transform="rotate(-90 200 200)" stroke-dasharray="${C}" stroke-dashoffset="${C}" style="filter:drop-shadow(0 0 10px rgba(255,90,60,.7))"/>
  </svg>`;
  const prog = ringWrap.querySelector('#prog');
  const crown = el('div', 'abs', watch, { left: '940px', top: '206px', width: '40px', height: '18px', borderRadius: '5px', background: 'var(--grey)', opacity: 0.55 });
  const num = el('div', 'abs', watch, { left: '760px', top: '240px', width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    font: '800 160px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', fontVariantNumeric: 'tabular-nums' });
  const unit = el('div', 'abs', watch, { left: '760px', top: '530px', width: '400px', textAlign: 'center', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.24em', color: 'var(--grey)' });
  unit.textContent = 'SECONDS';
  const caption = el('div', 'abs', watch, { left: '560px', top: '690px', width: '800px', textAlign: 'center', font: '600 36px/1.2 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--mist)' });
  caption.innerHTML = 'One chart, one message, <span style="color:#FF5A3C">five seconds</span>';

  const cd = { s: 5, off: C };
  ctx.onFrame(() => {
    num.textContent = String(Math.ceil(cd.s - 1e-6));
    prog.setAttribute('stroke-dashoffset', cd.off);
  });

  /* ---------- grey bar chart ---------- */
  const BASE = 780, BW = 90, GAP = 50, X0 = 940;
  const H = [220, 300, 260, 420, 340, 280], HI = 3;
  const chart = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const axis = el('div', 'abs', chart, { left: '910px', top: BASE + 'px', width: '850px', height: '2px', background: 'rgba(163,169,179,.4)', transformOrigin: '0 50%' });
  const bars = H.map((h, i) => el('div', 'abs', chart, { left: X0 + i * (BW + GAP) + 'px', top: BASE - h + 'px', width: BW + 'px', height: h + 'px',
    borderRadius: '10px 10px 2px 2px', background: 'linear-gradient(180deg, #8d939d, #5f6570)', transformOrigin: '50% 100%' }));
  const hb = bars[HI];
  const hot = el('div', 'abs', chart, { left: X0 + HI * (BW + GAP) + 'px', top: BASE - H[HI] + 'px', width: BW + 'px', height: H[HI] + 'px',
    borderRadius: '10px 10px 2px 2px', background: 'linear-gradient(180deg, #ff8a6f, #FF5A3C 60%, #d8432a)', boxShadow: '0 0 60px rgba(255,90,60,.6)', transformOrigin: '50% 100%', opacity: 0 });

  /* ---------- ghost hand ---------- */
  const tipX = 1478, tipY = 520;
  const hand = el('div', 'abs', cam, { left: tipX - 51 + 'px', top: tipY + 'px', width: '120px', height: '150px', transformOrigin: '51px 0px' });
  hand.innerHTML = `<svg width="120" height="150" viewBox="0 0 120 150">
    <g fill="rgba(221,225,231,.12)" stroke="rgba(221,225,231,.75)" stroke-width="3" stroke-linejoin="round">
      <rect x="40" y="0" width="22" height="80" rx="11"/>
      <rect x="20" y="58" width="80" height="78" rx="22"/>
      <rect x="60" y="54" width="18" height="34" rx="9"/>
      <rect x="76" y="58" width="18" height="32" rx="9"/>
      <rect x="6" y="78" width="26" height="18" rx="9"/>
    </g></svg>`;

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---------- timeline ---------- */
  gsap.set(hand, { rotation: -40, opacity: 0, filter: 'blur(0px)' });
  gsap.set(bars, { scaleY: 0, opacity: 0 });
  gsap.set(axis, { scaleX: 0, opacity: 0 });
  gsap.set(chart, { filter: 'brightness(1)' });

  tl.to(drift, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);
  tl.from([ringWrap, crown], { opacity: 0, scale: 0.92, duration: 0.8, transformOrigin: '50% 50%' }, 0.05);
  tl.from(num, { opacity: 0, y: 20, duration: 0.8 }, 0.15);
  tl.from(unit, { opacity: 0, duration: 0.6 }, 0.4);
  tl.from(caption, { opacity: 0, y: 24, duration: 0.8 }, 0.9);

  // "five seconds": the ring draws itself
  tl.to(cd, { off: 0, duration: seconds + 0.45 - five, ease: 'power2.inOut' }, five);
  tl.to(glow, { opacity: 1, duration: 0.8 }, five);
  tl.fromTo(num, { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, seconds);
  // countdown 5 -> 4
  const cs = seconds + 0.5;
  tl.to(cd, { s: 4, off: C * 0.2, duration: Math.max(0.8, job + 0.3 - cs), ease: 'none' }, cs);
  tl.fromTo(num, { scale: 1.12, color: '#FF5A3C' }, { scale: 1, color: '#F6F4EF', duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, job + 0.3);

  // "video": stopwatch steps aside
  tl.to(watch, { x: -470, scale: 0.85, duration: 1.0, ease: 'expo.inOut' }, video - 0.1);
  tl.to(glow, { opacity: 0.4, x: -470, duration: 1.0, ease: 'expo.inOut' }, video - 0.1);

  // "point at the bar": grey chart arrives
  tl.to(axis, { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power3.out' }, point - 0.45);
  tl.to(bars, { scaleY: 1, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'back.out(1.3)' }, point - 0.35);

  // ghost hand reaches, falls short, dissolves
  tl.fromTo(hand, { x: 320, y: 300, opacity: 0 }, { x: 40, y: 20, opacity: 0.85, duration: bar - point + 0.4, ease: 'power2.out', immediateRender: false }, point - 0.1);
  tl.to(hand, { x: 28, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' }, bar + 0.3);
  tl.to(hand, { opacity: 0, filter: 'blur(10px)', scale: 1.15, y: 0, duration: 0.8, ease: 'power2.in' }, matters + 0.2);

  // "explain itself": one bar ignites, camera pushes in
  tl.to(bars.filter((_, i) => i !== HI), { opacity: 0.45, duration: 0.6 }, explain - 0.1);
  tl.to(watch, { opacity: 0.55, duration: 0.8 }, explain - 0.1);
  tl.to(hot, { opacity: 1, duration: 0.35, ease: 'power2.out' }, explain);
  tl.fromTo(hot, { scaleY: 0.96 }, { scaleY: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, explain);
  tl.to(hb, { opacity: 0, duration: 0.35 }, explain);
  tl.to(cam, { scale: 1.1, duration: 1.4, ease: 'expo.inOut' }, explain - 0.15);
  tl.to(hot, { boxShadow: '0 0 110px rgba(255,90,60,.85)', duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, explain + 0.4);
});

/* Scene 3 — "Video shows the steps while it explains them. It works when you're offline, keeps every detail
 * accurate and on brand, and captions help more people understand."
 * Storyboard: night stage split into four tiles that light up one at a time. "shows the steps": a numbered
 * 1-2-3 path draws in teal. "offline": a moon rises over a clock reading late night, "Nights & weekends".
 * "accurate and on brand": identical amber cards snap into line. "captions": a muted speaker gets a
 * caption bar sliding in. Headline "Clearer. Consistent. Always on." settles across the top at 110px. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const tVideo = W(0, 'Video', 0.55), tShows = W(0, 'shows', 1.03), tSteps = W(0, 'steps', 1.46), tExpl = W(0, 'explains', 2.19);
  const tWorks = W(1, 'works', 3.64), tOff = W(1, 'offline', 4.29), tEvery = W(1, 'every', 5.36), tAcc = W(1, 'accurate', 6.13);
  const tBrand = W(1, 'brand', 6.95), tCap = W(1, 'captions', 7.86), tHelp = W(1, 'help', 8.39), tPeople = W(1, 'people', 8.84), tUnd = W(1, 'understand', 9.16);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 50% at 50% 20%, #1d2c46 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 35% at 20% 80%, rgba(43,179,163,.10), transparent 70%), radial-gradient(35% 30% at 85% 75%, rgba(242,165,65,.08), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* ---- headline ---- */
  const head = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '86px', textAlign: 'center', whiteSpace: 'nowrap', font: '800 110px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)' });
  const hw = ['Clearer.', 'Consistent.', 'Always on.'].map((s, i) => { const sp = el('span', '', head, { display: 'inline-block', marginRight: i < 2 ? '.28em' : 0 }); sp.textContent = s; return sp; });
  let wsum = hw.reduce((a, s) => a + s.getBoundingClientRect().width, 0) + 2 * 0.28 * 110;
  if (wsum > 1740) head.style.fontSize = Math.floor(110 * 1740 / wsum) + 'px';

  /* ---- tiles ---- */
  const ACC = ['#2BB3A3', '#F2A541', '#F2A541', '#E8604C'];
  const LABS = ['01 · SHOWS THE STEPS', '02 · ALWAYS ON', '03 · ON BRAND', '04 · SOUND OFF'];
  const TW = 410, TH = 660, TT = 270;
  const tiles = ACC.map((c, i) => {
    const box = el('div', 'abs', cam, { left: 80 + i * 450 + 'px', top: TT + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '28px', overflow: 'hidden',
      background: 'linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.015))', border: '1.5px solid rgba(154,166,184,.18)', boxShadow: '0 30px 70px rgba(0,0,0,.35)' });
    const lit = el('div', 'abs', box, { inset: 0, opacity: 0, background: `radial-gradient(90% 60% at 50% 35%, ${c}2e, transparent 75%)` });
    const ghost = el('div', 'abs', box, { right: '26px', top: '14px', font: '900 120px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'rgba(255,255,255,.04)' }); ghost.textContent = '0' + (i + 1);
    const lab = el('div', 'abs', box, { left: '34px', bottom: '36px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)', opacity: 0.45 }); lab.textContent = LABS[i];
    const bar = el('div', 'abs', box, { left: '34px', bottom: '78px', width: '60px', height: '4px', borderRadius: '2px', background: c, transformOrigin: '0 50%' });
    gsap.set(bar, { scaleX: 0 });
    const art = el('div', 'abs', box, { left: 0, top: '60px', width: TW + 'px', height: '440px' });
    return { box, lit, lab, bar, art, c };
  });
  const light = (k, t) => {
    const T = tiles[k];
    tl.to(T.lit, { opacity: 1, duration: 0.6, ease: 'power2.out' }, t);
    tl.to(T.box, { borderColor: T.c, boxShadow: `0 30px 70px rgba(0,0,0,.35), 0 0 60px ${T.c}40`, y: -10, duration: 0.6, ease: 'back.out(1.6)' }, t);
    tl.to(T.lab, { opacity: 1, color: '#F7F4EE', duration: 0.4 }, t + 0.1);
    tl.to(T.bar, { scaleX: 1, duration: 0.5, ease: 'expo.out' }, t + 0.1);
  };
  const svgNS = (art, html) => { art.innerHTML = `<svg width="${TW}" height="440" viewBox="0 0 ${TW} 440" style="overflow:visible">${html}</svg>`; return art.querySelector('svg'); };

  /* tile 1: numbered 1-2-3 path */
  const s1 = svgNS(tiles[0].art, `
    <path id="p1" d="M85 350 L205 225 L325 100" fill="none" stroke="#2BB3A3" stroke-width="8" stroke-linecap="round" stroke-dasharray="360" stroke-dashoffset="360" style="filter:drop-shadow(0 0 10px rgba(43,179,163,.7))"/>
    ${[[85, 350], [205, 225], [325, 100]].map(([x, y], i) => `<g class="st"><circle cx="${x}" cy="${y}" r="44" fill="#0F1A2B" stroke="#2BB3A3" stroke-width="6"/><text x="${x}" y="${y + 15}" text-anchor="middle" font-family="Inter Display, Inter" font-weight="900" font-size="44" fill="#F7F4EE">${i + 1}</text></g>`).join('')}`);
  const steps = s1.querySelectorAll('.st'), p1 = s1.querySelector('#p1');
  gsap.set(steps, { scale: 0, transformOrigin: '50% 50%' });

  /* tile 2: moon over a late-night clock */
  const s2 = svgNS(tiles[1].art, `
    <defs><mask id="mn"><rect x="0" y="0" width="410" height="440" fill="#fff"/><circle cx="336" cy="66" r="38" fill="#000"/></mask>
    <radialGradient id="mhalo"><stop offset="0" stop-color="#F2A541" stop-opacity=".45"/><stop offset=".55" stop-color="#F2A541" stop-opacity=".12"/><stop offset="1" stop-color="#F2A541" stop-opacity="0"/></radialGradient></defs>
    ${[[60, 50], [120, 110], [250, 40], [370, 170], [40, 200]].map(([x, y]) => `<circle class="star" cx="${x}" cy="${y}" r="3" fill="#F7F4EE"/>`).join('')}
    <g id="moon"><circle cx="315" cy="85" r="90" fill="url(#mhalo)"/><circle cx="315" cy="85" r="44" fill="#F2A541" mask="url(#mn)"/></g>
    <g id="clock"><circle cx="190" cy="250" r="118" fill="rgba(15,26,43,.9)" stroke="#9AA6B8" stroke-width="5"/>
    ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${190 + Math.sin(a) * 96}" y1="${250 - Math.cos(a) * 96}" x2="${190 + Math.sin(a) * 106}" y2="${250 - Math.cos(a) * 106}" stroke="#9AA6B8" stroke-width="${i % 3 ? 3 : 6}" stroke-linecap="round"/>`; }).join('')}
    <line id="hh" x1="190" y1="250" x2="190" y2="185" stroke="#F7F4EE" stroke-width="9" stroke-linecap="round"/>
    <line id="mh" x1="190" y1="250" x2="190" y2="160" stroke="#F2A541" stroke-width="5" stroke-linecap="round"/>
    <circle cx="190" cy="250" r="9" fill="#F2A541"/></g>`);
  const moon = s2.querySelector('#moon'), clock = s2.querySelector('#clock'), hh = s2.querySelector('#hh'), mh = s2.querySelector('#mh'), stars = s2.querySelectorAll('.star');
  gsap.set(hh, { rotation: 320, svgOrigin: '190 250' }); gsap.set(mh, { rotation: 180, svgOrigin: '190 250' });
  gsap.set(moon, { y: 140, opacity: 0 }); gsap.set(clock, { opacity: 0.35 });
  const nights = el('div', 'abs', tiles[1].box, { left: '34px', width: '342px', top: '450px', font: '800 40px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--paper)', opacity: 0 });
  nights.textContent = 'Nights & weekends';

  /* tile 3: identical amber cards */
  const cards = [0, 1, 2].map((i) => {
    const c = el('div', 'abs', tiles[2].art, { left: '85px', top: 70 + i * 100 + 'px', width: '240px', height: '76px', borderRadius: '14px', background: 'linear-gradient(135deg, #f7bb63, #F2A541)', boxShadow: '0 14px 30px rgba(0,0,0,.35)', opacity: 0 });
    el('div', 'abs', c, { left: '16px', top: '18px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(28,36,51,.85)' });
    el('div', 'abs', c, { left: '70px', top: '22px', width: '120px', height: '10px', borderRadius: '5px', background: 'rgba(28,36,51,.75)' });
    el('div', 'abs', c, { left: '70px', top: '44px', width: '84px', height: '10px', borderRadius: '5px', background: 'rgba(28,36,51,.4)' });
    const chk = el('div', 'abs', c, { right: '-16px', top: '-14px', width: '38px', height: '38px', borderRadius: '50%', background: 'var(--teal)', color: '#0F1A2B', font: '900 24px/38px Inter', textAlign: 'center', boxShadow: '0 0 18px rgba(43,179,163,.7)' });
    chk.textContent = '✓'; gsap.set(chk, { scale: 0 });
    return { c, chk };
  });
  const scatter = [[-70, 30, -14], [60, -10, 10], [-40, 20, -8]];

  /* tile 4: muted speaker + caption bar */
  const s4 = svgNS(tiles[3].art, `
    <g id="spk"><path d="M110 130 L160 130 L215 85 L215 255 L160 210 L110 210 Z" fill="#F7F4EE" stroke="#F7F4EE" stroke-width="8" stroke-linejoin="round"/></g>
    <path id="x1" d="M250 135 L310 195" stroke="#E8604C" stroke-width="12" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="90"/>
    <path id="x2" d="M310 135 L250 195" stroke="#E8604C" stroke-width="12" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="90"/>`);
  const spk = s4.querySelector('#spk'), x1 = s4.querySelector('#x1'), x2 = s4.querySelector('#x2');
  gsap.set(spk, { opacity: 0.35 });
  const capWrap = el('div', 'abs', tiles[3].art, { left: '40px', top: '310px', width: '330px', height: '92px', overflow: 'hidden', borderRadius: '16px' });
  const cap = el('div', 'abs', capWrap, { inset: 0, borderRadius: '16px', background: 'rgba(0,0,0,.72)', border: '1.5px solid rgba(247,244,238,.25)' });
  const words = [[22, 24, 70], [102, 24, 110], [222, 24, 86], [22, 54, 130], [162, 54, 90]].map(([x, y, w]) =>
    el('div', 'abs', cap, { left: x + 'px', top: y + 'px', width: w + 'px', height: '14px', borderRadius: '7px', background: 'var(--paper)' }));
  gsap.set(cap, { yPercent: 110 }); gsap.set(words, { scaleX: 0, transformOrigin: '0 50%' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });
  ctx.onFrame((t) => stars.forEach((s, i) => s.setAttribute('opacity', (0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.2 + i * 1.7))).toFixed(3))));

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.035, x: -10, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(glow, { opacity: 0.6, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(tiles.map((T) => T.box), { opacity: 0, y: 60, duration: 0.8, stagger: 0.07 }, 0.05);
  gsap.set(hw, { filter: 'blur(0px)' });
  tl.fromTo(hw, { opacity: 0, y: 50, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.12, ease: 'power3.out' }, 0.1);
  tl.to(hw, { color: '#9AA6B8', duration: 0.4 }, 0.5);

  // tile 1 — clearer
  light(0, tVideo);
  tl.to(hw[0], { color: '#2BB3A3', duration: 0.4 }, tVideo);
  tl.to(steps, { scale: 1, duration: 0.55, ease: 'back.out(2)', stagger: Math.max(0.12, (tSteps - tShows) / 2 + 0.05) }, tShows - 0.05);
  tl.to(p1, { attr: { 'stroke-dashoffset': 0 }, duration: Math.max(0.6, tExpl - tShows), ease: 'power2.inOut' }, tShows);

  // tile 2 — always on
  light(1, tWorks);
  tl.to(clock, { opacity: 1, duration: 0.5 }, tWorks);
  tl.to(moon, { y: 0, opacity: 1, duration: 1.1, ease: 'back.out(1.3)' }, tOff - 0.3);
  tl.to(hh, { rotation: 355, duration: 1.2, ease: 'power2.inOut' }, tOff - 0.3);
  tl.to(mh, { rotation: 300, duration: 1.2, ease: 'power2.inOut' }, tOff - 0.3);
  tl.fromTo(nights, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)', immediateRender: false }, tOff);
  tl.to(hw[2], { color: '#F2A541', duration: 0.4 }, tOff);

  // tile 3 — consistent
  light(2, tEvery);
  cards.forEach(({ c }, i) => {
    const [x, y, r] = scatter[i];
    tl.fromTo(c, { opacity: 0, x: x * 1.6, y: y + 40, rotation: r * 1.5 }, { opacity: 1, x, y, rotation: r, duration: 0.5, ease: 'power3.out', immediateRender: false }, tEvery + i * 0.08);
    tl.to(c, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: 'back.out(1.8)' }, tAcc - 0.1 + i * 0.06);
  });
  tl.to(hw[1], { color: '#F2A541', duration: 0.4 }, tAcc);
  tl.to(cards.map((k) => k.chk), { scale: 1, duration: 0.45, ease: 'back.out(2.4)', stagger: 0.08 }, tBrand - 0.1);

  // tile 4 — captions
  light(3, tCap - 0.15);
  tl.to(spk, { opacity: 1, duration: 0.4 }, tCap - 0.1);
  tl.to(x1, { attr: { 'stroke-dashoffset': 0 }, duration: 0.25, ease: 'power2.out' }, tCap);
  tl.to(x2, { attr: { 'stroke-dashoffset': 0 }, duration: 0.25, ease: 'power2.out' }, tCap + 0.15);
  tl.to(cap, { yPercent: 0, duration: 0.6, ease: 'back.out(1.5)' }, tHelp - 0.15);
  tl.to(words, { scaleX: 1, duration: 0.3, ease: 'power2.out', stagger: Math.max(0.08, (tUnd - tPeople) / 3) }, tHelp + 0.2);

  // payoff: headline all bright, gentle push
  tl.to(hw, { color: '#F7F4EE', duration: 0.6, stagger: 0.08 }, tUnd + 0.2);
  tl.to(hw[0], { color: '#2BB3A3', duration: 0.4 }, tUnd + 0.7);
  tl.to(hw[2], { color: '#F2A541', duration: 0.4 }, tUnd + 0.8);
  tl.to(tiles.map((T) => T.box), { y: -14, duration: 0.6, stagger: 0.05, ease: 'back.out(1.6)' }, tUnd + 0.2);
});

/* Scene 3 — "Match the chart to your point. Change over time is a line, a few items is a sorted bar,
 * a ranking is horizontal bars, largest at top."
 * Storyboard: the bullet list is cut and rebuilt as three quiet tiles on a mist stage. The tiles appear
 * faintly, then each one activates on its beat. On "line" a teal line draws left to right in tile one.
 * On "sorted bar" grey bars shuffle into descending order. On "largest at top" horizontal bars restack
 * so the longest rises to the top and lights signal-orange. Each tile has a two-word label.
 * The camera drifts slowly right throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const point = ctx.at(0, 'point.'), change = ctx.at(1, 'Change'), line = ctx.at(1, 'line,');
  const few = ctx.at(1, 'few'), sorted = ctx.at(1, 'sorted'), ranking = ctx.at(1, 'ranking');
  const horiz = ctx.at(1, 'horizontal'), largest = ctx.at(1, 'largest'), top = ctx.at(1, 'top.');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 45% 35%, #f3f5f8 0%, var(--mist) 70%, #cfd4dc 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  // headline
  const head = el('div', 'abs', cam, { left: '150px', top: '110px', width: '1620px', font: '800 76px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  const words = ctx.split(head, 'Match the chart to the point', 'word');
  const kicker = el('div', 'abs', cam, { left: '154px', top: '216px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--grey)' });
  kicker.textContent = 'PICK THE CHART THAT FITS';

  // tiles
  const TW = 500, TH = 560, GAP = 60, X0 = 150, TY = 300;
  const labels = ['Over time', 'Few items', 'Ranked list'];
  const tiles = labels.map((txt, i) => {
    const t = el('div', 'abs', cam, { left: X0 + i * (TW + GAP) + 'px', top: TY + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '22px',
      background: 'var(--paper)', boxShadow: '0 30px 70px rgba(26,34,51,.12), 0 2px 0 rgba(255,255,255,.8) inset' });
    const area = el('div', 'abs', t, { left: '50px', top: '60px', width: '400px', height: '320px' });
    const base = el('div', 'abs', t, { left: '50px', top: '382px', width: '400px', height: '2px', background: 'rgba(163,169,179,.5)' });
    const num = el('div', 'abs', t, { left: '50px', top: '430px', font: `600 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--grey)' });
    num.textContent = '0' + (i + 1);
    const lab = el('div', 'abs', t, { left: '50px', top: '462px', font: '800 46px/1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
    lab.textContent = txt;
    return { t, area, base, lab, num };
  });

  /* tile 1: line */
  const a1 = tiles[0].area;
  const pts = [[0, 270], [60, 240], [120, 255], [180, 185], [240, 200], [300, 125], [360, 100], [400, 50]];
  const d = 'M' + pts.map((p) => p.join(' ')).join(' L ');
  const svgWrap = el('div', 'abs', a1, { inset: 0 });
  svgWrap.innerHTML = `<svg width="400" height="320" style="overflow:visible">
    <path d="${d}" fill="none" stroke="rgba(43,179,163,.25)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" class="glow"/>
    <path d="${d}" fill="none" stroke="#2BB3A3" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" class="ln"/></svg>`;
  const lnPaths = svgWrap.querySelectorAll('path');
  const dot = el('div', 'abs', a1, { left: '386px', top: '36px', width: '28px', height: '28px', borderRadius: '50%', background: '#2BB3A3', boxShadow: '0 0 24px rgba(43,179,163,.7)', opacity: 0 });

  /* tile 2: sorted vertical bars */
  const VV = [0.55, 0.9, 0.35, 0.7, 0.45];
  const order = VV.map((v, i) => i).sort((a, b) => VV[b] - VV[a]);
  const vbars = VV.map((v, i) => el('div', 'abs', tiles[1].area, { left: 10 + i * 82 + 'px', top: 320 - v * 300 + 'px', width: '52px', height: v * 300 + 'px',
    borderRadius: '8px 8px 2px 2px', background: 'var(--grey)', transformOrigin: '50% 100%' }));

  /* tile 3: horizontal bars, largest at top */
  const HV = [1, 0.8, 0.62, 0.45, 0.3];
  const startSlot = [3, 0, 4, 1, 2];
  const slotY = (k) => 14 + k * 62;
  const hbars = HV.map((v, i) => el('div', 'abs', tiles[2].area, { left: 0, top: 0, width: v * 390 + 'px', height: '42px', borderRadius: '2px 8px 8px 2px',
    background: 'var(--grey)', transformOrigin: '0% 50%' }));
  hbars.forEach((b, i) => gsap.set(b, { y: slotY(startSlot[i]), scaleX: 0 }));

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  // opening: headline + faint tiles on screen fast
  tl.from(words, { y: 40, opacity: 0, duration: 0.7, stagger: 0.06 }, 0.05);
  tl.from(kicker, { opacity: 0, duration: 0.5 }, 0.4);
  tl.to(words.slice(4), { color: '#FF5A3C', duration: 0.5, ease: 'power2.out' }, point);
  tiles.forEach((tt, i) => {
    tl.from(tt.t, { y: 60, opacity: 0, duration: 0.8 }, 0.15 + i * 0.1);
    gsap.set([tt.lab, tt.num], { opacity: 0 });
  });
  gsap.set(vbars, { scaleY: 0 });

  // camera: slow drift right + gentle push
  tl.fromTo(cam, { x: 40, scale: 1 }, { x: -40, scale: 1.035, duration: ctx.dur, ease: 'sine.inOut', immediateRender: false }, 0);

  const activate = (tt, t0) => {
    tl.to(tt.t, { y: -10, boxShadow: '0 40px 90px rgba(26,34,51,.2), 0 2px 0 rgba(255,255,255,.8) inset', duration: 0.6 }, t0);
    tl.to(tt.num, { opacity: 1, duration: 0.4 }, t0);
    tl.fromTo(tt.lab, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, t0 + 0.08);
  };
  const settle = (tt, t0) => tl.to(tt.t, { y: 0, boxShadow: '0 30px 70px rgba(26,34,51,.12), 0 2px 0 rgba(255,255,255,.8) inset', duration: 0.8, ease: 'power2.inOut' }, t0);

  // tile 1: "Change over time is a line"
  activate(tiles[0], change);
  tl.to(lnPaths, { attr: { 'stroke-dashoffset': 0 }, duration: 1.1, ease: 'power2.inOut' }, line - 0.7);
  tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, line + 0.35);

  // tile 2: "a few items is a sorted bar"
  settle(tiles[0], few - 0.2);
  activate(tiles[1], few);
  tl.to(vbars, { scaleY: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.06 }, few + 0.1);
  vbars.forEach((b, i) => tl.to(b, { x: (order.indexOf(i) - i) * 82, duration: 0.8, ease: 'expo.inOut' }, sorted));
  tl.to(vbars[order[0]], { background: '#1A2233', duration: 0.5 }, sorted + 0.6);

  // tile 3: "a ranking is horizontal bars, largest at top"
  settle(tiles[1], ranking - 0.2);
  activate(tiles[2], ranking);
  tl.to(hbars, { scaleX: 1, duration: 0.7, ease: 'back.out(1.3)', stagger: 0.07 }, horiz - 0.2);
  hbars.forEach((b, i) => tl.to(b, { y: slotY(i), duration: 0.85, ease: 'expo.inOut' }, largest - 0.1));
  tl.to(hbars[0], { background: '#FF5A3C', boxShadow: '0 0 30px rgba(255,90,60,.45)', duration: 0.5 }, top);
  tl.fromTo(hbars[0], { scaleY: 1 }, { scaleY: 1.18, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, top);
});

/* Scene 2 — "Panels produce direct current. An inverter switches it to alternating current, the kind your home runs on."
 * Storyboard: warm paper scene, engineering-diagram style. Panel, inverter and house are drawn as line art;
 * a straight DC line flows from the panel on "direct current", becomes a sine wave through the inverter on
 * "alternating", and the house windows light up on "home". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const panels = ctx.at(0, 'panels'), direct = ctx.at(0, 'direct'), inverter = ctx.at(1, 'inverter'), alt = ctx.at(1, 'alternating'), home = ctx.at(1, 'home');

  stage.style.background = 'var(--paper)';
  el('div', 'abs', stage, { inset: 0, backgroundImage: 'linear-gradient(rgba(22,50,92,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(22,50,92,.07) 1px, transparent 1px)', backgroundSize: '48px 48px' });
  el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 40% at 12% 18%, rgba(255,181,71,.22), transparent 70%), radial-gradient(40% 40% at 90% 80%, rgba(58,160,255,.12), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 600px' });

  const INK = '#16325c';
  const W = 6;
  // wave path from inverter to house
  let wave = 'M1110 640';
  for (let x = 1110; x <= 1440; x += 6) wave += ` L${x} ${640 - Math.sin((x - 1110) / 330 * Math.PI * 6) * 48}`;
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  svgWrap.innerHTML = `<svg width="1920" height="1080" fill="none" stroke="${INK}" stroke-width="${W}" stroke-linecap="round" stroke-linejoin="round">
    <g id="sun"><circle cx="300" cy="250" r="56" stroke="#ff7a1a"/>${Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2; return `<path d="M${300 + Math.cos(a) * 80} ${250 + Math.sin(a) * 80} L${300 + Math.cos(a) * 108} ${250 + Math.sin(a) * 108}" stroke="#ff7a1a"/>`; }).join('')}</g>
    <g id="panel"><path d="M170 520 L560 470 L620 720 L230 770 Z"/><path d="M300 503 L360 753 M430 486 L490 736 M200 645 L590 595" stroke-width="4"/><path d="M425 745 L425 860 M340 860 L510 860"/></g>
    <path id="dc" d="M620 640 L840 640" stroke="#ff7a1a" stroke-width="8" stroke-dasharray="26 18"/>
    <g id="inv"><rect x="840" y="540" width="270" height="200" rx="24"/><path d="M890 600 L960 600" stroke-width="5"/><path d="M990 600 q 18 -26 36 0 t 36 0" stroke-width="5"/><path d="M890 680 L1060 680" stroke-width="3"/></g>
    <path id="ac" d="${wave}" stroke="#3aa0ff" stroke-width="8"/>
    <g id="house"><path d="M1460 560 L1620 430 L1780 560 L1780 820 L1460 820 Z"/><path d="M1580 820 L1580 720 L1660 720 L1660 820" stroke-width="5"/></g>
  </svg>`;
  const svg = svgWrap.querySelector('svg');
  const part = (id) => svg.querySelector('#' + id);
  const len = (p) => (p.getTotalLength ? p.getTotalLength() : 1000);
  // prepare draw-on for every path/rect/circle in a group
  const drawables = (g) => Array.from(g.querySelectorAll('path, rect, circle')).concat(g.matches && g.matches('path') ? [g] : []);
  const prep = (g) => drawables(g).forEach((p) => { const L = len(p); p.dataset.L = L; if (!p.getAttribute('stroke-dasharray')) { p.style.strokeDasharray = L; p.style.strokeDashoffset = L; } });
  ['sun', 'panel', 'inv', 'house'].forEach((id) => prep(part(id)));
  const draw = (id, t, d) => drawables(part(id)).forEach((p, i) => p.dataset.L && !part(id).matches('path') && tl.to(p, { strokeDashoffset: 0, duration: d, ease: 'power2.inOut' }, t + i * 0.06));

  // windows that light
  const wins = [[1500, 600], [1690, 600]].map(([x, y]) => el('div', 'abs', cam, { left: x + 'px', top: y + 'px', width: '60px', height: '60px', borderRadius: '6px', border: `5px solid ${INK}`, background: '#f2e9d8' }));
  const glow = el('div', 'abs', cam, { left: '1420px', top: '440px', width: '400px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,181,71,.55), transparent 65%)', opacity: 0 });

  const tag = (x, y, txt, color) => { const d = el('div', 'abs', cam, { left: x + 'px', top: y + 'px', padding: '12px 20px', borderRadius: '999px', background: '#fff', border: `3px solid ${color}`, font: '800 30px/1 Inter', color, letterSpacing: '-.01em', whiteSpace: 'nowrap', boxShadow: '0 10px 24px rgba(22,50,92,.12)' }); d.textContent = txt; return d; };
  const tDC = tag(650, 560, 'DC', '#ff7a1a');
  const tAC = tag(1235, 520, 'AC', '#1d6fd6');
  const lab = (x, y, txt) => { const d = el('div', 'abs', cam, { left: x + 'px', top: y + 'px', width: '360px', marginLeft: '-180px', textAlign: 'center', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: '#4c5f7d' }); d.textContent = txt; return d; };
  const lP = lab(395, 900, 'SOLAR PANEL'), lI = lab(975, 770, 'INVERTER'), lH = lab(1620, 860, 'YOUR HOME');

  const head = el('div', 'abs', stage, { left: '700px', top: '120px', font: '800 84px/1 Inter Display, Inter', letterSpacing: '-.04em', color: INK, whiteSpace: 'nowrap' });
  const hw = ctx.split(head, 'From panel to power point', 'word');
  hw[3].style.color = '#ff7a1a'; hw[4].style.color = '#ff7a1a';
  const sub = el('div', 'abs', stage, { left: '704px', top: '226px', font: '600 30px/1.3 Inter', color: '#4c5f7d' });
  sub.textContent = 'Direct current in. Alternating current out.';

  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });
  const dc = part('dc'), ac = part('ac'); const acL = len(ac);
  ac.style.strokeDasharray = acL; ac.style.strokeDashoffset = acL;
  gsap.set(dc, { opacity: 0 });
  const flow = { on: 0 };
  ctx.onFrame((t) => { dc.style.strokeDashoffset = String(-t * 160); });

  gsap.set(wins, { opacity: 0 });
  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.06, x: 60 }, { scale: 1, x: 0, duration: ctx.dur, ease: 'power1.out' }, 0);
  draw('sun', 0.05, 0.7);
  tl.to(part('sun'), { rotation: 20, transformOrigin: '300px 250px', duration: ctx.dur, ease: 'none' }, 0);
  draw('panel', panels - 0.5, 0.9);
  tl.from(lP, { opacity: 0, y: 10, duration: 0.4 }, panels);
  tl.from(hw, { y: 40, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'back.out(1.6)' }, 0.2);
  tl.from(sub, { opacity: 0, duration: 0.5 }, 0.8);

  // direct current flows
  tl.to(dc, { opacity: 1, duration: 0.3 }, direct - 0.2);
  tl.fromTo(dc, { attr: { d: 'M620 640 L620 640' } }, { attr: { d: 'M620 640 L840 640' }, duration: 0.6, ease: 'power2.out', immediateRender: false }, direct - 0.2);
  tl.from(tDC, { scale: 0.4, opacity: 0, duration: 0.5, ease: 'back.out(2.4)' }, direct + 0.1);

  // inverter
  draw('inv', inverter - 0.4, 0.7);
  tl.from(lI, { opacity: 0, y: 10, duration: 0.4 }, inverter);
  // alternating current: wave draws on
  tl.to(ac, { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' }, alt - 0.3);
  tl.from(tAC, { scale: 0.4, opacity: 0, duration: 0.5, ease: 'back.out(2.4)' }, alt + 0.2);

  // home
  draw('house', alt + 0.1, 0.8);
  tl.to(wins, { opacity: 1, duration: 0.3, stagger: 0.1 }, alt + 0.6);
  tl.from(lH, { opacity: 0, y: 10, duration: 0.4 }, alt + 0.5);
  tl.to(wins, { background: '#ffc861', boxShadow: '0 0 40px rgba(255,181,71,.9)', duration: 0.3, stagger: 0.12 }, home - 0.1);
  tl.to(glow, { opacity: 1, duration: 0.6 }, home - 0.05);
  tl.to(cam, { scale: 1.04, x: -40, duration: ctx.dur - home + 0.2, ease: 'power2.inOut' }, home - 0.2);
});

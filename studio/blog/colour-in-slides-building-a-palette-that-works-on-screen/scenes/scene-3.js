/* Scene 4 — "Colours that look fine on your monitor can wash out on a projector. Aim for 4.5 to 1
 * contrast for body text, and label your chart series directly."
 * Storyboard: split stage. Left, on paper, a crisp monitor shows a small slide. Right, in a dark room,
 * a projector beam throws the same slide onto a screen. On "wash out" the projected text fades to a
 * ghostly grey. On "4.5 to 1" a huge coral "4.5:1" slams in at 160px over the darkened screen. On
 * "contrast" the text snaps back to legible ink and the ratio lifts above the screen. A small caption
 * keeps "3:1 for large text". On "label your chart series directly" the monitor shows a line chart:
 * its legend box drops away and names appear at each line's end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const fine = W(0, 'fine'), wash = W(0, 'wash'), proj = W(0, 'projector.');
  const r45 = W(1, '4.5'), contrast = W(1, 'contrast'), andT = W(1, 'and'), label = W(1, 'label'), series = W(1, 'series');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'linear-gradient(90deg, var(--paper) 0%, var(--paper) 50%, var(--night) 50%, var(--night) 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  // soft light layers
  el('div', 'abs', cam, { left: 0, top: 0, width: '960px', height: '1080px', background: 'radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,.7), transparent 70%)' });
  el('div', 'abs', cam, { left: '960px', top: 0, width: '960px', height: '1080px', background: 'radial-gradient(55% 45% at 50% 45%, rgba(59,130,196,.12), transparent 70%)' });

  /* slide content builder */
  const fillSlide = (parent, pad) => {
    const box = el('div', 'abs', parent, { inset: 0, padding: pad + 'px', boxSizing: 'border-box' });
    const t = el('div', '', box, { font: '800 52px/1.05 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)', marginBottom: '28px' });
    t.textContent = 'Q3 Review';
    const bar = el('div', '', box, { width: '70px', height: '6px', borderRadius: '3px', background: 'var(--accent)', marginBottom: '30px' });
    const lines = ['Revenue up in every region', 'Churn held below target', 'Hiring plan on track'].map((s) => {
      const d = el('div', '', box, { font: '500 30px/1.5 Inter', letterSpacing: '-.01em', color: 'var(--ink)' });
      d.textContent = s; return d;
    });
    return { box, t, bar, lines };
  };

  /* ---------- left: monitor ---------- */
  const mon = el('div', 'abs', cam, { left: '170px', top: '300px', width: '640px', height: '420px', borderRadius: '22px', background: 'var(--ink)', boxShadow: '0 50px 90px rgba(15,20,32,.28), 0 10px 24px rgba(15,20,32,.18)' });
  const monScr = el('div', 'abs', mon, { left: '18px', top: '18px', right: '18px', bottom: '18px', borderRadius: '8px', background: '#fff', overflow: 'hidden' });
  const monSlide = fillSlide(monScr, 46);
  el('div', 'abs', cam, { left: '455px', top: '720px', width: '70px', height: '60px', background: 'linear-gradient(180deg,#2a3246,#1C2333)' });
  el('div', 'abs', cam, { left: '370px', top: '778px', width: '240px', height: '16px', borderRadius: '8px', background: 'var(--ink)', boxShadow: '0 20px 30px rgba(15,20,32,.2)' });
  const monLab = el('div', 'abs', cam, { left: '170px', top: '850px', width: '640px', textAlign: 'center', font: MONO, letterSpacing: '.16em', color: 'var(--grey-mid)' });
  monLab.textContent = 'YOUR MONITOR';

  /* chart on the monitor (appears later) */
  const chart = el('div', 'abs', monScr, { inset: 0, background: '#fff', opacity: 0 });
  const SER = [
    ['North', 'var(--accent)', '#FF5A36', [[30, 300], [130, 250], [230, 262], [330, 170], [440, 110]]],
    ['South', 'var(--support)', '#3B82C4', [[30, 262], [130, 240], [230, 202], [330, 216], [440, 190]]],
    ['East', 'var(--grey-mid)', '#7A8091', [[30, 334], [130, 322], [230, 302], [330, 292], [440, 270]]],
  ];
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '604'); svg.setAttribute('height', '384');
  svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
  chart.appendChild(svg);
  [110, 190, 270, 350].forEach((y) => {
    const g = document.createElementNS(svgNS, 'line');
    g.setAttribute('x1', 30); g.setAttribute('x2', 440); g.setAttribute('y1', y); g.setAttribute('y2', y);
    g.setAttribute('stroke', '#E6E4DF'); g.setAttribute('stroke-width', 2); svg.appendChild(g);
  });
  const paths = SER.map(([, , hex, pts]) => {
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', 'M' + pts.map((q) => q.join(' ')).join(' L '));
    p.setAttribute('fill', 'none'); p.setAttribute('stroke', hex); p.setAttribute('stroke-width', 6);
    p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('stroke-dasharray', '700'); p.setAttribute('stroke-dashoffset', '700');
    svg.appendChild(p); return p;
  });
  const dots = SER.map(([, , hex, pts]) => {
    const [x, y] = pts[pts.length - 1];
    return el('div', 'abs', chart, { left: x - 8 + 'px', top: y - 8 + 'px', width: '16px', height: '16px', borderRadius: '50%', background: hex, transform: 'scale(0)' });
  });
  const legend = el('div', 'abs', chart, { left: '400px', top: '20px', padding: '14px 18px', border: '2px solid #D9D7D1', borderRadius: '8px', background: '#fff', transformOrigin: '100% 0%' });
  SER.forEach(([n, c]) => {
    const r = el('div', '', legend, { display: 'flex', alignItems: 'center', gap: '10px', font: '500 20px/1.6 Inter', color: 'var(--grey-mid)' });
    el('span', '', r, { width: '16px', height: '16px', borderRadius: '3px', background: c, display: 'inline-block' });
    el('span', '', r).textContent = n;
  });
  const names = SER.map(([n, c, , pts]) => {
    const [x, y] = pts[pts.length - 1];
    const d = el('div', 'abs', chart, { left: x + 20 + 'px', top: y - 15 + 'px', font: '800 28px/1 Inter Display, Inter', letterSpacing: '-.02em', color: c, opacity: 0 });
    d.textContent = n; return d;
  });

  /* ---------- right: projector ---------- */
  const beam = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  beam.innerHTML = `<svg width="1920" height="1080"><defs><linearGradient id="bm" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity=".05"/></linearGradient></defs>
    <polygon points="1600,845 1080,710 1080,310 1760,310 1760,710" fill="url(#bm)"/></svg>`;
  const scr = el('div', 'abs', cam, { left: '1080px', top: '310px', width: '680px', height: '400px', borderRadius: '6px', background: '#F4F2EC', overflow: 'hidden', boxShadow: '0 0 80px rgba(255,255,255,.12), 0 30px 60px rgba(0,0,0,.5)' });
  const scrSlide = fillSlide(scr, 50);
  const device = el('div', 'abs', cam, { left: '1540px', top: '830px', width: '150px', height: '58px', borderRadius: '12px', background: 'linear-gradient(180deg,#3a4256,#1C2333)', boxShadow: '0 20px 40px rgba(0,0,0,.5)' });
  el('div', 'abs', device, { left: '40px', top: '10px', width: '38px', height: '38px', borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #cfe1f4 35%, #3B82C4 70%, #1C2333 100%)', boxShadow: '0 0 30px rgba(255,255,255,.6)' });
  const projLab = el('div', 'abs', cam, { left: '1080px', top: '850px', font: MONO, letterSpacing: '.16em', color: 'var(--grey-mid)' });
  projLab.textContent = 'THE PROJECTOR';
  const caption = el('div', 'abs', cam, { left: '1080px', top: '900px', font: MONO, fontSize: '22px', letterSpacing: '.12em', color: 'var(--grey-light)' });
  caption.innerHTML = '<span style="color:#FF5A36">3:1</span> · LARGE TEXT &amp; GRAPHICS';

  const ratio = el('div', 'abs', cam, { left: '1080px', top: '118px', width: '680px', textAlign: 'center', font: '900 160px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'var(--accent)', textShadow: '0 0 60px rgba(255,90,54,.55)', transformOrigin: '50% 50%' });
  ratio.textContent = '4.5:1';
  const burst = el('div', 'abs', cam, { left: '1300px', top: '400px', width: '240px', height: '240px', borderRadius: '50%', border: '6px solid var(--accent)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.4 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---------- timeline ---------- */
  const scrText = [scrSlide.t, ...scrSlide.lines];
  gsap.set(scr, { filter: 'contrast(1) brightness(1)' });
  gsap.set([ratio, caption], { opacity: 0 });

  tl.from(mon, { y: 40, opacity: 0, duration: 0.7 }, 0.05);
  tl.from([scr, beam], { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.1);
  tl.from(device, { y: 30, opacity: 0, duration: 0.6 }, 0.15);
  tl.from([monLab, projLab], { opacity: 0, y: 10, duration: 0.5, stagger: 0.1 }, 0.3);
  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);

  // "fine": the monitor reads crisp
  tl.fromTo(mon, { boxShadow: '0 50px 90px rgba(15,20,32,.28), 0 0 0 0 rgba(59,130,196,0)' },
    { boxShadow: '0 50px 90px rgba(15,20,32,.28), 0 0 0 10px rgba(59,130,196,.35)', duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, fine);

  // "wash out": projected text fades to a ghost
  tl.to(beam, { opacity: 1.0, duration: 0.6 }, wash);
  tl.to(scr, { filter: 'contrast(0.55) brightness(1.12)', backgroundColor: '#FAF9F6', duration: 0.9, ease: 'power2.inOut' }, wash);
  tl.to(scrText, { color: '#D8D5CE', duration: 0.9, ease: 'power2.inOut', stagger: 0.05 }, wash);
  tl.to(scrSlide.bar, { opacity: 0.35, duration: 0.9 }, wash);
  tl.to(beam, { opacity: 0.7, duration: 0.8 }, proj);

  // "4.5 to 1": darken and slam
  tl.to(scr, { filter: 'contrast(0.55) brightness(0.5)', duration: 0.4, ease: 'power2.out' }, r45 - 0.3);
  tl.fromTo(ratio, { y: 310, scale: 2.4, opacity: 0 }, { y: 310, scale: 1, opacity: 1, duration: 0.36, ease: 'power4.in', immediateRender: false }, r45 - 0.3);
  tl.to(scr, { x: 8, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, r45 + 0.06);
  tl.fromTo(burst, { scale: 0.4, opacity: 1 }, { scale: 2.3, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, r45 + 0.06);

  // "contrast": snap back to legible ink, ratio lifts above the screen
  tl.to(scr, { filter: 'contrast(1) brightness(1)', backgroundColor: '#FFFFFF', duration: 0.3, ease: 'expo.out' }, contrast);
  tl.to(scrText, { color: '#1C2333', duration: 0.25, ease: 'expo.out' }, contrast);
  tl.to(scrSlide.bar, { opacity: 1, duration: 0.25 }, contrast);
  tl.to(ratio, { y: 0, duration: 0.7, ease: 'expo.inOut' }, contrast - 0.1);
  tl.to(caption, { opacity: 1, duration: 0.6, ease: 'power2.out' }, contrast + 0.5);
  tl.from(caption, { x: -20, duration: 0.6 }, contrast + 0.5);

  // "and label your chart series directly"
  tl.to(chart, { opacity: 1, duration: 0.35, ease: 'power2.out' }, andT - 0.35);
  paths.forEach((p, i) => tl.to(p, { attr: { 'stroke-dashoffset': 0 }, duration: 0.6, ease: 'power2.inOut' }, andT - 0.35 + i * 0.08));
  tl.to(legend, { scale: 0, opacity: 0, duration: 0.35, ease: 'back.in(1.6)' }, label);
  tl.to(dots, { scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.08 }, series - 0.15);
  names.forEach((n, i) => tl.fromTo(n, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.45, ease: 'back.out(1.7)', immediateRender: false }, series + i * 0.12));
  tl.to(ratio, { textShadow: '0 0 90px rgba(255,90,54,.8)', duration: 0.5, yoyo: true, repeat: 1 }, series + 0.5);
});

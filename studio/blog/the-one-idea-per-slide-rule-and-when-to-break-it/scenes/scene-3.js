/* Scene 3 — "It's a default, not a law. Break it for comparisons, summaries, reference slides and process
 *            diagrams, where seeing several things together is the whole point."
 * Storyboard: light paper scene; four line-art slide thumbnails pop in on the word that names each. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const lawT = ctx.at(0, 'law'), tc = ctx.at(1, 'comparisons'), ts = ctx.at(1, 'summaries'), tr = ctx.at(1, 'reference'), tp = ctx.at(1, 'process');
  stage.style.background = 'linear-gradient(160deg, #f9f8ff 0%, #ebe7ff 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  el('div', 'abs', cam, { right: '-200px', top: '-240px', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(143,117,255,.35), rgba(143,117,255,0) 65%)' });

  const eyebrow = el('div', 'abs', stage, { left: '100px', top: '100px', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.24em', color: '#6d4aff' });
  eyebrow.textContent = 'WHEN TO BREAK THE RULE';
  const title = el('div', 'abs', stage, { left: '96px', top: '150px', font: '900 128px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#0e1330', whiteSpace: 'nowrap' });
  const tw = ctx.split(title, 'A default, not a law.', 'word');
  tw[4].style.color = '#ff6b4a';

  const W = 400, H = 225, GAP = 40, X0 = 100, Y = 450;
  const specs = [['Comparisons', tc], ['Summaries', ts], ['Reference', tr], ['Process', tp]];
  const thumbs = specs.map(([name, t], i) => {
    const x = X0 + i * (W + GAP);
    const c = el('div', 'abs', cam, { left: x + 'px', top: Y + 'px', width: W + 'px', height: H + 'px', borderRadius: '20px', background: '#fff', boxShadow: '0 30px 70px rgba(60,40,160,.22), 0 0 0 1px rgba(109,74,255,.12)' });
    const lab = el('div', 'abs', cam, { left: x + 'px', top: Y + H + 36 + 'px', width: W + 'px', font: '800 40px/1 Inter Display, Inter', letterSpacing: '-.02em', color: '#0e1330' });
    lab.textContent = name;
    const ul = el('div', 'abs', cam, { left: x + 'px', top: Y + H + 92 + 'px', width: W + 'px', height: '6px', borderRadius: '3px', background: '#ff6b4a', transformOrigin: '0 50%' });
    return { c, lab, ul, t, x };
  });
  const rect = (p, l, t, w, h, col, r) => el('div', 'abs', p, { left: l + 'px', top: t + 'px', width: w + 'px', height: h + 'px', borderRadius: (r == null ? 6 : r) + 'px', background: col });
  const kids = [[], [], [], []];
  // comparisons: two columns
  [0, 1].forEach((k) => { kids[0].push(rect(thumbs[0].c, 28 + k * 180, 30, 164, 24, k ? '#ff6b4a' : '#6d4aff')); for (let r = 0; r < 4; r++) kids[0].push(rect(thumbs[0].c, 28 + k * 180, 76 + r * 34, 120 + (r % 2) * 30, 14, '#e3e0f7')); });
  kids[0].push(rect(thumbs[0].c, 198, 30, 4, 170, '#cfc8f5', 2));
  // summaries: three recap lines
  for (let r = 0; r < 3; r++) { kids[1].push(rect(thumbs[1].c, 30, 44 + r * 56, 30, 30, ['#6d4aff', '#8f75ff', '#ff6b4a'][r], 15)); kids[1].push(rect(thumbs[1].c, 82, 52 + r * 56, 240 - r * 30, 16, '#e3e0f7')); }
  // reference: table grid
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) kids[2].push(rect(thumbs[2].c, 28 + c * 88, 28 + r * 44, 78, 34, r === 0 ? '#6d4aff' : (c === 0 ? '#cfc8f5' : '#efecfb'), 8));
  // process: five steps
  for (let k = 0; k < 5; k++) { kids[3].push(rect(thumbs[3].c, 26 + k * 74, 82, 52, 52, k === 4 ? '#ff6b4a' : '#6d4aff', 26)); if (k < 4) kids[3].push(rect(thumbs[3].c, 80 + k * 74, 105, 20, 5, '#cfc8f5', 3)); }

  ctx.fx.vignette({ strength: 0.12 }); ctx.fx.grain({ opacity: 0.04, blend: 'multiply' });

  /* timeline */
  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(eyebrow, { opacity: 0, y: 12, duration: 0.5 }, 0.2);
  gsap.set(tw, { filter: 'blur(0px)' });
  tl.from(tw, { opacity: 0, y: 50, filter: 'blur(12px)', duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)' }, 0.5);
  thumbs.forEach((o, i) => {
    const s = o.t - 0.45;
    tl.from(o.c, { opacity: 0, y: 70, scale: 0.88, rotate: i % 2 ? 2 : -2, duration: 0.7, ease: 'back.out(1.7)' }, s);
    tl.from(kids[i], { scale: 0, opacity: 0, duration: 0.4, stagger: 0.025, ease: 'back.out(2)', transformOrigin: '50% 50%' }, s + 0.2);
    tl.from(o.lab, { opacity: 0, x: -16, duration: 0.45 }, s + 0.3);
    tl.from(o.ul, { scaleX: 0, duration: 0.55, ease: 'power3.inOut' }, s + 0.45);
  });
  tl.to(thumbs.map((o) => o.c), { y: -10, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: 0.1 }, tp + 0.9);
});

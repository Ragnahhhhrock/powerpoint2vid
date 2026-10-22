/* Scene 1 — "Most slide videos are just slides, with a voice reading out the bullet points.
 *            By slide three, your audience has tuned out."
 * Storyboard: the usual slide video, shown honestly: a player with the plain slide, a monotone
 * waveform, bullets highlighted as they're read. An attention graph beside it sags. On "slide three"
 * the counter ticks 1-2-3; on "tuned out" the line bottoms out in coral and the player goes dim. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const b1 = ctx.beat(1), voiceT = ctx.at(0, 'voice'), reading = ctx.at(0, 'reading'), bullets = ctx.at(0, 'bullet');
  const three = ctx.at(1, 'three'), tuned = ctx.at(1, 'tuned'), end0 = ctx.beats[0].end;

  stage.style.background = 'radial-gradient(80% 70% at 40% 40%, #161a3a 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });

  const label = el('div', 'abs', cam, { left: '110px', top: '120px', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--muted)' });
  label.textContent = 'THE USUAL SLIDE VIDEO';

  /* player */
  const player = el('div', 'abs', cam, { left: '110px', top: '180px', width: '1180px', height: '724px', borderRadius: '18px', overflow: 'hidden', background: '#000', boxShadow: '0 40px 100px rgba(0,0,0,.55)' });
  const screen = el('div', 'abs', player, { left: 0, top: 0, width: '1180px', height: '664px', background: '#fff' });
  const imgs = [2, 3, 4].map((n, k) => { const im = el('img', 'abs', screen, { inset: 0, width: '100%', height: '100%', opacity: k ? 0 : 1 }); im.src = ctx.asset(`slide-${n}.png`); return im; });
  // highlighter bars over the three bullets of slide 2 (coordinates in the 1280x720 render, scaled to 1180)
  const k = 1180 / 1280;
  const hl = [[96, 186, 820], [96, 246, 560], [96, 306, 470]].map(([x, y, w]) =>
    el('div', 'abs', screen, { left: x * k + 'px', top: y * k + 'px', width: w * k + 'px', height: 46 * k + 'px', background: 'rgba(255,214,0,.6)', mixBlendMode: 'multiply', transformOrigin: '0 50%', transform: 'scaleX(0)' }));
  const counter = el('div', 'abs', screen, { right: '22px', top: '20px', padding: '8px 14px', borderRadius: '8px', background: 'rgba(0,0,0,.6)', color: '#fff', font: '600 22px/1 Inter' });
  counter.textContent = 'Slide 1 / 24';

  const bar = el('div', 'abs', player, { left: 0, right: 0, bottom: 0, height: '60px', background: '#14161f', display: 'flex', alignItems: 'center', gap: '18px', padding: '0 22px' });
  bar.innerHTML = '<svg width="22" height="24" viewBox="0 0 22 24"><path d="M2 2l18 10-18 10z" fill="#fff"/></svg>';
  const time = el('div', '', bar, { color: '#cfd2e0', font: '500 20px/1 ui-monospace, Menlo, monospace', width: '150px' });
  const wave = el('canvas', '', bar, { width: '300px', height: '40px' }); wave.width = 300; wave.height = 40;
  const track = el('div', '', bar, { flex: 1, height: '6px', borderRadius: '3px', background: '#2b2f40', position: 'relative', overflow: 'hidden' });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '1%', background: '#e04a3a' });
  const dim = el('div', 'abs', player, { inset: 0, background: '#000', opacity: 0 });

  /* attention panel */
  const panel = el('div', 'abs', cam, { left: '1340px', top: '180px', width: '470px', height: '724px', borderRadius: '18px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', padding: '36px' });
  const ptitle = el('div', '', panel, { font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--muted)' });
  ptitle.textContent = 'AUDIENCE ATTENTION';
  const big = el('div', '', panel, { font: '800 76px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff', marginTop: '28px' });
  big.textContent = 'Watching';
  const graph = el('div', 'abs', panel, { left: '36px', bottom: '40px', width: '398px', height: '420px' });
  graph.innerHTML = `<svg width="398" height="420" viewBox="0 0 398 420">
    <defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#8f75ff"/><stop offset=".55" stop-color="#ff9a5c"/><stop offset="1" stop-color="#ff4a3a"/></linearGradient>
    <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b4a" stop-opacity=".25"/><stop offset="1" stop-color="#ff6b4a" stop-opacity="0"/></linearGradient></defs>
    <g stroke="rgba(255,255,255,.08)">${[0, 1, 2, 3, 4].map((i) => `<line x1="0" x2="398" y1="${20 + i * 95}" y2="${20 + i * 95}"/>`).join('')}</g>
    <path id="area" d="M0 40 C 80 40, 120 46, 170 70 S 260 200, 300 300 S 360 392, 398 400 L398 420 L0 420Z" fill="url(#fill)"/>
    <path id="line" d="M0 40 C 80 40, 120 46, 170 70 S 260 200, 300 300 S 360 392, 398 400" fill="none" stroke="url(#lg)" stroke-width="7" stroke-linecap="round"/>
    <circle id="dot" r="11" fill="#fff"/></svg>`;
  const line = graph.querySelector('#line'), area = graph.querySelector('#area'), dot = graph.querySelector('#dot');
  const L = line.getTotalLength();
  const xs = ['Slide 1', 'Slide 2', 'Slide 3'];
  xs.forEach((x, i) => { const t = el('div', 'abs', graph, { left: [0, 160, 290][i] + 'px', bottom: '-34px', font: '500 18px/1 Inter', color: 'rgba(255,255,255,.4)' }); t.textContent = x; });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* procedural: clock, monotone waveform, attention line follows a driven progress value */
  const state = { p: 0.02, att: 0, wave: 0 };
  const wg = wave.getContext('2d');
  ctx.onFrame((t) => {
    const s = Math.floor(9 + t * 1.3); time.textContent = `0:${String(s).padStart(2, '0')} / 14:58`;
    prog.style.width = (state.p * 100).toFixed(2) + '%';
    wg.clearRect(0, 0, 300, 40); wg.fillStyle = 'rgba(207,210,224,.8)';
    for (let i = 0; i < 50; i++) { const h = state.wave * (5 + 4 * Math.abs(Math.sin(i * 1.7 + t * 9)) ); wg.fillRect(i * 6, 20 - h / 2, 3, Math.max(1, h)); }
    const len = L * state.att; line.style.strokeDasharray = `${len} ${L}`;
    const pt = line.getPointAtLength(Math.max(0.01, len)); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
    area.style.clipPath = `inset(0 ${(398 - pt.x).toFixed(1)}px 0 0)`;
  });

  /* ---- timeline ---- */
  tl.from(cam, { scale: 1.06, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(player, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.05);
  tl.from(panel, { x: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.25);
  tl.from(label, { opacity: 0, duration: 0.5 }, 0.3);
  tl.to(state, { p: 0.06, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(state, { wave: 1, duration: 0.3 }, voiceT);
  tl.to(state, { att: 0.42, duration: three - 0.4, ease: 'none' }, 0.4);
  // bullets highlighted as they're "read"
  const span = Math.max(1.2, end0 - reading);
  hl.forEach((h, i) => tl.to(h, { scaleX: 1, duration: span / 3 - 0.1, ease: 'none' }, reading + (i * span) / 3));
  // "By slide three": hard cuts 1 -> 2 -> 3
  const c2 = b1 + 0.15, c3 = three - 0.05;
  tl.set(hl, { opacity: 0 }, c2);
  tl.set(imgs[1], { opacity: 1 }, c2);
  tl.set(imgs[2], { opacity: 1 }, c3);
  ctx.onFrame((t) => { counter.textContent = `Slide ${t >= c3 ? 3 : t >= c2 ? 2 : 1} / 24`; const o = t >= tuned + 0.1; big.textContent = o ? 'Tuned out.' : 'Watching'; big.style.color = o ? '#ff6b4a' : '#fff'; });
  tl.fromTo(counter, { scale: 1.25 }, { scale: 1, duration: 0.3, immediateRender: false }, c2);
  tl.fromTo(counter, { scale: 1.25 }, { scale: 1, duration: 0.3, immediateRender: false }, c3);
  // attention collapses into "tuned out"
  tl.to(state, { att: 1, duration: tuned - three + 0.3, ease: 'power2.in' }, three);
  tl.fromTo(big, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, tuned + 0.1);
  tl.to(dim, { opacity: 0.55, duration: 0.8 }, tuned);
  gsap.set(screen, { filter: 'grayscale(0) blur(0px)' });
  tl.to(screen, { filter: 'grayscale(1) blur(2px)', duration: 0.8 }, tuned);
  tl.to(state, { wave: 0.25, duration: 0.6 }, tuned);
  tl.to(player, { rotation: -1.2, y: 10, duration: 1.2, ease: 'power2.out' }, tuned);
});

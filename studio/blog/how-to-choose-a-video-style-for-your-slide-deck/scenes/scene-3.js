/* Scene 3 — "Three questions narrow it down. Where will people watch? What one word should they feel?
 * And how much text is on your slides? Denser slides need a clean or calm direction."
 * Storyboard: bright paper stage with a funnel drawn in slate lines. On "where will people watch"
 * a phone, a laptop and a big screen drop into the funnel mouth. On "feel" a handwritten word box
 * appears. On "how much text" a dense slide thumbnail falls in. On "Denser" it flags coral, then
 * everything drains down as the funnel narrows, and on "clean" / "calm" two tiles (slate and amber,
 * 110px type) emerge from the spout. A left checklist ticks each question. The camera pushes slowly down the funnel.
 */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (b, w) => ctx.at(b, w);
  const tWhere = A(1, 'Where'), tPeople = A(1, 'people'), tWatch = A(1, 'watch?');
  const tWhat = A(2, 'What'), tWord = A(2, 'word'), tFeel = A(2, 'feel?');
  const tHow = A(3, 'how'), tText = A(3, 'text');
  const tDenser = A(4, 'Denser'), tNeed = A(4, 'need'), tClean = A(4, 'clean'), tCalm = A(4, 'calm');

  const CX = 1180, RIM_Y = 250, NECK_Y = 640, SPOUT_Y = 730;
  const SLATE = '#5B6B8C', INK = '#1B2133';

  stage.style.background = 'radial-gradient(60% 65% at 62% 38%, #fffdf9 0%, var(--paper) 70%, #ebe6dd 100%)';

  /* ---- fixed left column: title + checklist ---- */
  const title = el('div', 'abs', stage, { left: '120px', top: '230px', width: '540px', font: '800 62px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  title.innerHTML = 'Three questions<br>narrow it down.';
  const rule = el('div', 'abs', stage, { left: '122px', top: '392px', width: '90px', height: '5px', borderRadius: '3px', background: 'var(--amber)', transformOrigin: '0 50%' });
  const rows = ['01  WHERE WATCHED', '02  ONE FEELING', '03  TEXT DENSITY'].map((txt, i) => {
    const row = el('div', 'abs', stage, { left: '122px', top: 450 + i * 64 + 'px', display: 'flex', alignItems: 'center', gap: '18px' });
    const dot = el('div', '', row, { width: '22px', height: '22px', borderRadius: '50%', border: '3px solid ' + SLATE, boxSizing: 'border-box', background: 'transparent' });
    const lab = el('div', '', row, { font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: SLATE });
    lab.textContent = txt;
    return { row, dot, lab };
  });

  /* ---- camera layer ---- */
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: CX + 'px 700px' });
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  svgWrap.innerHTML = `<svg width="1920" height="1080" style="overflow:visible">
    <defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SLATE}" stop-opacity=".10"/><stop offset="1" stop-color="${SLATE}" stop-opacity=".02"/></linearGradient></defs>
    <path id="ffill" fill="url(#fg)" stroke="none"/>
    <ellipse id="frim" cx="${CX}" cy="${RIM_Y}" ry="46" fill="none" stroke="${SLATE}" stroke-width="5" pathLength="1" stroke-dasharray="1 1"/>
    <path id="fwl" fill="none" stroke="${SLATE}" stroke-width="5" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/>
    <path id="fwr" fill="none" stroke="${SLATE}" stroke-width="5" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/>
    <ellipse id="fsp" cx="${CX}" cy="${SPOUT_Y}" ry="10" fill="none" stroke="${SLATE}" stroke-width="5" pathLength="1" stroke-dasharray="1 1"/>
  </svg>`;
  const q = (id) => svgWrap.querySelector('#' + id);
  const fill = q('ffill'), rim = q('frim'), wl = q('fwl'), wr = q('fwr'), sp = q('fsp');
  const F = { r: 400, n: 80 };
  const drawFunnel = () => {
    const r = F.r, n = F.n;
    const L = `M ${CX - r} ${RIM_Y} Q ${CX - n - 30} ${NECK_Y - 60} ${CX - n} ${NECK_Y} L ${CX - n} ${SPOUT_Y}`;
    const R = `M ${CX + r} ${RIM_Y} Q ${CX + n + 30} ${NECK_Y - 60} ${CX + n} ${NECK_Y} L ${CX + n} ${SPOUT_Y}`;
    wl.setAttribute('d', L); wr.setAttribute('d', R);
    fill.setAttribute('d', `M ${CX - r} ${RIM_Y} Q ${CX - n - 30} ${NECK_Y - 60} ${CX - n} ${NECK_Y} L ${CX - n} ${SPOUT_Y} L ${CX + n} ${SPOUT_Y} L ${CX + n} ${NECK_Y} Q ${CX + n + 30} ${NECK_Y - 60} ${CX + r} ${RIM_Y} Z`);
    rim.setAttribute('rx', r); sp.setAttribute('rx', n);
  };
  drawFunnel();
  const strokes = [rim, wl, wr, sp];
  gsap.set(strokes, { strokeDashoffset: 1 });
  gsap.set(fill, { opacity: 0 });

  /* ---- device icons ---- */
  const icon = (w, h, cxp, svg) => {
    const d = el('div', 'abs', cam, { left: cxp - w / 2 + 'px', top: 285 - h + 'px', width: w + 'px', height: h + 'px', filter: 'drop-shadow(0 14px 18px rgba(27,33,51,.18))' });
    d.innerHTML = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${svg}</svg>`;
    return { d, x: cxp, y: 285 - h / 2 };
  };
  const phone = icon(80, 140, 1000, `<rect x="4" y="4" width="72" height="132" rx="14" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="28" y="12" width="24" height="5" rx="2.5" fill="${INK}"/><rect x="14" y="26" width="52" height="88" rx="4" fill="#2BB3A3" opacity=".25"/>`);
  const laptop = icon(200, 120, 1180, `<rect x="26" y="4" width="148" height="96" rx="8" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="38" y="16" width="124" height="72" rx="3" fill="#E8A33D" opacity=".28"/><path d="M6 104 H194 L184 116 H16 Z" fill="${INK}"/>`);
  const tv = icon(230, 170, 1385, `<rect x="4" y="4" width="222" height="132" rx="8" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="16" y="16" width="198" height="108" rx="3" fill="#F0604D" opacity=".22"/><path d="M100 138 L90 162 M130 138 L140 162" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><rect x="70" y="160" width="90" height="6" rx="3" fill="${INK}"/>`);
  const icons = [phone, laptop, tv];

  /* ---- handwritten word box ---- */
  const wbox = el('div', 'abs', cam, { left: CX - 135 + 'px', top: '305px', width: '270px', height: '110px', borderRadius: '12px', border: '4px dashed var(--amber)', background: 'rgba(255,253,249,.92)', boxShadow: '0 18px 40px rgba(27,33,51,.12)', transform: 'rotate(-3deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' });
  const word = el('div', '', wbox, { font: '700 64px/1 "Segoe Print", "Bradley Hand", "Comic Sans MS", cursive', color: INK, letterSpacing: '-.01em' });
  word.textContent = 'calm';
  gsap.set(word, { clipPath: 'inset(-20px 100% -20px -10px)' });

  /* ---- dense slide thumbnail ---- */
  const thumb = el('div', 'abs', cam, { left: CX - 120 + 'px', top: '432px', width: '240px', height: '135px', borderRadius: '6px', background: '#fff', boxShadow: '0 18px 36px rgba(27,33,51,.2)', outline: '0px solid var(--coral)', overflow: 'hidden' });
  el('div', 'abs', thumb, { left: '14px', top: '12px', width: '130px', height: '12px', borderRadius: '3px', background: INK });
  const rr = ctx.rand(7);
  for (let i = 0; i < 9; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    el('div', 'abs', thumb, { left: 14 + col * 110 + 'px', top: 34 + row * 20 + 'px', width: 60 + rr() * 40 + 'px', height: '7px', borderRadius: '3px', background: 'rgba(91,107,140,.55)' });
  }
  for (let i = 0; i < 4; i++) el('div', 'abs', thumb, { left: '14px', top: 118 - i * 0 + 'px', width: 200 - i * 30 + 'px', height: '5px', borderRadius: '2px', background: 'rgba(91,107,140,.25)', display: i ? 'none' : 'block' });

  /* ---- drop + result tiles ---- */
  const drop = el('div', 'abs', cam, { left: CX - 14 + 'px', top: NECK_Y - 14 + 'px', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 30px rgba(232,163,61,.9)', opacity: 0 });
  const tile = (x, bg, color, txt, glow) => {
    const t = el('div', 'abs', cam, { left: x + 'px', top: '790px', width: '420px', height: '180px', borderRadius: '24px', background: bg, boxShadow: `0 30px 60px ${glow}, inset 0 1px 0 rgba(255,255,255,.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center' });
    const s = el('div', '', t, { font: '900 110px/1 Inter Display, Inter', letterSpacing: '-.045em', color });
    s.textContent = txt;
    return t;
  };
  const tClean_ = tile(750, 'linear-gradient(160deg, #6d7da0, var(--slate))', '#fff', 'Clean', 'rgba(91,107,140,.35)');
  const tCalm_ = tile(1190, 'linear-gradient(160deg, #f0b75c, var(--amber))', INK, 'Calm', 'rgba(232,163,61,.45)');

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });
  ctx.onFrame(drawFunnel);

  /* ---- timeline ---- */
  // camera: slow push down the funnel
  tl.to(cam, { scale: 1.1, y: -30, duration: ctx.dur, ease: 'sine.inOut' }, 0);

  tl.from(title, { y: 40, opacity: 0, duration: 0.8 }, 0.05);
  tl.from(rule, { scaleX: 0, duration: 0.6, ease: 'expo.out' }, 0.35);
  tl.from(rows.map((r) => r.row), { x: -30, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.5);
  tl.to(fill, { opacity: 1, duration: 1 }, 0.3);
  tl.to(strokes, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.12 }, 0.15);
  // "narrow": the funnel breathes in once
  tl.to(F, { n: 64, duration: 0.4, ease: 'power2.inOut', yoyo: true, repeat: 1 }, A(0, 'narrow'));

  const tick = (i, t) => {
    tl.to(rows[i].dot, { background: '#2BB3A3', borderColor: '#2BB3A3', duration: 0.25 }, t);
    tl.fromTo(rows[i].dot, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, t);
    tl.to(rows[i].lab, { color: INK, duration: 0.3 }, t);
  };
  tick(0, tWhere); tick(1, tWhat); tick(2, tHow);

  // devices drop in
  [tWhere, tPeople, tWatch].forEach((t, i) => {
    tl.fromTo(icons[i].d, { y: -520, rotation: [-14, 8, -6][i], opacity: 1 }, { y: 0, rotation: 0, duration: 0.7, ease: 'back.out(1.6)' }, t - 0.2);
  });
  gsap.set(icons.map((i) => i.d), { opacity: 0 });

  // feeling word
  tl.fromTo(wbox, { scale: 0.3, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.6, ease: 'back.out(1.8)' }, tWord - 0.1);
  tl.to(word, { clipPath: 'inset(-20px 0% -20px -10px)', duration: Math.max(0.5, tFeel - tWord), ease: 'power1.inOut' }, tWord + 0.15);
  tl.to(wbox, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tFeel);

  // dense slide falls in
  tl.fromTo(thumb, { y: -760, rotation: 18, opacity: 1 }, { y: 0, rotation: -2, duration: 0.75, ease: 'back.out(1.4)' }, tText - 0.3);
  gsap.set(thumb, { opacity: 0 });
  // "Denser": flag it
  tl.to(thumb, { scale: 1.14, outline: '5px solid #F0604D', boxShadow: '0 0 0 10px rgba(240,96,77,.18), 0 18px 36px rgba(27,33,51,.2)', duration: 0.35, ease: 'back.out(2)' }, tDenser);

  // drain: everything funnels down, funnel narrows
  const drainT = tNeed - 0.35;
  tl.to(F, { r: 330, n: 46, duration: 1.0, ease: 'expo.inOut' }, drainT - 0.2);
  const items = [
    ...icons.map((i) => ({ d: i.d, x: i.x, y: i.y })),
    { d: wbox, x: CX, y: 360 },
    { d: thumb, x: CX, y: 500 },
  ];
  items.forEach((it, i) => {
    tl.to(it.d, { x: CX - it.x, y: NECK_Y - it.y, scale: 0.12, opacity: 0, rotation: 0, duration: 0.6, ease: 'power3.in' }, drainT + i * 0.05);
  });
  tl.fromTo(drop, { opacity: 0, y: -40, scale: 0.5 }, { opacity: 1, y: SPOUT_Y - NECK_Y + 20, scale: 1, duration: 0.35, ease: 'power2.in', immediateRender: false }, drainT + 0.45);
  tl.to(drop, { opacity: 0, scale: 2.5, duration: 0.3 }, drainT + 0.8);
  tl.to([wl, wr, sp], { stroke: '#E8A33D', duration: 0.25, yoyo: true, repeat: 1 }, drainT + 0.6);

  // result tiles emerge from the spout
  tl.fromTo(tClean_, { x: 220, y: -120, scale: 0.1, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }, tClean - 0.15);
  tl.fromTo(tCalm_, { x: -220, y: -120, scale: 0.1, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }, tCalm - 0.15);
  tl.to([tClean_, tCalm_], { y: -6, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: 0.2 }, tCalm + 0.6);
});

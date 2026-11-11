/* Scene 2 — "A voice reads exactly what's written and guesses at the rest. So listen to the whole
 * narration first, and note every word that sounds off."
 * Storyboard: paper stage, ink type. A large headphone icon sits left beside a script card. The line
 * writes itself on "written"; coral "?" marks wobble over the risky words on "guesses". On "listen"
 * the headphones pulse, and a playhead sweeps the line through "whole narration first", underlining
 * each problem word. On "every word that sounds off" four coral tags pop out of the line, one per beat
 * (WHS, names, $1,500, % & / km), and settle into a "Problem words" column on the right. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const written = T(0, 'written', 2.176), guesses = T(0, 'guesses', 2.756);
  const listen = T(1, 'listen', 4.753), whole = T(1, 'whole', 5.275), first = T(1, 'first,', 6.03);
  const note = T(1, 'note', 6.889), every = T(1, 'every', 7.144), off = T(1, 'off.', 8.363);
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 70% at 45% 40%, #fffdf8 0%, var(--paper) 60%, #ebe5d9 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* headline */
  const kicker = el('div', 'abs', cam, { left: '176px', top: '150px', font: MONO, letterSpacing: '.16em', color: 'var(--mist)' });
  kicker.textContent = 'STEP 1 · LISTEN';
  const head = el('div', 'abs', cam, { left: '172px', top: '190px', font: '800 84px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  head.textContent = 'Listen first, then list.';

  /* headphones */
  const HPL = 168, HPC = HPL + 130;
  const hp = el('div', 'abs', cam, { left: HPL + 'px', top: '410px', width: '260px', height: '260px', transformOrigin: '50% 50%' });
  hp.innerHTML = `<svg width="260" height="260" viewBox="0 0 260 260">
    <path d="M50 150 V125 a80 80 0 0 1 160 0 V150" fill="none" stroke="#1A1F2E" stroke-width="16" stroke-linecap="round"/>
    <rect x="34" y="140" width="50" height="86" rx="20" fill="#1A1F2E"/>
    <rect x="176" y="140" width="50" height="86" rx="20" fill="#1A1F2E"/>
    <rect x="46" y="156" width="14" height="54" rx="7" fill="#3D7BFF"/>
    <rect x="200" y="156" width="14" height="54" rx="7" fill="#3D7BFF"/></svg>`;
  const waves = [0, 1, 2].map((i) => el('div', 'abs', cam, { left: HPC - 90 - i * 40 + 'px', top: 540 - 90 - i * 40 + 'px', width: 180 + i * 80 + 'px', height: 180 + i * 80 + 'px', borderRadius: '50%', border: '4px solid var(--signal)', opacity: 0 }));

  /* script card */
  const CL = 470, CT = 440, CW = 930, CH = 180;
  const card = el('div', 'abs', cam, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', background: '#fff', borderRadius: '22px', boxShadow: '0 30px 80px rgba(26,31,46,.14), 0 2px 0 rgba(26,31,46,.05)' });
  const cardLab = el('div', 'abs', card, { left: '44px', top: '30px', font: MONO, fontSize: '17px', letterSpacing: '.16em', color: 'var(--mist)' });
  cardLab.textContent = 'SPEAKER NOTES';
  const line = el('div', 'abs', card, { left: '44px', top: '84px', whiteSpace: 'pre', font: '700 40px/1 Inter', letterSpacing: '-.01em', color: 'var(--ink)' });
  const SEG = [['WHS', 0], [': ', -1], ['Siobhán', 1], [' saved ', -1], ['$1,500', 2], [' ', -1], ['& 20%/km', 3], ['.', -1]];
  const tokens = [];
  SEG.forEach(([txt, k]) => {
    const s = el('span', '', line, { display: 'inline-block', position: 'relative', whiteSpace: 'pre' });
    s.textContent = txt;
    if (k >= 0) tokens[k] = s;
  });
  const under = tokens.map((s) => el('div', 'abs', s, { left: 0, right: 0, bottom: '-12px', height: '6px', borderRadius: '3px', background: 'var(--coral)', transformOrigin: '0% 50%' }));
  const qs = tokens.map((s) => { const q = el('div', 'abs', s, { left: '50%', top: '-46px', width: '34px', marginLeft: '-17px', textAlign: 'center', font: '800 34px/1 Inter', color: 'var(--coral)' }); q.textContent = '?'; return q; });
  const track = el('div', 'abs', card, { left: '44px', right: '44px', bottom: '22px', height: '4px', borderRadius: '2px', background: 'rgba(26,31,46,.08)' });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '2px', background: 'var(--signal)', transformOrigin: '0% 50%' });
  const play = el('div', 'abs', card, { left: '40px', top: '22px', width: '4px', height: '136px', borderRadius: '2px', background: 'var(--signal)', boxShadow: '0 0 18px rgba(61,123,255,.6)' });

  /* problem-words column */
  const COLX = 1470, COLW = 340, ROW0 = 430, ROWH = 104;
  const colTitle = el('div', 'abs', cam, { left: COLX + 'px', top: '360px', font: MONO, letterSpacing: '.16em', color: 'var(--coral)' });
  colTitle.textContent = 'PROBLEM WORDS';
  const rule = el('div', 'abs', cam, { left: COLX + 'px', top: '394px', width: COLW + 'px', height: '2px', background: 'rgba(26,31,46,.12)', transformOrigin: '0% 50%' });
  const LABELS = ['WHS', 'names', '$1,500', '% & / km'];
  const tags = LABELS.map((txt, i) => {
    const t = el('div', 'abs', cam, { left: COLX + 'px', top: ROW0 + i * ROWH + 'px', width: COLW + 'px', height: '80px', borderRadius: '16px', background: 'var(--coral)', boxShadow: '0 16px 40px rgba(255,107,87,.35)', display: 'flex', alignItems: 'center', gap: '18px', padding: '0 26px', boxSizing: 'border-box' });
    const n = el('div', '', t, { font: MONO, fontSize: '18px', color: 'rgba(255,255,255,.7)' }); n.textContent = '0' + (i + 1);
    const w = el('div', '', t, { font: '800 38px/1 Inter Display, Inter', letterSpacing: '-.02em', color: '#fff', whiteSpace: 'nowrap' }); w.textContent = txt;
    return t;
  });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* token geometry (unscaled layout coords) */
  const LW = line.offsetWidth || 820;
  const tokInfo = tokens.map((s, i) => {
    const ox = s.offsetLeft || [0, 120, 400, 560][i], w = s.offsetWidth || 140;
    return { cx: CL + 44 + ox + w / 2, cy: CT + 104, frac: (ox + w / 2) / LW, left: ox };
  });

  /* ---- timeline ---- */
  gsap.set(under, { scaleX: 0 });
  gsap.set(qs, { opacity: 0, scale: 0 });
  gsap.set(line, { clipPath: 'inset(-60px 100% -30px 0px)' });
  gsap.set(prog, { scaleX: 0 });
  gsap.set(play, { opacity: 0 });
  gsap.set([colTitle, rule, ...tags], { opacity: 0 });

  tl.from(head, { y: 24, opacity: 0, duration: 0.5 }, 0.05);
  tl.from(kicker, { opacity: 0, duration: 0.4 }, 0.1);
  tl.from(card, { y: 40, opacity: 0, duration: 0.6 }, 0.15);
  tl.from(hp, { scale: 0.7, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, 0.25);

  tl.to(line, { clipPath: 'inset(-60px 0% -30px 0px)', duration: Math.max(0.6, written + 0.25 - 0.9), ease: 'none' }, 0.9);
  qs.forEach((q, i) => {
    tl.to(q, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, guesses - 0.05 + i * 0.09);
    tl.to(q, { rotation: i % 2 ? 12 : -12, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' }, guesses + 0.4 + i * 0.09);
  });

  tl.to(hp, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, listen);
  waves.forEach((w, i) => tl.fromTo(w, { opacity: 0.7, scale: 0.85 }, { opacity: 0, scale: 1.25, duration: 1.1, ease: 'power2.out', immediateRender: false, repeat: 1 }, listen + i * 0.15));

  const s0 = whole, s1 = Math.max(first + 0.4, s0 + 0.9), sd = s1 - s0;
  tl.to(play, { opacity: 1, duration: 0.2 }, s0 - 0.2);
  tl.to(play, { x: LW + 8, duration: sd, ease: 'none' }, s0);
  tl.to(prog, { scaleX: 1, duration: sd, ease: 'none' }, s0);
  tokInfo.forEach((ti, i) => {
    const t = s0 + sd * (tokens[i].offsetLeft / LW || ti.frac);
    tl.to(under[i], { scaleX: 1, duration: 0.25, ease: 'power2.out' }, t);
    tl.to(qs[i], { opacity: 0, y: -10, duration: 0.25 }, t);
    tl.to(tokens[i], { color: '#FF6B57', duration: 0.2 }, t);
  });
  tl.to(play, { opacity: 0, duration: 0.3 }, s1 + 0.05);

  tl.to(colTitle, { opacity: 1, duration: 0.35 }, note - 0.15);
  tl.fromTo(rule, { scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5, immediateRender: false }, note - 0.1);
  tl.to(cam, { x: -40, duration: 1.6, ease: 'expo.inOut' }, note - 0.4);

  const step = Math.max(0.2, (off - every) / 3.2);
  tags.forEach((tg, i) => {
    const ti = tokInfo[i];
    const dx = ti.cx - (COLX + COLW / 2), dy = ti.cy - (ROW0 + i * ROWH + 40);
    const t = every + i * step;
    tl.fromTo(tg, { x: dx, y: dy, scale: 0.4, opacity: 0, rotation: i % 2 ? 6 : -6 },
      { x: dx, y: dy - 70, scale: 0.8, opacity: 1, rotation: 0, duration: 0.25, ease: 'back.out(2)', immediateRender: false }, t);
    tl.to(tg, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'expo.inOut' }, t + 0.22);
    tl.to(tokens[i], { opacity: 0.45, duration: 0.3 }, t + 0.2);
  });

  tl.fromTo(cam, { scale: 1 }, { scale: 1.035, duration: ctx.dur, ease: 'none', immediateRender: false }, 0);
});

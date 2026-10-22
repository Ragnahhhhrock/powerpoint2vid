/* Scene 1 — "Claude Opus 5.5 reads your whole deck and tightens the story. Your speaker notes become the voiceover."
 * Storyboard: the five real slides fan in a 3D arc; an amber scan line reads across them on "reads".
 * The deck's actual wordy speaker note is typeset below; on "tightens" filler words are struck in ember
 * and fall away while the kept words glide into one tight line. On "voiceover" a waveform grows under
 * that line and a playhead sweeps it, lighting each word as it passes. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const MONO = '"DejaVu Sans Mono", ui-monospace, monospace';
  const reads = ctx.at(0, 'reads'), deck = ctx.at(0, 'deck'), tight = ctx.at(0, 'tightens'), b1 = ctx.beat(1), voice = ctx.at(1, 'voiceover');

  stage.style.background = 'radial-gradient(90% 80% at 50% 40%, #15161c 0%, #0a0a0d 60%, var(--night) 100%)';
  const glowA = el('div', 'abs', stage, { left: '1100px', top: '-300px', width: '1200px', height: '900px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(63,217,198,.13), transparent 70%)' });
  const glowB = el('div', 'abs', stage, { left: '-200px', top: '520px', width: '1400px', height: '800px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,160,70,.14), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 45%' });

  /* ---- top: the deck being read ---- */
  const lab = el('div', 'abs', cam, { left: '160px', top: '86px', font: `500 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--muted)' });
  lab.innerHTML = 'READING&nbsp;&nbsp;·&nbsp;&nbsp;input-deck.pptx&nbsp;&nbsp;·&nbsp;&nbsp;5 SLIDES';
  const chip = el('div', 'abs', cam, { right: '160px', top: '72px', padding: '14px 24px', borderRadius: '999px', border: '2px solid rgba(255,179,64,.7)', font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--amber)', boxShadow: '0 0 40px rgba(255,179,64,.25)', background: 'rgba(255,179,64,.06)' });
  chip.textContent = 'CLAUDE OPUS 5.5';
  const persp = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '420px', perspective: '1400px', perspectiveOrigin: '50% 60%' });
  const row = el('div', 'abs', persp, { inset: 0, transformStyle: 'preserve-3d' });
  const TW = 300, TH = 169;
  const thumbs = [0, 1, 2, 3, 4].map((i) => {
    const k = i - 2;
    const w = el('div', 'abs', row, { left: 960 + k * 336 - TW / 2 + 'px', top: '160px', width: TW + 'px', height: TH + 'px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 24px 50px rgba(0,0,0,.55)', outline: '3px solid rgba(255,179,64,0)', outlineOffset: '4px' });
    const im = el('img', 'abs', w, { inset: 0, width: '100%', height: '100%' }); im.src = ctx.asset(`slide-${i + 1}.png`);
    gsap.set(w, { rotationY: -k * 9, z: -Math.abs(k) * 70, y: Math.abs(k) * 6 });
    return w;
  });
  const scan = el('div', 'abs', cam, { left: '0px', top: '128px', width: '4px', height: '236px', background: '#ffd79a', boxShadow: '0 0 24px 6px rgba(255,179,64,.75), 0 0 80px 20px rgba(255,140,50,.35)', borderRadius: '4px', opacity: 0 });

  /* ---- bottom: the speaker note, as written ---- */
  const nlab = el('div', 'abs', cam, { left: '160px', top: '452px', font: `500 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--muted)' });
  nlab.textContent = 'SPEAKER NOTES  ·  SLIDE 2  ·  AS WRITTEN';
  const note = el('div', 'abs', cam, { left: '160px', top: '512px', width: '1600px', font: '500 42px/1.55 Inter', color: 'rgba(244,238,227,.78)', letterSpacing: '-.01em' });
  const LINES = [
    [['So', 0], ['basically', 0], ['how', 0], ['it', 0], ['works', 0], ['is', 0], ['the', 0], ['tool', 0], ['reads', 1], ['through', 0], ['all', 0], ['of', 0], ['the', 0], ['slides', 0]],
    [['in', 0], ['the', 1], ['deck,', 1], ['and', 0], ['then', 0], ['it', 0], ['goes', 0], ['through', 0], ['and', 0], ['tightens', 1], ['up', 0], ['the', 1], ['story', 1], ['so', 0], ['it', 0], ['flows.', 0]],
  ];
  const words = [];
  LINES.forEach((ln) => {
    const line = el('div', '', note, { whiteSpace: 'nowrap' });
    ln.forEach(([w, keep], j) => {
      const s = el('span', '', line, { display: 'inline-block', position: 'relative', marginRight: '.26em' }); s.textContent = w;
      const strike = keep ? null : el('div', 'abs', s, { left: '-4px', right: '-4px', top: '54%', height: '4px', borderRadius: '2px', background: 'var(--ember)', transformOrigin: '0 50%', boxShadow: '0 0 12px rgba(255,90,44,.6)' });
      words.push({ s, keep, strike });
    });
  });
  // the tightened line (target of the morph)
  const fin = el('div', 'abs', cam, { left: 0, width: '1920px', top: '560px', textAlign: 'center', whiteSpace: 'nowrap', font: '800 84px/1 "Inter Display", Inter', letterSpacing: '-.035em', color: 'var(--paper)' });
  const kept = words.filter((w) => w.keep);
  const dst = kept.map((w, i) => { const s = el('span', '', fin, { display: 'inline-block', marginRight: i < kept.length - 1 ? '.24em' : 0 }); s.textContent = w.s.textContent; return s; });
  const box = (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width }; };
  const pairs = kept.map((w, i) => ({ src: w.s, dst: dst[i], a: box(w.s), b: box(dst[i]) }));
  const ratio = 42 / 84;

  /* ---- voiceover waveform ---- */
  const vlab = el('div', 'abs', cam, { left: 0, width: '1920px', top: '708px', textAlign: 'center', font: `500 22px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--teal)' });
  vlab.textContent = 'SPEAKER NOTES  →  VOICEOVER';
  const WX0 = 300, WX1 = 1620, NB = 110, WY = 860;
  const wave = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const rr = ctx.rand(31);
  const bars = Array.from({ length: NB }, (_, i) => {
    const u = i / (NB - 1);
    const env = Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.04)), 0.6) * (0.55 + 0.45 * Math.abs(Math.sin(u * 17.3 + 1.2)));
    const h = Math.max(8, (0.25 + 0.75 * rr()) * env * 150);
    const x = WX0 + u * (WX1 - WX0);
    const b = el('div', 'abs', wave, { left: x - 4 + 'px', top: WY - h / 2 + 'px', width: '7px', height: h + 'px', borderRadius: '4px', background: 'rgba(244,238,227,.28)', transformOrigin: '50% 50%' });
    return { b, x };
  });
  const head = el('div', 'abs', cam, { left: WX0 + 'px', top: WY - 110 + 'px', width: '3px', height: '220px', background: '#fff3dc', boxShadow: '0 0 20px 4px rgba(255,179,64,.8)', opacity: 0 });
  const ph = { x: -9999 };

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.065 });

  ctx.onFrame(() => {
    head.style.left = ph.x - 1 + 'px';
    for (const { b, x } of bars) b.style.background = x <= ph.x ? 'linear-gradient(180deg, #ffd27a, #ff7a35)' : 'rgba(244,238,227,.28)';
    if (ph.x > WX0) pairs.forEach(({ dst: d, b }) => { d.style.color = Math.abs(b.x - ph.x) < b.w / 2 + 30 ? '#ffb340' : '#f4eee3'; });
  });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.0 }, { scale: 1.035, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(thumbs, { y: '+=60', opacity: 0, rotationX: 30, duration: 0.8, stagger: 0.07, ease: 'back.out(1.5)' }, 0.05);
  tl.from([lab, chip], { opacity: 0, y: -12, duration: 0.6, stagger: 0.1 }, 0.25);
  tl.from(nlab, { opacity: 0, duration: 0.5 }, 0.5);
  tl.from(words.map((w) => w.s), { opacity: 0, y: 18, duration: 0.5, stagger: 0.012 }, 0.55);
  tl.to(row, { rotationY: 4, duration: 4, ease: 'sine.inOut' }, 0);

  // "reads": scan line sweeps the deck, each slide lights as it's read
  const SC0 = reads - 0.1, SCD = Math.max(1.0, deck - reads + 0.5);
  tl.to(scan, { opacity: 1, duration: 0.15 }, SC0);
  tl.fromTo(scan, { x: 230 }, { x: 1690, duration: SCD, ease: 'power1.inOut', immediateRender: false }, SC0);
  tl.to(scan, { opacity: 0, duration: 0.2 }, SC0 + SCD - 0.1);
  thumbs.forEach((w, i) => {
    const t = SC0 + SCD * ((288 + i * 336 - 230) / 1460);
    tl.to(w, { outlineColor: 'rgba(255,179,64,.9)', duration: 0.15 }, t);
    tl.to(w, { outlineColor: 'rgba(255,179,64,.0)', duration: 0.6 }, t + 0.35);
  });
  tl.to(chip, { boxShadow: '0 0 70px rgba(255,179,64,.55)', duration: 0.3, yoyo: true, repeat: 1 }, reads);

  // "tightens": strike the filler, drop it, morph the kept words into one tight line
  const struck = words.filter((w) => !w.keep);
  tl.fromTo(struck.map((w) => w.strike), { scaleX: 0 }, { scaleX: 1, duration: 0.22, stagger: 0.022, ease: 'power2.out' }, tight - 0.55);
  tl.to(struck.map((w) => w.s), { color: 'rgba(244,238,227,.35)', duration: 0.3, stagger: 0.022 }, tight - 0.45);
  tl.to(struck.map((w) => w.s), { y: 46, opacity: 0, rotation: (i) => (i % 2 ? 6 : -5), duration: 0.5, stagger: 0.012, ease: 'power2.in' }, tight + 0.25);
  tl.to(kept.map((w) => w.s), { color: '#ffb340', duration: 0.25 }, tight - 0.2);
  tl.to(nlab, { opacity: 0, duration: 0.3 }, tight + 0.4);
  const M = tight + 0.55;
  pairs.forEach(({ src, dst: d, a, b }, i) => {
    tl.to(src, { x: b.x - a.x, y: b.y - a.y, scale: 1 / ratio, opacity: 0, duration: 0.85, ease: 'expo.inOut' }, M + i * 0.03);
    tl.fromTo(d, { x: a.x - b.x, y: a.y - b.y, scale: ratio, opacity: 0, color: '#ffb340' }, { x: 0, y: 0, scale: 1, opacity: 1, color: '#f4eee3', duration: 0.85, ease: 'expo.inOut', immediateRender: true }, M + i * 0.03);
  });

  // "voiceover": thumbs recede, line lifts, waveform grows, playhead reads it
  tl.to(thumbs, { opacity: 0.3, y: '-=20', duration: 0.8, stagger: 0.04 }, b1 - 0.1);
  tl.to(lab, { opacity: 0.4, duration: 0.6 }, b1);
  tl.to(fin, { y: -40, duration: 0.8, ease: 'expo.inOut' }, b1);
  tl.fromTo(vlab, { opacity: 0, letterSpacing: '.45em' }, { opacity: 1, letterSpacing: '.2em', duration: 0.8, ease: 'expo.out' }, b1 + 0.15);
  tl.fromTo(bars.map((x) => x.b), { scaleY: 0 }, { scaleY: 1, duration: 0.5, stagger: 0.006, ease: 'back.out(2)' }, b1 + 0.3);
  tl.to(head, { opacity: 1, duration: 0.2 }, voice - 0.15);
  tl.fromTo(ph, { x: WX0 }, { x: WX1, duration: ctx.dur - voice - 0.3, ease: 'none', immediateRender: false }, voice - 0.15);
});

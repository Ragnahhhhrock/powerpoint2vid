/* Scene 8 (final) — "Put the explanation in your speaker notes. On Pro, AI rebuilds each chart so the
 * highlight lands on its word. Try Basic first at powerpoint2vid.com, no subscription needed."
 * Storyboard: Night stage. A slide thumbnail is on screen from the first frame. On "speaker notes" a notes
 * panel slides up beneath it, and its lines flow across into a narration waveform. On "rebuilds each chart"
 * the default chart (blue bars, gridlines, legend) collapses and regrows as grey bars. A playhead sweeps the
 * waveform; on "word" it reaches an orange marker and the orange bar pops at the same moment, joined by a
 * drawn connector. On "Try" the stage recedes and the call to action builds: "Try Basic first" in signal
 * orange, then "powerpoint2vid.com" at 110px in paper white, built syllable by syllable as it is spoken,
 * then "no subscription needed" in grey. The call to action holds for the last ~2.5s. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { let v; try { v = ctx.at(i, w); } catch (e) { v = NaN; } return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const T = {
    expl: A(0, 'explanation', 0.92), speaker: A(0, 'speaker', 1.82), notes: A(0, 'notes', 2.19),
    pro: A(1, 'Pro', 3.09), ai: A(1, 'AI', 3.49), rebuild: A(1, 'rebuilds', 3.89), chart: A(1, 'chart', 4.7),
    highlight: A(1, 'highlight', 5.39), word: A(1, 'word', 6.44),
    tryW: A(2, 'Try', 7.53), basic: A(2, 'Basic', 7.88), pp: A(2, 'PowerPoint', 8.82), vid: A(2, 'vid', 9.56),
    to: A(2, 'to', 9.4), dot: A(2, 'dot', 9.78), com: A(2, 'com', 10.02), no: A(2, 'no', 10.65), needed: A(2, 'needed', 11.44),
  };
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 35% 45%, #1A2233 0%, var(--night) 75%)';
  const glowL = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 40% at 80% 48%, rgba(43,179,163,.10), transparent 70%)' });

  const scene = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', scene, { inset: 0, transformOrigin: '360px 300px' });

  /* ---------- slide thumbnail ---------- */
  const CX = 200, CY = 140, CW = 880, CH = 495, BASE = 430;
  const card = el('div', 'abs', cam, { left: CX + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '14px', background: 'var(--paper)', boxShadow: '0 50px 110px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06)', overflow: 'hidden' });
  el('div', 'abs', card, { left: '60px', top: '42px', width: '380px', height: '22px', borderRadius: '11px', background: '#cfd4dc' });
  el('div', 'abs', card, { left: '60px', top: '78px', width: '240px', height: '14px', borderRadius: '7px', background: '#e3e6eb' });
  const grids = [0, 1, 2, 3].map((k) => el('div', 'abs', card, { left: '90px', width: '720px', top: BASE - 80 * (k + 1) + 'px', height: '2px', background: '#d9dde3' }));
  const axis = el('div', 'abs', card, { left: '90px', width: '720px', top: BASE + 'px', height: '3px', background: '#b8bec8' });
  const legend = el('div', 'abs', card, { left: '300px', top: '448px', display: 'flex', gap: '30px', alignItems: 'center' });
  ['#4f7fc4', '#e2894a', '#9aa5b6'].forEach((c) => {
    const g = el('div', '', legend, { display: 'flex', gap: '10px', alignItems: 'center' });
    el('div', '', g, { width: '18px', height: '18px', background: c });
    el('div', '', g, { width: '70px', height: '10px', borderRadius: '5px', background: '#cfd4dc' });
  });
  const OLD = [180, 260, 140, 300, 220, 200], NEW = [300, 260, 220, 200, 180, 140];
  const BX0 = 130, BSTEP = 112, BW = 78;
  const bars = OLD.map((h, i) => el('div', 'abs', card, { left: BX0 + i * BSTEP + 'px', width: BW + 'px', bottom: CH - BASE + 'px', height: h + 'px', transformOrigin: '50% 100%', background: 'linear-gradient(180deg,#6a95d6,#3f6fb5)', boxShadow: 'inset -10px 0 0 rgba(0,0,0,.12)' }));
  const hot = el('div', 'abs', card, { left: BX0 + 'px', width: BW + 'px', bottom: CH - BASE + 'px', height: NEW[0] + 'px', transformOrigin: '50% 100%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg,#ff8466,var(--signal))', boxShadow: '0 0 40px rgba(255,90,60,.55)', opacity: 0 });
  const hotLab = el('div', 'abs', card, { left: BX0 + BW + 16 + 'px', top: BASE - NEW[0] + 4 + 'px', font: `700 20px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--signal)', whiteSpace: 'nowrap', opacity: 0 });
  hotLab.textContent = '← THE POINT';

  const proTag = el('div', 'abs', cam, { left: CX + CW - 250 + 'px', top: CY - 62 + 'px', width: '250px', textAlign: 'right', font: `700 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--signal)', opacity: 0 });
  proTag.textContent = 'PRO · AI REBUILD';
  const slideTag = el('div', 'abs', cam, { left: CX + 'px', top: CY - 62 + 'px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--grey)' });
  slideTag.textContent = 'YOUR SLIDE';

  /* ---------- notes panel ---------- */
  const NY = 668;
  const notes = el('div', 'abs', cam, { left: CX + 'px', top: NY + 'px', width: CW + 'px', height: '230px', borderRadius: '14px', background: 'var(--ink)', boxShadow: '0 30px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.07)' });
  const notesHead = el('div', 'abs', notes, { left: '36px', top: '30px', font: `700 20px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--teal)' });
  notesHead.textContent = 'SPEAKER NOTES';
  const LW = [0.9, 0.74, 0.84, 0.5];
  const lines = LW.map((w, i) => el('div', 'abs', notes, { left: '36px', top: 82 + i * 34 + 'px', width: w * 800 + 'px', height: '12px', borderRadius: '6px', background: 'rgba(221,225,231,.45)', transformOrigin: '0 50%' }));

  /* ---------- waveform ---------- */
  const WX = 1200, WN = 40, WS = 13, WBW = 7, WY = 520, MK = 31;
  const waveTag = el('div', 'abs', cam, { left: WX + 'px', top: '380px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--grey)', opacity: 0 });
  waveTag.textContent = 'NARRATION';
  const r = ctx.rand(8);
  const wbars = Array.from({ length: WN }, (_, i) => ({ d: el('div', 'abs', cam, { left: WX + i * WS + 'px', width: WBW + 'px', top: WY + 'px', height: '4px', borderRadius: '4px', background: 'var(--grey)' }), base: 0.3 + 0.7 * r(), ph: r() * 6.28 }));
  const head = el('div', 'abs', cam, { left: WX + 'px', top: WY - 110 + 'px', width: '3px', height: '220px', background: 'var(--paper)', boxShadow: '0 0 14px rgba(246,244,239,.7)', opacity: 0 });
  const chip = el('div', 'abs', cam, { left: WX + MK * WS - 52 + 'px', top: WY + 128 + 'px', width: '110px', textAlign: 'center', font: `700 20px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--signal)', opacity: 0 });
  chip.textContent = '“WORD”';
  const wave = { amp: 0, p: 0, hit: 0 };

  // connector marker → orange bar
  const mx = WX + MK * WS + WBW / 2, bx = CX + BX0 + BW / 2, by = CY + BASE - NEW[0] - 14;
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', pointerEvents: 'none' });
  svgWrap.innerHTML = `<svg width="1920" height="1080"><path id="cn" d="M${mx} ${WY - 120} Q ${(mx + bx) / 2 + 120} 20, ${bx} ${by}" fill="none" stroke="#FF5A3C" stroke-width="4" stroke-linecap="round"/></svg>`;
  const cn = svgWrap.querySelector('#cn');
  const cnLen = cn.getTotalLength();
  gsap.set(cn, { strokeDasharray: cnLen, strokeDashoffset: cnLen, opacity: 0.9 });

  // flowing note-line pills
  const pills = Array.from({ length: 8 }, (_, i) => {
    const sx = CX + 36, sy = NY + 82 + (i % 4) * 34;
    const p = el('div', 'abs', cam, { left: sx + 'px', top: sy + 'px', width: LW[i % 4] * 300 + 'px', height: '12px', borderRadius: '6px', background: 'var(--teal)', boxShadow: '0 0 18px rgba(43,179,163,.6)', opacity: 0, transformOrigin: '0 50%' });
    return { p, dx: WX + 40 + (i * 57) % 440 - sx, dy: WY - sy };
  });

  ctx.onFrame((t) => {
    const px = wave.p * (WN - 1);
    wbars.forEach((b, i) => {
      const isMk = i === MK;
      let h = 4 + wave.amp * b.base * 150 * (0.55 + 0.45 * Math.sin(t * 5.5 + b.ph + i * 0.4));
      if (isMk) h = h * (1 - wave.hit) + 190 * wave.hit;
      b.d.style.height = h.toFixed(1) + 'px';
      b.d.style.top = (WY - h / 2).toFixed(1) + 'px';
      if (isMk && wave.hit > 0.01) { b.d.style.background = 'var(--signal)'; b.d.style.boxShadow = `0 0 ${30 * wave.hit}px rgba(255,90,60,.8)`; }
      else b.d.style.background = (wave.p > 0 && i <= px) ? 'var(--mist)' : 'rgba(163,169,179,.55)';
    });
    head.style.left = (WX + px * WS + WBW / 2 - 1.5).toFixed(1) + 'px';
  });

  /* ---------- CTA ---------- */
  const cta = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });
  const ctaGlow = el('div', 'abs', cta, { inset: 0, background: 'radial-gradient(38% 30% at 50% 50%, rgba(255,90,60,.12), transparent 70%)', opacity: 0 });
  const tryEl = el('div', 'abs', cta, { left: 0, width: '1920px', top: '360px', textAlign: 'center', font: '700 54px/1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--signal)' });
  const tryWords = ctx.split(tryEl, 'Try Basic first', 'word');
  const url = el('div', 'abs', cta, { left: 0, width: '1920px', top: '450px', textAlign: 'center', font: '800 110px/1.1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', whiteSpace: 'nowrap', textShadow: '0 0 60px rgba(246,244,239,.18)' });
  const uch = ctx.split(url, 'powerpoint2vid.com', 'char');
  const under = el('div', 'abs', cta, { left: '560px', width: '800px', top: '590px', height: '5px', borderRadius: '3px', background: 'var(--signal)', transformOrigin: '0 50%', boxShadow: '0 0 20px rgba(255,90,60,.6)' });
  const sub = el('div', 'abs', cta, { left: 0, width: '1920px', top: '640px', textAlign: 'center', font: '600 40px/1 Inter', letterSpacing: '-.01em', color: 'var(--grey)' });
  const subWords = ctx.split(sub, 'no subscription needed', 'word');

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---------- timeline ---------- */
  gsap.set(notes, { y: 300, opacity: 0 });
  gsap.set(lines, { scaleX: 0 });
  gsap.set([...tryWords, ...uch, ...subWords], { opacity: 0, y: 40 });
  gsap.set(under, { scaleX: 0 });
  gsap.set(scene, { filter: 'blur(0px) brightness(1)' });
  gsap.set(hot, { scaleY: 0.2 });

  tl.from(card, { y: 40, opacity: 0, duration: 0.8 }, 0);
  tl.from(slideTag, { opacity: 0, duration: 0.5 }, 0.25);
  tl.to(cam, { scale: 1.02, duration: T.highlight - 0.2, ease: 'none' }, 0);

  // "speaker notes"
  tl.to(notes, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.3)' }, T.speaker - 0.35);
  tl.to(lines, { scaleX: 1, duration: 0.5, stagger: 0.08 }, T.notes - 0.1);
  tl.to(waveTag, { opacity: 1, duration: 0.5 }, T.notes);
  pills.forEach((o, i) => {
    const s = T.notes + 0.15 + i * 0.1;
    tl.fromTo(o.p, { x: 0, y: 0, opacity: 0, scaleX: 1 }, { opacity: 1, duration: 0.15, immediateRender: false }, s);
    tl.to(o.p, { x: o.dx, y: o.dy, scaleX: 0.15, duration: 0.75, ease: 'power2.inOut' }, s);
    tl.to(o.p, { opacity: 0, duration: 0.2 }, s + 0.6);
  });
  tl.to(wave, { amp: 1, duration: 1.0, ease: 'power2.out' }, T.notes + 0.5);

  // "Pro, AI rebuilds each chart"
  tl.fromTo(proTag, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, T.pro);
  tl.to(head, { opacity: 1, duration: 0.3 }, T.pro);
  tl.to(wave, { p: MK / (WN - 1), duration: T.word - T.pro, ease: 'power1.inOut' }, T.pro);
  tl.to([...grids, legend], { opacity: 0, duration: 0.4 }, T.rebuild - 0.1);
  tl.to(bars, { scaleY: 0, duration: 0.35, stagger: 0.04, ease: 'power2.in' }, T.rebuild);
  bars.forEach((b, i) => tl.set(b, { height: NEW[i], background: '#b7bdc7', boxShadow: 'none', borderRadius: '6px 6px 0 0' }, T.rebuild + 0.62));
  tl.to(bars, { scaleY: 1, duration: 0.7, stagger: 0.09, ease: 'back.out(1.5)' }, T.rebuild + 0.65);

  // "highlight lands on its word"
  tl.to(cam, { scale: 1.07, duration: T.word + 0.9 - T.highlight, ease: 'expo.inOut' }, T.highlight - 0.2);
  tl.to(hot, { opacity: 1, duration: 0.12 }, T.word - 0.05);
  tl.to(hot, { scaleY: 1, duration: 0.55, ease: 'back.out(2)' }, T.word - 0.05);
  tl.to(wave, { hit: 1, duration: 0.35, ease: 'back.out(2)' }, T.word - 0.05);
  tl.to(head, { opacity: 0, duration: 0.3 }, T.word + 0.1);
  tl.fromTo(chip, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)', immediateRender: false }, T.word);
  tl.to(cn, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, T.word - 0.05);
  tl.fromTo(hotLab, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, immediateRender: false }, T.word + 0.15);
  tl.to(bars.slice(1), { opacity: 0.6, duration: 0.5 }, T.word);

  // "Try Basic first" — stage recedes
  tl.to(scene, { opacity: 0, scale: 0.94, filter: 'blur(10px) brightness(.6)', duration: 0.7, ease: 'power2.in' }, T.tryW - 0.45);
  tl.to(ctaGlow, { opacity: 1, duration: 1.2 }, T.tryW);
  tl.to(tryWords[0], { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, T.tryW);
  tl.to(tryWords[1], { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, T.basic);
  tl.to(tryWords[2], { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, A(2, 'first', 8.3));

  // URL built as spoken
  const grp = [[0, 10, T.pp], [10, 11, T.to], [11, 14, T.vid], [14, 18, T.dot]];
  grp.forEach(([a, b, t]) => tl.to(uch.slice(a, b), { opacity: 1, y: 0, duration: 0.45, stagger: 0.035, ease: 'back.out(1.7)' }, t - 0.08));
  tl.to(under, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, T.com);

  // "no subscription needed"
  tl.to(subWords[0], { opacity: 1, y: 0, duration: 0.45 }, T.no);
  tl.to(subWords[1], { opacity: 1, y: 0, duration: 0.45 }, A(2, 'subscription', 10.84));
  tl.to(subWords[2], { opacity: 1, y: 0, duration: 0.45 }, T.needed);

  // calm push-in through the hold
  tl.fromTo(cta, { scale: 1 }, { scale: 1.035, duration: ctx.dur - T.tryW, ease: 'power1.inOut', immediateRender: false }, T.tryW);
});

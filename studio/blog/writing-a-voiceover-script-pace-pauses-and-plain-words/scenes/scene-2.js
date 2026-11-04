/* Scene 2 — "Full stops and questions create pauses. Use them to set up what you want remembered.
 * So how many finished the study? Just over half."
 * Storyboard: a night stage with a teal waveform across the frame. On "stops" a giant coral period
 * drops onto the line and the wave goes flat. On "questions" a huge question mark rises and the wave
 * lifts in pitch. On "Use them…" a visible PAUSE gap opens in the wave, and on "remembered" the sound
 * after the gap warms to amber. On "So how many finished the study?" the question appears. After
 * "study?" the wave goes flat and the camera stops: complete stillness, with the PAUSE marked. Then
 * "Just over half." lands word by word at 150px in amber, and the camera pushes in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = 1920, LINE = 540, X0 = 120, X1 = 1800, GAPX = 960;
  const stops = ctx.at(0, 'stops'), questions = ctx.at(0, 'questions'), pauses = ctx.at(0, 'pauses');
  const use = ctx.at(1, 'Use'), remembered = ctx.at(1, 'remembered');
  const so = ctx.at(2, 'So'), study = ctx.at(2, 'study?');
  const qEnd = ctx.beats[2].end, just = ctx.at(3, 'Just'), over = ctx.at(3, 'over'), half = ctx.at(3, 'half.');
  const stillAt = qEnd - 0.15;
  const mono = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 50%, #1a2238 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 700px' });
  const glow = el('div', 'abs', cam, { left: '260px', top: '340px', width: '1400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(79,209,197,.16), transparent)' });

  const cv = el('canvas', 'abs', cam, { left: 0, top: 0, width: W + 'px', height: '1080px' });
  cv.width = W; cv.height = 1080;
  const g = cv.getContext('2d');
  const S = { amp: 1, freq: 1, lift: 0, phase: 0, gap: 0, warm: 0 };

  const dot = el('div', 'abs', cam, { left: '545px', top: LINE - 112 + 'px', width: '110px', height: '110px', borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 30%, #ffb3a8, var(--coral) 55%, #c7402f)', boxShadow: '0 0 70px rgba(255,107,90,.6)', transformOrigin: '50% 100%' });
  const dotLab = el('div', 'abs', cam, { left: '450px', width: '300px', top: LINE + 70 + 'px', textAlign: 'center', font: mono, letterSpacing: '.16em', color: 'var(--mist)' });
  dotLab.textContent = 'FULL STOP';

  const qm = el('div', 'abs', cam, { left: '1180px', width: '300px', top: '110px', textAlign: 'center', font: '900 400px/1 Inter Display, Inter',
    letterSpacing: '-.04em', color: 'var(--coral)', textShadow: '0 0 80px rgba(255,107,90,.55)' });
  qm.textContent = '?';
  const qmLab = el('div', 'abs', cam, { left: '1180px', width: '300px', top: LINE + 70 + 'px', textAlign: 'center', font: mono, letterSpacing: '.16em', color: 'var(--mist)' });
  qmLab.textContent = 'QUESTION';

  const pauseLab = el('div', 'abs', cam, { left: GAPX - 200 + 'px', width: '400px', top: LINE - 70 + 'px', textAlign: 'center', font: '700 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.3em', color: 'var(--paper)' });
  pauseLab.textContent = 'PAUSE';
  const brk = el('div', 'abs', cam, { left: GAPX - 170 + 'px', width: '340px', top: LINE - 34 + 'px', height: '16px',
    borderLeft: '3px solid rgba(246,241,231,.6)', borderRight: '3px solid rgba(246,241,231,.6)', borderTop: '3px solid rgba(246,241,231,.6)', transformOrigin: '50% 100%' });

  const qText = el('div', 'abs', cam, { left: '240px', width: '960px', top: '150px', textAlign: 'left', whiteSpace: 'nowrap', font: '700 60px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--paper)' });
  const qWords = ctx.split(qText, 'How many finished the study?', 'word');
  const ans = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '660px', textAlign: 'center', font: '900 150px/1.05 Inter Display, Inter',
    letterSpacing: '-.045em', color: 'var(--amber)', textShadow: '0 0 60px rgba(255,181,71,.45)' });
  const aWords = ctx.split(ans, 'Just over half.', 'word');
  aWords.forEach((w) => (w.style.marginRight = '0.22em'));
  aWords[2].style.marginRight = '0';

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  const smooth = (e0, e1, x) => { const k = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return k * k * (3 - 2 * k); };
  const yAt = (x) => {
    const u = (x - X0) / (X1 - X0);
    const env = Math.pow(Math.sin(Math.PI * u), 0.6);
    const d = Math.abs(x - GAPX), hg = S.gap / 2;
    const gf = S.gap > 1 ? smooth(hg - 30, hg + 30, d) : 1;
    const f = S.freq;
    const wv = 70 * Math.sin(x * 0.011 * f + S.phase) + 28 * Math.sin(x * 0.027 * f - S.phase * 1.7) + 12 * Math.sin(x * 0.061 * f + S.phase * 2.3);
    return LINE - S.lift * u * u * 150 + S.amp * env * gf * wv;
  };
  const stroke = (from, to, color, alpha) => {
    g.globalAlpha = alpha; g.strokeStyle = color; g.shadowColor = color;
    g.beginPath();
    for (let x = from; x <= to; x += 3) { const y = yAt(x); x === from ? g.moveTo(x, y) : g.lineTo(x, y); }
    g.stroke();
  };
  ctx.onFrame(() => {
    g.clearRect(0, 0, W, 1080);
    g.lineWidth = 5; g.lineCap = 'round'; g.lineJoin = 'round'; g.shadowBlur = 24;
    stroke(X0, X1, '#4FD1C5', 1);
    if (S.warm > 0.01) stroke(GAPX, X1, '#FFB547', S.warm);
    g.globalAlpha = 1;
  });

  gsap.set([dot, dotLab, qm, qmLab, pauseLab, brk, ...qWords, ...aWords], { opacity: 0 });
  tl.fromTo(cv, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, 0);

  tl.to(S, { phase: 6.5 * stillAt, duration: stillAt, ease: 'none' }, 0);
  tl.to(S, { phase: 6.5 * stillAt + 0.8, duration: 0.4, ease: 'power2.out' }, stillAt);
  tl.to(S, { phase: 6.5 * stillAt + 0.8 + 5 * (ctx.dur - just), duration: ctx.dur - just, ease: 'none' }, just);
  tl.to(cam, { scale: 1.025, x: -14, duration: stillAt, ease: 'sine.inOut' }, 0);

  tl.set(dot, { opacity: 1 }, stops - 0.4);
  tl.fromTo(dot, { y: -520 }, { y: 0, duration: 0.42, ease: 'power3.in', immediateRender: false }, stops - 0.4);
  tl.to(dot, { scaleY: 0.72, scaleX: 1.22, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.out' }, stops + 0.02);
  tl.to(S, { amp: 0.05, duration: 0.3, ease: 'power2.out' }, stops);
  tl.to(dotLab, { opacity: 1, duration: 0.4 }, stops + 0.1);

  tl.fromTo(qm, { y: 260, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)', immediateRender: false }, questions - 0.05);
  tl.to(S, { amp: 0.85, freq: 1.8, lift: 1, duration: 0.7, ease: 'power2.out' }, questions);
  tl.to(qmLab, { opacity: 1, duration: 0.4 }, questions + 0.2);
  tl.to(S, { lift: 0.4, freq: 1.3, duration: 0.6, ease: 'power2.inOut' }, pauses);

  tl.to(S, { gap: 340, amp: 1, lift: 0, freq: 1, duration: 0.7, ease: 'power3.out' }, use);
  tl.fromTo(brk, { opacity: 0, scaleX: 0.2 }, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'back.out(1.6)', immediateRender: false }, use + 0.15);
  tl.fromTo(pauseLab, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, use + 0.25);
  tl.to(S, { warm: 1, amp: 1.15, duration: 0.6, ease: 'power2.out' }, remembered);
  tl.to(S, { amp: 1, duration: 0.6, ease: 'power2.inOut' }, remembered + 0.6);

  tl.to(dot, { opacity: 0.12, duration: 0.5 }, so - 0.2);
  tl.to([dotLab, qmLab], { opacity: 0, duration: 0.4 }, so - 0.2);
  tl.to(qm, { opacity: 0.18, scale: 0.85, x: 160, duration: 0.6, ease: 'power2.out' }, so - 0.2);
  tl.to([pauseLab, brk], { opacity: 0, duration: 0.3 }, so - 0.2);
  tl.to(S, { gap: 0, warm: 0, duration: 0.5, ease: 'power2.inOut' }, so - 0.2);
  qWords.forEach((w, i) => {
    const tw = ctx.at(2, ['How', 'many', 'finished', 'the', 'study?'][i]);
    tl.fromTo(w, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', immediateRender: false }, tw - 0.05);
  });
  tl.to(qm, { opacity: 0.55, duration: 0.3 }, study);

  tl.to(S, { amp: 0, freq: 1, duration: 0.35, ease: 'power2.out' }, stillAt);
  tl.to([pauseLab, brk], { opacity: 1, duration: 0.2 }, stillAt + 0.05);

  tl.to([pauseLab, brk], { opacity: 0, duration: 0.25 }, just);
  tl.to(S, { amp: 0.9, warm: 1, duration: 0.5, ease: 'power2.out' }, just);
  tl.to(qText, { opacity: 0.5, duration: 0.5 }, just);
  [just, over, half].forEach((tw, i) => {
    tl.fromTo(aWords[i], { opacity: 0, y: 50, scale: 1.25 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.8)', immediateRender: false }, tw - 0.06);
  });
  tl.to(cam, { scale: 1.09, x: -14, y: -30, duration: 1.4, ease: 'expo.out' }, just);
  tl.to(cam, { scale: 1.11, duration: ctx.dur - just - 1.4, ease: 'none' }, just + 1.4);
  tl.to(glow, { background: 'radial-gradient(closest-side, rgba(255,181,71,.18), transparent)', duration: 0.6 }, half);
});

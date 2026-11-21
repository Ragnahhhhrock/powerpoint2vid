/* Scene 1 — "There's no single correct number. Keep each slide up as long as it takes to say it, plus a beat.
 * A title, about four seconds; a three-step process, about forty."
 * Storyboard: hard cut to a warm paper stage, headline "Let the narration decide" top-left at 96px.
 * A readout flickers through numbers on "no single correct number". Then a narration waveform draws left to right in ink,
 * with a playhead and a timeline bar growing beneath it at exactly the same length. On "plus a beat" a small amber gap
 * snaps onto the end. On "four seconds" a short teal bar labelled 4s snaps in. On "forty" a long ink bar labelled 40s
 * stretches across the frame. The bullet list is cut. A slow push-in holds throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const B = ctx.beats;
  const sayStart = B[1].t, plus = ctx.at(1, 'plus'), beatW = ctx.at(1, 'beat');
  const four = ctx.at(2, 'four'), forty = ctx.at(2, 'forty');
  const X0 = 160, WAVE_W = 1240, GAP_W = 150, PXS = 38; // 38px per second for the duration rows
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 35% 30%, #fffdf7 0%, var(--paper) 60%, #ebe5d8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 45%' });
  el('div', 'abs', cam, { left: '900px', top: '-200px', width: '1200px', height: '900px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(242,169,59,.12), transparent)' });

  /* headline */
  const head = el('div', 'abs', cam, { left: X0 + 'px', top: '100px', font: '800 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const words = ctx.split(head, 'Let the narration decide', 'word');

  /* readout (top right of the waveform block) */
  const readout = el('div', 'abs', cam, { left: '1240px', width: '520px', top: '262px', textAlign: 'right', font: `600 24px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });

  /* waveform */
  const R = ctx.rand(7);
  const WY = 400;
  let bars = '';
  for (let x = 0; x < WAVE_W; x += 10) {
    const env = 0.35 + 0.65 * Math.abs(Math.sin(x / 140 + 0.6)) * (0.6 + 0.4 * Math.sin(x / 37));
    const h = Math.max(8, 150 * env * (0.45 + 0.55 * R()));
    bars += `<rect x="${x}" y="${WY - h / 2}" width="5" height="${h}" rx="2.5" fill="#1B2235"/>`;
  }
  const wave = el('div', 'abs', cam, { left: X0 + 'px', top: 0, width: WAVE_W + 'px', height: '1080px' });
  wave.innerHTML = `<svg width="${WAVE_W}" height="1080">${bars}</svg>`;
  gsap.set(wave, { clipPath: `inset(0px ${WAVE_W}px 0px 0px)` });

  /* track + spoken bar + beat gap */
  const TY = 520;
  const track = el('div', 'abs', cam, { left: X0 + 'px', top: TY + 'px', width: WAVE_W + GAP_W + 'px', height: '18px', borderRadius: '9px', background: 'rgba(27,34,53,.07)' });
  const spoken = el('div', 'abs', cam, { left: X0 + 'px', top: TY + 'px', width: WAVE_W + 'px', height: '18px', borderRadius: '9px', background: 'var(--ink)', transformOrigin: '0% 50%', boxShadow: '0 10px 24px rgba(27,34,53,.18)' });
  const gap = el('div', 'abs', cam, { left: X0 + WAVE_W + 6 + 'px', top: TY + 'px', width: GAP_W - 6 + 'px', height: '18px', borderRadius: '9px', background: 'var(--amber)', transformOrigin: '0% 50%', boxShadow: '0 0 30px rgba(242,169,59,.6)' });
  const spokenLab = el('div', 'abs', cam, { left: X0 + 'px', top: TY + 38 + 'px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });
  spokenLab.textContent = 'AS LONG AS IT TAKES TO SAY';
  const gapLab = el('div', 'abs', cam, { left: X0 + WAVE_W + 'px', width: GAP_W + 'px', textAlign: 'center', top: TY + 38 + 'px', font: `700 20px/1 ${MONO}`, letterSpacing: '.14em', color: '#c9821a' });
  gapLab.textContent = '+ BEAT';
  const playhead = el('div', 'abs', cam, { left: X0 + 'px', top: WY - 110 + 'px', width: '3px', height: TY - WY + 140 + 'px', background: 'var(--coral)', borderRadius: '2px', boxShadow: '0 0 14px rgba(239,99,81,.5)' });

  /* duration rows */
  const mkRow = (y, secs, color, label) => {
    const w = secs * PXS;
    const lab = el('div', 'abs', cam, { left: X0 + 'px', top: y - 42 + 'px', font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--ink)', opacity: 0.7 });
    lab.textContent = label;
    const bar = el('div', 'abs', cam, { left: X0 + 'px', top: y + 'px', width: w + 'px', height: '34px', borderRadius: '10px', background: color, transformOrigin: '0% 50%', boxShadow: '0 14px 30px rgba(27,34,53,.18)', overflow: 'hidden' });
    return { lab, bar, w };
  };
  const r4 = mkRow(730, 4, 'var(--teal)', 'TITLE');
  const r40 = mkRow(870, 40, 'var(--ink)', '3-STEP PROCESS');
  for (let i = 1; i < 10; i++) el('div', 'abs', r40.bar, { left: i * 4 * PXS - 1 + 'px', top: 0, width: '2px', height: '100%', background: 'rgba(246,243,236,.25)' });
  const n4 = el('div', 'abs', cam, { left: X0 + r4.w + 28 + 'px', top: 730 - 14 + 'px', font: '900 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#1c9e92', transformOrigin: '0% 60%' });
  n4.textContent = '4s';
  const n40 = el('div', 'abs', cam, { left: X0 + r40.w - 300 + 'px', width: '300px', textAlign: 'right', top: 870 - 84 + 'px', font: '900 72px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' });
  const c40 = { n: 0 };

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06 });

  const flick = [3, 12, 45, 7, 90, 20, 5, 30, 60, 15, 8, 40];
  ctx.onFrame((t) => {
    if (t < B[0].t) readout.textContent = 'HOW LONG?';
    else if (t < sayStart) readout.textContent = 'HOW LONG? ' + String(flick[Math.floor(t * 9) % flick.length]).padStart(2, '0') + 's';
    else readout.textContent = 'SAID + BEAT';
    n40.textContent = Math.round(c40.n) + 's';
  });

  /* ---- timeline ---- */
  gsap.set([spoken, gap, r4.bar, r40.bar], { scaleX: 0 });
  gsap.set([gapLab, spokenLab, r4.lab, r40.lab, n4, n40, playhead], { opacity: 0 });
  tl.from(words, { y: 40, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.05);
  tl.from([track, readout], { opacity: 0, duration: 0.5 }, 0.25);
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);

  // "no single correct number": readout jitters (onFrame); a small nudge on the readout
  tl.fromTo(readout, { color: '#9AA3B8' }, { color: '#EF6351', duration: 0.3, immediateRender: false }, B[0].t);
  tl.to(readout, { color: '#9AA3B8', duration: 0.4 }, sayStart);

  // waveform draws while it's said; the bar grows exactly as long
  const drawDur = Math.max(0.8, plus - sayStart - 0.1);
  tl.to(playhead, { opacity: 1, duration: 0.2 }, sayStart);
  tl.to(wave, { clipPath: 'inset(0px 0px 0px 0px)', duration: drawDur, ease: 'none' }, sayStart);
  tl.to(playhead, { x: WAVE_W, duration: drawDur, ease: 'none' }, sayStart);
  tl.to(spoken, { scaleX: 1, duration: drawDur, ease: 'none' }, sayStart);
  tl.to(spokenLab, { opacity: 1, duration: 0.5 }, sayStart + 0.4);

  // "plus a beat": amber gap snaps on
  tl.to(gap, { scaleX: 1, duration: 0.55, ease: 'back.out(1.8)' }, plus);
  tl.to(playhead, { x: WAVE_W + GAP_W, duration: 0.55, ease: 'back.out(1.4)' }, plus);
  tl.fromTo(gapLab, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, beatW);
  tl.to(playhead, { opacity: 0, duration: 0.4 }, beatW + 0.4);

  // waveform steps back so the rows read
  tl.to(wave, { opacity: 0.45, duration: 0.6 }, B[2].t - 0.1);

  // "a title, about four seconds"
  tl.to(r4.lab, { opacity: 0.7, duration: 0.4 }, B[2].t);
  tl.to(r4.bar, { scaleX: 1, duration: 0.45, ease: 'back.out(2)' }, four - 0.05);
  tl.fromTo(n4, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, four);

  // "a three-step process, about forty"
  tl.to(r40.lab, { opacity: 0.7, duration: 0.4 }, forty - 1.0);
  tl.to(r40.bar, { scaleX: 1, duration: 1.3, ease: 'expo.inOut' }, forty - 0.25);
  tl.to(n40, { opacity: 1, duration: 0.3 }, forty - 0.1);
  tl.to(c40, { n: 40, duration: 1.3, ease: 'expo.inOut' }, forty - 0.25);
  tl.to(r40.bar, { boxShadow: '0 18px 44px rgba(27,34,53,.32)', duration: 0.6 }, forty + 1.05);
});

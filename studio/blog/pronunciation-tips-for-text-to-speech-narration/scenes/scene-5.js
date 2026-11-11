/* Scene 6 — "Once your notes sound right, turn the deck into video. On Pro, a.i. directs it, landing each
 * term as the voice says it. Start at powerpoint2vid.com."
 * Storyboard: night stage, echoing the opening. A paper speaker-notes card gets a mint check on "right",
 * then flies along an arc into a video frame on "turn the deck into video". The frame lights up and glides
 * to centre. A PRO badge pops on "Pro". On "A.I." a smooth waveform wakes beneath the frame, and the
 * caption words light up signal blue exactly as each is spoken. On "Start" the frame lifts away and
 * powerpoint2vid.com lands at 130px in paper, with a mist line beneath:
 * "Try Basic first, no subscription needed". Hold to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  if (window.MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
  const A = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tRight = A(0, 'right', 1.64), tTurn = A(0, 'turn', 2.14), tVideo = A(0, 'video', 3.04);
  const tPro = A(1, 'Pro', 4.35), tAI = A(1, 'A.I.', 4.78), tStart = A(2, 'Start', 8.7);
  const tPP = A(2, 'PowerPoint', 9.23), tCom = A(2, 'com', 10.45);
  const mono = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 50% 45%, #1b2240 0%, var(--night) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });
  el('div', 'abs', cam, { left: '560px', top: '160px', width: '800px', height: '600px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(61,123,255,.18), transparent)', filter: 'blur(20px)' });

  /* ---- video frame ---- */
  const vf = el('div', 'abs', cam, { left: '900px', top: '250px', width: '840px', height: '472px', transformOrigin: '50% 50%' });
  const screen = el('div', 'abs', vf, { inset: 0, borderRadius: '18px', overflow: 'hidden', background: 'var(--ink)', border: '2px solid rgba(255,255,255,.12)', boxShadow: '0 40px 100px rgba(0,0,0,.55)' });
  const lit = el('div', 'abs', screen, { inset: 0, background: 'radial-gradient(80% 70% at 30% 20%, #26315a 0%, #141a2c 75%)', opacity: 0 });
  const head = el('div', 'abs', screen, { left: '56px', top: '56px', font: '800 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  head.textContent = 'Clear narration';
  const sub = el('div', 'abs', screen, { left: '58px', top: '138px', font: '600 18px/1 ' + mono, letterSpacing: '.14em', color: 'var(--mist)' });
  sub.textContent = 'SLIDE 6 · NARRATED';
  const cap = el('div', 'abs', screen, { left: '40px', right: '40px', bottom: '64px', textAlign: 'center', font: '700 38px/1.2 Inter', letterSpacing: '-.02em', color: 'rgba(154,163,181,.55)' });
  const capWords = ['landing', 'each', 'term', 'as', 'the', 'voice', 'says', 'it.'].map((w, i) => {
    const s = el('span', '', cap, { display: 'inline-block', marginRight: i < 7 ? '0.28em' : '0' }); s.textContent = w; return s;
  });
  const track = el('div', 'abs', screen, { left: '40px', right: '40px', bottom: '28px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.1)' });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: 'var(--signal)', transformOrigin: '0 50%' });
  const play = el('div', 'abs', screen, { left: '370px', top: '186px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,.08)', border: '2px solid rgba(255,255,255,.25)' });
  el('div', 'abs', play, { left: '38px', top: '28px', width: 0, height: 0, borderTop: '22px solid transparent', borderBottom: '22px solid transparent', borderLeft: '34px solid rgba(247,244,238,.8)' });
  const pro = el('div', 'abs', vf, { right: '28px', top: '28px', padding: '10px 18px', borderRadius: '10px', background: 'var(--signal)', font: '800 24px/1 Inter', letterSpacing: '.08em', color: '#fff', boxShadow: '0 0 40px rgba(61,123,255,.7)' });
  pro.textContent = 'PRO';
  const flash = el('div', 'abs', vf, { inset: 0, borderRadius: '18px', background: 'rgba(247,244,238,.9)', opacity: 0 });

  /* ---- speaker notes card ---- */
  const card = el('div', 'abs', cam, { left: '180px', top: '330px', width: '560px', height: '380px', borderRadius: '18px', background: 'var(--paper)', boxShadow: '0 40px 90px rgba(0,0,0,.5)', transformOrigin: '50% 50%' });
  const clab = el('div', 'abs', card, { left: '44px', top: '42px', font: '700 20px/1 ' + mono, letterSpacing: '.14em', color: 'var(--coral)' });
  clab.textContent = 'SPEAKER NOTES';
  [0.86, 0.72, 0.8, 0.55, 0.78, 0.4].forEach((w, i) => el('div', 'abs', card, { left: '44px', top: 100 + i * 42 + 'px', width: 472 * w + 'px', height: '14px', borderRadius: '7px', background: 'rgba(26,31,46,.16)' }));
  const check = el('div', 'abs', card, { right: '-22px', top: '-22px', width: '72px', height: '72px', borderRadius: '50%', background: 'var(--mint)', boxShadow: '0 0 40px rgba(63,214,164,.6)' });
  check.innerHTML = '<svg width="72" height="72"><path d="M22 37 L32 47 L51 26" fill="none" stroke="#0E1220" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---- waveform ---- */
  const wave = el('div', 'abs', cam, { left: '410px', top: '740px', width: '1100px', height: '170px' });
  wave.innerHTML = '<svg width="1100" height="170"><path id="w2" fill="none" stroke="rgba(61,123,255,.35)" stroke-width="3"/><path id="w1" fill="none" stroke="#3D7BFF" stroke-width="4" stroke-linecap="round"/></svg>';
  const w1 = wave.querySelector('#w1'), w2 = wave.querySelector('#w2');
  const wlab = el('div', 'abs', cam, { left: '412px', top: '722px', font: '700 18px/1 ' + mono, letterSpacing: '.16em', color: 'var(--signal)' });
  wlab.textContent = 'AI DIRECTING';
  const ws = { a: 0 };
  const wordTimes = [];
  [1, 2].forEach((b) => (ctx.beats[b] && ctx.beats[b].words || []).forEach((w) => wordTimes.push(w.t)));
  ctx.onFrame((t) => {
    let e = 0.15;
    wordTimes.forEach((wt) => { const d = (t - wt - 0.08) / 0.13; e += Math.exp(-d * d) * 0.85; });
    const amp = ws.a * Math.min(1, e);
    let p1 = '', p2 = '';
    for (let i = 0; i <= 140; i++) {
      const x = i / 140 * 1100, u = i / 140, win = Math.sin(Math.PI * u);
      const y = Math.sin(u * 22 + t * 7) * Math.sin(u * 7 - t * 3) * 62 * amp * win * win;
      const y2 = Math.sin(u * 15 - t * 5 + 1) * 40 * amp * win;
      p1 += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (85 + y).toFixed(1);
      p2 += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (85 + y2).toFixed(1);
    }
    w1.setAttribute('d', p1); w2.setAttribute('d', p2);
  });

  /* ---- CTA ---- */
  const url = el('div', 'abs', cam, { left: '80px', right: '80px', top: '470px', textAlign: 'center', font: '800 130px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  chars[10].style.color = 'var(--signal)';
  const uline = el('div', 'abs', cam, { left: '660px', width: '600px', top: '624px', height: '6px', borderRadius: '3px', background: 'var(--signal)', boxShadow: '0 0 30px rgba(61,123,255,.7)', transformOrigin: '50% 50%' });
  const tag = el('div', 'abs', cam, { left: '80px', right: '80px', top: '664px', textAlign: 'center', font: '500 36px/1.2 Inter', color: 'var(--mist)' });
  tag.textContent = 'Try Basic first, no subscription needed';

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set([lit, head, sub, cap, track, pro, check, wave, wlab, uline, tag], { opacity: 0 });
  gsap.set(chars, { opacity: 0 });
  gsap.set(card, { rotation: -5 });
  gsap.set(prog, { scaleX: 0 });
  gsap.set(screen, { filter: 'brightness(.7)' });

  tl.to(cam, { scale: 1.04, duration: tStart, ease: 'none' }, 0);
  tl.from(card, { y: 60, opacity: 0, duration: 0.5 }, 0.0);
  tl.from(vf, { x: 60, opacity: 0, duration: 0.6 }, 0.1);

  // "sound right" -> mint check
  tl.fromTo(check, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, tRight);

  // "turn the deck into video" -> card flies into frame
  tl.to(card, { duration: Math.max(0.7, tVideo - tTurn), ease: 'power2.in', rotation: 8, scale: 0.28,
    motionPath: { path: [{ x: 0, y: 0 }, { x: 430, y: -230 }, { x: 860, y: -34 }], curviness: 1.2 } }, tTurn);
  tl.to(card, { opacity: 0, duration: 0.2 }, tVideo - 0.15);

  // "video" -> frame lights
  tl.fromTo(flash, { opacity: 0 }, { opacity: 0.7, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, tVideo);
  tl.to(screen, { filter: 'brightness(1)', boxShadow: '0 40px 100px rgba(0,0,0,.55), 0 0 80px rgba(61,123,255,.35)', duration: 0.4 }, tVideo);
  tl.to(play, { scale: 0.6, opacity: 0, duration: 0.3, ease: 'power2.in' }, tVideo);
  tl.to(lit, { opacity: 1, duration: 0.4 }, tVideo);
  tl.fromTo(head, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45 }, tVideo + 0.1);
  tl.to(sub, { opacity: 1, duration: 0.4 }, tVideo + 0.25);
  tl.to([cap, track], { opacity: 1, duration: 0.4 }, tVideo + 0.3);
  tl.to(prog, { scaleX: 1, duration: 8.2 - tVideo, ease: 'none' }, tVideo);

  // glide to centre
  tl.to(vf, { x: -360, y: -60, scale: 1.12, duration: 1.0, ease: 'expo.inOut' }, tVideo + 0.45);

  // "Pro"
  tl.fromTo(pro, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, tPro - 0.05);

  // "A.I. directs it" -> waveform wakes
  tl.to(wave, { opacity: 1, duration: 0.4 }, tAI - 0.1);
  tl.to(ws, { a: 1, duration: 0.6, ease: 'power2.out' }, tAI - 0.1);
  tl.fromTo(wlab, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35 }, tAI);

  // caption words light as spoken
  const bw = (ctx.beats[1] && ctx.beats[1].words) || [];
  let li = bw.findIndex((w) => /landing/i.test(w.w));
  capWords.forEach((s, i) => {
    const t = (li >= 0 && bw[li + i]) ? bw[li + i].t : 6.07 + i * 0.26;
    tl.to(s, { color: '#3D7BFF', textShadow: '0 0 24px rgba(61,123,255,.8)', duration: 0.12, ease: 'power2.out' }, t - 0.03);
    tl.fromTo(s, { y: 0 }, { y: -8, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, t - 0.03);
    tl.to(s, { textShadow: '0 0 0px rgba(61,123,255,0)', duration: 0.5 }, t + 0.2);
  });

  // "Start" -> frame lifts, CTA lands
  tl.to(vf, { y: -250, scale: 0.62, duration: 0.9, ease: 'expo.inOut' }, tStart - 0.1);
  tl.to(wave, { y: 60, opacity: 0.35, duration: 0.9, ease: 'expo.inOut' }, tStart - 0.1);
  tl.to(wlab, { opacity: 0, duration: 0.3 }, tStart - 0.1);
  tl.to(cam, { scale: 1, duration: 0.9, ease: 'expo.inOut' }, tStart - 0.1);
  const st = Math.max(0.03, (tCom - tPP) / chars.length);
  tl.fromTo(chars, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.8)', stagger: st }, tPP - 0.05);
  tl.fromTo(uline, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'expo.out' }, tCom);
  tl.fromTo(tag, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, tCom + 0.35);

  // hold: slow push-in to the end
  tl.to(cam, { scale: 1.035, duration: Math.max(0.5, ctx.dur - tStart - 0.8), ease: 'power1.inOut' }, tStart + 0.8);
});

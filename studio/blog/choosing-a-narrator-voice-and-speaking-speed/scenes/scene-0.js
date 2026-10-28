/* Scene 0 — "The voice is the first thing viewers judge in a narrated video. Here's how to choose a
 * narrator voice and speed that let your content do the talking."
 * Storyboard: night stage, silence, one flat line draws across centre. On "voice" it ripples into a
 * wave-blue waveform driven by the real word timings. On "first thing viewers judge" a coral eye-ring
 * circles the wave. "Voice and Speed" rises at 140px beneath it on "choose". On "content do the talking"
 * the camera eases in and the waveform settles into a steady, confident rhythm. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = 1920, H = 1080, CY = 450, X0 = 200, X1 = 1720;
  const tVoice = ctx.at(0, 'voice'), tFirst = ctx.at(0, 'first'), tJudge = ctx.at(0, 'judge');
  const tChoose = ctx.at(1, 'choose'), tContent = ctx.at(1, 'content'), tTalk = ctx.at(1, 'talking');

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #1a2140 0%, var(--night) 70%)';

  const drift = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: '960px 500px' });

  // ambient light that breathes with the voice
  const glow = el('div', 'abs', cam, { left: '360px', top: CY - 300 + 'px', width: '1200px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(91,140,255,.32), rgba(91,140,255,0) 75%)', opacity: 0 });

  // waveform canvas
  const cv = el('canvas', 'abs', cam, { left: 0, top: 0, width: W + 'px', height: H + 'px' });
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d');

  // eye-ring
  const ringWrap = el('div', 'abs', cam, { left: 0, top: 0, width: W + 'px', height: H + 'px' });
  ringWrap.innerHTML = `<svg width="${W}" height="${H}"><ellipse id="eye" cx="960" cy="${CY}" rx="600" ry="200" pathLength="1"
    fill="none" stroke="#FF6B4A" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"
    transform="rotate(-4 960 ${CY})" style="filter:drop-shadow(0 0 14px rgba(255,107,74,.7))"/></svg>`;
  const eye = ringWrap.querySelector('#eye');
  const eyeTag = el('div', 'abs', cam, { left: '1380px', top: CY - 250 + 'px', font: '600 22px/1 ui-monospace, Menlo, monospace',
    letterSpacing: '.16em', color: 'var(--signal)', opacity: 0 });
  eyeTag.textContent = 'JUDGED FIRST';

  // title
  const title = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '650px', textAlign: 'center',
    font: '900 140px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const chars = ctx.split(title, 'Voice and Speed', 'char');
  const sub = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '826px', textAlign: 'center',
    font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.24em', color: 'var(--mist)', opacity: 0 });
  sub.textContent = 'CHOOSING A NARRATOR';

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- waveform state ---- */
  const S = { reveal: 0, amp: 0, steady: 0 };
  const words = ctx.beats.flatMap((b) => (b.words && b.words.length ? b.words.map((w) => w.t) : [b.t]));
  const r = ctx.rand(7);
  const wAmp = words.map(() => 0.55 + 0.45 * r());
  const speech = (t) => {
    let e = 0;
    words.forEach((wt, i) => { const d = (t - wt - 0.08) / 0.14; e = Math.max(e, Math.exp(-d * d) * wAmp[i]); });
    const inBeat = ctx.beats.some((b) => t >= b.t && t <= b.end) ? 0.18 : 0.04;
    return Math.max(e, inBeat);
  };

  ctx.onFrame((t) => {
    g.clearRect(0, 0, W, H);
    const sp = speech(t);
    const steadyE = 0.6 + 0.16 * Math.sin(t * Math.PI * 2 * 0.9);
    const env = S.amp * (sp * (1 - S.steady) + steadyE * S.steady);
    glow.style.opacity = (0.25 + env * 0.75) * Math.min(1, S.reveal * 1.5);
    const xEnd = X0 + (X1 - X0) * S.reveal;
    const layer = (scale, phase, color, width, blur, alpha) => {
      g.beginPath();
      for (let x = X0; x <= xEnd; x += 4) {
        const u = (x - X0) / (X1 - X0);
        const win = Math.pow(Math.sin(Math.PI * u), 1.6);
        const y = CY + 170 * scale * env * win * (
          0.55 * Math.sin(x * 0.019 - t * 7 + phase) +
          0.3 * Math.sin(x * 0.043 + t * 10.5 + phase * 2) +
          0.35 * Math.sin(x * 0.008 - t * 3.2));
        x === X0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.strokeStyle = color; g.lineWidth = width; g.globalAlpha = alpha;
      g.shadowColor = color; g.shadowBlur = blur; g.lineCap = 'round'; g.lineJoin = 'round';
      g.stroke();
    };
    layer(0.62, 1.7, '#3FD1A3', 2, 8, 0.35);
    layer(-0.8, 3.1, '#5B8CFF', 2, 8, 0.4);
    layer(1, 0, '#5B8CFF', 12, 40, 0.35);
    layer(1, 0, '#cfdcff', 4, 14, 1);
    g.globalAlpha = 1; g.shadowBlur = 0;
    // leading dot while drawing the line
    if (S.reveal > 0 && S.reveal < 1) {
      g.beginPath(); g.arc(xEnd, CY, 6, 0, Math.PI * 2); g.fillStyle = '#fff';
      g.shadowColor = '#5B8CFF'; g.shadowBlur = 20; g.fill(); g.shadowBlur = 0;
    }
  });

  /* ---- timeline ---- */
  tl.to(S, { reveal: 1, duration: 0.75, ease: 'power2.inOut' }, 0.05);
  tl.to(S, { amp: 1, duration: 0.6, ease: 'power2.out' }, tVoice - 0.15);

  // camera: slow continuous drift, push in on "content"
  tl.fromTo(drift, { scale: 1, y: 0 }, { scale: 1.025, y: -8, duration: ctx.dur, ease: 'none' }, 0);

  // eye-ring on "first thing viewers judge"
  tl.to(eye, { attr: { 'stroke-dashoffset': 0 }, duration: Math.max(0.6, tJudge - tFirst + 0.2), ease: 'power2.inOut' }, tFirst - 0.1);
  tl.fromTo(eyeTag, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.6)' }, tJudge - 0.1);
  tl.to([ringWrap, eyeTag], { opacity: 0, duration: 0.6, ease: 'power2.in' }, tJudge + 1.0);

  // title on "choose"
  tl.fromTo(chars, { opacity: 0, y: 70, rotationX: -60 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.035, ease: 'back.out(1.6)' }, tChoose - 0.2);
  tl.fromTo(sub, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, tChoose + 0.35);
  tl.to(cam, { y: -40, duration: 1.0, ease: 'power2.inOut' }, tChoose - 0.2);

  // "content do the talking": push in, waveform settles
  tl.to(cam, { scale: 1.07, y: -30, duration: ctx.dur - tContent + 0.2, ease: 'expo.inOut' }, tContent - 0.2);
  tl.to(S, { steady: 1, duration: 1.0, ease: 'power2.inOut' }, tContent);
  tl.to(chars, { color: '#ffffff', textShadow: '0 0 40px rgba(91,140,255,.55)', duration: 0.6, stagger: 0.02 }, tTalk);
});

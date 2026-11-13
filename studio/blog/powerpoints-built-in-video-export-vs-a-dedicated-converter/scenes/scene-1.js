/* Scene 1 — "PowerPoint's own export plays your animations exactly as designed, with your real voice.
 * The catch? Stumble on slide 12, and you re-record slide 12."
 * Storyboard: paper stage, amber accents. A designed slide sits centre stage (small MP4 tag on the file)
 * and plays a fly-in build on "animations… exactly as designed". On "with your real voice" it slides
 * left and a microphone with a live amber waveform rises on the right. On "The catch?" the camera
 * tightens and a strip of slide numbers scrolls in. On "slide 12" the waveform glitches coral, a big
 * 12 stamps over the slide, and a red record dot lights on "re-record". On the second "12" the take
 * restarts in amber as TAKE 2. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tExport = W(0, 'export'), tAnim = W(0, 'animations'), tExactly = W(0, 'exactly'),
    tWith = W(0, 'with'), tReal = W(0, 'real'), tVoice = W(0, 'voice.'),
    tCatch = W(1, 'catch?'), tStumble = W(2, 'Stumble'), tRerec = W(2, 're-record');
  const w2 = (ctx.beats[2] && ctx.beats[2].words) || [];
  const twelves = w2.filter((w) => /^12/.test(w.w)).map((w) => w.t);
  const t12 = twelves[0] != null ? twelves[0] : 8.537;
  const t12b = twelves[1] != null ? twelves[1] : Math.max(t12 + 1.5, tRerec + 0.9);
  const MONO = 'ui-monospace, Menlo, monospace';
  const H = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

  stage.style.background = 'radial-gradient(70% 70% at 55% 45%, #fffdf8 0%, var(--paper) 60%, #ebe5d8 100%)';
  const warmLight = el('div', 'abs', stage, { left: '900px', top: '80px', width: '1100px', height: '900px', background: 'radial-gradient(closest-side, rgba(242,163,58,.14), transparent)' });

  const kicker = el('div', 'abs', stage, { left: '124px', top: '96px', font: `600 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--warm)' });
  kicker.textContent = 'PATH A · BUILT-IN EXPORT';
  const head = el('div', 'abs', stage, { left: '120px', top: '136px', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const h1 = el('span', '', head, { display: 'inline-block' }); h1.textContent = 'Your animations.\u00A0';
  const h2 = el('span', '', head, { display: 'inline-block', color: 'var(--warm)' }); h2.textContent = 'Your real voice.';
  const catchTag = el('div', 'abs', stage, { left: '124px', top: '110px', font: `700 26px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--coral)', display: 'flex', alignItems: 'center', gap: '14px' });
  el('span', '', catchTag, { width: '14px', height: '14px', borderRadius: '50%', background: 'var(--coral)', display: 'inline-block' });
  el('span', '', catchTag).textContent = 'THE CATCH';

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 470px' });

  const CL = 160, CT = 290, CW = 760, CH = 428;
  const card = el('div', 'abs', cam, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '18px', background: '#fff',
    boxShadow: '0 40px 90px rgba(27,34,56,.18), 0 6px 18px rgba(27,34,56,.08)' });
  const inner = el('div', 'abs', card, { inset: 0, borderRadius: '18px', overflow: 'hidden' });
  const acc = el('div', 'abs', inner, { left: '56px', top: '54px', width: '64px', height: '10px', borderRadius: '5px', background: 'var(--warm)' });
  const tb1 = el('div', 'abs', inner, { left: '56px', top: '82px', width: '400px', height: '28px', borderRadius: '8px', background: 'var(--ink)' });
  const tb2 = el('div', 'abs', inner, { left: '56px', top: '124px', width: '270px', height: '16px', borderRadius: '8px', background: 'rgba(27,34,56,.18)' });
  const tileCols = ['linear-gradient(160deg,#f7c06e,#F2A33A)', 'linear-gradient(160deg,#2b3454,#1B2238)', 'linear-gradient(160deg,#e9ecf2,#c9cfdc)'];
  const tiles = tileCols.map((bg, i) => {
    const t = el('div', 'abs', inner, { left: 56 + i * 220 + 'px', top: '180px', width: '196px', height: '170px', borderRadius: '14px', background: bg, boxShadow: '0 12px 26px rgba(27,34,56,.15)' });
    el('div', 'abs', t, { left: '22px', bottom: '24px', width: '90px', height: '10px', borderRadius: '5px', background: i === 2 ? 'rgba(27,34,56,.3)' : 'rgba(255,255,255,.6)' });
    el('div', 'abs', t, { left: '22px', top: '24px', width: '36px', height: '36px', borderRadius: '50%', background: i === 2 ? 'rgba(27,34,56,.25)' : 'rgba(255,255,255,.45)' });
    return t;
  });
  const track = el('div', 'abs', inner, { left: '56px', right: '56px', bottom: '34px', height: '6px', borderRadius: '3px', background: 'rgba(27,34,56,.1)' });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: 'var(--warm)', transformOrigin: '0% 50%' });
  const prog2 = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: 'var(--coral)', transformOrigin: '0% 50%', opacity: 0 });
  const veil = el('div', 'abs', card, { inset: 0, borderRadius: '18px', background: 'rgba(246,243,236,.82)', opacity: 0, zIndex: 1 });
  const stamp = el('div', 'abs', card, { left: 0, width: CW + 'px', top: '92px', textAlign: 'center', opacity: 0, transformOrigin: '50% 50%', zIndex: 2 });
  const big = el('div', '', stamp, { font: '900 150px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'var(--coral)', display: 'inline-block', position: 'relative' });
  big.textContent = '12';
  const dot = el('div', 'abs', big, { right: '-46px', top: '18px', width: '34px', height: '34px', borderRadius: '50%', background: '#e2342a', boxShadow: '0 0 0 rgba(226,52,42,.6)', opacity: 0 });
  const rer = el('div', '', stamp, { font: `700 24px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--ink)', marginTop: '18px', opacity: 0 });
  rer.textContent = 'RE-RECORD';
  const mp4 = el('div', 'abs', card, { right: '-22px', top: '-22px', padding: '12px 18px', borderRadius: '12px', background: 'var(--ink)', color: 'var(--paper)', zIndex: 5,
    font: `700 22px/1 ${MONO}`, letterSpacing: '.12em', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 14px 30px rgba(15,20,36,.3)' });
  el('span', '', mp4, { width: '10px', height: '10px', borderRadius: '50%', background: 'var(--warm)', display: 'inline-block' });
  el('span', '', mp4).textContent = 'MP4';

  const MX = 1420;
  const glowA = el('div', 'abs', cam, { left: MX - 260 + 'px', top: '200px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(242,163,58,.35), transparent)', opacity: 0 });
  const glowC = el('div', 'abs', cam, { left: MX - 260 + 'px', top: '200px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(232,96,76,.4), transparent)', opacity: 0 });
  const mic = el('div', 'abs', cam, { left: MX - 130 + 'px', top: '262px', width: '260px', height: '330px', transformOrigin: '50% 100%' });
  mic.innerHTML = `<svg width="260" height="330" viewBox="0 0 260 330">
    <defs><linearGradient id="mg" x1="0" x2="1"><stop offset="0" stop-color="#2b3454"/><stop offset=".55" stop-color="#1B2238"/><stop offset="1" stop-color="#0F1424"/></linearGradient></defs>
    <rect x="80" y="10" width="100" height="176" rx="50" fill="url(#mg)"/>
    ${[50, 72, 94, 116].map((y) => `<line x1="98" x2="162" y1="${y}" y2="${y}" stroke="rgba(242,163,58,.55)" stroke-width="5" stroke-linecap="round"/>`).join('')}
    <path d="M52 120 v24 a78 78 0 0 0 156 0 v-24" fill="none" stroke="#1B2238" stroke-width="12" stroke-linecap="round"/>
    <line x1="130" y1="222" x2="130" y2="296" stroke="#1B2238" stroke-width="12"/>
    <line x1="78" y1="304" x2="182" y2="304" stroke="#1B2238" stroke-width="14" stroke-linecap="round"/></svg>`;

  const NB = 40, STEP = 14, WCY = 690, WX0 = MX - (NB * STEP) / 2;
  const waveWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', opacity: 0 });
  const wave = el('div', 'abs', waveWrap, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const bars = Array.from({ length: NB }, (_, i) => el('div', 'abs', wave, { left: WX0 + i * STEP + 'px', width: '8px', borderRadius: '4px', top: WCY - 4 + 'px', height: '8px', background: 'var(--warm)' }));
  const wlab = el('div', 'abs', cam, { left: MX - 260 + 'px', width: '520px', top: '784px', textAlign: 'center', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mist)' });

  const win = el('div', 'abs', stage, { left: '160px', top: '888px', width: '1600px', height: '96px', overflow: 'hidden',
    WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' });
  const strip = el('div', 'abs', win, { left: 0, top: '10px', height: '76px', width: '3000px' });
  const nums = Array.from({ length: 20 }, (_, i) => {
    const t = el('div', 'abs', strip, { left: i * 130 + 'px', top: 0, width: '110px', height: '76px', borderRadius: '12px', background: '#fff', border: '2px solid rgba(27,34,56,.12)',
      boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '800 30px/1 Inter', color: 'var(--ink)', letterSpacing: '-.02em' });
    t.textContent = String(i + 1);
    return t;
  });
  const n12 = nums[11];

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.06, blend: 'multiply' });

  const amp = { v: 0 }, gl = { v: 0 };
  const A = [242, 163, 58], C = [232, 96, 76];
  ctx.onFrame((t) => {
    const f = Math.floor(t * 30), g = gl.v;
    const col = `rgb(${A.map((a, k) => Math.round(a + (C[k] - a) * g)).join(',')})`;
    bars.forEach((b, i) => {
      const env = Math.pow(Math.sin(Math.PI * (i + 0.5) / NB), 0.6);
      let h = 8 + 112 * amp.v * env * (0.3 + 0.7 * Math.abs(Math.sin(i * 0.55 + t * 6.3) * Math.sin(i * 0.23 - t * 3.1 + 1)));
      const r = H(i * 13 + f * 7);
      const spike = r > 0.72 ? 20 + 120 * H(i + f) : 5;
      h = h * (1 - g) + spike * g;
      b.style.height = h.toFixed(1) + 'px';
      b.style.top = (WCY - h / 2).toFixed(1) + 'px';
      b.style.background = col;
    });
    wave.style.transform = `translateX(${(g * (H(f * 3.7) - 0.5) * 26).toFixed(1)}px)`;
    wlab.textContent = t < t12b ? 'YOUR VOICE · TAKE 1' : 'YOUR VOICE · TAKE 2';
    wlab.style.color = g > 0.5 ? 'var(--coral)' : 'var(--mist)';
  });

  gsap.set(card, { x: 420, filter: 'brightness(1) blur(0px)' });
  gsap.set([mic, wlab, glowA, catchTag, win, mp4], { opacity: 0 });
  gsap.set(tiles, { opacity: 0, x: -90 });
  gsap.set(prog, { scaleX: 0 }); gsap.set(prog2, { scaleX: 0.55 });

  tl.from(card, { y: 60, opacity: 0, scale: 0.94, duration: 0.8 }, 0.05);
  tl.from([acc, tb1, tb2], { opacity: 0, x: -30, duration: 0.6, stagger: 0.08 }, 0.3);
  tl.from(kicker, { opacity: 0, y: 14, duration: 0.6 }, 0.25);
  tl.from(h1, { opacity: 0, y: 30, duration: 0.7 }, 0.55);
  tl.fromTo(mp4, { opacity: 0, scale: 0.4, rotation: -10 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' }, tExport);
  tl.to(prog, { scaleX: 0.62, duration: t12 - 0.5, ease: 'none' }, 0.5);
  tl.to(cam, { scale: 1.02, duration: tCatch - 0.3, ease: 'power1.inOut' }, 0);

  tl.to(tiles, { opacity: 1, x: 0, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.22 }, tAnim);
  tl.to(tiles, { y: -8, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.22, ease: 'sine.inOut' }, tExactly + 0.1);

  tl.to(card, { x: 0, duration: 1.0, ease: 'expo.inOut' }, tWith - 0.3);
  tl.fromTo(mic, { opacity: 0, y: 70, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)', immediateRender: false }, tReal - 0.15);
  tl.to(waveWrap, { opacity: 1, duration: 0.5 }, tReal);
  tl.to(glowA, { opacity: 1, duration: 0.8 }, tReal);
  tl.from(h2, { opacity: 0, y: 30, duration: 0.7 }, tReal);
  tl.to(amp, { v: 1, duration: 0.6, ease: 'power2.out' }, tVoice);
  tl.to(wlab, { opacity: 1, duration: 0.5 }, tVoice + 0.1);

  tl.to([kicker, head], { opacity: 0, y: -30, duration: 0.5, ease: 'power2.in' }, tCatch - 0.2);
  tl.fromTo(catchTag, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, immediateRender: false }, tCatch + 0.1);
  tl.to(cam, { scale: 1.06, duration: 1.0, ease: 'expo.inOut' }, tCatch - 0.2);
  tl.fromTo(win, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, tCatch + 0.05);
  tl.to(strip, { x: -685, duration: t12 - (tCatch + 0.25), ease: 'power2.inOut' }, tCatch + 0.25);

  tl.to(n12, { backgroundColor: '#E8604C', borderColor: '#E8604C', color: '#fff', scale: 1.12, duration: 0.35, ease: 'back.out(2)' }, t12);
  tl.to(gl, { v: 1, duration: 0.15, ease: 'none' }, t12 - 0.05);
  tl.to(glowA, { opacity: 0, duration: 0.3 }, t12);
  tl.to(glowC, { opacity: 1, duration: 0.3 }, t12);
  tl.to(mic, { x: 6, duration: 0.05, yoyo: true, repeat: 5, ease: 'none' }, t12);
  tl.to(veil, { opacity: 1, duration: 0.3 }, t12 - 0.1);
  tl.fromTo(stamp, { opacity: 0, scale: 1.9, rotation: -6 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.32, ease: 'power4.in', immediateRender: false }, t12 - 0.3);
  tl.to(card, { y: 8, duration: 0.07, yoyo: true, repeat: 1 }, t12 + 0.02);
  tl.to(cam, { scale: 1.08, duration: ctx.dur - t12, ease: 'power1.inOut' }, t12 + 0.2);

  tl.fromTo(dot, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)', immediateRender: false }, tRerec);
  tl.to(rer, { opacity: 1, duration: 0.4 }, tRerec + 0.05);
  tl.to(dot, { boxShadow: '0 0 0 18px rgba(226,52,42,0)', duration: 0.9, repeat: 1, ease: 'power2.out' }, tRerec + 0.2);
  tl.to(prog, { opacity: 0, duration: 0.2 }, tRerec);
  tl.to(prog2, { opacity: 1, duration: 0.2 }, tRerec);

  tl.to(gl, { v: 0, duration: 0.4, ease: 'power2.out' }, t12b);
  tl.to(glowC, { opacity: 0, duration: 0.5 }, t12b);
  tl.to(glowA, { opacity: 1, duration: 0.5 }, t12b);
  tl.to(stamp, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, t12b);
  tl.to(prog2, { scaleX: 0.6, duration: Math.max(0.3, ctx.dur - t12b), ease: 'none' }, t12b);
  tl.to(dot, { opacity: 0.35, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t12b + 0.3);
});

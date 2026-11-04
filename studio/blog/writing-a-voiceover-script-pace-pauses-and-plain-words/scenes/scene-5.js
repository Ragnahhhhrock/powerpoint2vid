/* Scene 5 — "Put your script in the speaker notes. On Pro, AI directs the video and times the animation
 * to your voice. Try it at powerpoint2vid.com."
 * Storyboard: a night stage holds a stylised editor window with a paper slide and a speaker-notes panel.
 * On "speaker notes" lines of script type into the panel in paper white. A PRO badge pops on "Pro"; slide
 * shapes arrive on "directs". On "times the animation" the script lines lift into a teal waveform built
 * from the voice's real word timings. A playhead runs on "your voice" and the shapes pulse on its peaks.
 * On "Try" the window recedes. On "PowerPoint" the URL lands centre-frame at 110px in amber and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (b, w, f) => { const v = ctx.at(b, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const tSpeaker = W(0, 'speaker', 1.5), tPro = W(1, 'Pro,', 2.79), tAI = W(1, 'AI', 3.36), tDirects = W(1, 'directs', 3.71),
    tTimes = W(1, 'times', 4.74), tAnim = W(1, 'animation', 5.23), tVoice = W(1, 'voice.', 6.05),
    tTry = W(2, 'Try', 7.1), tPP = W(2, 'PowerPoint', 7.62), tCom = W(2, 'com.', 8.8);
  const words1 = (ctx.beats[1] && ctx.beats[1].words) ? ctx.beats[1].words.map((w) => w.t) : [2.55, 2.79, 3.36, 3.71, 4.14, 4.24, 4.61, 4.74, 5.11, 5.23, 5.75, 5.88, 6.05];
  const mono = '600 18px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #1d2540 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 62%, rgba(79,209,197,.14), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* ---- editor window ---- */
  const win = el('div', 'abs', cam, { left: '360px', top: '140px', width: '1200px', height: '780px', borderRadius: '22px', background: 'var(--ink)',
    boxShadow: '0 50px 120px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08)', transformOrigin: '50% 50%' });
  ['#FF6B5A', '#FFB547', '#4FD1C5'].forEach((c, i) => el('div', 'abs', win, { left: 26 + i * 24 + 'px', top: '20px', width: '12px', height: '12px', borderRadius: '50%', background: c, opacity: 0.8 }));
  const pro = el('div', 'abs', win, { right: '28px', top: '13px', padding: '6px 14px', borderRadius: '999px', background: 'var(--amber)', color: 'var(--night)', font: '800 18px/1 Inter', letterSpacing: '.08em' });
  pro.textContent = 'PRO';
  const aiTag = el('div', 'abs', win, { right: '118px', top: '18px', font: mono, letterSpacing: '.14em', color: 'var(--waveform)' });
  aiTag.textContent = 'AI · TIMED TO VOICE';

  // the slide
  const slide = el('div', 'abs', win, { left: '40px', top: '60px', width: '1120px', height: '450px', borderRadius: '12px', background: 'var(--paper)', overflow: 'hidden' });
  const sTitle = el('div', 'abs', slide, { left: '60px', top: '56px', width: '420px', height: '26px', borderRadius: '13px', background: 'var(--ink)' });
  const sSub = el('div', 'abs', slide, { left: '60px', top: '100px', width: '260px', height: '16px', borderRadius: '8px', background: 'var(--mist)', opacity: 0.7 });
  const mk = (x, y, w, h, r, bg, origin) => {
    const o = el('div', 'abs', slide, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
    const i = el('div', 'abs', o, { inset: 0, borderRadius: r, background: bg, transformOrigin: origin, boxShadow: '0 16px 30px rgba(28,35,51,.18)' });
    return { o, i };
  };
  const shapes = [
    mk(120, 190, 190, 190, '50%', 'var(--coral)', '50% 50%'),
    mk(440, 210, 170, 170, '22px', 'var(--amber)', '50% 100%'),
    mk(740, 250, 300, 130, '18px', 'var(--waveform)', '0% 50%'),
  ];

  // speaker notes panel
  const notes = el('div', 'abs', win, { left: '40px', top: '535px', width: '1120px', height: '215px', borderRadius: '12px', background: 'rgba(0,0,0,.28)', overflow: 'hidden' });
  const nLab = el('div', 'abs', notes, { left: '28px', top: '22px', font: mono, letterSpacing: '.16em', color: 'var(--mist)' });
  nLab.textContent = 'SPEAKER NOTES';
  const R = ctx.rand(7);
  const lines = [0, 1, 2, 3].map((li) => {
    const line = el('div', 'abs', notes, { left: '28px', top: 64 + li * 36 + 'px', height: '14px', width: '1060px' });
    let x = 0; const maxW = li === 3 ? 560 : 960 + R() * 80; const segs = [];
    while (x < maxW) {
      const w = 40 + R() * 110;
      segs.push(el('div', 'abs', line, { left: x + 'px', top: 0, width: w + 'px', height: '14px', borderRadius: '7px', background: 'var(--paper)', opacity: 0.88 }));
      x += w + 14;
    }
    return { line, segs };
  });

  // waveform (SVG bars) in the notes panel
  const NB = 112, WW = 1060, MID = 118;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '1120'); svg.setAttribute('height', '215');
  Object.assign(svg.style, { position: 'absolute', left: 0, top: 0, filter: 'drop-shadow(0 0 10px rgba(79,209,197,.55))' });
  notes.appendChild(svg);
  const bars = [];
  for (let i = 0; i < NB; i++) {
    const r = document.createElementNS(svgNS, 'rect');
    r.setAttribute('x', 30 + i * (WW / NB)); r.setAttribute('width', 5); r.setAttribute('rx', 2.5); r.setAttribute('fill', '#4FD1C5');
    svg.appendChild(r); bars.push(r);
  }
  const head = el('div', 'abs', notes, { left: '30px', top: '20px', width: '3px', height: '190px', borderRadius: '2px', background: 'var(--amber)', boxShadow: '0 0 16px rgba(255,181,71,.9)', opacity: 0 });

  const T0 = words1[0] - 0.15, T1 = (ctx.beats[1] ? ctx.beats[1].end : 6.59) + 0.1;
  const env = (tau) => {
    let e = 0;
    words1.forEach((w) => { const d = (tau - w - 0.09) / 0.1; e += Math.exp(-d * d); });
    return Math.min(1, e) * (0.75 + 0.25 * Math.sin(tau * 37));
  };
  const S = { mix: 0, head: 0, pulse: 0, lineUp: 0 };

  /* ---- URL ---- */
  const url = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '462px', textAlign: 'center', font: '800 110px/1.1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--amber)',
    textShadow: '0 0 60px rgba(255,181,71,.45)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  const uLine = el('div', 'abs', cam, { left: '660px', width: '600px', top: '612px', height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, transparent, var(--waveform), transparent)', transformOrigin: '50% 50%' });
  const uLab = el('div', 'abs', cam, { left: '0px', width: '1920px', top: '400px', textAlign: 'center', font: mono, fontSize: '22px', letterSpacing: '.3em', color: 'var(--mist)' });
  uLab.textContent = 'TRY IT AT';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    const hx = S.head; // 0..1 playhead
    bars.forEach((b, i) => {
      const f = i / (NB - 1), tau = T0 + (T1 - T0) * f;
      const idle = 3 + 2 * Math.sin(i * 0.9 + t * 3);
      const h = idle + S.mix * (8 + 150 * env(tau));
      b.setAttribute('height', h.toFixed(1)); b.setAttribute('y', (MID - h / 2).toFixed(1));
      b.setAttribute('opacity', (S.mix * (S.head > 0 && f > hx ? 0.35 : 1)).toFixed(2));
    });
    head.style.left = (30 + hx * WW) + 'px';
    const live = S.pulse * env(T0 + (T1 - T0) * hx);
    shapes.forEach((s, k) => {
      const a = live * [0.22, 0.3, 0.2][k];
      s.i.style.transform = k === 2 ? `scaleX(${1 + a})` : k === 1 ? `scaleY(${1 + a * 1.4})` : `scale(${1 + a})`;
    });
  });

  /* ---- timeline ---- */
  gsap.set(win, { filter: 'blur(0px) brightness(1)' });
  tl.from(win, { y: 40, opacity: 0, scale: 0.97, duration: 0.6 }, 0);
  tl.to(cam, { x: -14, y: -8, duration: tTry, ease: 'sine.inOut' }, 0);
  gsap.set([sTitle, sSub], { scaleX: 0, transformOrigin: '0% 50%' });
  tl.to([sTitle, sSub], { scaleX: 1, duration: 0.6, stagger: 0.1 }, 0.4);
  tl.from(nLab, { opacity: 0, x: -10, duration: 0.4 }, 0.6);

  // "speaker notes": script types in
  const allSegs = lines.flatMap((l) => l.segs);
  gsap.set(allSegs, { scaleX: 0, transformOrigin: '0% 50%' });
  tl.to(allSegs, { scaleX: 1, duration: 0.22, stagger: 0.035, ease: 'power2.out' }, tSpeaker - 0.1);

  // "Pro" / "AI directs"
  tl.from(pro, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, tPro - 0.05);
  tl.from(aiTag, { opacity: 0, x: 14, duration: 0.45 }, tAI);
  shapes.forEach((s, k) => tl.from(s.o, { scale: 0, y: 40, opacity: 0, rotation: k === 1 ? -12 : 0, duration: 0.6, ease: 'back.out(1.7)' }, tDirects + k * 0.1));

  // "times the animation": lines lift into waveform
  tl.to(lines.map((l) => l.line), { y: -40, opacity: 0, duration: 0.55, stagger: 0.05, ease: 'power2.in' }, tTimes - 0.1);
  tl.to(S, { mix: 1, duration: 0.7, ease: 'power2.out' }, tTimes + 0.2);
  tl.to(glow, { opacity: 1, duration: 0.8 }, tTimes + 0.2);
  // "your voice": playhead sweeps, shapes pulse on peaks
  tl.to(head, { opacity: 1, duration: 0.2 }, tAnim);
  tl.to(S, { pulse: 1, duration: 0.3 }, tAnim);
  tl.fromTo(S, { head: 0.02 }, { head: 1, duration: tTry - tAnim - 0.1, ease: 'none', immediateRender: false }, tAnim);
  tl.to(cam, { scale: 1.03, duration: 0.9, ease: 'expo.inOut' }, tVoice - 0.4);

  // "Try it at": window recedes
  tl.to(win, { scale: 0.78, y: -30, opacity: 0.16, filter: 'blur(6px) brightness(.6)', duration: 0.8, ease: 'expo.inOut' }, tTry - 0.15);
  tl.to(cam, { scale: 1, x: 0, y: 0, duration: 0.8, ease: 'expo.inOut' }, tTry - 0.15);
  tl.to(glow, { opacity: 0.6, duration: 0.8 }, tTry);
  tl.from(uLab, { opacity: 0, y: 14, duration: 0.5 }, tTry + 0.15);

  // "PowerPoint to vid dot com": URL lands and holds
  tl.from(chars, { y: 70, opacity: 0, duration: 0.55, stagger: 0.04, ease: 'back.out(1.8)' }, tPP - 0.1);
  tl.from(uLine, { scaleX: 0, opacity: 0, duration: 0.8, ease: 'expo.out' }, tCom - 0.1);
  tl.to(url, { textShadow: '0 0 110px rgba(255,181,71,.8)', duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tCom);
  tl.to(cam, { scale: 1.045, duration: Math.max(1, ctx.dur - tCom), ease: 'power1.out' }, tCom);
});

/* Scene 6 — "Write full, short sentences, spell numbers as words, and read it aloud once.
 * On Pro, a.i. directs the video, timing each scene to your words. Try Basic first at powerpoint2vid.com."
 * Storyboard: night stage. Three teal checkmarks tick in on "full", "numbers" and "read". On "directs"
 * the checklist folds into a glowing waveform. It drops into the timeline of an opening video frame, and the
 * deck's six slides snap in as scenes, one on each of "timing / each / scene / to / your / words".
 * The frame then pulls back. A coral "Try Basic first" button pops in, and "powerpoint2vid.com" lands
 * at 120px in paper, holding to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (b, w) => ctx.at(b, w);
  const tFull = A(0, 'full,'), tNum = A(0, 'numbers'), tRead = A(0, 'read');
  const tPro = A(1, 'Pro,'), tDirects = A(1, 'directs'), tVideo = A(1, 'video,');
  const snapWords = ['timing', 'each', 'scene', 'to', 'your', 'words.'].map((w) => A(1, w));
  const tTry = A(2, 'Try'), tBasic = A(2, 'Basic'), tURL = A(2, 'PowerPoint');

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #1b2238 0%, var(--night) 75%)';
  const warm = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(45% 40% at 50% 70%, rgba(255,107,87,.18), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const group = el('div', 'abs', cam, { inset: 0, transformOrigin: '960px 150px' });

  /* ---------- checklist ---------- */
  const label = el('div', 'abs', cam, { left: '520px', top: '230px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--slate)' });
  label.textContent = 'BEFORE YOU CONVERT';
  const ITEMS = ['Full, short sentences', 'Numbers as words', 'Read it aloud once'];
  const rows = ITEMS.map((txt, i) => {
    const row = el('div', 'abs', cam, { left: '520px', top: 300 + i * 140 + 'px', height: '90px', width: '1000px', transformOrigin: '440px ' + (240 - i * 140) + 'px' });
    const circ = el('div', 'abs', row, { left: 0, top: '5px', width: '80px', height: '80px', borderRadius: '50%', border: '3px solid rgba(46,196,182,.4)', boxSizing: 'border-box' });
    circ.innerHTML = '<svg width="74" height="74" viewBox="0 0 80 80" style="position:absolute;left:0;top:0"><path d="M22 42 L36 56 L60 27" fill="none" stroke="#0E1220" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="60" stroke-dashoffset="60"/></svg>';
    const path = circ.querySelector('path');
    const text = el('div', 'abs', row, { left: '120px', top: '6px', font: '800 72px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)', whiteSpace: 'nowrap', opacity: 0.4 });
    text.textContent = txt;
    return { row, circ, path, text };
  });

  /* ---------- video frame + timeline ---------- */
  const proTag = el('div', 'abs', cam, { left: '480px', top: '96px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--teal)', opacity: 0 });
  proTag.textContent = 'PRO · AI-DIRECTED';
  const glow = el('div', 'abs', group, { left: '380px', top: '90px', width: '1160px', height: '660px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(46,196,182,.35), transparent)', opacity: 0 });
  const frame = el('div', 'abs', group, { left: '480px', top: '150px', width: '960px', height: '540px', borderRadius: '16px', overflow: 'hidden', background: 'var(--ink)', boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 2px rgba(46,196,182,.5), 0 0 60px rgba(46,196,182,.3)' });
  const imgs = [1, 2, 3, 4, 5, 6].map((n, i) => {
    const im = el('img', 'abs', frame, { inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === 0 ? 1 : 0 });
    im.src = ctx.asset('slide-' + n + '.png');
    return im;
  });
  const scrim = el('div', 'abs', frame, { inset: 0, background: 'linear-gradient(180deg, transparent 78%, rgba(14,18,32,.15))' });
  gsap.set(frame, { clipPath: 'inset(50% 0% 50% 0% round 16px)', opacity: 0 });

  const segs = [0, 1, 2, 3, 4, 5].map((i) => {
    const s = el('div', 'abs', group, { left: 480 + i * 162 + 'px', top: '722px', width: '150px', height: '66px', borderRadius: '10px', background: 'rgba(46,196,182,.22)', border: '2px solid rgba(46,196,182,.75)', boxSizing: 'border-box', opacity: 0 });
    return s;
  });
  const playhead = el('div', 'abs', group, { left: '480px', top: '706px', width: '4px', height: '98px', borderRadius: '2px', background: 'var(--coral)', boxShadow: '0 0 18px var(--coral)', opacity: 0 });

  /* ---------- waveform motif ---------- */
  const N = 80, R = ctx.rand(6);
  const seeds = Array.from({ length: N }, () => 0.35 + R() * 0.65);
  const waveWrap = el('div', 'abs', group, { left: 0, top: '390px', width: '1920px', height: '300px', transformOrigin: '960px 150px' });
  let bars = '';
  for (let i = 0; i < N; i++) bars += `<rect x="${482 + i * 12}" y="149" width="7" height="2" rx="3.5" fill="#2EC4B6"/>`;
  waveWrap.innerHTML = `<svg width="1920" height="300" style="filter:drop-shadow(0 0 10px rgba(46,196,182,.7))">${bars}</svg>`;
  const rects = [...waveWrap.querySelectorAll('rect')];
  const amp = { v: 0.18 }, ph = { x: 0 };
  gsap.set(waveWrap, { y: 450, scaleX: 1.5, opacity: 0.55 });

  /* ---------- CTA ---------- */
  const url = el('div', 'abs', cam, { left: 0, width: '1920px', top: '560px', textAlign: 'center', font: '800 120px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  chars.slice(14).forEach((c) => (c.style.color = 'var(--teal)'));
  gsap.set(chars, { opacity: 0 });
  const btn = el('div', 'abs', cam, { left: '760px', top: '760px', width: '400px', height: '96px', borderRadius: '48px', background: 'linear-gradient(180deg, #ff8573, var(--coral))', boxShadow: '0 20px 50px rgba(255,107,87,.45), inset 0 1px 0 rgba(255,255,255,.5)', font: '800 38px/96px Inter Display, Inter', letterSpacing: '-.02em', color: '#fff', textAlign: 'center', opacity: 0 });
  btn.textContent = 'Try Basic first';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    for (let i = 0; i < N; i++) {
      const env = Math.sin((i / (N - 1)) * Math.PI) * 0.75 + 0.25;
      const h = 4 + amp.v * 120 * env * seeds[i] * (0.45 + 0.55 * Math.abs(Math.sin(i * 0.55 + t * 5.2) * Math.cos(i * 0.21 - t * 2.3)));
      rects[i].setAttribute('y', 150 - h / 2);
      rects[i].setAttribute('height', h);
    }
    playhead.style.transform = `translateX(${ph.x}px)`;
  });

  /* ---------- timeline ---------- */
  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(label, { opacity: 0, y: 20, duration: 0.5 }, 0.05);
  rows.forEach((r, i) => tl.from(r.row, { opacity: 0, x: -40, duration: 0.6 }, 0.1 + i * 0.1));
  [tFull, tNum, tRead].forEach((t, i) => {
    const r = rows[i];
    tl.to(r.circ, { backgroundColor: '#2EC4B6', borderColor: '#2EC4B6', boxShadow: '0 0 30px rgba(46,196,182,.7)', duration: 0.25 }, t - 0.05);
    tl.fromTo(r.circ, { scale: 0.7 }, { scale: 1, duration: 0.55, ease: 'back.out(2.2)', immediateRender: false }, t - 0.05);
    tl.to(r.path, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, t + 0.05);
    tl.to(r.text, { opacity: 1, x: 8, duration: 0.5 }, t);
    tl.to(amp, { v: 0.4, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  });

  tl.to(proTag, { opacity: 1, duration: 0.5 }, tPro);
  tl.to(label, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, tPro);
  tl.to(rows.map((r) => r.row), { scaleY: 0, duration: 0.5, stagger: 0.05, ease: 'power3.in' }, tDirects - 0.65);
  tl.to(rows.map((r) => r.row), { opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power2.in' }, tDirects - 0.55);
  tl.to(waveWrap, { y: 0, scaleX: 1, opacity: 1, duration: 0.8, ease: 'expo.inOut' }, tDirects - 0.4);
  tl.to(amp, { v: 1.3, duration: 0.5 }, tDirects);

  tl.set(frame, { opacity: 1 }, tVideo - 0.2);
  tl.to(frame, { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 0.7, ease: 'expo.inOut' }, tVideo - 0.2);
  tl.to(glow, { opacity: 1, duration: 0.8 }, tVideo);
  tl.to(waveWrap, { y: 215, scaleY: 0.55, duration: 0.7, ease: 'expo.inOut' }, tVideo - 0.1);
  tl.to(amp, { v: 0.7, duration: 0.6 }, tVideo);
  tl.to(playhead, { opacity: 1, duration: 0.3 }, snapWords[0] - 0.2);
  tl.to(ph, { x: 956, duration: snapWords[5] + 0.45 - snapWords[0], ease: 'none' }, snapWords[0]);
  snapWords.forEach((t, i) => {
    tl.fromTo(segs[i], { opacity: 0, scale: 0.5, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(2)', immediateRender: false }, t);
    if (i > 0) tl.set(imgs[i], { opacity: 1 }, t);
    tl.fromTo(frame, { scale: 1.015 }, { scale: 1, duration: 0.25, ease: 'power2.out', immediateRender: false }, t);
    tl.to(amp, { v: 1.1, duration: 0.1, yoyo: true, repeat: 1 }, t);
  });

  tl.to(proTag, { opacity: 0, duration: 0.4 }, tTry - 0.2);
  tl.to(group, { scale: 0.55, y: -40, duration: 1.0, ease: 'expo.inOut' }, tTry - 0.15);
  tl.to(playhead, { opacity: 0, duration: 0.4 }, tTry);
  tl.to(warm, { opacity: 1, duration: 1.4 }, tTry);
  tl.fromTo(btn, { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, tBasic);
  tl.fromTo(chars, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.025, ease: 'back.out(1.6)', immediateRender: false }, tURL - 0.1);
  tl.to(amp, { v: 1.2, duration: 0.3, yoyo: true, repeat: 1 }, tURL + 0.3);
  tl.to(btn, { boxShadow: '0 20px 70px rgba(255,107,87,.8), inset 0 1px 0 rgba(255,255,255,.5)', duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tURL + 1.2);
});

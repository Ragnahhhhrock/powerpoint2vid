/* Scene 6 — "Accessible slides make better videos. On Pro, AI directs the video, timing animation to your
 * narration. Try Basic first at powerpoint2vid.com."
 * Storyboard: night stage. The headline starts murky and blurred. Each word snaps into focus as it's spoken
 * (130px, paper). Three teal ticks tick in beneath: Captions on, Steady speed, Small-window check.
 * On "Pro" the headline lifts away and the deck's six slides fan out behind. On "timing" a narration
 * waveform draws in. A playhead sweeps it, and each thumbnail lights as the playhead crosses its cue.
 * On "Try" a paper-white field irises open. "Try Basic first" appears, then powerpoint2vid.com assembles
 * syllable by syllable in signal blue, underlined, and holds to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const wAcc = A(0, 'Accessible', 0.55), wMake = A(0, 'make', 1.69), wBetter = A(0, 'better', 1.91), wVideos = A(0, 'videos', 2.18);
  const wPro = A(1, 'Pro', 3.48), wAI = A(1, 'AI', 3.9), wDirects = A(1, 'directs', 4.28), wTiming = A(1, 'timing', 5.47), wNarr = A(1, 'narration', 6.72);
  const wTry = A(2, 'Try', 8.0), wBasic = A(2, 'Basic', 8.36), wPP = A(2, 'PowerPoint', 9.3), wTo = A(2, 'to', 9.9), wVid = A(2, 'vid', 10.05), wDot = A(2, 'dot', 10.38), wCom = A(2, 'com', 10.65);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #1a2033 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 35%, rgba(47,107,255,.18), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 480px' });

  /* ---- thumbnails (behind) ---- */
  const N = 6, CW = 300, CH = 169;
  const cards = [];
  for (let i = 0; i < N; i++) {
    const cx = 360 + i * 240, cy = 470 + Math.abs(i - 2.5) * 14, rot = (i - 2.5) * 4.5;
    const c = el('div', 'abs', cam, { left: cx - CW / 2 + 'px', top: cy - CH / 2 + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '10px', overflow: 'hidden',
      background: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,.55)', outline: '0px solid var(--teal)', transformOrigin: '50% 100%' });
    const im = el('img', 'abs', c, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' }); im.src = ctx.asset(`slide-${i + 1}.png`);
    const shade = el('div', 'abs', c, { inset: 0, background: 'rgba(11,13,18,.45)' });
    cards.push({ c, shade, cx, rot });
  }

  /* ---- waveform ---- */
  const WX = 240, NB = 90, BWID = 10, GAP = 6, WY = 780;
  const rnd = ctx.rand(66);
  const wave = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  let svg = `<svg width="1920" height="1080"><line x1="${WX}" y1="${WY}" x2="${WX + NB * (BWID + GAP)}" y2="${WY}" stroke="rgba(255,255,255,.12)" stroke-width="2"/>`;
  for (let i = 0; i < NB; i++) {
    const env = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.23)) * (0.5 + 0.5 * Math.sin(i * 0.07 + 1));
    const h = 12 + env * 110 * (0.45 + 0.55 * rnd());
    svg += `<rect id="b${i}" x="${WX + i * (BWID + GAP)}" y="${WY - h / 2}" width="${BWID}" height="${h}" rx="5" fill="#3a4152"/>`;
  }
  cards.forEach((k) => { svg += `<line x1="${k.cx}" y1="${WY - 90}" x2="${k.cx}" y2="${WY + 90}" stroke="rgba(18,165,148,.5)" stroke-width="2" stroke-dasharray="3 7"/>`; });
  svg += `</svg>`;
  wave.innerHTML = svg;
  const bars = Array.from(wave.querySelectorAll('rect'));
  const head = el('div', 'abs', cam, { left: WX + 'px', top: WY - 100 + 'px', width: '3px', height: '200px', background: 'var(--paper)', boxShadow: '0 0 18px rgba(247,245,240,.8)', borderRadius: '2px' });
  const ph = { x: WX };
  const waveLab = el('div', 'abs', cam, { left: WX + 'px', top: WY + 110 + 'px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });
  waveLab.textContent = 'YOUR NARRATION';
  const proLab = el('div', 'abs', cam, { left: 0, width: '1920px', top: '238px', textAlign: 'center', font: `600 22px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--amber)' });
  proLab.textContent = 'PRO · AI-DIRECTED';

  /* ---- headline ---- */
  const hw = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '210px', textAlign: 'center', transformOrigin: '50% 0%' });
  const l1 = el('div', '', hw, { font: '900 130px/1.02 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)' });
  const l2 = el('div', '', hw, { font: '900 130px/1.02 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)' });
  const w1 = ctx.split(l1, 'Accessible slides', 'word');
  const w2 = ctx.split(l2, 'make better videos.', 'word');
  const words = [...w1, ...w2];
  const wordT = [wAcc, A(0, 'slides', 1.21), wMake, wBetter, wVideos];

  /* ---- ticks ---- */
  const tickRow = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '590px', display: 'flex', justifyContent: 'space-between' });
  const ticks = ['Captions on', 'Steady speed', 'Small-window check'].map((txt) => {
    const it = el('div', '', tickRow, { display: 'flex', alignItems: 'center', gap: '20px' });
    const dot = el('div', '', it, { width: '58px', height: '58px', borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 30px rgba(18,165,148,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' });
    dot.innerHTML = '<svg width="34" height="34" viewBox="0 0 34 34"><path d="M7 18 L14 25 L27 10" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="40" stroke-dashoffset="40"/></svg>';
    const lab = el('div', '', it, { font: '700 40px/1 Inter', letterSpacing: '-.02em', color: 'var(--paper)' });
    lab.textContent = txt;
    return { it, dot, path: dot.querySelector('path'), lab };
  });

  /* ---- end card (paper) ---- */
  const end = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(70% 70% at 50% 45%, #ffffff 0%, var(--paper) 70%, #ece8de 100%)' });
  const endIn = el('div', 'abs', end, { inset: 0, transformOrigin: '960px 540px' });
  const tryT = el('div', 'abs', endIn, { left: 0, width: '1920px', top: '350px', textAlign: 'center', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  const tryW = ctx.split(tryT, 'Try Basic first', 'word');
  const url = el('div', 'abs', endIn, { left: 0, width: '1920px', top: '470px', textAlign: 'center', font: '900 140px/1.1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--signal)' });
  const parts = ['powerpoint', '2', 'vid', '.com'].map((p) => { const s = el('span', '', url, { display: 'inline-block' }); s.textContent = p; return s; });
  const under = el('div', 'abs', endIn, { left: '460px', width: '1000px', top: '650px', height: '10px', borderRadius: '5px', background: 'var(--signal)', transformOrigin: '0% 50%', boxShadow: '0 8px 30px rgba(47,107,255,.35)' });
  const ring = el('div', 'abs', endIn, { left: '810px', top: '390px', width: '300px', height: '300px', borderRadius: '50%', border: '6px solid var(--signal)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame(() => {
    for (let i = 0; i < NB; i++) {
      const bx = WX + i * (BWID + GAP);
      bars[i].setAttribute('fill', bx < ph.x ? '#12A594' : '#3a4152');
    }
  });

  /* ---- timeline ---- */
  // murky start: words visible but blurred, low contrast
  gsap.set(words, { opacity: 0.14, filter: 'blur(14px)', y: 0 });
  tl.from(glow, { opacity: 0, duration: 1 }, 0);
  words.forEach((w, i) => {
    tl.to(w, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, wordT[i] - 0.08);
    tl.fromTo(w, { scale: 1.06 }, { scale: 1, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, wordT[i] - 0.08);
  });
  ticks.forEach((k, i) => {
    const t = wMake + i * 0.3;
    tl.fromTo(k.it, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, t);
    tl.fromTo(k.dot, { scale: 0 }, { scale: 1, duration: 0.55, ease: 'back.out(2)' }, t);
    tl.to(k.path, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, t + 0.2);
  });
  tl.to(cam, { scale: 1.03, duration: wPro, ease: 'power1.inOut' }, 0);

  // "Pro": headline lifts, ticks clear, thumbnails fan out
  gsap.set(cards.map((k) => k.c), { opacity: 0, y: 160, rotation: 0, scale: 0.7 });
  gsap.set([wave, head, waveLab, proLab], { opacity: 0 });
  tl.to(hw, { scale: 0.46, y: -140, duration: 0.9, ease: 'expo.inOut' }, wPro - 0.15);
  tl.to(ticks.map((k) => k.it), { opacity: 0, y: -20, duration: 0.4, stagger: 0.05, ease: 'power2.in' }, wPro - 0.15);
  tl.to(cam, { scale: 1, duration: 0.9, ease: 'expo.inOut' }, wPro - 0.15);
  tl.fromTo(proLab, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, wPro + 0.3);
  cards.forEach((k, i) => {
    tl.to(k.c, { opacity: 1, y: 0, rotation: k.rot, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, wAI + Math.abs(i - 2.5) * 0.07);
  });
  tl.to(cam, { scale: 1.035, duration: wTry - wDirects, ease: 'power1.inOut' }, wDirects + 0.2);

  // "timing": waveform draws, playhead sweeps, cards light on cue
  gsap.set(wave, { clipPath: 'inset(0px 1920px 0px 0px)' });
  tl.to(wave, { opacity: 1, clipPath: 'inset(0px 0px 0px 0px)', duration: 0.8, ease: 'power2.inOut' }, wTiming - 0.4);
  tl.to(waveLab, { opacity: 1, duration: 0.4 }, wTiming);
  tl.to(head, { opacity: 1, duration: 0.2 }, wTiming);
  const sweepEnd = wTry - 0.3, wEnd = WX + NB * (BWID + GAP);
  const span = sweepEnd - wTiming;
  tl.to(ph, { x: wEnd, duration: span, ease: 'none' }, wTiming);
  tl.to(head, { x: wEnd - WX, duration: span, ease: 'none' }, wTiming);
  cards.forEach((k) => {
    const t = wTiming + span * (k.cx - WX) / (wEnd - WX);
    tl.to(k.shade, { opacity: 0, duration: 0.25 }, t);
    tl.to(k.c, { scale: 1.12, rotation: 0, outline: '5px solid #12A594', boxShadow: '0 0 50px rgba(18,165,148,.6), 0 30px 60px rgba(0,0,0,.55)', zIndex: 2, duration: 0.3, ease: 'back.out(2)' }, t);
    tl.to(k.c, { scale: 1, rotation: k.rot, duration: 0.4, ease: 'power2.out' }, t + 0.35);
  });

  // "Try": paper field irises open, CTA assembles
  gsap.set(end, { clipPath: 'circle(0% at 50% 50%)' });
  tl.to(end, { clipPath: 'circle(80% at 50% 50%)', duration: 0.9, ease: 'expo.inOut' }, wTry - 0.25);
  tl.to(cam, { scale: 0.92, opacity: 0, duration: 0.8, ease: 'power2.in' }, wTry - 0.25);
  const tryTimes = [wTry, wBasic, A(2, 'first', 8.79)];
  tryW.forEach((w, i) => tl.fromTo(w, { opacity: 0, y: 30, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }, tryTimes[i] + 0.1));
  [wPP, wTo, wVid, wDot].forEach((t, i) => {
    tl.fromTo(parts[i], { opacity: 0, y: 50, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'back.out(1.6)' }, t - 0.08);
  });
  gsap.set(under, { scaleX: 0 });
  tl.to(under, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, wCom - 0.1);
  tl.fromTo(ring, { scale: 0.5, opacity: 0.8 }, { scale: 4, opacity: 0, duration: 1.1, ease: 'power2.out', immediateRender: false }, wCom);
  tl.to(endIn, { scale: 1.04, duration: ctx.dur - wTry, ease: 'power1.out' }, wTry);
});

/* Scene 0: "Ever been asked what an explainer video actually is? It's a short video that explains
 * one thing clearly. Here's the plain-English version."
 * Storyboard: Night stage. A lone blinking cursor types "What is an explainer video?" in big paper
 * type, with the question mark in signal coral. On "one thing clearly" the words dissolve word by word.
 * Only the question mark's dot survives; it glides to centre frame and glows coral. On
 * "Here's the plain-English version" the camera pushes slowly in on the dot. Only the source's
 * cropped title is kept, rebuilt cleanly. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const R = ctx.rand(7);
  const tIs = ctx.at(0, 'is?'), tOne = ctx.at(1, 'one'), tClear = ctx.at(1, 'clearly.');
  const tHere = ctx.at(2, "Here's"), tPlain = ctx.at(2, 'plain-English');

  stage.style.background = 'radial-gradient(60% 55% at 50% 48%, #1a2240 0%, var(--night) 70%), var(--night)';
  const glowBg = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 30% at 50% 50%, rgba(255,107,74,.16), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* the question, built char by char so the layout never shifts while typing */
  const TEXT = 'What is an explainer video?';
  const line = el('div', 'abs', cam, { left: 0, width: '1920px', top: '476px', textAlign: 'center', whiteSpace: 'nowrap',
    font: '800 110px/1.1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const chars = [];
  const words = [[]];
  [...TEXT].forEach((c) => {
    const s = el('span', '', line, { display: 'inline-block', opacity: 0 });
    if (c === ' ') { s.innerHTML = '&nbsp;'; words.push([]); } else { s.textContent = c; words[words.length - 1].push(s); }
    if (c === '?') { s.style.color = 'var(--signal)'; s.style.textShadow = '0 0 30px rgba(255,107,74,.5)'; }
    chars.push(s);
  });
  const qm = chars[chars.length - 1];
  const cursor = el('div', 'abs', line, { top: '16px', width: '8px', height: '100px', borderRadius: '3px', background: 'var(--paper)', boxShadow: '0 0 18px rgba(247,244,238,.5)' });

  /* typing times: from 0.35s until just after "is?" */
  const t0 = 0.35, t1 = tIs + 0.15;
  const times = chars.map((_, i) => t0 + (t1 - t0) * (i / (chars.length - 1)) + (i ? (R() - 0.5) * 0.05 : 0));
  times.forEach((t, i) => {
    tl.set(chars[i], { opacity: 1 }, t);
    tl.fromTo(chars[i], { y: 14 }, { y: 0, duration: 0.25, ease: 'back.out(2)', immediateRender: false }, t);
  });

  /* the surviving dot, starting where the question mark's dot sits */
  const qx = line.offsetLeft + qm.offsetLeft + qm.offsetWidth * 0.5;
  const qy = 476 + qm.offsetTop + qm.offsetHeight * 0.8;
  const D = 40;
  const halo = el('div', 'abs', cam, { left: 960 - 160 + 'px', top: 540 - 160 + 'px', width: '320px', height: '320px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,107,74,.45) 0%, rgba(255,107,74,.12) 40%, transparent 70%)', opacity: 0 });
  const ring = el('div', 'abs', cam, { left: 960 - 60 + 'px', top: 540 - 60 + 'px', width: '120px', height: '120px', borderRadius: '50%', border: '3px solid var(--signal)', opacity: 0 });
  const dot = el('div', 'abs', cam, { left: 960 - D / 2 + 'px', top: 540 - D / 2 + 'px', width: D + 'px', height: D + 'px', borderRadius: '50%',
    background: 'radial-gradient(circle at 38% 35%, #ffc2b2, var(--signal) 60%, #e0482a)', boxShadow: '0 0 30px rgba(255,107,74,.8), 0 0 90px rgba(255,107,74,.45)' });
  gsap.set(dot, { x: qx - 960, y: qy - 540, scale: 0.42, opacity: 0 });

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  /* cursor follows typing, then blinks; it hides once the dissolve starts */
  const dissolveAt = tOne - 0.1;
  ctx.onFrame((t) => {
    let k = 0;
    while (k < times.length && times[k] <= t) k++;
    const ref = k > 0 ? chars[k - 1] : null;
    let x;
    if (ref) x = ref.offsetLeft + ref.offsetWidth + 6;
    else x = chars[0].offsetLeft;
    cursor.style.left = x + 'px';
    const typing = t < t1 + 0.2;
    const blinkOn = typing ? true : Math.floor((t - t1) / 0.5) % 2 === 1;
    cursor.style.opacity = t >= dissolveAt ? 0 : (blinkOn ? 1 : 0);
  });

  /* gentle drift while the question hangs */
  tl.fromTo(cam, { scale: 1 }, { scale: 1.04, duration: tHere - 0.2, ease: 'none' }, 0);
  tl.to(qm, { scale: 1.12, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, tIs + 0.15);

  /* "one thing clearly": the words dissolve, only the dot survives */
  const letters = chars.filter((c) => c !== qm);
  gsap.set(chars, { filter: 'blur(0px)' });
  words.forEach((w, wi) => {
    const ws = w.filter((c) => c !== qm);
    if (!ws.length) return;
    tl.to(ws, { opacity: 0, filter: 'blur(14px)', y: () => -20 - R() * 40, x: () => (R() - 0.5) * 40, duration: 0.6, ease: 'power2.in', stagger: 0.025 }, dissolveAt + wi * 0.09);
  });
  tl.to(dot, { opacity: 1, duration: 0.2 }, tClear - 0.25);
  tl.to(qm, { opacity: 0, filter: 'blur(10px)', duration: 0.35, ease: 'power2.in' }, tClear - 0.2);
  tl.to(dot, { x: 0, y: 0, scale: 1, duration: 0.9, ease: 'expo.inOut' }, tClear);
  tl.to(halo, { opacity: 1, duration: 0.8 }, tClear + 0.5);
  tl.to(glowBg, { opacity: 1, duration: 1.2, ease: 'power2.out' }, tClear + 0.4);
  tl.fromTo(ring, { scale: 0.4, opacity: 0.9 }, { scale: 2.6, opacity: 0, duration: 1.1, ease: 'power2.out', immediateRender: false }, tClear + 0.85);

  /* "Here's the plain-English version": slow push-in on the dot */
  tl.to(cam, { scale: 1.9, duration: ctx.dur - tHere + 0.1, ease: 'power2.inOut' }, tHere - 0.1);
  tl.to(halo, { scale: 1.35, duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tPlain);
  tl.to(dot, { boxShadow: '0 0 50px rgba(255,107,74,1), 0 0 140px rgba(255,107,74,.6)', duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tPlain);
});

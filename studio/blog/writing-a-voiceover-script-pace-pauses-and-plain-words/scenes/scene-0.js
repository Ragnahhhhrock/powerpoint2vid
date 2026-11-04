/* Scene 0 — "A voiceover script is text that nobody reads. They only hear it, once, at the speed it's spoken.
 * That changes the rules."
 * Storyboard: a night stage holds one paper-coloured line, "text that nobody reads", which dissolves letter by
 * letter on "nobody reads". A silent teal hairline appears. On "hear it, once" a live waveform draws left to right
 * across the centre with a glowing playhead, then erases and is gone. On "changes the rules" the rebuilt title
 * "Pace, Pauses, Plain Words" slams in at 140px. Each word then lights in turn: teal, amber, coral.
 * The camera pushes in slowly the whole time and nudges forward on "rules". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const nobody = ctx.at(0, 'nobody'), hear = ctx.at(1, 'hear'), once = ctx.at(1, 'once,'), spoken = ctx.at(1, 'spoken.');
  const changes = ctx.at(2, 'changes'), rules = ctx.at(2, 'rules.');

  stage.style.background = 'radial-gradient(60% 55% at 50% 48%, #1a2140 0%, var(--night) 70%), var(--night)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 50%, rgba(79,209,197,.10), transparent 70%)', opacity: 0.6 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* --- the line nobody reads --- */
  const line = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '486px', textAlign: 'center', font: '700 92px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const chars = ctx.split(line, 'text that nobody reads.', 'char');
  gsap.set(chars, { filter: 'blur(0px)' });

  /* --- waveform --- */
  const X0 = 120, X1 = 1800, CY = 540;
  const waveWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  waveWrap.innerHTML = `<svg width="1920" height="1080">
    <line x1="${X0}" y1="${CY}" x2="${X1}" y2="${CY}" stroke="rgba(79,209,197,.35)" stroke-width="2"/>
    <path id="wglow" fill="none" stroke="rgba(79,209,197,.35)" stroke-width="14" stroke-linejoin="round" style="filter:blur(10px)"/>
    <path id="wline" fill="none" stroke="#4FD1C5" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  const wline = waveWrap.querySelector('#wline'), wglow = waveWrap.querySelector('#wglow');
  const R = ctx.rand(7);
  const bumps = Array.from({ length: 16 }, (_, i) => ({ c: X0 + 60 + i * ((X1 - X0 - 120) / 15) + (R() - 0.5) * 60, a: 60 + R() * 150, w: 30 + R() * 45 }));
  const wave = { amp: 0 };
  const head = el('div', 'abs', cam, { left: X0 - 9 + 'px', top: CY - 9 + 'px', width: '18px', height: '18px', borderRadius: '50%', background: '#dffcf8', boxShadow: '0 0 30px 8px rgba(79,209,197,.8)', opacity: 0 });
  const tagOnce = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '800px', textAlign: 'center', font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.3em', color: 'var(--waveform)', opacity: 0 });
  tagOnce.textContent = 'PLAYED ONCE · 1×';

  ctx.onFrame((t) => {
    let d = '';
    for (let x = X0; x <= X1; x += 4) {
      let env = 0;
      for (const b of bumps) env += b.a * Math.exp(-((x - b.c) ** 2) / (2 * b.w * b.w));
      env = Math.min(env, 220);
      const y = CY + wave.amp * env * (0.65 * Math.sin(x * 0.11 + t * 9) + 0.35 * Math.sin(x * 0.047 - t * 5));
      d += (x === X0 ? 'M' : 'L') + x + ' ' + y.toFixed(1);
    }
    wline.setAttribute('d', d); wglow.setAttribute('d', d);
  });

  /* --- rebuilt title --- */
  const title = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '318px', textAlign: 'center' });
  const kicker = el('div', '', title, { font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.32em', color: 'var(--mist)', marginBottom: '40px' });
  kicker.textContent = 'VOICEOVER SCRIPTS';
  const l1 = el('div', '', title, { font: '900 140px/1.02 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const l2 = el('div', '', title, { font: '900 140px/1.02 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const mk = (p, txt) => { const s = el('span', '', p, { display: 'inline-block', margin: '0 .12em', transformOrigin: '50% 60%' }); s.textContent = txt; return s; };
  const words = [mk(l1, 'Pace,'), mk(l1, 'Pauses,'), mk(l2, 'Plain Words')];
  const cols = [['#4FD1C5', '79,209,197'], ['#FFB547', '255,181,71'], ['#FF6B5A', '255,107,90']];
  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(45% 40% at 50% 50%, rgba(246,241,231,.22), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set([kicker, ...words], { opacity: 0 });
  gsap.set(words, { textShadow: '0 0 0px rgba(255,255,255,0)' });
  gsap.set(waveWrap, { opacity: 0, clipPath: `inset(0px ${1920 - X0}px 0px 0px)` });

  // camera: slow continuous push-in, nudge on "rules"
  tl.fromTo(cam, { scale: 1 }, { scale: 1.05, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(glow, { opacity: 1, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: 2 }, 0);

  // line arrives, then dissolves letter by letter on "nobody reads"
  tl.from(chars, { opacity: 0, y: 24, duration: 0.6, stagger: 0.012 }, 0.1);
  tl.to(chars, { opacity: 0, y: -18, filter: 'blur(8px)', duration: 0.45, stagger: 0.035, ease: 'power2.in' }, nobody - 0.05);

  // silence: a hairline, then sound draws across on "hear it, once"
  tl.to(waveWrap, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 3.45);
  tl.set(waveWrap, { clipPath: `inset(0px ${1920 - X0}px 0px 0px)` }, 3.45);
  tl.to(waveWrap, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1.3, ease: 'power1.inOut' }, hear - 0.05);
  tl.to(wave, { amp: 1, duration: 0.5, ease: 'power2.out' }, hear - 0.05);
  tl.to(head, { opacity: 1, duration: 0.15 }, hear - 0.05);
  tl.to(head, { x: X1 - X0, duration: 1.3, ease: 'power1.inOut' }, hear - 0.05);
  tl.to(head, { opacity: 0, duration: 0.2 }, hear + 1.25);
  tl.fromTo(tagOnce, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, once);
  // ...and it's gone: erased from the left as it passes
  tl.to(waveWrap, { clipPath: `inset(0px 0px 0px ${X1 + 20}px)`, duration: 0.9, ease: 'power2.in' }, spoken - 0.25);
  tl.to(wave, { amp: 0.2, duration: 0.9, ease: 'power1.in' }, spoken - 0.25);
  tl.to(tagOnce, { opacity: 0, duration: 0.4 }, spoken + 0.1);

  // "changes the rules": the title slams in
  tl.to(kicker, { opacity: 1, duration: 0.5 }, changes - 0.2);
  const slam = [changes - 0.12, changes + 0.2, rules - 0.12];
  words.forEach((w, i) => {
    tl.fromTo(w, { opacity: 0, scale: 2, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: 'power4.in', immediateRender: false }, slam[i] - 0.22);
    tl.to(w, { y: 5, duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.inOut' }, slam[i] + 0.1);
  });
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, rules - 0.02);
  tl.to(cam, { scale: '+=0.025', duration: 0.6, ease: 'expo.out' }, rules - 0.02);

  // each word lit in turn: teal, amber, coral
  words.forEach((w, i) => {
    const t = rules + 0.2 + i * 0.25;
    tl.to(w, { color: cols[i][0], textShadow: `0 0 50px rgba(${cols[i][1]},.85)`, duration: 0.25, ease: 'power2.out' }, t);
    tl.to(w, { textShadow: `0 0 26px rgba(${cols[i][1]},.4)`, duration: 0.5, ease: 'sine.out' }, t + 0.25);
  });
});

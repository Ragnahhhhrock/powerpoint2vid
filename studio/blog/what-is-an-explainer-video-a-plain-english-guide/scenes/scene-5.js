/* Scene 5 — "Your speaker notes become the narration. On Pro, A.I. directs the video, so a plain deck lands
 * like a produced explainer. Try Basic first at powerpoint2vid.com."
 * Storyboard: night stage. A plain white slide (the deck's own slide 6) floats in with a speaker-notes panel
 * beneath it. On "become the narration" the notes text lifts off as a coral sound waveform. On "A.I. directs
 * the video" the plain slide is wiped into a colourful, animated produced frame while the camera pulls wide.
 * On "Try Basic first" the frame settles upward and "powerpoint2vid.com" rises at 110px in paper with a
 * coral underline, then holds to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : f; };
  const tNotes = A(0, 'notes', 1.18), tBecome = A(0, 'become', 1.47), tNarr = A(0, 'narration', 1.92);
  const tPro = A(1, 'Pro', 3.17), tAI = A(1, 'A.I.', 3.57), tDirects = A(1, 'directs', 3.95);
  const tLands = A(1, 'lands', 6.05), tProduced = A(1, 'produced', 6.66), tExpl = A(1, 'explainer', 7.11);
  const tTry = A(2, 'Try', 8.21), tBasic = A(2, 'Basic', 8.53), tPP = A(2, 'PowerPoint', 9.47), tCom = A(2, 'com', 10.67);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #1d2547 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 40%, rgba(76,141,255,.18), transparent 70%)', opacity: 0.6 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });
  const grp = el('div', 'abs', cam, { inset: 0, transformOrigin: '960px 420px' });

  /* ---- the plain slide ---- */
  const card = el('div', 'abs', grp, { left: '480px', top: '150px', width: '960px', height: '540px', borderRadius: '10px', overflow: 'hidden', background: '#fff', boxShadow: '0 40px 100px rgba(0,0,0,.55)' });
  const plain = el('div', 'abs', card, { inset: 0, fontFamily: 'Arial, Helvetica, sans-serif', color: '#111' });
  const pt = el('div', 'abs', plain, { left: 0, right: 0, top: '40px', textAlign: 'center', font: '400 44px/1.1 Arial, Helvetica, sans-serif' });
  pt.textContent = 'Turn your deck into an explainer';
  ['Trim to one question', 'One idea per slide', 'Narration in the speaker notes'].forEach((s, i) => {
    const b = el('div', 'abs', plain, { left: '70px', top: 140 + i * 56 + 'px', font: '400 32px/1 Arial, Helvetica, sans-serif' });
    b.textContent = '• ' + s;
  });

  /* ---- the produced frame (revealed inside the card) ---- */
  const prod = el('div', 'abs', card, { inset: 0, background: 'linear-gradient(135deg, #1B2238 0%, #0F1424 100%)', clipPath: 'circle(0% at 50% 50%)' });
  const blobA = el('div', 'abs', prod, { left: '560px', top: '-120px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,.55), transparent 65%)' });
  const blobB = el('div', 'abs', prod, { left: '-160px', top: '260px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(76,141,255,.5), transparent 65%)' });
  const ring = el('div', 'abs', prod, { left: '700px', top: '250px', width: '180px', height: '180px', borderRadius: '50%', border: '14px solid var(--mint)', opacity: 0.9 });
  const sq = el('div', 'abs', prod, { left: '820px', top: '110px', width: '70px', height: '70px', borderRadius: '14px', background: 'var(--sky)' });
  const ptag = el('div', 'abs', prod, { left: '56px', top: '46px', font: `600 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--signal)' });
  ptag.textContent = 'PRO · AI DIRECTED';
  const ptitle = el('div', 'abs', prod, { left: '56px', top: '84px', width: '640px', font: '800 58px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
  const tWords = ctx.split(ptitle, 'Turn your deck into an explainer', 'word');
  const cols = ['var(--signal)', 'var(--sky)', 'var(--mint)'];
  const rows = ['One question', 'One idea per slide', 'Notes → narration'].map((s, i) => {
    const r = el('div', 'abs', prod, { left: '56px', top: 252 + i * 64 + 'px', display: 'flex', alignItems: 'center', gap: '16px', font: '700 28px/1 Inter', color: 'rgba(255,255,255,.92)', letterSpacing: '-.01em' });
    el('div', '', r, { width: '18px', height: '18px', borderRadius: '50%', background: cols[i], boxShadow: `0 0 16px ${cols[i]}` });
    el('span', '', r).textContent = s;
    return r;
  });
  const scrub = el('div', 'abs', prod, { left: '56px', right: '56px', bottom: '36px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.15)' });
  const scrubFill = el('div', 'abs', scrub, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, var(--signal), #ffb199)', transformOrigin: '0 50%' });
  const prog = { v: 0 };

  /* ---- speaker notes panel ---- */
  const notes = el('div', 'abs', grp, { left: '480px', top: '730px', width: '960px', height: '170px', borderRadius: '14px', background: 'var(--ink)', boxShadow: '0 30px 70px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06)' });
  const nlab = el('div', 'abs', notes, { left: '32px', top: '24px', font: `600 18px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mist)' });
  nlab.textContent = 'SPEAKER NOTES';
  const ntext = el('div', 'abs', notes, { left: '32px', top: '64px', width: '896px', font: '500 28px/1.35 Inter', color: 'rgba(247,244,238,.85)' });
  ntext.textContent = 'Every explainer answers one question, then moves from problem to answer…';
  const NB = 56;
  const wave = el('div', 'abs', grp, { left: '512px', top: '740px', width: '896px', height: '160px', opacity: 0, filter: 'drop-shadow(0 0 14px rgba(255,107,74,.7))' });
  wave.innerHTML = `<svg width="896" height="160">${Array.from({ length: NB }, (_, i) => `<rect x="${i * 16 + 4}" y="76" width="8" height="8" rx="4" fill="#FF6B4A"/>`).join('')}</svg>`;
  const bars = [...wave.querySelectorAll('rect')];
  const amp = { v: 0 };

  /* ---- call to action ---- */
  const cta = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '690px', textAlign: 'center' });
  const ctaLab = el('div', '', cta, { font: `600 24px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--mist)', marginBottom: '26px' });
  ctaLab.textContent = 'TRY BASIC FIRST';
  const url = el('div', '', cta, { display: 'inline-block', font: '800 110px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', position: 'relative', textShadow: '0 0 40px rgba(247,244,238,.18)' });
  const urlChars = ctx.split(url, 'powerpoint2vid.com', 'char');
  const uline = el('div', 'abs', url, { left: '4px', right: '4px', bottom: '-22px', height: '10px', borderRadius: '5px', background: 'var(--signal)', boxShadow: '0 0 26px rgba(255,107,74,.8)', transformOrigin: '0 50%' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    bars.forEach((b, i) => {
      const e = Math.abs(Math.sin(i * 0.7 + t * 6.2) * Math.sin(i * 0.23 - t * 2.3));
      const h = 8 + amp.v * 120 * (0.25 + 0.75 * e) * Math.sin(Math.PI * (i + 0.5) / NB);
      b.setAttribute('height', h.toFixed(1)); b.setAttribute('y', (80 - h / 2).toFixed(1));
    });
    ring.style.transform = `rotate(${t * 40}deg) scale(${1 + 0.05 * Math.sin(t * 2)})`;
    sq.style.transform = `rotate(${t * -60}deg) translateY(${8 * Math.sin(t * 1.7)}px)`;
    blobA.style.transform = `translate(${30 * Math.sin(t * 0.6)}px, ${20 * Math.cos(t * 0.5)}px)`;
    blobB.style.transform = `translate(${25 * Math.cos(t * 0.55)}px, ${18 * Math.sin(t * 0.7)}px)`;
    scrubFill.style.transform = `scaleX(${prog.v})`;
  });

  /* ---- timeline ---- */
  gsap.set(cam, { scale: 1.06 });
  gsap.set(card, { filter: 'brightness(1)' });
  gsap.set([ctaLab, ...urlChars], { opacity: 0 });
  gsap.set(uline, { scaleX: 0 });
  tl.from(card, { y: 60, opacity: 0, rotationX: 8, duration: 0.9 }, 0.05);
  tl.from(notes, { y: 50, opacity: 0, duration: 0.8 }, 0.3);
  tl.to(cam, { scale: 1.1, duration: tDirects - 0.3, ease: 'sine.inOut' }, 0);
  tl.to(notes, { boxShadow: '0 30px 70px rgba(0,0,0,.45), inset 0 0 0 2px rgba(255,107,74,.6)', duration: 0.4 }, tNotes);

  // notes lift off as a waveform
  tl.to(ntext, { opacity: 0, y: -30, filter: 'blur(4px)', duration: 0.5, ease: 'power2.in' }, tBecome);
  tl.fromTo(wave, { opacity: 0, y: 30 }, { opacity: 1, y: -6, duration: 0.7, ease: 'back.out(1.6)', immediateRender: false }, tBecome + 0.3);
  tl.to(amp, { v: 1, duration: 0.6, ease: 'power2.out' }, tNarr - 0.1);
  tl.to(nlab, { color: '#FF6B4A', duration: 0.3 }, tNarr);

  // AI directs: slide transforms, camera pulls wide
  tl.to(cam, { scale: 0.94, duration: 1.4, ease: 'expo.inOut' }, tAI - 0.3);
  tl.to(glow, { opacity: 1, duration: 1 }, tAI);
  tl.to(card, { boxShadow: '0 40px 120px rgba(76,141,255,.35)', duration: 0.8 }, tDirects);
  tl.to(prod, { clipPath: 'circle(80% at 50% 50%)', duration: 1.0, ease: 'expo.inOut' }, tDirects - 0.2);
  tl.from(tWords, { y: 40, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'back.out(1.7)' }, tDirects + 0.3);
  tl.from(ptag, { opacity: 0, x: -20, duration: 0.5 }, tDirects + 0.4);
  tl.from(rows, { x: -40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.6)' }, A(1, 'video', 4.46) + 0.2);
  tl.from([ring, sq], { scale: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(2)' }, A(1, 'video', 4.46));
  tl.to(prog, { v: 1, duration: tTry - tDirects, ease: 'none' }, tDirects);
  tl.to(card, { scale: 1.035, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tLands);
  tl.to(amp, { v: 0.6, duration: 0.6 }, tProduced);
  tl.to(cam, { scale: 0.97, duration: tTry - tExpl + 0.2, ease: 'sine.inOut' }, tExpl - 0.2);

  // Try Basic: settle and CTA
  tl.to([notes, wave], { opacity: 0, y: 40, duration: 0.6, ease: 'power2.in' }, tTry - 0.2);
  tl.to(grp, { scale: 0.68, y: -60, duration: 1.1, ease: 'expo.inOut' }, tTry);
  tl.to(ctaLab, { opacity: 1, duration: 0.5 }, tBasic);
  tl.fromTo(ctaLab, { y: 20 }, { y: 0, duration: 0.6, immediateRender: false }, tBasic);
  tl.fromTo(urlChars, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.03, ease: 'back.out(1.8)', immediateRender: false }, tPP - 0.25);
  tl.to(uline, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, tCom - 0.2);
  tl.to(cam, { scale: 1.0, duration: ctx.dur - tTry, ease: 'power1.inOut' }, tTry + 0.1);
  tl.to(uline, { boxShadow: '0 0 44px rgba(255,107,74,1)', duration: 0.6, yoyo: true, repeat: 1 }, tCom + 0.5);
});

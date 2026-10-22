/* Scene 0 — "This video started life as five ordinary slides. Watch what happens when they get a director."
 * Storyboard: the real input slides drop onto a dark stage as a flat row. On "ordinary" they drain of
 * colour. On beat 2 the others fly off and slide 1 pushes to camera; a clapper snaps on "director",
 * the slide flips and its back is the designed title card, which then grows to fill the frame. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const b1 = ctx.beat(1), director = ctx.at(1, 'director'), ordinary = ctx.at(0, 'ordinary');

  stage.style.background = 'radial-gradient(70% 60% at 50% 45%, #1a1f4d 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { inset: '-20%', background: 'radial-gradient(35% 30% at 30% 30%, rgba(109,74,255,.35), transparent 70%), radial-gradient(30% 28% at 75% 70%, rgba(255,107,74,.22), transparent 70%)', opacity: 0 });

  const persp = el('div', 'abs', stage, { inset: 0, perspective: '1800px' });
  const world = el('div', 'abs', persp, { inset: 0, transformStyle: 'preserve-3d' });

  const label = el('div', 'abs', stage, { left: '150px', top: '330px', font: '500 26px/1 ui-monospace, Menlo, monospace', color: 'var(--muted)', letterSpacing: '.08em' });
  label.innerHTML = 'INPUT&nbsp;&nbsp;·&nbsp;&nbsp;input-deck.pptx&nbsp;&nbsp;·&nbsp;&nbsp;5 slides';

  // Row of small cards (slides 2-5); slide 1 is the hero card below.
  const CW = 300, GAP = 30, X0 = 150, CY = 560;
  const small = [1, 2, 3, 4].map((k) => {
    const im = el('img', 'abs', world, { width: CW + 'px', left: X0 + k * (CW + GAP) + 'px', top: CY - 84 + 'px', borderRadius: '6px', boxShadow: '0 20px 40px rgba(0,0,0,.45)' });
    im.src = ctx.asset(`slide-${k + 1}.png`); return im;
  });

  // Hero card: built at full size (1280x720) for crisp text, scaled down to sit in the row.
  const hero = el('div', 'abs', world, { width: '1280px', height: '720px', left: '320px', top: '180px', transformStyle: 'preserve-3d' });
  const face = (css) => el('div', 'abs', hero, Object.assign({ inset: 0, borderRadius: '26px', overflow: 'hidden', backfaceVisibility: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,.55)' }, css));
  const front = face({});
  const fim = el('img', 'abs', front, { inset: 0, width: '100%', height: '100%' }); fim.src = ctx.asset('slide-1.png');
  const back = face({ transform: 'rotateY(180deg)', background: 'radial-gradient(60% 70% at 15% 10%, #3b2a9e 0%, transparent 60%), radial-gradient(50% 60% at 95% 100%, #b2412a 0%, transparent 60%), #0b0f2a' });

  const eyebrow = el('div', 'abs', back, { left: '96px', top: '120px', font: '700 24px/1 Inter', letterSpacing: '.22em', color: 'var(--violet-hi)' });
  eyebrow.textContent = 'POWERPOINT2VID';
  const l1 = el('div', 'abs', back, { left: '90px', top: '210px', font: '800 112px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', whiteSpace: 'nowrap' });
  const l2 = el('div', 'abs', back, { left: '90px', top: '336px', font: '800 112px/1.02 Inter Display, Inter', letterSpacing: '-.04em', whiteSpace: 'nowrap', color: '#ff8f72' });
  const c1 = ctx.split(l1, 'Ordinary slides.'), c2 = ctx.split(l2, 'Extraordinary videos.');
  c2.forEach((s) => Object.assign(s.style, { background: 'linear-gradient(100deg, #a58bff, #ff6b4a)', backgroundSize: '1150px 100%', backgroundPositionX: -s.offsetLeft + 'px', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }));
  const sub = el('div', 'abs', back, { left: '96px', top: '520px', font: '500 34px/1.3 Inter', color: 'rgba(255,255,255,.72)' });
  sub.textContent = 'Directed, designed and narrated from your deck.';
  const streak = el('div', 'abs', back, { top: '-20%', bottom: '-20%', width: '220px', left: '-300px', transform: 'rotate(18deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent)', mixBlendMode: 'screen' });

  // Clapper (snaps shut on "director")
  const clap = el('div', 'abs', stage, { left: '500px', top: '150px', width: '150px', height: '120px', opacity: 0, transformOrigin: '0 100%' });
  clap.innerHTML = `<svg viewBox="0 0 150 120" width="150" height="120">
    <rect x="8" y="44" width="134" height="72" rx="8" fill="#fff"/>
    <g fill="#0e1330"><path d="M24 44h18l-14 30h-18zM62 44h18l-14 30h-18zM100 44h18l-14 30h-18z" opacity=".9"/></g>
    <g id="arm" style="transform-origin:12px 40px"><rect x="8" y="22" width="134" height="20" rx="5" fill="#fff"/>
    <g fill="#0e1330"><path d="M22 22h16l-8 20h-16zM58 22h16l-8 20h-16zM94 22h16l-8 20h-16zM130 22h12v20h-20z"/></g></g></svg>`;
  const arm = clap.querySelector('#arm');
  const flash = el('div', 'abs', stage, { inset: 0, background: '#fff', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.07 });

  /* ---- timeline ---- */
  const heroRow = { x: -(320 + 640) + X0 + CW / 2, y: CY - 540, scale: CW / 1280, rotationX: 14, z: 0 };
  gsap.set(hero, heroRow);
  gsap.set(small, { rotationX: 14 });
  gsap.set(glow, { opacity: 0.35 });
  gsap.set([fim, ...small], { filter: 'grayscale(0) brightness(1)' });

  // 1. slides drop onto the stage
  tl.from([hero, ...small], { y: '-=90', opacity: 0, duration: 0.9, stagger: 0.11, ease: 'back.out(1.6)' }, 0.15);
  tl.from(label, { opacity: 0, y: 14, duration: 0.6 }, 0.55);
  tl.to(world, { rotationY: -4, duration: 4, ease: 'sine.inOut' }, 0);

  // 2. "ordinary": drain the colour, slight sag
  tl.to([fim, ...small], { filter: 'grayscale(1) brightness(.82)', duration: 0.6, ease: 'power2.out' }, ordinary);
  tl.to(small, { rotation: (i) => [-2, 1.5, -1, 2.2][i], y: (i) => [6, 10, 4, 12][i], duration: 0.8, ease: 'power2.out', stagger: 0.05 }, ordinary + 0.1);

  // 3. beat 2: others fly away, hero pushes to camera
  tl.to(label, { opacity: 0, duration: 0.4 }, b1 - 0.2);
  tl.to(small, { x: (i) => 520 + i * 140, y: '-=60', rotationY: -40, opacity: 0, filter: 'grayscale(1) brightness(.82) blur(10px)', duration: 0.9, stagger: 0.06, ease: 'power3.in' }, b1);
  tl.to(world, { rotationY: 0, duration: 1.2, ease: 'power2.inOut' }, b1);
  tl.to(hero, { x: 0, y: 0, scale: 0.62, rotationX: 0, duration: 1.4, ease: 'expo.inOut' }, b1 + 0.15);
  tl.to(glow, { opacity: 1, duration: 1.6 }, b1 + 0.3);

  // 4. "director": clapper snaps, flash, card flips to the designed version
  tl.fromTo(clap, { opacity: 0, y: 30, rotation: -8, scale: 1.3 }, { opacity: 1, y: 0, rotation: 0, scale: 1.3, duration: 0.35, ease: 'back.out(2)' }, director - 0.65);
  tl.fromTo(arm, { rotation: -28 }, { rotation: 0, duration: 0.14, ease: 'power4.in' }, director - 0.14);
  tl.to(clap, { scale: 1.45, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.out' }, director);
  tl.to(clap, { opacity: 0, y: -40, duration: 0.4, ease: 'power2.in' }, director + 0.35);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 0.55, duration: 0.06, yoyo: true, repeat: 1 }, director);
  tl.to(hero, { rotationY: 180, duration: 0.9, ease: 'power3.inOut' }, director + 0.02);
  tl.to(hero, { scale: 0.88, duration: 0.9, ease: 'power3.inOut' }, director + 0.02);

  // 5. designed title animates in
  const T = director + 0.55;
  tl.from(eyebrow, { opacity: 0, x: -20, duration: 0.5 }, T);
  tl.from(c1, { yPercent: 110, opacity: 0, rotation: 6, duration: 0.7, stagger: 0.022, ease: 'back.out(1.7)' }, T + 0.05);
  tl.from(c2, { yPercent: 110, opacity: 0, rotation: 6, duration: 0.7, stagger: 0.022, ease: 'back.out(1.7)' }, T + 0.3);
  tl.from(sub, { opacity: 0, y: 16, duration: 0.6 }, T + 0.75);
  tl.to(streak, { left: '1500px', duration: 1.1, ease: 'power2.inOut' }, T + 0.6);

  // 6. card becomes the frame
  tl.to(hero, { scale: 1.5, duration: Math.max(1.2, ctx.dur - T - 0.4), ease: 'power2.inOut' }, T + 0.9);
  tl.to(hero.children, { borderRadius: '0px', duration: 1 }, T + 1.2);
});

/* Scene 0 — "A lot of meetings are really presentations with a calendar invite.
 *            Here's when a video saves everyone time, and when to keep the meeting."
 * Storyboard: Night stage. A tight grid of calendar blocks fills the frame and the camera slowly pushes in.
 * On "presentations" one block flips to show a tiny slide icon. On "calendar invite" the rest flip in a
 * ripple outward. On "video" the blocks dissolve as the camera pushes through, leaving one coral play
 * button where the hero block stood. It rises, and the headline "Async video vs live meetings" sets in at
 * 120px, with the subtitle beneath in mist. The original's overlapping title is rebuilt cleanly. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const R = ctx.rand(7);
  const tPres = ctx.at(0, 'presentations'), tCal = ctx.at(0, 'calendar');
  const tVideo = ctx.at(1, 'video'), tSaves = ctx.at(1, 'saves'), tTime = ctx.at(1, 'time,');
  const tKeep = ctx.at(1, 'keep');

  stage.style.background = 'radial-gradient(60% 55% at 45% 50%, #1b2340 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 30% at 50% 50%, rgba(255,107,74,.22), transparent 70%)', opacity: 0 });

  const COLS = 6, ROWS = 5, W = 260, H = 150, G = 24;
  const L0 = (1920 - (COLS * W + (COLS - 1) * G)) / 2, T0 = (1080 - (ROWS * H + (ROWS - 1) * G)) / 2;
  const HR = 2, HC = 2;
  const hx = L0 + HC * (W + G) + W / 2, hy = T0 + HR * (H + G) + H / 2;
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: `${hx}px ${hy}px` });
  const accents = ['var(--signal)', 'var(--teal)', 'var(--sky)', 'var(--mist)'];
  const times = ['09:00', '09:30', '10:00', '11:00', '13:00', '14:30', '15:00', '16:00'];
  const mono = '600 18px/1 ui-monospace, Menlo, monospace';

  const blocks = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const x = L0 + c * (W + G), y = T0 + r * (H + G);
    const wrap = el('div', 'abs', cam, { left: x + 'px', top: y + 'px', width: W + 'px', height: H + 'px', perspective: '900px' });
    const card = el('div', 'abs', wrap, { inset: 0, transformStyle: 'preserve-3d' });
    const acc = accents[Math.floor(R() * accents.length)];
    const faceCss = { inset: 0, borderRadius: '14px', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden', boxShadow: '0 18px 40px rgba(0,0,0,.35)' };
    const front = el('div', 'abs', card, { ...faceCss, background: 'var(--ink)', border: '1px solid rgba(255,255,255,.07)' });
    el('div', 'abs', front, { left: 0, top: 0, bottom: 0, width: '6px', background: acc });
    const tm = el('div', 'abs', front, { left: '26px', top: '24px', font: mono, letterSpacing: '.1em', color: 'var(--mist)' });
    tm.textContent = times[Math.floor(R() * times.length)];
    el('div', 'abs', front, { left: '26px', top: '64px', width: 110 + R() * 90 + 'px', height: '16px', borderRadius: '8px', background: 'rgba(255,255,255,.55)' });
    el('div', 'abs', front, { left: '26px', top: '94px', width: 60 + R() * 70 + 'px', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,.18)' });
    for (let k = 0; k < 3; k++) el('div', 'abs', front, { right: 22 + k * 18 + 'px', top: '22px', width: '22px', height: '22px', borderRadius: '50%', background: accents[(k + r + c) % 4], border: '2px solid var(--ink)', opacity: 0.8 });

    const back = el('div', 'abs', card, { ...faceCss, transform: 'rotateY(180deg)', background: 'linear-gradient(160deg, #262e48, #1a2034)', border: '1px solid rgba(143,184,255,.35)' });
    const ic = el('div', 'abs', back, { left: '26px', top: '30px', width: '120px', height: '72px', borderRadius: '6px', border: '3px solid var(--sky)', background: 'rgba(143,184,255,.08)' });
    el('div', 'abs', ic, { left: '12px', top: '12px', width: '60px', height: '9px', borderRadius: '4px', background: 'var(--sky)' });
    [0, 1, 2].forEach((k) => el('div', 'abs', ic, { left: '12px', top: 30 + k * 11 + 'px', width: 80 - k * 18 + 'px', height: '5px', borderRadius: '3px', background: 'rgba(143,184,255,.55)' }));
    el('div', 'abs', back, { left: '96px', top: '104px', width: '4px', height: '14px', background: 'var(--sky)' });
    const lb = el('div', 'abs', back, { left: '164px', top: '40px', width: '80px', font: '700 16px/1.35 ui-monospace, Menlo, monospace', letterSpacing: '.08em', color: 'var(--mist)' });
    lb.textContent = 'SLIDES 45 MIN';
    blocks.push({ wrap, card, r, c, hero: r === HR && c === HC, d: Math.hypot(r - HR, c - HC) });
  }
  const hero = blocks.find((b) => b.hero);
  const others = blocks.filter((b) => !b.hero);

  const top = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const play = el('div', 'abs', top, { left: 960 - 100 + 'px', top: 540 - 100 + 'px', width: '200px', height: '200px', borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 30%, #ff9a80, var(--signal) 60%, #d8432a)', boxShadow: '0 0 90px rgba(255,107,74,.6), 0 30px 60px rgba(0,0,0,.4), inset 0 2px 0 rgba(255,255,255,.4)' });
  play.innerHTML = '<svg width="200" height="200" viewBox="0 0 200 200"><path d="M82 62 L144 100 L82 138 Z" fill="#fff" stroke="#fff" stroke-width="10" stroke-linejoin="round"/></svg>';
  const ring = el('div', 'abs', top, { left: 960 - 100 + 'px', top: 540 - 100 + 'px', width: '200px', height: '200px', borderRadius: '50%', border: '5px solid var(--signal)', opacity: 0 });

  const head = el('div', 'abs', top, { left: '120px', width: '1680px', top: '450px', textAlign: 'center', font: '800 120px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
  const l1 = el('div', '', head, {}), l2 = el('div', '', head, {});
  const w1 = ctx.split(l1, 'Async video', 'word'), w2 = ctx.split(l2, 'vs live meetings', 'word');
  w1[1].style.color = 'var(--signal)';
  const words = [...w1, ...w2];
  const sub = el('div', 'abs', top, { left: '120px', width: '1680px', top: '735px', textAlign: 'center', font: '500 44px/1.2 Inter', letterSpacing: '-.01em', color: 'var(--mist)' });
  sub.textContent = 'When a video saves everyone time';

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  blocks.forEach((b) => tl.from(b.wrap, { opacity: 0, y: 30, scale: 0.94, duration: 0.6 }, 0.02 + b.d * 0.06));
  tl.fromTo(cam, { scale: 1.06 }, { scale: 1.16, duration: tVideo - 0.3, ease: 'power1.inOut' }, 0);

  tl.to(hero.card, { rotationY: 180, duration: 0.7, ease: 'back.out(1.6)' }, tPres - 0.1);
  tl.to(hero.wrap, { scale: 1.08, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' }, tPres - 0.1);
  others.forEach((b) => tl.to(b.card, { rotationY: 180, duration: 0.6, ease: 'back.out(1.5)' }, tCal - 0.15 + b.d * 0.09));

  gsap.set(blocks.map((b) => b.wrap), { filter: 'blur(0px)' });
  others.forEach((b) => tl.to(b.wrap, { opacity: 0, scale: 0.7, filter: 'blur(10px)', duration: 0.55, ease: 'power2.in' }, tVideo - 0.45 + b.d * 0.035));
  tl.to(cam, { scale: 1.5, duration: 0.9, ease: 'expo.inOut' }, tVideo - 0.45);
  tl.to(hero.wrap, { opacity: 0, scale: 0.6, filter: 'blur(6px)', duration: 0.35, ease: 'power2.in' }, tVideo - 0.1);
  tl.fromTo(play, { scale: 0, opacity: 0, rotation: -25 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.9)' }, tVideo);
  tl.fromTo(ring, { scale: 0.9, opacity: 0.9 }, { scale: 2.2, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, tVideo + 0.1);
  tl.to(glow, { opacity: 1, duration: 0.6 }, tVideo);

  // play rises first, headline sets in only once the button has cleared the text band
  tl.to([play, ring], { y: -255, scale: 0.8, duration: 0.6, ease: 'expo.inOut' }, tSaves - 0.05);
  tl.to(glow, { y: -255, duration: 0.6, ease: 'expo.inOut' }, tSaves - 0.05);
  tl.from(words, { opacity: 0, y: 60, rotationX: -40, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)' }, tSaves + 0.45);
  tl.from(sub, { opacity: 0, y: 24, duration: 0.6 }, Math.max(tTime, tSaves + 0.75));

  tl.fromTo(ring, { scale: 0.8, opacity: 0.8 }, { scale: 1.9, opacity: 0, duration: 1.0, ease: 'power2.out', immediateRender: false }, tKeep);
  tl.to(play, { boxShadow: '0 0 140px rgba(255,107,74,.85), 0 30px 60px rgba(0,0,0,.4), inset 0 2px 0 rgba(255,255,255,.4)', duration: 0.5, yoyo: true, repeat: 1 }, tKeep);
  tl.fromTo(top, { scale: 1 }, { scale: 1.035, duration: ctx.dur - tSaves, ease: 'power1.inOut', immediateRender: false }, tSaves);
});

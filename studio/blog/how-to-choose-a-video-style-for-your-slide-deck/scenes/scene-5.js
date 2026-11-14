/* Scene 5 — "Decide the direction, then see it. On Pro, AI directs your video, shaping each scene to your tone.
 * Try Basic first, no subscription needed, at powerpoint2vid.com."
 * Storyboard: night stage. Three paper chips glow briefly at the top: speaker notes in your tone, captions,
 * cut-downs. On "see it" a plain slide card rises. From "AI directs" it wipes through the teal (clean),
 * amber (cinematic) and coral (bold) styles, landing a style on "directs", "shaping" and "tone".
 * On "Try Basic first" the card dissolves and powerpoint2vid.com lands in 130px amber at centre,
 * with "No subscription needed" beneath in paper. The URL holds to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const direction = A(0, 'direction,', 1.13), see = A(0, 'see', 2.22);
  const ai = A(1, 'AI', 3.76), directs = A(1, 'directs', 4.18), shaping = A(1, 'shaping', 5.36), tone = A(1, 'tone.', 6.72);
  const tryW = A(2, 'Try', 7.8), basic = A(2, 'Basic', 8.13), subs = A(2, 'subscription', 9.42), ppt = A(2, 'PowerPoint', 10.78), com = A(2, 'com.', 11.94);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 52%, #1a2140 0%, var(--night) 70%), var(--night)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* ambient glows behind card, one per style */
  const mkGlow = (c) => el('div', 'abs', cam, { left: '360px', top: '180px', width: '1200px', height: '760px', borderRadius: '50%', background: `radial-gradient(closest-side, ${c}, transparent)`, opacity: 0, filter: 'blur(20px)' });
  const gTeal = mkGlow('rgba(43,179,163,.45)'), gAmber = mkGlow('rgba(232,163,61,.45)'), gCoral = mkGlow('rgba(240,96,77,.5)');

  /* tips chips */
  const chipRow = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '110px', display: 'flex', justifyContent: 'center', gap: '28px' });
  const tips = ['Speaker notes in your tone', 'Captions', 'Cut-downs'];
  const chips = tips.map((t, i) => {
    const c = el('div', '', chipRow, { display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 30px', borderRadius: '999px', background: 'var(--paper)', color: 'var(--ink)', font: '700 30px/1 Inter', letterSpacing: '-.02em', boxShadow: '0 0 0px rgba(232,163,61,0), 0 16px 40px rgba(0,0,0,.4)' });
    const n = el('span', '', c, { font: `700 20px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--amber)' }); n.textContent = '0' + (i + 1);
    const s = el('span', '', c); s.textContent = t;
    return c;
  });

  /* slide card with four style layers */
  const CW = 880, CH = 495, CX = 520, CY = 290;
  const persp = el('div', 'abs', cam, { inset: 0, perspective: '1800px' });
  const card = el('div', 'abs', persp, { left: CX + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 50px 110px rgba(0,0,0,.6)' });
  const layer = (bg) => el('div', 'abs', card, { inset: 0, background: bg });
  const lines = (p, col, x, y, ws) => ws.forEach((w, i) => el('div', 'abs', p, { left: x + 'px', top: y + i * 46 + 'px', width: w + 'px', height: '16px', borderRadius: '8px', background: col }));

  const Lbase = layer('#ffffff');
  const tb = el('div', 'abs', Lbase, { left: '60px', top: '60px', font: '500 50px/1.1 Inter', color: '#222' }); tb.textContent = 'Decide the direction';
  lines(Lbase, '#d4d4d4', 60, 170, [560, 480, 520]);

  const Lteal = layer('var(--paper)');
  el('div', 'abs', Lteal, { left: 0, top: 0, width: '16px', height: '100%', background: 'var(--teal)' });
  const tt = el('div', 'abs', Lteal, { left: '70px', top: '70px', font: '800 54px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' }); tt.textContent = 'Decide the direction';
  el('div', 'abs', Lteal, { left: '70px', top: '150px', width: '90px', height: '6px', background: 'var(--teal)', borderRadius: '3px' });
  lines(Lteal, 'rgba(27,33,51,.18)', 70, 200, [520, 440, 480]);
  el('div', 'abs', Lteal, { right: '60px', bottom: '60px', width: '180px', height: '180px', borderRadius: '24px', background: 'rgba(43,179,163,.18)', border: '3px solid var(--teal)' });

  const Lamber = layer('radial-gradient(80% 90% at 70% 30%, #3a2a14 0%, #120f0c 70%)');
  el('div', 'abs', Lamber, { left: 0, top: 0, width: '100%', height: '56px', background: '#000' });
  el('div', 'abs', Lamber, { left: 0, bottom: 0, width: '100%', height: '56px', background: '#000' });
  const ta = el('div', 'abs', Lamber, { left: '0', width: '100%', top: '200px', textAlign: 'center', font: '300 56px/1 Inter Display, Inter', letterSpacing: '.02em', color: 'var(--amber)', textShadow: '0 0 30px rgba(232,163,61,.6)' }); ta.textContent = 'Decide the direction';
  el('div', 'abs', Lamber, { left: '390px', top: '290px', width: '100px', height: '2px', background: 'rgba(232,163,61,.7)' });

  const Lcoral = layer('var(--coral)');
  const tc = el('div', 'abs', Lcoral, { left: '60px', top: '90px', font: '900 120px/0.9 Inter Display, Inter', letterSpacing: '-.05em', color: '#fff' }); tc.innerHTML = 'DECIDE.<br>DIRECT.';
  el('div', 'abs', Lcoral, { left: '60px', top: '330px', width: '220px', height: '64px', borderRadius: '12px', background: 'var(--night)' });
  el('div', 'abs', Lcoral, { right: '-80px', top: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,.18)' });

  const styleLayers = [Lteal, Lamber, Lcoral];
  gsap.set(styleLayers, { clipPath: 'inset(0% 100% 0% 0%)' });
  const sweep = el('div', 'abs', card, { top: 0, left: '-120px', width: '80px', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.75), transparent)', opacity: 0 });

  const badge = el('div', 'abs', persp, { left: CX + CW - 250 + 'px', top: CY - 28 + 'px', padding: '14px 22px', borderRadius: '12px', background: 'var(--ink)', border: '2px solid var(--teal)', font: `700 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--paper)', boxShadow: '0 0 40px rgba(43,179,163,.45)' });
  badge.textContent = 'PRO · AI DIRECTED';
  const label = el('div', 'abs', cam, { left: CX + 'px', width: CW + 'px', top: CY + CH + 40 + 'px', textAlign: 'center', font: `600 24px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--slate)' });

  /* final CTA */
  const url = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '400px', textAlign: 'center', font: '800 130px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--amber)', textShadow: '0 0 60px rgba(232,163,61,.45)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  const uline = el('div', 'abs', cam, { left: '560px', width: '800px', top: '560px', height: '5px', borderRadius: '3px', background: 'linear-gradient(90deg, transparent, var(--amber), transparent)', transformOrigin: '50% 50%' });
  const sub = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '610px', textAlign: 'center', font: '600 46px/1 Inter', letterSpacing: '-.02em', color: 'var(--paper)' });
  sub.textContent = 'No subscription needed';
  const basicTag = el('div', 'abs', cam, { left: '810px', width: '300px', top: '310px', textAlign: 'center', font: `700 24px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--slate)' });
  basicTag.textContent = 'START ON BASIC';
  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(45% 35% at 50% 45%, rgba(232,163,61,.35), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    label.textContent = t < directs ? 'YOUR SLIDE' : t < shaping ? 'CLEAN · CORPORATE' : t < tone - 0.05 ? 'CALM · CINEMATIC' : 'BOLD · ENERGETIC';
  });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);

  // chips
  tl.from(chips, { y: -30, opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.12 }, 0.15);
  chips.forEach((c, i) => {
    tl.to(c, { boxShadow: '0 0 50px rgba(232,163,61,.7), 0 16px 40px rgba(0,0,0,.4)', duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, direction - 0.2 + i * 0.25);
  });
  tl.to(chips, { opacity: 0.35, scale: 0.92, duration: 0.8, ease: 'power2.inOut' }, ai - 0.3);

  // card arrives
  gsap.set(card, { filter: 'blur(0px) brightness(1)' });
  tl.from(card, { y: 60, opacity: 0, scale: 0.88, rotationX: 14, duration: 0.9, ease: 'back.out(1.4)' }, see - 0.2);
  tl.from(label, { opacity: 0, y: 14, duration: 0.5 }, see + 0.1);
  tl.from(badge, { scale: 0, opacity: 0, rotation: -8, duration: 0.55, ease: 'back.out(2)' }, ai - 0.05);
  tl.to(cam, { scale: '+=0.03', duration: 1.4, ease: 'expo.inOut' }, directs - 0.3);

  // morph through styles
  const marks = [directs - 0.1, shaping - 0.1, tone - 0.1];
  const glows = [gTeal, gAmber, gCoral];
  styleLayers.forEach((L, i) => {
    const t = marks[i];
    tl.to(L, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'expo.inOut' }, t);
    tl.fromTo(sweep, { x: 0, opacity: 1 }, { x: CW + 240, opacity: 0.2, duration: 0.55, ease: 'expo.inOut', immediateRender: false }, t);
    tl.to(card, { rotationY: i % 2 ? -6 : 6, duration: 0.28, ease: 'power2.out', yoyo: true, repeat: 1 }, t);
    tl.to(glows[i], { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, t);
    if (i > 0) tl.to(glows[i - 1], { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, t);
  });
  tl.to(label, { color: 'var(--paper)', duration: 0.4 }, directs);

  // dissolve on "Try"
  tl.to(card, { opacity: 0, scale: 1.12, filter: 'blur(18px) brightness(1.4)', duration: 0.7, ease: 'power2.in' }, tryW - 0.1);
  tl.to([badge, label, gCoral], { opacity: 0, duration: 0.5, ease: 'power2.in' }, tryW - 0.1);
  tl.to(chips, { opacity: 0, y: -20, duration: 0.5, stagger: 0.05, ease: 'power2.in' }, tryW - 0.1);

  // URL lands on "Basic"
  gsap.set([basicTag, sub, uline], { opacity: 0 });
  tl.fromTo(basicTag, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, basic - 0.1);
  tl.from(chars, { y: 90, opacity: 0, rotationX: -70, scale: 0.7, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.025 }, basic - 0.05);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.18, yoyo: true, repeat: 1, immediateRender: false }, basic + 0.35);
  tl.fromTo(sub, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)', immediateRender: false }, subs - 0.1);
  tl.fromTo(uline, { opacity: 1, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, ease: 'expo.inOut', immediateRender: false }, ppt - 0.1);
  tl.to(url, { textShadow: '0 0 110px rgba(232,163,61,.85)', duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, ppt);
  tl.to(chars, { y: -10, duration: 0.18, yoyo: true, repeat: 1, stagger: 0.02, ease: 'sine.out' }, com - 0.2);
});

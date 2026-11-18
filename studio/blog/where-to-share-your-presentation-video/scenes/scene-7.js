/* Scene 7 — "Turn one deck into videos for every channel. On Pro, a.i. directs each cut with a tight
 * story and punchy scenes. Try Basic first at powerpoint2vid.com."
 * Storyboard: night stage, the opening glowing video tile returns at center. On "deck" a .pptx file
 * drops onto it; on "videos" it multiplies into a row of five MP4 tiles lit sky / mint / coral. On "Pro"
 * a glowing PRO badge lands over the row; on "directs" a scan sweeps the row and the tiles reorder
 * crisply while their cut-lengths tighten (camera makes its one lateral pan here). On "Try" everything
 * recedes and "powerpoint2vid.com" lands at 130px in paper with a drawn coral underline, then holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const deck = A(0, 'deck', 1.4), videos = Math.max(A(0, 'videos', 1.9), deck + 0.45);
  const pro = A(1, 'Pro', 3.6), directs = Math.max(A(1, 'directs', 4.3), pro + 0.4), punchy = A(1, 'punchy', 6.2);
  const tryT = A(2, 'Try', 7.6), urlT = Math.max(A(2, 'powerpoint2vid.com', tryT + 0.9), tryT + 0.5);
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';
  const COL = ['var(--sky)', 'var(--mint)', 'var(--signal)', 'var(--sky)', 'var(--mint)'];
  const GLOW = ['rgba(79,163,255,.45)', 'rgba(61,214,165,.45)', 'rgba(255,107,74,.5)', 'rgba(79,163,255,.45)', 'rgba(61,214,165,.45)'];
  const NAMES = ['WEBSITE', 'YOUTUBE', 'LINKEDIN', 'COURSE', 'EMAIL'];

  stage.style.background = 'radial-gradient(60% 55% at 50% 48%, #1b2740 0%, var(--night) 70%)';
  const glowBg = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 50%, rgba(79,163,255,.18), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* hero tile from the opening */
  const hero = el('div', 'abs', cam, { left: '700px', top: '390px', width: '520px', height: '300px', borderRadius: '22px',
    background: 'linear-gradient(150deg, #24324d, #141c2c)', border: '2px solid rgba(79,163,255,.7)',
    boxShadow: '0 0 80px rgba(79,163,255,.45), 0 40px 90px rgba(0,0,0,.5)' });
  const play = el('div', 'abs', hero, { left: '225px', top: '110px', width: 0, height: 0, borderTop: '40px solid transparent', borderBottom: '40px solid transparent', borderLeft: '68px solid var(--paper)' });
  el('div', 'abs', hero, { left: '30px', right: '30px', bottom: '26px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.15)' });
  el('div', 'abs', hero, { left: '30px', width: '180px', bottom: '26px', height: '6px', borderRadius: '3px', background: 'var(--sky)' });

  /* the .pptx file */
  const ppt = el('div', 'abs', cam, { left: '850px', top: '400px', width: '220px', height: '280px', borderRadius: '14px 48px 14px 14px',
    background: 'linear-gradient(160deg, #fff8f0, var(--paper))', boxShadow: '0 30px 70px rgba(0,0,0,.55), 0 0 60px rgba(255,107,74,.35)' });
  const pLogo = el('div', 'abs', ppt, { left: '50px', top: '58px', width: '120px', height: '120px', borderRadius: '24px', background: 'var(--signal)',
    font: '900 84px/120px Inter Display, Inter', color: '#fff', textAlign: 'center', letterSpacing: '-.04em' });
  pLogo.textContent = 'P';
  const pLab = el('div', 'abs', ppt, { left: 0, right: 0, top: '208px', textAlign: 'center', font: '700 30px/1 ui-monospace, Menlo, monospace', color: 'var(--ink)' });
  pLab.textContent = '.PPTX';

  /* row of MP4 tiles */
  const TW = 300, TH = 190, GAP = 40, X0 = (1920 - (5 * TW + 4 * GAP)) / 2, TOP = 445;
  const slotX = (s) => X0 + s * (TW + GAP);
  const CUT0 = [0.85, 0.55, 0.3, 0.7, 0.45], CUT1 = [0.6, 0.4, 0.22, 0.5, 0.33];
  const tiles = NAMES.map((n, i) => {
    const w = el('div', 'abs', cam, { left: 0, top: TOP + 'px', width: TW + 'px', height: TH + 60 + 'px' });
    const card = el('div', 'abs', w, { left: 0, top: 0, width: TW + 'px', height: TH + 'px', borderRadius: '16px',
      background: 'linear-gradient(150deg, #23304a, #121a29)', border: `2px solid ${COL[i]}`, boxShadow: `0 0 50px ${GLOW[i]}, 0 30px 60px rgba(0,0,0,.45)` });
    el('div', 'abs', card, { left: '128px', top: '62px', width: 0, height: 0, borderTop: '26px solid transparent', borderBottom: '26px solid transparent', borderLeft: `44px solid ${COL[i]}` });
    const tag = el('div', 'abs', card, { left: '16px', top: '16px', font: '700 16px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: 'rgba(255,255,255,.75)' });
    tag.textContent = '.MP4';
    el('div', 'abs', card, { left: '18px', right: '18px', bottom: '20px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.14)' });
    const cut = el('div', 'abs', card, { left: '18px', width: (TW - 36) + 'px', bottom: '20px', height: '6px', borderRadius: '3px', background: COL[i], transformOrigin: '0 50%' });
    gsap.set(cut, { scaleX: CUT0[i] });
    const lab = el('div', 'abs', w, { left: 0, right: 0, top: TH + 22 + 'px', textAlign: 'center', font: MONO, letterSpacing: '.16em', color: 'var(--mist)' });
    lab.textContent = n;
    return { w, card, cut };
  });

  /* Pro badge + scan */
  const badge = el('div', 'abs', cam, { left: '760px', top: '300px', width: '400px', height: '72px', borderRadius: '36px', textAlign: 'center',
    background: 'linear-gradient(100deg, #ff8f72, var(--signal))', boxShadow: '0 0 60px rgba(255,107,74,.6)',
    font: '800 30px/72px Inter Display, Inter', letterSpacing: '.02em', color: '#fff' });
  badge.textContent = 'PRO · a.i. directed';
  const scan = el('div', 'abs', cam, { left: X0 - 40 + 'px', top: TOP - 30 + 'px', width: '6px', height: TH + 60 + 'px', borderRadius: '3px',
    background: 'var(--paper)', boxShadow: '0 0 40px 10px rgba(255,107,74,.6)', opacity: 0 });

  /* CTA */
  const cta = el('div', 'abs', stage, { left: '80px', right: '80px', top: '400px', textAlign: 'center', transformOrigin: '50% 60%' });
  const kicker = el('div', '', cta, { font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.24em', color: 'var(--signal)', marginBottom: '34px' });
  kicker.textContent = 'TRY BASIC FIRST';
  const url = el('div', '', cta, { display: 'inline-block', position: 'relative', font: '800 130px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', textShadow: '0 0 60px rgba(246,243,236,.25)' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  const under = el('div', 'abs', url, { left: '4px', right: '4px', bottom: '-22px', height: '12px', borderRadius: '6px', background: 'var(--signal)', boxShadow: '0 0 30px rgba(255,107,74,.7)', transformOrigin: '0 50%' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(tiles.map((t) => t.w), { x: slotX(2), opacity: 0, scale: 0.3 });
  gsap.set([ppt, badge, kicker], { opacity: 0 });
  gsap.set(under, { scaleX: 0 });
  gsap.set(chars, { opacity: 0, y: 60 });
  gsap.set(cam, { filter: 'blur(0px) brightness(1)' });

  // opening tile returns, slow push-in
  tl.fromTo(hero, { scale: 0.85, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0);
  tl.to(play, { scale: 1.12, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0.3);
  tl.to(cam, { scale: 1.04, duration: videos, ease: 'power1.inOut' }, 0);

  // "deck": pptx drops onto the tile
  tl.fromTo(ppt, { y: -700, rotation: -10, opacity: 1 }, { y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.4)', immediateRender: false }, deck - 0.4);
  tl.to(hero, { scale: 0.8, opacity: 0, duration: 0.4, ease: 'power2.in' }, deck - 0.05);
  tl.fromTo(ppt, { scaleY: 1 }, { scaleY: 0.9, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, deck + 0.1);

  // "videos": multiplies into the row
  tl.to(cam, { scale: 1, duration: 0.6, ease: 'expo.inOut' }, videos - 0.2);
  tl.to(ppt, { scale: 0.4, opacity: 0, duration: 0.3, ease: 'power2.in' }, videos - 0.1);
  tiles.forEach((t, i) => {
    tl.to(t.w, { x: slotX(i), scale: 1, opacity: 1, duration: 0.65, ease: 'back.out(1.5)' }, videos + 0.05 + Math.abs(i - 2) * 0.07);
  });
  tl.to(glowBg, { opacity: 0.6, duration: 0.6 }, videos);

  // "Pro": badge glows over the row
  tl.fromTo(badge, { opacity: 0, y: -30, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, pro);
  tl.to(badge, { boxShadow: '0 0 110px rgba(255,107,74,.95)', duration: 0.4, yoyo: true, repeat: 1 }, pro + 0.5);

  // "directs": scan + crisp reorder + tighter cuts, one lateral pan
  tl.to(scan, { opacity: 1, duration: 0.1 }, directs - 0.2);
  tl.fromTo(scan, { x: 0 }, { x: 5 * TW + 4 * GAP + 80, duration: 0.8, ease: 'power2.inOut', immediateRender: false }, directs - 0.2);
  tl.to(scan, { opacity: 0, duration: 0.15 }, directs + 0.55);
  const ORDER1 = [2, 0, 4, 1, 3], ORDER2 = [1, 3, 0, 4, 2];
  const r1 = directs + 0.35, r2 = Math.min(Math.max(r1 + 1.0, punchy - 0.3), tryT - 0.9);
  tiles.forEach((t, i) => {
    tl.to(t.w, { x: slotX(ORDER1[i]), duration: 0.55, ease: 'expo.inOut' }, r1 + i * 0.03);
    tl.to(t.w, { y: i % 2 ? 40 : -40, duration: 0.27, yoyo: true, repeat: 1, ease: 'sine.out' }, r1 + i * 0.03);
    tl.to(t.cut, { scaleX: CUT1[i], duration: 0.5, ease: 'back.out(1.6)' }, r1 + 0.3 + i * 0.05);
    tl.to(t.w, { x: slotX(ORDER2[i]), duration: 0.5, ease: 'expo.inOut' }, r2 + i * 0.03);
    tl.fromTo(t.card, { scale: 1 }, { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, r2 + 0.45 + ORDER2[i] * 0.05);
  });
  tl.fromTo(cam, { x: 0 }, { x: -50, duration: tryT - pro, ease: 'power1.inOut', immediateRender: false }, pro);

  // "Try": everything recedes, URL lands
  tl.to(cam, { scale: 0.82, y: -40, opacity: 0.14, filter: 'blur(8px) brightness(.6)', duration: 0.7, ease: 'expo.inOut' }, tryT - 0.1);
  tl.to(glowBg, { opacity: 1, duration: 0.8 }, tryT);
  tl.fromTo(kicker, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)', immediateRender: false }, tryT + 0.15);
  tl.to(chars, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.025 }, urlT - 0.35);
  tl.to(under, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, urlT + 0.2);
  tl.fromTo(cta, { scale: 1 }, { scale: 1.05, duration: ctx.dur - tryT, ease: 'power1.out', immediateRender: false }, tryT);
  tl.to(under, { boxShadow: '0 0 60px rgba(255,107,74,1)', duration: 0.5, yoyo: true, repeat: 1 }, urlT + 0.9);
});

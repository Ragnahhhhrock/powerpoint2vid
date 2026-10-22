/* Scene 4 — "Turn ordinary slides into extraordinary explainer videos. Start at powerpoint2vid.com."
 * Storyboard: finale on a drifting aurora. The promise is typeset word by word as it's spoken;
 * "ordinary" stays muted and "extraordinary" ignites. On the URL a button lands, a cursor glides in
 * and clicks it. Holds as an end card. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const b1 = ctx.beat(1), url = ctx.at(1, 'powerpoint2vid');

  stage.style.background = 'var(--night)';
  const blobs = [['#6d4aff', 900, 300, 260], ['#ff6b4a', 700, 1450, 760], ['#1fbf8f', 520, 420, 900], ['#8f75ff', 600, 1600, 120]].map(([c, s, x, y]) =>
    el('div', 'abs', stage, { width: s + 'px', height: s + 'px', left: x - s / 2 + 'px', top: y - s / 2 + 'px', borderRadius: '50%', background: c, filter: 'blur(140px)', opacity: 0.55 }));
  el('div', 'abs', stage, { inset: 0, background: 'linear-gradient(180deg, rgba(8,11,31,.35), rgba(8,11,31,.75))' });

  const logo = el('div', 'abs', stage, { left: '912px', top: '150px', width: '96px', height: '96px' });
  logo.innerHTML = '<svg viewBox="0 0 64 64" width="96" height="96"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6d4aff"/><stop offset="1" stop-color="#ff6b4a"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="url(#g)"/><rect x="12" y="16" width="40" height="28" rx="5" fill="#fff"/><path d="M28 24l12 6-12 6z" fill="#5b3df0"/><rect x="20" y="49" width="24" height="4" rx="2" fill="#fff" opacity=".85"/></svg>';

  const block = el('div', 'abs', stage, { left: 0, right: 0, top: '300px', textAlign: 'center', font: '800 118px/1.06 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff' });
  const rows = [['Turn', 'ordinary', 'slides'], ['into', 'extraordinary'], ['explainer', 'videos.']];
  const words = {};
  rows.forEach((r) => {
    const line = el('div', '', block, { whiteSpace: 'nowrap' });
    r.forEach((w, i) => {
      const s = el('span', '', line, { display: 'inline-block', margin: i ? '0 0 0 .26em' : '0' }); s.textContent = w; words[w] = s;
    });
  });
  words.ordinary.style.color = 'rgba(255,255,255,.38)';
  Object.assign(words.extraordinary.style, { background: 'linear-gradient(100deg, #b7a5ff 0%, #ff8f72 45%, #fff 50%, #ff8f72 55%, #ff6b4a 100%)', backgroundSize: '300% 100%', backgroundPosition: '100% 0', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: '.06em' });
  const strike = el('div', 'abs', words.ordinary, { left: '-2%', width: '104%', top: '54%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.5)', transformOrigin: '0 50%', transform: 'scaleX(0)' });

  const btn = el('div', 'abs', stage, { left: '50%', top: '760px', transform: 'translateX(-50%)', padding: '30px 54px', borderRadius: '999px', background: '#fff', color: 'var(--ink)', font: '800 46px/1 Inter', letterSpacing: '-.015em', whiteSpace: 'nowrap', boxShadow: '0 30px 80px rgba(109,74,255,.45)' });
  btn.innerHTML = 'powerpoint2vid.com <span style="color:#ff6b4a">→</span>';
  const ripple = el('div', 'abs', stage, { left: '1130px', top: '840px', width: '40px', height: '40px', marginLeft: '-20px', marginTop: '-20px', borderRadius: '50%', border: '4px solid #fff', opacity: 0 });
  const cursor = el('div', 'abs', stage, { left: '1130px', top: '840px', width: '44px', height: '56px', transformOrigin: '0 0', scale: '1.5' });
  cursor.innerHTML = '<svg width="44" height="56" viewBox="0 0 44 56"><path d="M3 3l0 42 11-10 8 18 8-4-8-17 15-1z" fill="#0e1330" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>';
  const sign = el('div', 'abs', stage, { left: 0, right: 0, bottom: '64px', textAlign: 'center', font: '600 26px/1 Inter', color: 'rgba(255,255,255,.55)', letterSpacing: '.02em' });
  sign.innerHTML = 'PowerPoint<b style="color:#a58bff">2Vid</b>&nbsp;&nbsp;·&nbsp;&nbsp;ordinary slides, extraordinary videos';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  blobs.forEach((b, i) => tl.to(b, { x: [160, -220, 260, -140][i], y: [120, -90, -160, 140][i], scale: [1.25, 0.85, 1.2, 1.1][i], duration: ctx.dur, ease: 'sine.inOut' }, 0));
  tl.from(logo, { scale: 0, rotation: -25, duration: 0.7, ease: 'back.out(2.2)' }, 0.15);
  tl.to(logo, { y: -6, duration: ctx.dur / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0.9);
  ['Turn', 'ordinary', 'slides', 'into', 'extraordinary', 'explainer', 'videos.'].forEach((w) => {
    const t = ctx.at(0, w.replace('.', '')) - 0.12;
    tl.from(words[w], { yPercent: 70, opacity: 0, filter: 'blur(14px)', duration: 0.55, ease: 'back.out(1.8)' }, t);
  });
  tl.to(strike, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, ctx.at(0, 'slides'));
  const ex = ctx.at(0, 'extraordinary');
  tl.fromTo(words.extraordinary, { scale: 1 }, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, ex + 0.35);
  tl.to(words.extraordinary, { backgroundPosition: '0% 0', duration: 1.4, ease: 'power2.inOut' }, ex + 0.2);

  tl.from(btn, { y: 50, opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(1.8)' }, b1 - 0.1);
  tl.from(cursor, { x: 380, y: 160, opacity: 0, duration: 0.9, ease: 'power3.out' }, b1 + 0.1);
  const click = Math.max(url + 0.2, b1 + 1.05);
  tl.to(cursor, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, click);
  tl.to(btn, { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }, click);
  tl.fromTo(ripple, { scale: 0.5, opacity: 0.9 }, { scale: 4, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, click);
  tl.to(btn, { boxShadow: '0 30px 110px rgba(255,107,74,.6)', duration: 0.6 }, click);
  tl.from(sign, { opacity: 0, y: 12, duration: 0.6 }, click + 0.3);
});

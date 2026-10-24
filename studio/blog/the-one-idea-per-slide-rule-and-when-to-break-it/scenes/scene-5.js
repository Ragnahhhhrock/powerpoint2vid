/* Scene 5 — "A deck built on one idea per slide is already most of the way to a good video. On Pro, a.i.
 *            directs it, giving every idea its own animated scene, timed to the narration. Try it at
 *            powerpoint2vid.com."
 * Storyboard: five clean single-idea slide cards in a row; on "a.i. directs" each comes alive as its own
 * animated scene and a "Directed by a.i." badge sweeps in; the finish settles on the wordmark and URL. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const vidT = ctx.at(0, 'good video'), dirT = ctx.at(1, 'directs'), sceneT = ctx.at(1, 'animated'), narrT = ctx.at(1, 'narration'), tryT = ctx.at(2, 'Try');
  stage.style.background = 'radial-gradient(90% 80% at 50% 45%, #1d1a54 0%, #0a0d24 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  el('div', 'abs', cam, { left: '-200px', top: '-260px', width: '900px', height: '900px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,74,255,.5), rgba(109,74,255,0) 65%)' });
  el('div', 'abs', cam, { right: '-260px', bottom: '-300px', width: '1000px', height: '1000px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,.35), rgba(255,107,74,0) 65%)' });

  const main = el('div', 'abs', cam, { inset: 0 });
  const heads = ['Revenue grew', 'Two new customers', 'Churn is rising', 'We are hiring', 'The plan'];
  const CW = 320, CH = 180, GAP = 34, X0 = (1920 - (5 * CW + 4 * GAP)) / 2, Y = 380;
  const cols = ['#6d4aff', '#8f75ff', '#ff6b4a', '#5eead4', '#ffb547'];
  const cards = heads.map((h, i) => {
    const c = el('div', 'abs', main, { left: X0 + i * (CW + GAP) + 'px', top: Y + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '18px', background: '#fff', boxShadow: '0 30px 70px rgba(0,0,0,.5)', overflow: 'hidden' });
    const t = el('div', 'abs', c, { left: '20px', top: '18px', right: '16px', font: '800 26px/1.1 Inter Display, Inter', letterSpacing: '-.02em', color: '#0e1330' }); t.textContent = h;
    const m = el('div', 'abs', c, { left: 0, right: 0, bottom: 0, height: '92px' });
    return { c, t, m, col: cols[i] };
  });
  // motifs that "come alive" on a.i. direction
  const mot = cards.map((o, i) => {
    if (i === 0) return [0, 1, 2, 3].map((k) => el('div', 'abs', o.m, { left: 26 + k * 60 + 'px', bottom: '0', width: '44px', height: 20 + k * 18 + 'px', borderRadius: '8px 8px 0 0', background: k === 3 ? o.col : '#d9d3f8', transformOrigin: '50% 100%' }));
    if (i === 1) return [el('div', 'abs', o.m, { left: '22px', top: '8px', font: '900 76px/1 Inter Display, Inter', letterSpacing: '-.05em', color: o.col })].map((n) => { n.textContent = '+2'; return n; });
    if (i === 2) { const s = el('div', 'abs', o.m, { inset: 0 }); s.innerHTML = '<svg width="320" height="92" viewBox="0 0 320 92" fill="none"><path d="M24 70 C90 66 140 52 190 38 S270 20 296 14" stroke="#ff6b4a" stroke-width="8" stroke-linecap="round"/></svg>'; return [s.querySelector('path')]; }
    if (i === 3) return [0, 1, 2].map((k) => el('div', 'abs', o.m, { left: 26 + k * 70 + 'px', top: '10px', width: '56px', height: '56px', borderRadius: '50%', background: ['#8f75ff', '#5eead4', '#ffb547'][k] }));
    return [0, 1, 2].map((k) => el('div', 'abs', o.m, { left: 26 + k * 82 + 'px', top: '26px', width: '66px', height: '12px', borderRadius: '6px', background: ['#c9c0f7', '#ffd27a', '#ff9a7a'][k] }));
  });

  const head = el('div', 'abs', stage, { left: 0, right: 0, top: '150px', textAlign: 'center', font: '900 92px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
  head.innerHTML = 'One idea per slide<br><span style="color:#8f75ff">is a head start.</span>';
  const badge = el('div', 'abs', stage, { left: '50%', top: '640px', padding: '20px 36px', borderRadius: '999px', background: 'linear-gradient(100deg,#6d4aff,#8f75ff)', boxShadow: '0 0 60px rgba(109,74,255,.7)', font: '800 40px/1 Inter', color: '#fff', whiteSpace: 'nowrap', marginLeft: '-190px' });
  badge.innerHTML = '✦ Pro · Directed by a.i.';
  const sweep = el('div', 'abs', badge, { left: '-40%', top: 0, width: '40%', height: '100%', background: 'linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent)' });
  badge.style.overflow = 'hidden';
  const strip = el('div', 'abs', main, { left: X0 + 'px', top: Y + CH + 60 + 'px', width: 5 * CW + 4 * GAP + 'px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.16)' });
  const sf = el('div', 'abs', strip, { left: 0, top: 0, width: '100%', height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg,#8f75ff,#ff6b4a)', transformOrigin: '0 50%' });

  /* finale */
  const fin = el('div', 'abs', stage, { inset: 0, opacity: 0 });
  const logo = el('div', 'abs', fin, { left: '50%', top: '300px', width: '150px', height: '150px', marginLeft: '-75px' });
  logo.innerHTML = '<svg viewBox="0 0 64 64" width="150" height="150"><rect width="64" height="64" rx="16" fill="#6d4aff"/><rect x="12" y="16" width="40" height="28" rx="5" fill="#fff"/><path d="M28 24l12 6-12 6z" fill="#5b3df0"/><rect x="20" y="49" width="24" height="4" rx="2" fill="#fff" opacity=".85"/></svg>';
  const wm = el('div', 'abs', fin, { left: 0, right: 0, top: '480px', textAlign: 'center', font: '900 130px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff' });
  wm.innerHTML = 'PowerPoint<span style="color:#8f75ff">2Vid</span>';
  const url = el('div', 'abs', fin, { left: 0, right: 0, top: '650px', textAlign: 'center', font: '700 52px/1 Inter', letterSpacing: '-.01em', color: '#ff9a7a' });
  url.textContent = 'powerpoint2vid.com';

  ctx.fx.vignette({ strength: 0.55 }); ctx.fx.grain({ opacity: 0.06 });

  /* timeline */
  tl.to(cam, { scale: 1.05, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(head, { opacity: 0, y: 40, duration: 0.8, ease: 'back.out(1.4)' }, 0.3);
  cards.forEach((o, i) => tl.from(o.c, { opacity: 0, y: 90, scale: 0.85, rotate: (i - 2) * 2, duration: 0.7, ease: 'back.out(1.6)' }, 1.0 + i * 0.22));
  tl.from(strip, { opacity: 0, duration: 0.5 }, vidT - 0.6);
  tl.fromTo(sf, { scaleX: 0 }, { scaleX: 1, duration: 2.6, ease: 'power1.inOut', immediateRender: false }, vidT - 0.4);
  tl.to(cards.map((o) => o.c), { y: -12, duration: 0.5, stagger: 0.08, yoyo: true, repeat: 1, ease: 'sine.inOut' }, vidT);

  // a.i. directs: badge + each card comes alive
  gsap.set(badge, { opacity: 0 });
  tl.fromTo(badge, { opacity: 0, scale: 0.5, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, dirT - 0.2);
  tl.fromTo(sweep, { x: 0 }, { x: 900, duration: 0.9, ease: 'power2.inOut', immediateRender: false }, dirT + 0.4);
  tl.to(head, { opacity: 0, y: -20, duration: 0.4 }, dirT - 0.4);
  mot[0].forEach((b, k) => tl.from(b, { scaleY: 0, duration: 0.5, ease: 'back.out(1.8)' }, sceneT + k * 0.08));
  tl.from(mot[1], { scale: 0.3, opacity: 0, duration: 0.5, ease: 'back.out(2)', transformOrigin: '0 50%' }, sceneT + 0.15);
  tl.fromTo(mot[2][0], { strokeDasharray: 400, strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', immediateRender: false }, sceneT + 0.25);
  tl.from(mot[3], { scale: 0, duration: 0.45, stagger: 0.1, ease: 'back.out(2.2)' }, sceneT + 0.35);
  tl.from(mot[4], { scaleX: 0, transformOrigin: '0 50%', duration: 0.5, stagger: 0.1 }, sceneT + 0.45);
  cards.forEach((o, i) => tl.to(o.c, { boxShadow: `0 0 0 4px ${o.col}, 0 30px 80px ${o.col}88`, duration: 0.4, yoyo: true, repeat: 1 }, narrT - 0.8 + i * 0.16));

  // finale
  tl.to(main, { opacity: 0, scale: 0.9, duration: 0.6 }, tryT - 0.6);
  tl.to([badge], { opacity: 0, duration: 0.4 }, tryT - 0.6);
  tl.to(fin, { opacity: 1, duration: 0.5 }, tryT - 0.4);
  gsap.set([logo, wm, url], { filter: 'blur(0px)' });
  tl.from(logo, { scale: 0.3, rotate: -20, opacity: 0, duration: 0.7, ease: 'back.out(2)' }, tryT - 0.3);
  tl.from(wm, { opacity: 0, y: 40, filter: 'blur(12px)', duration: 0.7 }, tryT);
  tl.from(url, { opacity: 0, y: 30, duration: 0.6 }, ctx.at(2, 'powerpoint2vid') - 0.2);
  tl.to(logo, { y: -10, duration: 1.1, yoyo: true, repeat: 3, ease: 'sine.inOut' }, tryT + 0.8);
});

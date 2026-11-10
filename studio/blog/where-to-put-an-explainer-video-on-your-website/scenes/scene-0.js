/* Scene 0 — "You've made the explainer video. Now where does it go? In the wrong spot it's decoration;
 * in the right spot, it works every day."
 * Storyboard: night stage. A lone video thumbnail with a coral play button drifts in empty space.
 * On "where does it go?" the headline "Where to Put an Explainer Video" types in at 120px above it.
 * On "decoration" the thumbnail settles into a faint picture frame and dims to mist, like an unwatched painting.
 * On "right spot" the frame becomes a browser window. On "works every day" the camera pushes in and the
 * play button pulses coral. The plain title slide is rebuilt; nothing else from it is kept. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const where = T(1, 'where', 2.82), decor = T(2, 'decoration', 5.2), right = T(2, 'right', 6.361),
        works = T(2, 'works', 7.151), day = T(2, 'day', 7.812);
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 58%, #1c2440 0%, var(--night) 75%)';
  const world = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 600px' });

  /* drifting dust in empty space */
  const R = ctx.rand(7);
  const dust = Array.from({ length: 46 }, () => {
    const s = 2 + R() * 3;
    const d = el('div', 'abs', world, { left: R() * 1920 + 'px', top: R() * 1080 + 'px', width: s + 'px', height: s + 'px', borderRadius: '50%', background: '#C9CEDB', opacity: 0.08 + R() * 0.2 });
    return { d, vx: (R() - 0.5) * 14, vy: -4 - R() * 10 };
  });

  /* gallery wall-light (for "decoration") */
  const wallLight = el('div', 'abs', world, { left: '360px', top: '260px', width: '1200px', height: '760px', background: 'radial-gradient(50% 50% at 50% 30%, rgba(201,206,219,.13), transparent 70%)', opacity: 0 });

  /* headline: two lines, typed */
  const head = el('div', 'abs', world, { left: '80px', width: '1760px', top: '96px', textAlign: 'center', font: '800 120px/0.98 Inter Display, Inter', letterSpacing: '-.04em', color: '#F6F3EC' });
  const l1 = el('div', '', head, {}), l2 = el('div', '', head, { color: '#FF8F72' });
  const chars = [...ctx.split(l1, 'Where to Put an', 'char'), ...ctx.split(l2, 'Explainer Video', 'char')];
  const caret = el('div', 'abs', head, { width: '8px', height: '104px', background: '#FF6B4A', borderRadius: '3px', opacity: 0 });
  const TYPE0 = where, CH = 0.032, TYPE1 = TYPE0 + chars.length * CH;

  const cam = el('div', 'abs', world, { inset: 0, transformOrigin: '960px 680px' });

  /* picture frame */
  const frame = el('div', 'abs', cam, { left: '518px', top: '378px', width: '884px', height: '534px', boxSizing: 'border-box', border: '18px solid rgba(201,206,219,.24)', borderRadius: '4px',
    boxShadow: 'inset 0 0 0 3px rgba(201,206,219,.12), 0 0 0 2px rgba(201,206,219,.1), 0 40px 90px rgba(0,0,0,.55)', opacity: 0 });
  const plaque = el('div', 'abs', cam, { left: '810px', top: '936px', width: '300px', textAlign: 'center', font: MONO, letterSpacing: '.18em', color: 'rgba(201,206,219,.6)', opacity: 0 });
  plaque.textContent = 'DECORATION';

  /* browser window */
  const browser = el('div', 'abs', cam, { left: '300px', top: '380px', width: '1320px', height: '560px', borderRadius: '18px', overflow: 'hidden', background: '#F6F3EC', boxShadow: '0 50px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.08)', opacity: 0 });
  const bar = el('div', 'abs', browser, { left: 0, top: 0, width: '100%', height: '52px', background: '#E4E0D7' });
  ['#FF6B4A', '#C9CEDB', '#3DD6A3'].forEach((c, i) => el('div', 'abs', bar, { left: 24 + i * 26 + 'px', top: '19px', width: '14px', height: '14px', borderRadius: '50%', background: c }));
  const url = el('div', 'abs', bar, { left: '420px', top: '12px', width: '480px', height: '28px', borderRadius: '14px', background: '#F6F3EC' });
  el('div', 'abs', url, { left: '20px', top: '11px', width: '180px', height: '6px', borderRadius: '3px', background: '#C9CEDB' });
  const sk = [
    [820, 110, 120, 12, '#3DD6A3'], [820, 140, 400, 30, '#1B2238'], [820, 184, 300, 30, '#1B2238'],
    [820, 248, 440, 12, '#C9CEDB'], [820, 272, 420, 12, '#C9CEDB'], [820, 296, 360, 12, '#C9CEDB'],
  ].map(([x, y, w, h, c]) => el('div', 'abs', browser, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', borderRadius: h / 2 + 'px', background: c }));
  const cta = el('div', 'abs', browser, { left: '820px', top: '346px', width: '210px', height: '58px', borderRadius: '29px', background: '#FF6B4A', boxShadow: '0 10px 30px rgba(255,107,74,.4)' });
  sk.push(cta);

  /* the video thumbnail */
  const vid = el('div', 'abs', cam, { left: '560px', top: '420px', width: '800px', height: '450px', transformOrigin: '0 0' });
  const float = el('div', 'abs', vid, { inset: 0 });
  const thumb = el('div', 'abs', float, { inset: 0, borderRadius: '16px', overflow: 'hidden', background: 'linear-gradient(135deg, #2a3560 0%, #1B2238 55%, #141a2e 100%)', boxShadow: '0 40px 100px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.12)' });
  el('div', 'abs', thumb, { inset: 0, background: 'radial-gradient(60% 70% at 25% 20%, rgba(91,140,255,.35), transparent 70%)' });
  [[70, 70, 260, 26, 'rgba(246,243,236,.85)'], [70, 112, 190, 26, 'rgba(246,243,236,.85)'], [70, 166, 220, 10, 'rgba(201,206,219,.4)']].forEach(([x, y, w, h, c]) =>
    el('div', 'abs', thumb, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', borderRadius: h / 2 + 'px', background: c }));
  [120, 180, 150, 240].forEach((h, i) => el('div', 'abs', thumb, { left: 520 + i * 54 + 'px', top: 330 - h + 'px', width: '36px', height: h + 'px', borderRadius: '8px 8px 2px 2px', background: i === 3 ? '#3DD6A3' : 'rgba(91,140,255,.55)' }));
  el('div', 'abs', thumb, { left: '30px', right: '30px', bottom: '28px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.18)' });
  el('div', 'abs', thumb, { left: '30px', width: '170px', bottom: '28px', height: '6px', borderRadius: '3px', background: '#FF6B4A' });
  const rings = [0, 1].map(() => el('div', 'abs', float, { left: '330px', top: '155px', width: '140px', height: '140px', borderRadius: '50%', border: '5px solid #FF6B4A', boxSizing: 'border-box', opacity: 0 }));
  const play = el('div', 'abs', float, { left: '330px', top: '155px', width: '140px', height: '140px', borderRadius: '50%', background: '#FF6B4A', boxShadow: '0 0 50px rgba(255,107,74,.55), 0 14px 30px rgba(0,0,0,.4)' });
  el('div', 'abs', play, { left: '54px', top: '40px', width: 0, height: 0, borderTop: '30px solid transparent', borderBottom: '30px solid transparent', borderLeft: '46px solid #fff' });
  const veil = el('div', 'abs', float, { inset: 0, borderRadius: '16px', background: 'rgba(201,206,219,.16)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* per-frame: dust, float, typing */
  ctx.onFrame((t) => {
    dust.forEach((p, i) => gsap.set(p.d, { x: p.vx * t, y: p.vy * t }));
    const settle = t < decor - 0.3 ? 1 : Math.max(0, 1 - (t - (decor - 0.3)) / 0.8);
    gsap.set(float, { y: Math.sin(t * 1.3) * 14 * settle, rotation: Math.sin(t * 0.9 + 1) * 1.1 * settle });
    const n = Math.max(0, Math.min(chars.length, Math.floor((t - TYPE0) / CH)));
    chars.forEach((c, i) => { c.style.opacity = i < n ? 1 : 0; });
    if (t < TYPE0 - 0.1 || t > TYPE1 + 0.9) { caret.style.opacity = 0; return; }
    const c = chars[Math.max(0, n - 1)];
    const lx = n === 0 ? c.offsetLeft : c.offsetLeft + c.offsetWidth;
    caret.style.left = lx + 6 + 'px';
    caret.style.top = c.offsetTop + 10 + 'px';
    caret.style.opacity = t < TYPE1 ? 1 : (Math.floor((t - TYPE1) * 4) % 2 ? 0 : 1);
  });

  /* ---- timeline ---- */
  gsap.set(thumb, { filter: 'grayscale(0) brightness(1)' });
  gsap.set(play, { filter: 'grayscale(0) brightness(1)' });
  tl.to(world, { scale: 1.015, duration: ctx.dur, ease: 'none' }, 0);

  // lone thumbnail, centred, drifting
  tl.fromTo(vid, { opacity: 0, scale: 0.92, y: -110 }, { opacity: 1, scale: 1, y: -110, duration: 1.0, ease: 'power2.out' }, 0.05);
  tl.fromTo(play, { scale: 0.6 }, { scale: 1, duration: 0.8, ease: 'back.out(1.8)' }, T(0, 'video', 1.915) - 0.3);

  // "where does it go?" — headline types, video makes room
  tl.to(vid, { y: 0, duration: 1.0, ease: 'expo.inOut' }, where - 0.35);

  // "decoration" — framed, dimmed to mist
  tl.fromTo(frame, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)' }, decor - 0.25);
  tl.to(wallLight, { opacity: 1, duration: 0.8 }, decor - 0.2);
  tl.fromTo(plaque, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, decor + 0.15);
  tl.to(thumb, { filter: 'grayscale(1) brightness(.55)', duration: 0.8, ease: 'power2.inOut' }, decor);
  tl.to(play, { filter: 'grayscale(1) brightness(.75)', boxShadow: '0 0 0px rgba(255,107,74,0), 0 14px 30px rgba(0,0,0,.4)', duration: 0.8 }, decor);
  tl.to(veil, { opacity: 1, duration: 0.8 }, decor);
  tl.to(head, { opacity: 0.55, duration: 0.8 }, decor);

  // "right spot" — frame becomes a browser, video finds its place on the page
  tl.to([frame, plaque, wallLight], { opacity: 0, scale: 1.04, duration: 0.5, ease: 'power2.in' }, right - 0.25);
  tl.fromTo(browser, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.3)' }, right - 0.05);
  tl.to(vid, { x: -220, y: 56, scale: 0.92, duration: 0.9, ease: 'expo.inOut' }, right - 0.1);
  tl.fromTo(sk, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(1.6)' }, right + 0.25);
  tl.to(thumb, { filter: 'grayscale(0) brightness(1)', duration: 0.6 }, right + 0.1);
  tl.to(play, { filter: 'grayscale(0) brightness(1)', boxShadow: '0 0 50px rgba(255,107,74,.55), 0 14px 30px rgba(0,0,0,.4)', duration: 0.6 }, right + 0.1);
  tl.to(veil, { opacity: 0, duration: 0.6 }, right + 0.1);
  tl.to(head, { opacity: 1, duration: 0.6 }, right);

  // "works every day" — push in, coral pulse
  tl.to(cam, { scale: 1.06, duration: Math.max(1, ctx.dur - works + 0.2), ease: 'power2.inOut' }, works - 0.2);
  tl.to(thumb, { boxShadow: '0 40px 100px rgba(0,0,0,.5), 0 0 80px rgba(255,107,74,.35), inset 0 1px 0 rgba(255,255,255,.12)', duration: 0.6 }, works);
  [works, day].forEach((tt, k) => {
    tl.to(play, { scale: 1.14, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 }, tt);
    rings.forEach((r, j) => tl.fromTo(r, { scale: 1, opacity: 0.9 }, { scale: 2.1, opacity: 0, duration: 1.0, ease: 'power2.out', immediateRender: false }, tt + j * 0.18));
  });
  tl.to(play, { boxShadow: '0 0 90px rgba(255,107,74,.9), 0 14px 30px rgba(0,0,0,.4)', duration: 0.5 }, day);
});

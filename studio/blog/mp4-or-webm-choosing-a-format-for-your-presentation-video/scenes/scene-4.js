/* Scene 5 — "Take a five-minute product overview saved as WebM. Embed it on your site, upload to YouTube, and convert once for the LMS. Then watch it through to check sync."
 * Storyboard: Night stage. A green WebM file (5-min product overview) sits left; three branches fan right to a browser tile,
 * a video-platform tile and an LMS tile. On 'embed' a copy drops into the browser; on 'upload' a copy flies to YouTube; on
 * 'convert once' a copy passes through an amber converter ring, turns blue MP4 and lands in the LMS. On 'check sync' a playhead
 * scrubs a waveform aligned to frames and an amber tick marks the sync point. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const five = T(0, 'five-minute', 0.92), product = T(0, 'product', 1.49), webm = T(0, 'WebM.', 3.02);
  const embed = T(1, 'Embed', 4.1), site = T(1, 'site,', 4.9), upload = T(1, 'upload', 5.49), yt = T(1, 'YouTube,', 6.07);
  const convert = T(1, 'convert', 7.04), once = T(1, 'once', 7.5), lms = T(1, 'LMS.', 7.99);
  const then = T(2, 'Then', 9.17), watch = T(2, 'watch', 9.44), sync = T(2, 'sync.', 10.59);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(55% 60% at 18% 50%, rgba(46,196,160,.16) 0%, transparent 70%), radial-gradient(50% 60% at 82% 70%, rgba(61,123,255,.14) 0%, transparent 70%), var(--night)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  const tagTop = el('div', 'abs', cam, { left: '120px', top: '96px', font: '600 22px/1 ' + MONO, letterSpacing: '.14em', color: 'var(--slate)' });
  tagTop.textContent = 'ONE VIDEO · THREE DESTINATIONS';

  /* branches */
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const ys = [235, 555, 875];
  svgWrap.innerHTML = '<svg width="1920" height="1080">' + ys.map((y) => `<path pathLength="1" d="M380 510 C 700 510, 900 ${y}, 1260 ${y}" fill="none" stroke="rgba(138,144,166,.55)" stroke-width="3" stroke-dasharray="1" stroke-dashoffset="1" stroke-linecap="round"/>`).join('') + '</svg>';
  const paths = Array.from(svgWrap.querySelectorAll('path'));

  /* converter ring on the LMS branch (bezier midpoint ~ 805, 693) */
  const ring = el('div', 'abs', cam, { left: '720px', top: '608px', width: '170px', height: '170px', borderRadius: '50%', border: '8px solid var(--amber)', boxSizing: 'border-box', boxShadow: '0 0 40px rgba(255,181,71,.45), inset 0 0 30px rgba(255,181,71,.25)' });
  const ringLab = el('div', 'abs', cam, { left: '695px', top: '800px', width: '220px', textAlign: 'center', font: '600 18px/1 ' + MONO, letterSpacing: '.14em', color: 'var(--amber)' });
  ringLab.textContent = 'CONVERT';

  /* destination tiles */
  const tileDefs = [['Website', 'EMBED · WEBM', 'web'], ['YouTube', 'UPLOAD · WEBM', 'yt'], ['LMS', 'MP4 ONLY', 'lms']];
  const baseShadow = '0 20px 60px rgba(0,0,0,.45), 0 0 0 2px rgba(255,255,255,.08), 0 0 0px rgba(46,196,160,0)';
  const tiles = tileDefs.map(([name, sub, kind], i) => {
    const t = el('div', 'abs', cam, { left: '1260px', top: (110 + i * 320) + 'px', width: '520px', height: '230px', borderRadius: '20px', background: 'linear-gradient(160deg, #1c1f2c, var(--ink))', boxShadow: baseShadow, overflow: 'hidden' });
    const bar = el('div', 'abs', t, { left: 0, top: 0, right: 0, height: '34px', background: 'rgba(255,255,255,.05)' });
    if (kind === 'web') { ['#ff6b5a', '#FFB547', '#2EC4A0'].forEach((c, k) => el('div', 'abs', bar, { left: (16 + k * 20) + 'px', top: '12px', width: '11px', height: '11px', borderRadius: '50%', background: c })); }
    if (kind === 'yt') { el('div', 'abs', bar, { left: '16px', top: '9px', width: '26px', height: '17px', borderRadius: '5px', background: '#ff3b3b' }); }
    if (kind === 'lms') { [0, 1, 2].forEach((k) => el('div', 'abs', bar, { left: (16 + k * 46) + 'px', top: '14px', width: '36px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.18)' })); }
    el('div', 'abs', t, { left: '60px', top: '52px', width: '140px', height: '150px', borderRadius: '14px', border: '2px dashed rgba(138,144,166,.35)', boxSizing: 'border-box' });
    const n = el('div', 'abs', t, { left: '240px', top: '82px', width: '260px', font: '800 40px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' }); n.textContent = name;
    const s = el('div', 'abs', t, { left: '242px', top: '138px', width: '260px', font: '600 18px/1 ' + MONO, letterSpacing: '.1em', color: 'var(--slate)' }); s.textContent = sub;
    return t;
  });

  /* file card */
  const fileCard = (parent) => {
    const f = el('div', 'abs', parent, { left: '200px', top: '400px', width: '180px', height: '220px', transformOrigin: '50% 50%' });
    const g = el('div', 'abs', f, { inset: 0, borderRadius: '18px', background: 'linear-gradient(160deg, #6fe6c8, #2EC4A0 55%, #1b8a70)', boxShadow: '0 30px 70px rgba(46,196,160,.35)' });
    const b = el('div', 'abs', f, { inset: 0, borderRadius: '18px', background: 'linear-gradient(160deg, #8fb4ff, #3D7BFF 55%, #2450c0)', boxShadow: '0 30px 80px rgba(61,123,255,.5)', opacity: 0 });
    el('div', 'abs', f, { right: 0, top: 0, width: '46px', height: '46px', background: 'rgba(255,255,255,.35)', borderRadius: '0 18px 0 14px' });
    el('div', 'abs', f, { left: '72px', top: '62px', width: 0, height: 0, borderTop: '24px solid transparent', borderBottom: '24px solid transparent', borderLeft: '38px solid rgba(255,255,255,.95)' });
    const e1 = el('div', 'abs', f, { left: 0, right: 0, bottom: '30px', textAlign: 'center', font: '800 38px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff' }); e1.textContent = 'WEBM';
    const e2 = el('div', 'abs', f, { left: 0, right: 0, bottom: '30px', textAlign: 'center', font: '800 38px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff', opacity: 0 }); e2.textContent = 'MP4';
    return { f, g, b, e1, e2 };
  };
  const copies = [fileCard(cam), fileCard(cam), fileCard(cam)];
  const src = fileCard(cam);
  const badge = el('div', 'abs', src.f, { left: '14px', top: '14px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(11,13,23,.75)', font: '700 18px/1 ' + MONO, color: '#fff' }); badge.textContent = '5:00';
  const srcLab = el('div', 'abs', cam, { left: '110px', top: '650px', width: '360px', textAlign: 'center', font: '600 20px/1.3 ' + MONO, letterSpacing: '.12em', color: 'var(--paper)' });
  srcLab.textContent = '5-MIN PRODUCT OVERVIEW';

  /* sync panel */
  const panel = el('div', 'abs', stage, { left: '360px', top: '260px', width: '1200px', height: '520px', borderRadius: '24px', background: 'rgba(20,22,31,.97)', boxShadow: '0 50px 120px rgba(0,0,0,.6), 0 0 0 2px rgba(255,255,255,.08)', overflow: 'hidden' });
  const pLab = el('div', 'abs', panel, { left: '55px', top: '38px', font: '600 20px/1 ' + MONO, letterSpacing: '.14em', color: 'var(--slate)' }); pLab.textContent = 'SYNC CHECK · MP4';
  for (let k = 0; k < 10; k++) el('div', 'abs', panel, { left: (55 + k * 109) + 'px', top: '110px', width: '100px', height: '110px', borderRadius: '8px', background: `linear-gradient(${140 + k * 12}deg, rgba(61,123,255,.55), rgba(46,196,160,.25) 60%, rgba(255,255,255,.05))` });
  const SPIKE = 38;
  for (let k = 0; k < 64; k++) {
    const h = k === SPIKE ? 170 : 18 + 100 * Math.abs(Math.sin(k * 1.7) * Math.cos(k * 0.43));
    el('div', 'abs', panel, { left: (55 + k * 17) + 'px', top: (350 - h / 2) + 'px', width: '9px', height: h + 'px', borderRadius: '5px', background: k === SPIKE ? 'var(--amber)' : 'rgba(46,196,160,.75)' });
  }
  const tickX = 55 + SPIKE * 17 + 2;
  const tick = el('div', 'abs', panel, { left: tickX + 'px', top: '96px', width: '5px', height: '360px', borderRadius: '3px', background: 'var(--amber)', boxShadow: '0 0 24px rgba(255,181,71,.8)', transformOrigin: '50% 50%' });
  const tickLab = el('div', 'abs', panel, { left: (tickX + 18) + 'px', top: '38px', font: '700 22px/1 ' + MONO, letterSpacing: '.14em', color: 'var(--amber)' }); tickLab.textContent = '✓ IN SYNC';
  const head = el('div', 'abs', panel, { left: '53px', top: '90px', width: '4px', height: '372px', background: '#fff', boxShadow: '0 0 16px rgba(255,255,255,.7)' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set([badge, srcLab, ...tiles, ring, ringLab, panel, tick, tickLab], { opacity: 0 });
  gsap.set(copies.map((c) => c.f), { opacity: 0 });
  tl.to(cam, { scale: 1.035, x: -16, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.fromTo(src.f, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, 0.05);
  tl.fromTo(tagTop, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.15);
  tl.fromTo(badge, { scale: 0.4 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', immediateRender: false }, five);
  tl.fromTo(srcLab, { y: 16 }, { y: 0, opacity: 1, duration: 0.5, immediateRender: false }, five + 0.1);
  tl.to(paths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.15, ease: 'power2.inOut' }, product);
  tiles.forEach((t, i) => tl.fromTo(t, { x: 40 }, { x: 0, opacity: 1, duration: 0.6, immediateRender: false }, product + 0.35 + i * 0.12));
  tl.fromTo(ring, { scale: 0.5 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, product + 0.7);
  tl.to(ringLab, { opacity: 1, duration: 0.4 }, product + 0.85);
  tl.to(src.f, { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, webm - 0.05);
  tl.to(src.g, { boxShadow: '0 30px 110px rgba(46,196,160,.75)', duration: 0.3, yoyo: true, repeat: 1 }, webm - 0.05);

  const glow = (t, rgb, at) => tl.to(t, { boxShadow: `0 20px 60px rgba(0,0,0,.45), 0 0 0 3px rgba(${rgb},1), 0 0 50px rgba(${rgb},.45)`, duration: 0.35 }, at);
  // embed: copy A drops into browser
  const A = copies[0].f, B = copies[1].f, C = copies[2].f;
  tl.to(A, { opacity: 1, duration: 0.12 }, embed);
  tl.to(A, { x: 1100, y: -395, scale: 0.55, duration: Math.max(0.4, site - 0.3 - embed), ease: 'power2.inOut' }, embed);
  tl.to(A, { y: -275, duration: 0.35, ease: 'back.out(2)' }, site - 0.3);
  glow(tiles[0], '46,196,160', site);
  // upload: copy B flies to YouTube
  tl.to(B, { opacity: 1, duration: 0.12 }, upload);
  tl.to(B, { x: 1100, y: 45, scale: 0.55, duration: Math.max(0.4, yt - upload + 0.05), ease: 'expo.inOut' }, upload);
  glow(tiles[1], '46,196,160', yt);
  // convert once: through the ring, emerges blue MP4 into LMS
  tl.to(C, { opacity: 1, duration: 0.12 }, convert);
  tl.to(C, { x: 515, y: 183, scale: 0.72, duration: Math.max(0.3, once - convert), ease: 'power2.inOut' }, convert);
  tl.to(ring, { scale: 1.25, boxShadow: '0 0 90px rgba(255,181,71,.9), inset 0 0 40px rgba(255,181,71,.5)', duration: 0.15, yoyo: true, repeat: 1 }, once - 0.05);
  tl.to([copies[2].b, copies[2].e2], { opacity: 1, duration: 0.15 }, once);
  tl.to(copies[2].e1, { opacity: 0, duration: 0.1 }, once);
  tl.to(C, { x: 1100, y: 365, scale: 0.55, duration: Math.max(0.3, lms - once), ease: 'power3.out' }, once + 0.02);
  glow(tiles[2], '61,123,255', lms);

  // check sync
  tl.to(cam, { opacity: 0.22, duration: 0.5 }, then - 0.1);
  tl.fromTo(panel, { y: 40, scale: 0.97 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)', immediateRender: false }, then - 0.1);
  const D = Math.max(1.2, (sync - 0.04 - watch) * 1090 / (tickX - 55));
  tl.to(head, { x: 1090, duration: D, ease: 'none' }, watch);
  tl.fromTo(tick, { scaleY: 0 }, { scaleY: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)', immediateRender: false }, sync - 0.05);
  tl.fromTo(tickLab, { y: 10 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)', immediateRender: false }, sync);
});

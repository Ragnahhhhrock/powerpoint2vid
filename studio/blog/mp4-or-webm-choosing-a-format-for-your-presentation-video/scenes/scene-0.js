/* Scene 0: "You've turned your deck into a video. Now, which file format should it be?
 * MP4 and WebM are both good, and here's how to choose."
 * Storyboard: night stage. The real slide-1 card floats in, then flips on "video" and becomes a glowing
 * video file icon. On "which file format" the icon splits into two 150px tags that slide apart:
 * '.mp4' in blue on the left, '.webm' in green on the right. On "MP4" the title 'MP4 or WebM?' builds
 * above, and each tag pings as it is named. On "both good" both tags pulse with a soft check. On "how"
 * a thin amber question mark draws itself and settles between them. A slow push-in runs throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const video = ctx.at(0, 'video.'), which = ctx.at(1, 'which'), file = ctx.at(1, 'file'), format = ctx.at(1, 'format');
  const mp4W = ctx.at(2, 'MP4'), webmW = ctx.at(2, 'WebM'), good = ctx.at(2, 'good,'), how = ctx.at(2, 'how'), choose = ctx.at(2, 'choose.');
  const BLUE = '#3D7BFF', GREEN = '#2EC4A0', AMBER = '#FFB547';

  stage.style.background = 'radial-gradient(60% 55% at 50% 55%, #1a1f3a 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  const poolB = el('div', 'abs', cam, { left: '140px', top: '260px', width: '820px', height: '620px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(61,123,255,.32), transparent)', opacity: 0 });
  const poolG = el('div', 'abs', cam, { left: '960px', top: '260px', width: '820px', height: '620px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(46,196,160,.28), transparent)', opacity: 0 });

  const persp = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', perspective: '1800px' });
  const card = el('div', 'abs', persp, { left: '600px', top: '380px', width: '720px', height: '405px', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 50px 110px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.08)', transformOrigin: '50% 50%' });
  const ci = el('img', 'abs', card, { inset: 0, width: '100%', height: '100%' }); ci.src = ctx.asset('slide-1.png');
  const cardTag = el('div', 'abs', cam, { left: '600px', top: '336px', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: '#8A90A6' });
  cardTag.textContent = 'YOUR DECK · SLIDE 1';

  const icon = el('div', 'abs', persp, { left: '810px', top: '380px', width: '300px', height: '380px', transformOrigin: '50% 50%' });
  gsap.set(icon, { filter: 'drop-shadow(0 0 30px rgba(61,123,255,.55)) brightness(1)' });
  const sheet = el('div', 'abs', icon, { inset: 0, borderRadius: '22px', clipPath: 'polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)', background: 'linear-gradient(150deg, #5d93ff 0%, #3D7BFF 45%, #2EC4A0 100%)' });
  el('div', 'abs', icon, { right: 0, top: 0, width: '84px', height: '84px', background: 'linear-gradient(225deg, transparent 50%, rgba(255,255,255,.45) 50%)', borderBottomLeftRadius: '14px' });
  el('div', 'abs', sheet, { left: '108px', top: '135px', width: 0, height: 0, borderTop: '56px solid transparent', borderBottom: '56px solid transparent', borderLeft: '96px solid rgba(255,255,255,.95)' });
  el('div', 'abs', sheet, { left: '40px', right: '40px', bottom: '46px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.3)' });

  const title = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '140px', textAlign: 'center', font: '900 128px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', whiteSpace: 'nowrap' });
  const words = ctx.split(title, 'MP4 or WebM?', 'word');
  words[0].style.color = BLUE; words[2].style.color = GREEN; words[1].style.color = 'var(--slate)';

  const mkTag = (txt, color, left, glow) => {
    const t = el('div', 'abs', cam, { left: left + 'px', top: '470px', width: '580px', height: '230px', borderRadius: '40px', border: `3px solid ${color}`, background: 'rgba(20,22,31,.75)', boxShadow: `0 0 50px ${glow}, inset 0 0 40px ${glow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '900 150px/1 Inter Display, Inter', letterSpacing: '-.04em', color });
    t.textContent = txt;
    const badge = el('div', 'abs', t, { right: '-28px', top: '-28px', width: '72px', height: '72px', borderRadius: '50%', background: color, boxShadow: `0 0 30px ${color}`, fontSize: 0, lineHeight: 0 });
    badge.innerHTML = `<svg width="72" height="72" style="display:block;position:absolute;left:0;top:0"><path d="M20 37 L31 48 L53 25" fill="none" stroke="#0B0D17" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="50" stroke-dashoffset="50"/></svg>`;
    return { t, badge, path: badge.querySelector('path'), glow };
  };
  const L = mkTag('.mp4', BLUE, 250, 'rgba(61,123,255,.35)');
  const R = mkTag('.webm', GREEN, 1090, 'rgba(46,196,160,.32)');

  const qm = el('div', 'abs', cam, { left: '880px', top: '475px', width: '160px', height: '220px' });
  qm.innerHTML = `<svg width="160" height="220" style="display:block"><path d="M42 62 C42 18 118 18 118 62 C118 98 80 100 80 140" fill="none" stroke="${AMBER}" stroke-width="9" stroke-linecap="round" stroke-dasharray="230" stroke-dashoffset="230"/><circle cx="80" cy="188" r="9" fill="${AMBER}" opacity="0"/></svg>`;
  gsap.set(qm, { filter: 'drop-shadow(0 0 16px rgba(255,181,71,.7))' });
  const qPath = qm.querySelector('path'), qDot = qm.querySelector('circle');

  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 35% at 50% 53%, rgba(140,180,255,.5), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  gsap.set([icon, ...words, L.t, R.t, L.badge, R.badge], { opacity: 0 });
  gsap.set([L.badge, R.badge], { scale: 0 });

  tl.fromTo(cam, { scale: 1, x: 0 }, { scale: 1.06, x: -10, duration: ctx.dur, ease: 'none' }, 0);

  tl.from(card, { y: 60, opacity: 0, rotationX: 12, duration: 0.8 }, 0.05);
  tl.from(cardTag, { opacity: 0, y: 10, duration: 0.6 }, 0.3);
  tl.to(card, { scale: 1.04, duration: video - 0.5, ease: 'power1.inOut' }, 0.5);

  tl.to(card, { rotationY: 90, duration: 0.3, ease: 'power2.in' }, video - 0.3);
  tl.to(cardTag, { opacity: 0, duration: 0.25 }, video - 0.1);
  tl.set(card, { opacity: 0 }, video);
  tl.fromTo(icon, { rotationY: -90, opacity: 1, scale: 0.9 }, { rotationY: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)', immediateRender: false }, video);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 0.7, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, video);
  tl.to(icon, { y: -12, duration: Math.max(0.4, which - video - 0.6), ease: 'sine.inOut' }, video + 0.55);
  tl.to(icon, { filter: 'drop-shadow(0 0 60px rgba(46,196,160,.75)) brightness(1.25)', duration: 0.4 }, which);

  tl.to(icon, { scale: 0.4, opacity: 0, duration: 0.3, ease: 'power2.in' }, file);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 0.6, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, file + 0.2);
  tl.fromTo(L.t, { x: 380, scale: 0.4, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', immediateRender: false }, file + 0.2);
  tl.fromTo(R.t, { x: -380, scale: 0.4, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', immediateRender: false }, file + 0.2);
  tl.to([poolB, poolG], { opacity: 1, duration: 1 }, format);

  tl.fromTo(words, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.6)', stagger: 0.12, immediateRender: false }, mp4W - 0.1);

  tl.to(L.t, { scale: 1.06, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' }, mp4W);
  tl.to(R.t, { scale: 1.06, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' }, webmW);

  [L, R].forEach((s, i) => {
    const t0 = good - 0.15 + i * 0.08;
    tl.to(s.t, { scale: 1.05, boxShadow: `0 0 90px ${s.glow.replace(/[\d.]+\)$/, '.7)')}, inset 0 0 50px ${s.glow}`, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, t0);
    tl.to(s.badge, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, t0);
    tl.to(s.path, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, t0 + 0.2);
  });

  gsap.set(qm, { opacity: 0 });
  tl.fromTo(qm, { y: -40, opacity: 0, rotation: -12 }, { y: 0, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.4)', immediateRender: false }, how - 0.3);
  tl.to(qPath, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, how - 0.3);
  tl.to(qDot, { opacity: 1, duration: 0.2 }, how + 0.35);
  tl.to(qm, { y: 6, duration: 0.12, yoyo: true, repeat: 1 }, choose);
  tl.to(qm, { filter: 'drop-shadow(0 0 32px rgba(255,181,71,.95))', duration: 0.5, yoyo: true, repeat: 1 }, choose);
});

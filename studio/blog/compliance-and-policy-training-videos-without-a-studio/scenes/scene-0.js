/* Scene 0 — "Your policy deck already holds your compliance training. Here's how to turn it into a clear
 * narrated video, without a studio or voice talent."
 * Storyboard: night stage, the deck's real first slide floats centre in soft teal light. On "compliance
 * training" a play triangle glows through the card, the video hiding inside. On "video" the cluttered
 * overlapping slide is cleaned into a tidy card. On "studio" ghosted light stand, microphone and camera
 * outlines appear around it, get struck through in coral, and dissolve by "talent". The headline
 * "No studio needed." settles at 120px beneath the card. */
P2V.scene((ctx) => {
  const { tl, el, stage, dur } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const comp = T(0, 'compliance', 2.4);
  const heres = T(1, "Here's", 4.05);
  const video = T(1, 'video', 6.0);
  const studio = T(1, 'studio', 6.9);
  const talent = Math.min(T(1, 'talent', 8.0), dur - 1.6);
  const SLATE = '#8A97A8', TEAL = '#14A38B', CORAL = '#E5604D';

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #18304a 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { left: '460px', top: '150px', width: '1000px', height: '700px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(20,163,139,.32), transparent)', filter: 'blur(20px)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 460px' });

  /* the slide card */
  const CW = 880, CH = 495, CL = 520, CT = 292;
  const card = el('div', 'abs', cam, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '16px', overflow: 'hidden',
    background: 'var(--paper)', boxShadow: '0 50px 110px rgba(0,0,0,.55), 0 0 80px rgba(20,163,139,.25), 0 0 0 1px rgba(255,255,255,.08)' });
  const img = el('img', 'abs', card, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' });
  img.src = ctx.asset('slide-1.png');
  const tint = el('div', 'abs', card, { inset: 0, background: 'linear-gradient(160deg, rgba(20,163,139,.10), rgba(14,23,38,.18))' });

  /* clean rebuilt card content */
  const clean = el('div', 'abs', card, { inset: 0, background: 'var(--paper)', opacity: 0 });
  const cTitle = el('div', 'abs', clean, { left: '56px', top: '52px', font: '800 46px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)', width: '760px' });
  cTitle.textContent = 'Compliance training';
  const bars = [0, 1, 2].map((i) => el('div', 'abs', clean, { left: '56px', top: 140 + i * 30 + 'px', height: '12px', width: [420, 360, 300][i] + 'px', borderRadius: '6px', background: i ? 'rgba(27,36,51,.14)' : 'rgba(20,163,139,.45)' }));
  const progress = el('div', 'abs', clean, { left: '56px', right: '56px', bottom: '46px', height: '8px', borderRadius: '4px', background: 'rgba(27,36,51,.12)' });
  const progFill = el('div', 'abs', progress, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '4px', background: TEAL, transformOrigin: '0 50%' });

  /* play button glowing through */
  const play = el('div', 'abs', cam, { left: 960 - 80 + 'px', top: CT + CH / 2 - 80 + 'px', width: '160px', height: '160px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(20,163,139,.95), rgba(20,163,139,.75))', boxShadow: '0 0 70px rgba(20,163,139,.8), 0 0 0 10px rgba(20,163,139,.18)' });
  play.innerHTML = '<svg width="160" height="160"><path d="M66 52 L112 80 L66 108 Z" fill="#F6F3EC" stroke="#F6F3EC" stroke-width="6" stroke-linejoin="round"/></svg>';

  /* ghost studio kit */
  const kit = [
    { x: 120, y: 330, svg: '<circle cx="110" cy="70" r="46"/><path d="M80 70 L140 70 M110 116 L110 300 M110 300 L50 360 M110 300 L170 360 M110 300 L110 360"/>' },
    { x: 300, y: 380, svg: '<rect x="72" y="20" width="76" height="150" rx="38"/><path d="M50 120 Q50 210 110 210 Q170 210 170 120 M110 210 L110 280 M70 280 L150 280"/>' },
    { x: 1490, y: 360, svg: '<rect x="20" y="80" width="200" height="140" rx="18"/><circle cx="120" cy="150" r="44"/><path d="M60 80 L80 44 L140 44 L160 80 M120 220 L120 280 M80 330 L120 280 L160 330"/>' },
  ].map((k) => {
    const w = el('div', 'abs', cam, { left: k.x + 'px', top: k.y + 'px', width: '240px', height: '380px' });
    w.innerHTML = `<svg width="240" height="380" viewBox="0 0 240 380"><g fill="none" stroke="${SLATE}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 9">${k.svg}</g>
      <path class="x" d="M10 20 L230 350" fill="none" stroke="${CORAL}" stroke-width="10" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>`;
    return { w, x: w.querySelector('.x') };
  });

  /* headline */
  const head = el('div', 'abs', stage, { left: '80px', right: '80px', top: '820px', textAlign: 'center', font: '800 120px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  const words = ctx.split(head, 'No studio needed.', 'word');
  const under = el('div', 'abs', stage, { left: '760px', width: '400px', top: '962px', height: '6px', borderRadius: '3px', background: TEAL, boxShadow: '0 0 24px rgba(20,163,139,.8)', transformOrigin: '50% 50%' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(img, { filter: 'blur(0px) brightness(1)' });
  gsap.set(play, { opacity: 0, scale: 0.6, filter: 'blur(14px)' });
  kit.forEach((k) => gsap.set(k.w, { opacity: 0, filter: 'blur(0px)' }));
  gsap.set(words, { opacity: 0, y: 70 });
  gsap.set(under, { scaleX: 0 });
  gsap.set(progFill, { scaleX: 0 });

  tl.fromTo(card, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.05);
  tl.fromTo(glow, { opacity: 0.3 }, { opacity: 1, duration: 1.4 }, 0.1);
  tl.to(cam, { scale: 1.035, duration: dur, ease: 'none' }, 0);

  // "compliance training": the video glows through
  tl.to(img, { filter: 'blur(1.5px) brightness(.8)', duration: 0.8, ease: 'power2.out' }, comp - 0.1);
  tl.to(play, { opacity: 0.9, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'back.out(1.6)' }, comp);
  tl.to(play, { boxShadow: '0 0 120px rgba(20,163,139,1), 0 0 0 18px rgba(20,163,139,.12)', duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, comp + 0.8);

  // "Here's how": card lifts to make room
  tl.to([card, play], { y: -150, scale: 0.86, duration: 1.1, ease: 'expo.inOut' }, heres - 0.1);
  tl.to(glow, { y: -150, duration: 1.1, ease: 'expo.inOut' }, heres - 0.1);

  // "video": messy slide cut and rebuilt clean
  tl.to(clean, { opacity: 1, duration: 0.25, ease: 'power2.out' }, video - 0.15);
  tl.from(cTitle, { x: -30, opacity: 0, duration: 0.5 }, video);
  tl.from(bars, { scaleX: 0, transformOrigin: '0 50%', duration: 0.5, stagger: 0.06 }, video + 0.1);
  tl.to(progFill, { scaleX: 1, duration: dur - video, ease: 'none' }, video);

  // "studio": ghost kit appears, struck through, dissolves
  kit.forEach((k, i) => {
    tl.fromTo(k.w, { opacity: 0, y: 20 }, { opacity: 0.75, y: 0, duration: 0.5, immediateRender: false }, studio - 0.45 + i * 0.08);
    tl.to(k.x, { attr: { 'stroke-dashoffset': 0 }, duration: 0.22, ease: 'power3.in' }, studio + 0.1 + i * 0.1);
    tl.to(k.w, { y: '+=6', duration: 0.06, yoyo: true, repeat: 1 }, studio + 0.32 + i * 0.1);
    tl.to(k.w, { opacity: 0, filter: 'blur(10px)', scale: 0.92, duration: 0.6, ease: 'power2.in' }, talent - 0.35 + i * 0.06);
  });
  tl.to(cam, { scale: '+=0.025', duration: 0.9, ease: 'expo.inOut' }, studio - 0.2);

  // headline settles
  const hT = Math.min(studio + 0.5, talent - 0.6);
  tl.to(words, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.09 }, hT);
  tl.to(under, { scaleX: 1, duration: 0.5, ease: 'power4.out' }, hT + 0.5);
});

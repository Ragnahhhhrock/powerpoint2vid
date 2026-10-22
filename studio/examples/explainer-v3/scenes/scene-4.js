/* Scene 4 — "Basic exports carry a watermark. Pro removes it, and includes ten Opus-directed videos a month,
 * from 29 Australian dollars."
 * Storyboard: a real frame from this video in a player, stamped with the PowerPoint2Vid watermark, labelled
 * BASIC. On "Pro removes it" an amber light wipe clears the watermark, the label flips to PRO and the frame
 * slides left as the hero. On "ten" ten frames from this video deal into a grid while a counter climbs to 10.
 * On "29" the price A$29/month slams in; chips (no watermark, MP4 / WebM, captions) land on "dollars". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const MONO = '"DejaVu Sans Mono", ui-monospace, monospace';
  const wm = ctx.at(0, 'watermark'), rem = ctx.at(1, 'removes'), ten = ctx.at(1, 'ten'), n29 = ctx.at(1, '29'), dol = ctx.at(1, 'dollars');

  stage.style.background = 'radial-gradient(90% 80% at 70% 40%, #17140f 0%, #0b0a0b 55%, var(--night) 100%)';
  const warm = el('div', 'abs', stage, { left: '1000px', top: '-200px', width: '1200px', height: '1000px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,160,60,.16), transparent 70%)' });
  const cool = el('div', 'abs', stage, { left: '-300px', top: '500px', width: '1100px', height: '800px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(63,217,198,.10), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });

  /* ---- player frame ---- */
  const FW = 880, FH = 495, FL = 140, FT = 160;
  const frame = el('div', 'abs', cam, { left: FL + 'px', top: FT + 'px', width: FW + 'px', height: FH + 'px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 1.5px rgba(255,255,255,.12)' });
  const fim = el('img', 'abs', frame, { inset: 0, width: '100%', height: '100%' }); fim.src = ctx.asset('still-hero.jpg');
  const wmark = el('div', 'abs', frame, { inset: 0 });
  const diag = el('div', 'abs', wmark, { left: '50%', top: '50%', transform: 'translate(-50%,-50%) rotate(-18deg)', font: '800 92px/1 Inter', letterSpacing: '-.03em', color: 'rgba(255,255,255,.20)', whiteSpace: 'nowrap' }); diag.textContent = 'PowerPoint2Vid';
  const corner = el('div', 'abs', wmark, { right: '22px', bottom: '22px', padding: '10px 16px', borderRadius: '10px', background: 'rgba(255,255,255,.85)', font: '700 22px/1 Inter', color: '#16171c', display: 'flex', alignItems: 'center', gap: '10px' });
  corner.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M4 2l12 7-12 7z" fill="#16171c"/></svg>PowerPoint2Vid';
  const ring = el('div', 'abs', frame, { right: '8px', bottom: '8px', width: '252px', height: '72px', borderRadius: '16px', border: '3px dashed var(--ember)', opacity: 0 });
  const wipe = el('div', 'abs', frame, { top: '-20px', bottom: '-20px', width: '14px', left: '-40px', background: '#fff3dc', boxShadow: '0 0 40px 14px rgba(255,179,64,.8), 0 0 140px 50px rgba(255,120,40,.35)', opacity: 0 });
  // bar under frame: progress line like a player
  const pbar = el('div', 'abs', frame, { left: '22px', right: '22px', bottom: '0px', height: '5px', background: 'rgba(255,255,255,.18)' });
  const pfill = el('div', 'abs', pbar, { left: 0, top: 0, bottom: 0, width: '100%', background: 'var(--amber)', transformOrigin: '0 50%' });

  const lblBox = el('div', 'abs', cam, { left: FL + 'px', top: FT - 58 + 'px', height: '34px', width: '600px', overflow: 'hidden' });
  const lBasic = el('div', 'abs', lblBox, { left: 0, top: 0, font: `600 24px/34px ${MONO}`, letterSpacing: '.2em', color: 'var(--muted)' }); lBasic.textContent = 'BASIC EXPORT';
  const lPro = el('div', 'abs', lblBox, { left: 0, top: 0, font: `700 24px/34px ${MONO}`, letterSpacing: '.2em', color: 'var(--amber)' }); lPro.textContent = 'PRO EXPORT  ·  NO WATERMARK';

  /* ---- ten videos ---- */
  const TW = 168, TH = 94.5, TG = 10;
  const tiles = Array.from({ length: 10 }, (_, i) => {
    const t = el('div', 'abs', cam, { left: FL + (i % 5) * (TW + TG) + 'px', top: FT + FH + 34 + Math.floor(i / 5) * (TH + TG) + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.1)' });
    const im = el('img', 'abs', t, { inset: 0, width: '100%', height: '100%' }); im.src = ctx.asset(`still-${i}.jpg`);
    return t;
  });

  /* ---- right column: the offer ---- */
  const RX = 1130;
  const eb = el('div', 'abs', cam, { left: RX + 'px', top: '160px', padding: '10px 18px', borderRadius: '999px', background: 'var(--amber)', font: `800 22px/1 ${MONO}`, letterSpacing: '.22em', color: '#140d05' }); eb.textContent = 'PRO PLAN';
  const cntRow = el('div', 'abs', cam, { left: RX + 'px', top: '226px', display: 'flex', alignItems: 'center', gap: '30px' });
  const cnt = el('div', '', cntRow, { font: '900 190px/1 "Inter Display", Inter', letterSpacing: '-.06em', color: 'var(--paper)', width: '230px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' });
  const cntL = el('div', '', cntRow, { font: '700 40px/1.12 Inter', letterSpacing: '-.02em', color: 'var(--paper)' }); cntL.innerHTML = 'Opus-directed<br>videos a month';
  const cv = { n: 0 };
  const rule = el('div', 'abs', cam, { left: RX + 'px', top: '446px', width: '650px', height: '1.5px', background: 'linear-gradient(90deg, rgba(244,238,227,.35), transparent)', transformOrigin: '0 50%' });
  const from = el('div', 'abs', cam, { left: RX + 6 + 'px', top: '482px', font: '600 34px/1 Inter', color: 'var(--muted)' }); from.textContent = 'From';
  const priceRow = el('div', 'abs', cam, { left: RX + 'px', top: '520px', display: 'flex', alignItems: 'baseline', gap: '14px', transformOrigin: '0% 70%' });
  const price = el('div', '', priceRow, { font: '900 184px/1 "Inter Display", Inter', letterSpacing: '-.055em', backgroundImage: 'linear-gradient(100deg, #ffe0b0, #ffb340 45%, #ff5a2c)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: '6px' }); price.textContent = 'A$29';
  const per = el('div', '', priceRow, { font: '700 46px/1 Inter', letterSpacing: '-.02em', color: 'var(--paper)' }); per.textContent = '/month';
  const chipRow = el('div', 'abs', cam, { left: RX + 'px', top: '770px', display: 'flex', gap: '14px' });
  const chips = ['No watermark', 'MP4 · WebM', 'Captions'].map((t) => { const c = el('div', '', chipRow, { padding: '14px 22px', borderRadius: '999px', border: '1.5px solid rgba(244,238,227,.3)', font: '600 26px/1 Inter', color: 'var(--paper)', background: 'rgba(255,255,255,.04)', whiteSpace: 'nowrap' }); c.textContent = t; return c; });
  const glint = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(30% 30% at 68% 58%, rgba(255,150,70,.45), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.065 });
  ctx.onFrame(() => { cnt.textContent = String(Math.round(cv.n)); });

  /* ---- timeline ---- */
  gsap.set(frame, { x: 380, y: 60, scale: 1.18 });
  gsap.set(lblBox, { x: 380 - FW * 0.09, y: 60 - FH * 0.09 - 20 });
  gsap.set([eb, cntRow, rule, from, priceRow, ...chips], { opacity: 0 });
  gsap.set(lPro, { yPercent: 100 });
  tl.fromTo(cam, { scale: 1 }, { scale: 1.03, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(frame, { opacity: 0, scale: 1.1, duration: 0.6 }, 0);
  tl.from(lBasic, { yPercent: 100, duration: 0.5 }, 0.2);
  tl.fromTo(pfill, { scaleX: 0 }, { scaleX: 1, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(frame, { y: 50, duration: rem - 0.2, ease: 'sine.inOut' }, 0);

  // "watermark": call it out
  tl.fromTo(ring, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', immediateRender: false }, wm - 0.1);
  tl.to(corner, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, wm + 0.15);

  // "Pro removes it": light wipe clears the watermark
  const R = rem - 0.15;
  gsap.set(wmark, { clipPath: 'inset(0px 0px 0px 0%)' });
  tl.to(ring, { opacity: 0, duration: 0.2 }, R);
  tl.to(wipe, { opacity: 1, duration: 0.08 }, R);
  tl.fromTo(wipe, { left: -40 }, { left: FW + 20, duration: 0.75, ease: 'power2.inOut', immediateRender: false }, R);
  tl.to(wmark, { clipPath: 'inset(0px 0px 0px 100%)', duration: 0.75, ease: 'power2.inOut' }, R);
  tl.to(wipe, { opacity: 0, duration: 0.15 }, R + 0.7);
  tl.to(lBasic, { yPercent: -100, duration: 0.4, ease: 'power3.inOut' }, R + 0.35);
  tl.to(lPro, { yPercent: 0, duration: 0.4, ease: 'power3.inOut' }, R + 0.35);
  tl.to(frame, { boxShadow: '0 40px 120px rgba(255,120,40,.35), 0 0 0 2px rgba(255,179,64,.85)', duration: 0.4 }, R + 0.6);
  // frame becomes the hero on the left
  tl.to(frame, { x: 0, y: 0, scale: 1, duration: 0.9, ease: 'expo.inOut' }, R + 0.9);
  tl.to(lblBox, { x: 0, y: 0, duration: 0.9, ease: 'expo.inOut' }, R + 0.9);
  tl.fromTo(eb, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, R + 1.4);

  // "ten": videos deal in, counter climbs
  const T0 = ten - 0.15, ST = 0.11;
  tl.fromTo(cntRow, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, immediateRender: false }, T0 - 0.1);
  tl.fromTo(cv, { n: 0 }, { n: 10, duration: ST * 9 + 0.3, ease: 'none', immediateRender: false }, T0);
  tiles.forEach((t, i) => tl.from(t, { opacity: 0, y: 40, rotationX: -50, scale: 0.8, duration: 0.5, ease: 'back.out(1.6)', transformPerspective: 900 }, T0 + i * ST));
  tl.to(cnt, { color: '#ffb340', duration: 0.2, yoyo: true, repeat: 1 }, T0 + ST * 9 + 0.3);

  // "29": the price slams in
  tl.fromTo(rule, { opacity: 1, scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'expo.inOut', immediateRender: false }, n29 - 0.8);
  tl.fromTo(from, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, immediateRender: false }, n29 - 0.55);
  tl.fromTo(priceRow, { opacity: 0, scale: 1.35, rotation: -2 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: 'power4.in', immediateRender: false }, n29 - 0.35);
  tl.to(cam, { y: 6, duration: 0.07, yoyo: true, repeat: 1 }, n29 + 0.05);
  tl.fromTo(glint, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, n29 + 0.05);

  // "dollars": chips
  tl.fromTo(chips, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.09, ease: 'back.out(1.8)', immediateRender: false }, dol - 0.35);
});

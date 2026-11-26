/* Scene 0 — "The first thirty seconds decide whether people lean in or reach for their phones.
 * On video, one click and they're gone. Here's how to open well."
 * Storyboard: night stage. A phone plays a video with a progress bar while a big signal-coral 0:30 counter
 * ticks down. On "lean in" the camera pushes toward the screen. On "reach for their phones" a fingertip
 * glides in and hovers. On "one click" it taps and the frame snaps to black, leaving only "VIEWER LEFT AT 0:xx".
 * On "open well" the title "Open so people / keep watching" slams in at 140px paper white and holds
 * under a slow push-in. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const lean = ctx.at(0, 'lean'), reach = ctx.at(0, 'reach'), click = ctx.at(1, 'click'), open = ctx.at(2, 'open');
  const MONO = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 70% at 50% 50%, #1a2036 0%, var(--night) 70%)';

  /* ---------- camera + phone ---------- */
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const halo = el('div', 'abs', cam, { left: '560px', top: '140px', width: '800px', height: '800px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(46,196,182,.22), transparent 65%)', filter: 'blur(20px)' });
  const phone = el('div', 'abs', cam, { left: '740px', top: '100px', width: '440px', height: '880px', borderRadius: '68px',
    background: 'linear-gradient(160deg, #2a3044, #11141f)', boxShadow: '0 60px 120px rgba(0,0,0,.6), inset 0 0 0 2px rgba(255,255,255,.12)' });
  const screen = el('div', 'abs', phone, { left: '18px', top: '18px', right: '18px', bottom: '18px', borderRadius: '52px', overflow: 'hidden', background: '#141a2b' });
  const blobA = el('div', 'abs', screen, { width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,196,182,.75), transparent 65%)' });
  const blobB = el('div', 'abs', screen, { width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,181,71,.6), transparent 65%)' });
  // speaker silhouette
  el('div', 'abs', screen, { left: '137px', top: '250px', width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(14,18,32,.55)' });
  el('div', 'abs', screen, { left: '72px', top: '400px', width: '260px', height: '340px', borderRadius: '130px 130px 0 0', background: 'rgba(14,18,32,.55)' });
  el('div', 'abs', screen, { left: '34px', top: '70px', width: '90px', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,.35)' });
  el('div', 'abs', phone, { left: '170px', top: '34px', width: '100px', height: '28px', borderRadius: '14px', background: '#05070d' });
  const track = el('div', 'abs', screen, { left: '34px', right: '34px', bottom: '58px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.22)' });
  const fill = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '0%', borderRadius: '4px', background: 'var(--signal)', boxShadow: '0 0 14px rgba(255,90,60,.8)' });
  const knob = el('div', 'abs', track, { top: '-7px', width: '22px', height: '22px', borderRadius: '50%', background: '#fff', marginLeft: '-11px' });
  const ripple = el('div', 'abs', cam, { left: '900px', top: '680px', width: '120px', height: '120px', borderRadius: '50%', border: '5px solid rgba(255,255,255,.9)', opacity: 0 });

  /* fingertip */
  const thumb = el('div', 'abs', cam, { left: '880px', top: '740px', width: '160px', height: '340px', transformOrigin: '50% 0%' });
  thumb.innerHTML = `<svg width="160" height="340" viewBox="0 0 160 340">
    <defs><linearGradient id="sk" x1="0" x2="1"><stop offset="0" stop-color="#e9c4a8"/><stop offset=".55" stop-color="#f6dcc6"/><stop offset="1" stop-color="#c99a7c"/></linearGradient></defs>
    <path d="M10 80 Q10 0 80 0 Q150 0 150 80 L150 340 L10 340 Z" fill="url(#sk)"/>
    <path d="M38 70 Q38 22 80 22 Q122 22 122 70 L122 110 Q80 122 38 110 Z" fill="rgba(255,255,255,.45)" stroke="rgba(160,110,90,.5)" stroke-width="3"/>
    <path d="M30 200 Q80 214 130 200" fill="none" stroke="rgba(150,100,80,.35)" stroke-width="4" stroke-linecap="round"/></svg>`;
  thumb.style.filter = 'drop-shadow(0 30px 40px rgba(0,0,0,.55))';

  /* counter (fixed, outside the camera) */
  const cWrap = el('div', 'abs', stage, { left: '130px', top: '380px', width: '520px' });
  const counter = el('div', '', cWrap, { font: '900 190px/0.9 Inter Display, Inter', letterSpacing: '-.05em', color: 'var(--signal)',
    fontVariantNumeric: 'tabular-nums', textShadow: '0 0 60px rgba(255,90,60,.55)' });
  const cLab = el('div', '', cWrap, { font: MONO, letterSpacing: '.16em', color: 'var(--mist)', marginTop: '22px' });
  cLab.textContent = 'FIRST 30 SECONDS';

  /* blackout */
  const black = el('div', 'abs', stage, { inset: 0, background: '#000', opacity: 0 });
  const gone = el('div', 'abs', black, { left: 0, right: 0, top: '520px', textAlign: 'center', font: MONO, fontSize: '26px', letterSpacing: '.24em', color: 'var(--mist)', opacity: 0 });

  /* title */
  const cam2 = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const glow = el('div', 'abs', cam2, { left: '360px', top: '240px', width: '1200px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(255,90,60,.22), transparent)', opacity: 0 });
  const title = el('div', 'abs', cam2, { left: '120px', right: '120px', top: '370px', textAlign: 'center', font: '800 140px/1.02 Inter Display, Inter',
    letterSpacing: '-.04em', color: 'var(--paper)', opacity: 0, textShadow: '0 20px 60px rgba(0,0,0,.5)' });
  title.innerHTML = 'Open so people<br>keep <span style="color:var(--signal)">watching</span>';
  const bar = el('div', 'abs', cam2, { left: '760px', top: '680px', width: '400px', height: '10px', borderRadius: '5px', background: 'var(--signal)', transformOrigin: '0% 50%', scaleX: 0 });
  gsap.set(bar, { scaleX: 0 });
  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(45% 40% at 50% 50%, rgba(255,243,236,.5), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.07 });

  /* ---------- per-frame ---------- */
  const cs = { v: 30 };
  ctx.onFrame((t) => {
    const s = Math.ceil(cs.v - 0.0001);
    const txt = '0:' + String(Math.max(0, s)).padStart(2, '0');
    counter.textContent = txt;
    gone.textContent = 'VIEWER LEFT AT ' + '0:' + String(30 - Math.max(0, s)).padStart(2, '0');
    const p = (30 - cs.v) / 30 * 100;
    fill.style.width = p + '%'; knob.style.left = p + '%';
    blobA.style.transform = `translate(${-80 + Math.sin(t * 0.9) * 60}px, ${-60 + Math.cos(t * 0.7) * 50}px)`;
    blobB.style.transform = `translate(${120 + Math.cos(t * 0.8) * 50}px, ${420 + Math.sin(t * 1.1) * 60}px)`;
  });

  /* ---------- timeline ---------- */
  tl.from(phone, { y: 80, opacity: 0, duration: 0.6 }, 0.02);
  tl.from(halo, { opacity: 0, duration: 0.8 }, 0.05);
  tl.from(cWrap, { x: -60, opacity: 0, duration: 0.55 }, 0.2);
  tl.to(cs, { v: 12, duration: click - 0.3, ease: 'none' }, 0.3);
  tl.to(cam, { scale: 1.04, duration: lean - 0.2, ease: 'none' }, 0);
  // "lean in": push toward the screen
  tl.to(cam, { scale: 1.22, duration: 1.0, ease: 'expo.inOut' }, lean - 0.15);
  tl.to(halo, { opacity: 0.5, duration: 0.6 }, lean);
  // "reach for their phones": fingertip glides in and hovers
  tl.fromTo(thumb, { x: 340, y: 420, rotation: -30, opacity: 0 }, { x: 0, y: 0, rotation: -14, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, reach - 0.1);
  const hoverStart = reach + 0.6, tapAt = click - 0.12;
  if (tapAt - hoverStart > 0.4) tl.to(thumb, { y: -16, duration: (tapAt - hoverStart) / 4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, hoverStart);
  tl.to(cam, { scale: 1.26, duration: Math.max(0.3, click - lean - 0.9), ease: 'none' }, lean + 0.85);
  // "one click": tap, then snap to black
  tl.to(thumb, { y: 20, scale: 0.94, duration: 0.1, ease: 'power2.in' }, tapAt);
  tl.fromTo(ripple, { scale: 0.3, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.4, ease: 'power2.out', immediateRender: false }, click - 0.02);
  tl.set(black, { opacity: 1 }, click + 0.06);
  tl.set([cam, cWrap], { opacity: 0 }, click + 0.06);
  tl.to(gone, { opacity: 1, duration: 0.4 }, click + 0.5);
  // "open well": title slams in
  tl.to(gone, { opacity: 0, duration: 0.2 }, open - 0.45);
  tl.to(black, { opacity: 0, duration: 0.3, ease: 'power2.out' }, open - 0.35);
  tl.fromTo(title, { scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.36, ease: 'power4.in' }, open - 0.34);
  tl.to(cam2, { y: 8, duration: 0.06, yoyo: true, repeat: 1 }, open + 0.02);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, open);
  tl.to(glow, { opacity: 1, duration: 0.5 }, open);
  tl.to(bar, { scaleX: 1, duration: 0.45, ease: 'expo.out' }, open + 0.2);
  tl.to(cam2, { scale: 1.05, duration: Math.max(0.5, ctx.dur - open - 0.1), ease: 'power1.inOut' }, open + 0.1);
});

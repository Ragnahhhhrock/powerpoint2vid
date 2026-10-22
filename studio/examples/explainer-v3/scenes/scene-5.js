/* Scene 5 — "More than a PowerPoint to video converter. Go Pro at powerpoint2vid.com."
 * Storyboard: finale under the same projector beam the film opened with, letterboxed. "More than a PowerPoint
 * to video converter." types on in muted text; on "converter" the headline "Your deck, / directed." rises
 * through masks with an amber sweep. On "Go Pro" the Pro button lands with its price; on the URL the
 * brand mark and powerpoint2vid.com settle beneath, a cursor glides in and clicks. Holds as an end card. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const MONO = '"DejaVu Sans Mono", ui-monospace, monospace';
  const conv = ctx.at(0, 'converter'), b1 = ctx.beat(1), url = ctx.at(1, 'powerpoint2vid');
  stage.style.background = 'var(--night)';

  const world = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });
  el('div', 'abs', world, { inset: 0, background: 'radial-gradient(80% 70% at 50% 60%, #1c1712 0%, #0b0a0a 55%, var(--night) 100%)' });
  const beam = el('div', 'abs', world, { left: '-300px', top: '-420px', width: '2600px', height: '1900px', transformOrigin: '300px 420px', mixBlendMode: 'screen',
    background: 'conic-gradient(from 118deg at 300px 420px, transparent 0deg, rgba(255,190,110,.0) 2deg, rgba(255,190,110,.18) 9deg, rgba(255,220,170,.28) 14deg, rgba(255,190,110,.14) 20deg, transparent 28deg)', filter: 'blur(18px)' });
  const pool = el('div', 'abs', world, { left: '360px', top: '380px', width: '1200px', height: '700px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,160,70,.20), transparent 70%)', mixBlendMode: 'screen' });
  const teal = el('div', 'abs', world, { left: '1200px', top: '500px', width: '1000px', height: '700px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(63,217,198,.12), transparent 70%)' });
  const dust = el('canvas', 'abs', world, { inset: 0, width: '1920px', height: '1080px', mixBlendMode: 'screen' }); dust.width = 1920; dust.height = 1080;
  const dg = dust.getContext('2d'); const r = ctx.rand(11);
  const motes = Array.from({ length: 140 }, () => ({ u: r(), v: r(), s: 0.6 + r() * 2.4, sp: 0.2 + r() * 0.8, ph: r() * 6.28 }));

  const eyeb = el('div', 'abs', world, { left: 0, width: '1920px', top: '128px', textAlign: 'center', font: `600 22px/1 ${MONO}`, letterSpacing: '.34em', color: 'var(--amber)' });
  eyeb.textContent = 'POWERPOINT2VID  ·  PRO';
  const col = el('div', 'abs', world, { left: 0, width: '1920px', top: '188px', textAlign: 'center' });
  const l1 = el('div', '', col, { font: '500 46px/1 Inter', letterSpacing: '-.01em', color: 'rgba(244,238,227,.7)', marginBottom: '40px' });
  const c1 = ctx.split(l1, 'More than a PowerPoint to video converter.');
  const mk = (text, css) => { const wrap = el('div', '', col, { overflow: 'hidden', paddingBottom: '.1em', marginBottom: '-.1em' }); const line = el('div', '', wrap, Object.assign({ whiteSpace: 'nowrap', display: 'inline-block' }, css)); return ctx.split(line, text); };
  const h1 = mk('Your deck,', { font: '900 176px/1 "Inter Display", Inter', letterSpacing: '-.05em', color: 'var(--paper)' });
  const h2 = mk('directed.', { font: '900 176px/1 "Inter Display", Inter', letterSpacing: '-.05em' });
  h2.forEach((s) => Object.assign(s.style, { backgroundImage: 'linear-gradient(90deg, #ffc65a 0%, #ff8a3d 18%, #ff5a2c 34%, #ff8a3d 47%, #fff3dc 50%, #ff8a3d 53%, #ff5a2c 66%, #ff8a3d 82%, #ffc65a 100%)', backgroundSize: '4000px 100%', backgroundPositionX: (-s.offsetLeft) + 'px', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }));
  const sweep = { x: 0 };

  const btnWrap = el('div', 'abs', world, { left: 0, width: '1920px', top: '700px', display: 'flex', justifyContent: 'center' });
  const btn = el('div', '', btnWrap, { position: 'relative', overflow: 'hidden', padding: '30px 52px', borderRadius: '999px', background: 'linear-gradient(100deg, #ffc65a, #ffb340 45%, #ff7a35)', boxShadow: '0 20px 60px rgba(255,140,40,.45), inset 0 1px 0 rgba(255,255,255,.5)', font: '800 40px/1 Inter', letterSpacing: '-.02em', color: '#140d05', whiteSpace: 'nowrap' });
  btn.innerHTML = 'Go Pro <span style="font-weight:600;opacity:.75">&nbsp;·&nbsp; from A$29/month</span>&nbsp; →';
  const shine = el('div', 'abs', btn, { top: '-20px', bottom: '-20px', width: '120px', left: '-200px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.7), transparent)', transform: 'rotate(18deg)' });
  const urlRow = el('div', 'abs', world, { left: 0, width: '1920px', top: '842px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '18px' });
  const ic = el('img', '', urlRow, { width: '50px', height: '50px', borderRadius: '12px' }); ic.src = ctx.asset('icon.png');
  const ut = el('div', '', urlRow, { font: '700 44px/1 Inter', letterSpacing: '-.02em', color: 'var(--paper)' }); ut.textContent = 'powerpoint2vid.com';

  // cursor
  const cur = el('div', 'abs', world, { left: '0px', top: '0px', width: '44px', height: '54px', zIndex: 20 });
  cur.innerHTML = '<svg width="44" height="54" viewBox="0 0 44 54"><path d="M4 3 L4 42 L14 33 L21 50 L28 47 L21 30 L35 30 Z" fill="#fff" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/></svg>';
  const ripple = el('div', 'abs', world, { left: '0px', top: '0px', width: '80px', height: '80px', borderRadius: '50%', border: '3px solid rgba(255,220,160,.9)', opacity: 0 });

  const lbTop = el('div', 'abs', stage, { left: 0, right: 0, top: 0, height: '96px', background: '#000', zIndex: 50 });
  const lbBot = el('div', 'abs', stage, { left: 0, right: 0, bottom: 0, height: '96px', background: '#000', zIndex: 50 });
  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.065 });

  ctx.onFrame((t) => {
    dg.clearRect(0, 0, 1920, 1080);
    for (const m of motes) {
      const dist = 250 + m.u * 2000, ang = (132 + (m.v - 0.5) * 12) * Math.PI / 180, drift = t * 18 * m.sp;
      const x = Math.sin(ang) * dist + Math.sin(t * m.sp + m.ph) * 14 + drift * 0.4;
      const y = -Math.cos(ang) * dist + Math.cos(t * 0.7 * m.sp + m.ph) * 10 - drift * 0.2;
      dg.globalAlpha = (0.35 + 0.65 * Math.abs(Math.sin(t * 1.3 * m.sp + m.ph))) * 0.75; dg.fillStyle = '#ffe2b8';
      dg.beginPath(); dg.arc(x, y, m.s, 0, 6.283); dg.fill();
    }
    dg.globalAlpha = 1;
    h2.forEach((s) => { s.style.backgroundPositionX = (-s.offsetLeft + sweep.x) + 'px'; });
  });

  /* ---- timeline ---- */
  tl.fromTo(world, { scale: 1.06 }, { scale: 1.0, duration: ctx.dur, ease: 'power2.out' }, 0);
  tl.fromTo(beam, { rotation: -2 }, { rotation: 2, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  // line 1 types on across beat 0
  tl.fromTo(c1, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25, stagger: (conv - 0.6) / c1.length }, 0.45);
  tl.fromTo(eyeb, { opacity: 0, letterSpacing: '.6em' }, { opacity: 1, letterSpacing: '.34em', duration: 1.2, ease: 'expo.out' }, 0.0);
  // headline rises on "converter"
  const H = conv + 0.1;
  tl.fromTo(h1, { yPercent: 115, rotationX: -60 }, { yPercent: 0, rotationX: 0, duration: 0.8, stagger: 0.03, ease: 'expo.out' }, H);
  tl.fromTo(h2, { yPercent: 115, rotationX: -60 }, { yPercent: 0, rotationX: 0, duration: 0.85, stagger: 0.03, ease: 'expo.out' }, H + 0.22);
  tl.fromTo(sweep, { x: 0 }, { x: -2400, duration: 1.8, ease: 'power2.inOut' }, H + 0.7);
  tl.to(l1, { opacity: 0.55, duration: 0.6 }, H);
  // "Go Pro": button lands
  tl.fromTo(btn, { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' }, b1 - 0.1);
  tl.fromTo(shine, { left: -200 }, { left: 900, duration: 0.9, ease: 'power2.inOut', immediateRender: false }, b1 + 0.5);
  // URL
  tl.fromTo(urlRow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, url - 0.25);
  // cursor glides in, clicks the button
  const CX = 1050, CY = 800, K = url + 0.7;
  tl.fromTo(cur, { x: 1560, y: 1000, opacity: 0 }, { x: CX, y: CY, opacity: 1, duration: 1.0, ease: 'power3.out' }, K);
  tl.to(btn, { scale: 0.95, duration: 0.08, yoyo: true, repeat: 1 }, K + 1.05);
  tl.to(cur, { scale: 0.88, duration: 0.08, yoyo: true, repeat: 1 }, K + 1.05);
  tl.fromTo(ripple, { x: CX - 36, y: CY - 36, scale: 0.3, opacity: 1 }, { scale: 2.2, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, K + 1.05);
  tl.to(btn, { boxShadow: '0 20px 90px rgba(255,140,40,.8), inset 0 1px 0 rgba(255,255,255,.5)', duration: 0.3, yoyo: true, repeat: 1 }, K + 1.1);
  tl.fromTo(shine, { left: -200 }, { left: 900, duration: 0.9, ease: 'power2.inOut', immediateRender: false }, K + 1.3);
});

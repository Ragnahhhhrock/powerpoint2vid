/* Scene 0 — "Think about the last time you understood something difficult. Odds are, someone showed
 * you a picture while they explained it."
 * Storyboard: near-black night stage. A small line sketch draws itself in glowing eye-blue at centre,
 * with an amber sound-wave rippling beside it. On "understood something difficult" the two drift
 * together and touch, and a soft light blooms outward from the contact point. On "showed you a picture"
 * the camera pushes in slowly and "Narrated Visuals" rises in 140px paper-white type beneath.
 * The slide's overlapping subtitles are cut; only the title survives. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const think = ctx.at(0, 'Think'), understood = ctx.at(0, 'understood'), something = ctx.at(0, 'something');
  const difficult = ctx.at(0, 'difficult'), showed = ctx.at(1, 'showed'), picture = ctx.at(1, 'picture');
  const explained = ctx.at(1, 'explained');

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #141b31 0%, var(--night) 70%, #070a13 100%)';

  /* warm glow that wakes up after the bloom */
  const ambient = el('div', 'abs', stage, { inset: 0, opacity: 0,
    background: 'radial-gradient(45% 40% at 49% 40%, rgba(61,123,255,.16), transparent 70%), radial-gradient(35% 30% at 53% 42%, rgba(255,178,61,.10), transparent 70%)' });

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '950px 500px' });

  const MX = 950, CY = 420; // meeting point
  /* bloom of light */
  const bloom = el('div', 'abs', cam, { left: MX - 300 + 'px', top: CY - 300 + 'px', width: '600px', height: '600px', borderRadius: '50%', opacity: 0, mixBlendMode: 'screen',
    background: 'radial-gradient(circle, rgba(255,240,215,.85) 0%, rgba(255,178,61,.35) 25%, rgba(61,123,255,.22) 50%, transparent 72%)' });
  const ring = el('div', 'abs', cam, { left: MX - 120 + 'px', top: CY - 120 + 'px', width: '240px', height: '240px', borderRadius: '50%', border: '3px solid rgba(246,243,236,.7)', opacity: 0 });

  /* the blue sketch: a framed little picture (mountains + sun) */
  const sketch = el('div', 'abs', cam, { left: MX - 250 + 'px', top: CY - 95 + 'px', width: '240px', height: '190px' });
  sketch.innerHTML = `<svg width="240" height="190" viewBox="0 0 240 190" fill="none" stroke="#3D7BFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <rect pathLength="1" x="12" y="12" width="216" height="166" rx="16"/>
    <path pathLength="1" d="M28 160 L88 88 L124 130 L154 100 L212 160"/>
    <circle pathLength="1" cx="176" cy="52" r="18"/>
  </svg>`;
  const sPaths = [...sketch.querySelectorAll('rect,path,circle')];
  gsap.set(sPaths, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(sketch, { filter: 'drop-shadow(0 0 10px rgba(61,123,255,.6)) brightness(1)' });

  /* the amber sound-wave, drawn procedurally */
  const W = 270, H = 190;
  const wave = el('div', 'abs', cam, { left: MX + 10 + 'px', top: CY - 95 + 'px', width: W + 'px', height: H + 'px' });
  wave.innerHTML = `<svg width="${W}" height="${H}" fill="none" stroke-linecap="round">
    <path id="w2" stroke="#FFB23D" stroke-opacity=".35" stroke-width="3"/>
    <path id="w1" stroke="#FFB23D" stroke-width="5"/></svg>`;
  const w1 = wave.querySelector('#w1'), w2 = wave.querySelector('#w2');
  gsap.set(wave, { filter: 'drop-shadow(0 0 10px rgba(255,178,61,.6)) brightness(1)' });
  const ws = { amp: 0, reveal: 0 };

  /* tiny spark visible from the first frame */
  const spark = el('div', 'abs', cam, { left: MX - 6 + 'px', top: CY - 6 + 'px', width: '12px', height: '12px', borderRadius: '50%', background: '#F6F3EC', boxShadow: '0 0 24px 8px rgba(246,243,236,.5)' });

  /* title */
  const title = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '640px', textAlign: 'center', font: '800 140px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', textShadow: '0 10px 60px rgba(0,0,0,.5)' });
  const words = ctx.split(title, 'Narrated Visuals', 'word');
  gsap.set(words, { opacity: 0, y: 70 });
  const underline = el('div', 'abs', cam, { left: MX - 160 + 'px', top: '820px', width: '320px', height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, #3D7BFF, #FFB23D)', transform: 'scaleX(0)' });

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    const ph = t * 5.5;
    const n = Math.max(2, Math.round(W * ws.reveal));
    let d1 = '', d2 = '';
    for (let x = 6; x <= n; x += 4) {
      const env = Math.sin(Math.PI * (x / W));
      const y1 = H / 2 + ws.amp * env * Math.sin(x * 0.075 - ph) * (0.8 + 0.2 * Math.sin(t * 2.1));
      const y2 = H / 2 + ws.amp * 0.6 * env * Math.sin(x * 0.05 - ph * 0.7 + 1.3);
      d1 += (x === 6 ? 'M' : 'L') + x + ' ' + y1.toFixed(1) + ' ';
      d2 += (x === 6 ? 'M' : 'L') + x + ' ' + y2.toFixed(1) + ' ';
    }
    w1.setAttribute('d', d1); w2.setAttribute('d', d2);
  });

  /* ---- timeline ---- */
  // slow continuous drift, then a push-in on "showed"
  tl.fromTo(cam, { scale: 1, y: 0 }, { scale: 1.025, y: -6, duration: showed, ease: 'none' }, 0);
  tl.to(cam, { scale: 1.09, y: -30, duration: ctx.dur - showed, ease: 'power1.inOut' }, showed);

  // spark pulses, then splits into the two channels
  tl.fromTo(spark, { scale: 0.3, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, 0);
  tl.to(spark, { scale: 0, opacity: 0, duration: 0.5, ease: 'power2.in' }, think + 0.1);

  // sketch draws, wave starts rippling; both begin apart
  gsap.set(sketch, { x: -90 }); gsap.set(wave, { x: 90 });
  tl.to(sPaths, { strokeDashoffset: 0, duration: 1.3, stagger: 0.25, ease: 'power2.inOut' }, think - 0.2);
  tl.to(ws, { reveal: 1, duration: 1.2, ease: 'power2.out' }, think);
  tl.to(ws, { amp: 34, duration: 1.0, ease: 'power2.out' }, think);

  // "understood": they drift together and touch
  tl.to(sketch, { x: 0, duration: 0.8, ease: 'power3.inOut' }, understood - 0.5);
  tl.to(wave, { x: 0, duration: 0.8, ease: 'power3.inOut' }, understood - 0.5);

  // "something difficult": soft bloom outward
  tl.fromTo(bloom, { scale: 0.2, opacity: 0 }, { scale: 1.6, opacity: 1, duration: 0.7, ease: 'power2.out' }, something);
  tl.to(bloom, { scale: 2.6, opacity: 0.35, duration: 1.6, ease: 'power1.out' }, something + 0.7);
  tl.fromTo(ring, { scale: 0.3, opacity: 0.9 }, { scale: 3, opacity: 0, duration: 1.4, ease: 'power2.out', immediateRender: false }, something);
  tl.to(ambient, { opacity: 1, duration: 1.4, ease: 'power2.out' }, something);
  tl.to(sketch, { filter: 'drop-shadow(0 0 22px rgba(61,123,255,.9)) brightness(1.25)', duration: 0.6 }, difficult - 0.3);
  tl.to(wave, { filter: 'drop-shadow(0 0 22px rgba(255,178,61,.9)) brightness(1.25)', duration: 0.6 }, difficult - 0.3);
  tl.to(ws, { amp: 44, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, something);

  // "picture": title rises beneath
  tl.to(words, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, picture - 0.2);
  tl.to(underline, { scaleX: 1, duration: 0.8, ease: 'expo.out' }, picture + 0.35);

  // "explained": the voice breathes once more, then holds
  tl.to(ws, { amp: 40, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, explained);
  tl.to(sketch, { filter: 'drop-shadow(0 0 14px rgba(61,123,255,.7)) brightness(1.1)', duration: 1 }, explained);
  tl.to(wave, { filter: 'drop-shadow(0 0 14px rgba(255,178,61,.7)) brightness(1.1)', duration: 1 }, explained);
});

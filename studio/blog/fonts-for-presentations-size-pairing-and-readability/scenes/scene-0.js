/* Scene 0: "When fonts are right, nobody notices them. When they're wrong, people squint,
 * lose the thread, or stop reading. Here's how to choose fonts that stay readable."
 * Storyboard: night stage. The slide's own title word, "Readability", sits huge (150px), crisp but
 * nearly invisible in slate on "nobody notices them". On "squint" it blurs and shrinks under a
 * washed-out projector haze. On "lose the thread" its letters drift apart. On "stop reading" it
 * fades almost out. On "stay readable" it snaps back sharp in paper white, a signal-yellow underline
 * draws in, and the camera keeps a slow push-in. */
P2V.scene((ctx) => {
  const { tl, el, stage, at, dur } = ctx;
  const notices = at(0, 'notices'), squint = at(1, 'squint'), lose = at(1, 'lose'),
        stop = at(1, 'stop'), stay = at(2, 'stay'), readable = at(2, 'readable'), choose = at(2, 'choose');

  stage.style.background = 'radial-gradient(60% 55% at 50% 50%, #161b24 0%, var(--night) 75%)';

  const glow = el('div', 'abs', stage, { left: '460px', top: '290px', width: '1000px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(255,194,61,.22), transparent)', opacity: 0 });

  const cam = el('div', 'abs', stage, { inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transformOrigin: '50% 50%' });
  const block = el('div', '', cam, { position: 'relative', transformOrigin: '50% 50%' });
  const word = el('div', '', block, { font: '800 150px/1.1 Inter Display, Inter', letterSpacing: '-.04em', color: '#8A93A3', whiteSpace: 'nowrap' });
  const chars = ctx.split(word, 'Readability', 'char');
  const underline = el('div', 'abs', block, { left: '4px', right: '4px', bottom: '-18px', height: '12px', borderRadius: '6px',
    background: 'var(--signal)', boxShadow: '0 0 40px rgba(255,194,61,.6)', transformOrigin: '0% 50%' });

  const label = el('div', 'abs', stage, { left: '0', width: '1920px', top: '700px', textAlign: 'center',
    font: '600 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.24em', color: 'var(--slate)' });
  label.textContent = 'SIZE · PAIRING · READABILITY';

  // washed-out projector haze for the "wrong" stretch
  const wash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(70% 70% at 50% 45%, rgba(170,178,195,.22), rgba(120,128,140,.10))', mixBlendMode: 'screen', opacity: 0 });
  const flash = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 35% at 50% 50%, rgba(255,240,210,.35), transparent 70%)', mixBlendMode: 'screen', opacity: 0 });

  ctx.fx.vignette({ strength: 0.6 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(block, { filter: 'blur(0px)', opacity: 0.55, scale: 1 });
  gsap.set(underline, { scaleX: 0 });
  gsap.set(label, { opacity: 0, y: 14 });

  // slow continuous push-in
  tl.fromTo(cam, { scale: 1 }, { scale: 1.06, duration: stay, ease: 'none' }, 0);
  tl.to(cam, { scale: 1.12, duration: dur - stay, ease: 'power1.out' }, stay);

  // quiet arrival: present but unnoticed
  tl.fromTo(block, { opacity: 0, scale: 1.03 }, { opacity: 0.55, scale: 1, duration: 1.2, ease: 'power2.out', immediateRender: false }, 0.05);
  tl.set(block, { opacity: 0.12 }, 0); // visible at frame 0
  tl.to(block, { opacity: 0.4, duration: 0.8, ease: 'power2.inOut' }, notices);

  // squint: rack-focus blur and shrink under a washed-out screen
  tl.to(block, { filter: 'blur(9px)', scale: 0.82, duration: 0.7, ease: 'power2.out' }, squint - 0.1);
  tl.to(wash, { opacity: 1, duration: 0.7, ease: 'power2.out' }, squint - 0.1);

  // lose the thread: letters drift apart
  const r = ctx.rand(7);
  chars.forEach((c, i) => {
    const off = i - (chars.length - 1) / 2;
    tl.to(c, { x: off * 26 + (r() - 0.5) * 90, y: (r() - 0.5) * 110, rotation: (r() - 0.5) * 22,
      duration: 1.2, ease: 'sine.inOut' }, lose - 0.05 + i * 0.03);
  });
  tl.to(block, { filter: 'blur(5px)', duration: 0.6, ease: 'sine.inOut' }, lose);

  // stop reading: fades almost out
  tl.to(block, { opacity: 0.08, filter: 'blur(12px)', duration: 0.8, ease: 'power2.inOut' }, stop - 0.05);

  // here's how: a hint of recovery
  tl.to(block, { opacity: 0.2, duration: 0.6, ease: 'power1.out' }, choose);

  // stay readable: snap back crisp in paper white
  const snap = stay - 0.12;
  tl.to(wash, { opacity: 0, duration: 0.4, ease: 'power2.out' }, snap);
  tl.to(chars, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: 'expo.out', stagger: 0.02 }, snap);
  tl.to(block, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, snap);
  tl.to(word, { color: '#F7F4EE', textShadow: '0 0 60px rgba(247,244,238,.25)', duration: 0.5, ease: 'power2.out' }, snap);
  tl.to(glow, { opacity: 1, duration: 0.8, ease: 'power2.out' }, snap);
  tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.out', immediateRender: false }, readable);
  tl.to(underline, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, readable - 0.05);
  tl.to(label, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, readable + 0.15);
});

/* Scene 2 — "Then it redesigns every slide as an animated scene, with each move timed to the narration."
 * Storyboard: light paper stage (contrast). The plain bullet slide, as written. On "redesigns" the camera
 * swings to an isometric exploded view: the new scene's layers (stage, light, type, cards) float apart in
 * depth with labels. On "animated scene" they slam together and the camera returns front-on. On "timed"
 * a timeline strip draws beneath: waveform, keyframe diamonds, and a playhead that fires each card. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const MONO = '"DejaVu Sans Mono", ui-monospace, monospace';
  const red = ctx.at(0, 'redesigns'), anim = ctx.at(0, 'animated'), timed = ctx.at(0, 'timed');

  stage.style.background = 'radial-gradient(90% 90% at 50% 40%, #f7f2e9 0%, #ebe3d5 70%, #e2d8c7 100%)';
  const dots = el('div', 'abs', stage, { inset: 0, backgroundImage: 'radial-gradient(rgba(12,13,16,.13) 1.4px, transparent 1.6px)', backgroundSize: '40px 40px', opacity: 0.6 });
  const persp = el('div', 'abs', stage, { inset: 0, perspective: '2600px', perspectiveOrigin: '50% 40%' });
  const world = el('div', 'abs', persp, { left: '320px', top: '150px', width: '1280px', height: '720px', transformStyle: 'preserve-3d' });

  const L = (css) => el('div', 'abs', world, Object.assign({ left: 0, top: 0, width: '1280px', height: '720px', borderRadius: '22px' }, css));
  // L0 stage
  const L0 = L({ background: 'radial-gradient(90% 90% at 70% 20%, #1d1913 0%, #0d0d10 60%, #08080a 100%)', boxShadow: '0 50px 120px rgba(40,25,10,.35)', overflow: 'hidden' });
  for (let i = 1; i < 12; i++) el('div', 'abs', L0, { left: i * (1280 / 12) + 'px', top: 0, bottom: 0, width: '1px', background: 'rgba(63,217,198,.10)' });
  // L1 light
  const L1 = L({ border: '2px dashed rgba(12,13,16,0)', overflow: 'hidden', background: 'rgba(14,13,12,0)' });
  el('div', 'abs', L1, { left: '640px', top: '-260px', width: '900px', height: '800px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,170,70,.55), transparent 70%)', mixBlendMode: 'screen' });
  const ring = el('div', 'abs', L1, { left: '850px', top: '40px', width: '360px', height: '360px', borderRadius: '50%', border: '3px solid rgba(255,179,64,.85)', boxShadow: '0 0 60px rgba(255,179,64,.5), inset 0 0 40px rgba(255,179,64,.3)' });
  const orbit = el('div', 'abs', L1, { left: '850px', top: '40px', width: '360px', height: '360px' });
  el('div', 'abs', orbit, { left: '168px', top: '-12px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff1d6', boxShadow: '0 0 24px 8px rgba(255,179,64,.8)' });
  // L2 type
  const L2 = L({ border: '2px dashed rgba(12,13,16,0)', background: 'rgba(14,13,12,0)' });
  const eb = el('div', 'abs', L2, { left: '92px', top: '84px', font: `600 22px/1 ${MONO}`, letterSpacing: '.3em', color: 'var(--amber)' }); eb.textContent = 'HOW IT WORKS';
  const h1 = el('div', 'abs', L2, { left: '86px', top: '128px', font: '900 116px/0.98 "Inter Display", Inter', letterSpacing: '-.05em', color: 'var(--paper)', whiteSpace: 'nowrap' });
  h1.innerHTML = 'From slides<br><span style="background:linear-gradient(90deg,#ffc65a,#ff5a2c);-webkit-background-clip:text;background-clip:text;color:transparent">to scenes.</span>';
  // L3 cards
  const L3 = L({ border: '2px dashed rgba(12,13,16,0)', background: 'rgba(14,13,12,0)' });
  const STEPS = ['Reads the deck', 'Tightens the story', 'Notes become voiceover', 'Animated scenes'];
  const cards = STEPS.map((t, i) => {
    const c = el('div', 'abs', L3, { left: 90 + i * 282 + 'px', top: '468px', width: '262px', height: '172px', borderRadius: '18px', background: 'rgba(255,255,255,.07)', border: '1.5px solid rgba(255,255,255,.16)', padding: '24px 24px', boxShadow: '0 20px 40px rgba(0,0,0,.35)' });
    const n = el('div', '', c, { font: `600 20px/1 ${MONO}`, color: 'var(--amber)', letterSpacing: '.1em', marginBottom: '16px' }); n.textContent = '0' + (i + 1);
    const tt = el('div', '', c, { font: '700 32px/1.1 Inter', letterSpacing: '-.02em', color: 'var(--paper)' }); tt.textContent = t;
    return c;
  });
  // the original slide on top
  const orig = el('img', 'abs', world, { left: 0, top: 0, width: '1280px', height: '720px', borderRadius: '6px', boxShadow: '0 30px 70px rgba(40,25,10,.3)' }); orig.src = ctx.asset('slide-2.png');
  const tag = el('div', 'abs', stage, { left: '320px', top: '98px', font: `500 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'rgba(12,13,16,.55)' }); tag.textContent = 'SLIDE 2  ·  AS WRITTEN';

  // layer labels (inside each layer, so they ride the 3D)
  const layers = [L0, L1, L2, L3], names = ['STAGE', 'LIGHT', 'TYPE', 'CARDS'];
  const labels = layers.map((Ly, i) => {
    const g = el('div', 'abs', Ly === L0 ? world : Ly, { left: '-420px', top: '300px', width: '380px', height: '60px' });
    if (Ly === L0) g.style.transform = 'translateZ(0px)';
    const ln = el('div', 'abs', g, { right: 0, top: '29px', width: '90px', height: '2px', background: '#0c0d10' });
    const dt = el('div', 'abs', g, { right: '-7px', top: '23px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--ember)' });
    const tx = el('div', 'abs', g, { right: '110px', top: '14px', font: `700 46px/1 ${MONO}`, letterSpacing: '.12em', color: '#0c0d10', whiteSpace: 'nowrap' }); tx.textContent = names[i];
    return g;
  });
  const Z = [0, 250, 500, 750];

  /* ---- timeline strip ---- */
  const strip = el('div', 'abs', stage, { left: '243px', top: '930px', width: '1434px', height: '90px' });
  const track = el('div', 'abs', strip, { left: 0, right: 0, top: '44px', height: '2px', background: 'rgba(12,13,16,.25)', transformOrigin: '0 50%' });
  const rr = ctx.rand(5);
  const mini = Array.from({ length: 96 }, (_, i) => { const u = i / 95, h = 6 + rr() * 30 * Math.pow(Math.sin(Math.PI * u), 0.5); return el('div', 'abs', strip, { left: u * 1430 + 'px', top: 45 - h / 2 + 'px', width: '5px', height: h + 'px', borderRadius: '3px', background: 'rgba(12,13,16,.22)' }); });
  const KF = [0.16, 0.39, 0.62, 0.85];
  const dia = KF.map((u) => el('div', 'abs', strip, { left: u * 1434 - 13 + 'px', top: '32px', width: '26px', height: '26px', background: 'var(--ember)', transform: 'rotate(45deg)', boxShadow: '0 4px 12px rgba(255,90,44,.4)' }));
  const slab = el('div', 'abs', strip, { left: 0, top: '-6px', font: `600 18px/1 ${MONO}`, letterSpacing: '.16em', color: 'rgba(12,13,16,.6)' }); slab.textContent = 'NARRATION';
  const head = el('div', 'abs', strip, { left: 0, top: '-10px', width: '3px', height: '110px', background: '#0c0d10', opacity: 0 });
  const ph = { u: 0 };

  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });
  ctx.onFrame(() => {
    head.style.left = ph.u * 1434 - 1 + 'px';
    mini.forEach((m, i) => { m.style.background = i / 95 <= ph.u && ph.u > 0 ? '#0c0d10' : 'rgba(12,13,16,.22)'; });
  });

  /* ---- timeline ---- */
  gsap.set(layers.slice(1), { opacity: 0 });
  gsap.set(labels, { opacity: 0 });
  tl.fromTo(persp, { scale: 1 }, { scale: 1.03, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(orig, { y: 30, opacity: 0, duration: 0.5 }, 0);
  tl.from(tag, { opacity: 0, duration: 0.4 }, 0.1);

  // "redesigns": explode into layers
  const E = red - 0.05;
  tl.to(tag, { opacity: 0, duration: 0.3 }, E);
  tl.to(orig, { opacity: 0, duration: 0.18, ease: 'power1.in' }, E);
  tl.to(world, { rotationX: 66, rotationZ: -26, scale: 0.5, x: 70, y: 330, duration: 1.1, ease: 'expo.inOut' }, E);
  layers.forEach((Ly, i) => {
    tl.fromTo(Ly, { z: 0 }, { z: Z[i], duration: 1.1, ease: 'expo.inOut', immediateRender: false }, E + i * 0.05);
    if (i) tl.to(Ly, { opacity: 1, duration: 0.3 }, E + 0.04 + i * 0.06);
  });
  tl.to([L1, L2, L3], { borderColor: 'rgba(255,179,64,.55)', backgroundColor: 'rgba(16,15,14,.86)', duration: 0.4 }, E + 0.3);
  tl.fromTo(labels, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, immediateRender: false }, E + 0.8);
  tl.to(world, { rotationZ: -21, duration: anim + 0.3 - E - 1.1, ease: 'sine.inOut' }, E + 1.1);

  // "animated scene": slam together, camera front-on
  const C = anim + 0.3;
  tl.to(labels, { opacity: 0, duration: 0.25 }, C);
  tl.to([L1, L2, L3], { borderColor: 'rgba(255,179,64,0)', duration: 0.3 }, C);
  tl.to([L1, L2, L3], { backgroundColor: 'rgba(16,15,14,0)', duration: 0.3 }, C + 0.62);
  layers.forEach((Ly) => tl.to(Ly, { z: 0, duration: 0.85, ease: 'expo.inOut' }, C));
  tl.to(world, { rotationX: 0, rotationZ: 0, scale: 1.1, x: 0, y: -40, duration: 0.95, ease: 'expo.inOut' }, C);
  tl.to(orbit, { rotation: 360 * 1.4, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(ring, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1 }, C + 0.85);
  tl.to(L0, { boxShadow: '0 60px 140px rgba(255,120,40,.45)', duration: 0.3, yoyo: true, repeat: 1 }, C + 0.85);

  // "timed": strip draws, playhead fires each card on its keyframe
  tl.fromTo(track, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, timed - 0.5);
  tl.from(mini, { scaleY: 0, duration: 0.4, stagger: 0.004 }, timed - 0.45);
  tl.from(dia, { scale: 0, rotation: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(2.5)' }, timed - 0.3);
  tl.from(slab, { opacity: 0, duration: 0.4 }, timed - 0.4);
  tl.to(head, { opacity: 1, duration: 0.1 }, timed);
  const PD = ctx.dur - timed - 0.4;
  tl.fromTo(ph, { u: 0 }, { u: 1, duration: PD, ease: 'none', immediateRender: false }, timed);
  KF.forEach((u, i) => {
    const t = timed + PD * u;
    tl.to(dia[i], { scale: 1.5, duration: 0.12, yoyo: true, repeat: 1 }, t);
    tl.to(cards[i], { y: -14, background: 'rgba(255,179,64,.18)', borderColor: 'rgba(255,179,64,.9)', boxShadow: '0 24px 60px rgba(255,140,40,.35)', duration: 0.25, ease: 'back.out(2)' }, t);
    tl.to(cards[i], { y: 0, background: 'rgba(255,255,255,.07)', borderColor: 'rgba(255,179,64,.35)', boxShadow: '0 20px 40px rgba(0,0,0,.35)', duration: 0.6 }, t + 0.45);
  });
});

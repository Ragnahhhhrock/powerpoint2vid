/* Scene 0 — "Your team presents the same onboarding deck to every new starter. What if they could watch it
 * on day one, at their own pace, with the same message every time?"
 * Storyboard: a night stage with one presenter silhouette under a spotlight, clicking through the deck's
 * real (messy) slide on a screen. The click repeats and speeds up while a ghosted counter ticks "new starter
 * #01…#06", landing on "every new starter". On "What if" the presenter fades, the camera re-frames and the
 * headline "Onboarding videos from your existing PowerPoint" settles at 120px, rebuilt cleanly (no overlap).
 * On "watch" the screen flips into a coral-glowing play frame and "DAY 1" pops on "day". On "own pace" a
 * scrubber draws beneath it and its knob moves at an easy pace. On "same message every time" two identical
 * frames slide in from scattered angles and settle into one perfectly aligned stack. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T1 = ctx.beats[1].t;
  const W = 800, H = 450, FX = 560, FY = 410;
  const watch = ctx.at(1, 'watch'), day = ctx.at(1, 'day'), own = ctx.at(1, 'own'), pace = ctx.at(1, 'pace');
  const same = ctx.at(1, 'same'), time = ctx.at(1, 'time?');
  const mono = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 55% 45%, #1a2338 0%, var(--night) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 360px' });

  /* ---- night stage: spotlight, ghost numeral, presenter ---- */
  const spot = el('div', 'abs', cam, { left: '40px', top: 0, width: '700px', height: '1080px',
    background: 'radial-gradient(45% 55% at 50% 82%, rgba(255,197,71,.16), transparent 72%), linear-gradient(180deg, rgba(255,197,71,.07), transparent 85%)',
    clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)' });
  const ghostNum = el('div', 'abs', cam, { left: '90px', top: '110px', font: '900 300px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'rgba(255,255,255,.06)', fontVariantNumeric: 'tabular-nums' });
  const liveTag = el('div', 'abs', cam, { left: '100px', top: '90px', font: mono, letterSpacing: '.16em', color: 'var(--coral)' });
  liveTag.textContent = '● LIVE SESSION';
  const counter = el('div', 'abs', cam, { right: '100px', top: '90px', font: mono, letterSpacing: '.14em', color: 'var(--slate)', opacity: 0.75, fontVariantNumeric: 'tabular-nums' });

  const pres = el('div', 'abs', cam, { left: '240px', top: '560px', width: '240px', height: '430px' });
  const body = '#1f283d', rim = 'inset -5px 0 0 rgba(255,197,71,.28)';
  el('div', 'abs', pres, { left: '60px', top: 0, width: '80px', height: '80px', borderRadius: '50%', background: body, boxShadow: rim });
  el('div', 'abs', pres, { left: '20px', top: '92px', width: '160px', height: '340px', borderRadius: '80px 80px 18px 18px', background: body, boxShadow: rim });
  const arm = el('div', 'abs', pres, { left: '150px', top: '112px', width: '26px', height: '170px', borderRadius: '13px', background: body, boxShadow: rim, transformOrigin: '13px 13px' });
  const clicker = el('div', 'abs', arm, { left: '5px', bottom: '-4px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--coral)', boxShadow: '0 0 0px rgba(255,107,91,0)' });

  /* ---- headline (rebuilt cleanly) ---- */
  const head = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '110px', textAlign: 'center', font: '800 120px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)' });
  const l1 = el('div', '', head, { whiteSpace: 'nowrap' }), l2 = el('div', '', head, { whiteSpace: 'nowrap' });
  const w1 = ctx.split(l1, 'Onboarding videos from', 'word'), w2 = ctx.split(l2, 'your existing PowerPoint', 'word');
  w1[1].style.color = 'var(--coral)';
  const words = [...w1, ...w2];

  /* ---- ghost frames (stack) ---- */
  const mkFace = (parent, dim) => {
    parent.style.background = 'radial-gradient(60% 70% at 50% 50%, rgba(255,107,91,.22), transparent 70%), linear-gradient(160deg, #222b40, var(--night))';
    const b = el('div', 'abs', parent, { left: W / 2 - 75 + 'px', top: H / 2 - 75 + 'px', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--coral)', opacity: dim, boxShadow: '0 0 60px rgba(255,107,91,.6)' });
    el('div', 'abs', b, { left: '60px', top: '45px', width: 0, height: 0, borderTop: '30px solid transparent', borderBottom: '30px solid transparent', borderLeft: '46px solid #fff' });
    return b;
  };
  const ghosts = [0.7, 0.42].map((o) => {
    const g = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: W + 'px', height: H + 'px', borderRadius: '14px', overflow: 'hidden', border: '2px solid rgba(255,107,91,.55)', boxSizing: 'border-box', opacity: 0 });
    mkFace(g, 0.8);
    return { g, o };
  });
  ghosts.reverse(); // farthest first in DOM order already; keep refs: ghosts[0] = far

  /* ---- the screen ---- */
  const screen = el('div', 'abs', cam, { left: FX + 'px', top: FY + 'px', width: W + 'px', height: H + 'px', borderRadius: '14px', overflow: 'hidden', background: '#fff' });
  const img = el('img', 'abs', screen, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' });
  img.src = ctx.asset('slide-1.png');
  const flash = el('div', 'abs', screen, { inset: 0, background: '#fff', opacity: 0 });
  const play = el('div', 'abs', screen, { inset: 0, opacity: 0 });
  const playBtn = mkFace(play, 1);
  const dayChip = el('div', 'abs', play, { left: '28px', top: '26px', padding: '10px 16px', borderRadius: '8px', background: 'var(--sun)', color: 'var(--night)', font: '800 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em' });
  dayChip.textContent = 'DAY 1';

  /* ---- scrubber ---- */
  const track = el('div', 'abs', cam, { left: FX + 'px', top: FY + H + 46 + 'px', width: W + 'px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.16)', transformOrigin: '0 50%' });
  const fill = el('div', 'abs', track, { left: 0, top: 0, width: W + 'px', height: '6px', borderRadius: '3px', background: 'var(--coral)', transformOrigin: '0 50%' });
  const knob = el('div', 'abs', track, { left: '-13px', top: '-10px', width: '26px', height: '26px', borderRadius: '50%', background: 'var(--paper)', boxShadow: '0 0 24px rgba(255,107,91,.8)' });
  const scrub = { p: 0 };

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const cnt = { n: 1 };
  ctx.onFrame(() => {
    const n = Math.max(1, Math.round(cnt.n));
    counter.textContent = 'NEW STARTER #' + String(n).padStart(2, '0');
    ghostNum.textContent = String(n).padStart(2, '0');
    gsap.set(fill, { scaleX: scrub.p });
    gsap.set(knob, { x: scrub.p * W });
  });

  /* ---- initial states ---- */
  gsap.set(screen, { x: 220, y: -70, scale: 1.2, transformPerspective: 1400, boxShadow: '0 30px 80px rgba(0,0,0,.55), 0 0 0px rgba(255,107,91,0)' });
  gsap.set(arm, { rotation: -22 });
  gsap.set(words, { opacity: 0, y: 70 });
  gsap.set([track, knob], { opacity: 0 });
  gsap.set(track, { scaleX: 0 });
  gsap.set(dayChip, { scale: 0, opacity: 0 });

  /* ---- opening ---- */
  tl.from(screen, { opacity: 0, duration: 0.6 }, 0);
  tl.from(pres, { opacity: 0, x: -40, duration: 0.7 }, 0.05);
  tl.from([spot, ghostNum], { opacity: 0, duration: 0.8 }, 0);
  tl.from([liveTag, counter], { opacity: 0, y: -10, duration: 0.5, stagger: 0.1 }, 0.2);
  tl.to(cam, { scale: 1.02, duration: T1, ease: 'none' }, 0);

  /* ---- the repeated click, accelerating to "every new starter" ---- */
  const clicks = [ctx.at(0, 'team'), ctx.at(0, 'onboarding'), ctx.at(0, 'every'), ctx.at(0, 'new'), ctx.at(0, 'starter.')];
  clicks.forEach((c, k) => {
    tl.to(arm, { rotation: -64, duration: 0.1, ease: 'power2.out' }, c - 0.1);
    tl.to(arm, { rotation: -22, duration: 0.3, ease: 'power2.inOut' }, c + 0.05);
    tl.fromTo(clicker, { boxShadow: '0 0 30px rgba(255,107,91,1)' }, { boxShadow: '0 0 0px rgba(255,107,91,0)', duration: 0.3, immediateRender: false }, c);
    tl.fromTo(flash, { opacity: 0.7 }, { opacity: 0, duration: 0.3, immediateRender: false }, c);
    tl.fromTo(img, { x: 40, opacity: 0.3 }, { x: 0, opacity: 1, duration: 0.3, immediateRender: false }, c);
    tl.to(cnt, { n: k + 2, duration: 0.12, ease: 'none' }, c);
    tl.fromTo(ghostNum, { scale: 1.06 }, { scale: 1, duration: 0.3, immediateRender: false }, c);
  });
  tl.to(counter, { color: 'var(--coral)', opacity: 1, duration: 0.3 }, clicks[2]);

  /* ---- "What if": the stage re-frames, headline settles ---- */
  tl.to(screen, { x: 0, y: 0, scale: 1, duration: 1.0, ease: 'expo.inOut' }, T1 - 0.25);
  tl.to(pres, { x: -220, opacity: 0, duration: 0.8, ease: 'power2.in' }, T1 - 0.25);
  tl.to([spot, liveTag, counter, ghostNum], { opacity: 0, duration: 0.6 }, T1 - 0.2);
  tl.to(words, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)', stagger: 0.06 }, T1);

  /* ---- "watch": the slide flips into a play frame ---- */
  tl.to(screen, { rotationY: 90, duration: 0.22, ease: 'power2.in' }, watch - 0.22);
  tl.set([img, flash], { opacity: 0 }, watch);
  tl.set(play, { opacity: 1 }, watch);
  tl.fromTo(screen, { rotationY: -90 }, { rotationY: 0, duration: 0.75, ease: 'back.out(1.6)', immediateRender: false }, watch);
  tl.to(screen, { boxShadow: '0 30px 80px rgba(0,0,0,.55), 0 0 90px rgba(255,107,91,.55)', duration: 0.6 }, watch + 0.1);
  tl.fromTo(playBtn, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, watch + 0.1);
  tl.to(cam, { scale: 1.045, duration: 1.2, ease: 'expo.inOut' }, watch - 0.2);
  tl.to(cam, { scale: 1.05, duration: ctx.dur - watch - 1, ease: 'none' }, watch + 1);

  // "day one"
  tl.to(dayChip, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, day - 0.05);

  /* ---- "own pace": scrubber ---- */
  tl.to(track, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power3.out' }, own - 0.2);
  tl.to(knob, { opacity: 1, duration: 0.2 }, own + 0.1);
  tl.to(scrub, { p: 0.38, duration: 1.4, ease: 'sine.inOut' }, own + 0.1);
  tl.to(scrub, { p: 0.62, duration: ctx.dur - own - 1.5, ease: 'none' }, own + 1.5);

  /* ---- "same message every time": identical frames stack, aligned ---- */
  const far = ghosts[0], near = ghosts[1];
  tl.fromTo(far.g, { opacity: 0, x: 170, y: -110, rotation: 7 }, { opacity: far.o, x: 36, y: -36, rotation: 0, duration: time - same + 0.2, ease: 'back.out(1.3)', immediateRender: false }, same - 0.1);
  tl.fromTo(near.g, { opacity: 0, x: -160, y: 70, rotation: -8 }, { opacity: near.o, x: 18, y: -18, rotation: 0, duration: time - same + 0.1, ease: 'back.out(1.3)', immediateRender: false }, same);
  tl.to(screen, { boxShadow: '0 30px 80px rgba(0,0,0,.55), 0 0 130px rgba(255,107,91,.75)', duration: 0.4, yoyo: true, repeat: 1 }, time);
});

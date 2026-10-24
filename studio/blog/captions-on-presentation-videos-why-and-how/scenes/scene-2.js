/* Scene 3 — "Burned-in captions are always there, ideal for social feeds and email.
 * Closed captions are a separate track viewers can switch off, often expected by an LMS."
 * Storyboard: the title builds word by word. On "Burned-in" a video frame pops in with its caption baked
 * into the picture; on "always there" a scan sweeps the frame and the caption locks in with a glow.
 * SOCIAL and EMAIL chips land on "social feeds" and "email". On "Closed" a second frame arrives and the
 * first dims. On "separate track" the caption lifts off as its own SRT/VTT layer, then settles back.
 * On "switch off" a CC toggle flips and the caption vanishes, leaving a ghost outline. LMS lands on "LMS". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tBurn = A(0, 'Burned-in'), tCap = A(0, 'captions'), tAlways = A(0, 'always'), tSocial = A(0, 'social'), tEmail = A(0, 'email.');
  const tClosed = A(1, 'Closed'), tTrack = A(1, 'track'), tSwitch = A(1, 'switch'), tOff = A(1, 'off,'), tLMS = A(1, 'LMS.');
  const MONO = 'ui-monospace, Menlo, monospace';
  const W = 760, H = 428, TOP = 290, LX = 150, RX = 1010;

  stage.style.background = 'radial-gradient(60% 55% at 30% 45%, #1a1f52 0%, transparent 70%), radial-gradient(55% 50% at 75% 60%, #22164f 0%, transparent 70%), var(--night)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* title */
  const title = el('div', 'abs', cam, { left: '150px', top: '100px', width: '1620px', font: '800 76px/1.05 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff' });
  const words = ctx.split(title, 'Burned-in or closed captions', 'word');
  words.forEach((w, i) => { if (i === 0) w.style.color = 'var(--coral)'; if (i === 2) w.style.color = 'var(--violet-hi)'; });

  /* fake presentation video frame */
  const makeFrame = (x, accent, label) => {
    const wrap = el('div', 'abs', cam, { left: x + 'px', top: TOP + 'px', width: W + 'px', height: H + 'px' });
    const lab = el('div', 'abs', wrap, { left: '2px', top: '-44px', font: `700 22px/1 ${MONO}`, letterSpacing: '.16em', color: accent });
    lab.textContent = label;
    const fr = el('div', 'abs', wrap, { inset: 0, borderRadius: '18px', overflow: 'hidden', background: 'linear-gradient(160deg, #1b2150 0%, #10153a 100%)', boxShadow: '0 40px 90px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.08)' });
    // slide-like content
    el('div', 'abs', fr, { left: '50px', top: '46px', width: '300px', height: '22px', borderRadius: '6px', background: 'rgba(255,255,255,.75)' });
    el('div', 'abs', fr, { left: '50px', top: '84px', width: '200px', height: '14px', borderRadius: '5px', background: 'rgba(255,255,255,.25)' });
    [0.45, 0.7, 0.55, 0.95].forEach((v, i) => el('div', 'abs', fr, { left: 430 + i * 66 + 'px', top: 250 - v * 170 + 'px', width: '44px', height: v * 170 + 'px', borderRadius: '8px 8px 2px 2px', background: i === 3 ? accent : 'rgba(143,117,255,.45)' }));
    // play bar
    el('div', 'abs', fr, { left: '24px', right: '24px', bottom: '18px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.18)' });
    const prog = el('div', 'abs', fr, { left: '24px', bottom: '18px', height: '5px', width: '0px', borderRadius: '3px', background: accent });
    return { wrap, fr, lab, prog };
  };
  const capStyle = { left: '110px', width: (W - 220) + 'px', top: '300px', height: '64px', borderRadius: '10px', background: 'rgba(5,7,20,.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 30px/1 Inter', letterSpacing: '-.01em', color: '#fff' };

  const L = makeFrame(LX, '#ff6b4a', 'BURNED-IN');
  const lCap = el('div', 'abs', L.fr, capStyle); lCap.textContent = 'Captions help everyone follow.';
  const scan = el('div', 'abs', L.fr, { top: 0, bottom: 0, left: '-160px', width: '140px', background: 'linear-gradient(90deg, transparent, rgba(255,140,110,.45), transparent)', mixBlendMode: 'screen' });

  const R = makeFrame(RX, '#8f75ff', 'CLOSED');
  const ghost = el('div', 'abs', R.wrap, { ...capStyle, background: 'transparent', border: '2px dashed rgba(143,117,255,.6)', boxSizing: 'border-box', opacity: 0 });
  const rCap = el('div', 'abs', R.wrap, { ...capStyle, boxShadow: '0 0 0 0 rgba(143,117,255,0)' }); rCap.textContent = 'Captions help everyone follow.';
  const trackTag = el('div', 'abs', R.wrap, { left: (W - 220) + 'px', top: '448px', font: `700 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--violet-hi)', opacity: 0 });
  trackTag.textContent = 'SRT · VTT';

  /* chips */
  const chip = (x, y, txt, col) => {
    const c = el('div', 'abs', cam, { left: x + 'px', top: y + 'px', padding: '16px 26px', borderRadius: '40px', font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: '#fff', background: 'rgba(255,255,255,.06)', border: `2px solid ${col}`, boxShadow: `0 0 30px ${col}55` });
    c.textContent = txt; return c;
  };
  const cSocial = chip(LX, 790, 'SOCIAL', '#ff6b4a');
  const cEmail = chip(LX + 200, 790, 'EMAIL', '#ff6b4a');
  const cLMS = chip(RX + 330, 790, 'LMS', '#1fbf8f');

  /* CC toggle */
  const tog = el('div', 'abs', cam, { left: RX + 'px', top: '786px', width: '280px', height: '64px' });
  const ccLab = el('div', 'abs', tog, { left: 0, top: '20px', font: `800 26px/1 ${MONO}`, letterSpacing: '.1em', color: '#fff' }); ccLab.textContent = 'CC';
  const pill = el('div', 'abs', tog, { left: '70px', top: '4px', width: '112px', height: '56px', borderRadius: '30px', background: '#6d4aff', boxShadow: '0 0 30px rgba(109,74,255,.6)' });
  const knob = el('div', 'abs', pill, { left: '60px', top: '6px', width: '44px', height: '44px', borderRadius: '50%', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,.4)' });
  const state = el('div', 'abs', tog, { left: '200px', top: '22px', font: `700 20px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--muted)' });
  ctx.onFrame((t) => { state.textContent = t < tOff ? 'ON' : 'OFF'; });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set([L.wrap, R.wrap], { filter: 'brightness(1) blur(0px)' });
  tl.fromTo(cam, { scale: 1, x: 0 }, { scale: 1.035, x: -12, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(words, { y: 50, opacity: 0, duration: 0.6, stagger: 0.09, ease: 'back.out(1.6)' }, 0.05);

  // Burned-in
  tl.from(L.wrap, { y: 80, opacity: 0, scale: 0.92, duration: 0.8, ease: 'back.out(1.5)' }, tBurn - 0.2);
  tl.from(L.lab, { opacity: 0, x: -20, duration: 0.5 }, tBurn);
  tl.to(L.prog, { width: (W - 48) + 'px', duration: ctx.dur - tBurn, ease: 'none' }, tBurn);
  tl.from(lCap, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(1.8)' }, tCap);
  tl.to(scan, { left: W + 40 + 'px', duration: 0.7, ease: 'power2.inOut' }, tAlways - 0.1);
  tl.to(lCap, { boxShadow: '0 0 0 3px #ff6b4a, 0 0 40px rgba(255,107,74,.7)', duration: 0.3 }, tAlways + 0.25);
  tl.to(lCap, { boxShadow: '0 0 0 0px #ff6b4a, 0 0 0px rgba(255,107,74,0)', duration: 0.8 }, tAlways + 0.9);
  tl.from(cSocial, { scale: 0.3, opacity: 0, duration: 0.55, ease: 'back.out(2)' }, tSocial);
  tl.from(cEmail, { scale: 0.3, opacity: 0, duration: 0.55, ease: 'back.out(2)' }, tEmail);

  // Closed
  tl.to([L.wrap], { filter: 'brightness(.55) blur(1px)', duration: 0.7 }, tClosed - 0.2);
  tl.to([cSocial, cEmail], { opacity: 0.5, duration: 0.7 }, tClosed - 0.2);
  tl.from(R.wrap, { y: 80, opacity: 0, scale: 0.92, duration: 0.8, ease: 'back.out(1.5)' }, tClosed - 0.2);
  tl.from(R.lab, { opacity: 0, x: -20, duration: 0.5 }, tClosed);
  tl.to(R.prog, { width: (W - 48) + 'px', duration: ctx.dur - tClosed, ease: 'none' }, tClosed);
  tl.from(rCap, { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(1.8)' }, A(1, 'captions'));
  tl.from(tog, { opacity: 0, y: 30, duration: 0.6, ease: 'back.out(1.6)' }, tClosed + 0.4);

  // separate track: caption lifts off as its own layer
  tl.to(ghost, { opacity: 1, duration: 0.3 }, tTrack - 0.2);
  tl.to(rCap, { y: 70, x: 40, rotation: -2, background: 'rgba(40,28,110,.95)', boxShadow: '0 20px 50px rgba(0,0,0,.6), 0 0 0 2px #8f75ff', duration: 0.55, ease: 'back.out(1.6)' }, tTrack - 0.25);
  tl.to(trackTag, { opacity: 1, duration: 0.3 }, tTrack);
  tl.to(rCap, { y: 0, x: 0, rotation: 0, background: 'rgba(5,7,20,.82)', boxShadow: '0 0 0 0px #8f75ff', duration: 0.4, ease: 'power3.inOut' }, tSwitch - 0.45);

  // switch off
  tl.to(knob, { left: '8px', duration: 0.35, ease: 'back.out(1.8)' }, tSwitch);
  tl.to(pill, { background: '#3a3f63', boxShadow: '0 0 0px rgba(109,74,255,0)', duration: 0.35 }, tSwitch);
  tl.to(rCap, { opacity: 0, scale: 0.9, duration: 0.35, ease: 'power2.in' }, tOff - 0.1);
  tl.to(ghost, { opacity: 0.45, duration: 0.4 }, tOff);

  // LMS
  tl.from(cLMS, { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, tLMS - 0.1);
  tl.to(cLMS, { boxShadow: '0 0 60px rgba(31,191,143,.8)', duration: 0.4, yoyo: true, repeat: 1 }, tLMS + 0.4);
});

/* Scene 3 — "Try the glance test. Look for three seconds, then look away. Can you say what it was about?
 * Your headline should make a point, not a label."
 * Storyboard: bright paper stage. A test rail rebuilds the slide's bullets one at a time (01 Glance, 02 Point).
 * A huge teal "3" counts down to 0 while a crowded slide flickers beside it. On "look away" the frame
 * blacks out for a beat, then a single ink "?" lands. On "headline" a slate label "Leave policy" appears;
 * on "point" a coral sentence headline rises beneath; on "not" the label is struck through, on "label" it recedes. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const R = ctx.rand(7);
  const tGlance = ctx.at(0, 'glance'), tTry = ctx.at(0, 'Try');
  const tLookAway = ctx.at(1, 'away'), tCan = ctx.at(2, 'Can'), tAbout = ctx.at(2, 'about?');
  const tHead = ctx.at(3, 'headline'), tPoint = ctx.at(3, 'point,'), tNot = ctx.at(3, 'not'), tLabel = ctx.at(3, 'label.');
  const MONO = 'ui-monospace, Menlo, monospace';
  const CD0 = tGlance, STEP = 0.8; // countdown: 3 at glance, 0 just before "away"

  stage.style.background = 'radial-gradient(70% 60% at 50% 45%, #fffdf8 0%, var(--paper) 60%, #e9e4d8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });

  /* ---- test rail: the bullets, rebuilt one at a time ---- */
  const rail = el('div', 'abs', cam, { left: '120px', top: '86px', display: 'flex', gap: '18px' });
  const pill = (txt) => el('div', '', rail, { font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--ink)', padding: '14px 22px', borderRadius: '999px', border: '2px solid rgba(20,22,31,.18)', background: 'rgba(255,255,255,.6)' });
  const p1 = pill(); p1.textContent = '01 · GLANCE TEST';
  const p2 = pill(); p2.textContent = '02 · POINT, NOT LABEL';

  /* ---- section 1: countdown + flickering crowded slide ---- */
  const g1 = el('div', 'abs', cam, { inset: 0 });
  const numGlow = el('div', 'abs', g1, { left: '170px', top: '250px', width: '540px', height: '540px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,181,168,.28), transparent 65%)' });
  const num = el('div', 'abs', g1, { left: '160px', top: '210px', width: '560px', textAlign: 'center', font: '900 600px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'var(--teal)', fontVariantNumeric: 'tabular-nums', transformOrigin: '50% 55%', textShadow: '0 30px 60px rgba(31,181,168,.25)' });
  num.textContent = '3';
  const timerTrack = el('div', 'abs', g1, { left: '230px', top: '860px', width: '420px', height: '8px', borderRadius: '8px', background: 'rgba(20,22,31,.1)' });
  const timer = el('div', 'abs', timerTrack, { left: 0, top: 0, width: '100%', height: '100%', borderRadius: '8px', background: 'var(--teal)', transformOrigin: '0 50%' });
  const secLab = el('div', 'abs', g1, { left: '230px', top: '894px', width: '420px', textAlign: 'center', font: `700 22px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--slate)' });
  secLab.textContent = 'SECONDS';

  const card = el('div', 'abs', g1, { left: '820px', top: '290px', width: '960px', height: '540px', borderRadius: '14px', background: '#fff', boxShadow: '0 50px 100px rgba(20,22,31,.18), 0 6px 18px rgba(20,22,31,.08)', overflow: 'hidden' });
  el('div', 'abs', card, { left: '60px', top: '48px', width: '520px', height: '30px', borderRadius: '6px', background: 'var(--ink)' });
  for (let i = 0; i < 11; i++) {
    const y = 120 + i * 36, ind = i % 3 === 0 ? 0 : 34;
    if (ind === 0) el('div', 'abs', card, { left: '60px', top: y + 6 + 'px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--slate)' });
    el('div', 'abs', card, { left: 86 + ind + 'px', top: y + 'px', width: 420 + R() * 380 - ind + 'px', height: '18px', borderRadius: '4px', background: 'rgba(20,22,31,.22)' });
  }
  const cardTag = el('div', 'abs', g1, { left: '820px', top: '246px', font: `700 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--slate)' });
  cardTag.textContent = 'YOUR SLIDE';

  /* ---- blackout + question ---- */
  const black = el('div', 'abs', stage, { inset: 0, background: 'var(--night)', opacity: 0 });
  const g2 = el('div', 'abs', cam, { inset: 0 });
  const q = el('div', 'abs', g2, { left: '560px', top: '170px', width: '800px', textAlign: 'center', font: '900 560px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'var(--ink)', transformOrigin: '50% 80%', textShadow: '0 40px 80px rgba(20,22,31,.18)' });
  q.textContent = '?';
  const qLab = el('div', 'abs', g2, { left: '460px', top: '800px', width: '1000px', textAlign: 'center', font: `700 28px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--slate)' });
  qLab.textContent = 'WHAT WAS IT ABOUT?';

  /* ---- section 3: label vs point ---- */
  const g3 = el('div', 'abs', cam, { inset: 0 });
  const labGrp = el('div', 'abs', g3, { left: '160px', top: '300px', width: '1600px', height: '200px', transformOrigin: '50% 50%' });
  const labTag = el('div', 'abs', labGrp, { left: 0, top: 0, width: '1600px', textAlign: 'center', font: `700 22px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--slate)' });
  labTag.textContent = 'LABEL';
  const labTxt = el('div', 'abs', labGrp, { left: 0, top: '46px', width: '1600px', textAlign: 'center', font: '700 110px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--slate)' });
  labTxt.textContent = 'Leave policy';
  const strike = el('div', 'abs', labGrp, { left: '440px', top: '108px', width: '720px', height: '9px', borderRadius: '6px', background: 'var(--coral)', transformOrigin: '0 50%' });

  const ptGrp = el('div', 'abs', g3, { left: '80px', top: '590px', width: '1760px', height: '240px', transformOrigin: '50% 40%' });
  const ptTag = el('div', 'abs', ptGrp, { left: 0, top: 0, width: '1760px', textAlign: 'center', font: `700 22px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--coral)' });
  ptTag.textContent = 'POINT';
  const ptTxt = el('div', 'abs', ptGrp, { left: 0, top: '46px', width: '1760px', textAlign: 'center', font: '800 92px/1.1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--coral)', textShadow: '0 20px 50px rgba(255,90,78,.25)' });
  ptTxt.textContent = 'Request leave two weeks ahead.';
  const ptLine = el('div', 'abs', ptGrp, { left: '680px', top: '170px', width: '400px', height: '6px', borderRadius: '6px', background: 'var(--coral)', opacity: 0.5, transformOrigin: '50% 50%' });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });

  /* countdown digit from t */
  ctx.onFrame((t) => {
    const d = t < CD0 ? 3 : Math.max(0, 3 - Math.floor((t - CD0) / STEP + 1e-6));
    const s = String(d);
    if (num.textContent !== s) num.textContent = s;
  });

  /* ---- timeline ---- */
  gsap.set([g2, g3], { opacity: 1 });
  gsap.set([q, qLab, labGrp, ptGrp, p2], { opacity: 0 });
  gsap.set(strike, { scaleX: 0 });
  gsap.set(ptLine, { scaleX: 0 });

  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'none' }, 0);

  // opening: rail + countdown already alive
  tl.from(p1, { y: -30, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.05);
  tl.from(num, { scale: 0.7, opacity: 0, duration: 0.8, ease: 'back.out(1.6)' }, 0.1);
  tl.from(numGlow, { scale: 0.5, opacity: 0, duration: 1 }, 0.1);
  tl.from([timerTrack, secLab], { opacity: 0, y: 20, duration: 0.6 }, 0.3);
  tl.from([card, cardTag], { x: 80, opacity: 0, duration: 0.7 }, 0.25);
  tl.to(p1, { background: 'var(--teal)', color: '#fff', borderColor: 'var(--teal)', duration: 0.4 }, tTry);

  // timer drains across the three seconds
  tl.fromTo(timer, { scaleX: 1 }, { scaleX: 0, duration: STEP * 3, ease: 'none', immediateRender: false }, CD0);
  [1, 2, 3].forEach((k) => tl.fromTo(num, { scale: 1.12 }, { scale: 1, duration: 0.45, ease: 'back.out(2)', immediateRender: false }, CD0 + k * STEP));

  // the slide flickers on/off while you glance
  const flick = [0.0, 0.18, 0.5, 0.62, 1.1, 1.22, 1.5, 1.58, 1.95, 2.1];
  flick.forEach((o, i) => tl.set(card, { opacity: i % 2 === 0 ? 0.15 : 1 }, CD0 + 0.1 + o));

  // "look away": blackout beat
  tl.to(black, { opacity: 1, duration: 0.12, ease: 'power2.in' }, tLookAway - 0.05);
  tl.set(g1, { opacity: 0 }, tLookAway + 0.1);
  tl.to(black, { opacity: 0, duration: 0.45, ease: 'power2.out' }, tCan - 0.35);

  // the question lands in ink
  tl.fromTo(q, { opacity: 0, scale: 0.6, y: -80 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', immediateRender: false }, tCan - 0.1);
  tl.fromTo(qLab, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, tAbout - 0.15);
  tl.to(q, { rotation: -6, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tAbout);

  // second test
  tl.to([q, qLab], { opacity: 0, y: -60, duration: 0.5, ease: 'power2.in' }, tHead - 0.55);
  tl.to(p1, { background: 'rgba(255,255,255,.6)', color: 'var(--slate)', borderColor: 'rgba(20,22,31,.12)', duration: 0.4 }, tHead - 0.3);
  tl.fromTo(p2, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tHead - 0.3);
  tl.to(p2, { background: 'var(--coral)', color: '#fff', borderColor: 'var(--coral)', duration: 0.4 }, tHead);

  tl.fromTo(labGrp, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, immediateRender: false }, tHead - 0.05);
  tl.fromTo(ptGrp, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)', immediateRender: false }, tPoint - 0.15);
  tl.to(ptLine, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, tPoint + 0.2);
  tl.to(strike, { scaleX: 1, duration: 0.35, ease: 'power2.inOut' }, tNot - 0.05);
  tl.to(labGrp, { opacity: 0.45, scale: 0.8, y: 40, duration: 0.9, ease: 'power2.out' }, tLabel);
  tl.to(ptGrp, { scale: 1.06, y: -30, duration: 1.2, ease: 'power2.out' }, tLabel);
});

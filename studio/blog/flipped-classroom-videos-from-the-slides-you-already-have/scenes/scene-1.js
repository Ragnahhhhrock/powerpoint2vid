/* Scene 2 — "Your slides are already sequenced and matched to your learning outcomes. As videos, students can
 * pause and rewatch, read captions, and hear the same explanation every time."
 * Storyboard: paper stage. A neat row of slide cards slides in from the left; numbered badges pop on "sequenced";
 * a teal thread runs through them to a target icon on "learning outcomes". On "videos" the camera pans right
 * as the row compacts into one video player. "pause" / "rewatch" pop their controls (the playhead holds, then
 * jumps back). "captions" types a caption bar. On "same explanation" three identical waveforms stamp out,
 * then "Consistency" lands. The slide's four bullets become these icons; its overlapping title text is cut. */
P2V.scene((ctx) => {
  const { tl, el, stage, at } = ctx;
  const T = {
    slides: at(0, 'slides'), seq: at(0, 'sequenced'), matched: at(0, 'matched'), learning: at(0, 'learning'), outcomes: at(0, 'outcomes'),
    videos: at(1, 'videos'), pause: at(1, 'pause'), rewatch: at(1, 'rewatch'), read: at(1, 'read'), captions: at(1, 'captions'),
    same: at(1, 'same'), expl: at(1, 'explanation'), every: at(1, 'every'),
  };
  const MONO = 'ui-monospace, Menlo, monospace';
  const PAN = -560;

  stage.style.background = 'radial-gradient(80% 70% at 42% 40%, #fffdf8 0%, var(--paper) 58%, #e9e1cf 100%)';
  const drift = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const world = el('div', 'abs', drift, { left: 0, top: 0, width: '2600px', height: '1080px' });

  // stylised slide face (no text), reused for cards and the player screen
  const slideFace = (parent, accent) => {
    el('div', 'abs', parent, { left: '9%', top: '16%', width: '55%', height: '10%', borderRadius: '4px', background: 'var(--ink)' });
    [[42, 52], [56, 46], [70, 34]].forEach(([y, w]) => el('div', 'abs', parent, { left: '9%', top: y + '%', width: w + '%', height: '5.5%', borderRadius: '3px', background: 'var(--chalk)' }));
    el('div', 'abs', parent, { left: '70%', top: '40%', width: '21%', height: '38%', borderRadius: '8px', background: accent, opacity: 0.85 });
  };

  /* ---------- phase 1: the deck ---------- */
  const deckTag = el('div', 'abs', world, { left: '170px', top: '300px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'rgba(30,36,51,.55)' });
  deckTag.textContent = 'YOUR DECK';

  const thread = el('div', 'abs', world, { left: 0, top: 0, width: '2600px', height: '1080px' });
  thread.innerHTML = `<svg width="2600" height="1080"><path d="M200 480 H1490" fill="none" stroke="#2A9D8F" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`;
  const threadPath = thread.querySelector('path');

  const ACC = ['var(--teal)', 'var(--amber)', 'var(--coral)', 'var(--teal)'];
  const CW = 250, CH = 160, CY = 400;
  const cards = ACC.map((a, i) => {
    const x = 170 + i * 280;
    const card = el('div', 'abs', world, { left: x + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '16px', background: '#fff', border: '1px solid rgba(30,36,51,.08)', boxShadow: '0 24px 50px rgba(30,36,51,.14)' });
    slideFace(card, a);
    const badge = el('div', 'abs', world, { left: x + CW / 2 - 24 + 'px', top: CY - 24 + 'px', width: '48px', height: '48px', borderRadius: '50%', background: 'var(--teal)', color: '#fff', font: `700 20px/48px ${MONO}`, textAlign: 'center', boxShadow: '0 8px 20px rgba(42,157,143,.35)' });
    badge.textContent = '0' + (i + 1);
    return { card, badge, x };
  });

  const target = el('div', 'abs', world, { left: '1500px', top: '380px', width: '200px', height: '200px' });
  target.innerHTML = `<svg width="200" height="200" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="94" fill="#fff" stroke="#E76F51" stroke-width="8"/>
    <circle cx="100" cy="100" r="64" fill="none" stroke="#2A9D8F" stroke-width="8"/>
    <circle cx="100" cy="100" r="34" fill="none" stroke="#E76F51" stroke-width="8"/>
    <circle cx="100" cy="100" r="12" fill="#1E2433"/></svg>`;
  const targetGlow = el('div', 'abs', world, { left: '1440px', top: '320px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,165,65,.35), transparent 65%)', opacity: 0 });
  world.appendChild(target);
  const tLabel = el('div', 'abs', world, { left: '1400px', width: '400px', top: '615px', textAlign: 'center', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--ink)' });
  tLabel.textContent = 'LEARNING OUTCOMES';

  /* ---------- phase 2: the video player ---------- */
  const PX = 760, PY = 170, PW = 960, PH = 540;
  const player = el('div', 'abs', world, { left: PX + 'px', top: PY + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '22px', background: 'var(--ink)', boxShadow: '0 50px 110px rgba(18,24,38,.35), 0 0 0 1px rgba(255,255,255,.04) inset' });
  const screen = el('div', 'abs', player, { left: '30px', top: '30px', width: '900px', height: '410px', borderRadius: '12px', background: '#fff', overflow: 'hidden' });
  slideFace(screen, 'var(--teal)');
  const track = el('div', 'abs', player, { left: '30px', top: '470px', width: '900px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.14)' });
  const fill = el('div', 'abs', track, { left: 0, top: 0, height: '8px', width: '0px', borderRadius: '4px', background: 'var(--teal)' });
  const head = el('div', 'abs', track, { top: '-8px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 16px rgba(42,157,143,.8)', left: '-12px' });
  const timeTxt = el('div', 'abs', player, { left: '30px', top: '496px', font: `600 20px/1 ${MONO}`, letterSpacing: '.08em', color: 'rgba(255,255,255,.6)' });

  const bigPause = el('div', 'abs', screen, { left: '390px', top: '145px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(18,24,38,.75)', opacity: 0 });
  [44, 66].forEach((l) => el('div', 'abs', bigPause, { left: l + 'px', top: '36px', width: '12px', height: '48px', borderRadius: '3px', background: '#fff' }));

  const capBar = el('div', 'abs', screen, { left: '100px', top: '330px', width: '700px', height: '58px', borderRadius: '10px', background: 'rgba(18,24,38,.88)', transformOrigin: '50% 100%' });
  const capTxt = el('div', 'abs', capBar, { left: 0, right: 0, top: 0, textAlign: 'center', font: '600 30px/58px Inter Display, Inter', color: '#fff', whiteSpace: 'pre' });
  const CAPTION = 'Same explanation, every time.';
  const cap = { n: 0 };

  // controls under the player
  const mkBtn = (cx, bg, label) => {
    const b = el('div', 'abs', world, { left: cx - 55 + 'px', top: '745px', width: '110px', height: '110px', borderRadius: '50%', background: bg, boxShadow: '0 18px 40px rgba(30,36,51,.2)' });
    const l = el('div', 'abs', world, { left: cx - 120 + 'px', width: '240px', top: '878px', textAlign: 'center', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--ink)' });
    l.textContent = label;
    return { b, l };
  };
  const pBtn = mkBtn(PX + PW / 2 - 100, 'var(--amber)', 'PAUSE');
  [36, 60].forEach((l) => el('div', 'abs', pBtn.b, { left: l + 'px', top: '33px', width: '14px', height: '44px', borderRadius: '3px', background: 'var(--ink)' }));
  const rBtn = mkBtn(PX + PW / 2 + 100, 'var(--teal)', 'REWATCH');
  rBtn.b.innerHTML = `<svg width="110" height="110" viewBox="0 0 110 110"><path d="M38 40 A24 24 0 1 1 33 64" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M26 30 L38 42 L24 50" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // consistency column
  const r = ctx.rand(7);
  const bars = Array.from({ length: 34 }, (_, i) => 10 + Math.abs(Math.sin(i * 0.55)) * 34 + r() * 18);
  const waveSVG = `<svg width="380" height="70" viewBox="0 0 380 70">${bars.map((h, i) => `<rect x="${i * 11.2}" y="${35 - h / 2}" width="6" height="${h}" rx="3" fill="#2A9D8F"/>`).join('')}</svg>`;
  const waves = [0, 1, 2].map((i) => {
    const w = el('div', 'abs', world, { left: '1820px', top: 200 + i * 150 + 'px', width: '500px', height: '120px', borderRadius: '16px', background: '#fff', border: '1px solid rgba(30,36,51,.08)', boxShadow: '0 20px 44px rgba(30,36,51,.12)' });
    const tag = el('div', 'abs', w, { left: '24px', top: '18px', font: `600 18px/1 ${MONO}`, letterSpacing: '.14em', color: 'rgba(30,36,51,.5)' });
    tag.textContent = 'WATCH ' + (i + 1);
    const s = el('div', 'abs', w, { left: '100px', top: '25px' });
    s.innerHTML = waveSVG;
    return w;
  });
  const cons = el('div', 'abs', world, { left: '1820px', top: '680px', width: '500px', font: '800 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  cons.textContent = 'Consistency';
  const consLine = el('div', 'abs', world, { left: '1822px', top: '768px', width: '220px', height: '8px', borderRadius: '4px', background: 'var(--amber)', transformOrigin: '0% 50%' });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  const prog = { p: 0 };
  ctx.onFrame(() => {
    const w = prog.p * 900;
    fill.style.width = w + 'px';
    head.style.left = w - 12 + 'px';
    const s = Math.round(prog.p * 240);
    timeTxt.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} / 4:00`;
    capTxt.textContent = CAPTION.slice(0, Math.round(cap.n));
  });

  /* ---------- timeline ---------- */
  tl.to(drift, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);

  tl.from(deckTag, { opacity: 0, y: 12, duration: 0.5 }, 0.05);
  cards.forEach((c, i) => tl.from(c.card, { x: -700 - i * 80, opacity: 0, rotation: -4, duration: 0.9, ease: 'power3.out' }, 0.12 + i * 0.1));
  gsap.set(cards.map((c) => c.badge), { scale: 0, opacity: 0 });
  cards.forEach((c, i) => tl.to(c.badge, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, T.seq - 0.05 + i * 0.1));

  tl.to(threadPath, { strokeDashoffset: 0, duration: Math.max(0.5, T.learning - T.matched + 0.1), ease: 'power2.inOut' }, T.matched - 0.1);
  gsap.set([target, tLabel], { opacity: 0 });
  tl.fromTo(target, { scale: 0.3, rotation: -40 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' }, T.learning - 0.1);
  tl.to(tLabel, { opacity: 1, duration: 0.4 }, T.outcomes - 0.05);
  tl.to(targetGlow, { opacity: 1, duration: 0.5, yoyo: true, repeat: 1 }, T.outcomes);
  tl.to(target, { scale: 1.07, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.outcomes + 0.1);

  // "videos": pan right, row compacts into the player
  const vs = T.videos - 0.3;
  tl.to(world, { x: PAN, duration: 1.3, ease: 'expo.inOut' }, vs);
  tl.to([target, tLabel, thread, deckTag, targetGlow], { opacity: 0, duration: 0.5, ease: 'power2.in' }, vs);
  cards.forEach((c, i) => {
    const t = vs + (3 - i) * 0.06;
    tl.to(c.card, { x: PX + PW / 2 - CW / 2 - c.x, y: PY + PH / 2 - CH / 2 - CY - 40, scale: 0.7, rotation: (i - 1.5) * 3, duration: 0.85, ease: 'power3.inOut' }, t);
    tl.to(c.badge, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }, t);
  });
  gsap.set(player, { opacity: 0, scale: 0.6 });
  tl.to(player, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, vs + 0.75);
  tl.to(cards.map((c) => c.card), { opacity: 0, scale: 0.9, duration: 0.3 }, vs + 0.9);

  // playhead story
  tl.to(prog, { p: 0.42, duration: T.pause - (vs + 1.1), ease: 'none' }, vs + 1.1);
  tl.to(prog, { p: 0.12, duration: 0.45, ease: 'power2.inOut' }, T.rewatch);
  tl.to(prog, { p: 0.62, duration: ctx.dur - (T.rewatch + 0.45), ease: 'none' }, T.rewatch + 0.45);

  gsap.set([pBtn.b, rBtn.b], { scale: 0 });
  gsap.set([pBtn.l, rBtn.l], { opacity: 0 });
  tl.to(pBtn.b, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, T.pause - 0.08);
  tl.to(pBtn.l, { opacity: 1, duration: 0.3 }, T.pause + 0.1);
  tl.fromTo(bigPause, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)', immediateRender: false }, T.pause);
  tl.to(bigPause, { opacity: 0, scale: 1.2, duration: 0.35, ease: 'power2.in' }, T.rewatch - 0.15);
  tl.to(rBtn.b, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, T.rewatch - 0.08);
  tl.fromTo(rBtn.b, { rotation: 0 }, { rotation: -360, duration: 0.6, ease: 'power3.inOut', immediateRender: false }, T.rewatch + 0.05);
  tl.to(rBtn.l, { opacity: 1, duration: 0.3 }, T.rewatch + 0.1);

  // captions
  gsap.set(capBar, { scaleY: 0, opacity: 0 });
  tl.to(capBar, { scaleY: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' }, T.read);
  tl.to(cap, { n: CAPTION.length, duration: 1.0, ease: 'none' }, T.captions);

  // consistency: identical waveforms stamp out
  gsap.set(waves, { opacity: 0 });
  [T.same - 0.05, T.expl + 0.05, T.expl + 0.4].forEach((t, i) => {
    tl.fromTo(waves[i], { scale: 1.35, opacity: 0, rotation: i % 2 ? 2 : -2 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.22, ease: 'power4.in', immediateRender: false }, t);
    tl.to(waves[i], { y: 4, duration: 0.07, yoyo: true, repeat: 1 }, t + 0.22);
  });
  gsap.set(cons, { opacity: 0 });
  tl.fromTo(cons, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', immediateRender: false }, T.every - 0.1);
  tl.from(consLine, { scaleX: 0, duration: 0.6, ease: 'power3.out' }, T.every + 0.15);
});

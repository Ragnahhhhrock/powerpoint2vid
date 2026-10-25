/* Scene 3 — "For sensitive material, check your organisation's policy before uploading. Then preview a real deck,
 * not a demo, and ask: does it improve your story, or just play it back?"
 * Storyboard: Paper stage, close. A document with an amber shield hovers above an upload arrow. A scan line runs
 * on "check", the shield pulses on "policy", and a teal tick stamps it before "uploading". On "real deck" the
 * actual slide sweeps in and pushes a glossy DEMO card aside, which is struck through on "not a demo". On "ask"
 * the real slide slides left. On "improve" it blooms into live scenes with motion lines. On "play it back" a
 * ghosted static copy settles beside it in mist. Headline "Improve, or just play back?" lands centre. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const tCheck = A(0, 'check', 1.85), tPolicy = A(0, 'policy', 3.1), tBefore = A(0, 'before', 3.53), tUp = A(0, 'uploading.', 3.87);
  const tPreview = A(1, 'preview', 5.37), tReal = A(1, 'real', 5.91), tDeck = A(1, 'deck,', 6.18), tNot = A(1, 'not', 6.76);
  const tDemo = A(1, 'demo,', 7.06), tAsk = A(1, 'ask:', 7.73), tImprove = A(1, 'improve', 8.64), tPlay = A(1, 'play', 10.22);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 70% at 50% 40%, #fffdf8 0%, var(--paper) 60%, #e9e3d6 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  el('div', 'abs', cam, { inset: 0, background: 'radial-gradient(40% 35% at 50% 48%, rgba(245,184,65,.12), transparent 70%)' });

  /* ---------- phase 1: policy check ---------- */
  const p1 = el('div', 'abs', cam, { inset: 0 });
  const doc = el('div', 'abs', p1, { left: '800px', top: '170px', width: '320px', height: '420px', background: '#fff', borderRadius: '14px', boxShadow: '0 40px 80px rgba(26,31,46,.18), 0 2px 0 rgba(26,31,46,.05)', overflow: 'hidden' });
  el('div', 'abs', doc, { left: '36px', top: '44px', width: '180px', height: '22px', borderRadius: '6px', background: 'var(--ink)' });
  [230, 250, 200, 240, 170, 220, 140].forEach((w, i) => el('div', 'abs', doc, { left: '36px', top: 100 + i * 38 + 'px', width: w + 'px', height: '12px', borderRadius: '6px', background: 'rgba(154,163,181,.45)' }));
  const scan = el('div', 'abs', doc, { left: 0, top: 0, width: '100%', height: '4px', background: 'var(--teal)', boxShadow: '0 0 24px var(--teal)', opacity: 0 });

  const shield = el('div', 'abs', p1, { left: '1050px', top: '130px', width: '120px', height: '124px', transformOrigin: '50% 50%', filter: 'drop-shadow(0 12px 22px rgba(245,184,65,.45))' });
  shield.innerHTML = `<svg width="120" height="124" viewBox="0 0 120 124"><path d="M60 6 L106 22 V58 C106 88 86 106 60 118 C34 106 14 88 14 58 V22 Z" fill="#F5B841"/>
    <circle cx="60" cy="54" r="12" fill="#1A1F2E"/><rect x="54" y="58" width="12" height="28" rx="4" fill="#1A1F2E"/></svg>`;
  const policyLab = el('div', 'abs', p1, { left: '1186px', top: '178px', font: `700 24px/1 ${MONO}`, letterSpacing: '.16em', color: '#b07e17' });
  policyLab.textContent = 'POLICY';

  const tick = el('div', 'abs', p1, { left: '880px', top: '300px', width: '160px', height: '160px', transformOrigin: '50% 50%', filter: 'drop-shadow(0 14px 30px rgba(43,181,163,.45))' });
  tick.innerHTML = `<svg width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="72" fill="#2BB5A3"/>
    <path id="ck" d="M46 82 L70 106 L116 56" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="120" stroke-dashoffset="120"/></svg>`;
  const ck = tick.querySelector('#ck');

  const up = el('div', 'abs', p1, { left: '880px', top: '650px', width: '160px', height: '220px', stroke: '#1A1F2E' });
  up.innerHTML = `<svg width="160" height="220" viewBox="0 0 160 220" fill="none" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
    <path d="M80 150 V20 M38 62 L80 20 L122 62"/><path d="M14 150 V196 H146 V150"/></svg>`;
  const upGlow = el('div', 'abs', p1, { left: '860px', top: '640px', width: '200px', height: '240px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(43,181,163,.35), transparent)', opacity: 0 });
  p1.insertBefore(upGlow, up);

  /* plain slide rebuilt from the deck's exact text */
  const buildPlain = (parent, color) => {
    const wrap = el('div', 'abs', parent, { inset: 0, padding: '44px 48px', boxSizing: 'border-box', color });
    const t = el('div', '', wrap, { font: '700 38px/1.15 Inter, sans-serif', letterSpacing: '-.02em', marginBottom: '26px' });
    t.textContent = 'Check files, design and story';
    ['Check your organisation\u2019s policy before you upload', 'Preview a real deck, not a demo', 'Does it rework the story, scenes and motion?'].forEach((s) => {
      const b = el('div', '', wrap, { font: '400 24px/1.3 Inter, sans-serif', marginBottom: '14px', paddingLeft: '26px', position: 'relative', whiteSpace: 'nowrap' });
      el('span', 'abs', b, { left: '4px', top: '12px', width: '8px', height: '8px', borderRadius: '50%', background: color });
      el('span', '', b, {}).textContent = s;
    });
    return wrap;
  };

  /* ---------- phase 2/3: demo vs real deck ---------- */
  const CW = 760, CH = 428, CL = 580, CT = 326;
  const demo = el('div', 'abs', cam, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '18px', overflow: 'hidden', transformOrigin: '50% 50%',
    background: 'linear-gradient(135deg, #FF6B4A 0%, #ff8f5a 45%, #F5B841 100%)', boxShadow: '0 40px 90px rgba(255,107,74,.35)' });
  el('div', 'abs', demo, { left: '420px', top: '-80px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,255,255,.55), transparent)' });
  el('div', 'abs', demo, { inset: 0, background: 'linear-gradient(160deg, rgba(255,255,255,.45) 0%, transparent 38%)' });
  [[90, 180, 120], [250, 140, 160], [410, 90, 210]].forEach(([x, top, h]) => el('div', 'abs', demo, { left: x + 'px', top: top + 'px', width: '110px', height: h + 'px', borderRadius: '12px', background: 'rgba(255,255,255,.75)' }));
  const demoTag = el('div', 'abs', demo, { left: '30px', top: '28px', padding: '10px 16px', borderRadius: '8px', background: 'rgba(14,18,32,.85)', font: `700 22px/1 ${MONO}`, letterSpacing: '.18em', color: '#fff' });
  demoTag.textContent = 'DEMO';
  const strike = el('div', 'abs', demo, { left: '-20px', top: '204px', width: CW + 40 + 'px', height: '18px', background: 'var(--ink)', transform: 'rotate(-14deg)', transformOrigin: '0% 50%' });

  const deck = el('div', 'abs', cam, { inset: 0 });
  const satA = el('div', 'abs', deck, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '16px', background: 'linear-gradient(135deg, #1A1F2E, #0E1220)', boxShadow: '0 30px 60px rgba(26,31,46,.25)', opacity: 0 });
  const satB = el('div', 'abs', deck, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '16px', background: 'linear-gradient(135deg, #22394a, #0E1220)', boxShadow: '0 30px 60px rgba(26,31,46,.25)', opacity: 0 });
  [satA, satB].forEach((s, k) => el('div', 'abs', s, { left: '40px', top: '40px', width: k ? '220px' : '300px', height: '26px', borderRadius: '8px', background: k ? 'var(--amber)' : 'var(--teal)', opacity: 0.8 }));
  const streaks = [0, 1, 2, 3].map((i) => el('div', 'abs', deck, { left: CL - 70 + 'px', top: CT + 90 + i * 80 + 'px', width: 110 - i * 18 + 'px', height: '6px', borderRadius: '3px', background: 'linear-gradient(90deg, transparent, var(--teal))', opacity: 0 }));
  const real = el('div', 'abs', deck, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '16px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(26,31,46,.12)', boxShadow: '0 40px 90px rgba(26,31,46,.22)' });
  buildPlain(real, '#1A1F2E');
  const deckTag = el('div', 'abs', cam, { left: CL + 'px', top: CT + CH + 30 + 'px', width: CW + 'px', textAlign: 'center', font: `700 24px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--ink)' });
  deckTag.textContent = 'YOUR DECK';

  const scene = el('div', 'abs', real, { inset: 0, background: 'radial-gradient(80% 90% at 30% 20%, #26304a, #0E1220 75%)', opacity: 0 });
  const sTitle = el('div', 'abs', scene, { left: '48px', top: '48px', width: '320px', height: '30px', borderRadius: '8px', background: '#fff' });
  const sSub = el('div', 'abs', scene, { left: '48px', top: '96px', width: '200px', height: '16px', borderRadius: '8px', background: 'rgba(154,163,181,.6)' });
  const sBars = [0, 1, 2, 3].map((i) => el('div', 'abs', scene, { left: 60 + i * 90 + 'px', bottom: '60px', width: '60px', height: '100px', borderRadius: '10px 10px 3px 3px', background: i === 3 ? 'var(--signal)' : 'var(--teal)', transformOrigin: '50% 100%' }));
  const sOrb = el('div', 'abs', scene, { left: '540px', top: '170px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #ffe3a1, var(--amber))', boxShadow: '0 0 60px rgba(245,184,65,.6)' });
  const sRing = el('div', 'abs', scene, { left: '510px', top: '140px', width: '180px', height: '180px', borderRadius: '50%', border: '3px dashed rgba(255,255,255,.35)' });

  const GL = 990, GT = CT + 60;
  const ghost = el('div', 'abs', cam, { left: GL + 'px', top: GT + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '16px', overflow: 'hidden', border: '3px dashed var(--mist)', background: '#f2f0ea', boxSizing: 'border-box' });
  const gWrap = buildPlain(ghost, '#6b7385');
  gWrap.style.opacity = '0.6';
  const gPlay = el('div', 'abs', ghost, { left: CW / 2 - 50 + 'px', top: CH / 2 - 10 + 'px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(154,163,181,.55)' });
  gPlay.innerHTML = '<svg width="100" height="100"><path d="M40 30 L72 50 L40 70 Z" fill="#fff"/></svg>';
  const LABT = GT + CH + 92;
  const labImp = el('div', 'abs', cam, { left: '170px', top: LABT + 'px', width: CW + 'px', textAlign: 'center', font: `700 24px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--teal)' });
  labImp.textContent = 'IMPROVED';
  const labPlay = el('div', 'abs', cam, { left: GL + 'px', top: LABT + 'px', width: CW + 'px', textAlign: 'center', font: `700 24px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--mist)' });
  labPlay.textContent = 'PLAYBACK';

  const head = el('div', 'abs', cam, { left: '100px', width: '1720px', top: '170px', textAlign: 'center', font: '900 92px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const h1 = el('span', '', head, { display: 'inline-block', color: 'var(--ink)' }); h1.textContent = 'Improve,';
  const h2 = el('span', '', head, { display: 'inline-block', color: 'var(--mist)', marginLeft: '0.28em' }); h2.textContent = 'or just play back?';

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    sBars.forEach((b, i) => { b.style.transform = `scaleY(${0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.6 + i * 1.1)) * (1 + i * 0.25)})`; });
    sOrb.style.transform = `translate(${Math.sin(t * 1.8) * 26}px, ${Math.cos(t * 1.8) * 26}px)`;
    sRing.style.transform = `rotate(${t * 40}deg)`;
    sTitle.style.transform = `translateX(${Math.sin(t * 1.3) * 14}px)`;
    sSub.style.width = 180 + 60 * (0.5 + 0.5 * Math.sin(t * 2)) + 'px';
    streaks.forEach((s, i) => { s.style.transform = `translateX(${((t * 200 + i * 50) % 100) - 10}px)`; });
  });

  /* ---------- timeline ---------- */
  tl.fromTo(cam, { scale: 1, x: 0 }, { scale: 1.04, x: -12, duration: ctx.dur, ease: 'none' }, 0);

  gsap.set([shield, policyLab, tick], { opacity: 0 });
  tl.from(doc, { y: 40, opacity: 0, duration: 0.6 }, 0);
  tl.from(up, { y: 30, opacity: 0, duration: 0.6 }, 0.15);
  tl.to(doc, { y: -10, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 2 }, 0.6);
  tl.fromTo(shield, { scale: 0.3, rotation: -20 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, 0.7);
  tl.to(scan, { opacity: 1, duration: 0.15 }, tCheck - 0.05);
  tl.fromTo(scan, { y: 0 }, { y: 416, duration: 1.0, ease: 'power1.inOut', immediateRender: false }, tCheck);
  tl.to(scan, { opacity: 0, duration: 0.2 }, tCheck + 1.0);
  tl.to(shield, { scale: 1.2, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tPolicy);
  tl.fromTo(policyLab, { x: -16 }, { x: 0, opacity: 1, duration: 0.4, immediateRender: false }, tPolicy);
  const stamp = Math.min(tBefore, tUp - 0.25);
  tl.fromTo(tick, { scale: 2.2, rotation: -12 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.32, ease: 'power4.in', immediateRender: false }, stamp - 0.3);
  tl.to(ck, { attr: { 'stroke-dashoffset': 0 }, duration: 0.35, ease: 'power2.out' }, stamp);
  tl.to(doc, { x: 4, duration: 0.05, yoyo: true, repeat: 3 }, stamp);
  tl.to(up, { stroke: '#2BB5A3', duration: 0.3 }, tUp);
  tl.to(upGlow, { opacity: 1, duration: 0.3 }, tUp);
  tl.to(up, { y: -14, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, tUp);
  tl.to([doc, tick], { y: '-=40', duration: 0.6, ease: 'power2.in' }, tUp + 0.4);
  tl.to(p1, { opacity: 0, y: -60, duration: 0.5, ease: 'power2.in' }, Math.max(tUp + 0.6, tPreview - 0.55));

  gsap.set(demo, { opacity: 0 });
  gsap.set(strike, { scaleX: 0 });
  gsap.set(real, { x: 1600, rotation: 6, opacity: 0 });
  gsap.set(deckTag, { opacity: 0 });
  tl.fromTo(demo, { scale: 0.85, y: 30 }, { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', immediateRender: false }, tPreview - 0.2);
  tl.to(real, { opacity: 1, duration: 0.15 }, tReal - 0.2);
  tl.to(real, { x: 0, rotation: 0, duration: 0.7, ease: 'expo.out' }, tReal - 0.2);
  tl.to(demo, { x: -640, rotation: -8, scale: 0.72, opacity: 0.85, duration: 0.7, ease: 'expo.out' }, tReal - 0.1);
  tl.fromTo(deckTag, { y: 14 }, { y: 0, opacity: 1, duration: 0.4, immediateRender: false }, tDeck);
  tl.to(strike, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, tNot);
  tl.to(demo, { x: -1500, rotation: -16, opacity: 0, duration: 0.6, ease: 'power2.in' }, tDemo + 0.15);

  gsap.set([ghost, labImp, labPlay, h1, h2], { opacity: 0 });
  tl.to(deckTag, { opacity: 0, duration: 0.3 }, tAsk - 0.1);
  tl.to(deck, { x: 170 - CL, y: 60, duration: 0.9, ease: 'expo.inOut' }, tAsk - 0.1);
  tl.fromTo(h1, { y: 40, scale: 1.4 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.8)', immediateRender: false }, tImprove - 0.15);
  tl.to(scene, { opacity: 1, duration: 0.45 }, tImprove);
  tl.to(real, { boxShadow: '0 40px 100px rgba(43,181,163,.55)', duration: 0.5 }, tImprove);
  tl.to(satA, { opacity: 1, x: -48, y: -36, rotation: -6, duration: 0.7, ease: 'back.out(1.6)' }, tImprove + 0.1);
  tl.to(satB, { opacity: 1, x: 48, y: 32, rotation: 5, duration: 0.7, ease: 'back.out(1.6)' }, tImprove + 0.18);
  tl.to(streaks, { opacity: 1, duration: 0.4, stagger: 0.06 }, tImprove + 0.2);
  tl.fromTo(labImp, { y: 14 }, { y: 0, opacity: 1, duration: 0.4, immediateRender: false }, tImprove + 0.3);
  tl.fromTo(ghost, { x: 60 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', immediateRender: false }, tPlay - 0.2);
  tl.fromTo(h2, { y: 30 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', immediateRender: false }, tPlay - 0.2);
  tl.fromTo(labPlay, { y: 14 }, { y: 0, opacity: 1, duration: 0.4, immediateRender: false }, tPlay + 0.1);
  tl.to(h1, { color: '#2BB5A3', duration: 0.5 }, tPlay + 0.5);
});

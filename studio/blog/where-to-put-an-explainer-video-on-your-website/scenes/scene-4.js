/* Scene 4 — "Small details decide who presses play. Tell people what they'll get and how long it takes,
 * lead with a clear headline, and add captions for sound-off browsing."
 * Storyboard: paper stage, headline "Small details decide who presses play" up top at 96px, close on one
 * video player. On "what they'll get" the label "See how it works in 2 minutes" slides in under it (a 2:00
 * chip lands on "long"). On "lead" the first frame's "Welcome" turns mist and is struck through; on "clear
 * headline" it flips to "Turn your deck into a narrated video". On "captions" a muted speaker pops and
 * burned-in caption bars type across the bottom. "No autoplay with sound" pins to the corner. A small
 * checklist ticks each detail; the camera glides gently toward whatever is named. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = ctx.beats;
  const tPlay = ctx.at(0, 'play.'), tWhat = ctx.at(1, 'what'), tLong = ctx.at(1, 'long'),
    tLead = ctx.at(1, 'lead'), tClear = ctx.at(1, 'clear'), tHead = ctx.at(1, 'headline,'),
    tCap = ctx.at(1, 'captions'), tSound = ctx.at(1, 'sound-off'), tBrowse = ctx.at(1, 'browsing.');
  const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 50% 55%, #ffffff 0%, var(--paper) 60%, #ebe6da 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 600px' });

  /* soft light blobs */
  el('div', 'abs', cam, { left: '1200px', top: '200px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,140,255,.12), transparent 65%)' });
  el('div', 'abs', cam, { left: '150px', top: '500px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,.08), transparent 65%)' });

  /* headline */
  const head = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '96px', textAlign: 'center', font: '800 96px/1.0 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  const l1 = el('div', '', head), l2 = el('div', '', head);
  const w1 = ctx.split(l1, 'Small details decide', 'word');
  const w2 = ctx.split(l2, 'who presses play', 'word');
  const words = [...w1, ...w2];
  words.forEach((w) => { w.style.marginRight = '0.22em'; });
  w2[2].style.color = 'var(--signal)'; w2[2].style.marginRight = '0';
  w1[2].style.marginRight = '0';

  /* player */
  const PX = 480, PY = 330, PW = 960, PH = 540;
  const shadow = el('div', 'abs', cam, { left: PX + 30 + 'px', top: PY + 60 + 'px', width: PW - 60 + 'px', height: PH - 40 + 'px', borderRadius: '30px', background: 'rgba(15,20,36,.35)', filter: 'blur(40px)' });
  const player = el('div', 'abs', cam, { left: PX + 'px', top: PY + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '24px', overflow: 'hidden',
    background: 'radial-gradient(80% 90% at 20% 10%, #263050 0%, var(--ink) 45%, var(--night) 100%)', boxShadow: '0 2px 0 rgba(255,255,255,.08) inset, 0 30px 60px rgba(15,20,36,.25)' });
  el('div', 'abs', player, { right: '-120px', top: '-120px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,140,255,.25), transparent 65%)' });

  const titleWrap = el('div', 'abs', player, { left: '64px', top: '64px', width: '832px', height: '190px', perspective: '900px' });
  const welcome = el('div', 'abs', titleWrap, { left: 0, top: '20px', font: '800 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', transformOrigin: '50% 100%' });
  const wTxt = el('span', '', welcome, { position: 'relative', display: 'inline-block' }); wTxt.textContent = 'Welcome';
  const strike = el('div', 'abs', wTxt, { left: '-8px', right: '-8px', top: '52%', height: '9px', borderRadius: '5px', background: 'var(--signal)', transformOrigin: '0% 50%' });
  const newT = el('div', 'abs', titleWrap, { left: 0, top: 0, width: '832px', font: '800 64px/1.05 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)', transformOrigin: '50% 0%' });
  newT.innerHTML = 'Turn your deck into a<br><span style="color:#8fb0ff">narrated video</span>';

  const playBtn = el('div', 'abs', player, { left: '64px', top: '282px', width: '104px', height: '104px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 0 rgba(255,107,74,0), 0 12px 30px rgba(255,107,74,.45)' });
  el('div', 'abs', playBtn, { left: '40px', top: '30px', width: 0, height: 0, borderTop: '22px solid transparent', borderBottom: '22px solid transparent', borderLeft: '34px solid #fff' });
  const ring = el('div', 'abs', player, { left: '64px', top: '282px', width: '104px', height: '104px', borderRadius: '50%', border: '4px solid var(--signal)', opacity: 0 });

  const durChip = el('div', 'abs', player, { right: '28px', top: '28px', padding: '10px 16px', borderRadius: '10px', background: 'rgba(15,20,36,.75)', font: `700 26px/1 ${MONO}`, color: '#fff', letterSpacing: '.04em' });
  durChip.textContent = '2:00';

  /* captions */
  const capWrap = el('div', 'abs', player, { left: 0, width: PW + 'px', top: '384px', textAlign: 'center' });
  const CAP1 = 'Drop in your PowerPoint deck,', CAP2 = 'and get a narrated video back.';
  const bar1 = el('div', '', capWrap, { display: 'inline-block', padding: '6px 16px', background: 'rgba(0,0,0,.78)', borderRadius: '6px', font: '600 32px/1.2 Inter', color: '#fff', marginBottom: '6px', minHeight: '38px' });
  el('br', '', capWrap);
  const bar2 = el('div', '', capWrap, { display: 'inline-block', padding: '6px 16px', background: 'rgba(0,0,0,.78)', borderRadius: '6px', font: '600 32px/1.2 Inter', color: '#fff', minHeight: '38px' });
  const cap = { n: 0 };

  /* control bar */
  const ctrl = el('div', 'abs', player, { left: 0, right: 0, bottom: 0, height: '60px', background: 'linear-gradient(0deg, rgba(0,0,0,.55), rgba(0,0,0,0))' });
  el('div', 'abs', ctrl, { left: '28px', right: '170px', top: '28px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.25)' });
  const prog = el('div', 'abs', ctrl, { left: '28px', top: '28px', width: '762px', height: '5px', borderRadius: '3px', background: 'var(--signal)', transformOrigin: '0% 50%' });
  const timeTxt = el('div', 'abs', ctrl, { right: '80px', top: '20px', font: `600 18px/1 ${MONO}`, color: 'rgba(255,255,255,.8)' }); timeTxt.textContent = '0:00';
  const mute = el('div', 'abs', ctrl, { right: '22px', top: '8px', width: '44px', height: '44px' });
  mute.innerHTML = `<svg width="44" height="44" viewBox="0 0 44 44"><path d="M8 17 h7 l9 -8 v26 l-9 -8 h-7 z" fill="#fff"/><path d="M29 16 l10 12 M39 16 l-10 12" stroke="#FF6B4A" stroke-width="3.5" stroke-linecap="round"/></svg>`;
  const muteBig = el('div', 'abs', player, { right: '28px', top: '96px', width: '86px', height: '86px', borderRadius: '50%', background: 'rgba(15,20,36,.8)', border: '2px solid rgba(255,255,255,.18)' });
  muteBig.innerHTML = `<svg width="86" height="86" viewBox="0 0 44 44"><path d="M9 18 h6 l8 -7 v22 l-8 -7 h-6 z" fill="#fff"/><path d="M27 17 l8 10 M35 17 l-8 10" stroke="#FF6B4A" stroke-width="3" stroke-linecap="round"/></svg>`;

  /* label under the player */
  const label = el('div', 'abs', cam, { left: PX + 'px', top: PY + PH + 34 + 'px', display: 'flex', alignItems: 'center', gap: '16px', font: '700 40px/1 Inter', letterSpacing: '-.02em', color: 'var(--ink)' });
  const clock = el('div', '', label, { width: '42px', height: '42px' });
  clock.innerHTML = `<svg width="42" height="42" viewBox="0 0 42 42"><circle cx="21" cy="21" r="17" fill="none" stroke="#5B8CFF" stroke-width="4"/><path d="M21 11 v10 l7 5" stroke="#5B8CFF" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
  const labTxt = el('div', '', label); labTxt.innerHTML = 'See how it works in <span style="color:var(--signal)">2 minutes</span>';

  /* pinned corner tag */
  const tag = el('div', 'abs', cam, { left: '1290px', top: '296px', padding: '14px 20px', background: 'var(--ink)', color: 'var(--paper)', font: `700 21px/1 ${MONO}`, letterSpacing: '.08em', borderRadius: '8px', boxShadow: '0 14px 30px rgba(15,20,36,.3)', transformOrigin: '20% 0%', whiteSpace: 'nowrap' });
  el('span', '', tag, { display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--signal)', marginRight: '12px', verticalAlign: '-1px' });
  el('span', '', tag).textContent = 'NO AUTOPLAY WITH SOUND';

  /* checklist */
  const items = ['LENGTH SHOWN', 'CLEAR HEADLINE', 'CAPTIONS ON', 'SOUND OFF'];
  const checks = items.map((txt, i) => {
    const row = el('div', 'abs', cam, { left: '120px', top: 420 + i * 78 + 'px', display: 'flex', alignItems: 'center', gap: '14px', font: `700 19px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--ink)' });
    const box = el('div', '', row, { width: '38px', height: '38px', borderRadius: '10px', background: 'var(--mint)', boxShadow: '0 8px 18px rgba(61,214,163,.35)' });
    box.innerHTML = `<svg width="38" height="38" viewBox="0 0 38 38"><path d="M10 20 l6 6 l12 -13" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    el('div', '', row).textContent = txt;
    return { row, box };
  });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });

  ctx.onFrame(() => {
    const n = Math.round(cap.n);
    const a = CAP1.slice(0, Math.min(n, CAP1.length));
    const b = n > CAP1.length ? CAP2.slice(0, n - CAP1.length) : '';
    bar1.textContent = a; bar2.textContent = b;
    bar1.style.opacity = a ? 1 : 0; bar2.style.opacity = b ? 1 : 0;
  });

  /* ---- timeline ---- */
  gsap.set([label, newT, durChip, mute, muteBig, tag, ...checks.map((c) => c.row)], { opacity: 0 });
  gsap.set(strike, { scaleX: 0 });
  gsap.set(prog, { scaleX: 0 });
  gsap.set(player, { filter: 'brightness(1)' });

  // opening: player is on screen at once, headline words rise
  tl.from([player, shadow], { y: 40, duration: 1.0, ease: 'power3.out' }, 0);
  tl.from(words, { y: 60, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(1.6)' }, 0.05);
  tl.to(cam, { scale: 1.015, duration: 3.4, ease: 'sine.inOut' }, 0);

  // "presses play"
  tl.to(playBtn, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tPlay - 0.05);
  tl.fromTo(ring, { scale: 1, opacity: 0.9 }, { scale: 2.1, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, tPlay);

  // "what they'll get": label slides in, camera eases down toward it
  tl.to(cam, { y: -14, scale: 1.025, duration: 1.2, ease: 'expo.inOut' }, tWhat - 0.4);
  tl.fromTo(label, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', immediateRender: false }, tWhat);
  tl.from(clock, { rotation: -180, duration: 0.9, ease: 'back.out(1.4)' }, tWhat);
  tl.fromTo(durChip, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tLong);
  tl.fromTo(checks[0].row, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tLong + 0.15);
  tl.from(checks[0].box, { scale: 0, duration: 0.5, ease: 'back.out(2.2)' }, tLong + 0.2);

  // "lead with a clear headline": Welcome goes mist + struck, flips to the real headline
  tl.to(cam, { y: 0, scale: 1.035, duration: 1.2, ease: 'expo.inOut' }, tLead - 0.2);
  tl.to(welcome, { color: '#C9CEDB', duration: 0.3 }, tLead);
  tl.to(strike, { scaleX: 1, duration: 0.4, ease: 'power3.inOut' }, tLead + 0.1);
  tl.to(welcome, { rotationX: 90, opacity: 0, duration: 0.35, ease: 'power2.in' }, tClear);
  tl.fromTo(newT, { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', immediateRender: false }, tClear + 0.3);
  tl.to(player, { filter: 'brightness(1.15)', duration: 0.15, yoyo: true, repeat: 1 }, tHead - 0.05);
  tl.fromTo(checks[1].row, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tHead);
  tl.from(checks[1].box, { scale: 0, duration: 0.5, ease: 'back.out(2.2)' }, tHead + 0.05);

  // "captions for sound-off browsing"
  tl.to(cam, { y: -18, scale: 1.03, duration: 1.2, ease: 'expo.inOut' }, tCap - 0.3);
  tl.fromTo([mute, muteBig], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2)', immediateRender: false }, tCap);
  tl.to(cap, { n: CAP1.length + CAP2.length, duration: 1.6, ease: 'none' }, tCap + 0.1);
  tl.to(prog, { scaleX: 0.18, duration: ctx.dur - tCap, ease: 'none' }, tCap);
  ctx.onFrame((t) => { const s = Math.max(0, Math.min(22, Math.floor((t - tCap) * 2))); timeTxt.textContent = '0:' + String(s).padStart(2, '0'); });
  tl.fromTo(checks[2].row, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tCap + 0.3);
  tl.from(checks[2].box, { scale: 0, duration: 0.5, ease: 'back.out(2.2)' }, tCap + 0.35);
  tl.fromTo(checks[3].row, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tSound);
  tl.from(checks[3].box, { scale: 0, duration: 0.5, ease: 'back.out(2.2)' }, tSound + 0.05);

  // corner tag pins down
  tl.fromTo(tag, { y: -70, rotation: -14, opacity: 0, scale: 1.2 }, { y: 0, rotation: 4, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, tBrowse);
  tl.to(tag, { rotation: 2.5, duration: 0.5, ease: 'sine.inOut' }, tBrowse + 0.6);

  // slow settle drift to the end
  tl.to(cam, { y: -8, scale: 1.04, duration: Math.max(0.5, ctx.dur - (tCap + 1)), ease: 'sine.inOut' }, tCap + 1);
});

/* Scene 5 — "Large, plain, high-contrast type makes clearer slide videos. On Pro, a.i. directs every scene,
 * but clear type still matters. Try Basic first at powerpoint2vid.com."
 * Storyboard: Night stage. "Large." "Plain." "High-contrast." punch in at 140px, sharpening from blur, on each
 * spoken word. On "makes clearer slide videos" the whole frame shrinks into a small app window and still reads.
 * On "On Pro / a.i. directs every scene" a strip of animated teal-outlined scene thumbnails glides past. Their type
 * starts soft and snaps sharp on "clear type". On "Try Basic first" it all clears to a signal-yellow button with
 * "powerpoint2vid.com" at 110px. It holds center with a gentle pulse to the end. */
P2V.scene((ctx) => {
  const { tl, el, stage, dur } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tLarge = A(0, 'Large,'), tPlain = A(0, 'plain,'), tHigh = A(0, 'high-contrast'), tMakes = A(0, 'makes');
  const tOn = A(1, 'On'), tAI = A(1, 'A.I.'), tEvery = A(1, 'every'), tClear = A(1, 'clear'), tMatters = A(1, 'matters.');
  const tTry = A(2, 'Try'), tBasic = A(2, 'Basic'), tPP = A(2, 'PowerPoint'), tCom = A(2, 'com.');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 45%, #1a2030 0%, var(--night) 75%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 50%, rgba(255,194,61,.10), transparent 70%)', opacity: 0.6 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });

  const win = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', borderRadius: '0px', transformOrigin: '50% 50%', background: 'rgba(27,31,39,0)', overflow: 'hidden' });
  const chrome = el('div', 'abs', win, { left: 0, top: 0, width: '100%', height: '90px', background: '#252a35', opacity: 0 });
  ['#FF5E57', '#FFC23D', '#2EC4B6'].forEach((c, i) => el('div', 'abs', chrome, { left: 50 + i * 60 + 'px', top: '27px', width: '36px', height: '36px', borderRadius: '50%', background: c }));
  const words = ['Large.', 'Plain.', 'High-contrast.'];
  const lines = words.map((w, i) => {
    const d = el('div', 'abs', win, { left: 0, width: '1920px', top: 290 + i * 170 + 'px', textAlign: 'center', font: '900 140px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--paper)', transformOrigin: '50% 60%' });
    d.textContent = w;
    return d;
  });
  const underline = el('div', 'abs', win, { left: '510px', top: '790px', width: '900px', height: '12px', borderRadius: '6px', background: 'var(--signal)', transformOrigin: '0% 50%', boxShadow: '0 0 30px rgba(255,194,61,.6)' });
  const sizeTag = el('div', 'abs', cam, { left: 0, width: '1920px', top: '850px', textAlign: 'center', font: `600 26px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)', opacity: 0 });
  sizeTag.textContent = 'STILL READS AT 40% SIZE';
  const intro = el('div', 'abs', cam, { left: '160px', top: '130px', font: `600 24px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' });
  intro.textContent = 'RECAP · CLEAR TYPE';

  const proTag = el('div', 'abs', cam, { left: '160px', top: '230px', font: `700 26px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--teal)', opacity: 0 });
  proTag.textContent = 'PRO · AI-DIRECTED SCENES';
  const strip = el('div', 'abs', cam, { left: 0, top: '320px', width: '3400px', height: '360px', opacity: 0 });
  const CW = 560, CH = 315, GAP = 60, accents = ['#FFC23D', '#FF5E57', '#2EC4B6', '#F7F4EE', '#FFC23D'];
  const cards = accents.map((acc, i) => {
    const c = el('div', 'abs', strip, { left: i * (CW + GAP) + 'px', top: '20px', width: CW + 'px', height: CH + 'px', borderRadius: '18px', background: 'linear-gradient(160deg, #1f2533, #12161e)', border: '3px solid var(--teal)', boxShadow: '0 0 40px rgba(46,196,182,.25), 0 30px 60px rgba(0,0,0,.45)', overflow: 'hidden' });
    const aa = el('div', 'abs', c, { left: '40px', top: '40px', font: '900 96px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)' });
    aa.textContent = 'Aa';
    gsap.set(aa, { filter: 'blur(7px)' });
    el('div', 'abs', c, { left: '40px', top: '160px', width: '200px', height: '14px', borderRadius: '7px', background: 'rgba(247,244,238,.35)' });
    el('div', 'abs', c, { left: '40px', top: '190px', width: '150px', height: '14px', borderRadius: '7px', background: 'rgba(247,244,238,.2)' });
    const bars = [0.5, 0.75, 1, 0.65].map((h, j) => el('div', 'abs', c, { left: 300 + j * 52 + 'px', top: 255 - h * 180 + 'px', width: '36px', height: h * 180 + 'px', borderRadius: '6px 6px 2px 2px', background: acc, transformOrigin: '50% 100%', opacity: 0.9 }));
    return { c, aa, bars };
  });

  const cta = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const tryLine = el('div', 'abs', cta, { left: 0, width: '1920px', top: '300px', textAlign: 'center', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)' });
  const trySpans = ctx.split(tryLine, 'Try Basic first', 'word');
  const btnWrap = el('div', 'abs', cta, { left: '960px', top: '450px', transform: 'translateX(-50%)' });
  const ring = el('div', 'abs', btnWrap, { inset: 0, borderRadius: '120px', border: '5px solid var(--signal)', opacity: 0 });
  const btn = el('div', '', btnWrap, { padding: '45px 90px', borderRadius: '120px', background: 'linear-gradient(180deg, #ffd36e, #FFC23D 60%, #f0a91c)', boxShadow: '0 0 90px rgba(255,194,61,.55), 0 30px 70px rgba(0,0,0,.5), inset 0 2px 0 rgba(255,255,255,.6)', font: '900 110px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--night)', whiteSpace: 'nowrap', transformOrigin: '50% 50%' });
  const urlChars = ctx.split(btn, 'powerpoint2vid.com', 'char');
  const sub = el('div', 'abs', cta, { left: 0, width: '1920px', top: '730px', textAlign: 'center', font: `600 26px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--slate)' });
  sub.textContent = 'LARGE · PLAIN · HIGH-CONTRAST';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  gsap.set([win, sizeTag, strip, proTag], { filter: 'blur(0px)' });

  tl.to(cam, { scale: 1.04, duration: dur, ease: 'none' }, 0);
  tl.from(intro, { opacity: 0, y: 12, duration: 0.5 }, 0.05);
  tl.from(glow, { opacity: 0, duration: 0.6 }, 0);

  gsap.set(lines, { opacity: 0, scale: 1.18, filter: 'blur(14px)' });
  gsap.set(underline, { scaleX: 0 });
  [tLarge, tPlain, tHigh].forEach((t, i) => {
    tl.to(lines[i], { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' }, t - 0.1);
  });
  tl.to(underline, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, tHigh + 0.35);

  tl.to(intro, { opacity: 0, duration: 0.4 }, tMakes - 0.3);
  tl.to(win, { scale: 0.4, y: -40, borderRadius: '40px', background: 'rgba(27,31,39,1)', boxShadow: '0 50px 120px rgba(0,0,0,.6), 0 0 0 4px rgba(247,244,238,.12)', duration: 1.0, ease: 'expo.inOut' }, tMakes - 0.2);
  tl.to(chrome, { opacity: 1, duration: 0.5 }, tMakes + 0.3);
  tl.to(sizeTag, { opacity: 1, duration: 0.5 }, A(0, 'clearer'));
  tl.fromTo(sizeTag, { y: 14 }, { y: 0, duration: 0.6, immediateRender: false }, A(0, 'clearer'));

  tl.to([win, sizeTag], { opacity: 0, y: '-=60', filter: 'blur(8px)', duration: 0.6, ease: 'power2.in' }, tOn - 0.35);
  tl.to(proTag, { opacity: 1, duration: 0.5 }, tOn);
  tl.fromTo(proTag, { x: -20 }, { x: 0, duration: 0.6, immediateRender: false }, tOn);
  tl.to(strip, { opacity: 1, duration: 0.6 }, tAI - 0.4);
  tl.fromTo(strip, { x: 700 }, { x: -1250, duration: tTry - (tAI - 0.4) + 0.4, ease: 'none', immediateRender: false }, tAI - 0.4);
  cards.forEach((cd, i) => {
    gsap.set(cd.bars, { scaleY: 0 });
    tl.to(cd.bars, { scaleY: 1, duration: 0.6, stagger: 0.07, ease: 'back.out(1.6)' }, tEvery - 0.3 + i * 0.12);
    tl.to(cd.aa, { filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }, tClear + i * 0.08);
    tl.to(cd.c, { boxShadow: '0 0 70px rgba(46,196,182,.55), 0 30px 60px rgba(0,0,0,.45)', duration: 0.4, yoyo: true, repeat: 1 }, tMatters - 0.1 + i * 0.05);
  });

  tl.to([strip, proTag], { opacity: 0, filter: 'blur(10px)', duration: 0.5, ease: 'power2.in' }, tTry - 0.45);
  gsap.set(trySpans, { opacity: 0, y: 20, filter: 'blur(8px)' });
  tl.to(trySpans[0], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45 }, tTry - 0.05);
  tl.to(trySpans[1], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45 }, tBasic - 0.05);
  tl.to(trySpans[2], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45 }, A(2, 'first') - 0.05);
  tl.to(trySpans[1], { color: '#FFC23D', duration: 0.4 }, tBasic + 0.1);

  gsap.set(btnWrap, { opacity: 0, scale: 0.6 });
  gsap.set(urlChars, { opacity: 0, scale: 1.25, filter: 'blur(6px)' });
  tl.to(btnWrap, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, tPP - 0.3);
  tl.to(urlChars, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.35, stagger: Math.min(0.06, (tCom - tPP) / urlChars.length), ease: 'power3.out' }, tPP - 0.2);
  tl.from(sub, { opacity: 0, y: 14, duration: 0.6 }, tCom + 0.2);
  tl.to(glow, { opacity: 1, duration: 1 }, tPP);

  const p0 = tCom + 0.5, period = 1.1;
  const n = Math.max(1, Math.floor((dur - p0) / period));
  tl.to(btn, { scale: 1.035, duration: period / 2, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, p0);
  for (let i = 0; i < n; i++) {
    tl.fromTo(ring, { opacity: 0.7, scale: 1 }, { opacity: 0, scale: 1.25, duration: 1.0, ease: 'power2.out', immediateRender: false }, p0 + i * period);
  }
});

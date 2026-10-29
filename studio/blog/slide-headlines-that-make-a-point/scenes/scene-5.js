/* Scene 5 (finale): "On Pro, a.i. directs your video, landing each headline as it's spoken.
 * Ordinary slides in, extraordinary video out. Try Basic first, no subscription needed, at powerpoint2vid.com."
 * Storyboard: night stage. A stack of plain white slides (the deck's own renders) slides in from the left.
 * On "directs your video" they pass one by one through a coral frame and emerge as glowing headline cards
 * that land on "landing each headline". On "Ordinary slides in / extraordinary video out" the frame narrows to a slit,
 * flanked by the two phrases at 110px. On "Try Basic first" a mint pill pops "No subscription needed", and on
 * "powerpoint2vid.com" the frame snaps open and the coral URL settles center at 120px, then holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tPro = A(0, 'Pro,'), tDirects = A(0, 'directs'), tLanding = A(0, 'landing');
  const tOrd = A(1, 'Ordinary'), tExtra = A(1, 'extraordinary');
  const tBasic = A(2, 'Basic'), tNo = A(2, 'no'), tPP = A(2, 'PowerPoint'), tCom = A(2, 'com.');

  stage.style.background =
    'radial-gradient(60% 55% at 50% 45%, #1a1d33 0%, var(--night) 70%), var(--night)';
  const glowBg = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 45%, rgba(255,90,60,.16), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  const mono = '600 20px/1 ui-monospace, Menlo, monospace';
  const W = 320, H = 180, FX = 960;

  const HEADS = [
    ['slide-2.png', 'Q3 revenue beat target'],
    ['slide-3.png', 'Onboarding: 2 days, not 5'],
    ['slide-4.png', 'Headlines alone make the pitch'],
  ];
  const cards = HEADS.map(([img, head], i) => {
    const c = el('div', 'abs', cam, { left: 0, top: 0, width: W + 'px', height: H + 'px', zIndex: 3 - i });
    const white = el('div', 'abs', c, { inset: 0, borderRadius: '10px', overflow: 'hidden', background: '#fff', boxShadow: '0 24px 50px rgba(0,0,0,.45)' });
    const im = el('img', 'abs', white, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' });
    im.src = ctx.asset(img);
    const glow = el('div', 'abs', c, {
      inset: 0, borderRadius: '10px', background: 'linear-gradient(160deg, #1d2030, var(--ink))',
      border: '2px solid rgba(255,90,60,.8)', boxShadow: '0 0 50px rgba(255,90,60,.45), 0 24px 50px rgba(0,0,0,.5)',
      padding: '22px 24px', boxSizing: 'border-box',
    });
    const lab = el('div', '', glow, { font: '600 15px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--slate)', marginBottom: '14px' });
    lab.textContent = 'SLIDE ' + (i + 2) + ' · HEADLINE';
    const ht = el('div', '', glow, { font: '800 32px/1.08 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--signal)', textShadow: '0 0 24px rgba(255,90,60,.55)' });
    ht.textContent = head;
    const st = { x: -500 - i * 40, y: 380 - i * 16, r: [-3, 2, -1.5][i] };
    return { c, white, glow, st, i };
  });

  const frame = el('div', 'abs', cam, {
    left: '750px', top: '340px', width: '420px', height: '260px', boxSizing: 'border-box', zIndex: 5,
    border: '4px solid var(--signal)', borderRadius: '14px',
    boxShadow: '0 0 40px rgba(255,90,60,.5), inset 0 0 30px rgba(255,90,60,.2)',
  });
  const scan = el('div', 'abs', cam, { left: FX - 2 + 'px', top: '344px', width: '4px', height: '252px', zIndex: 6, background: 'linear-gradient(180deg, transparent, #ffd0c4 20%, #fff 50%, #ffd0c4 80%, transparent)', boxShadow: '0 0 24px 6px rgba(255,90,60,.7)', opacity: 0 });
  const proTag = el('div', 'abs', cam, { left: '750px', width: '420px', top: '298px', textAlign: 'center', font: mono, letterSpacing: '.18em', color: 'var(--signal)' });
  proTag.textContent = 'PRO · A.I. DIRECTOR';

  const big = '900 110px/0.95 Inter Display, Inter';
  const leftTxt = el('div', 'abs', cam, { left: '80px', width: '820px', top: '365px', textAlign: 'right', font: big, letterSpacing: '-.04em', color: 'var(--slate)', whiteSpace: 'nowrap' });
  leftTxt.innerHTML = 'Ordinary<br>slides in,';
  const rightTxt = el('div', 'abs', cam, { left: '1020px', width: '820px', top: '365px', font: big, letterSpacing: '-.04em', color: 'var(--signal)', textShadow: '0 0 40px rgba(255,90,60,.55)', whiteSpace: 'nowrap' });
  rightTxt.innerHTML = 'extraordinary<br>video out.';

  const title = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '260px', textAlign: 'center', font: '800 80px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)' });
  title.innerHTML = 'Try <span style="color:var(--butter)">Basic</span> first';
  const pill = el('div', 'abs', cam, { left: '960px', top: '720px', padding: '18px 38px', borderRadius: '999px', background: 'var(--mint)', color: 'var(--night)', font: '800 36px/1 Inter', letterSpacing: '-.01em', boxShadow: '0 0 50px rgba(46,196,160,.45)', whiteSpace: 'nowrap' });
  pill.textContent = 'No subscription needed';
  const url = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '476px', textAlign: 'center', font: '900 120px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--signal)', textShadow: '0 0 50px rgba(255,90,60,.6)', whiteSpace: 'nowrap', zIndex: 7 });
  const urlChars = ctx.split(url, 'powerpoint2vid.com', 'char');

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame(() => {
    cards.forEach((k) => {
      const { x, y, r } = k.st;
      k.c.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
      const split = Math.max(0, Math.min(W, FX - x));
      k.white.style.clipPath = `inset(0px ${W - split}px 0px 0px)`;
      k.glow.style.clipPath = `inset(0px 0px 0px ${split}px)`;
    });
  });

  gsap.set(pill, { xPercent: -50 });
  gsap.set([leftTxt, rightTxt, title, pill, ...urlChars], { opacity: 0 });

  tl.fromTo(frame, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.05);
  tl.to(glowBg, { opacity: 1, duration: 0.8 }, 0.05);
  cards.forEach((k) => tl.to(k.st, { x: 150 + k.i * 16, duration: 0.6, ease: 'power3.out' }, 0.08 + k.i * 0.06));
  tl.fromTo(proTag, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25 }, tPro);

  tl.fromTo(cam, { scale: 1, x: 30 }, { scale: 1.04, x: -30, duration: 5, ease: 'power1.inOut' }, 0);

  tl.to(scan, { opacity: 1, duration: 0.2 }, tDirects - 0.1);
  const slots = [170, 380, 590];
  cards.forEach((k) => {
    const s = tDirects + k.i * 0.6;
    tl.to(k.st, { x: 1300, y: 380, r: 0, duration: 1.1, ease: 'power1.inOut' }, s);
    tl.to(frame, { boxShadow: '0 0 90px rgba(255,90,60,.95), inset 0 0 50px rgba(255,90,60,.5)', duration: 0.15, yoyo: true, repeat: 1 }, s + 0.5);
    tl.to(k.st, { x: 1440, y: slots[k.i], duration: 0.5, ease: 'back.out(1.6)' }, s + 1.1);
  });
  tl.to(scan, { opacity: 0, duration: 0.3 }, tDirects + 2.4);
  tl.to(cards.map((k) => k.glow), { boxShadow: '0 0 80px rgba(255,90,60,.75), 0 24px 50px rgba(0,0,0,.5)', duration: 0.3, yoyo: true, repeat: 1, stagger: 0.25 }, Math.max(tLanding, tDirects + 2.6));

  const b1 = tOrd - 0.3;
  tl.to(cards.map((k) => k.c), { opacity: 0, duration: 0.3, ease: 'power2.in' }, b1);
  cards.forEach((k) => tl.to(k.st, { x: '+=160', duration: 0.3, ease: 'power2.in' }, b1));
  tl.to(proTag, { opacity: 0, duration: 0.2 }, b1);
  tl.to(frame, { left: 940, width: 40, top: 300, height: 340, duration: 0.5, ease: 'expo.inOut' }, b1);
  tl.to(cam, { scale: 1, x: 0, duration: 0.6, ease: 'expo.inOut' }, b1);
  tl.fromTo(leftTxt, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.28, immediateRender: false }, tOrd);
  tl.fromTo(rightTxt, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.28, immediateRender: false }, tExtra);
  tl.to(frame, { boxShadow: '0 0 90px rgba(255,90,60,.95), inset 0 0 50px rgba(255,90,60,.5)', duration: 0.2, yoyo: true, repeat: 1 }, tExtra);

  const b2 = tBasic - 0.5;
  tl.to(leftTxt, { opacity: 0, x: -60, duration: 0.25, ease: 'power2.in' }, b2);
  tl.to(rightTxt, { opacity: 0, x: 60, duration: 0.25, ease: 'power2.in' }, b2);
  tl.to(frame, { left: 956, width: 8, top: 430, height: 220, borderRadius: 4, duration: 0.45, ease: 'expo.inOut' }, b2);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.03, duration: ctx.dur - b2, ease: 'power1.inOut', immediateRender: false }, b2);
  tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.28, immediateRender: false }, tBasic - 0.1);
  tl.fromTo(pill, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, tNo - 0.05);
  tl.to(frame, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: 3, ease: 'none' }, b2 + 0.5);
  tl.set(frame, { opacity: 1 }, tPP - 0.2);
  tl.to(frame, { left: 290, width: 1340, top: 430, height: 220, borderRadius: 18, duration: 0.45, ease: 'expo.out' }, tPP - 0.15);
  tl.fromTo(urlChars, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.025, immediateRender: false }, tPP - 0.05);
  tl.to(url, { textShadow: '0 0 90px rgba(255,90,60,.95)', duration: 0.3, yoyo: true, repeat: 1 }, tCom);
  tl.to(frame, { boxShadow: '0 0 90px rgba(255,90,60,.9), inset 0 0 50px rgba(255,90,60,.4)', duration: 0.3, yoyo: true, repeat: 1 }, tCom);
});

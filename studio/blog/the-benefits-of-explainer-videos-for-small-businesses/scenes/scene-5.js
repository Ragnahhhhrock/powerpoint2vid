/* Scene 5 — "Start with the deck you already have. On Pro, AI directs the video, so it looks produced
 * without an agency. Try Basic first at powerpoint2vid.com."
 * Storyboard: warm paper stage. A plain stack of the deck's slides sits at centre. On "deck you already
 * have" it lifts and gets an amber highlight ring. On "AI directs" the top slide unfolds into a polished
 * amber-framed video player, which starts playing. Three steps tick beneath it. On "Try Basic first"
 * the player rises and shrinks, and powerpoint2vid.com sets at 130px in ink with an amber underline. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const deckW = ctx.at(0, 'deck'), directs = ctx.at(1, 'directs'), produced = ctx.at(1, 'produced');
  const tryW = ctx.at(2, 'Try'), basic = ctx.at(2, 'Basic'), ppt = ctx.at(2, 'PowerPoint'), com = ctx.at(2, 'com.');
  const MONO = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 40%, #fffdf8 0%, var(--paper) 60%, #ece6da 100%)';
  const glow = el('div', 'abs', stage, { left: '460px', top: '0px', width: '1000px', height: '800px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(242,165,65,.18), transparent)', pointerEvents: 'none' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  const deck = el('div', 'abs', cam, { left: '640px', top: '248px', width: '640px', height: '360px' });
  const cards = [0, 1, 2].map((i) => {
    const c = el('div', 'abs', deck, { inset: 0, background: i === 2 ? '#fff' : (i === 1 ? '#fbf9f5' : '#f4f1ea'), borderRadius: '10px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(28,36,51,.18), 0 2px 6px rgba(28,36,51,.1)' });
    if (i === 2) {
      const im = el('img', 'abs', c, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' }); im.src = ctx.asset('slide-1.png');
    } else {
      [[60, 260, 22, .22], [60, 380, 12, .14], [60, 300, 12, .1]].forEach(([l, w, h, a], k) => el('div', 'abs', c, { left: l + 'px', top: 210 + k * 36 + 'px', width: w + 'px', height: h + 'px', borderRadius: '6px', background: `rgba(28,36,51,${a})` }));
    }
    gsap.set(c, { rotation: [-6, 4, 0][i], x: [-26, 22, 0][i], y: [14, 8, 0][i] });
    return c;
  });
  const top = cards[2];
  const ring = el('div', 'abs', deck, { left: '-14px', top: '-14px', right: '-14px', bottom: '-14px', borderRadius: '18px', border: '5px solid var(--amber)', boxShadow: '0 0 40px rgba(242,165,65,.45)', opacity: 0 });
  const deckTag = el('div', 'abs', cam, { left: '640px', width: '640px', top: '650px', textAlign: 'center', font: MONO, letterSpacing: '.16em', color: 'var(--mist)', opacity: 0 });
  deckTag.textContent = 'YOUR DECK';

  const player = el('div', 'abs', cam, { left: '448px', top: '140px', width: '1024px', height: '576px', borderRadius: '26px', background: 'linear-gradient(140deg, #f7c06e, var(--amber) 45%, #d98a2a)', boxShadow: '0 50px 110px rgba(28,36,51,.32), 0 0 70px rgba(242,165,65,.35)', transformOrigin: '50% 50%', opacity: 0 });
  const screen = el('div', 'abs', player, { left: '12px', top: '12px', right: '12px', bottom: '12px', borderRadius: '16px', overflow: 'hidden', background: 'radial-gradient(80% 90% at 30% 30%, #20304d 0%, var(--night) 70%)' });
  const orb = el('div', 'abs', screen, { left: '600px', top: '-120px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(242,165,65,.45), transparent)' });
  const hBar = el('div', 'abs', screen, { left: '70px', top: '110px', width: '360px', height: '34px', borderRadius: '8px', background: 'var(--paper)', transformOrigin: '0 50%' });
  const sBar1 = el('div', 'abs', screen, { left: '70px', top: '170px', width: '300px', height: '16px', borderRadius: '6px', background: 'rgba(154,166,184,.6)', transformOrigin: '0 50%' });
  const sBar2 = el('div', 'abs', screen, { left: '70px', top: '200px', width: '230px', height: '16px', borderRadius: '6px', background: 'rgba(154,166,184,.4)', transformOrigin: '0 50%' });
  const accent = el('div', 'abs', screen, { left: '70px', top: '250px', width: '90px', height: '8px', borderRadius: '4px', background: 'var(--amber)', transformOrigin: '0 50%' });
  const cols = [120, 190, 280].map((h, i) => el('div', 'abs', screen, { left: 620 + i * 110 + 'px', top: 430 - h + 'px', width: '78px', height: h + 'px', borderRadius: '10px 10px 3px 3px', transformOrigin: '50% 100%', background: i === 2 ? 'linear-gradient(180deg, #ffd08a, var(--amber))' : 'linear-gradient(180deg, #4fd1c1, var(--teal))', boxShadow: i === 2 ? '0 0 40px rgba(242,165,65,.5)' : 'none' }));
  const captions = el('div', 'abs', screen, { left: '50%', bottom: '64px', transform: 'translateX(-50%)', padding: '8px 18px', borderRadius: '8px', background: 'rgba(0,0,0,.55)', font: '600 22px/1 Inter', color: '#fff', whiteSpace: 'nowrap' });
  captions.textContent = 'Here\u2019s how it works';
  const track = el('div', 'abs', screen, { left: '30px', right: '30px', bottom: '26px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.18)' });
  const prog = el('div', 'abs', track, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: 'var(--amber)', transformOrigin: '0 50%' });
  const tc = el('div', 'abs', screen, { right: '30px', bottom: '42px', font: '600 16px/1 ui-monospace, Menlo, monospace', color: 'rgba(255,255,255,.7)' });
  const playBtn = el('div', 'abs', screen, { left: '50%', top: '50%', width: '130px', height: '130px', marginLeft: '-65px', marginTop: '-65px', borderRadius: '50%', background: 'rgba(247,244,238,.95)', boxShadow: '0 10px 40px rgba(0,0,0,.4)' });
  playBtn.innerHTML = '<svg width="130" height="130"><path d="M54 40 L94 65 L54 90 Z" fill="#1C2433"/></svg>';

  const row = el('div', 'abs', cam, { left: '80px', right: '80px', top: '772px', display: 'flex', justifyContent: 'center', gap: '28px' });
  const steps = ['Pick one question', 'Trim your deck', 'Write notes'].map((txt) => {
    const p = el('div', '', row, { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 30px 16px 18px', borderRadius: '44px', background: '#fff', boxShadow: '0 14px 34px rgba(28,36,51,.12)', font: '700 30px/1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--ink)', whiteSpace: 'nowrap' });
    const chk = el('div', '', p, { width: '42px', height: '42px', borderRadius: '50%', background: 'var(--teal)', flex: 'none' });
    chk.innerHTML = '<svg width="42" height="42"><path d="M12 22 L19 29 L31 15" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="30" stroke-dashoffset="30"/></svg>';
    const s = el('span', '', p); s.textContent = txt;
    return { p, chk, path: chk.querySelector('path') };
  });

  const ctaTag = el('div', 'abs', cam, { left: '80px', right: '80px', top: '548px', textAlign: 'center', font: MONO, fontSize: '24px', letterSpacing: '.2em', color: 'var(--coral)', opacity: 0 });
  ctaTag.textContent = 'TRY BASIC FIRST';
  const urlBox = el('div', 'abs', cam, { left: '80px', right: '80px', top: '600px', textAlign: 'center' });
  const url = el('div', '', urlBox, { display: 'inline-block', position: 'relative', font: '800 130px/1.1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');
  const under = el('div', 'abs', url, { left: '4px', right: '4px', bottom: '-14px', height: '14px', borderRadius: '7px', background: 'var(--amber)', boxShadow: '0 6px 24px rgba(242,165,65,.5)', transformOrigin: '0 50%' });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });

  const clock = { s: 0 };
  ctx.onFrame(() => {
    const s = Math.floor(clock.s);
    tc.textContent = '0:' + String(s).padStart(2, '0') + ' / 1:00';
  });

  gsap.set([hBar, sBar1, sBar2, accent, prog, under], { scaleX: 0 });
  gsap.set(cols, { scaleY: 0 });
  gsap.set([captions], { opacity: 0 });
  gsap.set(chars, { opacity: 0, y: 60 });
  gsap.set(steps.map((s) => s.p), { opacity: 0, y: 30 });
  gsap.set(player, { scale: 0.625 });

  tl.fromTo(glow, { x: -60 }, { x: 60, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.fromTo(cam, { scale: 1 }, { scale: 1.02, duration: tryW, ease: 'none' }, 0);

  // deck enters as one opaque group so slides never show through each other
  tl.from(deck, { opacity: 0, duration: 0.45, ease: 'power2.out' }, 0);
  tl.from(cards, { y: '+=40', duration: 0.6, stagger: 0.07 }, 0);
  tl.to(deck, { y: -14, duration: 0.6, ease: 'back.out(1.6)' }, deckW - 0.1);
  tl.fromTo(ring, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)', immediateRender: false }, deckW - 0.05);
  tl.fromTo(deckTag, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, deckW + 0.2);
  tl.to(cards[0], { rotation: -9, x: -40, duration: 0.6 }, deckW);
  tl.to(cards[1], { rotation: 7, x: 36, duration: 0.6 }, deckW);

  const u = directs - 0.85;
  tl.to([ring, deckTag], { opacity: 0, duration: 0.25 }, u);
  tl.to(cards[0], { x: -420, rotation: -18, duration: 0.8, ease: 'expo.inOut' }, u);
  tl.to(cards[1], { x: 420, rotation: 18, duration: 0.8, ease: 'expo.inOut' }, u);
  tl.to([cards[0], cards[1]], { opacity: 0, duration: 0.4, ease: 'power2.out' }, u);
  tl.to(deck, { y: 0, duration: 0.8, ease: 'expo.inOut' }, u);
  tl.to(top, { scale: 1.6, duration: 0.8, ease: 'expo.inOut' }, u);
  tl.to(top, { opacity: 0, duration: 0.3, ease: 'power2.out' }, u + 0.05);
  tl.to(player, { scale: 1, duration: 0.8, ease: 'expo.inOut' }, u);
  tl.to(player, { opacity: 1, duration: 0.35, ease: 'power2.out' }, u + 0.05);

  const p0 = directs + 0.4;
  tl.to(playBtn, { scale: 1.4, opacity: 0, duration: 0.4, ease: 'power2.in' }, p0);
  tl.to(prog, { scaleX: 1, duration: ctx.dur - p0, ease: 'none' }, p0);
  tl.to(clock, { s: 14, duration: ctx.dur - p0, ease: 'none' }, p0);
  tl.to(hBar, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, p0 + 0.2);
  tl.to([sBar1, sBar2], { scaleX: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out' }, p0 + 0.4);
  tl.to(accent, { scaleX: 1, duration: 0.5, ease: 'back.out(2)' }, p0 + 0.7);
  tl.to(cols, { scaleY: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)' }, p0 + 0.6);
  tl.to(captions, { opacity: 1, duration: 0.3 }, p0 + 0.5);
  tl.fromTo(orb, { x: 0, y: 0 }, { x: -120, y: 60, duration: ctx.dur - p0, ease: 'sine.inOut' }, p0);
  tl.to(cols[2], { boxShadow: '0 0 80px rgba(242,165,65,.9)', duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, p0 + 1.6);

  steps.forEach((s, i) => {
    const t = produced - 0.5 + i * 0.42;
    tl.to(s.p, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.7)' }, t);
    tl.fromTo(s.chk, { scale: 0.3 }, { scale: 1, duration: 0.45, ease: 'back.out(2.4)', immediateRender: false }, t + 0.15);
    tl.to(s.path, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, t + 0.25);
  });

  const c0 = tryW - 0.25;
  tl.to(steps.map((s) => s.p), { opacity: 0, y: 40, duration: 0.45, stagger: 0.05, ease: 'power2.in' }, c0);
  tl.to(player, { scale: 0.6, y: -138, duration: 0.95, ease: 'expo.inOut' }, c0);
  tl.fromTo(ctaTag, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, tryW + 0.1);
  tl.to(chars, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(1.8)' }, basic - 0.2);
  tl.to(under, { scaleX: 1, duration: com - ppt + 0.2, ease: 'power2.inOut' }, ppt);
  tl.to(url, { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, com);
  tl.fromTo(cam, { scale: 1.02 }, { scale: 1.06, duration: ctx.dur - tryW, ease: 'power1.inOut', immediateRender: false }, tryW);
});

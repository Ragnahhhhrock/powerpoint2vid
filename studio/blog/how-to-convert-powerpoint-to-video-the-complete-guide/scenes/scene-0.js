/* Scene 0 — "Your slide deck already explains something well. Here's how to make it work without you
 * in the room, from tidying the deck to sharing the finished file."
 * Storyboard: on a dark stage the title "How to Convert PowerPoint to Video" builds word by word, with
 * "Video" in a violet→coral gradient. The original slide drifts in as a floating 3D card on "slide deck",
 * and a small presenter avatar docks beside it. On "work" a play button pops onto the card and a video
 * progress bar starts filling. On "without you" the presenter slides away. On "tidying" a roadmap line
 * draws from TIDY toward SHARE, and the end node ignites mint with a file icon on "sharing / finished file". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const tDeck = A(0, 'deck', 1.46), tExpl = A(0, 'explains', 2.17), tWell = A(0, 'well.', 3.09);
  const tWork = A(1, 'work', 5.34), tWithout = A(1, 'without', 5.84), tRoom = A(1, 'room,', 6.6);
  const tTidy = A(1, 'tidying', 7.5), tShare = A(1, 'sharing', 8.73), tFile = A(1, 'finished', 9.23);
  const mono = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 60% at 75% 40%, #1b1f55 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { left: '900px', top: '80px', width: '1100px', height: '800px', background: 'radial-gradient(closest-side, rgba(109,74,255,.35), transparent)', pointerEvents: 'none' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const persp = el('div', 'abs', cam, { inset: 0, perspective: '1800px' });

  /* ---- title ---- */
  const kicker = el('div', 'abs', cam, { left: '150px', top: '190px', font: mono, letterSpacing: '.16em', color: 'var(--violet-hi)' });
  kicker.textContent = 'THE COMPLETE GUIDE';
  const lineStyle = { left: '144px', font: '900 104px/1 Inter Display, Inter', letterSpacing: '-.045em', color: '#fff', whiteSpace: 'nowrap' };
  const l1 = el('div', 'abs', cam, { ...lineStyle, top: '250px' });
  const l2 = el('div', 'abs', cam, { ...lineStyle, top: '370px' });
  const l3 = el('div', 'abs', cam, { ...lineStyle, top: '490px' });
  const w1 = ctx.split(l1, 'How to Convert', 'word');
  const w2 = ctx.split(l2, 'PowerPoint', 'word');
  const w3 = ctx.split(l3, 'to Video', 'word');
  const words = [...w1, ...w2, ...w3];
  const vid = w3[w3.length - 1];
  Object.assign(vid.style, { background: 'linear-gradient(100deg, var(--violet-hi), var(--coral))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: '8px' });

  /* ---- slide card ---- */
  const CX = 1080, CY = 250, CW = 700, CH = 394;
  const card = el('div', 'abs', persp, { left: CX + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '14px', overflow: 'hidden', background: '#fff',
    boxShadow: '0 50px 110px rgba(0,0,0,.55), 0 0 80px rgba(109,74,255,.3)', transformOrigin: '50% 50%' });
  const img = el('img', 'abs', card, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' });
  img.src = ctx.asset('slide-1.png');
  const shade = el('div', 'abs', card, { inset: 0, background: 'linear-gradient(180deg, rgba(8,11,31,0) 50%, rgba(8,11,31,.55))', opacity: 0 });
  const play = el('div', 'abs', card, { left: CW / 2 - 64 + 'px', top: CH / 2 - 64 + 'px', width: '128px', height: '128px', borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 60px rgba(109,74,255,.8)' });
  el('div', 'abs', play, { left: '50px', top: '36px', width: 0, height: 0, borderTop: '28px solid transparent', borderBottom: '28px solid transparent', borderLeft: '44px solid #fff' });
  const barBg = el('div', 'abs', card, { left: '28px', right: '28px', bottom: '24px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.35)' });
  const barFill = el('div', 'abs', barBg, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '4px', background: 'linear-gradient(90deg, var(--violet-hi), var(--coral))', transformOrigin: '0 50%' });
  const cardTag = el('div', 'abs', cam, { left: CX + 'px', top: CY - 46 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--muted)' });
  cardTag.textContent = 'YOUR DECK';

  /* presenter avatar */
  const pres = el('div', 'abs', cam, { left: CX - 70 + 'px', top: CY + CH - 90 + 'px', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle at 50% 35%, #2a2f6a, var(--ink))', border: '3px solid var(--violet-hi)', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,.5)' });
  pres.innerHTML = '<svg width="140" height="140" viewBox="0 0 140 140"><circle cx="70" cy="56" r="24" fill="#aab0d4"/><path d="M26 140 C 30 98, 110 98, 114 140 Z" fill="#aab0d4"/></svg>';

  /* ---- roadmap ---- */
  const RY = 820, RX0 = 160, RX1 = 1760;
  const track = el('div', 'abs', cam, { left: RX0 + 'px', top: RY + 'px', width: RX1 - RX0 + 'px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.1)' });
  const prog = el('div', 'abs', cam, { left: RX0 + 'px', top: RY + 'px', width: RX1 - RX0 + 'px', height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, var(--violet), var(--mint))', transformOrigin: '0 50%', boxShadow: '0 0 20px rgba(31,191,143,.5)' });
  const nodes = [0, 1, 2, 3].map((i) => {
    const x = RX0 + (RX1 - RX0) * i / 3;
    const big = i === 0 || i === 3;
    const s = big ? 44 : 22;
    return el('div', 'abs', cam, { left: x - s / 2 + 'px', top: RY + 2 - s / 2 + 'px', width: s + 'px', height: s + 'px', borderRadius: '50%', background: 'var(--ink)', border: '3px solid rgba(255,255,255,.25)', boxSizing: 'border-box' });
  });
  const endFill = el('div', 'abs', cam, { left: RX1 - 40 + 'px', top: RY + 2 - 40 + 'px', width: '80px', height: '80px', borderRadius: '50%', background: 'var(--mint)', boxShadow: '0 0 60px rgba(31,191,143,.8)' });
  endFill.innerHTML = '<svg width="80" height="80" viewBox="0 0 80 80"><path d="M27 20 h18 l10 10 v30 h-28 z" fill="#fff"/><path d="M45 20 v10 h10" fill="none" stroke="#1fbf8f" stroke-width="3"/><path d="M36 38 l10 7 l-10 7 z" fill="#1fbf8f"/></svg>';
  const startRing = el('div', 'abs', cam, { left: RX0 - 22 + 'px', top: RY + 2 - 22 + 'px', width: '44px', height: '44px', borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 40px rgba(109,74,255,.9)' });
  const labA = el('div', 'abs', cam, { left: RX0 - 10 + 'px', top: RY + 54 + 'px', font: mono, letterSpacing: '.14em', color: '#fff' });
  labA.textContent = 'TIDY THE DECK';
  const labB = el('div', 'abs', cam, { left: RX1 - 410 + 'px', width: '420px', textAlign: 'right', top: RY + 54 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--mint)' });
  labB.textContent = 'SHARE THE FILE';
  const ring = el('div', 'abs', cam, { left: RX1 - 60 + 'px', top: RY + 2 - 60 + 'px', width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--mint)', boxSizing: 'border-box', opacity: 0 });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'none' }, 0);
  tl.fromTo(glow, { opacity: 0.6, x: -40 }, { opacity: 1, x: 40, duration: ctx.dur, ease: 'sine.inOut' }, 0);

  tl.from(kicker, { opacity: 0, x: -20, duration: 0.6 }, 0.1);
  tl.from(words, { opacity: 0, y: 70, rotationX: -70, transformOrigin: '50% 100%', duration: 0.8, ease: 'back.out(1.6)', stagger: 0.32 }, 0.2);

  // slide card drifts in on "slide deck"
  gsap.set(card, { filter: 'brightness(1)' });
  tl.fromTo(card, { opacity: 0, x: 160, y: 40, rotationY: -28, rotationX: 8 }, { opacity: 1, x: 0, y: 0, rotationY: -12, rotationX: 4, duration: 1.3, ease: 'expo.out' }, tDeck - 0.45);
  tl.to(card, { rotationY: -4, rotationX: 1, y: -14, duration: ctx.dur - tDeck, ease: 'sine.inOut' }, tDeck + 0.85);
  tl.from(cardTag, { opacity: 0, y: 12, duration: 0.5 }, tDeck);

  // presenter docks beside the deck
  tl.from(pres, { opacity: 0, scale: 0.3, duration: 0.6, ease: 'back.out(2)' }, tExpl);
  tl.to(card, { boxShadow: '0 50px 110px rgba(0,0,0,.55), 0 0 120px rgba(143,117,255,.6)', duration: 0.4, yoyo: true, repeat: 1 }, tWell - 0.1);

  // "work": becomes a video
  gsap.set([play, barBg], { opacity: 0 });
  tl.to(shade, { opacity: 1, duration: 0.4 }, tWork - 0.15);
  tl.fromTo(play, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, tWork - 0.15);
  tl.to(barBg, { opacity: 1, duration: 0.3 }, tWork);
  tl.fromTo(barFill, { scaleX: 0 }, { scaleX: 1, duration: ctx.dur - tWork, ease: 'none', immediateRender: false }, tWork);

  // "without you in the room": presenter leaves
  tl.to(pres, { x: -120, opacity: 0, scale: 0.7, duration: 0.7, ease: 'power3.in' }, tWithout);
  tl.to(play, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, tRoom);

  // roadmap
  const rmIn = tTidy - 0.5;
  tl.from([track, ...nodes], { opacity: 0, duration: 0.5, stagger: 0.05 }, rmIn);
  tl.fromTo(startRing, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, tTidy);
  tl.from(labA, { opacity: 0, y: 16, duration: 0.5 }, tTidy);
  tl.fromTo(prog, { scaleX: 0 }, { scaleX: 1, duration: tShare - tTidy + 0.15, ease: 'power2.inOut' }, tTidy);
  nodes.slice(1, 3).forEach((n, i) => tl.to(n, { borderColor: 'var(--mint)', background: 'var(--mint)', duration: 0.25 }, tTidy + (tShare - tTidy) * (i + 1) / 3));
  tl.from(labB, { opacity: 0, y: 16, duration: 0.5 }, tShare);
  tl.fromTo(endFill, { opacity: 0, scale: 0.2, rotation: -20 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2.2)' }, tFile - 0.1);
  tl.fromTo(ring, { opacity: 1, scale: 0.5 }, { opacity: 0, scale: 2, duration: 0.9, ease: 'power2.out', immediateRender: false }, tFile);
  tl.to(endFill, { boxShadow: '0 0 100px rgba(31,191,143,1)', duration: 0.6, yoyo: true, repeat: 1 }, tFile + 0.5);
});

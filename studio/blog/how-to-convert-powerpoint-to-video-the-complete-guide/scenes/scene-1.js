/* Scene 2 — "A deck on its own relies on a presenter. A video carries the slides and the explanation,
 * so viewers can watch whenever suits them."
 * Storyboard: the title "A video explains itself" builds word by word. The original slide drifts in on "deck";
 * a dashed tether reaches out on "relies" and a presenter figure pops up on "presenter". On "video" the
 * presenter dissolves and a video player wraps the slide. The slide glows on "slides", and a voice waveform
 * comes alive with a playhead on "explanation". On "viewers" three viewer cards slide in, each at a different
 * time. Their progress bars fill on "whenever", and "ON THEIR SCHEDULE" lands on "suits". Slow camera drift throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tDeck = A(0, 'deck'), tRelies = A(0, 'relies'), tPres = A(0, 'presenter.');
  const tVideo = A(1, 'video'), tSlides = A(1, 'slides'), tExpl = A(1, 'explanation,');
  const tViewers = A(1, 'viewers'), tWhen = A(1, 'whenever'), tSuits = A(1, 'suits');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 35% 55%, #1a1f52 0%, var(--ink) 45%, var(--night) 85%)';
  const glowL = el('div', 'abs', stage, { left: '-200px', top: '300px', width: '1300px', height: '900px', background: 'radial-gradient(closest-side, rgba(109,74,255,.22), transparent)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 55%' });

  /* title */
  const title = el('div', 'abs', cam, { left: '150px', top: '100px', font: '800 76px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#fff', whiteSpace: 'nowrap' });
  const words = ctx.split(title, 'A video explains itself', 'word');
  const accent = words[1];
  accent.style.background = 'linear-gradient(100deg, var(--violet-hi), var(--coral))';
  accent.style.webkitBackgroundClip = 'text'; accent.style.backgroundClip = 'text'; accent.style.color = 'transparent';

  /* video player chrome (appears on "video") */
  const panel = el('div', 'abs', cam, { left: '150px', top: '250px', width: '1000px', height: '660px', borderRadius: '22px', background: 'linear-gradient(180deg, #161b45, #0c1030)', border: '1px solid rgba(143,117,255,.35)', boxShadow: '0 50px 120px rgba(0,0,0,.6), 0 0 80px rgba(109,74,255,.25)', transformOrigin: '50% 50%' });
  const play = el('div', 'abs', panel, { left: '30px', top: '596px', width: 0, height: 0, borderTop: '16px solid transparent', borderBottom: '16px solid transparent', borderLeft: '26px solid #fff' });
  const wave = el('div', 'abs', panel, { left: '84px', top: '574px', width: '760px', height: '76px' });
  const N = 46, bars = [];
  for (let i = 0; i < N; i++) bars.push(el('div', 'abs', wave, { left: i * 16.5 + 'px', width: '8px', borderRadius: '4px', top: '38px', height: '4px', background: 'rgba(255,255,255,.25)' }));
  const voice = el('div', 'abs', panel, { left: '868px', top: '600px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--muted)' });
  voice.textContent = 'VOICE';

  /* the slide itself */
  const screen = el('div', 'abs', cam, { left: '166px', top: '266px', width: '968px', height: '545px', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 30px 80px rgba(0,0,0,.5)' });
  const img = el('img', 'abs', screen, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' }); img.src = ctx.asset('slide-2.png');

  /* presenter dependency */
  const tether = el('div', 'abs', cam, { left: '1150px', top: '537px', width: '210px', height: '0', borderTop: '4px dashed rgba(170,176,212,.7)', transformOrigin: '0 50%' });
  const pres = el('div', 'abs', cam, { left: '1370px', top: '400px', width: '280px', height: '300px', transformOrigin: '50% 100%' });
  pres.innerHTML = `<svg width="280" height="300" viewBox="0 0 280 300"><defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f75ff"/><stop offset="1" stop-color="#4a33c4"/></linearGradient></defs>
    <circle cx="140" cy="80" r="58" fill="url(#pg)"/><path d="M30 290 C30 190 70 160 140 160 C210 160 250 190 250 290 Z" fill="url(#pg)"/></svg>`;
  const presLab = el('div', 'abs', cam, { left: '1310px', top: '730px', width: '400px', textAlign: 'center', font: `600 24px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--muted)' });
  presLab.textContent = 'NEEDS A PRESENTER';

  /* viewers */
  const header = el('div', 'abs', cam, { left: '1290px', top: '268px', font: `700 24px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--mint)' });
  header.textContent = 'ON THEIR SCHEDULE';
  const VIEW = [['7:30 AM', 0.82, '#ff6b4a'], ['1:15 PM', 0.48, '#8f75ff'], ['11:40 PM', 0.66, '#1fbf8f']];
  const cards = VIEW.map(([time, fill, col], i) => {
    const c = el('div', 'abs', cam, { left: '1290px', top: 320 + i * 180 + 'px', width: '480px', height: '150px', borderRadius: '20px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 24px 60px rgba(0,0,0,.4)' });
    el('div', 'abs', c, { left: '28px', top: '35px', width: '80px', height: '80px', borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff8, ${col} 60%)`, boxShadow: `0 0 30px ${col}66` });
    const t = el('div', 'abs', c, { left: '136px', top: '38px', font: '800 38px/1 Inter', letterSpacing: '-.03em', color: '#fff' }); t.textContent = time;
    const track = el('div', 'abs', c, { left: '136px', top: '100px', width: '300px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.12)' });
    const bar = el('div', 'abs', track, { left: 0, top: 0, height: '8px', width: '300px', borderRadius: '4px', background: col, transformOrigin: '0 50%' });
    return { c, bar, fill };
  });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* waveform driven per frame */
  const S = { amp: 0, p: 0 };
  ctx.onFrame((t) => {
    for (let i = 0; i < N; i++) {
      const base = (Math.abs(Math.sin(i * 1.7) + Math.sin(i * 0.6 + 1)) / 2) * 0.8 + 0.2;
      const h = 4 + 62 * base * S.amp * (0.65 + 0.35 * Math.sin(t * 7 + i * 0.9));
      bars[i].style.height = h + 'px';
      bars[i].style.top = 38 - h / 2 + 'px';
      bars[i].style.background = i / N < S.p ? 'var(--coral)' : 'rgba(255,255,255,.25)';
    }
  });

  /* ---- timeline ---- */
  gsap.set([panel, tether, pres, presLab, header, ...cards.map((c) => c.c)], { opacity: 0 });
  gsap.set(tether, { scaleX: 0 });
  gsap.set(cards.map((c) => c.bar), { scaleX: 0 });
  gsap.set(screen, { filter: 'brightness(1) blur(0px)' });

  tl.to(cam, { scale: 1.04, x: -10, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(glowL, { x: 120, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(words, { y: 50, opacity: 0, duration: 0.6, stagger: 0.09, ease: 'back.out(1.6)' }, 0.05);

  // "deck": slide drifts in
  tl.from(screen, { x: -140, y: 30, opacity: 0, scale: 0.92, rotation: -2, duration: 1.1, ease: 'power3.out' }, Math.max(0.15, tDeck - 0.45));
  // "relies": tether reaches out; "presenter": figure pops
  tl.to(tether, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' }, tRelies);
  tl.fromTo(pres, { opacity: 0, scale: 0.4, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' }, tPres - 0.15);
  tl.fromTo(presLab, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45 }, tPres + 0.1);

  // "video": presenter dissolves, player wraps the slide
  tl.to([pres, presLab, tether], { opacity: 0, x: 60, scale: 0.8, duration: 0.5, ease: 'power2.in' }, tVideo - 0.3);
  tl.fromTo(panel, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'expo.out' }, tVideo - 0.05);
  tl.from(play, { scale: 0, duration: 0.5, ease: 'back.out(2)' }, tVideo + 0.2);

  // "slides": the slide glows
  tl.to(screen, { boxShadow: '0 0 0 4px rgba(143,117,255,.9), 0 0 90px rgba(109,74,255,.7)', duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' }, tSlides - 0.05);

  // "explanation": voice comes alive, playhead moves
  tl.to(S, { amp: 1, duration: 0.6, ease: 'power2.out' }, tExpl - 0.1);
  tl.to(S, { p: 0.75, duration: ctx.dur - tExpl, ease: 'none' }, tExpl);
  tl.to(voice, { color: '#ffffff', duration: 0.3 }, tExpl);

  // "viewers": cards arrive
  tl.fromTo(cards.map((c) => c.c), { opacity: 0, x: 90 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)' }, tViewers - 0.15);
  // "whenever": each watches at their own pace
  cards.forEach((c, i) => tl.to(c.bar, { scaleX: c.fill, duration: 0.9, ease: 'power2.out' }, tWhen - 0.1 + i * 0.1));
  // "suits": header lands
  tl.fromTo(header, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, tSuits - 0.1);
});

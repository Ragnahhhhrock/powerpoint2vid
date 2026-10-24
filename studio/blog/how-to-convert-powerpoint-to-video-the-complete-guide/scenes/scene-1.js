/* Scene 2 — "A deck on its own relies on a presenter. A video carries the slides and the explanation,
 * so anyone can watch whenever suits them, and everyone hears the same message."
 * Storyboard: bright paper stage, wide. The deck's slide card leans on a small presenter figure; on
 * "presenter" the figure walks off and the card topples flat. On "video" it stands back up, wrapped in a
 * play-button frame, then on "carries" it shrinks and glides right along a dotted route across a mist map
 * (one lateral camera glide). The headline "It explains itself and travels" snaps in on "explanation".
 * Viewers pop on "anyone", ticking clocks show different times on "whenever", and identical sky-blue
 * speech bubbles pop above every viewer on "same message". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tDeck = A(0, 'deck'), tRelies = A(0, 'relies'), tPres = A(0, 'presenter.');
  const tVideo = A(1, 'video'), tCarries = A(1, 'carries'), tExpl = A(1, 'explanation,');
  const tAnyone = A(1, 'anyone'), tWhen = A(1, 'whenever'), tEvery = A(1, 'everyone');
  const tSame = A(1, 'same'), tMsg = A(1, 'message.');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 38%, #fffdf8 0%, var(--paper) 58%, #e9e4d9 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 600px' });

  /* ---- mist map ---- */
  const map = el('div', 'abs', cam, { left: '140px', top: '300px', width: '1640px', height: '690px', borderRadius: '44px', overflow: 'hidden',
    background: 'rgba(201,207,219,.28)', boxShadow: 'inset 0 0 0 2px rgba(201,207,219,.6)' });
  el('div', 'abs', map, { inset: 0, backgroundImage: 'radial-gradient(circle, rgba(27,34,51,.13) 2px, transparent 2.6px)', backgroundSize: '36px 36px' });
  [[120, 80, 420, 260, '58% 42% 61% 39% / 47% 55% 45% 53%'], [640, 330, 520, 300, '42% 58% 37% 63% / 55% 41% 59% 45%'], [1180, 60, 380, 280, '63% 37% 52% 48% / 40% 60% 40% 60%']]
    .forEach(([x, y, w, h, r]) => el('div', 'abs', map, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', borderRadius: r, background: 'rgba(201,207,219,.55)' }));

  const ROUTE = 'M330 650 C 480 650, 560 800, 700 800 S 960 600, 1080 600 S 1320 780, 1460 780 S 1600 560, 1640 520';
  const STOPS = [[700, 800], [1080, 600], [1460, 780]];
  const route = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  route.innerHTML = `<svg width="1920" height="1080"><path d="${ROUTE}" fill="none" stroke="var(--ink)" stroke-opacity=".55" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 18"/>
    ${STOPS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="var(--paper)" stroke="var(--ink)" stroke-width="4"/>`).join('')}</svg>`;
  gsap.set(route, { clipPath: 'inset(0px 1600px 0px 0px)' });

  /* ---- viewers, clocks, bubbles ---- */
  const SHIRTS = ['var(--sky)', 'var(--mint)', 'var(--signal)'];
  const viewers = [], clocks = [], bubbles = [], minHands = [];
  STOPS.forEach(([x, y], i) => {
    const v = el('div', 'abs', cam, { left: x - 40 + 'px', top: y + 22 + 'px', width: '80px', height: '100px', transformOrigin: '50% 100%' });
    v.innerHTML = `<svg width="80" height="100"><circle cx="40" cy="22" r="18" fill="var(--ink)"/><path d="M8 100 Q8 50 40 47 Q72 50 72 100 Z" fill="${SHIRTS[i]}"/></svg>`;
    viewers.push(v);
    const c = el('div', 'abs', cam, { left: x + 54 + 'px', top: y + 40 + 'px', width: '60px', height: '60px', boxSizing: 'border-box', borderRadius: '50%',
      border: '5px solid var(--ink)', background: '#fff', boxShadow: '0 8px 20px rgba(14,19,32,.15)' });
    const hr = el('div', 'abs', c, { left: '23px', top: '11px', width: '4px', height: '14px', borderRadius: '2px', background: 'var(--ink)', transformOrigin: '50% 100%' });
    const mn = el('div', 'abs', c, { left: '23.5px', top: '4px', width: '3px', height: '21px', borderRadius: '2px', background: 'var(--signal)', transformOrigin: '50% 100%' });
    el('div', 'abs', c, { left: '21px', top: '21px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)' });
    gsap.set(hr, { rotation: [40, 160, 290][i] });
    gsap.set(mn, { rotation: [0, 210, 120][i] });
    clocks.push(c); minHands.push(mn);
    const b = el('div', 'abs', cam, { left: x - 70 + 'px', top: y - 150 + 'px', width: '140px', height: '88px', borderRadius: '24px', background: 'var(--sky)',
      boxShadow: '0 16px 34px rgba(91,140,255,.35)', transformOrigin: '50% 125%' });
    el('div', 'abs', b, { left: '58px', top: '74px', width: '24px', height: '24px', background: 'var(--sky)', transform: 'rotate(45deg)', borderRadius: '4px' });
    b.insertAdjacentHTML('beforeend', `<svg class="abs" style="left:0;top:0" width="140" height="88"><path d="M30 28 L52 44 L30 60 Z" fill="#fff"/>
      <rect x="64" y="32" width="48" height="8" rx="4" fill="#fff"/><rect x="64" y="48" width="32" height="8" rx="4" fill="#fff" fill-opacity=".7"/></svg>`);
    bubbles.push(b);
  });

  /* ---- presenter + slide card (act 1) ---- */
  const shadow = el('div', 'abs', cam, { left: '330px', top: '735px', width: '540px', height: '34px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(14,19,32,.25), transparent)' });
  const pres = el('div', 'abs', cam, { left: '858px', top: '450px', width: '150px', height: '300px', transformOrigin: '50% 100%' });
  pres.innerHTML = `<svg width="150" height="300"><circle cx="80" cy="42" r="32" fill="var(--ink)"/>
    <path d="M38 200 Q36 92 80 88 Q124 92 122 200 Z" fill="var(--ink)"/>
    <path d="M52 120 L8 150" stroke="var(--ink)" stroke-width="16" stroke-linecap="round"/>
    <path d="M62 196 L58 296 M98 196 L104 296" stroke="var(--ink)" stroke-width="18" stroke-linecap="round"/></svg>`;

  const persp = el('div', 'abs', cam, { inset: 0, perspective: '1400px' });
  const card = el('div', 'abs', persp, { left: 0, top: 0, width: '480px', height: '270px', transformOrigin: '50% 100%' });
  const frame = el('div', 'abs', card, { left: '-16px', top: '-16px', right: '-16px', bottom: '-16px', borderRadius: '26px', background: 'var(--ink)', boxShadow: '0 30px 70px rgba(14,19,32,.35)' });
  const face = el('div', 'abs', card, { inset: 0, borderRadius: '10px', overflow: 'hidden', background: '#fff', boxShadow: '0 20px 50px rgba(14,19,32,.22)' });
  const img = el('img', 'abs', face, { inset: 0, width: '100%', height: '100%' }); img.src = ctx.asset('slide-2.png');
  const track = el('div', 'abs', face, { left: '20px', right: '20px', bottom: '16px', height: '8px', borderRadius: '4px', background: 'rgba(27,34,51,.18)' });
  const fill = el('div', 'abs', track, { inset: 0, borderRadius: '4px', background: 'var(--signal)', transformOrigin: '0% 50%' });
  const play = el('div', 'abs', card, { left: '185px', top: '80px', width: '110px', height: '110px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 12px 40px rgba(255,107,74,.55)' });
  play.innerHTML = '<svg width="110" height="110"><path d="M44 32 L80 55 L44 78 Z" fill="#fff"/></svg>';

  const label = el('div', 'abs', stage, { left: '140px', top: '150px', font: `600 24px/1 ${MONO}`, letterSpacing: '.16em', color: 'rgba(27,34,51,.55)' });
  label.textContent = 'A DECK ON ITS OWN';

  /* ---- headline ---- */
  const head = el('div', 'abs', stage, { left: '80px', width: '1760px', top: '92px', textAlign: 'center', font: '800 110px/1.05 "Inter Display", Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  const words = ctx.split(head, 'It explains itself and travels', 'word');
  words[4].style.color = 'var(--signal)';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- initial states ---- */
  gsap.set(card, { xPercent: -50, yPercent: -50, x: 600, y: 615 });
  gsap.set([frame, play, track], { opacity: 0 });
  gsap.set(frame, { scale: 1.12 });
  gsap.set(play, { scale: 0 });
  gsap.set(fill, { scaleX: 0 });
  gsap.set(map, { opacity: 0, scale: 0.97 });
  gsap.set(words, { opacity: 0, y: 50 });
  gsap.set([...viewers, ...bubbles], { scale: 0, opacity: 0 });
  gsap.set(clocks, { scale: 0, opacity: 0 });
  gsap.set(card, { filter: 'drop-shadow(0 0 0 rgba(255,107,74,0))' });

  /* ---- act 1: lonely deck ---- */
  tl.from(pres, { y: 40, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, 0.05);
  tl.from(card, { y: 560, opacity: 0, duration: 0.6, ease: 'back.out(1.5)', immediateRender: true }, 0.1);
  tl.from(shadow, { opacity: 0, duration: 0.5 }, 0.1);
  tl.to(card, { rotation: 6, duration: 0.7, ease: 'back.out(1.8)' }, tDeck - 0.1);
  tl.from(label, { opacity: 0, x: -20, duration: 0.5 }, tDeck);
  tl.to(pres, { scaleY: 0.96, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' }, tRelies);
  // presenter steps away
  tl.to(pres, { x: 260, duration: 0.9, ease: 'power2.inOut' }, tPres);
  tl.to(pres, { y: -10, duration: 0.15, yoyo: true, repeat: 5, ease: 'sine.inOut' }, tPres);
  tl.to(pres, { opacity: 0, duration: 0.4 }, tPres + 0.5);
  // card topples flat
  tl.to(card, { rotation: 0, rotationX: 80, duration: 0.5, ease: 'power2.in' }, tPres + 0.2);
  tl.to(card, { rotationX: 72, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.out' }, tPres + 0.7);
  tl.to(shadow, { scaleX: 1.1, opacity: 0.6, duration: 0.5, ease: 'power2.in' }, tPres + 0.2);

  /* ---- act 2: video carries ---- */
  tl.to(label, { opacity: 0, duration: 0.4 }, tVideo - 0.2);
  tl.to(card, { rotationX: 0, duration: 0.6, ease: 'back.out(1.6)' }, tVideo - 0.15);
  tl.to(frame, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, tVideo);
  tl.to(track, { opacity: 1, duration: 0.3 }, tVideo + 0.15);
  tl.to(play, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, tVideo + 0.12);
  tl.to(map, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, tVideo);
  tl.to(shadow, { opacity: 0, duration: 0.4 }, tCarries);
  tl.to(card, { x: 330, y: 650, scale: 0.4, duration: 0.6, ease: 'power3.inOut' }, tCarries);
  tl.to(route, { clipPath: 'inset(0px 250px 0px 0px)', duration: 1.9, ease: 'power1.inOut' }, tCarries + 0.3);
  const gStart = tCarries + 0.6, gEnd = tAnyone + 0.1;
  tl.to(card, { motionPath: { path: ROUTE }, duration: gEnd - gStart, ease: 'power1.inOut' }, gStart);
  tl.to(fill, { scaleX: 1, duration: gEnd - gStart + 2.5, ease: 'none' }, gStart);
  // lateral camera glide + slow push-in
  tl.fromTo(cam, { x: 30, scale: 1 }, { x: -30, scale: 1.035, duration: gEnd - tCarries + 0.6, ease: 'expo.inOut' }, tCarries);
  tl.to(cam, { scale: 1.05, duration: ctx.dur - (gEnd + 0.6), ease: 'power1.inOut' }, gEnd + 0.6);

  // headline snaps in on its words
  tl.to(words.slice(0, 3), { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'back.out(1.7)' }, tExpl - 0.05);
  tl.to(words.slice(3), { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.7)' }, tExpl + 0.65);

  /* ---- anyone, whenever, same message ---- */
  tl.to(viewers, { scale: 1, opacity: 1, duration: 0.55, stagger: 0.12, ease: 'back.out(1.8)' }, tAnyone - 0.05);
  tl.to(clocks, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, tWhen - 0.05);
  minHands.forEach((m, i) => tl.to(m, { rotation: '+=' + (360 + i * 90), duration: ctx.dur - tWhen - 0.2, ease: 'steps(' + (14 + i * 3) + ')' }, tWhen + 0.3));
  tl.to(viewers, { y: -12, duration: 0.18, yoyo: true, repeat: 1, stagger: 0.08, ease: 'power2.out' }, tEvery);
  tl.to(bubbles, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(2)' }, tSame - 0.08);
  tl.to(bubbles, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, tMsg + 0.05);
  tl.to(card, { filter: 'drop-shadow(0 0 30px rgba(255,107,74,.55))', duration: 0.5 }, tSame);
});

/* Scene 2: "Keep it short and specific to the buyer. Their situation, the problem, your answer, proof,
 * then one clear ask. It mirrors how a buyer thinks."
 * Storyboard: warm paper stage with a wide shot. "Short. Specific to the buyer." lands word by word
 * (buyer underlined in signal). Then the camera pushes in and tracks a staircase. Five rounded steps rise
 * left to right, each on its word: Situation, Problem, Answer, Proof, Next step. On "answer" five small
 * cards fan out and collapse into one ("one slide, not five"). On "one clear ask" the final step glows
 * mint and an arrow shoots up. On "mirrors" the camera pulls back to the whole staircase, a dotted
 * path climbs the steps, and "How a buyer thinks." settles on top. The bullet text becomes the step labels. */
P2V.scene((ctx) => {
  const { tl, el, stage, at } = ctx;
  const W = { short: at(0, 'short'), specific: at(0, 'specific'), buyer: at(0, 'buyer.') };
  const words = [at(1, 'situation,'), at(1, 'problem,'), at(1, 'answer,'), at(1, 'proof,'), at(1, 'then')];
  const ask = at(1, 'ask.'), mirrors = at(2, 'mirrors'), thinks = at(2, 'thinks.');

  const NIGHT = '#0F1424', INK = '#1B2238', PAPER = '#F7F4EE', SIGNAL = '#FF6B4A', ELEC = '#4C7DFF', MINT = '#3DD6A3';
  const FLOOR = 900, SW = 300, GAP = 12, X0 = 180;
  const H = [150, 240, 330, 420, 510];
  const STEPS = [
    ['Situation', 'IN THEIR WORDS'],
    ['Problem', 'DESCRIBED PLAINLY'],
    ['Answer', 'ONE SLIDE, NOT FIVE'],
    ['Proof', 'SHOW, DON\u2019T TELL'],
    ['Next step', 'ONE CLEAR ASK'],
  ];
  const sx = (i) => X0 + i * (SW + GAP);

  stage.style.background = `radial-gradient(70% 70% at 45% 35%, #fffdf8 0%, ${PAPER} 55%, #ebe4d6 100%)`;
  const cam = el('div', 'abs', stage, { left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: '0 0' });

  /* floor + warm light pool */
  el('div', 'abs', cam, { left: '120px', width: '1680px', top: FLOOR - 40 + 'px', height: '120px', borderRadius: '50%', background: 'radial-gradient(50% 50% at 50% 50%, rgba(27,34,56,.14), transparent 70%)' });
  el('div', 'abs', cam, { left: '120px', width: '1680px', top: FLOOR + 'px', height: '3px', background: 'linear-gradient(90deg, transparent, rgba(27,34,56,.35), transparent)' });

  /* ghost outlines: the staircase waiting to be built */
  const ghosts = H.map((h, i) => el('div', 'abs', cam, { left: sx(i) + 'px', top: FLOOR - h + 'px', width: SW + 'px', height: h + 'px', borderRadius: '22px 22px 6px 6px', border: '2px dashed rgba(27,34,56,.16)', boxSizing: 'border-box' }));

  /* mint glow behind final step */
  const glow = el('div', 'abs', cam, { left: sx(4) - 90 + 'px', top: FLOOR - H[4] - 90 + 'px', width: SW + 180 + 'px', height: H[4] + 140 + 'px', borderRadius: '60px', background: `radial-gradient(50% 50% at 50% 45%, rgba(61,214,163,.55), transparent 72%)`, opacity: 0 });

  /* steps */
  const steps = H.map((h, i) => {
    const wrap = el('div', 'abs', cam, { left: sx(i) + 'px', top: FLOOR - h - 70 + 'px', width: SW + 'px', height: h + 70 + 'px', overflow: 'hidden' });
    const inner = el('div', 'abs', wrap, { left: 0, top: '70px', width: SW + 'px', height: h + 120 + 'px', borderRadius: '22px 22px 6px 6px', overflow: 'hidden',
      background: `linear-gradient(180deg, #2a3352 0%, ${INK} 45%, #141a2c 100%)` });
    const mint = el('div', 'abs', inner, { inset: 0, background: `linear-gradient(180deg, #7ff0c8 0%, ${MINT} 50%, #22b585 100%)`, opacity: 0 });
    el('div', 'abs', inner, { left: '22px', right: '22px', top: '0px', height: '6px', borderRadius: '0 0 6px 6px', background: i === 4 ? MINT : ELEC });
    const num = el('div', 'abs', inner, { left: '26px', top: '26px', font: '600 18px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'rgba(247,244,238,.5)' });
    num.textContent = '0' + (i + 1);
    const lab = el('div', 'abs', inner, { left: '26px', top: '56px', font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.035em', color: PAPER });
    lab.textContent = STEPS[i][0];
    const sub = el('div', 'abs', inner, { left: '27px', top: '112px', font: '600 15px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: 'rgba(247,244,238,.6)' });
    sub.textContent = STEPS[i][1];
    return { wrap, inner, mint, num, lab, sub, h };
  });

  /* five cards -> one (above Answer) */
  const ax = sx(2) + SW / 2, ay = FLOOR - H[2] - 120;
  const cards = [0, 1, 2, 3, 4].map((k) => {
    const c = el('div', 'abs', cam, { left: ax - 60 + 'px', top: ay + 'px', width: '120px', height: '78px', borderRadius: '10px', background: '#fff', boxShadow: '0 12px 30px rgba(15,20,36,.18)', border: '2px solid rgba(27,34,56,.12)', boxSizing: 'border-box', opacity: 0 });
    el('div', 'abs', c, { left: '14px', top: '16px', width: '60px', height: '8px', borderRadius: '4px', background: k === 2 ? ELEC : 'rgba(27,34,56,.3)' });
    el('div', 'abs', c, { left: '14px', top: '34px', width: '90px', height: '6px', borderRadius: '3px', background: 'rgba(27,34,56,.15)' });
    el('div', 'abs', c, { left: '14px', top: '48px', width: '70px', height: '6px', borderRadius: '3px', background: 'rgba(27,34,56,.15)' });
    return c;
  });

  /* climbing path + arrow */
  const svg = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const pts = H.map((h, i) => [sx(i) + SW / 2, FLOOR - h - 34]);
  const d = 'M' + pts.map((p) => p.join(' ')).join(' L ');
  const tipX = sx(4) + SW / 2 + 130, tipY = FLOOR - H[4] - 160;
  const arrowD = `M${sx(4) + SW / 2} ${FLOOR - H[4] - 34} Q ${tipX - 40} ${tipY + 70}, ${tipX} ${tipY}`;
  svg.innerHTML = `<svg width="1920" height="1080">
    <path id="climb" d="${d}" fill="none" stroke="${INK}" stroke-opacity=".45" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 16"/>
    <path id="arr" d="${arrowD}" fill="none" stroke="${MINT}" stroke-width="9" stroke-linecap="round"/>
    <path id="head" d="M${tipX - 34} ${tipY - 2} L ${tipX} ${tipY} L ${tipX - 6} ${tipY + 34}" fill="none" stroke="${MINT}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const climb = svg.querySelector('#climb'), arr = svg.querySelector('#arr'), head = svg.querySelector('#head');
  const arrLen = arr.getTotalLength ? arr.getTotalLength() : 300;
  gsap.set(arr, { strokeDasharray: arrLen, strokeDashoffset: arrLen });
  gsap.set(head, { opacity: 0, transformOrigin: `${tipX}px ${tipY}px` });
  gsap.set(climb, { opacity: 0 });
  gsap.set(svg, { clipPath: 'inset(0px 0px 0px 0px)' });

  /* headline (wide shot) */
  const hl = el('div', 'abs', stage, { left: '80px', right: '80px', top: '330px', textAlign: 'center', font: '900 100px/1.05 Inter Display, Inter', letterSpacing: '-.045em', color: INK });
  const hw = ['Short.', 'Specific', 'to', 'the', 'buyer.'].map((w, i) => {
    const s = el('span', '', hl, { display: 'inline-block', position: 'relative', marginRight: i < 4 ? '.24em' : '0', color: i === 4 ? SIGNAL : INK });
    s.textContent = w;
    return s;
  });
  const under = el('div', 'abs', hw[4], { left: '0', right: '.1em', bottom: '-10px', height: '10px', borderRadius: '5px', background: SIGNAL, transformOrigin: '0 50%' });
  gsap.set(under, { scaleX: 0 });
  const kicker = el('div', 'abs', stage, { left: '80px', right: '80px', top: '270px', textAlign: 'center', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: '#8A93A8' });
  kicker.textContent = 'THE STRUCTURE';

  /* closing caption */
  const cap = el('div', 'abs', stage, { left: '80px', right: '80px', top: '150px', textAlign: 'center', font: '900 86px/1 Inter Display, Inter', letterSpacing: '-.045em', color: INK });
  const capW = ['How', 'a', 'buyer', 'thinks.'].map((w, i) => {
    const s = el('span', '', cap, { display: 'inline-block', marginRight: i < 3 ? '.24em' : '0', color: i === 3 ? MINT : INK });
    s.textContent = w;
    return s;
  });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* ---- camera helper ---- */
  const frame = (i, s = 1.25) => {
    const cx = sx(i) + SW / 2, cy = FLOOR - H[i] / 2 - 40;
    return { scale: s, x: 960 - cx * s, y: 540 - cy * s };
  };

  /* ---- timeline ---- */
  // opening: wide on paper
  gsap.set(cam, { scale: 1, x: 0, y: 0 });
  tl.to(cam, { scale: 1.02, x: -19, y: -11, duration: 3, ease: 'none' }, 0);
  tl.from(ghosts, { opacity: 0, y: 20, duration: 0.6, stagger: 0.06 }, 0.05);
  tl.from(kicker, { opacity: 0, y: 12, duration: 0.5 }, 0.15);
  tl.from(hw[0], { opacity: 0, y: 60, scale: 0.8, duration: 0.5, ease: 'back.out(1.8)' }, W.short - 0.12);
  tl.from(hw.slice(1, 4), { opacity: 0, y: 50, duration: 0.45, stagger: 0.12, ease: 'back.out(1.6)' }, W.specific - 0.12);
  tl.from(hw[4], { opacity: 0, y: 60, scale: 0.85, duration: 0.5, ease: 'back.out(1.8)' }, W.buyer - 0.12);
  tl.to(under, { scaleX: 1, duration: 0.45, ease: 'power3.out' }, W.buyer + 0.15);

  // hand off to the staircase
  tl.to([hl, kicker], { opacity: 0, y: -90, duration: 0.5, ease: 'power2.in' }, words[0] - 0.7);

  // camera tracks each step as it rises on its word
  steps.forEach((s, i) => {
    const w = words[i];
    tl.to(cam, { ...frame(i), duration: i === 0 ? 0.75 : 0.55, ease: 'expo.inOut' }, w - (i === 0 ? 0.6 : 0.42));
    tl.fromTo(s.inner, { y: s.h + 120 }, { y: 0, duration: 0.6, ease: 'back.out(1.5)', immediateRender: true }, w - 0.12);
    tl.from([s.num, s.lab, s.sub], { opacity: 0, y: 18, duration: 0.35, stagger: 0.05 }, w + 0.1);
    tl.to(ghosts[i], { opacity: 0, duration: 0.3 }, w);
  });

  // "answer": five cards fan out, collapse into one
  const fan = [-2, -1, 0, 1, 2];
  cards.forEach((c, k) => {
    tl.fromTo(c, { opacity: 0, x: 0, y: 30, rotation: 0, scale: 0.6 },
      { opacity: 1, x: fan[k] * 105, y: Math.abs(fan[k]) * 10, rotation: fan[k] * 7, scale: 1, duration: 0.3, ease: 'back.out(1.7)', immediateRender: false }, words[2] + 0.02 + k * 0.03);
    tl.to(c, { x: 0, y: 0, rotation: 0, duration: 0.28, ease: 'power3.in' }, words[2] + 0.42);
    if (k !== 2) tl.to(c, { opacity: 0, duration: 0.08 }, words[2] + 0.68);
  });
  tl.to(cards[2], { scale: 1.15, borderColor: ELEC, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, words[2] + 0.7);

  // "one clear ask": final step glows mint, arrow shoots up
  const s4 = steps[4];
  tl.to(cam, { ...frame(4, 1.32), duration: ask - words[4] + 0.6, ease: 'power1.inOut' }, words[4] + 0.2);
  tl.to(s4.mint, { opacity: 1, duration: 0.4 }, ask - 0.2);
  tl.to(s4.lab, { color: NIGHT, duration: 0.4 }, ask - 0.2);
  tl.to([s4.num, s4.sub], { color: 'rgba(15,20,36,.65)', duration: 0.4 }, ask - 0.2);
  tl.to(glow, { opacity: 1, duration: 0.5 }, ask - 0.2);
  tl.to(arr, { strokeDashoffset: 0, duration: 0.45, ease: 'power3.out' }, ask - 0.05);
  tl.to(head, { opacity: 1, duration: 0.1 }, ask + 0.3);
  tl.from(head, { scale: 0.3, duration: 0.35, ease: 'back.out(2.5)' }, ask + 0.3);

  // "mirrors": pull back to the whole staircase
  tl.to(cam, { scale: 1, x: 0, y: 40, duration: 1.0, ease: 'expo.inOut' }, mirrors - 0.35);
  tl.to(climb, { opacity: 1, duration: 0.1 }, mirrors + 0.2);
  tl.fromTo(svg, { clipPath: 'inset(0px 1700px 0px 0px)' }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.9, ease: 'power2.inOut', immediateRender: false }, mirrors + 0.2);
  tl.from(capW, { opacity: 0, y: 40, duration: 0.45, stagger: 0.09, ease: 'back.out(1.6)' }, mirrors + 0.25);
  tl.to(glow, { opacity: 0.6, duration: 0.5, yoyo: true, repeat: 1 }, thinks);
  tl.to(cam, { scale: 1.03, x: -29, y: 24, duration: ctx.dur - (mirrors + 0.65), ease: 'power1.inOut' }, mirrors + 0.65);
});

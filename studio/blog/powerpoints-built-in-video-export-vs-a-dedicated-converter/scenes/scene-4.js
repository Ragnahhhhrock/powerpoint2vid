/* Scene 4 — "Many people use both. A leader's quarterly message suits their own voice, while an onboarding
 * module that changes every few months suits a converter."
 * Storyboard: night stage. The deck's four checklist questions drop in as chips, then tilt toward their
 * paths: voice and animations lean amber, changes and captions lean blue. On "use both" the two lanes
 * slide apart like a road with a dashed divider, and the chips settle at the top of their lanes. On
 * "quarterly message" an amber card with a leader silhouette lands left, and its sound waves pulse on
 * "voice". On "onboarding module" a blue card with a calendar inside a repeat ring lands right. Its
 * month pages flip on "changes every few months", and the card glows on "converter". */
P2V.scene((ctx) => {
  const { tl, el, stage, at } = ctx;
  const people = at(0, 'people'), both = at(0, 'both.'), quarterly = at(1, 'quarterly'), message = at(1, 'message'),
    voice = at(1, 'voice,'), onboarding = at(1, 'onboarding'), module_ = at(1, 'module'), changes = at(1, 'changes'),
    every = at(1, 'every'), months = at(1, 'months'), converter = at(1, 'converter.');
  const AMB = '#F2A33A', BLU = '#3FA7D6';
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 28% 40%, rgba(242,163,58,.10), transparent 70%), radial-gradient(60% 55% at 72% 60%, rgba(63,167,214,.11), transparent 70%), radial-gradient(90% 80% at 50% 50%, #18203a 0%, var(--night) 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* lanes */
  const mkLane = (left, col, rgb) => el('div', 'abs', cam, { left: left + 'px', top: '100px', width: '780px', height: '880px', borderRadius: '36px',
    background: `linear-gradient(180deg, rgba(${rgb},.10), rgba(${rgb},.03))`, border: `1.5px solid rgba(${rgb},.28)`, boxShadow: `0 40px 100px rgba(0,0,0,.35), inset 0 0 80px rgba(${rgb},.05)` });
  const laneL = mkLane(150, AMB, '242,163,58'), laneR = mkLane(990, BLU, '63,167,214');
  const divider = el('div', 'abs', cam, { left: '958px', top: '120px', width: '4px', height: '840px', transformOrigin: '50% 0%',
    background: 'repeating-linear-gradient(180deg, rgba(246,243,236,.45) 0 26px, transparent 26px 50px)' });
  const mkHead = (left, txt, col) => { const h = el('div', 'abs', cam, { left: left + 'px', width: '780px', top: '134px', textAlign: 'center', font: mono, letterSpacing: '.16em', color: col }); h.textContent = txt; return h; };
  const headL = mkHead(150, 'BUILT-IN EXPORT', AMB), headR = mkHead(990, 'CONVERTER', BLU);

  /* chips */
  const CH = [['Your own voice?', AMB, 310, 186, -1], ['Custom animations?', AMB, 310, 262, -1], ['Changes often?', BLU, 1150, 186, 1], ['Captions free?', BLU, 1150, 262, 1]];
  const chips = CH.map(([txt, col, fx, fy, side], i) => {
    const c = el('div', 'abs', cam, { left: fx + 'px', top: fy + 'px', width: '460px', height: '62px', borderRadius: '31px', display: 'flex', alignItems: 'center', gap: '18px', padding: '0 28px', boxSizing: 'border-box',
      background: 'rgba(27,34,56,.92)', border: '2px solid rgba(154,163,184,.3)', boxShadow: '0 14px 34px rgba(0,0,0,.4)', font: '700 30px/1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--paper)' });
    el('div', '', c, { width: '16px', height: '16px', borderRadius: '50%', background: col, boxShadow: `0 0 14px ${col}`, flex: '0 0 auto' });
    el('span', '', c).textContent = txt;
    return { c, col, side, dx: 730 - fx, dy: 330 + i * 92 - fy };
  });

  /* amber card: leader */
  const mkCard = (left, rgb) => el('div', 'abs', cam, { left: left + 'px', top: '366px', width: '620px', height: '540px', borderRadius: '30px',
    background: 'linear-gradient(180deg, #232b46, #161c30)', border: `2px solid rgba(${rgb},.55)`, boxShadow: `0 40px 90px rgba(0,0,0,.5), 0 0 60px rgba(${rgb},.18)`, overflow: 'hidden' });
  const cardL = mkCard(230, '242,163,58');
  const lead = el('div', 'abs', cardL, { left: 0, top: '30px', width: '620px', height: '340px' });
  lead.innerHTML = `<svg width="620" height="340" viewBox="0 0 620 340"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd08a"/><stop offset="1" stop-color="#d9831f"/></linearGradient></defs>
    <g id="person"><circle cx="310" cy="120" r="60" fill="url(#lg)"/><path d="M180 330 Q180 205 310 205 Q440 205 440 330 Z" fill="url(#lg)"/></g>
    ${[0, 1, 2].map((k) => `<path class="wv" d="M${410 + k * 34} ${80 - k * 14} Q${440 + k * 44} 125 ${410 + k * 34} ${170 + k * 14}" fill="none" stroke="${AMB}" stroke-width="7" stroke-linecap="round"/><path class="wv" d="M${210 - k * 34} ${80 - k * 14} Q${180 - k * 44} 125 ${210 - k * 34} ${170 + k * 14}" fill="none" stroke="${AMB}" stroke-width="7" stroke-linecap="round"/>`).join('')}</svg>`;
  const person = lead.querySelector('#person'), waves = [...lead.querySelectorAll('.wv')];
  const labL = el('div', 'abs', cardL, { left: '40px', width: '540px', top: '410px', textAlign: 'center', font: '800 52px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)' });
  labL.textContent = 'Quarterly message';
  const glowL = el('div', 'abs', cardL, { inset: 0, background: 'radial-gradient(60% 50% at 50% 35%, rgba(242,163,58,.35), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  /* blue card: onboarding calendar */
  const cardR = mkCard(1070, '63,167,214');
  const ring = el('div', 'abs', cardR, { left: '140px', top: '24px', width: '340px', height: '340px' });
  ring.innerHTML = `<svg width="340" height="340" viewBox="0 0 340 340"><path d="M170 14 A156 156 0 1 1 30 100" fill="none" stroke="${BLU}" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 18" opacity=".85"/>
    <path d="M18 72 L30 104 L62 92" fill="none" stroke="${BLU}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const calWrap = el('div', 'abs', cardR, { left: '185px', top: '74px', width: '250px', height: '240px', perspective: '900px' });
  const MONTHS = ['JAN', 'APR', 'JUL', 'OCT'];
  const pages = MONTHS.map((m, i) => {
    const p = el('div', 'abs', calWrap, { inset: 0, borderRadius: '18px', background: '#F6F3EC', overflow: 'hidden', transformOrigin: '50% 0%', zIndex: 10 - i, boxShadow: '0 16px 30px rgba(0,0,0,.35)' });
    const band = el('div', 'abs', p, { left: 0, top: 0, width: '250px', height: '62px', background: 'linear-gradient(180deg, #5bbbe6, #2b8fbf)', font: '800 34px/62px Inter Display, Inter', letterSpacing: '.04em', textAlign: 'center', color: '#fff' });
    band.textContent = m;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
      const hot = r === 1 + (i % 2) && c === 2 + i;
      el('div', 'abs', p, { left: 24 + c * 30 + 'px', top: 84 + r * 36 + 'px', width: '22px', height: '22px', borderRadius: '6px', background: hot ? BLU : 'rgba(27,34,56,.14)' });
    }
    return p;
  });
  const labR = el('div', 'abs', cardR, { left: '40px', width: '540px', top: '410px', textAlign: 'center', font: '800 52px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)' });
  labR.textContent = 'Onboarding module';
  const glowR = el('div', 'abs', cardR, { inset: 0, background: 'radial-gradient(60% 50% at 50% 35%, rgba(63,167,214,.4), transparent 70%)', opacity: 0, mixBlendMode: 'screen' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  // checklist chips drop in, centered
  chips.forEach((ch, i) => {
    gsap.set(ch.c, { x: ch.dx, y: ch.dy });
    tl.fromTo(ch.c, { opacity: 0, y: ch.dy - 70, scale: 0.9 }, { opacity: 1, y: ch.dy, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0.05 + i * 0.1);
  });
  // they lean toward their path
  chips.forEach((ch, i) => {
    tl.to(ch.c, { x: ch.dx + ch.side * 60, rotation: ch.side * 4, borderColor: ch.col, boxShadow: `0 14px 34px rgba(0,0,0,.4), 0 0 26px ${ch.col}55`, duration: 0.6, ease: 'back.out(1.5)' }, people - 0.1 + i * 0.06);
  });
  // "use both": lanes slide apart from the middle, chips settle in their lanes
  gsap.set([laneL, laneR, headL, headR, cardL, cardR, labL, labR], { opacity: 0 });
  tl.fromTo(laneL, { x: 390, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, ease: 'expo.inOut', immediateRender: false }, both - 0.3);
  tl.fromTo(laneR, { x: -390, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, ease: 'expo.inOut', immediateRender: false }, both - 0.3);
  tl.fromTo(divider, { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: 'expo.inOut' }, both - 0.1);
  tl.to(chips.map((c) => c.c), { x: 0, y: 0, rotation: 0, duration: 1.0, ease: 'expo.inOut', stagger: 0.05 }, both - 0.2);
  tl.fromTo([headL, headR], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, both + 0.5);

  // leader card on "quarterly message"
  gsap.set(person, { transformOrigin: '310px 330px' });
  gsap.set(waves, { opacity: 0 });
  tl.fromTo(cardL, { opacity: 0, y: -90, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'back.out(1.4)', immediateRender: false }, quarterly - 0.15);
  tl.from(person, { scale: 0.6, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, quarterly + 0.1);
  tl.fromTo(labL, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, message);
  // "own voice": sound waves pulse, voice chip glows
  tl.to(waves, { opacity: 1, duration: 0.3, stagger: 0.06 }, voice - 0.45);
  tl.to(waves, { opacity: 0.35, duration: 0.45, stagger: 0.06, yoyo: true, repeat: 3, ease: 'sine.inOut' }, voice + 0.1);
  tl.fromTo(glowL, { opacity: 0 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 1, immediateRender: false }, voice - 0.1);
  tl.to(chips[0].c, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }, voice - 0.1);

  // onboarding card on "onboarding module"
  tl.fromTo(cardR, { opacity: 0, y: -90, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'back.out(1.4)', immediateRender: false }, onboarding - 0.15);
  tl.from(ring, { scale: 0.7, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, onboarding + 0.1);
  tl.fromTo(ring, { rotation: 0 }, { rotation: 300, duration: ctx.dur - onboarding, ease: 'none', immediateRender: false }, onboarding);
  tl.fromTo(labR, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, module_);
  // "changes every few months": pages flip
  [changes, every, months].forEach((t, i) => {
    tl.to(pages[i], { rotationX: -110, opacity: 0, duration: 0.5, ease: 'power2.in' }, t - 0.05);
  });
  tl.to(chips[2].c, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1 }, changes);
  // "converter": blue card glows, captions chip glows
  tl.fromTo(glowR, { opacity: 0 }, { opacity: 1, duration: 0.35, immediateRender: false }, converter - 0.1);
  tl.to(cardR, { boxShadow: '0 40px 90px rgba(0,0,0,.5), 0 0 110px rgba(63,167,214,.55)', duration: 0.5 }, converter - 0.1);
  tl.to(chips[3].c, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1 }, converter);
  tl.to(glowR, { opacity: 0.5, duration: 0.8, ease: 'sine.inOut' }, converter + 0.4);

  // gentle camera drift and push-in
  tl.fromTo(cam, { scale: 1, x: 0 }, { scale: 1.035, duration: ctx.dur, ease: 'none', immediateRender: false }, 0);
  tl.to(cam, { x: 18, duration: 2.5, ease: 'sine.inOut' }, quarterly);
  tl.to(cam, { x: -18, duration: 3, ease: 'sine.inOut' }, onboarding - 0.2);
});

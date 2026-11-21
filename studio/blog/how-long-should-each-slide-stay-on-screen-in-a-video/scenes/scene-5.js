/* Scene 5 — "If a slide drags, split it or reveal each part as the narration reaches it.
 *            If it flashes past, add a sentence so viewers get a fair look."
 * Storyboard: a night stage split into two panels. Left, 'TOO LONG' in coral: on "drags" a long coral
 * timeline crawls out. On "split" it breaks into three segments. On "reveal" a playhead sweeps and three
 * slide items light one by one in sync. Right, 'TOO SHORT' in amber: on "flashes" a tiny bar blinks by.
 * On "add a sentence" a speech line types in and the bar stretches to a comfortable teal length.
 * Caption 'One to three sentences per simple slide' fades in. Slow push-in throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const C = { night: '#0E1220', ink: '#1B2235', paper: '#F6F3EC', amber: '#F2A93B', teal: '#2EC4B6', coral: '#EF6351', mist: '#9AA3B8' };
  const tDrag = ctx.at(0, 'drags'), tSplit = ctx.at(0, 'split'), tReveal = ctx.at(0, 'reveal');
  const tEnd0 = ctx.beats[0].end;
  const tFlash = ctx.at(1, 'flashes'), tAdd = ctx.at(1, 'add'), tSent = ctx.at(1, 'sentence');
  const tCap = Math.min(ctx.at(1, 'viewers'), ctx.dur - 2.6);

  stage.style.background = `radial-gradient(60% 55% at 28% 40%, #1d2440 0%, transparent 70%), radial-gradient(55% 50% at 75% 45%, #1f2238 0%, transparent 70%), ${C.night}`;
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  const mono = '600 22px/1 ui-monospace, Menlo, monospace';
  const makePanel = (x, label, color) => {
    const p = el('div', 'abs', cam, { left: x + 'px', top: '140px', width: '820px', height: '660px', borderRadius: '28px',
      background: 'linear-gradient(180deg, rgba(27,34,53,.92), rgba(20,25,42,.92))', border: '1px solid rgba(255,255,255,.07)',
      boxShadow: '0 50px 120px rgba(0,0,0,.5)' });
    const lab = el('div', 'abs', p, { left: '60px', top: '46px', font: '800 46px/1 Inter Display, Inter', letterSpacing: '-.03em', color });
    lab.textContent = label;
    const dot = el('div', 'abs', p, { left: '700px', top: '52px', width: '34px', height: '34px', borderRadius: '50%', background: color, boxShadow: `0 0 30px ${color}` });
    const frame = el('div', 'abs', p, { left: '60px', top: '130px', width: '700px', height: '290px', borderRadius: '14px',
      background: 'rgba(246,243,236,.04)', border: '2px solid rgba(246,243,236,.12)' });
    const track = el('div', 'abs', p, { left: '60px', top: '470px', width: '700px', height: '16px', borderRadius: '8px', background: 'rgba(255,255,255,.07)' });
    return { p, lab, dot, frame, track };
  };
  const L = makePanel(100, 'TOO LONG', C.coral);
  const R = makePanel(1000, 'TOO SHORT', C.amber);

  /* left: three items inside the slide */
  const items = [0, 1, 2].map((i) => {
    const row = el('div', 'abs', L.frame, { left: '40px', top: 40 + i * 80 + 'px', width: '620px', height: '50px', opacity: 0.18 });
    const num = el('div', 'abs', row, { left: 0, top: 0, width: '50px', height: '50px', borderRadius: '50%', background: C.teal, color: C.night,
      font: '800 26px/50px Inter', textAlign: 'center' });
    num.textContent = i + 1;
    const bar = el('div', 'abs', row, { left: '76px', top: '13px', width: [460, 380, 420][i] + 'px', height: '24px', borderRadius: '12px', background: C.paper });
    return { row, num, bar };
  });
  const lFill = el('div', 'abs', L.track, { left: 0, top: 0, width: '700px', height: '16px', borderRadius: '8px', background: C.coral, transformOrigin: '0 50%', boxShadow: `0 0 24px rgba(239,99,81,.5)` });
  const segs = [0, 1, 2].map((i) => el('div', 'abs', L.track, { left: i * 236 + 'px', top: 0, width: '228px', height: '16px', borderRadius: '8px', background: C.teal, opacity: 0 }));
  const cuts = [1, 2].map((i) => el('div', 'abs', L.track, { left: i * 236 - 6 + 'px', top: '-10px', width: '4px', height: '36px', borderRadius: '2px', background: C.paper, transformOrigin: '50% 50%' }));
  const head = el('div', 'abs', L.p, { left: '58px', top: '446px', width: '6px', height: '64px', borderRadius: '3px', background: C.paper, boxShadow: '0 0 20px rgba(246,243,236,.9)', opacity: 0 });

  /* right: single-idea slide, tiny bar, speech line */
  const rTitle = el('div', 'abs', R.frame, { left: '40px', top: '44px', width: '380px', height: '34px', borderRadius: '17px', background: C.paper });
  const rImg = el('div', 'abs', R.frame, { left: '40px', top: '112px', width: '620px', height: '140px', borderRadius: '12px',
    background: 'linear-gradient(120deg, rgba(46,196,182,.35), rgba(242,169,59,.25))' });
  const rBar = el('div', 'abs', R.track, { left: 0, top: 0, width: '46px', height: '16px', borderRadius: '8px', background: C.amber, boxShadow: '0 0 22px rgba(242,169,59,.6)' });
  const bubble = el('div', 'abs', R.p, { left: '60px', top: '532px', width: '700px', height: '84px', borderRadius: '42px',
    background: 'rgba(46,196,182,.12)', border: `2px solid ${C.teal}`, opacity: 0 });
  const bText = el('div', 'abs', bubble, { left: '40px', top: '0', width: '630px', font: '600 32px/80px Inter', letterSpacing: '-.01em', color: C.paper, whiteSpace: 'nowrap' });
  const FULL = '“…so viewers get a fair look.”';
  const typed = { n: 0 };

  const caption = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '850px', textAlign: 'center', font: '800 50px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: C.paper });
  caption.textContent = 'One to three sentences per simple slide';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });
  ctx.onFrame((t) => {
    const n = Math.round(typed.n);
    const caret = n > 0 && n < FULL.length && Math.floor(t * 4) % 2 === 0 ? '|' : '';
    bText.textContent = FULL.slice(0, n) + caret;
  });

  /* ---- timeline ---- */
  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(L.p, { x: -60, opacity: 0, duration: 0.7 }, 0.05);
  tl.from(R.p, { x: 60, opacity: 0, duration: 0.7 }, 0.18);
  gsap.set(lFill, { scaleX: 0 });
  gsap.set(cuts, { scaleY: 0, opacity: 0 });
  gsap.set(caption, { opacity: 0, y: 20 });
  tl.to(R.p, { opacity: 0.45, duration: 0.6 }, 0.9);

  // "drags": a long coral bar crawls out
  tl.to(lFill, { scaleX: 1, duration: Math.max(0.8, tSplit - tDrag - 0.1), ease: 'power1.inOut' }, tDrag - 0.2);
  // "split": the bar breaks into three
  tl.to(cuts, { scaleY: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, tSplit);
  tl.to(lFill, { opacity: 0, duration: 0.4 }, tSplit + 0.1);
  tl.to(segs, { opacity: 0.25, duration: 0.4, stagger: 0.06 }, tSplit + 0.1);
  // "reveal each part": playhead sweeps, items light one by one
  const span = Math.max(1.5, tEnd0 - tReveal + 0.1);
  tl.to(head, { opacity: 1, duration: 0.25 }, tReveal - 0.2);
  tl.to(head, { x: 700, duration: span, ease: 'none' }, tReveal);
  items.forEach((it, i) => {
    const t = tReveal + (i / 3) * span;
    tl.to(it.row, { opacity: 1, duration: 0.35, ease: 'power2.out' }, t);
    tl.fromTo(it.num, { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, t);
    tl.to(segs[i], { opacity: 1, duration: 0.3 }, t);
  });

  // swap focus
  tl.to(L.p, { opacity: 0.45, duration: 0.6 }, tEnd0 + 0.1);
  tl.to(R.p, { opacity: 1, duration: 0.6 }, tEnd0 + 0.1);
  // "flashes past": tiny bar blinks by
  tl.fromTo(rBar, { x: 0 }, { x: 640, duration: 0.45, ease: 'power2.in', immediateRender: false }, tFlash - 0.1);
  tl.to(rBar, { opacity: 0.15, duration: 0.07, yoyo: true, repeat: 5, ease: 'none' }, tFlash - 0.1);
  tl.set(rBar, { x: 0 }, tFlash + 0.42);
  tl.fromTo(rBar, { scaleX: 0 }, { scaleX: 1, duration: 0.25, immediateRender: false, transformOrigin: '0 50%' }, tFlash + 0.42);
  // "add a sentence": speech line types, bar stretches to teal
  tl.to(bubble, { opacity: 1, duration: 0.35 }, tAdd - 0.1);
  tl.fromTo(bubble, { y: 20 }, { y: 0, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tAdd - 0.1);
  tl.to(typed, { n: FULL.length, duration: 1.3, ease: 'none' }, tAdd + 0.15);
  tl.to(rBar, { width: 560, backgroundColor: C.teal, boxShadow: '0 0 26px rgba(46,196,182,.6)', duration: 1.3, ease: 'power2.inOut' }, tSent);
  tl.to(R.dot, { backgroundColor: C.teal, boxShadow: `0 0 30px ${C.teal}`, duration: 0.6 }, tSent + 0.6);

  // caption, and both panels settle bright
  tl.to(L.p, { opacity: 1, duration: 0.6 }, tCap);
  tl.to(caption, { opacity: 1, y: 0, duration: 0.7 }, tCap);
});

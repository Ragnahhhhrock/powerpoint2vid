/* Scene 4 — "Headlines at 36 to 44 point, body text 24 point or larger, chart labels 18 point minimum,
 * and bigger still for video. If it won't fit at 24, cut words."
 * Storyboard: night stage with a vertical type-scale ruler on the left. "Headlines": a paper-white bar
 * grows into the 36–44pt band and a headline specimen settles in. "Body text 24": a signal-yellow bar locks
 * at the 24pt mark. "Chart labels 18": a teal floor line sweeps across at 18pt. "Bigger still for video":
 * every bar and specimen scales up together. "Won't fit at 24": a crowded paragraph spills out of a 24pt box
 * in coral. "Cut words": filler words are struck out and collapse until the text fits and the box turns teal. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const tHead = A(0, 'Headlines', 0.55), t36 = A(0, '36', 1.22), t44 = A(0, '44', 1.93);
  const tBody = A(0, 'body', 3.46), t24 = A(0, '24', 4.13);
  const tChart = A(0, 'chart', 5.82), t18 = A(0, '18', 6.59);
  const tBig = A(0, 'bigger', 8.13), tVid = A(0, 'video.', 8.87);
  const tIf = A(1, 'If', 9.92), tFit = A(1, 'fit', 10.42), tCut = A(1, 'cut', 11.59);

  const BASE = 920, PPT = 16, RX = 160;
  const Y = (pt) => BASE - pt * PPT;
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 60% at 30% 40%, #1d2330 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 35% at 70% 30%, rgba(255,194,61,.07), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '700px 560px' });

  /* ---- ruler ---- */
  const ruler = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const spine = el('div', 'abs', ruler, { left: RX + 'px', top: Y(48) + 'px', width: '2px', height: 48 * PPT + 'px', background: 'rgba(247,244,238,.35)', transformOrigin: '50% 100%' });
  const ticks = [];
  for (let p = 0; p <= 48; p += 2) {
    const major = p % 6 === 0 || p === 44 || p === 18 || p === 24;
    ticks.push(el('div', 'abs', ruler, { left: RX + 2 + 'px', top: Y(p) + 'px', width: (major ? 26 : 12) + 'px', height: '2px', background: major ? 'rgba(247,244,238,.55)' : 'rgba(247,244,238,.2)' }));
  }
  const rLabs = {};
  [0, 12, 18, 24, 36, 44].forEach((p) => {
    const l = el('div', 'abs', ruler, { left: '80px', width: '64px', top: Y(p) - 10 + 'px', textAlign: 'right', font: mono, color: 'var(--slate)' });
    l.textContent = p; rLabs[p] = l;
  });
  const ptTag = el('div', 'abs', ruler, { left: '96px', top: Y(48) - 48 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--slate)' });
  ptTag.textContent = 'PT';

  /* ---- bars ---- */
  const bars = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: `0px ${BASE}px` });
  const band = el('div', 'abs', bars, { left: RX + 30 + 'px', top: Y(44) + 'px', width: '360px', height: 8 * PPT + 'px', background: 'linear-gradient(90deg, rgba(247,244,238,.14), transparent)', borderTop: '2px dashed rgba(247,244,238,.5)', borderBottom: '2px dashed rgba(247,244,238,.5)' });
  const mkBar = (x, pt, bg, sh) => el('div', 'abs', bars, { left: x + 'px', top: Y(pt) + 'px', width: '74px', height: pt * PPT + 'px', borderRadius: '10px 10px 2px 2px', background: bg, boxShadow: sh, transformOrigin: '50% 100%' });
  const bHead = mkBar(210, 44, 'linear-gradient(180deg, #ffffff, #d9d4ca)', '0 0 50px rgba(247,244,238,.25)');
  const bBody = mkBar(304, 24, 'linear-gradient(180deg, #ffd66e, #f0a900)', '0 0 50px rgba(255,194,61,.4)');
  const bLab = mkBar(398, 18, 'linear-gradient(180deg, #5fe0d3, #1e9c90)', '0 0 40px rgba(46,196,182,.35)');
  const lock = el('div', 'abs', cam, { left: RX - 4 + 'px', top: Y(24) - 2 + 'px', width: '260px', height: '4px', background: 'var(--signal)', boxShadow: '0 0 20px rgba(255,194,61,.8)', transformOrigin: '0 50%' });
  const floor = el('div', 'abs', cam, { left: RX + 'px', top: Y(18) - 2 + 'px', width: 1840 - RX + 'px', height: '3px', background: 'linear-gradient(90deg, var(--teal), rgba(46,196,182,.15))', boxShadow: '0 0 18px rgba(46,196,182,.6)', transformOrigin: '0 50%' });
  const floorTag = el('div', 'abs', cam, { left: '1600px', top: Y(18) + 14 + 'px', width: '240px', textAlign: 'right', font: mono, letterSpacing: '.12em', color: 'var(--teal)' });
  floorTag.textContent = 'FLOOR · 18 PT';

  /* ---- specimens ---- */
  const spec = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  const mkSpec = (top, size, txt, color, weight, tagTxt, tagCol) => {
    const g = el('div', 'abs', spec, { left: '600px', top: top + 'px', transformOrigin: '0% 100%' });
    const tg = el('div', '', g, { font: mono, letterSpacing: '.14em', color: tagCol, marginBottom: '14px' }); tg.textContent = tagTxt;
    const tx = el('div', '', g, { font: `${weight} ${size}px/1 Inter Display, Inter`, letterSpacing: '-.03em', color, whiteSpace: 'nowrap' }); tx.textContent = txt;
    return g;
  };
  const sHead = mkSpec(150, 100, 'Make one point', 'var(--paper)', 850, 'HEADLINE · 36–44 PT', 'var(--slate)');
  const sBody = mkSpec(380, 56, 'Body text stays readable', 'var(--signal)', 600, 'BODY · 24 PT+', 'var(--slate)');
  const sLab = mkSpec(500, 40, 'Revenue, $M', 'var(--teal)', 600, 'CHART LABEL', 'var(--slate)');
  [sHead, sBody, sLab].forEach((g) => gsap.set(g, { filter: 'blur(0px)' }));
  const vidTag = el('div', 'abs', cam, { left: '1460px', top: '96px', padding: '14px 22px', borderRadius: '40px', border: '2px solid var(--signal)', font: '700 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--signal)', transformOrigin: '50% 50%' });
  vidTag.textContent = 'VIDEO ↑ BIGGER';
  gsap.set(vidTag, { filter: 'blur(0px)' });

  /* ---- paragraph that won't fit ---- */
  const BX = 600, BY = 300, BW = 1240, BH = 190;
  const boxLab = el('div', 'abs', cam, { left: BX + 'px', top: BY - 44 + 'px', font: mono, letterSpacing: '.14em', color: 'var(--signal)' });
  boxLab.textContent = 'BODY BOX · 24 PT';
  const status = el('div', 'abs', cam, { left: BX + BW - 300 + 'px', width: '300px', top: BY - 44 + 'px', textAlign: 'right', font: '700 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--coral)', transformOrigin: '100% 50%' });
  const box = el('div', 'abs', cam, { left: BX + 'px', top: BY + 'px', width: BW + 'px', height: BH + 'px', borderRadius: '18px', border: '3px solid rgba(138,147,163,.6)', background: 'rgba(27,31,39,.85)', boxShadow: '0 40px 90px rgba(0,0,0,.45)' });
  const para = el('div', 'abs', cam, { left: BX + 32 + 'px', top: BY + 28 + 'px', width: BW - 64 + 'px', font: '600 54px/66px Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--paper)' });
  const WORDS = [['In', 0], ['summary,', 0], ['it', 0], ['is', 0], ['worth', 0], ['noting', 0], ['that', 0], ['Q3', 1], ['revenue', 1], ['has', 0], ['essentially', 0], ['and', 0], ['quite', 0], ['broadly', 0], ['landed', 1], ['right', 1], ['on', 1], ['our', 0], ['original', 0], ['target.', 1]];
  const spans = WORDS.map(([w, keep]) => {
    const s = el('span', '', para, { display: 'inline-block', position: 'relative', whiteSpace: 'nowrap', overflow: 'hidden', verticalAlign: 'top', marginRight: '15px', maxWidth: '600px' });
    s.textContent = w;
    let strike = null;
    if (!keep) strike = el('div', 'abs', s, { left: 0, right: 0, top: '33px', height: '5px', background: 'var(--coral)', transformOrigin: '0 50%', borderRadius: '3px' });
    return { s, keep, strike };
  });
  const cuts = spans.filter((o) => !o.keep);
  const overflowZone = el('div', 'abs', cam, { left: BX + 'px', top: BY + BH + 'px', width: BW + 'px', height: '240px', background: 'repeating-linear-gradient(135deg, rgba(255,94,87,.12) 0 14px, transparent 14px 28px)', borderRadius: '0 0 18px 18px' });

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  const hide = [band, bHead, bBody, bLab, lock, floor, floorTag, sHead, sBody, sLab, vidTag, boxLab, status, box, para, overflowZone];
  gsap.set(hide, { opacity: 0 });
  gsap.set([bHead, bBody, bLab], { scaleY: 0 });
  gsap.set(cuts.map((o) => o.strike), { scaleX: 0 });
  gsap.set(spans.map((o) => o.s), { opacity: 0, y: 20 });

  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(spine, { scaleY: 0, duration: 0.9, ease: 'expo.out' }, 0);
  tl.from(ticks, { opacity: 0, x: -10, duration: 0.4, stagger: { each: 0.02, from: 'end' } }, 0.05);
  tl.from([...Object.values(rLabs), ptTag], { opacity: 0, duration: 0.5, stagger: 0.05 }, 0.2);

  // Headlines 36–44
  tl.to(bHead, { opacity: 1, duration: 0.2 }, tHead);
  tl.to(bHead, { scaleY: 36 / 44, duration: Math.max(0.5, t36 - tHead), ease: 'power2.out' }, tHead);
  tl.to(band, { opacity: 1, duration: 0.5 }, t36);
  tl.to(bHead, { scaleY: 1, duration: 0.6, ease: 'back.out(1.6)' }, t44);
  tl.fromTo(sHead, { opacity: 0, scale: 0.86, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9 }, tHead + 0.2);
  tl.to([rLabs[36], rLabs[44]], { color: '#F7F4EE', duration: 0.3 }, t36);

  // Body 24
  tl.to(bBody, { opacity: 1, scaleY: 1, duration: 0.8, ease: 'back.out(1.5)' }, tBody);
  tl.fromTo(lock, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.45, ease: 'power4.out' }, t24);
  tl.to(rLabs[24], { color: '#FFC23D', duration: 0.3 }, t24);
  tl.fromTo(sBody, { opacity: 0, scale: 0.86, filter: 'blur(12px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8 }, tBody + 0.1);

  // Chart labels 18
  tl.to(bLab, { opacity: 1, scaleY: 1, duration: 0.8, ease: 'back.out(1.5)' }, tChart);
  tl.fromTo(floor, { opacity: 1, scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out', immediateRender: false }, t18 - 0.1);
  tl.to(floorTag, { opacity: 1, duration: 0.4 }, t18 + 0.3);
  tl.to(rLabs[18], { color: '#2EC4B6', duration: 0.3 }, t18);
  tl.fromTo(sLab, { opacity: 0, scale: 0.86, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8 }, tChart + 0.1);

  // bigger still for video
  tl.to(bars, { scaleY: 1.18, duration: 0.9, ease: 'back.out(1.4)' }, tBig);
  tl.to([sHead, sBody, sLab], { scale: 1.16, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.05 }, tBig);
  tl.fromTo(vidTag, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, tVid - 0.2);

  // transition to paragraph: bars settle back onto the ruler's true marks
  const tOut = tIf - 0.45;
  tl.to([sHead, sBody, sLab, vidTag], { opacity: 0, y: -40, filter: 'blur(8px)', duration: 0.5, ease: 'power2.in', stagger: 0.04 }, tOut);
  tl.to(bars, { scaleY: 1, duration: 0.7, ease: 'power3.inOut' }, tOut);
  tl.to([bHead, bLab, band, floor], { opacity: 0.25, duration: 0.5 }, tOut);
  tl.to(floorTag, { opacity: 0, duration: 0.4 }, tOut);
  tl.fromTo(box, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, tIf - 0.1);
  tl.to([boxLab, para], { opacity: 1, duration: 0.4 }, tIf);
  tl.to(spans.map((o) => o.s), { opacity: 1, y: 0, duration: 0.35, stagger: 0.02 }, tIf);

  // won't fit → overflow
  tl.to(box, { borderColor: '#FF5E57', boxShadow: '0 0 60px rgba(255,94,87,.45)', duration: 0.3 }, tFit);
  tl.to(overflowZone, { opacity: 1, duration: 0.3 }, tFit);
  tl.set(status, { opacity: 1 }, tFit);
  tl.fromTo(box, { x: 0 }, { x: 10, duration: 0.06, yoyo: true, repeat: 3, ease: 'none', immediateRender: false }, tFit + 0.05);
  tl.to(cuts.map((o) => o.s), { color: 'rgba(247,244,238,.55)', duration: 0.3 }, tFit + 0.3);

  // cut words
  tl.to(cuts.map((o) => o.strike), { scaleX: 1, duration: 0.18, stagger: 0.03, ease: 'power2.out' }, tCut - 0.05);
  tl.to(cuts.map((o) => o.s), { maxWidth: 0, marginRight: 0, opacity: 0, duration: 0.45, stagger: 0.025, ease: 'power3.inOut' }, tCut + 0.3);
  const tDone = tCut + 0.3 + 0.45 + cuts.length * 0.025;
  tl.to(overflowZone, { opacity: 0, duration: 0.3 }, tDone - 0.2);
  tl.to(box, { borderColor: '#2EC4B6', boxShadow: '0 0 60px rgba(46,196,182,.4)', duration: 0.35 }, tDone - 0.1);
  tl.fromTo(status, { scale: 1.3 }, { scale: 1, duration: 0.4, ease: 'back.out(2)', immediateRender: false }, tDone - 0.1);
  tl.to(spans.filter((o) => o.keep).map((o) => o.s), { color: '#FFFFFF', duration: 0.3 }, tDone);
  tl.to(glow, { opacity: 0.6, duration: 1.5, ease: 'sine.inOut' }, tDone);

  // status text driven from t so scrubbing is frame-accurate
  ctx.onFrame((t) => {
    if (t < tFit) status.textContent = '';
    else if (t < tDone - 0.1) { status.textContent = 'OVERFLOW'; status.style.color = '#FF5E57'; }
    else { status.textContent = 'FITS ✓'; status.style.color = '#2EC4B6'; }
  });
});

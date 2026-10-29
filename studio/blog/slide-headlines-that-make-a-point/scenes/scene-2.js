/* Scene 2 — "Ask so what: what should the audience conclude? Then say it in one short, specific sentence.
 * Onboarding now takes two days instead of five beats onboarding time."
 * Storyboard: hard switch to bright paper. A giant "So what?" slams in on "so what", gets a coral pen
 * underline on "conclude", then shrinks to the top-left corner. On "one short, specific" a ruler and two
 * line slots draw in: "one line · two at most". The slate label "Onboarding time" snaps in and is struck
 * through; the headline types into the two slots word by word, "2 days" and "5" swept in butter, while
 * the camera dollies right with the type. On "beats", the label dims and the sentence is tagged HEADLINE. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const T = {
    ask: A(0, 'Ask', 0.55), so: A(0, 'so', 0.887), conclude: A(0, 'conclude?', 2.361),
    one: A(1, 'one', 4.265), short: A(1, 'short,', 4.509), specific: A(1, 'specific', 4.846), sentence: A(1, 'sentence.', 5.38),
    onb: A(2, 'Onboarding', 6.251), now: A(2, 'now', 6.866), takes: A(2, 'takes', 7.052), two: A(2, 'two', 7.319),
    days: A(2, 'days', 7.528), instead: A(2, 'instead', 7.864), of: A(2, 'of', 8.201), five: A(2, 'five', 8.305),
    beats: A(2, 'beats', 8.631), time: A(2, 'time.', 9.525),
  };
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 45% 40%, #fffdf8 0%, var(--paper) 60%, #e9e3d6 100%)';
  const rules = el('div', 'abs', stage, { inset: 0, backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 79px, rgba(20,22,31,.045) 79px 80px)' });
  const margin = el('div', 'abs', stage, { left: '96px', top: 0, bottom: 0, width: '2px', background: 'rgba(255,90,60,.18)' });
  const folio = el('div', 'abs', stage, { right: '100px', bottom: '80px', font: `600 20px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' });
  folio.textContent = '02 — SO WHAT';

  const push = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 45%' });
  const cam = el('div', 'abs', push, { inset: 0 });
  gsap.set(cam, { x: 120 });

  const RL = 220, RW = 1420;
  const ruler = el('div', 'abs', cam, { left: RL + 'px', top: '360px', width: RW + 'px', height: '24px' });
  let ticks = '';
  for (let x = 0; x <= RW; x += 20) { const h = x % 100 === 0 ? 24 : 11; ticks += `<line x1="${x + 1}" y1="0" x2="${x + 1}" y2="${h}" stroke="#14161F" stroke-width="2" opacity="${x % 100 === 0 ? 0.7 : 0.35}"/>`; }
  ruler.innerHTML = `<svg width="${RW + 2}" height="26"><line x1="0" y1="1" x2="${RW + 2}" y2="1" stroke="#14161F" stroke-width="2"/>${ticks}</svg>`;
  gsap.set(ruler, { clipPath: `inset(0px ${RW + 4}px 0px 0px)` });
  const rlab = el('div', 'abs', cam, { left: RL + 'px', width: RW + 'px', top: '322px', textAlign: 'right', font: `700 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--signal)' });
  rlab.textContent = 'ONE LINE · TWO AT MOST';

  const base1 = el('div', 'abs', cam, { left: RL + 'px', width: RW + 'px', top: '566px', height: '3px', background: 'var(--ink)', transformOrigin: '0 50%' });
  const base2 = el('div', 'abs', cam, { left: RL + 'px', width: RW + 'px', top: '726px', height: '0px', borderTop: '3px dashed rgba(20,22,31,.45)', transformOrigin: '0 50%' });
  const n1 = el('div', 'abs', cam, { left: '160px', top: '520px', font: `700 22px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--slate)' }); n1.textContent = '01';
  const n2 = el('div', 'abs', cam, { left: '160px', top: '680px', font: `700 22px/1 ${MONO}`, letterSpacing: '.1em', color: 'var(--slate)' }); n2.textContent = '02';
  const sk1 = el('div', 'abs', cam, { left: RL + 'px', top: '468px', width: '1140px', height: '78px', borderRadius: '12px', background: 'rgba(20,22,31,.08)', transformOrigin: '0 50%' });
  const sk2 = el('div', 'abs', cam, { left: RL + 'px', top: '628px', width: '620px', height: '78px', borderRadius: '12px', border: '3px dashed rgba(20,22,31,.18)', transformOrigin: '0 50%' });

  const labRow = el('div', 'abs', cam, { left: RL + 'px', top: '214px', display: 'flex', alignItems: 'center', gap: '28px', whiteSpace: 'nowrap' });
  const labTxt = el('span', '', labRow, { position: 'relative', display: 'inline-block', font: '700 80px/1.1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--slate)' });
  labTxt.textContent = 'Onboarding time';
  const strike = el('div', 'abs', labTxt, { left: '-10px', right: '-10px', top: '52%', height: '9px', borderRadius: '5px', background: 'var(--signal)', transformOrigin: '0 50%', transform: 'rotate(-1.5deg)' });
  const labTag = el('span', '', labRow, { font: `700 20px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--slate)', border: '2px solid rgba(138,144,166,.6)', padding: '8px 12px', borderRadius: '6px' });
  labTag.textContent = 'LABEL';
  const headTag = el('div', 'abs', cam, { left: RL + 'px', top: '404px', font: `700 22px/1 ${MONO}`, letterSpacing: '.18em', color: '#fff', background: 'var(--signal)', padding: '7px 12px', borderRadius: '6px', boxShadow: '0 8px 24px rgba(255,90,60,.35)' });
  headTag.textContent = 'HEADLINE ✓';

  const mkLine = (top) => el('div', 'abs', cam, { left: RL + 'px', top: top + 'px', font: '800 110px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)', whiteSpace: 'nowrap', isolation: 'isolate' });
  const L1 = mkLine(450), L2 = mkLine(610);
  const chars = [];
  const hls = [];
  const addSeg = (parent, line, text, t0, t1) => {
    const span = Math.max(0.12, Math.min(0.32, (t1 - t0) * 0.8));
    [...text].forEach((c, k) => {
      const s = el('span', '', parent, { display: 'inline-block', whiteSpace: 'pre' });
      s.textContent = c;
      const tt = t0 + (k / Math.max(1, text.length)) * span;
      chars.push({ s, line, wrap: parent === line ? null : parent, t: tt });
    });
  };
  const mkHl = (line) => {
    const w = el('span', '', line, { position: 'relative', display: 'inline-block', whiteSpace: 'pre' });
    const bg = el('span', 'abs', w, { left: '-10px', right: '-10px', top: '22%', bottom: '2%', background: 'var(--butter)', borderRadius: '8px', zIndex: -1, transformOrigin: '0 50%' });
    hls.push(bg); return w;
  };
  addSeg(L1, L1, 'Onboarding', T.onb, T.now);
  addSeg(L1, L1, ' now', T.now, T.takes);
  addSeg(L1, L1, ' takes', T.takes, T.two);
  const h1 = mkHl(L2);
  addSeg(h1, L2, '2', T.two, T.days);
  addSeg(h1, L2, ' days', T.days, T.instead);
  addSeg(L2, L2, ' instead', T.instead, T.of);
  addSeg(L2, L2, ' of ', T.of, T.five);
  const h2 = mkHl(L2);
  addSeg(h2, L2, '5', T.five, T.five + 0.2);
  addSeg(L2, L2, '.', T.five + 0.18, T.five + 0.3);
  const caret = el('div', 'abs', cam, { width: '7px', height: '104px', background: 'var(--signal)', borderRadius: '3px', opacity: 0 });

  const askTag = el('div', 'abs', stage, { left: 0, width: '1920px', top: '330px', textAlign: 'center', font: `700 26px/1 ${MONO}`, letterSpacing: '.3em', color: 'var(--signal)' });
  askTag.textContent = 'ASK';
  const SW = el('div', 'abs', stage, { left: '120px', top: '80px', font: '900 160px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)', whiteSpace: 'nowrap', transformOrigin: '50% 50%' });
  SW.innerHTML = 'So what<span style="color:var(--signal)">?</span>';
  const swU = el('div', 'abs', SW, { left: '4px', right: '4px', bottom: '-22px', height: '12px', borderRadius: '6px', background: 'var(--signal)', transformOrigin: '0 50%' });
  const sw = SW.offsetWidth || 720, sh = SW.offsetHeight || 160;
  const cx = (1920 - sw) / 2 - 120, cy = 540 - sh / 2 - 80 + 20;
  const S = 0.4;

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  ctx.onFrame((t) => {
    let last = null;
    for (const c of chars) { const on = t >= c.t; c.s.style.opacity = on ? 1 : 0; if (on) last = c; }
    if (t < T.onb - 0.05) { caret.style.opacity = 0; return; }
    let x, line;
    if (!last) { x = 0; line = L1; }
    else { x = last.s.offsetLeft + last.s.offsetWidth + (last.wrap ? last.wrap.offsetLeft : 0); line = last.line; }
    caret.style.left = (RL + x + 6) + 'px';
    caret.style.top = (parseFloat(line.style.top) + 14) + 'px';
    const done = t > T.five + 0.45;
    caret.style.opacity = done ? (Math.floor((t - T.five) * 2.4) % 2 ? 0 : 1) : 1;
  });

  gsap.set([ruler, rlab, base1, base2, n1, n2, sk1, sk2, labRow, headTag, askTag], { opacity: 0 });
  gsap.set([base1, base2, sk1, sk2, strike, swU, ...hls], { scaleX: 0 });
  gsap.set(SW, { x: cx, y: cy, opacity: 0 });

  tl.from(rules, { opacity: 0, duration: 0.3, ease: 'none' }, 0);
  tl.from(folio, { opacity: 0, y: 10, duration: 0.3 }, 0.1);
  tl.to(push, { scale: 1.04, duration: ctx.dur, ease: 'power1.inOut' }, 0);

  tl.fromTo(askTag, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25 }, T.ask);
  tl.fromTo(SW, { scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.26, ease: 'power4.out', immediateRender: false }, T.so - 0.06);
  tl.to(SW, { y: cy + 8, duration: 0.06, yoyo: true, repeat: 1, ease: 'power1.inOut' }, T.so + 0.2);
  tl.to(swU, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, T.conclude);
  tl.to(askTag, { opacity: 0, duration: 0.2 }, T.conclude + 0.35);
  tl.to(SW, { x: -(sw / 2) * (1 - S), y: -(sh / 2) * (1 - S), scale: S, duration: 0.6, ease: 'expo.inOut' }, Math.max(T.conclude + 0.5, 2.85));

  tl.to(ruler, { opacity: 1, duration: 0.01 }, T.one - 0.05);
  tl.to(ruler, { clipPath: 'inset(0px 0px 0px 0px)', duration: 0.45, ease: 'power3.out' }, T.one - 0.05);
  tl.fromTo(rlab, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25 }, T.one + 0.1);
  tl.to([base1, n1], { opacity: 1, scaleX: 1, duration: 0.3 }, T.short);
  tl.to([sk1], { opacity: 1, scaleX: 1, duration: 0.3 }, T.short + 0.05);
  tl.to([base2, n2], { opacity: 1, scaleX: 1, duration: 0.3 }, T.specific);
  tl.to([sk2], { opacity: 1, scaleX: 1, duration: 0.3 }, T.specific + 0.05);
  tl.to(sk1, { background: 'rgba(255,90,60,.12)', duration: 0.2, yoyo: true, repeat: 1 }, T.sentence);

  tl.fromTo(labRow, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, T.sentence + 0.25);
  tl.to(strike, { scaleX: 1, duration: 0.26, ease: 'power2.out' }, T.onb - 0.15);
  tl.to([sk1, sk2], { opacity: 0, duration: 0.2 }, T.onb - 0.05);

  tl.to(cam, { x: 0, duration: Math.max(1.5, T.five + 0.4 - T.onb), ease: 'power2.inOut' }, T.onb - 0.1);

  tl.to(hls[0], { scaleX: 1, duration: 0.28, ease: 'power2.out' }, T.days + 0.18);
  tl.to(hls[1], { scaleX: 1, duration: 0.22, ease: 'power2.out' }, T.five + 0.15);

  tl.to(labRow, { opacity: 0.4, duration: 0.3 }, T.beats);
  tl.fromTo(headTag, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.25, ease: 'back.out(1.8)', immediateRender: false }, T.beats);
  tl.to(rlab, { opacity: 0.5, duration: 0.3 }, T.beats);
  tl.to(strike, { scaleY: 1.4, duration: 0.15, yoyo: true, repeat: 1 }, T.time);
});

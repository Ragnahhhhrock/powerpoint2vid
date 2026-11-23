/* Scene 2 — "Start from the approved policy, then strip out the background and history.
 *            Staff mainly need the rule, why it matters, and what to do."
 * Storyboard: wide paper stage. A tall stack of dense policy pages sits on the left under the tag
 * "APPROVED POLICY". On "background" and "history" the two labelled top pages turn slate and slide
 * off-frame. On "rule", "matters" and "do", three teal cards snap into a clean row: The rule / Why /
 * What to do. A smaller "Who to contact" card tucks in beneath. The camera eases in on the row and holds.
 */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const w = (i, word, fb) => { const v = ctx.at(i, word); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const tStrip = w(0, 'strip', 2.3);
  const tBg = w(0, 'background', 3.2);
  const tHist = w(0, 'history', 4.1);
  const tRule = w(1, 'rule', 6.0);
  const tWhy = w(1, 'matters', 6.9);
  const tDo = Math.min(w(1, 'do', 8.1), 8.2);
  const tWho = Math.min(tDo + 0.45, 8.4);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 55% 45%, #fffdf8 0%, var(--paper) 60%, #e9e4d8 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1236px 560px' });
  const drift = el('div', 'abs', cam, { inset: 0 });

  el('div', 'abs', drift, { left: '60px', top: '800px', width: '1800px', height: '160px', background: 'radial-gradient(50% 50% at 50% 50%, rgba(27,36,51,.08), transparent 70%)' });

  /* ---- policy stack ---- */
  const SX = 150, SY = 250, PW = 440, PH = 580;
  const stackTag = el('div', 'abs', drift, { left: SX + 'px', top: SY - 70 + 'px', font: `600 22px/1 ${MONO}`, letterSpacing: '.14em', color: '#8A97A8' });
  stackTag.textContent = 'APPROVED POLICY';
  const wrap = el('div', 'abs', drift, { inset: 0 });

  const mkPage = (i, label) => {
    const off = i * 12;
    const p = el('div', 'abs', wrap, {
      left: SX + off + 'px', top: SY + off + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '10px',
      background: '#ffffff', border: '1px solid rgba(27,36,51,.10)',
      boxShadow: '0 30px 60px rgba(27,36,51,.12), 0 2px 6px rgba(27,36,51,.06)'
    });
    el('div', 'abs', p, { left: '40px', top: '48px', width: label ? '38%' : '62%', height: '18px', borderRadius: '4px', background: '#1B2433', opacity: .8 });
    el('div', 'abs', p, { left: '40px', top: '104px', right: '40px', bottom: '48px',
      background: 'repeating-linear-gradient(180deg, #d5dae1 0 9px, transparent 9px 24px)', opacity: .9 });
    let tag = null;
    if (label) {
      tag = el('div', 'abs', p, { right: '28px', top: '40px', padding: '10px 14px', borderRadius: '6px', background: '#F2A93B',
        font: `700 18px/1 ${MONO}`, letterSpacing: '.12em', color: '#1B2433' });
      tag.textContent = label;
    }
    return { p, tag };
  };
  const back = [5, 4, 3, 2].map((i) => mkPage(i).p);
  const hist = mkPage(1, 'HISTORY');
  const bg = mkPage(0, 'BACKGROUND');

  /* ---- clean cards ---- */
  const CX = 700, CY = 300, CW = 340, CH = 310, GAP = 26;
  const CARDS = [['01', 'The rule'], ['02', 'Why'], ['03', 'What to do']];
  const cards = CARDS.map(([n, label], i) => {
    const c = el('div', 'abs', drift, {
      left: CX + i * (CW + GAP) + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '22px',
      background: 'linear-gradient(160deg, #1fbfa3 0%, #14A38B 55%, #0f8673 100%)',
      boxShadow: '0 30px 70px rgba(20,163,139,.30), inset 0 1px 0 rgba(255,255,255,.35)', transformOrigin: '50% 80%'
    });
    const num = el('div', 'abs', c, { left: '32px', top: '32px', font: `700 22px/1 ${MONO}`, letterSpacing: '.14em', color: 'rgba(255,255,255,.75)' });
    num.textContent = n;
    el('div', 'abs', c, { left: '32px', top: '76px', width: '56px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.6)' });
    const t = el('div', 'abs', c, { left: '32px', right: '28px', bottom: '36px', font: '800 46px/1.02 Inter Display, Inter', letterSpacing: '-.035em', color: '#fff' });
    t.textContent = label;
    return c;
  });
  const who = el('div', 'abs', drift, {
    left: CX + (CW + GAP) - 40 + 'px', top: CY + CH + 34 + 'px', width: CW + 80 + 'px', height: '104px', borderRadius: '18px',
    background: '#fff', border: '3px solid #14A38B', boxShadow: '0 20px 40px rgba(27,36,51,.10)', transformOrigin: '50% 0%'
  });
  const whoDot = el('div', 'abs', who, { left: '30px', top: '36px', width: '26px', height: '26px', borderRadius: '50%', background: '#14A38B' });
  const whoT = el('div', 'abs', who, { left: '76px', top: '32px', font: '800 36px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#1B2433' });
  whoT.textContent = 'Who to contact';
  const glow = el('div', 'abs', drift, { left: CX - 80 + 'px', top: CY - 80 + 'px', width: 3 * CW + 2 * GAP + 160 + 'px', height: CH + 160 + 'px',
    background: 'radial-gradient(50% 50% at 50% 50%, rgba(20,163,139,.22), transparent 70%)', opacity: 0 });
  drift.insertBefore(glow, cards[0]);

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  tl.to(drift, { x: -18, y: -6, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(wrap, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0);
  tl.from([...back, hist.p, bg.p], { y: 40, duration: 0.7, stagger: 0.04, ease: 'power3.out' }, 0);
  tl.from(stackTag, { opacity: 0, x: -20, duration: 0.6 }, 0.25);

  tl.fromTo([bg.tag, hist.tag], { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tStrip);

  gsap.set([bg.p, hist.p], { filter: 'grayscale(0) brightness(1)' });
  const strip = (pg, t) => {
    tl.to(pg.p, { filter: 'grayscale(1) brightness(.92)', duration: 0.3, ease: 'power1.out' }, t - 0.2);
    tl.to(pg.tag, { backgroundColor: '#8A97A8', color: '#fff', duration: 0.3 }, t - 0.2);
    tl.to(pg.p, { x: -760, y: -60, rotation: -9, opacity: 0, duration: 0.9, ease: 'power3.in' }, t);
  };
  strip(bg, tBg);
  strip(hist, tHist);
  tl.to(back, { x: (i) => -(3 - i) * 4, y: (i) => -(3 - i) * 6, duration: 0.6, ease: 'power2.out' }, tHist + 0.6);
  tl.to(wrap, { opacity: 0.55, duration: 0.8 }, tRule - 0.6);
  tl.to(stackTag, { opacity: 0, duration: 0.6 }, tRule - 0.2);

  [tRule, tWhy, tDo].forEach((t, i) => {
    tl.fromTo(cards[i], { opacity: 0, scale: 0.6, y: 50, rotation: i % 2 ? 3 : -3 },
      { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.55, ease: 'back.out(1.9)' }, t - 0.12);
  });
  tl.to(glow, { opacity: 1, duration: 1.2, ease: 'power2.out' }, tRule);
  tl.fromTo(who, { opacity: 0, y: -40, scaleY: 0.7 }, { opacity: 1, y: 0, scaleY: 1, duration: 0.5, ease: 'back.out(1.6)' }, tWho - 0.1);
  tl.from(whoDot, { scale: 0, duration: 0.4, ease: 'back.out(2)' }, tWho + 0.1);

  tl.to(cam, { scale: 1.08, duration: 1.4, ease: 'expo.inOut' }, tRule + 0.3);
  tl.to(cam, { scale: 1.1, duration: Math.max(0.5, ctx.dur - (tRule + 1.7)), ease: 'power1.out' }, tRule + 1.7);
});

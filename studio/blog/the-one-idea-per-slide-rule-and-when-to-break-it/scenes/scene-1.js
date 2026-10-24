/* Scene 1 — "Here's a typical crowded slide. A vague headline, and four separate ideas fighting for
 *            attention. Split it, and each point gets its own headline."
 * Storyboard: a cramped "Q3 update" slide with four bullet rows. The rows lift off and morph into four
 * clean cards, each with its own single-sentence headline. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const ideasT = ctx.at(1, 'four separate'), splitT = ctx.at(2, 'Split'), ownT = ctx.at(2, 'own headline');
  stage.style.background = 'radial-gradient(90% 80% at 30% 30%, #1b1850 0%, #0a0d24 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  el('div', 'abs', cam, { right: '-300px', top: '-300px', width: '1000px', height: '1000px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,74,255,.5), rgba(109,74,255,0) 65%)' });

  const eyebrow = el('div', 'abs', stage, { left: '120px', top: '96px', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: '#aab0d4' });
  eyebrow.textContent = 'BEFORE → AFTER';

  /* the crowded slide */
  const CW = 1160, CH = 650, CX = 380, CY = 215;
  const card = el('div', 'abs', cam, { left: CX + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '26px', background: '#fff', boxShadow: '0 50px 120px rgba(0,0,0,.55)' });
  const t = el('div', 'abs', card, { left: '60px', top: '38px', font: '800 58px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#0e1330' });
  t.textContent = 'Q3 update';
  const rules = el('div', 'abs', card, { left: '60px', top: '120px', width: CW - 120 + 'px', height: '4px', borderRadius: '2px', background: '#e3e0f7' });

  const ROWS = [
    ['Revenue up on last quarter', 'Revenue grew again in Q3', '#6d4aff'],
    ['Two new enterprise customers signed', 'Two enterprise customers signed', '#8f75ff'],
    ['Churn rose in the small-business segment', 'Small-business churn is rising', '#ff6b4a'],
    ['Hiring two more account managers', 'Hiring two account managers', '#5eead4'],
  ];
  const rowEls = ROWS.map(([bullet, head, col], i) => {
    const r = el('div', 'abs', cam, { left: CX + 60 + 'px', top: CY + 150 + i * 118 + 'px', width: CW - 120 + 'px', height: '92px', borderRadius: '16px', background: 'rgba(109,74,255,0)', overflow: 'hidden' });
    const dot = el('div', 'abs', r, { left: '18px', top: '34px', width: '24px', height: '24px', borderRadius: '50%', background: col });
    const b = el('div', 'abs', r, { left: '70px', top: '0', height: '92px', font: '600 40px/92px Inter', color: '#2a2f55', whiteSpace: 'nowrap' }); b.textContent = bullet;
    const h = el('div', 'abs', r, { left: '28px', top: '0', right: '28px', bottom: '0', display: 'flex', alignItems: 'center', font: '800 34px/1.1 Inter Display, Inter', letterSpacing: '-.02em', color: '#0e1330', opacity: 0 }); h.textContent = head;
    return { r, dot, b, h, col };
  });
  const num = (i) => { const n = el('div', 'abs', cam, { left: CX + CW - 130 + 'px', top: CY + 168 + i * 118 + 'px', width: '56px', height: '56px', borderRadius: '50%', background: '#ff6b4a', color: '#fff', font: '800 30px/56px Inter', textAlign: 'center', boxShadow: '0 0 30px rgba(255,107,74,.7)' }); n.textContent = String(i + 1); return n; };
  const nums = ROWS.map((_, i) => num(i));
  const label = el('div', 'abs', stage, { left: 0, right: 0, top: '930px', textAlign: 'center', font: '800 56px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff', opacity: 0 });
  label.innerHTML = 'Four ideas. <span style="color:#ff8f72">One slide.</span>';
  const label2 = el('div', 'abs', stage, { left: 0, right: 0, top: '930px', textAlign: 'center', font: '800 56px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#fff', opacity: 0 });
  label2.innerHTML = 'Four ideas. <span style="color:#5eead4">Four slides.</span>';

  ctx.fx.vignette({ strength: 0.55 }); ctx.fx.grain({ opacity: 0.06 });

  /* timeline */
  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(card, { y: 80, scale: 0.92, opacity: 0, duration: 0.8, ease: 'back.out(1.4)' }, 0.1);
  tl.from([t, rules], { opacity: 0, x: -24, duration: 0.5, stagger: 0.1 }, 0.4);
  rowEls.forEach((o, i) => tl.from(o.r, { opacity: 0, x: -40, duration: 0.45 }, 0.55 + i * 0.12));
  tl.fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.5, immediateRender: false }, 0.5);
  tl.to(label, { opacity: 1, duration: 0.5 }, ideasT);
  // four ideas fighting: rows pulse and numbers pop
  nums.forEach((n, i) => tl.fromTo(n, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.4)', immediateRender: false }, ideasT + i * 0.28));
  rowEls.forEach((o, i) => tl.to(o.r, { background: 'rgba(109,74,255,.14)', duration: 0.2, yoyo: true, repeat: 1 }, ideasT + i * 0.28));

  // split: rows morph into four cards
  const GW = 400, GH = 250, GAP = 40, GX = (1920 - (4 * GW + 3 * GAP)) / 2, GY = 400;
  tl.to(nums, { scale: 0, opacity: 0, duration: 0.3, stagger: 0.03 }, splitT - 0.2);
  tl.to([card, t, rules], { opacity: 0, scale: 0.96, duration: 0.5 }, splitT);
  tl.to(label, { opacity: 0, duration: 0.3 }, splitT - 0.1);
  rowEls.forEach((o, i) => {
    const s = splitT + i * 0.1;
    tl.to(o.r, { left: GX + i * (GW + GAP), top: GY, width: GW, height: GH, borderRadius: 24, background: '#ffffff', boxShadow: '0 40px 90px rgba(0,0,0,.5)', duration: 0.8, ease: 'expo.inOut' }, s);
    tl.to(o.dot, { left: 28, top: 28, width: 18, height: 18, duration: 0.6 }, s);
    tl.to(o.b, { opacity: 0, duration: 0.25 }, s);
    tl.to(o.h, { opacity: 1, duration: 0.5, ease: 'power2.out' }, splitT + 0.55 + i * 0.22);
  });
  tl.to(label2, { opacity: 1, duration: 0.5 }, splitT + 0.9);
  tl.to(rowEls.map((o) => o.r), { y: -8, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: 0.15 }, ownT + 1.2);
  tl.fromTo(eyebrow, { opacity: 1 }, { opacity: 0.6, duration: 0.3 }, splitT);
});

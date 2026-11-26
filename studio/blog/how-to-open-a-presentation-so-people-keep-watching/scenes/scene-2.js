/* Scene 2 — "Name a problem they already feel, give away the result first, or ask a specific question.
 *            A short real story or a true detail works too."
 * Storyboard: light paper stage on a faint grid. Title "Openings that hook" sits on top over four empty
 * card slots. Each hook card drops in on the word that names it: Problem (coral warning), Result (teal check
 * that draws itself), Question (giant amber ?), Story / true detail (quote glyph). Each card pulses as named
 * while the camera slides left to right; the scene settles on all four together. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const tProblem = W(0, 'problem', 1.3), tResult = W(0, 'result', 2.9), tQuestion = W(0, 'question', 5.0);
  const tStory = W(1, 'story', 6.8), tDetail = W(1, 'detail', 8.5);

  stage.style.background = 'radial-gradient(70% 60% at 50% 40%, #fffdf8 0%, var(--paper) 60%, #e9e4d8 100%)';
  // faint grid
  const gridBg = el('div', 'abs', stage, { inset: 0, opacity: 0.55,
    backgroundImage: 'linear-gradient(rgba(26,31,46,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,31,46,.06) 1px, transparent 1px)',
    backgroundSize: '80px 80px' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });

  /* title */
  const kicker = el('div', 'abs', cam, { left: 0, width: '1920px', top: '96px', textAlign: 'center', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--mist)' });
  kicker.textContent = 'FOUR WAYS IN';
  const title = el('div', 'abs', cam, { left: 0, width: '1920px', top: '136px', textAlign: 'center', font: '800 88px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  title.textContent = 'Openings that hook';
  const uline = el('div', 'abs', cam, { left: '810px', width: '300px', top: '244px', height: '6px', borderRadius: '3px', background: 'var(--signal)', transformOrigin: '0% 50%' });

  /* cards */
  const CW = 380, GAP = 40, X0 = 140, TOP = 320, CH = 580;
  const defs = [
    { word: 'Problem', sub: 'THEY ALREADY FEEL', color: '#FF5A3C', t: tProblem,
      icon: `<svg width="220" height="200" viewBox="0 0 220 200"><path d="M110 18 L202 180 L18 180 Z" fill="#FF5A3C" stroke="#FF5A3C" stroke-width="18" stroke-linejoin="round"/><rect x="100" y="70" width="20" height="62" rx="10" fill="#fff"/><circle cx="110" cy="154" r="12" fill="#fff"/></svg>` },
    { word: 'Result', sub: 'GIVE IT AWAY FIRST', color: '#2EC4B6', t: tResult,
      icon: `<svg width="220" height="200" viewBox="0 0 220 200"><circle cx="110" cy="100" r="88" fill="#2EC4B6"/><path class="chk" d="M66 104 L98 136 L156 72" fill="none" stroke="#fff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>` },
    { word: 'Question', sub: 'A SPECIFIC ONE', color: '#FFB547', t: tQuestion,
      icon: `<div style="font:900 230px/200px Inter Display, Inter;color:#FFB547;text-align:center;width:220px;height:200px;letter-spacing:-.05em">?</div>` },
    { word: 'Story', sub: 'OR A TRUE DETAIL', color: '#1A1F2E', t: tStory,
      icon: `<svg width="220" height="200" viewBox="0 0 220 200"><path d="M40 150 Q40 70 96 46 L104 62 Q74 80 74 108 L98 108 L98 150 Z M122 150 Q122 70 178 46 L186 62 Q156 80 156 108 L180 108 L180 150 Z" fill="#1A1F2E"/></svg>` },
  ];

  const cards = defs.map((d, i) => {
    const x = X0 + i * (CW + GAP);
    const slot = el('div', 'abs', cam, { left: x + 'px', top: TOP + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '28px', border: '3px dashed rgba(26,31,46,.14)' });
    const card = el('div', 'abs', cam, { left: x + 'px', top: TOP + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '28px', background: '#fff', overflow: 'hidden',
      boxShadow: '0 30px 70px rgba(26,31,46,.14), 0 4px 12px rgba(26,31,46,.06)', transformOrigin: '50% 60%' });
    el('div', 'abs', card, { left: 0, top: 0, width: '100%', height: '10px', background: d.color });
    const num = el('div', 'abs', card, { left: '36px', top: '44px', font: '600 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--mist)' });
    num.textContent = '0' + (i + 1);
    const glow = el('div', 'abs', card, { left: '40px', top: '80px', width: '300px', height: '260px', borderRadius: '50%', background: `radial-gradient(closest-side, ${d.color}33, transparent)`, opacity: 0.8 });
    const icon = el('div', 'abs', card, { left: '80px', top: '110px', width: '220px', height: '200px', transformOrigin: '50% 60%' });
    icon.innerHTML = d.icon;
    const word = el('div', 'abs', card, { left: '36px', width: CW - 72 + 'px', top: '380px', font: '800 66px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
    word.textContent = d.word;
    const sub = el('div', 'abs', card, { left: '36px', width: CW - 72 + 'px', top: '474px', font: '600 19px/1.3 ui-monospace, Menlo, monospace', letterSpacing: '.12em', color: 'var(--mist)' });
    sub.textContent = d.sub;
    const ring = el('div', 'abs', cam, { left: x - 6 + 'px', top: TOP - 6 + 'px', width: CW + 12 + 'px', height: CH + 12 + 'px', borderRadius: '32px', border: `5px solid ${d.color}`, opacity: 0 });
    return { ...d, slot, card, icon, word, sub, ring, glow, x };
  });

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  tl.fromTo(gridBg, { opacity: 0 }, { opacity: 0.55, duration: 0.4 }, 0);
  tl.fromTo(kicker, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, 0.05);
  tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.6)' }, 0.08);
  tl.fromTo(uline, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'expo.out' }, 0.35);
  tl.fromTo(cards.map((c) => c.slot), { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06 }, 0.15);

  // camera slide left → right while cards are named
  tl.fromTo(cam, { x: 22, scale: 1.04 }, { x: -22, scale: 1.04, duration: tDetail + 0.3, ease: 'sine.inOut' }, 0);

  cards.forEach((c, i) => {
    const t = c.t;
    tl.fromTo(c.card, { y: -220, opacity: 0, rotation: i % 2 ? 4 : -4 }, { y: 0, opacity: 1, rotation: 0, duration: 0.55, ease: 'back.out(1.8)' }, t - 0.3);
    tl.to(c.slot, { opacity: 0, duration: 0.2 }, t);
    tl.fromTo(c.icon, { scale: 0.3, rotation: -12 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, t - 0.12);
    // pulse as named
    tl.to(c.card, { scale: 1.06, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' }, t + 0.18);
    tl.fromTo(c.ring, { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.08, duration: 0.7, ease: 'power2.out', immediateRender: false }, t + 0.18);
    tl.fromTo(c.word, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 }, t - 0.05);
    tl.fromTo(c.sub, { opacity: 0 }, { opacity: 1, duration: 0.4 }, t + 0.1);
  });
  // teal check draws itself
  const chk = cards[1].icon.querySelector('.chk');
  tl.to(chk, { attr: { 'stroke-dashoffset': 0 }, duration: 0.45, ease: 'power2.out' }, tResult + 0.05);
  // question mark wobble
  tl.to(cards[2].icon, { rotation: 8, duration: 0.14, yoyo: true, repeat: 3, ease: 'sine.inOut' }, tQuestion + 0.4);

  // "true detail": the story card's sub-label lights up
  tl.to(cards[3].sub, { color: '#FF5A3C', duration: 0.2 }, tDetail - 0.05);
  tl.to(cards[3].card, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, tDetail);

  // final hold: everything together
  const hold = tDetail + 0.35;
  tl.to(cam, { x: 0, scale: 1, duration: 0.9, ease: 'expo.inOut' }, hold);
  tl.to(cards.map((c) => c.card), { y: -10, duration: 0.18, yoyo: true, repeat: 1, stagger: 0.05, ease: 'power2.out' }, hold + 0.5);
  tl.to(uline, { width: '300px', background: 'var(--signal)', duration: 0.1 }, hold);
  tl.to(cam, { scale: 1.015, duration: Math.max(0.4, ctx.dur - (hold + 0.9)), ease: 'power1.inOut' }, hold + 0.9);
});

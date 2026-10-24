/* Scene 0 — "If a slide needs two headlines, it's two slides. Here's why one idea per slide is the most
 *            useful rule in presentation design."
 * Storyboard: a slide card with two headlines splits into two cards on "two slides"; each headline settles
 * alone in its own card, then the cards recede and the title "One idea per slide" typesets large. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const splitT = ctx.at(0, 'two slides'), titleT = ctx.at(1, 'one idea');
  stage.style.background = 'radial-gradient(90% 80% at 50% 40%, #1d1a52 0%, #0a0d24 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* soft light blobs */
  const b1 = el('div', 'abs', cam, { left: '-200px', top: '-260px', width: '900px', height: '900px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,74,255,.55), rgba(109,74,255,0) 65%)' });
  const b2 = el('div', 'abs', cam, { right: '-260px', bottom: '-300px', width: '1000px', height: '1000px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,74,.38), rgba(255,107,74,0) 65%)' });

  const W = 820, H = 461, CX = 960 - W / 2, CY = 540 - H / 2;
  const mk = (css) => el('div', 'abs', cam, Object.assign({ left: CX + 'px', top: CY + 'px', width: W + 'px', height: H + 'px', borderRadius: '28px', background: '#fff', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.4)' }, css));
  const cardB = mk({ opacity: 0 });
  const cardA = mk({});
  const bars = [];
  const bar = (p, top, w, c) => { const b = el('div', 'abs', p, { left: '60px', top: top + 'px', width: w + 'px', height: '14px', borderRadius: '7px', background: c }); bars.push(b); return b; };
  const hl = (p, text, top, col) => { const h = el('div', 'abs', p, { left: '60px', top: top + 'px', width: W - 120 + 'px', font: '800 62px/1.05 Inter Display, Inter', letterSpacing: '-.03em', color: col, whiteSpace: 'nowrap' }); h.textContent = text; return h; };

  const hA = hl(cardA, 'Our new pricing', 70, '#0e1330');
  bar(cardA, 175, 520, '#e3e0f7'); bar(cardA, 205, 380, '#e3e0f7');
  const hA2 = hl(cardA, 'Hiring plan for Q4', 250, '#ff6b4a');
  const hB2 = hl(cardB, 'Hiring plan for Q4', 250, '#ff6b4a');
  bar(cardA, 350, 560, '#efecfb'); bar(cardB, 350, 560, '#efecfb');

  const hair = el('div', 'abs', cam, { left: '959px', top: CY - 40 + 'px', width: '4px', height: H + 80 + 'px', borderRadius: '2px', background: 'linear-gradient(180deg, transparent, #ff6b4a, transparent)', boxShadow: '0 0 30px #ff6b4a', opacity: 0, transformOrigin: '50% 0' });

  const title = el('div', 'abs', stage, { left: 0, right: 0, top: '420px', textAlign: 'center', font: '900 190px/1 Inter Display, Inter', letterSpacing: '-.05em', color: '#fff', whiteSpace: 'nowrap' });
  const words = ctx.split(title, 'One idea per slide.', 'word');
  words[3].style.background = 'linear-gradient(100deg,#ff9a7a,#ff6b4a,#8f75ff)'; words[3].style.webkitBackgroundClip = 'text'; words[3].style.color = 'transparent';
  const tag = el('div', 'abs', stage, { left: 0, right: 0, top: '270px', textAlign: 'center', font: '600 28px/1 ui-monospace, Menlo, monospace', letterSpacing: '.28em', color: '#aab0d4' });
  tag.textContent = 'A PRESENTATION DESIGN RULE';

  ctx.fx.vignette({ strength: 0.55 }); ctx.fx.grain({ opacity: 0.06 });

  /* timeline */
  tl.to(cam, { scale: 1.06, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.to(b1, { x: 120, y: 60, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.fromTo(cardA, { y: 120, scale: 0.86, opacity: 0, rotate: -3 }, { y: 0, scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.5)', immediateRender: true }, 0.05);
  tl.from([hA, hA2], { opacity: 0, x: -30, duration: 0.55, stagger: 0.18 }, 0.45);
  tl.from(bars, { scaleX: 0, transformOrigin: '0 50%', duration: 0.5, stagger: 0.04 }, 0.7);
  // gentle shake hint of "too much"
  tl.to(cardA, { x: 6, duration: 0.08, yoyo: true, repeat: 5, ease: 'sine.inOut' }, splitT - 0.9);

  // split
  tl.fromTo(hair, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.25, ease: 'power2.out', immediateRender: false }, splitT - 0.2);
  tl.set(cardB, { opacity: 1 }, splitT + 0.05);
  tl.set(hA2, { opacity: 0 }, splitT + 0.05);
  tl.to(hair, { opacity: 0, duration: 0.35 }, splitT + 0.1);
  tl.to(cardA, { x: -520, y: -70, rotate: -5, scale: 0.78, duration: 0.8, ease: 'back.out(1.6)' }, splitT + 0.05);
  tl.to(cardB, { x: 520, y: 70, rotate: 5, scale: 0.78, duration: 0.8, ease: 'back.out(1.6)' }, splitT + 0.05);
  tl.to(hA, { y: 110, duration: 0.6, ease: 'power3.inOut' }, splitT + 0.5);
  tl.to(hB2, { y: -110, duration: 0.6, ease: 'power3.inOut' }, splitT + 0.5);
  tl.to(bars, { opacity: 0, duration: 0.4 }, splitT + 0.4);

  // title
  tl.to([cardA, cardB], { opacity: 0.22, filter: 'blur(6px)', duration: 0.8 }, titleT - 0.3);
  gsap.set(words, { filter: 'blur(0px)' });
  tl.from(tag, { opacity: 0, y: 14, duration: 0.5 }, titleT - 0.2);
  tl.from(words, { opacity: 0, y: 60, scale: 0.9, filter: 'blur(14px)', duration: 0.7, stagger: 0.16, ease: 'back.out(1.6)' }, titleT - 0.1);
  tl.to(title, { scale: 1.04, duration: ctx.dur - titleT, ease: 'sine.inOut', transformOrigin: '50% 50%' }, titleT);
});

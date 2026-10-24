/* Scene 4 — "Builds let a fuller slide show several items without overwhelming anyone. Each point arrives
 *            as you talk about it."
 * Storyboard: one fuller slide; tiles build one at a time, the newest glowing with a violet ring while the
 * others dim, and a timeline dot tracks along the bottom. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = [ctx.at(0, 'fuller'), ctx.at(0, 'show'), ctx.at(0, 'items'), ctx.at(0, 'overwhelming')];
  const F = [ctx.at(1, 'Each'), ctx.at(1, 'point'), ctx.at(1, 'arrives'), ctx.at(1, 'talk')];
  stage.style.background = 'radial-gradient(90% 80% at 50% 45%, #1c1952 0%, #0a0d24 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });
  el('div', 'abs', cam, { left: '300px', top: '-200px', width: '1000px', height: '1000px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,74,255,.4), rgba(109,74,255,0) 65%)' });

  const eyebrow = el('div', 'abs', stage, { left: '120px', top: '84px', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.24em', color: '#aab0d4' });
  eyebrow.textContent = 'BUILDS · ONE POINT AT A TIME';

  const CW = 1360, CH = 640, CX = 280, CY = 150;
  const card = el('div', 'abs', cam, { left: CX + 'px', top: CY + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '28px', background: '#fff', boxShadow: '0 50px 120px rgba(0,0,0,.55)' });
  const ttl = el('div', 'abs', card, { left: '56px', top: '36px', font: '800 52px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#0e1330' });
  ttl.textContent = 'Q3 at a glance';

  const TW = 590, TH = 200, tiles = [];
  const pos = [[56, 130], [56 + TW + 68, 130], [56, 130 + TH + 28], [56 + TW + 68, 130 + TH + 28]];
  const mk = (i) => el('div', 'abs', card, { left: pos[i][0] + 'px', top: pos[i][1] + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '22px', background: '#f3f0ff', border: '3px solid rgba(109,74,255,0)', overflow: 'hidden' });
  const lab = (p, text) => { const l = el('div', 'abs', p, { left: '28px', top: '22px', font: '700 24px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: '#6d4aff' }); l.textContent = text; return l; };
  // 1 revenue bars
  const t1 = mk(0); lab(t1, 'REVENUE'); const bars = [60, 90, 120, 150].map((h, k) => el('div', 'abs', t1, { left: 40 + k * 84 + 'px', bottom: '0', width: '60px', height: h + 'px', borderRadius: '10px 10px 0 0', background: k === 3 ? '#6d4aff' : '#c9c0f7', transformOrigin: '50% 100%' }));
  // 2 big number
  const t2 = mk(1); lab(t2, 'NEW ENTERPRISE'); const big = el('div', 'abs', t2, { left: '28px', top: '58px', font: '900 120px/1 Inter Display, Inter', letterSpacing: '-.05em', color: '#0e1330' }); big.textContent = '+2';
  // 3 churn line
  const t3 = mk(2); lab(t3, 'CHURN'); const sv = el('div', 'abs', t3, { inset: 0 }); sv.innerHTML = '<svg width="590" height="200" viewBox="0 0 590 200" fill="none"><path id="p3" d="M40 150 C140 140 200 130 280 110 S430 70 550 50" stroke="#ff6b4a" stroke-width="10" stroke-linecap="round"/><circle cx="550" cy="50" r="12" fill="#ff6b4a"/></svg>';
  // 4 hiring avatars
  const t4 = mk(3); lab(t4, 'HIRING'); const av = [0, 1].map((k) => el('div', 'abs', t4, { left: 40 + k * 120 + 'px', top: '70px', width: '96px', height: '96px', borderRadius: '50%', background: k ? 'linear-gradient(135deg,#ff9a7a,#ff6b4a)' : 'linear-gradient(135deg,#8f75ff,#6d4aff)', boxShadow: '0 12px 30px rgba(60,40,160,.25)' }));
  tiles.push(t1, t2, t3, t4);

  const track = el('div', 'abs', stage, { left: '280px', top: '900px', width: '1360px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.14)' });
  const fill = el('div', 'abs', track, { left: 0, top: 0, width: '100%', height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg,#8f75ff,#ff6b4a)', transformOrigin: '0 50%' });
  const knob = el('div', 'abs', track, { left: '-14px', top: '-10px', width: '28px', height: '28px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 24px #8f75ff' });
  const cap = el('div', 'abs', stage, { left: 0, right: 0, top: '940px', textAlign: 'center', font: '600 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.2em', color: '#aab0d4' });
  cap.textContent = 'EACH POINT ARRIVES WHEN YOU SAY IT';

  ctx.fx.vignette({ strength: 0.55 }); ctx.fx.grain({ opacity: 0.06 });

  const ring = (i, on) => ({ borderColor: on ? '#6d4aff' : 'rgba(109,74,255,0)', boxShadow: on ? '0 0 0 8px rgba(109,74,255,.18), 0 20px 60px rgba(109,74,255,.45)' : '0 0 0 0 rgba(0,0,0,0)', background: on ? '#fff' : '#f3f0ff' });

  /* timeline */
  tl.to(cam, { scale: 1.04, duration: ctx.dur, ease: 'sine.inOut' }, 0);
  tl.from(card, { y: 90, scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.4)' }, 0.1);
  tl.from([eyebrow, ttl], { opacity: 0, y: 14, duration: 0.5, stagger: 0.1 }, 0.5);
  tl.from([track, knob], { opacity: 0, duration: 0.5 }, 0.8);
  tiles.forEach((t, i) => {
    tl.from(t, { opacity: 0, y: 40, scale: 0.9, duration: 0.55, ease: 'back.out(1.6)' }, T[i] - 0.2);
    tl.to(t, ring(i, true), T[i] - 0.2);
  });
  tl.from(bars, { scaleY: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)' }, T[0]);
  tl.from(big, { scale: 0.4, opacity: 0, duration: 0.6, ease: 'back.out(2)', transformOrigin: '0 50%' }, T[1]);
  tl.fromTo(sv.querySelector('path'), { strokeDasharray: 600, strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', immediateRender: false }, T[2]);
  tl.from(av, { scale: 0, duration: 0.5, stagger: 0.14, ease: 'back.out(2.2)' }, T[3]);
  // newest tile keeps the ring; earlier ones calm down
  [1, 2, 3].forEach((i) => tl.to(tiles[i - 1], ring(i - 1, false), T[i] - 0.1));
  tl.to(tiles[3], ring(3, false), F[0] - 0.2);

  // focus sweep tracks the progress dot while narrator says each point arrives
  tl.fromTo(knob, { x: 0 }, { x: 1360, duration: F[3] + 1.2 - F[0], ease: 'none', immediateRender: false }, F[0]);
  tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: F[3] + 1.2 - F[0], ease: 'none', immediateRender: false }, F[0]);
  tiles.forEach((t, i) => { tl.to(t, ring(i, true), F[i]); if (i) tl.to(tiles[i - 1], ring(i - 1, false), F[i]); });
  tl.from(cap, { opacity: 0, y: 14, duration: 0.5 }, F[0]);
});

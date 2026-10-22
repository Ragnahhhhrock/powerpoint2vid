/* Scene 1 — "Tickets pile up overnight, and customers wait hours for a first reply. Meanwhile, your team
 *            answers the same five questions again and again."
 * Storyboard: a ticket queue counter climbs as a clock spins through the night; a "waiting" timer ticks up
 * in coral on "hours". On "same five questions" the queue subjects collapse into five repeating questions,
 * each with a count, and an AGAIN stamp slams down. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const pile = ctx.at(0, 'pile'), overnight = ctx.at(0, 'overnight'), hours = ctx.at(0, 'hours'), same = ctx.at(1, 'same'), again1 = ctx.at(1, 'again'), again2 = ctx.at(1, 'again.') ;
  const again2t = ctx.beats[1].end - 0.45;

  stage.style.background = 'radial-gradient(80% 80% at 30% 40%, #18262a 0%, #0b1311 75%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '700px 540px' });

  /* left: clock + counters */
  const clock = el('div', 'abs', cam, { left: '160px', top: '220px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #233a3a, #0f1c1b)', border: '6px solid rgba(255,255,255,.14)', boxShadow: '0 40px 80px rgba(0,0,0,.5), inset 0 0 40px rgba(0,0,0,.6)' });
  for (let i = 0; i < 12; i++) el('div', 'abs', clock, { left: '174px', top: '14px', width: '6px', height: i % 3 ? '18px' : '32px', borderRadius: '3px', background: 'rgba(255,255,255,.5)', transformOrigin: '3px 166px', transform: `rotate(${i * 30}deg)` });
  const hh = el('div', 'abs', clock, { left: '171px', top: '84px', width: '12px', height: '100px', borderRadius: '6px', background: '#fff', transformOrigin: '6px 96px', rotate: '330deg' });
  const mh = el('div', 'abs', clock, { left: '174px', top: '40px', width: '6px', height: '144px', borderRadius: '3px', background: '#5eead4', transformOrigin: '3px 140px' });
  el('div', 'abs', clock, { left: '163px', top: '163px', width: '28px', height: '28px', borderRadius: '50%', background: '#5eead4' });
  const clockLab = el('div', 'abs', cam, { left: '160px', top: '600px', width: '360px', textAlign: 'center', font: '700 34px/1 Inter', color: '#fff', fontVariantNumeric: 'tabular-nums' });

  const qLab = el('div', 'abs', cam, { left: '160px', top: '690px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'rgba(255,255,255,.5)' }); qLab.textContent = 'OPEN TICKETS';
  const qNum = el('div', 'abs', cam, { left: '152px', top: '722px', font: '900 120px/1 Inter Display, Inter', letterSpacing: '-.05em', color: '#fff', fontVariantNumeric: 'tabular-nums' });
  const wait = el('div', 'abs', cam, { left: '160px', top: '870px', padding: '16px 26px', borderRadius: '999px', background: 'rgba(255,107,74,.16)', border: '2px solid #ff6b4a', font: '800 32px/1 Inter', color: '#ffb3a1', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' });

  /* right: queue */
  const Q = el('div', 'abs', cam, { left: '760px', top: '150px', width: '1020px', height: '800px', borderRadius: '28px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', overflow: 'hidden' });
  const qh = el('div', 'abs', Q, { left: '36px', top: '30px', font: '800 34px/1 Inter', color: '#fff' }); qh.textContent = 'Queue';
  const FIVE = ['How do I reset my password?', 'Where is my order?', 'Can I change my address?', 'How do I get a refund?', 'Do you ship overseas?'];
  const COUNTS = [41, 38, 27, 22, 17];
  const rows = Array.from({ length: 10 }, (_, i) => {
    const r = el('div', 'abs', Q, { left: '24px', right: '24px', top: 92 + i * 68 + 'px', height: '58px', borderRadius: '14px', background: 'rgba(255,255,255,.06)' });
    el('div', 'abs', r, { left: '18px', top: '21px', width: '16px', height: '16px', borderRadius: '50%', background: i % 3 ? 'rgba(255,255,255,.35)' : '#ff6b4a' });
    const s = el('div', 'abs', r, { left: '52px', top: '15px', font: '600 26px/1.1 Inter', color: 'rgba(255,255,255,.85)', whiteSpace: 'nowrap' });
    s.textContent = FIVE[i % 5];
    const w = el('div', 'abs', r, { right: '20px', top: '17px', font: '600 22px/1 ui-monospace, Menlo, monospace', color: 'rgba(255,255,255,.45)' }); w.textContent = `#${48120 + i * 7}`;
    return { r, s, w };
  });
  /* the five repeating questions, as tallies */
  const tallies = FIVE.map((q, i) => {
    const t = el('div', 'abs', Q, { left: '24px', right: '24px', top: 110 + i * 132 + 'px', height: '112px', borderRadius: '20px', background: 'rgba(255,107,74,.10)', border: '2px solid rgba(255,107,74,.45)' });
    const s = el('div', 'abs', t, { left: '30px', top: '34px', font: '800 38px/1.1 Inter', letterSpacing: '-.02em', color: '#fff', whiteSpace: 'nowrap' }); s.textContent = q;
    const n = el('div', 'abs', t, { right: '30px', top: '26px', font: '900 56px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#ff8f72', fontVariantNumeric: 'tabular-nums' });
    return { t, n, v: { k: 0 }, max: COUNTS[i] };
  });
  const stamp = el('div', 'abs', cam, { left: '1420px', top: '430px', padding: '12px 34px', border: '10px solid #ff6b4a', borderRadius: '18px', font: '900 120px/1 Inter Display, Inter', letterSpacing: '.02em', color: '#ff6b4a', rotate: '-12deg', background: 'rgba(11,19,17,.55)', boxShadow: '0 0 60px rgba(255,107,74,.35)' });
  stamp.textContent = 'AGAIN';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const st = { night: 0, q: 12, w: 0 };
  ctx.onFrame(() => {
    const mins = 23 * 60 + st.night * 8 * 60; const h = Math.floor(mins / 60) % 24, m = Math.floor(mins % 60);
    clockLab.textContent = `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'pm' : 'am'}`;
    hh.style.rotate = 330 + st.night * 240 + 'deg'; mh.style.rotate = st.night * 8 * 360 + 'deg';
    qNum.textContent = String(Math.round(st.q));
    const wm = Math.round(st.w * 564); wait.textContent = `⏱ Waiting ${Math.floor(wm / 60)}h ${String(wm % 60).padStart(2, '0')}m`;
    tallies.forEach((x) => { x.n.textContent = '×' + Math.round(x.v.k); });
  });

  /* ---- timeline ---- */
  tl.fromTo(cam, { scale: 1.05 }, { scale: 1, duration: ctx.dur, ease: 'power1.out' }, 0);
  tl.from([clock, clockLab], { opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.out(1.8)' }, 0.05);
  tl.from([qLab, qNum], { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 }, 0.2);
  tl.from(Q, { opacity: 0, x: 60, duration: 0.6 }, 0.1);
  tl.from(qh, { opacity: 0, duration: 0.4 }, 0.3);
  tl.to(st, { night: 1, duration: overnight + 1.6, ease: 'power1.inOut' }, 0.2);
  tl.to(st, { q: 247, duration: overnight + 1.4, ease: 'power2.in' }, 0.3);
  rows.forEach((r, i) => tl.from(r.r, { x: 1040, opacity: 0, duration: 0.45, ease: 'back.out(1.5)' }, pile - 0.4 + i * 0.16));
  tl.to(qNum, { color: '#ff8f72', duration: 0.3 }, overnight);
  tl.from(wait, { opacity: 0, scale: 0.7, duration: 0.45, ease: 'back.out(2.4)' }, hours - 0.35);
  tl.to(st, { w: 1, duration: 1.4, ease: 'power2.out' }, hours - 0.35);
  tl.to(wait, { boxShadow: '0 0 40px rgba(255,107,74,.6)', duration: 0.4, yoyo: true, repeat: 3 }, hours);

  // same five questions
  tl.to(rows.map((r) => r.r), { opacity: 0, y: -20, duration: 0.3, stagger: 0.03 }, same - 0.35);
  tallies.forEach((x, i) => {
    tl.from(x.t, { opacity: 0, scale: 0.85, y: 30, duration: 0.45, ease: 'back.out(1.8)' }, same - 0.05 + i * 0.12);
    tl.to(x.v, { k: x.max, duration: 2.6, ease: 'power1.inOut' }, same + 0.2 + i * 0.12);
  });
  tl.to(cam, { x: -260, duration: 1.4, ease: 'expo.inOut' }, same - 0.3);
  tl.to([clock, clockLab, qLab, qNum, wait], { opacity: 0, x: -80, duration: 0.6, ease: 'power2.in' }, same - 0.35);
  tl.fromTo(stamp, { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power4.in', immediateRender: false }, again1 - 0.25);
  gsap.set(stamp, { opacity: 0 });
  tl.to(cam, { y: 8, duration: 0.06, yoyo: true, repeat: 3 }, again1 + 0.05);
  tl.to(stamp, { scale: 1.12, duration: 0.12, yoyo: true, repeat: 1 }, again2t);
  tl.to(tallies.map((x) => x.t), { borderColor: '#ff6b4a', duration: 0.2, yoyo: true, repeat: 1 }, again2t);
});

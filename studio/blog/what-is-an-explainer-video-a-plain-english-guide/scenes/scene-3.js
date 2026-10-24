/* Scene 3 — "A reliable shape is situation, problem, answer, proof, next step. Keep words and pictures
 * matched, so when you say order page, viewers see it."
 * Storyboard: paper stage. A curved story path draws across the frame, and each of five stops lights up
 * on its spoken word: situation, problem, answer, proof, next step. The camera then pushes into the
 * coral 'answer' stop, which opens into a simple order-page mockup. On "order page" the mockup's
 * 'Start a return' button turns coral, matching the words. The quote sits as a caption below. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w, fb) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : fb; };
  const T = [W(0, 'situation,', 1.757), W(0, 'problem,', 2.698), W(0, 'answer,', 3.36), W(0, 'proof,', 4.056), W(0, 'next', 4.637)];
  const keep = W(1, 'Keep', 5.856), matched = W(1, 'matched,', 7.133), order = W(1, 'order', 8.549), page = W(1, 'page,', 8.839), see = W(1, 'see', 9.791);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 45%, #fffdf8 0%, var(--paper) 60%, #ebe5da 100%)';
  const root = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const cam = el('div', 'abs', root, { inset: 0, transformOrigin: '960px 620px' });

  el('div', 'abs', cam, { left: '200px', top: '250px', width: '1500px', height: '600px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(76,141,255,.08), transparent)' });

  const title = el('div', 'abs', root, { left: '140px', top: '110px', font: '800 68px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  title.textContent = 'Follow a simple story';
  const kicker = el('div', 'abs', root, { left: '144px', top: '200px', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });
  kicker.textContent = 'A RELIABLE SHAPE';

  const stops = [[260, 620], [610, 440], [960, 620], [1310, 440], [1660, 620]];
  const d = 'M260 620 C435 620 435 440 610 440 C785 440 785 620 960 620 C1135 620 1135 440 1310 440 C1485 440 1485 620 1660 620';
  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  svgWrap.innerHTML = `<svg width="1920" height="1080" style="overflow:visible">
    <path id="ghost" d="${d}" fill="none" stroke="#9AA3B8" stroke-opacity=".45" stroke-width="4" stroke-linecap="butt" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>
    <path id="live" d="${d}" fill="none" stroke="#1B2238" stroke-width="8" stroke-linecap="butt" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>
  </svg>`;
  const ghost = svgWrap.querySelector('#ghost'), live = svgWrap.querySelector('#live');
  const head = el('div', 'abs', cam, { left: '-14px', top: '-14px', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 24px rgba(255,107,74,.7)', opacity: 0 });

  const NAMES = ['Situation', 'Problem', 'Answer', 'Proof', 'Next step'];
  const COLS = ['#4C8DFF', '#1B2238', '#FF6B4A', '#3FC79A', '#4C8DFF'];
  const nodes = stops.map(([x, y], i) => {
    const ring = el('div', 'abs', cam, { left: x - 36 + 'px', top: y - 36 + 'px', width: '72px', height: '72px', borderRadius: '50%', background: '#fffdf8', border: '5px solid rgba(27,34,56,.18)', boxSizing: 'border-box', boxShadow: '0 14px 30px rgba(27,34,56,.10)' });
    const fill = el('div', 'abs', cam, { left: x - 36 + 'px', top: y - 36 + 'px', width: '72px', height: '72px', borderRadius: '50%', background: COLS[i], boxShadow: `0 0 0 8px rgba(255,255,255,.9), 0 12px 40px ${COLS[i]}66` });
    const burst = el('div', 'abs', cam, { left: x - 60 + 'px', top: y - 60 + 'px', width: '120px', height: '120px', borderRadius: '50%', border: `4px solid ${COLS[i]}`, boxSizing: 'border-box', opacity: 0 });
    const high = y < 500;
    const lab = el('div', 'abs', cam, { left: x - 170 + 'px', width: '340px', top: (high ? y - 150 : y + 62) + 'px', textAlign: 'center' });
    const num = el('div', '', lab, { font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)', marginBottom: '12px' });
    num.textContent = '0' + (i + 1);
    const nm = el('div', '', lab, { font: '800 44px/1 Inter Display, Inter', letterSpacing: '-.035em', color: i === 2 ? 'var(--signal)' : 'var(--ink)' });
    nm.textContent = NAMES[i];
    return { ring, fill, burst, lab };
  });

  const card = el('div', 'abs', root, { left: '440px', top: '150px', width: '1040px', height: '640px', borderRadius: '28px', background: '#fff', overflow: 'hidden', boxShadow: '0 50px 120px rgba(27,34,56,.22), 0 0 0 1px rgba(27,34,56,.06)', transformOrigin: '50% 100%', opacity: 0 });
  const bar = el('div', 'abs', card, { left: 0, top: 0, right: 0, height: '64px', background: '#f1eee8', borderBottom: '1px solid rgba(27,34,56,.08)' });
  ['#FF6B4A', '#f4c04e', '#3FC79A'].forEach((c, i) => el('div', 'abs', bar, { left: 28 + i * 28 + 'px', top: '24px', width: '16px', height: '16px', borderRadius: '50%', background: c }));
  const url = el('div', 'abs', bar, { left: '160px', top: '15px', width: '560px', height: '34px', borderRadius: '17px', background: '#fff', font: `500 18px/34px ${MONO}`, color: 'var(--mist)', paddingLeft: '20px', boxSizing: 'border-box' });
  url.textContent = 'shop / orders / 4821';
  const h = el('div', 'abs', card, { left: '60px', top: '108px', font: '800 48px/1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  h.textContent = 'Order #4821';
  const pill = el('div', 'abs', card, { left: '60px', top: '178px', padding: '8px 16px', borderRadius: '20px', background: 'rgba(63,199,154,.15)', font: `700 18px/1 ${MONO}`, letterSpacing: '.12em', color: '#1f9a72' });
  pill.textContent = 'DELIVERED';
  const items = [0, 1].map((k) => {
    const row = el('div', 'abs', card, { left: '60px', top: 250 + k * 150 + 'px', width: '520px', height: '120px' });
    el('div', 'abs', row, { left: 0, top: '10px', width: '100px', height: '100px', borderRadius: '18px', background: k ? 'linear-gradient(135deg,#9fc0ff,#4C8DFF)' : 'linear-gradient(135deg,#ffc2b3,#FF6B4A)' });
    el('div', 'abs', row, { left: '130px', top: '30px', width: k ? '260px' : '320px', height: '20px', borderRadius: '10px', background: 'rgba(27,34,56,.75)' });
    el('div', 'abs', row, { left: '130px', top: '68px', width: '180px', height: '16px', borderRadius: '8px', background: 'rgba(154,163,184,.45)' });
    return row;
  });
  const side = el('div', 'abs', card, { left: '640px', top: '108px', width: '340px', height: '470px', borderRadius: '22px', background: '#f7f4ee' });
  [[40, 200], [84, 150], [128, 220]].forEach(([y, w]) => el('div', 'abs', side, { left: '36px', top: y + 'px', width: w + 'px', height: '16px', borderRadius: '8px', background: 'rgba(154,163,184,.45)' }));
  const btnGlow = el('div', 'abs', side, { left: '30px', top: '330px', width: '280px', height: '96px', borderRadius: '20px', boxShadow: '0 0 60px 10px rgba(255,107,74,.55)', opacity: 0 });
  const btn = el('div', 'abs', side, { left: '30px', top: '330px', width: '280px', height: '96px', borderRadius: '20px', border: '3px solid var(--ink)', boxSizing: 'border-box', background: '#fff', color: 'var(--ink)', font: '700 32px/90px Inter', letterSpacing: '-.02em', textAlign: 'center' });
  btn.textContent = 'Start a return';
  const btnRing = el('div', 'abs', side, { left: '30px', top: '330px', width: '280px', height: '96px', borderRadius: '20px', border: '4px solid var(--signal)', boxSizing: 'border-box', opacity: 0 });

  const cap = el('div', 'abs', root, { left: '160px', width: '1600px', top: '845px', textAlign: 'center', font: '700 40px/1.2 Inter Display, Inter', letterSpacing: '-.025em', color: 'var(--ink)' });
  const words = ctx.split(cap, '\u201cStart a return from your order page.\u201d', 'word');
  const capTag = el('div', 'abs', root, { left: '160px', width: '1600px', top: '915px', textAlign: 'center', font: `600 20px/1 ${MONO}`, letterSpacing: '.14em', color: 'var(--mist)' });
  capTag.textContent = 'SAY IT \u00b7 SHOW IT';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  const st = { p: 0 };
  ctx.onFrame(() => {
    live.setAttribute('stroke-dashoffset', String(1 - st.p));
    live.style.opacity = st.p > 0.001 ? '1' : '0';
    const L = live.getTotalLength();
    const pt = live.getPointAtLength(Math.max(0, Math.min(1, st.p)) * L);
    head.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
  });

  tl.to(root, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(title, { y: 30, opacity: 0, duration: 0.7 }, 0.1);
  tl.from(kicker, { opacity: 0, duration: 0.5 }, 0.35);
  gsap.set(ghost, { attr: { 'stroke-dashoffset': 1 } });
  tl.to(ghost, { attr: { 'stroke-dashoffset': 0 }, duration: 1.3, ease: 'power2.inOut' }, 0.05);
  tl.from(nodes.map((n) => n.ring), { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.8)' }, 0.5);
  gsap.set(nodes.map((n) => n.fill), { scale: 0 });
  gsap.set(nodes.map((n) => n.lab), { opacity: 0, y: 20 });

  tl.to(head, { opacity: 1, duration: 0.2 }, T[0] - 0.1);
  nodes.forEach((n, i) => {
    tl.to(n.fill, { scale: 1, duration: 0.55, ease: 'back.out(2)' }, T[i] - 0.05);
    tl.fromTo(n.burst, { scale: 0.5, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, T[i] - 0.05);
    tl.to(n.lab, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, T[i]);
    if (i > 0) tl.to(st, { p: i / 4, duration: T[i] - T[i - 1] - 0.05, ease: 'power1.inOut' }, T[i - 1]);
  });
  tl.to(head, { opacity: 0, duration: 0.3 }, T[4] + 0.2);

  const push = Math.min(keep - 0.6, T[4] + 0.6);
  tl.to([title, kicker], { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, push);
  tl.to([0, 1, 3, 4].map((i) => nodes[i].lab), { opacity: 0, duration: 0.4 }, push);
  tl.to(nodes[2].lab, { opacity: 0, duration: 0.4, ease: 'power2.in' }, push + 0.45);
  tl.to(cam, { scale: 3.2, y: -80, duration: 1.1, ease: 'expo.inOut' }, push);
  tl.to(cam, { opacity: 0, duration: 0.6 }, push + 0.7);
  tl.fromTo(card, { scale: 0.12, opacity: 0, y: 140 }, { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'back.out(1.3)', immediateRender: false }, keep - 0.1);
  tl.from([h, pill, ...items, side], { opacity: 0, y: 24, duration: 0.5, stagger: 0.07 }, keep + 0.3);
  tl.from(words, { opacity: 0, y: 18, duration: 0.45, stagger: 0.05 }, matched - 0.2);
  tl.from(capTag, { opacity: 0, duration: 0.5 }, matched + 0.3);

  tl.to(btn, { backgroundColor: '#FF6B4A', borderColor: '#FF6B4A', color: '#ffffff', scale: 1.07, duration: 0.35, ease: 'back.out(2)' }, order - 0.05);
  tl.to(btnGlow, { opacity: 1, duration: 0.35 }, order - 0.05);
  tl.to([words[0], words[1], words[2], words[5], words[6]], { color: '#FF6B4A', duration: 0.3, stagger: 0.03 }, order - 0.05);
  tl.fromTo(btnRing, { scale: 1, opacity: 1 }, { scale: 1.35, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, page);
  tl.to(btn, { scale: 1.02, duration: 0.5, ease: 'power2.out' }, page + 0.3);
  tl.to(root, { scale: 1.08, x: -60, y: 10, duration: ctx.dur - see, ease: 'power2.out' }, see - 0.1);
  tl.fromTo(btnGlow, { opacity: 1 }, { opacity: 0.6, duration: 0.5, yoyo: true, repeat: 1, immediateRender: false }, see);
});

/* Scene 2 — "Every explainer answers one question and moves from problem to answer. Narration explains
 * while visuals show. The goal is understanding, not advertising."
 * Storyboard: the coral dot from the previous scene lands on a paper stage and grows into the first of
 * three icon cards. On "one question" a question mark pops beside "One subject". On "problem to answer"
 * an arrow draws left to right over "A clear structure". On "narration explains while visuals show" a
 * speech bubble and a picture frame click together over "Words and pictures together". On
 * "understanding, not advertising" a megaphone greys out and is struck through while a lightbulb glows mint. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, fb) => {
    const ok = (v) => typeof v === 'number' && isFinite(v) && v > 0;
    let v; try { v = ctx.at(i, w); } catch (e) {}
    if (!ok(v)) { try { v = ctx.at(i, w.replace(/[.,!?;:]/g, '')); } catch (e) {} }
    return ok(v) ? v : fb;
  };
  const tQ = T(0, 'question', 2.129), tOne = T(0, 'one', 1.896), tProb = T(0, 'problem', 3.417), tAns = T(0, 'answer.', 3.94);
  const tNar = T(1, 'Narration', 5.066), tVis = T(1, 'visuals', 6.621), tShow = T(1, 'show.', 7.097);
  const tGoal = T(2, 'goal', 8.235), tUnd = T(2, 'understanding,', 8.723), tNot = T(2, 'not', 9.512), tAdv = T(2, 'advertising.', 9.756);

  stage.style.background = 'radial-gradient(80% 70% at 50% 40%, #fffdf8 0%, var(--paper) 60%, #ebe6dc 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 600px' });
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  const title = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '96px', textAlign: 'center', font: '800 66px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  title.textContent = 'Three features make an explainer';

  const CX = [480, 960, 1440], TOP = 240, W = 400, H = 400, IY = 380;
  const labels = ['One subject', 'A clear structure', 'Words and pictures together'];
  const cards = CX.map((cx, i) => {
    const c = el('div', 'abs', cam, { left: cx - W / 2 + 'px', top: TOP + 'px', width: W + 'px', height: H + 'px', borderRadius: '28px', background: '#fff', boxShadow: '0 30px 70px rgba(27,34,56,.12), 0 2px 0 rgba(27,34,56,.04)' });
    const n = el('div', 'abs', c, { left: '30px', top: '28px', font: MONO, letterSpacing: '.14em', color: 'var(--mist)' }); n.textContent = '0' + (i + 1);
    const lab = el('div', 'abs', c, { left: '30px', width: W - 60 + 'px', top: '262px', textAlign: 'center', font: '800 38px/1.12 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
    lab.textContent = labels[i];
    return { c, lab };
  });

  const dot = el('div', 'abs', cam, { left: '930px', top: '510px', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--signal)', boxShadow: '0 0 50px rgba(255,107,74,.55)' });
  const qm = el('div', 'abs', cam, { left: CX[0] - 75 + 'px', top: IY - 75 + 'px', width: '150px', height: '150px', textAlign: 'center', font: '900 104px/150px Inter Display, Inter', color: '#fff' });
  qm.textContent = '?';

  const arr = el('div', 'abs', cam, { left: CX[1] - 150 + 'px', top: IY - 70 + 'px', width: '300px', height: '140px' });
  arr.innerHTML = `<svg width="300" height="140" viewBox="0 0 300 140" style="overflow:visible">
    <path class="ln" d="M40 70 C 110 20, 190 120, 252 70" pathLength="1" fill="none" stroke="#1B2238" stroke-width="7" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
    <path class="hd" d="M232 52 L256 68 L236 90" fill="none" stroke="#1B2238" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
    <circle class="p0" cx="34" cy="70" r="16" fill="#FF6B4A"/>
    <circle class="p1" cx="272" cy="70" r="20" fill="#4C8DFF" opacity="0"/></svg>`;
  const ln = arr.querySelector('.ln'), hd = arr.querySelector('.hd'), p0 = arr.querySelector('.p0'), p1 = arr.querySelector('.p1');

  const bub = el('div', 'abs', cam, { left: CX[2] - 132 + 'px', top: IY - 60 + 'px', width: '124px', height: '110px' });
  bub.innerHTML = `<svg width="124" height="110" viewBox="0 0 124 110"><path d="M14 8 H110 a10 10 0 0 1 10 10 V66 a10 10 0 0 1 -10 10 H48 L26 100 L30 76 H14 a10 10 0 0 1 -10 -10 V18 a10 10 0 0 1 10 -10z" fill="#4C8DFF"/>
    <rect x="22" y="28" width="70" height="8" rx="4" fill="#fff"/><rect x="22" y="48" width="48" height="8" rx="4" fill="#fff" opacity=".75"/></svg>`;
  const frm = el('div', 'abs', cam, { left: CX[2] + 8 + 'px', top: IY - 56 + 'px', width: '124px', height: '100px' });
  frm.innerHTML = `<svg width="124" height="100" viewBox="0 0 124 100"><rect x="4" y="4" width="116" height="92" rx="10" fill="#fff" stroke="#3FC79A" stroke-width="8"/>
    <circle cx="38" cy="34" r="10" fill="#FF6B4A"/><path d="M12 86 L48 52 L70 72 L86 58 L112 86z" fill="#3FC79A"/></svg>`;
  const click = el('div', 'abs', cam, { left: CX[2] - 70 + 'px', top: IY - 70 + 'px', width: '140px', height: '140px', borderRadius: '50%', border: '5px solid var(--sky)', opacity: 0 });

  const meg = el('div', 'abs', cam, { left: '690px', top: '730px', width: '160px', height: '120px' });
  meg.innerHTML = `<svg width="160" height="120" viewBox="0 0 160 120"><path d="M20 44 H52 L120 12 V108 L52 76 H20z" fill="#FF6B4A"/><rect x="34" y="76" width="18" height="34" rx="5" fill="#FF6B4A"/>
    <path d="M134 40 Q150 60 134 80" fill="none" stroke="#FF6B4A" stroke-width="7" stroke-linecap="round"/></svg>`;
  const megLab = el('div', 'abs', cam, { left: '620px', width: '300px', top: '872px', textAlign: 'center', font: MONO, letterSpacing: '.16em', color: 'var(--ink)' }); megLab.textContent = 'ADVERTISING';
  const strike = el('div', 'abs', cam, { left: '660px', top: '800px', width: '220px', height: '8px', borderRadius: '4px', background: 'var(--ink)', transform: 'rotate(-18deg)', transformOrigin: '0% 50%' });
  const glow = el('div', 'abs', cam, { left: '1050px', top: '680px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(63,199,154,.55), transparent 65%)', opacity: 0 });
  const bulb = el('div', 'abs', cam, { left: '1120px', top: '722px', width: '120px', height: '140px' });
  bulb.innerHTML = `<svg width="120" height="140" viewBox="0 0 120 140"><path class="gl" d="M60 8 a44 44 0 0 1 26 80 V100 H34 V88 A44 44 0 0 1 60 8z" fill="#9AA3B8"/>
    <rect x="36" y="106" width="48" height="10" rx="5" fill="#1B2238"/><rect x="42" y="122" width="36" height="10" rx="5" fill="#1B2238"/></svg>`;
  const gl = bulb.querySelector('.gl');
  const bulbLab = el('div', 'abs', cam, { left: '1030px', width: '300px', top: '872px', textAlign: 'center', font: MONO, letterSpacing: '.16em', color: 'var(--mist)' }); bulbLab.textContent = 'UNDERSTANDING';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  gsap.set([title, ...cards.map((c) => c.c), qm, bub, frm, meg, megLab, glow, bulb, bulbLab], { opacity: 0 });
  cards.forEach((c) => gsap.set(c.lab, { opacity: 0 }));
  gsap.set(strike, { scaleX: 0, rotation: -18, opacity: 1 });
  gsap.set(meg, { filter: 'grayscale(0) opacity(1)' });
  gsap.set(hd, { opacity: 0 });
  gsap.set(p1, { opacity: 0, scale: 0.2, svgOrigin: '272 70' });
  gsap.set(p0, { scale: 0, svgOrigin: '34 70' });

  tl.to(cam, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);
  tl.fromTo(dot, { scale: 0.6 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, 0);
  tl.fromTo(title, { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15);
  tl.fromTo(cards.map((c) => c.c), { opacity: 0, y: 50, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)' }, 0.45);
  tl.to(dot, { left: CX[0] - 75, top: IY - 75, width: 150, height: 150, boxShadow: '0 20px 50px rgba(255,107,74,.35)', duration: 0.9, ease: 'expo.inOut' }, 0.4);

  tl.fromTo(qm, { opacity: 0, scale: 0.3, rotation: -25 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(2)', immediateRender: false }, tQ - 0.1);
  tl.fromTo(cards[0].lab, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, tOne);
  tl.to(dot, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, tQ);

  tl.to(p0, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, tProb - 0.4);
  tl.to(ln, { attr: { 'stroke-dashoffset': 0 }, duration: Math.max(0.4, tAns - tProb), ease: 'power2.inOut' }, tProb);
  tl.to(hd, { opacity: 1, duration: 0.15 }, Math.max(tProb + 0.3, tAns - 0.05));
  tl.to(p1, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, Math.max(tProb + 0.35, tAns));
  tl.fromTo(cards[1].lab, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, tProb);

  tl.fromTo(bub, { opacity: 0, x: -70, scale: 0.7 }, { opacity: 1, x: -16, scale: 1, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, tNar);
  tl.fromTo(frm, { opacity: 0, x: 70, scale: 0.7 }, { opacity: 1, x: 16, scale: 1, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, tVis);
  tl.to(bub, { x: 0, duration: 0.22, ease: 'power4.in' }, tShow - 0.22);
  tl.to(frm, { x: 0, duration: 0.22, ease: 'power4.in' }, tShow - 0.22);
  tl.to([bub, frm], { scale: 1.08, duration: 0.1, yoyo: true, repeat: 1 }, tShow);
  tl.fromTo(click, { opacity: 0.9, scale: 0.6 }, { opacity: 0, scale: 1.9, duration: 0.7, ease: 'power2.out', immediateRender: false }, tShow);
  tl.fromTo(cards[2].lab, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, tNar + 0.3);

  tl.to(cam, { y: -40, duration: 0.9, ease: 'expo.inOut' }, tGoal - 0.3);
  tl.fromTo([meg, bulb], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'back.out(1.6)', immediateRender: false }, tGoal);
  tl.to([megLab, bulbLab], { opacity: 1, duration: 0.4 }, tGoal + 0.15);
  tl.to(gl, { attr: { fill: '#3FC79A' }, duration: 0.4 }, tUnd);
  tl.to(glow, { opacity: 1, duration: 0.5 }, tUnd);
  tl.fromTo(bulb, { scale: 1 }, { scale: 1.15, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tUnd);
  tl.to(bulbLab, { color: '#2a9e78', duration: 0.4 }, tUnd);
  tl.to(meg, { filter: 'grayscale(1) opacity(.35)', duration: 0.6 }, tNot);
  tl.to(megLab, { color: '#9AA3B8', duration: 0.6 }, tNot);
  tl.to(strike, { scaleX: 1, duration: 0.35, ease: 'power3.inOut' }, tAdv);
  tl.to(strike, { backgroundColor: '#9AA3B8', duration: 0.4 }, tAdv + 0.4);
  tl.to(glow, { scale: 1.15, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tAdv + 0.3);
});

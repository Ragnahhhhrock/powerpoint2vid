/* Scene 5 — "Take a leave policy slide. Before: a label and five dense bullets.
 * After: request leave two weeks ahead, through the HR portal, with three simple steps."
 * Storyboard: on a night stage, a dense "Leave policy" slide card arrives in the centre. On "Before"
 * it slides to the left half and a slate BEFORE tag appears. A coral outline marks the label on "label".
 * The five grey bullet blocks jitter on "five" and blur on "dense". On "After" a paper panel wipes in
 * from the right. The headline writes itself word by word as it's spoken. On "three simple steps"
 * a teal flow draws in: Submit → Manager reviews → Reply, one node per word. The camera then pushes
 * into the after side and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { let v; try { v = ctx.at(i, w); } catch (e) { v = NaN; } return Number.isFinite(v) ? v : f; };
  const tPolicy = T(0, 'policy', 1.212), tBefore = T(1, 'Before:', 2.338), tLabel = T(1, 'label', 3.139),
    tFive = T(1, 'five', 4 - 0.315), tDense = T(1, 'dense', 4.021), tAfter = T(2, 'After:', 5.322),
    tThree = T(2, 'three', 8.816), tSimple = T(2, 'simple', 9.118), tSteps = T(2, 'steps.', 9.478);
  const wordTimes = [T(2, 'request', 5.728), T(2, 'leave', 6.158), T(2, 'two', 6.425), T(2, 'weeks', 6.634),
    T(2, 'ahead,', 6.889), T(2, 'through', 7.435), T(2, 'the', 7.725), T(2, 'HR', 7.864), T(2, 'portal,', 8.247)];
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';
  const rnd = ctx.rand(5);

  stage.style.background = 'radial-gradient(60% 70% at 30% 45%, #1a1d33 0%, var(--night) 75%)';
  const drift = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', drift, { inset: 0, transformOrigin: '1440px 560px' });

  /* ---- BEFORE: dense slide card on night ---- */
  const card = el('div', 'abs', cam, { left: '100px', top: '230px', width: '760px', height: '560px', borderRadius: '18px',
    background: 'linear-gradient(180deg, #1d2030, #161825)', border: '1px solid rgba(255,255,255,.08)',
    boxShadow: '0 50px 100px rgba(0,0,0,.55)' });
  const cTitle = el('div', 'abs', card, { left: '56px', top: '50px', font: '700 44px/1 Inter Display, Inter', letterSpacing: '-.03em', color: '#d9dbe6' });
  cTitle.textContent = 'Leave policy';
  const labelBox = el('div', 'abs', card, { left: '38px', top: '34px', width: '310px', height: '76px', borderRadius: '10px', border: '3px dashed var(--coral)', opacity: 0 });
  const labelTag = el('div', 'abs', card, { left: '366px', top: '58px', font: mono, letterSpacing: '.14em', color: 'var(--coral)', opacity: 0 });
  labelTag.textContent = 'LABEL';
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const row = el('div', 'abs', card, { left: '56px', top: 150 + i * 78 + 'px', width: '650px', height: '60px' });
    el('div', 'abs', row, { left: 0, top: '2px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--slate)' });
    [0, 1, 2].forEach((k) => {
      const w = k === 2 ? 200 + rnd() * 220 : 520 + rnd() * 110;
      el('div', 'abs', row, { left: '34px', top: k * 22 + 'px', width: w + 'px', height: '12px', borderRadius: '6px', background: 'rgba(138,144,166,' + (0.55 - k * 0.08) + ')' });
    });
    rows.push(row);
  }
  const beforeTag = el('div', 'abs', cam, { left: '104px', top: '180px', font: mono, letterSpacing: '.18em', color: 'var(--slate)' });
  beforeTag.textContent = 'BEFORE';

  /* ---- AFTER: paper panel ---- */
  const paper = el('div', 'abs', cam, { left: '960px', top: '-100px', width: '1440px', height: '1280px',
    background: 'radial-gradient(60% 50% at 35% 45%, #fffdf8 0%, var(--paper) 70%)' });
  const edge = el('div', 'abs', cam, { left: '957px', top: '-100px', width: '6px', height: '1280px', background: 'var(--teal)', boxShadow: '0 0 40px rgba(31,181,168,.8)' });
  const afterTag = el('div', 'abs', cam, { left: '1040px', top: '180px', font: mono, letterSpacing: '.18em', color: 'var(--teal)' });
  afterTag.textContent = 'AFTER';
  const head = el('div', 'abs', cam, { left: '1040px', top: '230px', width: '780px', font: '800 62px/1.08 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--ink)' });
  const words = ctx.split(head, 'Request leave two weeks ahead, through the HR portal', 'word');
  [2, 3, 4].forEach((i) => { if (words[i]) words[i].style.color = 'var(--coral)'; });

  /* flow */
  const CX = [1140, 1440, 1740], CY = 640, R = 46;
  const flowSvg = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  let svg = '<svg width="1920" height="1080" style="overflow:visible">';
  for (let i = 0; i < 2; i++) {
    const x0 = CX[i] + R + 14, x1 = CX[i + 1] - R - 14;
    svg += `<path class="con" d="M${x0} ${CY} L${x1} ${CY} M${x1 - 16} ${CY - 13} L${x1} ${CY} L${x1 - 16} ${CY + 13}" fill="none" stroke="#1FB5A8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  flowSvg.innerHTML = svg + '</svg>';
  const cons = [...flowSvg.querySelectorAll('.con')];
  cons.forEach((p) => { gsap.set(p, { strokeDasharray: 400, strokeDashoffset: 400 }); });
  const nodes = ['Submit', 'Manager reviews', 'Reply'].map((name, i) => {
    const c = el('div', 'abs', cam, { left: CX[i] - R + 'px', top: CY - R + 'px', width: R * 2 + 'px', height: R * 2 + 'px', borderRadius: '50%',
      background: 'linear-gradient(160deg, #3fd3c5, #159a8f)', boxShadow: '0 14px 34px rgba(31,181,168,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      font: '800 38px/1 Inter Display, Inter', color: '#fff' });
    c.textContent = String(i + 1);
    const l = el('div', 'abs', cam, { left: CX[i] - 150 + 'px', width: '300px', top: CY + R + 24 + 'px', textAlign: 'center', font: '700 30px/1.1 Inter Display, Inter', letterSpacing: '-.02em', color: 'var(--ink)' });
    l.textContent = name;
    return { c, l };
  });

  ctx.fx.vignette({ strength: 0.45 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- timeline ---- */
  gsap.set(card, { x: 480, scale: 1.06, filter: 'brightness(1)' });
  gsap.set(rows, { filter: 'blur(0px)' });
  gsap.set(paper, { clipPath: 'inset(0px 0px 0px 960px)' });
  gsap.set(edge, { x: 960, opacity: 0 });
  gsap.set([beforeTag, afterTag], { opacity: 0 });
  gsap.set(words, { opacity: 0, y: 34 });
  gsap.set(nodes.map((n) => n.c), { scale: 0, opacity: 0 });
  gsap.set(nodes.map((n) => n.l), { opacity: 0, y: 16 });

  tl.to(drift, { x: -14, y: -8, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(card, { y: 50, opacity: 0, duration: 0.6 }, 0.05);
  tl.from(rows, { x: -18, opacity: 0, duration: 0.18, stagger: 0.05, ease: 'power2.out' }, 0.2);
  tl.to(card, { scale: 1.1, duration: 0.6, ease: 'back.out(1.6)' }, tPolicy);

  // "Before": card slides to the left half
  tl.to(card, { x: 0, scale: 1, duration: 0.9, ease: 'expo.inOut' }, tBefore - 0.2);
  tl.to(beforeTag, { opacity: 1, duration: 0.5 }, tBefore + 0.4);
  // "label"
  tl.fromTo(labelBox, { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)', immediateRender: false }, tLabel - 0.05);
  tl.to(labelTag, { opacity: 1, duration: 0.3 }, tLabel + 0.1);
  // "five": jittery count
  rows.forEach((r, i) => {
    tl.to(r, { x: (i % 2 ? -1 : 1) * 7, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, tFive - 0.05 + i * 0.06);
  });
  // "dense": blur
  tl.to(rows, { filter: 'blur(4px)', duration: 0.6, ease: 'power2.out' }, tDense);
  tl.to([labelBox, labelTag], { opacity: 0, duration: 0.4 }, tAfter - 0.4);

  // "After": wipe reveals paper
  const W = 0.85;
  tl.to(edge, { opacity: 1, duration: 0.1 }, tAfter - 0.15);
  tl.to(paper, { clipPath: 'inset(0px 0px 0px 0px)', duration: W, ease: 'expo.inOut' }, tAfter - 0.15);
  tl.to(edge, { x: 0, duration: W, ease: 'expo.inOut' }, tAfter - 0.15);
  tl.to(edge, { width: 3, x: 1.5, boxShadow: '0 0 20px rgba(31,181,168,.5)', duration: 0.6 }, tAfter + W - 0.1);
  tl.to(card, { filter: 'brightness(.6)', duration: 0.8 }, tAfter);
  tl.to(afterTag, { opacity: 1, duration: 0.5 }, tAfter + 0.4);
  tl.to(cam, { scale: 1.04, x: -60, duration: 3, ease: 'power2.inOut' }, tAfter + 0.5);

  words.forEach((w, i) => {
    const t = wordTimes[i] !== undefined ? wordTimes[i] : wordTimes[wordTimes.length - 1];
    tl.to(w, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, t - 0.08);
  });

  // "three simple steps": flow
  const pops = [tThree, tSimple, tSteps];
  nodes.forEach((n, i) => {
    tl.to(n.c, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, pops[i] - 0.06);
    tl.to(n.l, { opacity: 1, y: 0, duration: 0.45 }, pops[i] + 0.04);
    if (i > 0) tl.to(cons[i - 1], { strokeDashoffset: 0, duration: 0.32, ease: 'power2.inOut' }, pops[i] - 0.3);
  });

  // camera pushes into the after side and holds
  const push = tSteps + 0.3;
  tl.to(cam, { scale: 1.12, x: -240, duration: 1.5, ease: 'expo.inOut' }, push);
  tl.to(card, { filter: 'brightness(.4)', duration: 1.2 }, push);
  tl.to(nodes.map((n) => n.c), { boxShadow: '0 14px 50px rgba(31,181,168,.75)', duration: 0.6, stagger: 0.12, yoyo: true, repeat: 1 }, push + 0.4);
});

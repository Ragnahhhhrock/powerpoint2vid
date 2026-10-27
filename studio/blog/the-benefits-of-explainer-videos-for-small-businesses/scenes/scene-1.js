/* Scene 1 — "Every small business fields the same questions daily. A short video answers each one the same way,
 * without anyone on your team stopping what they're doing."
 * Storyboard: warm paper stage, wide. The headline "Same answer, every customer" holds at the top at 100px.
 * Three ink customer bubbles slide in from the left, and on "daily" they echo to show the repetition.
 * On "a short video" a teal video card pops in on the right, and on "answers" lines draw from each bubble into it.
 * On "the same way" three identical answer cards stamp out in unison.
 * On "team" a small team row appears below and keeps working while the video plays on. The camera drifts slowly
 * and pushes in at the end. The deck's bullet layout is cut. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tVideo = W(1, 'video'), tAnswers = W(1, 'answers'), tSame = W(1, 'same'), tTeam = W(1, 'team'), tStop = W(1, 'stopping'), tDaily = W(0, 'daily.');
  const QS = ['How does delivery work?', "What's included in the basic plan?", 'How do I book?'];
  const YC = [395, 575, 755];
  const mono = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 55% 55%, #fffdf8 0%, var(--paper) 60%, #ebe5d9 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 560px' });
  el('div', 'abs', cam, { left: '900px', top: '330px', width: '640px', height: '480px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(43,179,163,.16), transparent)' });

  const head = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '92px', textAlign: 'center', font: '800 100px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)' });
  const hw = ctx.split(head, 'Same answer, every customer', 'word');
  const kicker = el('div', 'abs', cam, { left: '80px', width: '1760px', top: '222px', textAlign: 'center', font: mono, letterSpacing: '.18em', color: 'var(--mist)' });
  kicker.textContent = 'EXPLAIN ONCE · REUSE MANY TIMES';

  const svgWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  svgWrap.innerHTML = '<svg width="1920" height="1080" style="overflow:visible"></svg>';
  const svg = svgWrap.firstChild;
  const NS = 'http://www.w3.org/2000/svg';
  const mkPath = (d, color, w) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', color); p.setAttribute('stroke-width', w); p.setAttribute('stroke-linecap', 'round'); svg.appendChild(p); return p; };
  const mkDot = (c) => { const d = document.createElementNS(NS, 'circle'); d.setAttribute('r', 8); d.setAttribute('fill', c); d.setAttribute('opacity', 0); svg.appendChild(d); return d; };

  const bubbles = QS.map((q, i) => {
    const ghosts = [2, 1].map((k) => {
      const g = el('div', 'abs', cam, { left: '120px', top: YC[i] - 45 + 'px', padding: '24px 36px', borderRadius: '30px 30px 30px 8px', background: 'var(--ink)', color: 'var(--paper)', font: '600 36px/1.2 Inter', whiteSpace: 'nowrap', opacity: 0 });
      g.textContent = q; g._k = k; return g;
    });
    const b = el('div', 'abs', cam, { left: '120px', top: YC[i] - 45 + 'px', padding: '24px 36px', borderRadius: '30px 30px 30px 8px', background: 'var(--ink)', color: 'var(--paper)', font: '600 36px/1.2 Inter', letterSpacing: '-.01em', whiteSpace: 'nowrap', boxShadow: '0 24px 50px rgba(28,36,51,.22)' });
    b.textContent = q;
    return { b, ghosts };
  });
  const est = [600, 740, 420];
  const rightEdge = bubbles.map(({ b }, i) => 120 + (b.offsetWidth || est[i]) + 14);

  const VX = 1010, VY = 475, VW = 300, VH = 200;
  const vglow = el('div', 'abs', cam, { left: VX - 60 + 'px', top: VY - 60 + 'px', width: VW + 120 + 'px', height: VH + 120 + 'px', borderRadius: '50px', background: 'radial-gradient(closest-side, rgba(43,179,163,.55), transparent)', opacity: 0 });
  const vid = el('div', 'abs', cam, { left: VX + 'px', top: VY + 'px', width: VW + 'px', height: VH + 'px', borderRadius: '26px', overflow: 'hidden', background: 'linear-gradient(145deg, #3fd0bf 0%, var(--teal) 50%, #1b7f74 100%)', boxShadow: '0 30px 70px rgba(27,127,116,.4), inset 0 1px 0 rgba(255,255,255,.45)' });
  const play = el('div', 'abs', vid, { left: '115px', top: '58px', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,.95)' });
  el('div', 'abs', play, { left: '28px', top: '21px', width: 0, height: 0, borderLeft: '24px solid var(--teal)', borderTop: '15px solid transparent', borderBottom: '15px solid transparent' });
  el('div', 'abs', vid, { left: '24px', right: '24px', bottom: '22px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.3)' });
  const prog = el('div', 'abs', vid, { left: '24px', width: '252px', bottom: '22px', height: '6px', borderRadius: '3px', background: '#fff', transformOrigin: '0 50%' });
  const vlab = el('div', 'abs', cam, { left: VX + 'px', width: VW + 'px', top: VY + VH + 26 + 'px', textAlign: 'center', font: mono, letterSpacing: '.16em', color: '#1b7f74' });
  vlab.textContent = 'ONE SHORT VIDEO';

  const AX = 1450, AW = 360, AH = 112;
  const answers = YC.map((y) => {
    const c = el('div', 'abs', cam, { left: AX + 'px', top: y - AH / 2 + 'px', width: AW + 'px', height: AH + 'px', borderRadius: '20px', background: '#fff', boxShadow: '0 20px 44px rgba(28,36,51,.14)', borderLeft: '8px solid var(--teal)' });
    const pc = el('div', 'abs', c, { left: '24px', top: '28px', width: '56px', height: '56px', borderRadius: '50%', background: 'var(--teal)' });
    el('div', 'abs', pc, { left: '22px', top: '16px', width: 0, height: 0, borderLeft: '18px solid #fff', borderTop: '12px solid transparent', borderBottom: '12px solid transparent' });
    el('div', 'abs', c, { left: '102px', top: '34px', width: '170px', height: '14px', borderRadius: '7px', background: 'var(--ink)', opacity: 0.85 });
    el('div', 'abs', c, { left: '102px', top: '62px', width: '120px', height: '12px', borderRadius: '6px', background: 'var(--mist)', opacity: 0.6 });
    const chk = el('div', 'abs', c, { right: '22px', top: '34px', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(43,179,163,.15)' });
    el('div', 'abs', chk, { left: '14px', top: '9px', width: '12px', height: '20px', borderRight: '5px solid var(--teal)', borderBottom: '5px solid var(--teal)', transform: 'rotate(45deg)' });
    return c;
  });

  const inPaths = YC.map((y, i) => { const x0 = rightEdge[i], x1 = VX - 8, ym = VY + VH / 2 + (i - 1) * 40; return mkPath(`M${x0} ${y} C ${x0 + 120} ${y}, ${x1 - 110} ${ym}, ${x1} ${ym}`, 'var(--ink)', 4); });
  const outPaths = YC.map((y, i) => { const x0 = VX + VW + 8, ym = VY + VH / 2 + (i - 1) * 40, x1 = AX - 12; return mkPath(`M${x0} ${ym} C ${x0 + 60} ${ym}, ${x1 - 60} ${y}, ${x1} ${y}`, 'var(--teal)', 4); });
  [...inPaths, ...outPaths].forEach((p) => { const L = p.getTotalLength ? p.getTotalLength() : 400; p._L = L; p.style.strokeDasharray = L + ' ' + (L + 20); p.style.strokeDashoffset = L; p.style.opacity = 0; });
  const dotsIn = inPaths.map(() => mkDot('var(--amber)'));
  const dotsOut = outPaths.map(() => mkDot('var(--teal)'));
  const flowIn = { p: 0, o: 0 }, flowOut = { p: 0, o: 0 };

  const team = el('div', 'abs', cam, { left: '960px', width: '400px', top: '880px', height: '120px' });
  const avatars = ['var(--amber)', 'var(--coral)', 'var(--ink)'].map((c, i) => {
    const a = el('div', 'abs', team, { left: 80 + i * 90 + 'px', top: 0, width: '64px', height: '64px', borderRadius: '50%', background: c, boxShadow: '0 10px 24px rgba(28,36,51,.2)' });
    el('div', 'abs', a, { left: '22px', top: '12px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,.85)' });
    el('div', 'abs', a, { left: '14px', top: '36px', width: '36px', height: '18px', borderRadius: '18px 18px 4px 4px', background: 'rgba(255,255,255,.85)' });
    return a;
  });
  const tlab = el('div', 'abs', team, { left: 0, width: '400px', top: '86px', textAlign: 'center', font: mono, letterSpacing: '.16em', color: 'var(--mist)' });
  tlab.textContent = 'YOUR TEAM · STILL WORKING';

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.06, blend: 'multiply' });

  const place = (paths, dots, st) => paths.forEach((p, i) => {
    const d = dots[i]; const L = p._L; if (!p.getPointAtLength) return;
    const f = ((st.p + i * 0.18) % 1 + 1) % 1; const pt = p.getPointAtLength(f * L);
    d.setAttribute('cx', pt.x); d.setAttribute('cy', pt.y); d.setAttribute('opacity', st.o * Math.sin(f * Math.PI));
  });
  ctx.onFrame((t) => {
    place(inPaths, dotsIn, flowIn); place(outPaths, dotsOut, flowOut);
    avatars.forEach((a, i) => gsap.set(a, { y: Math.sin(t * 5 + i * 1.3) * 5 }));
  });

  tl.to(cam, { x: -6, y: -6, duration: ctx.dur, ease: 'none' }, 0);
  tl.from(hw, { y: 50, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(1.6)' }, 0.05);
  tl.from(kicker, { opacity: 0, y: 10, duration: 0.6 }, 0.4);

  const bt = [0.35, W(0, 'fields') - 0.1, W(0, 'questions') - 0.15];
  bubbles.forEach(({ b, ghosts }, i) => {
    tl.from(b, { x: -260, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' }, bt[i]);
    ghosts.forEach((g) => {
      tl.fromTo(g, { opacity: 0, x: 0, y: 0 }, { opacity: 0.18 / g._k, x: 14 * g._k, y: -12 * g._k, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tDaily + i * 0.06 + g._k * 0.05);
    });
    tl.to(b, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, tDaily + i * 0.06);
  });

  tl.fromTo(vid, { scale: 0.3, opacity: 0, rotation: -6 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.8)' }, tVideo - 0.2);
  tl.to(vglow, { opacity: 1, duration: 0.8 }, tVideo);
  tl.from(vlab, { opacity: 0, y: 12, duration: 0.5 }, tVideo + 0.2);
  tl.fromTo(prog, { scaleX: 0 }, { scaleX: 1, duration: ctx.dur - tVideo, ease: 'none' }, tVideo);

  tl.to(inPaths, { strokeDashoffset: 0, opacity: 0.55, duration: 0.7, stagger: 0.1, ease: 'power2.inOut' }, tAnswers - 0.15);
  tl.to(flowIn, { o: 1, duration: 0.4 }, tAnswers + 0.4);
  tl.to(flowIn, { p: 3, duration: ctx.dur - tAnswers - 0.4, ease: 'none' }, tAnswers + 0.4);

  tl.to(outPaths, { strokeDashoffset: 0, opacity: 0.55, duration: 0.45, ease: 'power2.out' }, tSame - 0.45);
  tl.fromTo(answers, { scale: 1.6, opacity: 0, rotation: -3 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.38, ease: 'power4.in' }, tSame - 0.3);
  tl.to(answers, { y: 5, duration: 0.07, yoyo: true, repeat: 1 }, tSame + 0.08);
  tl.to(vid, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 }, tSame + 0.05);
  tl.to(flowOut, { o: 1, duration: 0.4 }, tSame + 0.3);
  tl.to(flowOut, { p: 2.5, duration: ctx.dur - tSame - 0.3, ease: 'none' }, tSame + 0.3);

  tl.fromTo(avatars, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' }, tTeam - 0.4);
  tl.from(tlab, { opacity: 0, y: 10, duration: 0.5 }, tStop - 0.2);

  tl.to(cam, { scale: 1.03, duration: ctx.dur - tSame, ease: 'power1.inOut' }, tSame);
});

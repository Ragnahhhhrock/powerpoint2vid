/* Scene 2 — "A label like Q3 results leaves people guessing. Q3 revenue beat target by a comfortable
 * margin gives the chart a job: proving it."
 * Storyboard: still night. A phone silhouette fills the centre (skimming metaphor). On "Q3 results" a grey
 * headline lands on top of a muted bar chart and three faint question marks drift up. On "beat target" a
 * coral pen strikes the label and the claim writes itself in word by word. On "proving it" the bars rise
 * in mint and the final bar clears a dashed target line. Margin tag: LABEL struck, CLAIM written. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tLabel = W(0, 'label'), tQ3 = W(0, 'Q3');
  const tBeat = W(1, 'beat'), tMargin = W(1, 'margin'), tChart = W(1, 'chart'), tProve = W(1, 'proving');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 70% at 50% 45%, #1a1e30 0%, var(--night) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 420px' });
  const halo = el('div', 'abs', cam, { left: '560px', top: '120px', width: '800px', height: '840px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(138,144,166,.18), transparent)', filter: 'blur(20px)' });

  const phone = el('div', 'abs', cam, { left: '700px', top: '80px', width: '520px', height: '920px', borderRadius: '68px',
    background: 'linear-gradient(160deg, #2a2e3d, #151824 60%)', boxShadow: '0 60px 120px rgba(0,0,0,.65), inset 0 0 0 2px rgba(255,255,255,.08)' });
  const screen = el('div', 'abs', phone, { left: '16px', top: '16px', width: '488px', height: '888px', borderRadius: '54px', overflow: 'hidden',
    background: 'linear-gradient(180deg, #161925, #0f111a)' });
  el('div', 'abs', screen, { left: '174px', top: '14px', width: '140px', height: '36px', borderRadius: '20px', background: '#05060b' });
  const clock = el('div', 'abs', screen, { left: '40px', top: '22px', font: '700 22px/1 Inter', color: 'rgba(246,243,236,.7)' }); clock.textContent = '9:41';

  const oldH = el('div', 'abs', screen, { left: '44px', top: '120px', font: '800 72px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--slate)', whiteSpace: 'nowrap' });
  oldH.textContent = 'Q3 results';
  const strike = el('div', 'abs', screen, { left: '36px', top: '152px', width: '370px', height: '9px', borderRadius: '5px', background: 'var(--signal)',
    transformOrigin: '0% 50%', boxShadow: '0 0 18px rgba(255,90,60,.6)' });
  const pen = el('div', 'abs', screen, { left: '36px', top: '96px', width: '16px', height: '64px', borderRadius: '8px 8px 2px 2px',
    background: 'linear-gradient(180deg, #ff8a70, var(--signal))', transformOrigin: '50% 100%' });

  const newH = el('div', 'abs', screen, { left: '44px', top: '110px', width: '410px', font: '800 50px/1.08 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)' });
  const words = 'Q3 revenue beat target by a comfortable margin'.split(' ').map((w) => {
    const s = el('span', '', newH, { display: 'inline-block', marginRight: '.24em' }); s.textContent = w;
    if (w === 'beat' || w === 'target') s.style.color = 'var(--signal)';
    return s;
  });

  const chart = el('div', 'abs', screen, { left: '50px', top: '480px', width: '388px', height: '330px' });
  el('div', 'abs', chart, { left: 0, right: 0, bottom: 0, height: '2px', background: 'rgba(246,243,236,.25)' });
  const HS = [150, 190, 215, 292], TGT = 250;
  const bars = HS.map((h, i) => el('div', 'abs', chart, { left: 6 + i * 98 + 'px', bottom: '2px', width: '72px', height: h + 'px',
    borderRadius: '10px 10px 3px 3px', backgroundColor: 'rgba(138,144,166,.32)', transformOrigin: '50% 100%' }));
  const tline = el('div', 'abs', chart, { left: '-10px', width: '408px', bottom: TGT + 'px', height: '0px', borderTop: '3px dashed var(--butter)', transformOrigin: '0% 50%' });
  const tlab = el('div', 'abs', chart, { left: '0px', bottom: TGT + 12 + 'px', font: MONO, fontSize: '16px', letterSpacing: '.14em', color: 'var(--butter)' });
  tlab.textContent = 'TARGET';
  const ring = el('div', 'abs', chart, { left: 6 + 3 * 98 + 36 - 50 + 'px', bottom: HS[3] - 50 + 'px', width: '100px', height: '100px', borderRadius: '50%', border: '5px solid var(--mint)', opacity: 0 });

  const qs = [[1290, 260, 110, -8], [560, 360, 84, 10], [1330, 560, 70, 14]].map(([x, y, s, r]) => {
    const q = el('div', 'abs', cam, { left: x + 'px', top: y + 'px', font: `800 ${s}px/1 Inter Display, Inter`, color: 'var(--slate)' });
    q.textContent = '?'; gsap.set(q, { rotation: r }); return q;
  });

  const tagL = el('div', 'abs', cam, { left: '230px', top: '700px', font: MONO, fontSize: '30px', letterSpacing: '.18em', color: 'var(--slate)' }); tagL.textContent = 'LABEL';
  const tagS = el('div', 'abs', cam, { left: '222px', top: '713px', width: '130px', height: '4px', background: 'var(--signal)', transformOrigin: '0% 50%' });
  const tagC = el('div', 'abs', cam, { left: '230px', top: '760px', font: MONO, fontSize: '30px', letterSpacing: '.18em', color: 'var(--signal)' }); tagC.textContent = 'CLAIM';

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });

  gsap.set([oldH, ...words, tline, tlab, tagL, tagC, pen, ...qs], { opacity: 0 });
  gsap.set([strike, tagS, tline], { scaleX: 0 });
  gsap.set(bars, { scaleY: 0 });
  gsap.set(pen, { rotation: 35 });

  tl.from(phone, { y: 60, opacity: 0, duration: 0.6 }, 0);
  tl.from(halo, { opacity: 0, duration: 1 }, 0);
  tl.to(cam, { scale: 1.06, duration: ctx.dur, ease: 'none' }, 0);

  tl.to(bars, { scaleY: 0.55, duration: 0.3, stagger: 0.05, ease: 'power3.out' }, tLabel - 0.1);
  tl.fromTo(oldH, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.25 }, tQ3 - 0.08);
  tl.to(tagL, { opacity: 1, duration: 0.25 }, tQ3 + 0.1);

  qs.forEach((q, i) => {
    const t = W(0, 'leaves') + i * 0.28;
    tl.fromTo(q, { opacity: 0, y: 40 }, { opacity: 0.5, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, t);
    tl.to(q, { y: -30, duration: 2.2, ease: 'sine.inOut' }, t + 0.5);
  });

  // "beat target": pen strikes, old label clears, then claim writes in order
  const sk = tBeat - 0.3;
  tl.to(pen, { opacity: 1, duration: 0.12 }, sk - 0.1);
  tl.to(strike, { scaleX: 1, duration: 0.25, ease: 'power2.inOut' }, sk);
  tl.to(pen, { x: 370, duration: 0.25, ease: 'power2.inOut' }, sk);
  tl.to(tagS, { scaleX: 1, duration: 0.25, ease: 'power2.inOut' }, sk + 0.05);
  tl.to(qs, { opacity: 0, scale: 0.6, duration: 0.25, ease: 'power2.in' }, sk + 0.1);
  tl.to([oldH, strike], { opacity: 0, y: -30, duration: 0.15, ease: 'power2.in' }, sk + 0.28);
  tl.to(pen, { opacity: 0, duration: 0.12 }, sk + 0.28);
  const wStart = sk + 0.45, wEnd = tMargin + 0.15;
  const step = Math.max(0.08, (wEnd - wStart) / words.length);
  words.forEach((w, i) => {
    tl.fromTo(w, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' }, wStart + i * step);
  });
  tl.fromTo(tagC, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25 }, tBeat);

  tl.to(tline, { opacity: 1, scaleX: 1, duration: 0.45, ease: 'power3.inOut' }, tChart - 0.15);
  tl.to(tlab, { opacity: 1, duration: 0.25 }, tChart + 0.15);
  tl.to(cam, { y: -40, duration: 1.2, ease: 'expo.inOut' }, tChart - 0.3);

  bars.forEach((b, i) => {
    const t = tProve - 0.35 + i * 0.1;
    tl.to(b, { scaleY: 1, backgroundColor: '#2EC4A0', duration: 0.5, ease: 'back.out(1.6)' }, t);
  });
  const clear = tProve - 0.35 + 0.3 + 0.25;
  tl.to(bars[3], { boxShadow: '0 0 50px rgba(46,196,160,.8)', duration: 0.3 }, clear);
  tl.fromTo(ring, { scale: 0.3, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, clear);
  tl.to(bars.slice(0, 3), { opacity: 0.7, duration: 0.4 }, clear + 0.1);
});

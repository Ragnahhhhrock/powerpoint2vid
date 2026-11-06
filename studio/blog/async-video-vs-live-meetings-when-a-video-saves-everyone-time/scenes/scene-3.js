/* Scene 3. "A video only saves time if people watch it. Keep it short, tell them why it matters up front,
 * and end with one clear next step."
 * Storyboard: paper stage. Headline "Make a video people watch" top-left. A play button pops on "video".
 * On "if people watch it" a long video timeline bar draws across the frame and the play button becomes a
 * moving playhead. On "short" the bar snaps shorter with a spring and the cut tail falls away. On "why it
 * matters up front" a coral flag pops onto the start of the bar. On "one clear next step" a teal arrow lands
 * at the bar's end, labelled "Next step". Camera glides left to right, one push on "short". */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const aVideo = ctx.at(0, 'video'), aIf = ctx.at(0, 'if'), aWatch = ctx.at(0, 'watch');
  const aShort = ctx.at(1, 'short,'), aMatters = ctx.at(1, 'matters'), aFront = ctx.at(1, 'front,');
  const aAnd = ctx.at(1, 'and'), aNext = ctx.at(1, 'next'), aStep = ctx.at(1, 'step.');
  const X0 = 200, BY = 560, BH = 28, LONG = 1520, SHORT = 1000;
  const mono = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 70% at 35% 40%, #ffffff 0%, var(--paper) 60%, #ece6da 100%)';
  el('div', 'abs', stage, { inset: 0, opacity: 0.5, backgroundImage: 'radial-gradient(rgba(28,34,51,.10) 1.5px, transparent 1.6px)', backgroundSize: '48px 48px' });

  const head = el('div', 'abs', stage, { left: '120px', top: '96px' });
  const kicker = el('div', '', head, { font: mono, letterSpacing: '.16em', color: 'var(--signal)', marginBottom: '22px' });
  kicker.textContent = 'ASYNC VIDEO';
  const h1 = el('div', '', head, { font: '800 84px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const words = ctx.split(h1, 'Make a video people watch', 'word');

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 574px' });

  const shadow = el('div', 'abs', cam, { left: X0 + 'px', top: BY + 18 + 'px', height: '30px', width: '0px', borderRadius: '20px', background: 'rgba(28,34,51,.18)', filter: 'blur(18px)' });
  const bar = el('div', 'abs', cam, { left: X0 + 'px', top: BY + 'px', height: BH + 'px', width: '0px', borderRadius: '14px', overflow: 'hidden', background: 'rgba(28,34,51,.12)', boxShadow: 'inset 0 1px 2px rgba(28,34,51,.15)' });
  const fill = el('div', 'abs', bar, { left: 0, top: 0, bottom: 0, width: '0%', borderRadius: '14px', background: 'linear-gradient(90deg, #1C2233, #3a4566)' });
  const ticks = [];
  for (let i = 1; i < 12; i++) ticks.push(el('div', 'abs', cam, { left: X0 + i * (LONG / 12) + 'px', top: BY + 6 + 'px', width: '2px', height: BH - 12 + 'px', background: 'rgba(28,34,51,.25)', opacity: 0 }));
  const ghost = el('div', 'abs', cam, { left: X0 + SHORT + 'px', top: BY + 'px', height: BH + 'px', width: LONG - SHORT + 'px', borderRadius: '14px', background: 'repeating-linear-gradient(135deg, rgba(255,107,74,.45) 0 10px, rgba(255,107,74,.15) 10px 20px)', opacity: 0 });

  const t0 = el('div', 'abs', cam, { left: X0 + 'px', top: BY + 56 + 'px', font: mono, letterSpacing: '.12em', color: 'var(--mist)', opacity: 0 });
  t0.textContent = 'START';
  const endLab = el('div', 'abs', cam, { top: BY + 56 + 'px', font: mono, letterSpacing: '.12em', color: 'var(--mist)', whiteSpace: 'nowrap', opacity: 0 });
  gsap.set(endLab, { xPercent: -100 });

  const knob = el('div', 'abs', cam, { left: X0 - 46 + 'px', top: BY + BH / 2 - 46 + 'px', width: '92px', height: '92px', borderRadius: '50%', background: 'var(--ink)', boxShadow: '0 18px 40px rgba(28,34,51,.35)' });
  const tri = el('div', 'abs', knob, { left: '36px', top: '28px', width: 0, height: 0, borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderLeft: '30px solid var(--paper)' });

  const flag = el('div', 'abs', cam, { left: X0 + 'px', top: '330px', width: '330px', height: BY - 330 + 'px', transformOrigin: '0% 100%' });
  el('div', 'abs', flag, { left: '-3px', top: 0, bottom: 0, width: '6px', borderRadius: '3px', background: 'var(--signal)' });
  const banner = el('div', 'abs', flag, { left: '3px', top: '0px', padding: '18px 30px 18px 26px', borderRadius: '0 14px 14px 0', background: 'var(--signal)', color: '#fff', font: '800 34px/1 Inter Display, Inter', letterSpacing: '-.02em', whiteSpace: 'nowrap', boxShadow: '0 20px 40px rgba(255,107,74,.35)', transformOrigin: '0% 50%' });
  banner.textContent = 'Why it matters';

  const AX0 = X0 + SHORT + 34, AX1 = AX0 + 170, AY = BY + BH / 2;
  const arrowWrap = el('div', 'abs', cam, { left: 0, top: 0, width: '1920px', height: '1080px' });
  arrowWrap.innerHTML = `<svg width="1920" height="1080" style="overflow:visible"><path id="shaft" d="M${AX0} ${AY} L ${AX1} ${AY}" fill="none" stroke="#2BB3A3" stroke-width="12" stroke-linecap="round"/>
    <path id="tip" d="M${AX1 - 34} ${AY - 34} L ${AX1 + 4} ${AY} L ${AX1 - 34} ${AY + 34}" fill="none" stroke="#2BB3A3" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const shaft = arrowWrap.querySelector('#shaft'), tip = arrowWrap.querySelector('#tip');
  const nextLab = el('div', 'abs', cam, { left: AX1 + 36 + 'px', top: AY - 34 + 'px', font: '800 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--teal)', whiteSpace: 'nowrap', transformOrigin: '0% 50%' });
  nextLab.textContent = 'Next step';
  const glow = el('div', 'abs', cam, { left: AX1 - 160 + 'px', top: AY - 160 + 'px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,179,163,.35), transparent 65%)', opacity: 0 });

  ctx.fx.vignette({ strength: 0.18 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  const S = { w: 0, p: 0 };
  ctx.onFrame((t) => {
    bar.style.width = S.w + 'px';
    shadow.style.width = S.w + 'px';
    fill.style.width = S.p * 100 + '%';
    knob.style.left = X0 + S.p * S.w - 46 + 'px';
    endLab.style.left = X0 + S.w + 'px';
    endLab.textContent = t < aShort ? 'TOO LONG' : 'SHORT · ONE TOPIC';
    endLab.style.color = t < aShort ? 'var(--signal)' : 'var(--ink)';
  });

  gsap.set([flag, banner, nextLab], { opacity: 0 });
  gsap.set(shaft, { attr: { 'stroke-dasharray': 200, 'stroke-dashoffset': 200 } });
  gsap.set(tip, { opacity: 0, scale: 0.4, transformOrigin: `${AX1}px ${AY}px` });

  tl.from(kicker, { opacity: 0, x: -20, duration: 0.5 }, 0.05);
  tl.from(words, { opacity: 0, y: 40, duration: 0.6, stagger: 0.07, ease: 'back.out(1.6)' }, 0.1);
  tl.from(knob, { scale: 0, duration: 0.6, ease: 'back.out(2)' }, Math.max(0.2, aVideo - 0.15));

  tl.fromTo(cam, { x: 40 }, { x: -60, duration: ctx.dur, ease: 'none', immediateRender: false }, 0);
  tl.to(cam, { scale: 1.05, duration: 1.0, ease: 'expo.inOut' }, aShort - 0.3);

  tl.to(S, { w: LONG, duration: 0.9, ease: 'power3.inOut' }, aIf - 0.1);
  tl.to(ticks, { opacity: 1, duration: 0.3, stagger: 0.04 }, aIf + 0.1);
  tl.to([t0, endLab], { opacity: 1, duration: 0.4 }, aIf + 0.5);
  tl.to(tri, { opacity: 0, duration: 0.25 }, aWatch - 0.1);
  tl.to(knob, { scale: 0.48, duration: 0.5, ease: 'back.out(2)' }, aWatch - 0.1);
  tl.to(S, { p: 0.2, duration: 1.0, ease: 'power2.out' }, aWatch);

  tl.set(ghost, { opacity: 1 }, aShort - 0.05);
  tl.to(ghost, { opacity: 0, y: 70, rotation: 4, duration: 0.7, ease: 'power2.in' }, aShort);
  tl.to(S, { w: SHORT, duration: 0.8, ease: 'back.out(2.2)' }, aShort - 0.05);
  tl.to(ticks.slice(7), { opacity: 0, duration: 0.15 }, aShort - 0.05);
  tl.fromTo(bar, { scaleY: 1 }, { scaleY: 1.5, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, aShort - 0.05);
  tl.fromTo(endLab, { y: -10 }, { y: 0, duration: 0.5, ease: 'back.out(3)', immediateRender: false }, aShort);

  tl.fromTo(flag, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.55, ease: 'back.out(1.8)', immediateRender: false }, aMatters - 0.3);
  tl.fromTo(banner, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'back.out(1.8)', immediateRender: false }, aMatters);
  tl.to(banner, { rotation: -3, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, aFront);

  tl.to(S, { p: 1, duration: Math.max(0.8, aNext - aAnd), ease: 'power2.inOut' }, aAnd - 0.1);

  tl.to(shaft, { attr: { 'stroke-dashoffset': 0 }, duration: 0.4, ease: 'power3.out' }, aNext - 0.3);
  tl.to(tip, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.4)' }, aNext - 0.05);
  tl.fromTo(nextLab, { opacity: 0, x: -30, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: 'back.out(1.8)', immediateRender: false }, aNext);
  tl.to(knob, { backgroundColor: '#2BB3A3', duration: 0.3 }, aNext);
  tl.fromTo(glow, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1.1, duration: 0.7, immediateRender: false }, aStep - 0.1);
});

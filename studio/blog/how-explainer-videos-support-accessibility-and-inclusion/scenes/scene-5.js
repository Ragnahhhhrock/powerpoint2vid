/* Scene 6 — "On Pro, a.i. directs the video, timing gentle animation to your narration so viewers follow by ear and eye.
 *            Try Basic first at powerpoint2vid.com."
 * Storyboard: the night stage warms to a sun glow around the opening doorway, which swings fully open. On
 * "directs the video" a paper slide card glides out through the door and grows into a playing video frame.
 * A player bar fills with a waveform, and on "timing gentle animation" the slide's bars rise softly. A caption
 * reads "…follow by ear and eye". On "Try Basic first" the frame drifts up, the doorway dissolves into warm
 * light, and two pills arrive: "Basic" highlighted, "Pro" beside it. "powerpoint2vid.com" lands at 130px in
 * paper on the final words and holds.
 */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const fin = (v, f) => (Number.isFinite(v) ? v : f);
  const b0 = ctx.beats[0], b1 = ctx.beats[1] || { t: 7.63, end: 10.32 };
  const directs = fin(ctx.at(0, 'directs'), 1.6);
  const timing = fin(ctx.at(0, 'timing'), 2.8);
  const narration = fin(ctx.at(0, 'narration'), 4.6);
  const follow = fin(ctx.at(0, 'follow'), 5.6);
  const tryT = fin(ctx.at(1, 'Try'), b1.t);
  const basicT = fin(ctx.at(1, 'Basic'), tryT + 0.3);
  const urlT = fin(ctx.at(1, 'powerpoint2vid.com'), fin(ctx.at(1, 'powerpoint2vid'), basicT + 0.6));
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'var(--night)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(55% 60% at 50% 52%, rgba(242,181,68,.42) 0%, rgba(226,96,74,.14) 45%, transparent 75%)', opacity: 0.25 });
  const cool = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(80% 70% at 50% 110%, rgba(31,138,138,.22), transparent 70%)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 520px' });

  const doorWrap = el('div', 'abs', cam, { inset: 0, perspective: '1400px' });
  const DX = 730, DY = 170, DW = 460, DH = 700;
  const spill = el('div', 'abs', doorWrap, { left: DX - 260 + 'px', top: DY + DH + 'px', width: DW + 520 + 'px', height: '210px',
    clipPath: 'polygon(36% 0, 64% 0, 100% 100%, 0 100%)', background: 'linear-gradient(180deg, rgba(242,181,68,.45), rgba(242,181,68,0))' });
  const opening = el('div', 'abs', doorWrap, { left: DX + 'px', top: DY + 'px', width: DW + 'px', height: DH + 'px', borderRadius: '230px 230px 6px 6px',
    background: 'radial-gradient(70% 60% at 50% 60%, #fff3d6 0%, #F2B544 55%, #c98a2a 100%)', boxShadow: '0 0 160px rgba(242,181,68,.55)' });
  const frame = el('div', 'abs', doorWrap, { left: DX - 14 + 'px', top: DY - 14 + 'px', width: DW + 28 + 'px', height: DH + 14 + 'px', borderRadius: '244px 244px 8px 8px',
    border: '14px solid #22324a', borderBottom: 'none', boxSizing: 'border-box' });
  const panel = el('div', 'abs', doorWrap, { left: DX + 'px', top: DY + 'px', width: DW + 'px', height: DH + 'px', borderRadius: '230px 230px 6px 6px',
    background: 'linear-gradient(90deg, #1b2a40, #24364f)', boxShadow: 'inset 0 0 0 3px rgba(201,211,222,.12)', transformOrigin: '0% 50%' });
  el('div', 'abs', panel, { right: '40px', top: '370px', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--sun)' });

  const CW = 1120, CH = 630;
  const card = el('div', 'abs', cam, { left: 960 - CW / 2 + 'px', top: '170px', width: CW + 'px', height: CH + 'px', borderRadius: '22px', overflow: 'hidden',
    background: 'var(--paper)', boxShadow: '0 50px 120px rgba(0,0,0,.55), 0 0 90px rgba(242,181,68,.25)', transformOrigin: '50% 50%' });
  el('div', 'abs', card, { left: '80px', top: '64px', width: '520px', height: '34px', borderRadius: '10px', background: 'var(--ink)' });
  el('div', 'abs', card, { left: '80px', top: '120px', width: '340px', height: '18px', borderRadius: '8px', background: 'var(--mist)' });
  const BASE = 400, bars = [130, 190, 250].map((h, i) => el('div', 'abs', card, {
    left: 640 + i * 130 + 'px', top: BASE - h + 'px', width: '90px', height: h + 'px', borderRadius: '10px 10px 3px 3px', transformOrigin: '50% 100%',
    background: i === 2 ? 'var(--teal)' : '#8fb9b9' }));
  el('div', 'abs', card, { left: '610px', top: BASE + 'px', width: '440px', height: '3px', background: 'var(--ink)', opacity: 0.5 });
  const lines = [0, 1, 2].map((i) => el('div', 'abs', card, { left: '80px', top: 200 + i * 60 + 'px', width: [420, 360, 400][i] + 'px', height: '16px', borderRadius: '8px', background: '#d9dfe6', transformOrigin: '0% 50%' }));
  const cap = el('div', 'abs', card, { left: '50%', top: '428px', transform: 'translateX(-50%)', padding: '12px 26px', borderRadius: '10px', whiteSpace: 'nowrap',
    background: 'rgba(15,26,43,.88)', font: '600 32px/1.1 Inter', color: 'var(--paper)', letterSpacing: '-.01em' });
  cap.textContent = '…viewers follow by ear and eye';
  const bar = el('div', 'abs', card, { left: 0, right: 0, bottom: 0, height: '110px', background: 'var(--ink)' });
  el('div', 'abs', bar, { left: '44px', top: '33px', width: 0, height: 0, borderTop: '22px solid transparent', borderBottom: '22px solid transparent', borderLeft: '34px solid var(--sun)' });
  const WN = 64, WX = 120, WW = 950;
  const wave = el('div', 'abs', bar, { left: WX + 'px', top: '8px', width: WW + 'px', height: '94px' });
  const wbars = Array.from({ length: WN }, (_, i) => el('div', 'abs', wave, { left: (i * WW) / WN + 'px', width: WW / WN - 6 + 'px', top: '47px', height: '4px', borderRadius: '3px', background: 'var(--mist)' }));
  const head = el('div', 'abs', bar, { left: WX + 'px', top: '12px', width: '3px', height: '86px', background: 'var(--sun)', boxShadow: '0 0 12px rgba(242,181,68,.8)' });
  const pState = { p: 0 };

  const tag = el('div', 'abs', cam, { left: 0, width: '1920px', top: '840px', textAlign: 'center', font: `600 24px/1 ${MONO}`, letterSpacing: '.18em', color: 'var(--mist)' });
  tag.textContent = 'PRO · A.I.-DIRECTED';

  const pills = el('div', 'abs', cam, { left: 0, width: '1920px', top: '440px', display: 'flex', justifyContent: 'center', gap: '28px' });
  const basic = el('div', '', pills, { padding: '22px 56px', borderRadius: '60px', background: 'var(--sun)', color: 'var(--night)', font: '800 44px/1 Inter', letterSpacing: '-.02em', boxShadow: '0 0 60px rgba(242,181,68,.5)' });
  basic.textContent = 'Basic';
  const pro = el('div', '', pills, { padding: '19px 53px', borderRadius: '60px', border: '3px solid rgba(201,211,222,.55)', color: 'var(--mist)', font: '700 44px/1 Inter', letterSpacing: '-.02em' });
  pro.textContent = 'Pro';
  const url = el('div', 'abs', cam, { left: 0, width: '1920px', top: '620px', textAlign: 'center', whiteSpace: 'nowrap', font: '800 130px/1.1 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)', textShadow: '0 0 60px rgba(242,181,68,.35)' });
  const chars = ctx.split(url, 'powerpoint2vid.com', 'char');

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const sm = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
  ctx.onFrame((t) => {
    const env = sm(b0.t - 0.2, b0.t + 0.4, t) * (1 - sm(b0.end - 0.1, b0.end + 0.3, t) * 0.7) * sm(directs, directs + 1.2, t) + 0.08;
    const p = pState.p;
    wbars.forEach((b, i) => {
      const a = Math.abs(Math.sin(t * 5.2 + i * 0.72) * Math.sin(t * 1.9 + i * 0.29) + 0.25 * Math.sin(t * 9 + i * 1.3));
      const h = 4 + 78 * env * Math.min(1, a);
      b.style.height = h.toFixed(1) + 'px';
      b.style.top = (47 - h / 2).toFixed(1) + 'px';
      b.style.background = i / WN < p ? 'var(--sun)' : 'rgba(201,211,222,.45)';
    });
    head.style.left = WX + p * WW + 'px';
  });

  gsap.set(panel, { rotationY: -40 });
  gsap.set([card, tag, cap, bar, basic, pro], { opacity: 0 });
  gsap.set(card, { scale: 0.3, y: 40 });
  gsap.set(bars, { scaleY: 0.08 });
  gsap.set(lines, { scaleX: 0.15 });
  gsap.set(chars, { opacity: 0, y: 50 });

  tl.fromTo(doorWrap, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0);
  tl.to(panel, { rotationY: -108, duration: 2.6, ease: 'power2.inOut' }, 0.2);
  tl.to(glow, { opacity: 1, duration: 5, ease: 'sine.inOut' }, 0.2);
  tl.to(cam, { scale: 1.035, x: -12, duration: ctx.dur, ease: 'sine.inOut' }, 0);

  tl.to(card, { opacity: 1, duration: 0.6, ease: 'power2.out' }, directs - 0.2);
  tl.to(card, { scale: 1, y: 0, duration: 1.8, ease: 'power2.inOut' }, directs - 0.2);
  tl.to(doorWrap, { opacity: 0.35, duration: 1.4, ease: 'sine.inOut' }, directs + 0.4);
  tl.to(bar, { opacity: 1, duration: 0.7, ease: 'sine.out' }, directs + 1.1);
  tl.to(pState, { p: 1, duration: Math.max(2, b0.end + 2.5 - (directs + 1.2)), ease: 'none' }, directs + 1.2);
  tl.to(tag, { opacity: 1, duration: 0.8, ease: 'sine.out' }, directs + 1.3);

  tl.to(lines, { scaleX: 1, duration: 1.0, stagger: 0.18, ease: 'power2.inOut' }, timing);
  tl.to(bars, { scaleY: 1, duration: 1.2, stagger: 0.25, ease: 'power2.inOut' }, Math.min(narration - 0.6, timing + 0.6));
  tl.fromTo(cap, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'sine.out', immediateRender: false }, follow - 0.15);

  tl.to(card, { y: -240, scale: 0.46, duration: 1.4, ease: 'expo.inOut' }, tryT - 0.35);
  tl.to(tag, { opacity: 0, duration: 0.5, ease: 'sine.in' }, tryT - 0.35);
  tl.to(doorWrap, { opacity: 0, duration: 1.2, ease: 'sine.inOut' }, tryT - 0.2);
  tl.fromTo(basic, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)', immediateRender: false }, basicT - 0.15);
  tl.fromTo(pro, { opacity: 0, y: 30 }, { opacity: 0.85, y: 0, duration: 0.8, ease: 'back.out(1.4)', immediateRender: false }, basicT + 0.15);

  tl.to(chars, { opacity: 1, y: 0, duration: 0.7, stagger: 0.03, ease: 'power3.out' }, urlT - 0.35);
});

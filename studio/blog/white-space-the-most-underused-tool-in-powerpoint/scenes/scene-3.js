/* Scene 3 — "Before: seven bullets, two logos and a tiny chart. After: one point, one big chart, one
 * supporting line. New customers doubled after we simplified sign-up."
 * Storyboard: split frame on paper. On "Before" the left shows a cramped slide that fills on the
 * words: seven bullets, two logos and a squeezed chart. On "After" a wipe reveals the right:
 * "New customers doubled" at 96px in ink, a big unlabelled bar chart and a small supporting line.
 * On "doubled" the latest bar grows in signal coral. The camera pushes in on it and holds while
 * the before side fades to mist. No numbers are invented. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const R = ctx.rand(7);
  const tBefore = ctx.at(0, 'Before'), tSeven = ctx.at(0, 'seven'), tLogos = ctx.at(0, 'logos'), tTiny = ctx.at(0, 'chart');
  const tAfter = ctx.at(1, 'After'), tPoint = ctx.at(1, 'point'), tBig = ctx.at(1, 'chart'), tLine = ctx.at(1, 'line');
  const tDoubled = ctx.at(2, 'doubled'), tSimpl = ctx.at(2, 'simplified');
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 60% 40%, #ffffff 0%, var(--paper) 65%, #ece9e1 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1700px 460px' });

  /* ---------- BEFORE: cramped slide ---------- */
  const bx = 90, by = 300, bw = 700, bh = 470;
  const bLab = el('div', 'abs', cam, { left: bx + 'px', top: by - 50 + 'px', font: MONO, letterSpacing: '.16em', color: 'var(--slate)' });
  bLab.textContent = 'BEFORE';
  const before = el('div', 'abs', cam, { left: bx + 'px', top: by + 'px', width: bw + 'px', height: bh + 'px', background: '#fff', borderRadius: '10px',
    boxShadow: '0 30px 70px rgba(26,29,35,.16), 0 2px 6px rgba(26,29,35,.08)', overflow: 'hidden' });
  const bTitle = el('div', 'abs', before, { left: '28px', top: '26px', width: '380px', height: '22px', borderRadius: '4px', background: 'var(--ink)' });
  const bullets = [];
  for (let i = 0; i < 7; i++) {
    const row = el('div', 'abs', before, { left: '30px', top: 78 + i * 46 + 'px', width: '480px', height: '16px' });
    el('div', 'abs', row, { left: 0, top: '3px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--slate)' });
    el('div', 'abs', row, { left: '22px', top: 0, width: 260 + R() * 200 + 'px', height: '14px', borderRadius: '3px', background: '#b9bec7' });
    if (R() > 0.4) el('div', 'abs', row, { left: '22px', top: '22px', width: 120 + R() * 180 + 'px', height: '10px', borderRadius: '3px', background: '#d6d9df' });
    bullets.push(row);
  }
  const logo1 = el('div', 'abs', before, { right: '26px', top: '18px', width: '74px', height: '40px', borderRadius: '8px', background: 'var(--calm)' });
  const logo2 = el('div', 'abs', before, { right: '112px', top: '18px', width: '40px', height: '40px', borderRadius: '50%', background: '#f4b23c' });
  const tiny = el('div', 'abs', before, { right: '26px', bottom: '24px', width: '140px', height: '84px', border: '1px solid #d0d4da', borderRadius: '4px', background: '#fafafa' });
  const tinyBars = [0.4, 0.5, 0.45, 0.6, 0.55, 1].map((h, i) =>
    el('div', 'abs', tiny, { left: 12 + i * 20 + 'px', bottom: '8px', width: '12px', height: h * 62 + 'px', background: i === 5 ? '#c9846f' : '#9aa1ab', transformOrigin: '50% 100%' }));
  const clutter = el('div', 'abs', before, { left: 0, bottom: 0, width: '100%', height: '14px', background: 'repeating-linear-gradient(90deg, var(--calm) 0 40px, #f4b23c 40px 80px)' });

  /* ---------- AFTER: spacious slide ---------- */
  const ax = 860, ay = 180, aw = 970, ah = 720;
  const aLab = el('div', 'abs', cam, { left: ax + 'px', top: ay - 50 + 'px', font: MONO, letterSpacing: '.16em', color: 'var(--signal)' });
  aLab.textContent = 'AFTER';
  const after = el('div', 'abs', cam, { left: ax + 'px', top: ay + 'px', width: aw + 'px', height: ah + 'px', background: '#fff', borderRadius: '14px',
    boxShadow: '0 50px 110px rgba(26,29,35,.18), 0 2px 8px rgba(26,29,35,.06)', overflow: 'hidden' });
  const head = el('div', 'abs', after, { left: '64px', top: '64px', width: '840px', font: '800 96px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)' });
  const hw = ctx.split(head, 'New customers doubled', 'word');
  head.insertBefore(document.createElement('br'), hw[2]);
  const BASE = 600, step = 140, bwid = 96;
  const heights = [140, 150, 145, 160, 165, 330];
  const bars = heights.map((h, i) => el('div', 'abs', after, { left: 70 + i * step + 'px', top: BASE - h + 'px', width: bwid + 'px', height: h + 'px',
    borderRadius: '10px 10px 3px 3px', transformOrigin: '50% 100%', background: i === 5 ? 'linear-gradient(180deg,#ff8a6f,var(--signal))' : 'var(--mist)',
    boxShadow: i === 5 ? '0 20px 60px rgba(255,90,60,.35)' : 'none' }));
  const coral = bars[5];
  const axis = el('div', 'abs', after, { left: '60px', top: BASE + 'px', width: '850px', height: '2px', background: 'var(--mist)', transformOrigin: '0 50%' });
  const sub = el('div', 'abs', after, { left: '64px', top: '640px', font: '500 30px/1 Inter', letterSpacing: '-.01em', color: 'var(--slate)' });
  sub.textContent = 'Sign-up went from five steps to two';

  ctx.fx.vignette({ strength: 0.2 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---------- timeline ---------- */
  gsap.set([...bullets, logo1, logo2, tiny, clutter, bLab], { opacity: 0 });
  gsap.set(tinyBars, { scaleY: 0 });
  gsap.set(before, { filter: 'grayscale(0) blur(0px)' });
  gsap.set(after, { clipPath: 'inset(0px 100% 0px 0px)' });
  gsap.set([aLab, sub, ...hw], { opacity: 0 });
  gsap.set(bars, { scaleY: 0 });
  gsap.set(axis, { scaleX: 0 });

  tl.from(before, { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0);
  tl.from(bTitle, { scaleX: 0, transformOrigin: '0 50%', duration: 0.5 }, 0.15);
  tl.to(bLab, { opacity: 1, duration: 0.4 }, tBefore - 0.1);
  tl.to(clutter, { opacity: 1, duration: 0.2 }, tBefore);
  tl.fromTo(bullets, { x: -20 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.09, ease: 'back.out(2)', immediateRender: false }, tSeven - 0.1);
  tl.fromTo([logo1, logo2], { scale: 0 }, { scale: 1, opacity: 1, duration: 0.35, stagger: 0.15, ease: 'back.out(2.5)', immediateRender: false }, tLogos - 0.15);
  tl.to(tiny, { opacity: 1, duration: 0.2 }, tTiny - 0.2);
  tl.to(tinyBars, { scaleY: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(2)' }, tTiny - 0.1);
  tl.to(before, { x: 3, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, tTiny + 0.2);

  tl.to(after, { clipPath: 'inset(0px 0% 0px 0px)', duration: 0.9, ease: 'expo.inOut' }, tAfter - 0.2);
  tl.to(aLab, { opacity: 1, duration: 0.5 }, tAfter);
  tl.to(before, { filter: 'grayscale(.6) blur(0px)', opacity: 0.8, duration: 0.8, ease: 'power2.out' }, tAfter);
  tl.fromTo(hw, { y: 50 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', immediateRender: false }, tPoint - 0.25);
  tl.to(axis, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, tBig - 0.5);
  tl.to(bars.slice(0, 5), { scaleY: 1, duration: 1.0, stagger: 0.08, ease: 'power3.out' }, tBig - 0.25);
  tl.fromTo(sub, { y: 20 }, { y: 0, opacity: 1, duration: 0.8, immediateRender: false }, tLine - 0.2);

  tl.to(coral, { scaleY: 1, duration: 1.1, ease: 'back.out(1.5)' }, tDoubled - 0.35);
  tl.to(coral, { boxShadow: '0 20px 90px rgba(255,90,60,.6)', duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tDoubled + 0.6);
  tl.to(hw[2], { color: 'var(--signal)', duration: 0.6, ease: 'power2.out' }, tDoubled);
  tl.to(before, { opacity: 0.3, filter: 'grayscale(1) blur(1px)', duration: 1.2, ease: 'power2.inOut' }, tDoubled);
  tl.to(bLab, { opacity: 0.3, duration: 1.2 }, tDoubled);
  tl.to(cam, { scale: 1.02, duration: tDoubled - 0.2, ease: 'none' }, 0);
  tl.to(cam, { scale: 1.12, duration: Math.max(1.5, tSimpl - tDoubled + 1.8), ease: 'expo.inOut' }, tDoubled - 0.2);
  tl.to(cam, { scale: 1.14, duration: 3, ease: 'power1.out' }, Math.max(tDoubled + 1.4, tSimpl + 1.6));
});

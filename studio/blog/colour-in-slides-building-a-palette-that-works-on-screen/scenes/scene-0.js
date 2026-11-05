/* Scene 0 — "Colour can make a deck look considered, or make it look messy. Here's how to build a small
 * palette that reads well on laptops, phones and in video."
 * Storyboard: Night stage. Dozens of mismatched colour chips rain down and land. On "messy" they jolt and
 * jostle chaotically. On "small palette" they collapse into a tidy row of seven swatches (the brief's
 * palette), and "A Palette That Works on Screen" sets in 120px paper type above. On "laptops", "phones"
 * and "video" three device outlines slide in beneath, each showing the same swatch row. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const messy = ctx.at(0, 'messy'), small = ctx.at(1, 'small'), palette = ctx.at(1, 'palette');
  const laptops = ctx.at(1, 'laptops'), phones = ctx.at(1, 'phones'), video = ctx.at(1, 'video');
  const R = (() => { const g = ctx.rand(7); if (typeof g === 'function') return g; let s = 1; return () => ctx.rand(s++); })();

  const PAL = ['#F6F4EF', '#C9CCD3', '#7A8091', '#1C2333', '#0F1420', '#3B82C4', '#FF5A36'];
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #1b2335 0%, #0F1420 70%), #0F1420';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(35% 30% at 50% 52%, rgba(255,90,54,.10), transparent 70%)', opacity: 0 });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });

  /* ---- chaotic chips ---- */
  const chaos = { a: 0.15 };
  const ROW_CY = 560, SLOT = 160;
  const chips = [];
  for (let i = 0; i < 56; i++) {
    const w = 44 + R() * 80, h = w * (0.6 + R() * 0.8);
    const lx = 120 + R() * (1680 - w), ly = 140 + R() * (820 - h);
    const hue = Math.floor(R() * 360), sat = 65 + Math.floor(R() * 30), lig = 45 + Math.floor(R() * 20);
    const outer = el('div', 'abs', cam, { left: lx + 'px', top: ly + 'px', width: w + 'px', height: h + 'px' });
    const inner = el('div', 'abs', outer, { inset: 0, borderRadius: (6 + R() * 14) + 'px', background: `hsl(${hue}, ${sat}%, ${lig}%)`, boxShadow: '0 12px 30px rgba(0,0,0,.45)' });
    chips.push({ outer, inner, w, h, lx, ly, slot: i % 7, p: R() * 6.28, f1: 6 + R() * 6, f2: 5 + R() * 7,
      r0: (R() - 0.5) * 180, r1: (R() - 0.5) * 50, dx: (R() - 0.5) * 160, dy: (R() - 0.5) * 120, dr: (R() - 0.5) * 70,
      start: i * 0.045, fall: 0.8 + R() * 0.5 });
  }

  /* ---- palette row ---- */
  const row = el('div', 'abs', cam, { left: 960 - 550 + 'px', top: ROW_CY - 75 + 'px', width: '1100px', height: '150px', transformOrigin: '50% 50%' });
  const sw = PAL.map((c, k) => el('div', 'abs', row, { left: k * SLOT + 'px', top: 0, width: '140px', height: '150px', borderRadius: '18px', background: c,
    border: c === '#0F1420' || c === '#1C2333' ? '2px solid rgba(255,255,255,.18)' : 'none', boxSizing: 'border-box',
    boxShadow: c === '#FF5A36' ? '0 0 60px rgba(255,90,54,.55), 0 20px 40px rgba(0,0,0,.4)' : '0 20px 40px rgba(0,0,0,.4)' }));

  /* ---- title ---- */
  const title = el('div', 'abs', cam, { left: 0, width: '1920px', top: '86px', textAlign: 'center', font: '800 120px/1.0 Inter Display, Inter', letterSpacing: '-.045em', color: '#F6F4EF' });
  const l1 = el('div', '', title), l2 = el('div', '', title);
  const words = [...ctx.split(l1, 'A Palette That', 'word'), ...ctx.split(l2, 'Works on Screen', 'word')];
  words[words.length - 1].style.color = '#FF5A36';

  /* ---- devices ---- */
  function miniRow(parent, css, gap) {
    const r = el('div', 'abs', parent, Object.assign({ display: 'flex', gap: gap + 'px' }, css));
    return PAL.map((c) => el('div', '', r, { flex: '1', borderRadius: '4px', background: c, boxSizing: 'border-box', border: c === '#0F1420' ? '1px solid rgba(255,255,255,.25)' : 'none' }));
  }
  const devStroke = '5px solid #C9CCD3';
  // laptop
  const lap = el('div', 'abs', cam, { left: '245px', top: '655px', width: '560px', height: '325px' });
  const lapScr = el('div', 'abs', lap, { left: '40px', top: 0, width: '480px', height: '300px', border: devStroke, borderRadius: '14px', background: '#0B0F18', boxSizing: 'border-box' });
  el('div', 'abs', lap, { left: 0, top: '300px', width: '560px', height: '20px', borderRadius: '4px 4px 14px 14px', background: '#C9CCD3' });
  const lapRow = miniRow(lapScr, { left: '40px', right: '40px', top: '110px', height: '70px' }, 8);
  // phone
  const ph = el('div', 'abs', cam, { left: '925px', top: '640px', width: '170px', height: '340px', border: devStroke, borderRadius: '30px', background: '#0B0F18', boxSizing: 'border-box' });
  el('div', 'abs', ph, { left: '55px', top: '12px', width: '50px', height: '8px', borderRadius: '4px', background: '#7A8091' });
  const phRow = miniRow(ph, { left: '14px', right: '14px', top: '140px', height: '44px' }, 3);
  // video player
  const vid = el('div', 'abs', cam, { left: '1215px', top: '700px', width: '460px', height: '270px', border: devStroke, borderRadius: '14px', background: '#0B0F18', boxSizing: 'border-box', overflow: 'hidden' });
  const vidRow = miniRow(vid, { left: '36px', right: '36px', top: '70px', height: '60px' }, 7);
  el('div', 'abs', vid, { left: '36px', top: '172px', width: 0, height: 0, borderLeft: '22px solid #F6F4EF', borderTop: '13px solid transparent', borderBottom: '13px solid transparent' });
  const bar = el('div', 'abs', vid, { left: '80px', right: '36px', top: '183px', height: '5px', borderRadius: '3px', background: 'rgba(201,204,211,.25)' });
  const prog = el('div', 'abs', bar, { left: 0, top: 0, bottom: 0, width: '100%', borderRadius: '3px', background: '#FF5A36', transformOrigin: '0 50%' });
  const devTag = el('div', 'abs', cam, { left: 0, width: '1920px', top: '596px', textAlign: 'center', font: MONO, letterSpacing: '.18em', color: '#7A8091' });
  devTag.textContent = 'SAME SEVEN · EVERY SCREEN';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  ctx.onFrame((t) => {
    const a = chaos.a;
    chips.forEach((c) => {
      const x = Math.sin(t * c.f1 + c.p) * 14 * a, y = Math.cos(t * c.f2 + c.p) * 12 * a, r = Math.sin(t * c.f2 * 0.8 + c.p) * 12 * a;
      c.inner.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
    });
  });

  /* ---- timeline ---- */
  gsap.set([...sw], { opacity: 0, scale: 0.4 });
  gsap.set(words, { opacity: 0, y: 60 });
  gsap.set([lap, ph, vid], { opacity: 0, y: 90 });
  gsap.set([...lapRow, ...phRow, ...vidRow], { scaleY: 0, transformOrigin: '50% 100%' });
  gsap.set(prog, { scaleX: 0 });
  gsap.set(devTag, { opacity: 0 });

  tl.to(cam, { scale: 1.035, duration: ctx.dur, ease: 'none' }, 0);

  // rain
  chips.forEach((c) => {
    tl.fromTo(c.outer, { y: -(c.ly + c.h + 200), rotation: c.r0 }, { y: 0, rotation: c.r1, duration: c.fall, ease: 'bounce.out' }, c.start);
  });
  // "messy": jolt and jostle
  tl.to(chaos, { a: 1.3, duration: 0.3, ease: 'power2.out' }, messy - 0.1);
  chips.forEach((c) => {
    tl.to(c.outer, { x: c.dx, y: c.dy, rotation: c.r1 + c.dr, duration: 0.7, ease: 'elastic.out(1, 0.5)' }, messy - 0.05 + c.p * 0.02);
  });
  tl.to(chaos, { a: 0.5, duration: 1.0, ease: 'power1.inOut' }, messy + 0.5);
  tl.to(chaos, { a: 0, duration: 0.4 }, small - 0.4);

  // "small palette": collapse into seven
  chips.forEach((c, i) => {
    const cx = 960 + (c.slot - 3) * SLOT, t0 = small - 0.35 + (i % 14) * 0.012;
    tl.to(c.outer, { x: cx - (c.lx + c.w / 2), y: ROW_CY - (c.ly + c.h / 2), rotation: 0, scale: 0.45, duration: 0.75, ease: 'expo.inOut' }, t0);
    tl.to(c.inner, { backgroundColor: PAL[c.slot], duration: 0.5, ease: 'power2.inOut' }, t0 + 0.15);
    tl.to(c.outer, { opacity: 0, duration: 0.18, ease: 'power1.in' }, t0 + 0.62);
  });
  tl.to(sw, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.05 }, palette - 0.05);
  tl.to(glow, { opacity: 1, duration: 1.0, ease: 'power2.out' }, palette);
  tl.to(words, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07 }, palette + 0.15);
  tl.fromTo(sw[6], { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, palette + 0.45);

  // devices
  tl.to(row, { y: -115, scale: 0.87, duration: 0.7, ease: 'expo.inOut' }, laptops - 0.5);
  tl.to(devTag, { opacity: 1, duration: 0.5 }, laptops);
  [[lap, lapRow, laptops], [ph, phRow, phones], [vid, vidRow, video]].forEach(([d, r, t]) => {
    tl.to(d, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }, t - 0.12);
    tl.to(r, { scaleY: 1, duration: 0.45, ease: 'back.out(1.8)', stagger: 0.04 }, t + 0.15);
  });
  tl.to(prog, { scaleX: 1, duration: ctx.dur - video - 0.1, ease: 'none' }, video + 0.1);
});

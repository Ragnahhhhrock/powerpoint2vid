/* Scene 4 — "List timestamps starting at zero, one per line with a title. Your section divider slides
 * and point-making headlines become ready-made chapter titles."
 * Storyboard: night stage, extreme close-up on a giant red '0:00'. On 'zero' it pulses. On 'one per line'
 * the camera pulls back and three more timestamps stack below it. On 'section divider slides' deck
 * thumbnails fly in from the right and snap onto each line, and their headlines lift off to become
 * chapter titles. On 'ready-made chapter titles' a segmented YouTube-style progress bar forms beneath,
 * each segment lights in sequence, and the frame holds. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const T = (i, w, f) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : f; };
  const zero = T(0, 'zero', 2.0), perLine = T(0, 'one', 2.6), titleW = T(0, 'title', 3.9);
  const section = T(1, 'section', 5.0), headlines = T(1, 'headlines', 6.4), ready = T(1, 'ready', 7.6);

  // Illustrative example chapters. Thumbnails come from the deck's slides.
  const ROWS = [
    ['0:00', 'Why the upload matters', 'slide-1.png'],
    ['1:12', 'Export & review', 'slide-2.png'],
    ['3:05', 'Titles people search', 'slide-3.png'],
    ['5:40', 'Build chapters', 'slide-4.png'],
  ];
  const SECS = [0, 72, 185, 340], TOTAL = 440;
  const Y0 = 190, STEP = 150;

  stage.style.background = 'radial-gradient(60% 55% at 30% 35%, #1d2130 0%, var(--night) 70%)';
  const drift = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 50%' });
  const cam = el('div', 'abs', drift, { left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: '0 0' });

  const glow = el('div', 'abs', cam, { left: '40px', top: Y0 - 160 + 'px', width: '520px', height: '440px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(232,57,47,.35), transparent)', opacity: 0 });

  const label = el('div', 'abs', cam, { left: '184px', top: '104px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: 'var(--slate)' });
  label.textContent = 'DESCRIPTION · CHAPTERS';

  const rows = ROWS.map(([ts, title, img], i) => {
    const y = Y0 + i * STEP;
    const rule = el('div', 'abs', cam, { left: '180px', top: y + 140 + 'px', width: '1560px', height: '1px',
      background: 'linear-gradient(90deg, rgba(138,147,163,.35), rgba(138,147,163,.05))', transformOrigin: '0 50%' });
    const t = el('div', 'abs', cam, { left: '180px', top: y + 24 + 'px', font: '800 84px/1 Inter Display, Inter', letterSpacing: '-.04em',
      color: i === 0 ? 'var(--signal red, #E8392F)' : 'var(--paper)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' });
    t.style.color = i === 0 ? '#E8392F' : '#F6F3EE';
    t.textContent = ts;
    const thumb = el('div', 'abs', cam, { left: '1500px', top: y + 'px', width: '240px', height: '135px', borderRadius: '10px', overflow: 'hidden',
      background: '#fff', boxShadow: '0 24px 50px rgba(0,0,0,.55), 0 0 0 2px rgba(255,255,255,.15)' });
    const im = el('img', 'abs', thumb, { inset: 0, width: '100%', height: '100%', objectFit: 'cover' }); im.src = ctx.asset(img);
    const ttl = el('div', 'abs', cam, { left: '520px', top: y + 40 + 'px', width: '940px', font: '800 56px/1.1 Inter Display, Inter', letterSpacing: '-.035em',
      color: '#F6F3EE', whiteSpace: 'nowrap', transformOrigin: '0 50%' });
    ttl.textContent = title;
    return { t, rule, thumb, ttl, y };
  });

  // progress bar
  const BX = 180, BW = 1560, BY = 880, GAP = 8;
  const bar = el('div', 'abs', cam, { left: BX + 'px', top: BY + 'px', width: BW + 'px', height: '16px' });
  const segs = SECS.map((s, i) => {
    const e = i < SECS.length - 1 ? SECS[i + 1] : TOTAL;
    const x = (s / TOTAL) * BW + (i ? GAP / 2 : 0), w = ((e - s) / TOTAL) * BW - (i ? GAP / 2 : 0) - (i < SECS.length - 1 ? GAP / 2 : 0);
    const track = el('div', 'abs', bar, { left: x + 'px', top: 0, width: w + 'px', height: '16px', borderRadius: '4px', background: 'rgba(138,147,163,.28)', transformOrigin: '0 50%' });
    const fill = el('div', 'abs', track, { inset: 0, borderRadius: '4px', background: 'linear-gradient(90deg, #ff6a5c, #E8392F)',
      boxShadow: '0 0 24px rgba(232,57,47,.7)', transformOrigin: '0 50%' });
    return { track, fill, x, w };
  });
  const head = el('div', 'abs', bar, { left: '-12px', top: '-6px', width: '28px', height: '28px', borderRadius: '50%', background: '#E8392F', boxShadow: '0 0 30px rgba(232,57,47,.9)' });
  const tStart = el('div', 'abs', cam, { left: BX + 'px', top: BY + 40 + 'px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: 'var(--slate)' });
  tStart.textContent = '0:00';
  const tEnd = el('div', 'abs', cam, { left: BX + BW - 200 + 'px', width: '200px', textAlign: 'right', top: BY + 40 + 'px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.1em', color: 'var(--slate)' });
  tEnd.textContent = '7:20';

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---- initial states ---- */
  const r0 = rows[0];
  gsap.set(cam, { scale: 2, x: 400, y: 960 * 0 + 540 - 2 * (r0.y + 66) });
  gsap.set([label, ...rows.slice(1).map((r) => r.t), ...rows.map((r) => r.rule), ...rows.map((r) => r.thumb), ...rows.map((r) => r.ttl), bar, tStart, tEnd, head], { opacity: 0 });
  gsap.set(rows.map((r) => r.rule), { scaleX: 0 });
  gsap.set(segs.map((s) => s.fill), { scaleX: 0 });
  gsap.set(segs.map((s) => s.track), { scaleX: 0 });
  gsap.set(r0.t, { filter: 'brightness(1)' });

  /* ---- timeline ---- */
  tl.fromTo(r0.t, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 0.05);
  tl.to(glow, { opacity: 1, duration: 0.8 }, 0.1);
  tl.to(drift, { scale: 1.04, duration: ctx.dur, ease: 'none' }, 0);
  // "zero": pulse
  tl.to(r0.t, { scale: 1.08, filter: 'brightness(1.4)', duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, zero - 0.05);
  tl.to(glow, { scale: 1.25, duration: 0.3, yoyo: true, repeat: 1 }, zero - 0.05);

  // "one per line": pull back, stack
  tl.to(cam, { scale: 1, x: 0, y: 0, duration: 1.2, ease: 'expo.inOut' }, perLine - 0.2);
  tl.to(glow, { opacity: 0.45, duration: 1 }, perLine);
  tl.to(label, { opacity: 1, duration: 0.5 }, perLine + 0.6);
  rows.forEach((r, i) => {
    tl.to(r.rule, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power3.out' }, perLine + 0.4 + i * 0.12);
    if (i) tl.fromTo(r.t, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.7)', immediateRender: false }, perLine + 0.45 + i * 0.16);
  });
  // "title": brief placeholder shimmer on rules
  tl.to(rows.map((r) => r.rule), { background: 'linear-gradient(90deg, rgba(245,166,35,.6), rgba(245,166,35,.05))', duration: 0.3, yoyo: true, repeat: 1, stagger: 0.06 }, titleW);

  // "section divider slides": thumbnails fly in, headlines lift off
  const gap = Math.max(0.3, Math.min(0.5, (ready - section - 0.6) / 4));
  rows.forEach((r, i) => {
    const t = section + i * gap;
    tl.fromTo(r.thumb, { opacity: 0, x: 520, rotation: 8, scale: 0.85 }, { opacity: 1, x: 0, rotation: 0, scale: 1, duration: 0.55, ease: 'back.out(1.5)', immediateRender: false }, t);
    tl.to(r.thumb, { y: 6, duration: 0.07, yoyo: true, repeat: 1, ease: 'power2.out' }, t + 0.5);
    tl.fromTo(r.ttl, { opacity: 0, x: 980, y: -30, scale: 0.4 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7, ease: 'expo.out', immediateRender: false }, t + 0.35);
    tl.to(r.thumb, { opacity: 0.55, scale: 0.9, duration: 0.5 }, t + 0.6);
  });

  // "ready-made chapter titles": progress bar forms, segments light in sequence
  const pb = ready - 0.3;
  tl.to([bar, tStart, tEnd], { opacity: 1, duration: 0.4 }, pb);
  tl.to(segs.map((s) => s.track), { scaleX: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, pb);
  tl.to(head, { opacity: 1, duration: 0.2 }, pb + 0.4);
  segs.forEach((s, i) => {
    const t = pb + 0.5 + i * 0.32;
    tl.to(s.fill, { scaleX: 1, duration: 0.32, ease: 'none' }, t);
    tl.to(head, { left: s.x + s.w - 14 + 'px', duration: 0.32, ease: 'none' }, t);
    tl.to(rows[i].t, { color: '#E8392F', duration: 0.2 }, t);
    tl.fromTo(rows[i].ttl, { textShadow: '0 0 0px rgba(232,57,47,0)' }, { textShadow: '0 0 28px rgba(232,57,47,.6)', duration: 0.25, yoyo: true, repeat: 1, immediateRender: false }, t);
  });
  tl.to(cam, { scale: 1.02, x: -18, y: -10, duration: Math.max(1, ctx.dur - pb), ease: 'power1.inOut' }, pb);
});

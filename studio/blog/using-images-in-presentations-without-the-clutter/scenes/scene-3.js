/* Scene 3: "Pick one layout per slide. If a headline sits over a photo, find the quiet part, or add a contrast band behind it."
 * Storyboard: a full-bleed abstract street photo is built procedurally. It has a calm sky above and a busy, lit-up street below.
 * A white headline lands over the busy lower half, where it is hard to read. On "quiet" it glides up into the sky and turns crisp ink.
 * On "contrast band" a translucent night band wipes in low, and a second headline rises inside it.
 * Amber data labels "4.5:1" and "3:1 large text" tick in at the band's corner. Slow push-in throughout. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const safe = (i, w, fb) => { const v = ctx.at(i, w); return (typeof v === 'number' && isFinite(v)) ? v : fb; };
  const layoutT = safe(0, 'layout', 1.1);
  const quiet = safe(1, 'quiet', 4.6);
  const band = safe(1, 'contrast', 6.4);

  let seed = 7;
  const R = ctx.rand(7);
  const r = typeof R === 'function' ? R : () => ctx.rand(seed++);

  stage.style.background = 'var(--night)';

  /* ---------- the "photo" (camera layer) ---------- */
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 45%' });
  const sky = el('div', 'abs', cam, { inset: 0,
    background: 'linear-gradient(180deg, #b9cbd8 0%, #d7dfe2 32%, #efe4d2 50%, #f2c79a 58%, #3a3340 70%)' });
  el('div', 'abs', cam, { inset: 0, background: 'radial-gradient(40% 30% at 30% 22%, rgba(255,255,255,.55), transparent 70%)' });

  const W = 1920, H = 1080;
  let svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>
    <filter id="bk" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="bk2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter></defs>`;
  const bcols = ['#2a2d3b', '#3b3346', '#5B6275', '#4a2f2c', '#1f3a3a', '#6b3b30', '#2c2f44'];
  // back row of buildings
  let x = -30;
  while (x < W + 30) {
    const w = 70 + r() * 150, top = 540 + r() * 200;
    svg += `<rect x="${x}" y="${top}" width="${w}" height="${H - top}" fill="${bcols[Math.floor(r() * bcols.length)]}"/>`;
    for (let wy = top + 14; wy < 960; wy += 26) for (let wx = x + 10; wx < x + w - 14; wx += 22) {
      if (r() < 0.55) { const c = r() < 0.6 ? '#F2A541' : (r() < 0.5 ? '#f6f3ec' : '#2BB3A3');
        svg += `<rect x="${wx}" y="${wy}" width="11" height="14" fill="${c}" opacity="${0.45 + r() * 0.55}"/>`; }
    }
    x += w + 4;
  }
  // front row, taller and brighter
  x = -60;
  while (x < W + 60) {
    const w = 120 + r() * 220, top = 650 + r() * 180;
    svg += `<rect x="${x}" y="${top}" width="${w}" height="${H - top}" fill="${bcols[Math.floor(r() * bcols.length)]}"/>`;
    svg += `<rect x="${x + 12}" y="${top + 20}" width="${w * 0.6}" height="38" rx="4" fill="${['#E8604C', '#2BB3A3', '#F2A541', '#f6f3ec'][Math.floor(r() * 4)]}" opacity=".85"/>`;
    for (let wy = top + 80; wy < 1000; wy += 34) for (let wx = x + 14; wx < x + w - 20; wx += 30) {
      if (r() < 0.5) svg += `<rect x="${wx}" y="${wy}" width="16" height="20" fill="${r() < 0.5 ? '#F2A541' : '#f6f3ec'}" opacity="${0.4 + r() * 0.6}"/>`;
    }
    x += w + 10;
  }
  // street, crosswalk
  svg += `<rect x="0" y="960" width="${W}" height="120" fill="#16171f"/>`;
  for (let i = 0; i < 24; i++) svg += `<rect x="${i * 84}" y="1000" width="46" height="70" fill="#f6f3ec" opacity=".75" transform="skewX(-20)"/>`;
  svg += `</svg>`;
  const city = el('div', 'abs', cam, { inset: 0 });
  city.innerHTML = svg;

  // bokeh lights, which twinkle per frame
  const bokehLayer = el('div', 'abs', cam, { inset: 0 });
  const bokeh = [];
  const bc = ['#F2A541', '#E8604C', '#2BB3A3', '#ffffff', '#ffd27a'];
  for (let i = 0; i < 70; i++) {
    const s = 14 + r() * 70;
    const b = el('div', 'abs', bokehLayer, { left: r() * W + 'px', top: 620 + r() * 440 + 'px', width: s + 'px', height: s + 'px', borderRadius: '50%',
      background: bc[Math.floor(r() * bc.length)], filter: `blur(${2 + r() * 8}px)`, mixBlendMode: 'screen' });
    bokeh.push({ b, ph: r() * 6.28, sp: 0.8 + r() * 2, base: 0.35 + r() * 0.5 });
  }
  ctx.onFrame((t) => bokeh.forEach((o) => { o.b.style.opacity = (o.base + 0.25 * Math.sin(t * o.sp + o.ph)).toFixed(3); }));

  /* ---------- text layer ---------- */
  const txt = el('div', 'abs', stage, { inset: 0, transformOrigin: '50% 45%' });
  const lbl = el('div', 'abs', txt, { left: '160px', top: '120px', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.16em', color: 'var(--ink)' });
  lbl.textContent = 'ONE LAYOUT PER SLIDE';
  const head = el('div', 'abs', txt, { left: '160px', top: '720px', font: '900 104px/1 Inter Display, Inter', letterSpacing: '-.04em', color: '#ffffff', whiteSpace: 'nowrap' });
  head.textContent = 'Keep text off busy areas';
  const skyGlow = el('div', 'abs', txt, { left: '60px', top: '120px', width: '1500px', height: '360px', background: 'radial-gradient(50% 50% at 45% 55%, rgba(255,255,255,.55), transparent 75%)', opacity: 0 });
  txt.insertBefore(skyGlow, head);

  const bandEl = el('div', 'abs', txt, { left: '-60px', width: '2040px', top: '790px', height: '190px', background: 'rgba(20,22,28,.86)', boxShadow: '0 -20px 80px rgba(0,0,0,.35)' });
  const bandEdge = el('div', 'abs', bandEl, { left: 0, right: 0, top: 0, height: '3px', background: 'linear-gradient(90deg, var(--amber), transparent 60%)' });
  const head2 = el('div', 'abs', txt, { left: '160px', top: '842px', font: '800 80px/1.05 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--paper)', whiteSpace: 'nowrap', overflow: 'hidden', paddingBottom: '6px' });
  const h2w = ctx.split(head2, 'Or add a contrast band', 'word');
  h2w.forEach((s) => { s.style.marginRight = '0.22em'; });

  const lab = el('div', 'abs', txt, { right: '160px', top: '826px', textAlign: 'right', fontFamily: 'ui-monospace, Menlo, monospace', color: 'var(--amber)' });
  const l1 = el('div', '', lab, { font: '700 54px/1 ui-monospace, Menlo, monospace', letterSpacing: '.02em' });
  const l2 = el('div', '', lab, { font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', marginTop: '16px', opacity: 0.9 });
  const cnt = { a: 0, b: 0 };
  ctx.onFrame(() => {
    l1.textContent = cnt.a.toFixed(1) + ':1';
    l2.textContent = Math.round(cnt.b) + ':1 LARGE TEXT';
  });

  ctx.fx.vignette({ strength: 0.45 });
  ctx.fx.grain({ opacity: 0.06 });

  /* ---------- timeline ---------- */
  // camera: slow push throughout
  tl.fromTo(cam, { scale: 1.0 }, { scale: 1.08, duration: ctx.dur, ease: 'none' }, 0);
  tl.fromTo(txt, { scale: 1.0 }, { scale: 1.03, duration: ctx.dur, ease: 'none' }, 0);

  // headline lands on the busy half, hard to read
  gsap.set(head, { filter: 'blur(1.4px)', textShadow: '0 0 0 rgba(0,0,0,0)' });
  tl.fromTo(head, { y: 40, opacity: 0 }, { y: 0, opacity: 0.92, duration: 0.8, ease: 'back.out(1.4)' }, 0.25);
  gsap.set(lbl, { opacity: 0 });
  tl.fromTo(lbl, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, layoutT - 0.1);
  // small jitter to show it fighting the background
  tl.to(head, { x: 4, duration: 0.07, yoyo: true, repeat: 3, ease: 'none' }, 2.9);

  // "quiet": glide into the sky and turn crisp
  tl.to(head, { y: -500, duration: 1.4, ease: 'power3.inOut' }, quiet - 0.35);
  tl.to(head, { color: '#1F2230', opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' }, quiet + 0.2);
  tl.to(skyGlow, { opacity: 1, duration: 1.0 }, quiet + 0.3);
  tl.to(lbl, { opacity: 0, y: -10, duration: 0.35, ease: 'power2.in' }, quiet - 0.35);

  // "contrast band": wipe in, second headline rises
  gsap.set(bandEl, { clipPath: 'inset(0% 100% 0% 0%)' });
  tl.to(bandEl, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' }, band - 0.2);
  tl.from(bandEdge, { opacity: 0, duration: 0.5 }, band + 0.4);
  tl.from(h2w, { yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, band + 0.25);

  // amber data labels tick in
  gsap.set(lab, { opacity: 0 });
  tl.to(lab, { opacity: 1, duration: 0.3 }, band + 0.55);
  tl.to(cnt, { a: 4.5, duration: 0.9, ease: 'power2.out' }, band + 0.55);
  tl.fromTo(l2, { opacity: 0, y: 8 }, { opacity: 0.9, y: 0, duration: 0.4, immediateRender: false }, band + 0.95);
  tl.to(cnt, { b: 3, duration: 0.6, ease: 'power2.out' }, band + 0.95);
  tl.to(l1, { textShadow: '0 0 24px rgba(242,165,65,.7)', duration: 0.5, yoyo: true, repeat: 1 }, band + 1.45);
});

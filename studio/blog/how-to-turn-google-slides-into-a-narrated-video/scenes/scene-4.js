/* Scene 4 — "Listen for mispronounced names and awkward lines, then fix them in your speaker notes.
 *  A twenty-slide segment becomes a focused video of roughly seven to ten minutes."
 * Storyboard: Paper stage. A live waveform scrolls beside a headphones icon. On "mispronounced names"
 * and "awkward lines" two coral flags pin to the wave. On "fix them" the flags and the matching
 * highlights in a speaker-notes panel turn mint and get checkmarks. On "twenty-slide segment" the
 * camera pulls wide: twenty slide tiles pop in, then on "becomes" compress into one video bar.
 * "≈ 7" lands on "seven", "–10 min" on "ten" (140px). MP4 / WebM chips settle beneath. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tMis = W(0, 'mispronounced'), tAwk = W(0, 'awkward'), tFix = W(0, 'fix'), tNotes = W(0, 'speaker');
  const tTwenty = W(1, 'twenty-slide'), tBecomes = W(1, 'becomes'), tFocused = W(1, 'focused');
  const tSeven = W(1, 'seven'), tTen = W(1, 'ten');
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 35%, #ffffff 0%, var(--paper) 60%, #ebe5da 100%)';
  const glow = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 35% at 30% 30%, rgba(61,123,255,.07), transparent 70%)' });

  /* ================= PART 1 — listen & fix ================= */
  const cam1 = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  // headphones
  const hp = el('div', 'abs', cam1, { left: '150px', top: '250px', width: '150px', height: '150px', borderRadius: '50%', background: '#fff', boxShadow: '0 24px 60px rgba(27,34,51,.14)' });
  hp.innerHTML = `<svg width="150" height="150" viewBox="0 0 150 150"><path d="M42 88 V76 a33 33 0 0 1 66 0 V88" fill="none" stroke="#1B2233" stroke-width="8" stroke-linecap="round"/>
    <rect x="34" y="82" width="20" height="34" rx="8" fill="#3D7BFF"/><rect x="96" y="82" width="20" height="34" rx="8" fill="#3D7BFF"/></svg>`;
  const hpRing = el('div', 'abs', cam1, { left: '150px', top: '250px', width: '150px', height: '150px', borderRadius: '50%', border: '3px solid var(--signal)', opacity: 0 });

  // waveform canvas
  const CL = 340, CT = 200, CW = 1420, CH = 250;
  const cv = el('canvas', 'abs', cam1, { left: CL + 'px', top: CT + 'px', width: CW + 'px', height: CH + 'px',
    WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' });
  cv.width = CW; cv.height = CH;
  const g = cv.getContext('2d');
  const R = ctx.rand(7), N = 500, HTS = [];
  for (let i = 0; i < N; i++) HTS.push(0.18 + 0.82 * Math.pow(R(), 1.4) * (0.6 + 0.4 * Math.sin(i * 0.21)));
  const SPEED = 60;

  // flags (wrap = scroll position via onFrame; inner = pop tween)
  const mkFlag = (label, sx, pinT) => {
    const world = sx + SPEED * pinT;
    const wrap = el('div', 'abs', cam1, { left: CL + 'px', top: CT - 70 + 'px', width: '0px', height: '0px' });
    const inner = el('div', 'abs', wrap, { left: '0px', top: '0px', width: '160px', height: '290px', transformOrigin: '0% 100%' });
    el('div', 'abs', inner, { left: '-2px', top: '0px', width: '4px', height: '290px', borderRadius: '2px', background: 'var(--ink)' });
    const pen = el('div', 'abs', inner, { left: '2px', top: '0px', height: '54px', padding: '0 22px', borderRadius: '0 12px 12px 0', background: 'var(--coral)', boxShadow: '0 12px 30px rgba(255,107,87,.35)',
      display: 'flex', alignItems: 'center', font: `700 22px/1 ${MONO}`, letterSpacing: '.12em', color: '#fff', whiteSpace: 'nowrap' });
    pen.textContent = label;
    const penOk = el('div', 'abs', inner, { left: '2px', top: '0px', height: '54px', padding: '0 22px', borderRadius: '0 12px 12px 0', background: 'var(--mint)', boxShadow: '0 12px 30px rgba(60,203,154,.4)',
      display: 'flex', alignItems: 'center', font: `700 22px/1 ${MONO}`, letterSpacing: '.12em', color: '#fff', whiteSpace: 'nowrap', opacity: 0 });
    penOk.textContent = label + ' ✓';
    const pinDot = el('div', 'abs', inner, { left: '-9px', top: '281px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--ink)' });
    return { world, wrap, inner, pen, penOk, pinDot, pinT, fix: { v: 0 } };
  };
  const flags = [mkFlag('NAME', 560, tMis), mkFlag('LINE', 980, tAwk)];

  // speaker notes panel
  const panel = el('div', 'abs', cam1, { left: CL + 'px', top: '560px', width: CW + 'px', height: '340px', borderRadius: '24px', background: '#fff', boxShadow: '0 30px 80px rgba(27,34,51,.13)', overflow: 'hidden' });
  const ph = el('div', 'abs', panel, { left: '56px', top: '42px', font: `700 22px/1 ${MONO}`, letterSpacing: '.16em', color: 'var(--slate)' });
  ph.textContent = 'SPEAKER NOTES';
  const lineSpecs = [[0.92, null], [0.78, [0.34, 0.2]], [0.88, null], [0.66, [0.42, 0.22]]];
  const hls = [];
  lineSpecs.forEach(([w, hl], i) => {
    const y = 110 + i * 52, lw = (CW - 112) * w;
    el('div', 'abs', panel, { left: '56px', top: y + 'px', width: lw + 'px', height: '18px', borderRadius: '9px', background: '#e6e2da' });
    if (hl) {
      const hx = 56 + lw * hl[0], hw = lw * hl[1];
      const bad = el('div', 'abs', panel, { left: hx - 8 + 'px', top: y - 10 + 'px', width: hw + 16 + 'px', height: '38px', borderRadius: '10px', background: 'rgba(255,107,87,.22)', border: '2px solid var(--coral)', opacity: 0 });
      const good = el('div', 'abs', panel, { left: hx - 8 + 'px', top: y - 10 + 'px', width: hw + 16 + 'px', height: '38px', borderRadius: '10px', background: 'rgba(60,203,154,.22)', border: '2px solid var(--mint)', opacity: 0 });
      const chk = el('div', 'abs', panel, { left: hx + hw + 22 + 'px', top: y - 12 + 'px', width: '42px', height: '42px', borderRadius: '50%', background: 'var(--mint)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', font: '800 24px/1 Inter', opacity: 0 });
      chk.textContent = '✓';
      hls.push({ bad, good, chk });
    }
  });

  /* ================= PART 2 — twenty slides -> one video ================= */
  const cam2 = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const head2 = el('div', 'abs', cam2, { left: '0px', width: '1920px', top: '120px', textAlign: 'center', font: `700 26px/1 ${MONO}`, letterSpacing: '.2em', color: 'var(--slate)' });
  const TW = 200, TH = 112, GAP = 30, GX = (1920 - (5 * TW + 4 * GAP)) / 2, GY = 210;
  const BX = 260, BY = 330, BW = 1400, BH = 100;
  const tileColors = ['#3D7BFF', '#FF6B57', '#3CCB9A', '#1B2233'];
  const tiles = [];
  for (let i = 0; i < 20; i++) {
    const c = i % 5, r = Math.floor(i / 5);
    const t = el('div', 'abs', cam2, { left: GX + c * (TW + GAP) + 'px', top: GY + r * (TH + GAP) + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '10px', background: '#fff',
      boxShadow: '0 14px 34px rgba(27,34,51,.14)', overflow: 'hidden' });
    el('div', 'abs', t, { left: '12%', top: '18%', width: '55%', height: '12%', borderRadius: '4px', background: tileColors[(i * 3) % 4] });
    el('div', 'abs', t, { left: '12%', top: '44%', width: '76%', height: '8%', borderRadius: '4px', background: '#e6e2da' });
    el('div', 'abs', t, { left: '12%', top: '62%', width: '60%', height: '8%', borderRadius: '4px', background: '#e6e2da' });
    tiles.push(t);
  }
  // video bar
  const vbar = el('div', 'abs', cam2, { left: BX + 'px', top: BY + 'px', width: BW + 'px', height: BH + 'px', borderRadius: '22px', background: 'var(--night)',
    boxShadow: '0 30px 80px rgba(14,20,36,.35), 0 0 60px rgba(61,123,255,.25)', overflow: 'hidden', opacity: 0 });
  const play = el('div', 'abs', vbar, { left: '26px', top: '20px', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--signal)' });
  play.innerHTML = '<svg width="60" height="60"><path d="M25 19 L43 30 L25 41 Z" fill="#fff"/></svg>';
  const track = el('div', 'abs', vbar, { left: '116px', top: '44px', width: BW - 160 + 'px', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,.14)' });
  const prog = el('div', 'abs', track, { left: '0px', top: '0px', height: '12px', width: '0px', borderRadius: '6px', background: 'linear-gradient(90deg, #3D7BFF, #7aa6ff)' });
  const knob = el('div', 'abs', track, { left: '-12px', top: '-6px', width: '24px', height: '24px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 18px rgba(61,123,255,.8)' });

  const big = el('div', 'abs', cam2, { left: '0px', width: '1920px', top: '485px', textAlign: 'center', font: '900 140px/1 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)', whiteSpace: 'nowrap' });
  const b1 = el('span', '', big, { display: 'inline-block' }); b1.textContent = '≈ 7';
  const b2 = el('span', '', big, { display: 'inline-block', color: 'var(--signal)' }); b2.textContent = '–10 min';
  const chipRow = el('div', 'abs', cam2, { left: '0px', width: '1920px', top: '700px', display: 'flex', justifyContent: 'center', gap: '24px' });
  const chips = ['MP4', 'WebM'].map((s) => {
    const c = el('div', '', chipRow, { padding: '18px 34px', borderRadius: '999px', background: '#fff', border: '2px solid #ddd6ca', font: `700 26px/1 ${MONO}`, letterSpacing: '.12em', color: 'var(--ink)', boxShadow: '0 12px 30px rgba(27,34,51,.1)' });
    c.textContent = s; return c;
  });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05, blend: 'multiply' });

  /* ---- per-frame: waveform, flag scroll, labels ---- */
  const lerp = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const SL = [138, 147, 166], CO = [255, 107, 87], MI = [60, 203, 154];
  const playT = { p: 0 };
  ctx.onFrame((t) => {
    g.clearRect(0, 0, CW, CH);
    const off = t * SPEED, mid = CH / 2;
    for (let x = -(off % 10); x < CW; x += 10) {
      const world = x + off, idx = Math.floor(world / 10);
      const h = HTS[((idx % N) + N) % N] * (0.85 + 0.15 * Math.sin(t * 7 + idx * 0.9)) * (CH * 0.82);
      let col = SL;
      flags.forEach((f) => {
        if (t >= f.pinT - 0.05 && Math.abs(world - f.world) < 55) col = lerp(CO, MI, f.fix.v);
      });
      g.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
      g.beginPath(); g.roundRect(x, mid - h / 2, 6, h, 3); g.fill();
    }
    flags.forEach((f) => { f.wrap.style.transform = `translateX(${f.world - off}px)`; });
    head2.textContent = t < tBecomes + 0.2 ? '20 SLIDES' : '1 FOCUSED VIDEO';
    const pw = (BW - 160) * playT.p;
    prog.style.width = pw + 'px'; knob.style.left = pw - 12 + 'px';
  });

  /* ================= timeline ================= */
  // part 1 entrances
  tl.from(hp, { scale: 0.6, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' }, 0.05);
  tl.from(cv, { opacity: 0, duration: 0.6 }, 0.1);
  tl.from(panel, { y: 80, opacity: 0, duration: 0.8 }, 0.25);
  tl.fromTo(hpRing, { scale: 1, opacity: 0.8 }, { scale: 1.7, opacity: 0, duration: 1.0, ease: 'power2.out', repeat: 2, immediateRender: false }, W(0, 'Listen'));
  tl.fromTo(cam1, { scale: 1.04 }, { scale: 1, duration: 5.3, ease: 'power1.inOut' }, 0);

  flags.forEach((f, i) => {
    gsap.set(f.inner, { scaleY: 0, opacity: 0 });
    tl.to(f.inner, { scaleY: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.7)' }, f.pinT - 0.1);
    tl.to(hls[i].bad, { opacity: 1, duration: 0.4 }, f.pinT + 0.1);
    tl.to([f.penOk, hls[i].good], { opacity: 1, duration: 0.35 }, tFix + i * 0.18);
    tl.to(f.fix, { v: 1, duration: 0.35 }, tFix + i * 0.18);
    tl.to(hls[i].bad, { opacity: 0, duration: 0.35 }, tFix + i * 0.18);
    tl.fromTo(hls[i].chk, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tFix + 0.1 + i * 0.18);
  });
  tl.to(panel, { boxShadow: '0 30px 80px rgba(27,34,51,.13), 0 0 0 4px rgba(60,203,154,.5)', duration: 0.4, yoyo: true, repeat: 1 }, tNotes);

  // camera pull wide into part 2
  gsap.set(cam1, { filter: 'blur(0px)' });
  tl.to(cam1, { scale: 0.78, opacity: 0, y: -40, filter: 'blur(6px)', duration: 0.8, ease: 'expo.inOut' }, tTwenty - 0.55);
  gsap.set([head2, vbar, big, ...chips], { opacity: 0 });
  gsap.set([b1, b2], { opacity: 0 });
  tl.fromTo(cam2, { scale: 1.12 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, tTwenty - 0.3);
  tl.to(cam2, { scale: 1.03, duration: ctx.dur - (tTwenty + 1.1), ease: 'power1.inOut' }, tTwenty + 1.1);
  tl.to(head2, { opacity: 1, duration: 0.4 }, tTwenty - 0.1);
  tl.from(tiles, { scale: 0.5, opacity: 0, duration: 0.45, ease: 'back.out(1.8)', stagger: 0.025 }, tTwenty - 0.2);

  // "becomes": tiles compress into the bar
  const SW = BW / 20;
  tiles.forEach((t, i) => {
    tl.to(t, { left: BX + i * SW + 'px', top: BY + 'px', width: SW - 2 + 'px', height: BH + 'px', borderRadius: '4px', duration: 0.7, ease: 'expo.inOut' }, tBecomes - 0.25 + (i % 5) * 0.015 + Math.floor(i / 5) * 0.02);
  });
  tl.fromTo(head2, { y: 0 }, { y: 0, duration: 0.01, immediateRender: false }, tBecomes + 0.2);
  tl.fromTo(head2, { opacity: 0.2 }, { opacity: 1, duration: 0.35, immediateRender: false }, tBecomes + 0.2);
  tl.to(vbar, { opacity: 1, duration: 0.35 }, tFocused - 0.05);
  tl.to(tiles, { opacity: 0, duration: 0.3 }, tFocused + 0.1);
  tl.fromTo(vbar, { scaleY: 0.8 }, { scaleY: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, tFocused - 0.05);
  tl.to(playT, { p: 0.42, duration: ctx.dur - tFocused - 0.2, ease: 'none' }, tFocused + 0.2);

  // "≈ 7" on seven, "–10 min" on ten
  gsap.set(big, { opacity: 1 });
  tl.fromTo(b1, { opacity: 0, y: 40, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tSeven - 0.1);
  tl.fromTo(b2, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.6)', immediateRender: false }, tTen - 0.12);
  tl.to(chips, { opacity: 1, duration: 0.4, stagger: 0.1 }, tTen - 0.05);
  tl.from(chips, { y: 24, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.1 }, tTen - 0.05);
  tl.to(glow, { opacity: 0.6, duration: 2, ease: 'sine.inOut' }, tSeven);
});

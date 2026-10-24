/* Scene 2 — "You have three ways to convert: export from PowerPoint, record your screen, or use a dedicated
 * converter that builds the video from your notes."
 * Storyboard: night stage with three tall closed doors numbered 1, 2, 3, rising in at the open. The title snaps
 * in on "three". On "export" door one swings open onto a sky-blue export arrow. On "record" door two reveals a
 * pulsing red record dot with a running REC timecode. On "dedicated" door three swings open in coral, light
 * spills across the floor and the other doors dim. On "converter" speaker-note lines flow in, and on "builds"
 * they collapse into a film strip that runs. The camera glides laterally, then slowly pushes toward door three. */
P2V.scene((ctx) => {
  const { tl, el, stage, at } = ctx;
  const tThree = at(0, 'three'), tExport = at(0, 'export'), tRecord = at(0, 'record');
  const tDed = at(0, 'dedicated'), tConv = at(0, 'converter'), tBuilds = at(0, 'builds'), tVideo = at(0, 'video');
  const W = 340, H = 600, TOP = 230, FLOOR = TOP + H;
  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(80% 70% at 50% 45%, #1a2238 0%, var(--night) 70%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '1500px 540px' });
  const backGlow = el('div', 'abs', cam, { left: '1100px', top: '120px', width: '800px', height: '820px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,107,74,.35), transparent)', opacity: 0 });

  const title = el('div', 'abs', cam, { left: '160px', width: '1600px', top: '110px', textAlign: 'center', font: '800 64px/1 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--paper)', zIndex: 5 });
  const tWords = ctx.split(title, 'Three ways to convert', 'word');
  tWords.forEach((w) => { w.style.marginRight = '.22em'; });

  el('div', 'abs', cam, { left: '160px', width: '1600px', top: FLOOR + 'px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(201,207,219,.35), transparent)' });

  const D = [
    { cx: 420, hex: '#5B8CFF', rgb: '91,140,255', label: 'PowerPoint export', t: tExport },
    { cx: 960, hex: '#FF3B3B', rgb: '255,59,59', label: 'Record screen', t: tRecord },
    { cx: 1500, hex: '#FF6B4A', rgb: '255,107,74', label: 'Dedicated converter', t: tDed },
  ];

  const spill = el('div', 'abs', cam, { left: 1500 - W / 2 - 80 + 'px', top: FLOOR + 'px', width: W + 160 + 'px', height: '200px', clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)', background: 'linear-gradient(180deg, rgba(255,107,74,.5), rgba(255,107,74,0))', opacity: 0 });

  D.forEach((d, i) => {
    d.wrap = el('div', 'abs', cam, { left: d.cx - W / 2 + 'px', top: TOP + 'px', width: W + 'px', height: H + 'px', perspective: '2600px' });
    d.inside = el('div', 'abs', d.wrap, { inset: 0, borderRadius: '10px 10px 0 0', overflow: 'hidden', background: `radial-gradient(90% 70% at 50% 40%, rgba(${d.rgb},.32), rgba(${d.rgb},.06) 70%), #0a0e18` });
    el('div', 'abs', d.wrap, { inset: '-8px -8px 0 -8px', border: '8px solid #2a3350', borderBottom: 'none', borderRadius: '16px 16px 0 0', boxShadow: '0 30px 80px rgba(0,0,0,.5)' });
    d.crack = el('div', 'abs', d.wrap, { left: '10px', right: '10px', bottom: '-2px', height: '4px', borderRadius: '2px', background: d.hex, boxShadow: `0 0 18px ${d.hex}`, opacity: 0.5 });
    d.leaf = el('div', 'abs', d.wrap, { inset: 0, borderRadius: '10px 10px 0 0', transformOrigin: '0% 50%', background: 'linear-gradient(165deg, #2c3550 0%, #1B2233 60%, #151b2a 100%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08), inset 0 2px 0 rgba(255,255,255,.12)' });
    el('div', 'abs', d.leaf, { left: '34px', right: '34px', top: '40px', height: '230px', borderRadius: '8px', border: '2px solid rgba(255,255,255,.07)' });
    el('div', 'abs', d.leaf, { left: '34px', right: '34px', top: '300px', height: '260px', borderRadius: '8px', border: '2px solid rgba(255,255,255,.07)' });
    d.num = el('div', 'abs', d.leaf, { left: 0, right: 0, top: '60px', textAlign: 'center', font: '900 200px/1 Inter Display, Inter', letterSpacing: '-.05em', color: 'rgba(247,244,238,.9)' });
    d.num.textContent = String(i + 1);
    el('div', 'abs', d.leaf, { right: '26px', top: '320px', width: '18px', height: '18px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #e9e2d4, #8a8574)' });
    d.idx = el('div', 'abs', cam, { left: d.cx - 200 + 'px', width: '400px', top: FLOOR + 34 + 'px', textAlign: 'center', font: MONO, letterSpacing: '.16em', color: d.hex });
    d.idx.textContent = '0' + (i + 1);
    d.lab = el('div', 'abs', cam, { left: d.cx - 200 + 'px', width: '400px', top: FLOOR + 66 + 'px', textAlign: 'center', font: '700 38px/1 Inter', letterSpacing: '-.03em', color: 'var(--paper)' });
    d.lab.textContent = d.label;
  });

  const exp = el('div', 'abs', D[0].inside, { left: '70px', top: '190px', width: '200px', height: '200px', filter: 'drop-shadow(0 0 24px rgba(91,140,255,.8))' });
  exp.innerHTML = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" stroke="#5B8CFF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
    <path d="M30 120 V165 H170 V120"/><g id="arr"><path d="M100 135 V30"/><path d="M60 70 L100 30 L140 70"/></g></svg>`;
  const arr = exp.querySelector('#arr');

  const halo = el('div', 'abs', D[1].inside, { left: '100px', top: '230px', width: '140px', height: '140px', borderRadius: '50%', border: '5px solid #FF3B3B', opacity: 0 });
  const dot = el('div', 'abs', D[1].inside, { left: '110px', top: '240px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 35%, #ff8a7a, #FF3B3B 60%, #c81e1e)', boxShadow: '0 0 60px rgba(255,59,59,.85)' });
  const rec = el('div', 'abs', D[1].inside, { left: '0', right: '0', top: '420px', textAlign: 'center', font: '700 26px/1 ui-monospace, Menlo, monospace', letterSpacing: '.14em', color: '#ff8a7a' });

  const notes = el('div', 'abs', D[2].inside, { left: '50px', top: '130px', width: '240px', height: '150px' });
  const lines = [220, 180, 235, 150].map((w, k) => el('div', 'abs', notes, { left: 0, top: k * 36 + 'px', width: w + 'px', height: '14px', borderRadius: '7px', background: 'var(--mist)', boxShadow: '0 0 14px rgba(255,255,255,.3)' }));
  const strip = el('div', 'abs', D[2].inside, { left: '20px', top: '320px', width: '300px', height: '150px', borderRadius: '8px', overflow: 'hidden', background: '#0b0d14', boxShadow: '0 0 50px rgba(255,107,74,.6)', transformOrigin: '0% 50%' });
  const holes = 'repeating-linear-gradient(90deg, rgba(247,244,238,.85) 0 14px, transparent 14px 28px)';
  el('div', 'abs', strip, { left: '6px', right: '0', top: '8px', height: '12px', background: holes, borderRadius: '2px' });
  el('div', 'abs', strip, { left: '6px', right: '0', bottom: '8px', height: '12px', background: holes, borderRadius: '2px' });
  const track = el('div', 'abs', strip, { left: '10px', top: '30px', height: '90px', width: '900px' });
  for (let k = 0; k < 8; k++) {
    const f = el('div', 'abs', track, { left: k * 110 + 'px', top: 0, width: '100px', height: '90px', borderRadius: '4px', background: `linear-gradient(${140 + k * 20}deg, #ffb199, #FF6B4A 55%, #8a2e1e)` });
    el('div', 'abs', f, { left: '14px', top: '20px', width: 30 + (k % 3) * 18 + 'px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,.85)' });
    el('div', 'abs', f, { left: '14px', top: '38px', width: '50px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.5)' });
  }

  ctx.fx.vignette({ strength: 0.55 });
  ctx.fx.grain({ opacity: 0.06 });
  ctx.onFrame((t) => {
    const s = Math.max(0, t - tRecord);
    const fr = Math.floor((s * 30) % 30);
    rec.textContent = 'REC 00:0' + Math.floor(s) + ':' + String(fr).padStart(2, '0');
  });

  gsap.set([...D.map((d) => d.idx), ...D.map((d) => d.lab)], { opacity: 0 });
  gsap.set(tWords, { opacity: 0, y: 30 });
  gsap.set(D.map((d) => d.leaf), { filter: 'brightness(1)' });
  gsap.set([exp, dot, rec, ...lines], { opacity: 0 });
  gsap.set(strip, { scaleX: 0, opacity: 0 });

  tl.from(D.map((d) => d.wrap), { y: 70, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'back.out(1.3)' }, 0.02);
  tl.fromTo(cam, { x: 70 }, { x: 0, duration: 5.4, ease: 'power2.inOut' }, 0);
  tl.to(tWords, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'back.out(1.7)' }, tThree - 0.05);

  const openDoor = (d, t) => {
    tl.to(d.leaf, { rotationY: -104, filter: 'brightness(.45)', duration: 1.1, ease: 'power3.inOut' }, t - 0.15);
    tl.to(d.num, { opacity: 0, duration: 0.35, ease: 'power1.in' }, t);
    tl.to(d.crack, { opacity: 0, duration: 0.4 }, t);
    tl.fromTo(d.idx, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, t);
    tl.fromTo(d.lab, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.8)' }, t);
  };

  openDoor(D[0], tExport);
  tl.fromTo(exp, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)' }, tExport + 0.25);
  tl.fromTo(arr, { y: 0 }, { y: -14, duration: 0.45, yoyo: true, repeat: 9, ease: 'sine.inOut', immediateRender: false }, tExport + 0.9);

  openDoor(D[1], tRecord);
  tl.fromTo(dot, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, tRecord + 0.2);
  tl.to(rec, { opacity: 1, duration: 0.3 }, tRecord + 0.4);
  tl.fromTo(dot, { scale: 1 }, { scale: 0.86, duration: 0.42, yoyo: true, repeat: 11, ease: 'sine.inOut', immediateRender: false }, tRecord + 0.8);
  for (let k = 0; k < 6; k++) {
    tl.fromTo(halo, { scale: 0.85, opacity: 0.8 }, { scale: 1.9, opacity: 0, duration: 0.84, ease: 'power2.out', immediateRender: false }, tRecord + 0.8 + k * 0.84);
  }

  openDoor(D[2], tDed);
  tl.to(spill, { opacity: 1, duration: 0.9, ease: 'power2.out' }, tDed + 0.2);
  tl.to(backGlow, { opacity: 1, duration: 1.2, ease: 'power2.out' }, tDed + 0.2);
  tl.to([D[0].wrap, D[1].wrap, D[0].lab, D[1].lab, D[0].idx, D[1].idx], { opacity: 0.4, duration: 0.8 }, tConv);
  tl.fromTo(D[2].lab, { color: '#F7F4EE' }, { color: '#FFB199', duration: 0.6, immediateRender: false }, tConv);
  gsap.set(D[2].wrap, { filter: 'drop-shadow(0 0 0px rgba(255,107,74,0))' });
  tl.to(D[2].wrap, { filter: 'drop-shadow(0 0 40px rgba(255,107,74,.55))', duration: 0.8 }, tConv);

  tl.fromTo(lines, { opacity: 0, x: -260 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)', immediateRender: false }, tConv + 0.15);
  tl.to(lines, { y: (k) => 230 - k * 36, scaleX: 0.4, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.in' }, tBuilds - 0.1);
  tl.to(strip, { scaleX: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }, tBuilds + 0.25);
  tl.fromTo(track, { x: 0 }, { x: -440, duration: ctx.dur - tVideo, ease: 'none', immediateRender: false }, tVideo);

  tl.to(cam, { scale: 1.07, duration: ctx.dur - 5.4, ease: 'power2.inOut' }, 5.4);
});

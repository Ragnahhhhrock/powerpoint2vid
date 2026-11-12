/* Scene 7 — "The slide shows the point; your voice explains it. On Pro, AI directs the video, landing each
 * key point on its word. Start with Basic at powerpoint2vid.com."
 * Storyboard: Bright paper stage, close on one clean slide. On "shows" a single coral dot drops into the
 * centre. On "voice" a teal waveform draws beneath it. On "Pro" an AI chip pops, and an amber playhead
 * sweeps the waveform. On "key", "point" and "word" the bar under the playhead lights amber and its marker
 * snaps up into the dot. The camera pulls back to reveal "Lighter slides make better videos" at 110px.
 * A coral "Start with Basic" button lands on "Basic" and the ink URL settles on "PowerPoint". Then a calm hold. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return (v == null || isNaN(v)) ? f : v; };
  const shows = A(0, 'shows', 1.107), voice = A(0, 'voice', 2.477);
  const pro = A(1, 'Pro,', 4.242), directs = A(1, 'directs', 5.032), landing = A(1, 'landing', 6.285);
  const hits = [A(1, 'key', 6.936), A(1, 'point', 7.179), A(1, 'word.', 7.795)];
  const basic = A(2, 'Basic', 9.513), ppt = A(2, 'PowerPoint', 10.07);
  const MONO = 'ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 60% at 50% 40%, #fffdf8 0%, var(--paper) 60%, #e9e4d8 100%)';
  const world = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 540px' });
  const glow = el('div', 'abs', world, { left: '360px', top: '140px', width: '1200px', height: '760px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,181,71,.18), transparent)' });
  const cam = el('div', 'abs', world, { inset: 0, transformOrigin: '960px 520px' });

  /* clean slide card (centre 960,520) */
  const CW = 800, CH = 450;
  const card = el('div', 'abs', cam, { left: 960 - CW / 2 + 'px', top: 520 - CH / 2 + 'px', width: CW + 'px', height: CH + 'px', borderRadius: '18px', background: '#fff', boxShadow: '0 50px 110px rgba(20,22,31,.16), 0 8px 24px rgba(20,22,31,.08)', overflow: 'hidden' });
  const DX = 400, DY = 165;
  const ring = el('div', 'abs', card, { left: DX - 40 + 'px', top: DY - 40 + 'px', width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--coral)', opacity: 0 });
  const dot = el('div', 'abs', card, { left: DX - 36 + 'px', top: DY - 36 + 'px', width: '72px', height: '72px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #ff8d84, var(--coral) 60%, #e0433a)', boxShadow: '0 0 50px rgba(255,90,78,.45), 0 10px 24px rgba(255,90,78,.3)' });
  const lab = (txt, x, y, c) => { const d = el('div', 'abs', card, { left: x + 'px', top: y + 'px', font: `600 15px/1 ${MONO}`, letterSpacing: '.16em', color: c }); d.textContent = txt; return d; };
  const lPoint = lab('THE POINT', 40, 40, 'var(--slate)');
  const lVoice = lab('YOUR VOICE', 40, 415, 'var(--teal)');
  const chip = el('div', 'abs', card, { right: '36px', top: '30px', padding: '10px 16px', borderRadius: '999px', background: 'var(--ink)', color: 'var(--amber)', font: `700 15px/1 ${MONO}`, letterSpacing: '.14em' });
  chip.textContent = 'PRO · AI DIRECTED';

  /* waveform */
  const N = 44, X0 = 100, STEP = 600 / N, BW = 8, CY = 330, MAXH = 110;
  const r = ctx.rand(7);
  const bars = [];
  for (let i = 0; i < N; i++) {
    const env = 0.35 + 0.65 * Math.sin(Math.PI * (i + 0.5) / N);
    const b = el('div', 'abs', card, { left: X0 + i * STEP + 'px', top: CY - MAXH / 2 + 'px', width: BW + 'px', height: MAXH + 'px', borderRadius: '4px', background: 'var(--teal)', transform: 'scaleY(0)' });
    b._h = env * (0.45 + 0.55 * r());
    bars.push(b);
  }
  const wave = { p: 0 };
  const PH0 = X0 - 6, PH1 = X0 + N * STEP, phStart = landing, phEnd = hits[2] + 0.25;
  const head = el('div', 'abs', card, { left: PH0 + 'px', top: CY - 80 + 'px', width: '3px', height: '160px', background: 'var(--amber)', borderRadius: '2px', boxShadow: '0 0 14px rgba(255,181,71,.8)', opacity: 0 });
  const words = ['KEY', 'POINT', 'WORD'];
  const markers = hits.map((ht, k) => {
    const idx = Math.max(0, Math.min(N - 1, Math.round((ht - phStart) / (phEnd - phStart) * (PH1 - PH0) / STEP)));
    const bx = X0 + idx * STEP + BW / 2;
    const m = el('div', 'abs', card, { left: bx - 12 + 'px', top: CY - 92 + 'px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 22px rgba(255,181,71,.9)', opacity: 0 });
    const t = el('div', 'abs', card, { left: bx - 60 + 'px', width: '120px', textAlign: 'center', top: CY + 70 + 'px', font: `700 14px/1 ${MONO}`, letterSpacing: '.14em', color: '#c7811a', opacity: 0 });
    t.textContent = words[k];
    return { m, t, bar: bars[idx], dx: DX - bx, dy: DY - (CY - 80), ht };
  });

  ctx.onFrame((t) => {
    bars.forEach((b, i) => {
      const g = Math.max(0, Math.min(1, (wave.p * (N + 6) - i) / 6));
      const br = 0.72 + 0.28 * Math.sin(t * 5.1 + i * 0.73) * Math.sin(t * 1.4 + i * 0.29);
      b.style.transform = `scaleY(${g === 0 ? 0 : Math.max(0.05, g * b._h * br)})`;
    });
  });

  /* outro type (unscaled stage layer) */
  const hl = el('div', 'abs', world, { left: '120px', width: '1680px', top: '108px', textAlign: 'center', font: '800 110px/1.02 Inter Display, Inter', letterSpacing: '-.045em', color: 'var(--ink)' });
  const l1 = el('div', '', hl), l2 = el('div', '', hl, { color: 'var(--coral)' });
  const hw = [...ctx.split(l1, 'Lighter slides make', 'word'), ...ctx.split(l2, 'better videos', 'word')];
  const url = el('div', 'abs', world, { left: '120px', width: '1680px', top: '722px', textAlign: 'center', font: '800 64px/1 Inter Display, Inter', letterSpacing: '-.03em', color: 'var(--ink)' });
  url.textContent = 'powerpoint2vid.com';
  const btnWrap = el('div', 'abs', world, { left: '0px', width: '1920px', top: '820px', textAlign: 'center' });
  const btn = el('div', '', btnWrap, { display: 'inline-block', padding: '26px 52px', borderRadius: '999px', background: 'linear-gradient(180deg, #ff7268, var(--coral))', color: '#fff', font: '700 40px/1 Inter Display, Inter', letterSpacing: '-.02em', boxShadow: '0 18px 44px rgba(255,90,78,.35)' });
  btn.textContent = 'Start with Basic →';

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  gsap.set(cam, { scale: 1.3 });
  gsap.set([dot, chip, lPoint, lVoice, ...hw, url, btn], { opacity: 0 });
  tl.from(card, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' }, 0.02);
  tl.to(world, { scale: 1.025, duration: ctx.dur, ease: 'none' }, 0);
  tl.to(cam, { scale: 1.38, duration: 7.9, ease: 'power1.inOut' }, 0);

  // "shows the point": the coral dot drops in
  tl.fromTo(dot, { opacity: 0, y: -160, scale: 0.3 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, shows - 0.2);
  tl.fromTo(ring, { scale: 0.8, opacity: 0.9 }, { scale: 2.4, opacity: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, shows + 0.35);
  tl.to(lPoint, { opacity: 1, duration: 0.5, ease: 'power2.out' }, shows + 0.4);

  // "your voice": the waveform draws
  tl.to(wave, { p: 1, duration: 1.0, ease: 'power2.out' }, voice - 0.1);
  tl.to(lVoice, { opacity: 1, duration: 0.5, ease: 'power2.out' }, voice + 0.2);

  // "On Pro, AI directs"
  tl.fromTo(chip, { opacity: 0, scale: 0.6, y: -10 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, pro - 0.05);
  tl.to(head, { opacity: 1, duration: 0.4, ease: 'power2.out' }, directs);
  tl.to(head, { left: PH1 + 'px', duration: phEnd - phStart, ease: 'none' }, phStart);
  tl.to(head, { opacity: 0, duration: 0.4 }, phEnd + 0.1);

  // "landing each key point on its word": markers snap into the dot
  markers.forEach(({ m, t, bar, dx, dy, ht }) => {
    tl.to(bar, { backgroundColor: '#FFB547', boxShadow: '0 0 16px rgba(255,181,71,.8)', duration: 0.15 }, ht - 0.08);
    tl.fromTo(t, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, ht - 0.05);
    tl.fromTo(m, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(2)', immediateRender: false }, ht - 0.08);
    tl.to(m, { x: dx, y: dy, scale: 0.6, duration: 0.38, ease: 'back.in(1.2)' }, ht + 0.1);
    tl.to(m, { opacity: 0, duration: 0.08 }, ht + 0.46);
    tl.to(dot, { scale: 1.22, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, ht + 0.46);
    tl.fromTo(ring, { scale: 0.9, opacity: 0.8, borderColor: '#FFB547' }, { scale: 2, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false }, ht + 0.46);
  });

  // camera pulls back, the headline appears
  const pull = hits[2] + 0.55;
  tl.to(cam, { scale: 0.72, duration: 1.4, ease: 'expo.inOut' }, pull);
  tl.fromTo(hw, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', immediateRender: false }, pull + 0.7);

  // CTA
  tl.fromTo(btn, { opacity: 0, y: 40, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)', immediateRender: false }, basic - 0.15);
  tl.fromTo(url, { opacity: 0, y: 24, letterSpacing: '.02em' }, { opacity: 1, y: 0, letterSpacing: '-.03em', duration: 1.1, ease: 'power3.out', immediateRender: false }, ppt - 0.1);
  tl.to(btn, { boxShadow: '0 22px 70px rgba(255,90,78,.6)', duration: 0.9, yoyo: true, repeat: 1, ease: 'sine.inOut' }, ppt + 1.4);
  tl.to(glow, { opacity: 0.6, duration: 2, ease: 'sine.inOut' }, ctx.dur - 2.2);
});

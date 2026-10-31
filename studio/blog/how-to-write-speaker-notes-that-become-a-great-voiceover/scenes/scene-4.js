/* Scene 4: "Abbreviations, symbols and numbers can come out oddly. So 3.5% becomes three and a half
 * per cent, and n=240 becomes two hundred and forty participants."
 * Storyboard: Night stage. A '3.5%' tile sits centre, with a teal voice waveform below it. The chips
 * 'e.g. → for example' and 'vs → versus' (kept from the slide) ease in on "Abbreviations" / "symbols".
 * On "oddly" the waveform glitches coral and the tile stutters. On "three" the tile flips to the
 * spelled-out phrase and the wave smooths. On "n=240" it flips to the raw token and the wave glitches
 * again. On "two" it flips to "two hundred and forty participants" and the wave settles teal. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const A = (i, w) => ctx.at(i, w);
  const tAbbr = A(0, 'Abbreviations,'), tSym = A(0, 'symbols'), tOdd = A(0, 'oddly.');
  const tThree = A(1, 'three'), tN = A(1, 'n=240'), tTwo = A(1, 'two'), tPart = A(1, 'participants.');

  stage.style.background = 'radial-gradient(60% 55% at 50% 42%, #1c2440 0%, var(--night) 70%)';
  const glow = el('div', 'abs', stage, { left: '460px', top: '120px', width: '1000px', height: '600px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(46,196,182,.16), transparent)', filter: 'blur(20px)' });
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  /* header label */
  const head = el('div', 'abs', cam, { left: '0', width: '1920px', top: '110px', textAlign: 'center', font: '600 22px/1 ui-monospace, Menlo, monospace', letterSpacing: '.22em', color: 'var(--slate)' });
  head.textContent = 'SPELL OUT WHAT THE VOICE TRIPS ON';

  /* mode label above tile */
  const mode = el('div', 'abs', cam, { left: '210px', top: '228px', font: '700 20px/1 ui-monospace, Menlo, monospace', letterSpacing: '.18em', color: 'var(--coral)' });

  /* the flip tile */
  const persp = el('div', 'abs', cam, { left: '210px', top: '270px', width: '1500px', height: '300px', perspective: '1400px' });
  const tile = el('div', 'abs', persp, { inset: 0, borderRadius: '30px', background: 'linear-gradient(180deg, #232a3d, var(--ink))', border: '1px solid rgba(255,255,255,.08)', boxShadow: '0 50px 100px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.08)' });
  const ring = el('div', 'abs', persp, { inset: '-2px', borderRadius: '32px', border: '2px solid var(--teal)', boxShadow: '0 0 60px rgba(46,196,182,.45)', opacity: 0 });
  const faceDefs = [
    ['3.5%', '900 210px/1 Inter Display, Inter', '#fff', '-.05em'],
    ['three and a half per cent', '800 92px/1.05 Inter Display, Inter', 'var(--paper)', '-.035em'],
    ['n=240', '900 200px/1 Inter Display, Inter', '#fff', '-.05em'],
    ['two hundred and forty participants', '800 76px/1.08 Inter Display, Inter', 'var(--paper)', '-.035em'],
  ];
  const faces = faceDefs.map(([txt, font, color, ls]) => {
    const f = el('div', 'abs', persp, { inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', boxSizing: 'border-box', font, color, letterSpacing: ls, backfaceVisibility: 'hidden', transformOrigin: '50% 50% -60px' });
    f.textContent = txt;
    return f;
  });

  /* waveform */
  const W = 1500, WX = 210, WY = 720, N = 220;
  const wave = el('div', 'abs', cam, { left: WX + 'px', top: WY - 110 + 'px', width: W + 'px', height: '220px' });
  wave.innerHTML = `<svg width="${W}" height="220" style="overflow:visible">
    <path id="wt" fill="none" stroke="#2EC4B6" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 10px rgba(46,196,182,.7))"/>
    <path id="wc" fill="none" stroke="#FF6B57" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 12px rgba(255,107,87,.8))"/></svg>`;
  const pT = wave.querySelector('#wt'), pC = wave.querySelector('#wc');
  const S = { g: 0, amp: 0.15 };
  const hash = (x) => { const s = Math.sin(x * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

  /* side chips from the slide */
  const chip = (left, a, b) => {
    const c = el('div', 'abs', cam, { left: left + 'px', top: '880px', height: '76px', padding: '0 34px', display: 'flex', alignItems: 'center', gap: '18px', borderRadius: '38px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 20px 40px rgba(0,0,0,.35)', font: '700 32px/1 Inter', color: 'var(--paper)', whiteSpace: 'nowrap' });
    const x = el('span', '', c, { color: 'var(--coral)', font: '700 30px/1 ui-monospace, Menlo, monospace' }); x.textContent = a;
    const ar = el('span', '', c, { color: 'var(--slate)' }); ar.textContent = '→';
    const y = el('span', '', c, { color: 'var(--teal)' }); y.textContent = b;
    return c;
  };
  const chipA = chip(260, 'e.g.', 'for example');
  const chipB = chip(1180, 'vs', 'versus');

  ctx.fx.vignette({ strength: 0.5 });
  ctx.fx.grain({ opacity: 0.06 });

  const spoken = (t) => (t >= tThree && t < tN) || t >= tTwo;
  ctx.onFrame((t) => {
    const sp = spoken(t);
    mode.textContent = sp ? 'SPOKEN · HOW IT SOUNDS' : 'WRITTEN · HOW IT READS';
    mode.style.color = sp ? 'var(--teal)' : 'var(--coral)';
    let d = '';
    const tick = Math.floor(t * 14);
    for (let i = 0; i <= N; i++) {
      const u = i / N, x = u * W;
      const env = Math.sin(Math.PI * u) ** 1.4;
      let y = Math.sin(u * 26 + t * 3.2) * 0.55 + Math.sin(u * 61 - t * 4.7) * 0.3 + Math.sin(u * 9 + t * 1.3) * 0.25;
      y *= 70 * env * S.amp * (0.75 + 0.25 * Math.sin(t * 2.1));
      if (S.g > 0) {
        const n = hash(i * 0.37 + tick * 13.1) - 0.5;
        const spike = hash(Math.floor(i / 9) + tick * 7.7) > 0.8 ? 1 : 0.3;
        y += n * 190 * spike * S.g * env;
      }
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (110 + y).toFixed(1);
    }
    pT.setAttribute('d', d); pC.setAttribute('d', d);
    pT.style.opacity = 1 - S.g; pC.style.opacity = S.g;
  });

  /* ---- timeline ---- */
  gsap.set(faces.slice(1), { rotationX: -90, opacity: 0 });
  tl.to(S, { amp: 1, duration: 1.2, ease: 'power2.out' }, 0);
  tl.from(head, { opacity: 0, y: -14, duration: 0.6 }, 0.05);
  tl.from([tile, faces[0]], { opacity: 0, y: 40, scale: 0.94, duration: 0.8, ease: 'back.out(1.5)' }, 0.1);
  tl.from(mode, { opacity: 0, x: -20, duration: 0.5 }, 0.4);
  tl.from(chipA, { opacity: 0, y: 40, duration: 0.7, ease: 'back.out(1.6)' }, tAbbr + 0.05);
  tl.from(chipB, { opacity: 0, y: 40, duration: 0.7, ease: 'back.out(1.6)' }, tSym);

  // "oddly": the voice trips
  tl.to(S, { g: 1, duration: 0.2, ease: 'power2.in' }, tOdd - 0.1);
  tl.to(persp, { x: 10, duration: 0.05, yoyo: true, repeat: 5, ease: 'none' }, tOdd);
  tl.to(glow, { background: 'radial-gradient(closest-side, rgba(255,107,87,.18), transparent)', duration: 0.3 }, tOdd);

  const flip = (from, to, t) => {
    tl.to(faces[from], { rotationX: 90, opacity: 0, duration: 0.28, ease: 'power2.in' }, t - 0.28);
    tl.fromTo(faces[to], { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', immediateRender: false }, t);
    tl.fromTo(tile, { scaleY: 1 }, { scaleY: 0.94, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, t - 0.14);
  };

  // "three and a half per cent": spelled out, wave smooths
  flip(0, 1, tThree);
  tl.to(S, { g: 0, duration: 0.6, ease: 'power2.out' }, tThree);
  tl.to(glow, { background: 'radial-gradient(closest-side, rgba(46,196,182,.2), transparent)', duration: 0.6 }, tThree);
  tl.fromTo(ring, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.5, immediateRender: false }, tThree);
  tl.to(ring, { opacity: 0, duration: 0.4 }, tN - 0.4);

  // "n=240": raw token again, wave glitches
  flip(1, 2, tN);
  tl.to(S, { g: 0.8, duration: 0.25, ease: 'power2.in' }, tN);
  tl.to(glow, { background: 'radial-gradient(closest-side, rgba(255,107,87,.18), transparent)', duration: 0.3 }, tN);
  tl.to(persp, { x: -8, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, tN + 0.5);

  // "two hundred and forty participants"
  flip(2, 3, tTwo);
  tl.to(S, { g: 0, duration: 0.7, ease: 'power2.out' }, tTwo);
  tl.to(glow, { background: 'radial-gradient(closest-side, rgba(46,196,182,.22), transparent)', duration: 0.6 }, tTwo);
  tl.fromTo(ring, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.5, immediateRender: false }, tTwo);
  tl.to(ring, { boxShadow: '0 0 110px rgba(46,196,182,.8)', duration: 0.5, yoyo: true, repeat: 1 }, tPart);

  // gentle continuous push-in
  tl.fromTo(cam, { scale: 1 }, { scale: 1.045, duration: ctx.dur, ease: 'none', immediateRender: false }, 0);
});

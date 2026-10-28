/* Scene 3 — "A synthetic narrator reads exactly what you write. So 'Q3 rev. up 8%' becomes
 * 'Revenue in the third quarter rose eight per cent.'"
 * Storyboard: Paper stage, close framing. The cramped written line 'Q3 rev. up 8%' sits at 150px in ink
 * while a coral read-cursor scans it literally on "exactly". Each fragment gets a coral underline as it is
 * spoken, and the small waveform beneath turns jagged. On "becomes" the fragments glide into their slots
 * in the spoken sentence and unfold in place as the narrator says them: rev.→Revenue, Q3→third quarter,
 * up→rose, 8%→eight per cent. A coral full stop lands, the waveform smooths out, and the camera holds
 * on the clean spoken line. */
P2V.scene((ctx) => {
  const { tl, el, stage } = ctx;
  const W = (i, w) => ctx.at(i, w);
  const tExactly = W(0, 'exactly'), tWrite = W(0, 'write.');
  const tQ3 = W(1, "'Q3"), tRev = W(1, 'rev.'), tUp = W(2, 'up'), t8 = W(2, "8%'");
  const becomes = W(2, 'becomes'), tRevenue = W(2, "'Revenue"), tIn = W(2, 'in'), tThe = W(2, 'the');
  const tThird = W(2, 'third'), tRose = W(2, 'rose'), tEight = W(2, 'eight'), tCent = W(2, "cent.'");
  const FONT = "'Inter Display', Inter, sans-serif";
  const MONO = '600 22px/1 ui-monospace, Menlo, monospace';

  stage.style.background = 'radial-gradient(70% 65% at 50% 42%, #fffdf7 0%, var(--paper) 55%, #e9e3d6 100%)';
  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  /* soft warm light pools */
  el('div', 'abs', cam, { left: '260px', top: '140px', width: '1400px', height: '700px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(255,107,74,.07), transparent)' });

  /* labels */
  const labW = el('div', 'abs', cam, { left: '160px', top: '230px', font: MONO, letterSpacing: '.18em', color: 'var(--signal)' });
  labW.textContent = 'AS WRITTEN';
  const labS = el('div', 'abs', cam, { left: '160px', top: '230px', font: MONO, letterSpacing: '.18em', color: 'var(--wave)', opacity: 0 });
  labS.textContent = 'AS SPOKEN';

  /* written line */
  const A = el('div', 'abs', cam, { left: 0, top: '400px', width: '1920px', display: 'flex', justifyContent: 'center', gap: '40px',
    font: `800 150px/1 ${FONT}`, letterSpacing: '-.05em', color: 'var(--ink)' });
  const frags = ['Q3', 'rev.', 'up', '8%'].map((s) => {
    const sp = el('span', '', A, { display: 'inline-block', whiteSpace: 'nowrap', transformOrigin: '0 0' });
    sp.textContent = s; return sp;
  });

  /* spoken line */
  const B = el('div', 'abs', cam, { left: '80px', top: '380px', width: '1760px', font: `800 96px/1 ${FONT}`, letterSpacing: '-.035em', color: 'var(--ink)' });
  const row1 = el('div', '', B, { display: 'flex', justifyContent: 'center', gap: '28px', marginBottom: '34px' });
  const row2 = el('div', '', B, { display: 'flex', justifyContent: 'center', gap: '28px' });
  const mk = (row, s) => { const sp = el('span', '', row, { display: 'inline-block', whiteSpace: 'nowrap' }); sp.textContent = s; return sp; };
  const wRevenue = mk(row1, 'Revenue'), wIn = mk(row1, 'in'), wThe = mk(row1, 'the'), wThird = mk(row1, 'third quarter');
  const wRose = mk(row2, 'rose'), wEight = mk(row2, 'eight per cent');
  const dot = el('span', '', wEight, { display: 'inline-block', color: 'var(--signal)', transformOrigin: '50% 80%', textShadow: '0 0 30px rgba(255,107,74,.5)' });
  dot.textContent = '.';

  /* underlines + read cursor */
  const unders = frags.map((f) => el('div', 'abs', cam, { left: f.offsetLeft + 4 + 'px', top: 400 + f.offsetTop + 158 + 'px',
    width: f.offsetWidth - 8 + 'px', height: '10px', borderRadius: '5px', background: 'var(--signal)', transformOrigin: '0 50%' }));
  const f0 = frags[0], f3 = frags[3];
  const cursor = el('div', 'abs', cam, { left: 0, top: '385px', width: '7px', height: '180px', borderRadius: '4px', background: 'var(--signal)',
    boxShadow: '0 0 24px rgba(255,107,74,.6)', opacity: 0 });

  /* waveform */
  const wf = el('div', 'abs', cam, { left: '460px', top: '760px', width: '1000px', height: '160px' });
  wf.innerHTML = `<svg width="1000" height="160" style="overflow:visible"><path id="g" fill="none" stroke="rgba(91,140,255,.25)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" style="filter:blur(6px)"/><path id="m" fill="none" stroke="#5B8CFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const pg = wf.querySelector('#g'), pm = wf.querySelector('#m');
  const wv = { amp: 8, jag: 0.15 };
  ctx.onFrame((t) => {
    let d = '';
    const N = 140;
    for (let i = 0; i <= N; i++) {
      const u = i / N, x = u * 1000;
      const env = Math.pow(Math.sin(Math.PI * u), 1.4);
      const smooth = Math.sin(u * 14 + t * 3.2) * 0.6 + Math.sin(u * 23 - t * 2.1) * 0.4;
      const noise = Math.sin(x * 0.9 + t * 17) * Math.sin(x * 0.37 - t * 11) * 1.6;
      const y = 80 + wv.amp * env * (smooth + wv.jag * noise);
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    pg.setAttribute('d', d); pm.setAttribute('d', d);
  });

  ctx.fx.vignette({ strength: 0.22 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- geometry for the unfold ---- */
  const S = 96 / 150;
  const pos = (sp, ox, oy) => [ox + sp.offsetLeft, oy + sp.offsetTop];
  const map = [[frags[0], wThird], [frags[1], wRevenue], [frags[2], wRose], [frags[3], wEight]];

  /* ---- timeline ---- */
  gsap.set([wRevenue, wIn, wThe, wThird, wRose, wEight], { opacity: 0 });
  gsap.set([wRevenue, wThird, wRose, wEight], { clipPath: 'inset(-30% 100% -30% 0%)' });
  gsap.set(dot, { opacity: 0, scale: 0 });
  gsap.set(unders, { scaleX: 0 });
  gsap.set(frags, { filter: 'blur(0px)' });

  // opening: line settles, waveform wakes with the voice
  tl.from(A, { opacity: 0, y: 36, duration: 0.8 }, 0.05);
  tl.from(labW, { opacity: 0, x: -20, duration: 0.6 }, 0.15);
  tl.from(wf, { opacity: 0, duration: 0.6 }, 0.1);
  tl.to(wv, { amp: 34, duration: 0.8, ease: 'power2.out' }, 0.55);

  // "exactly": the narrator scans it literally
  tl.set(cursor, { x: f0.offsetLeft - 24 }, tExactly - 0.1);
  tl.to(cursor, { opacity: 1, duration: 0.15 }, tExactly - 0.1);
  tl.to(cursor, { x: f3.offsetLeft + f3.offsetWidth + 18, duration: Math.max(0.8, tWrite + 0.3 - tExactly), ease: 'none' }, tExactly);
  tl.to(cursor, { opacity: 0, duration: 0.25 }, tWrite + 0.3);

  // each fragment flagged as spoken; waveform gets jagged
  [tQ3, tRev, tUp, t8].forEach((t, i) => {
    tl.to(unders[i], { scaleX: 1, duration: 0.4, ease: 'power3.out' }, t);
    tl.to(frags[i], { y: -10, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
    tl.to(wv, { jag: 0.4 + i * 0.2, amp: 40 + i * 4, duration: 0.3 }, t);
  });

  // "becomes": fragments glide into their spoken slots
  tl.to(unders, { opacity: 0, scaleX: 0.6, duration: 0.35, stagger: 0.04, ease: 'power2.in' }, becomes - 0.2);
  tl.to(labW, { opacity: 0, y: -12, duration: 0.3 }, becomes - 0.1);
  tl.fromTo(labS, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, becomes + 0.1);
  map.forEach(([f, w], i) => {
    const [ax, ay] = pos(f, 0, 400), [bx, by] = pos(w, 80, 380);
    tl.to(f, { x: bx - ax, y: by - ay, scale: S, duration: 0.6, ease: 'expo.inOut' }, becomes - 0.12 + i * 0.03);
  });
  tl.to(wv, { jag: 0, amp: 26, duration: Math.max(1, tCent + 0.4 - becomes), ease: 'power2.inOut' }, becomes);

  // unfold each fragment as it is said
  const unfold = (f, w, t, d) => {
    tl.to(w, { opacity: 1, duration: 0.01 }, t - 0.05);
    tl.to(w, { clipPath: 'inset(-30% -5% -30% 0%)', duration: d, ease: 'power3.out' }, t - 0.05);
    tl.to(f, { opacity: 0, filter: 'blur(4px)', duration: 0.25, ease: 'power1.in' }, t - 0.05);
  };
  unfold(frags[1], wRevenue, tRevenue, 0.5);
  tl.fromTo(wIn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.6)', immediateRender: false }, tIn - 0.05);
  tl.fromTo(wThe, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.6)', immediateRender: false }, tThe - 0.05);
  unfold(frags[0], wThird, tThird, 0.55);
  unfold(frags[2], wRose, tRose, 0.35);
  unfold(frags[3], wEight, tEight, 0.6);

  // coral full stop lands
  tl.to(dot, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(3)' }, tCent + 0.2);
  tl.to(wf, { y: 8, duration: 1.2, ease: 'power2.inOut' }, tCent + 0.2);

  // camera: slow drift, gentle push-in once the line is spoken
  tl.to(cam, { scale: 1.02, x: -6, duration: becomes, ease: 'none' }, 0);
  tl.to(cam, { scale: 1.055, x: 0, y: -8, duration: ctx.dur - becomes, ease: 'power2.inOut' }, becomes);
});

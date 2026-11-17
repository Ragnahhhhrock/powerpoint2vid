/* Scene 3 — "Say what the chart actually shows, so blind and low-vision viewers can follow too.
 * Then caption everything, check contrast, and keep body text at 24 point or larger."
 * Storyboard: warm paper stage, split layout. Left: a simple two-bar chart with a vague speech bubble
 * "As you can see, this one is much higher." — a coral strike draws through it on "actually shows".
 * Right: the line is rewritten as a clear teal statement, "Enrolments in the online course are higher",
 * and the online bar takes on teal. The camera drifts slowly right. On "caption everything", "check
 * contrast" and "24 point", three chips settle along the bottom: CC, WCAG AA, and a large 24pt+.
 * Calm, soft curves, no flashing: everything arrives once and holds. */
P2V.scene((ctx) => {
  const { tl, el, stage, dur } = ctx;
  const A = (i, w, f) => { const v = ctx.at(i, w); return Number.isFinite(v) ? v : f; };
  const actually = A(0, 'actually', 1.6);
  const blind = A(0, 'blind', 3.0);
  const caption = Math.min(A(1, 'caption', 6.6), dur - 4);
  const contrast = Math.min(A(1, 'contrast', 8.0), dur - 3);
  const pt24 = Math.min(A(1, '24', 9.6), dur - 2);

  const MONO = '600 20px/1 ui-monospace, Menlo, monospace';
  stage.style.background = 'radial-gradient(70% 70% at 35% 35%, #fffdf8 0%, var(--paper) 55%, #ebe5da 100%)';
  const warm = el('div', 'abs', stage, { inset: 0, background: 'radial-gradient(40% 40% at 75% 45%, rgba(31,138,138,.10), transparent 70%)', opacity: 0 });

  const cam = el('div', 'abs', stage, { inset: 0, transformOrigin: '960px 500px' });

  /* ---- chart (left) ---- */
  const chart = el('div', 'abs', cam, { left: '220px', top: '330px', width: '600px', height: '440px' });
  const axis = el('div', 'abs', chart, { left: '40px', right: '20px', top: '400px', height: '3px', background: 'var(--ink)', borderRadius: '2px', transformOrigin: '0% 50%' });
  const grid = [100, 200, 300].map((y) => el('div', 'abs', chart, { left: '40px', right: '20px', top: 400 - y + 'px', height: '1px', background: 'rgba(22,32,46,.10)' }));
  const mkBar = (x, h, bg, label) => {
    const b = el('div', 'abs', chart, { left: x + 'px', top: 400 - h + 'px', width: '180px', height: h + 'px', borderRadius: '12px 12px 3px 3px', background: bg, transformOrigin: '50% 100%', boxShadow: '0 20px 40px rgba(22,32,46,.12)' });
    const l = el('div', 'abs', chart, { left: x - 20 + 'px', width: '220px', top: '420px', textAlign: 'center', font: MONO, letterSpacing: '.12em', color: 'rgba(22,32,46,.7)' });
    l.textContent = label;
    return { b, l };
  };
  const barA = mkBar(100, 170, '#b9c4d1', 'IN PERSON');
  const barB = mkBar(340, 320, '#8c99a8', 'ONLINE');
  const barBhot = el('div', 'abs', chart, { left: '340px', top: '80px', width: '180px', height: '320px', borderRadius: '12px 12px 3px 3px', background: 'linear-gradient(180deg, #34a7a7, var(--teal))', boxShadow: '0 24px 60px rgba(31,138,138,.35)', opacity: 0, transformOrigin: '50% 100%' });

  /* ---- vague bubble ---- */
  const before = el('div', 'abs', cam, { left: '200px', top: '150px', padding: '26px 32px', background: '#fff', borderRadius: '22px', boxShadow: '0 24px 60px rgba(22,32,46,.14)', whiteSpace: 'nowrap' });
  const bTag = el('div', '', before, { font: MONO, fontSize: '17px', letterSpacing: '.16em', color: 'var(--coral)', marginBottom: '14px' }); bTag.textContent = 'VAGUE';
  const bTxt = el('div', '', before, { position: 'relative', font: '600 32px/1.2 Inter', letterSpacing: '-.01em', color: 'var(--ink)' });
  bTxt.textContent = '“As you can see, this one is much higher.”';
  const strike = el('div', 'abs', bTxt, { left: '-6px', right: '-6px', top: '52%', height: '5px', borderRadius: '3px', background: 'var(--coral)', transformOrigin: '0% 50%' });
  const tail = el('div', 'abs', before, { left: '70px', bottom: '-16px', width: '32px', height: '32px', background: '#fff', transform: 'rotate(45deg)', borderRadius: '4px' });

  /* ---- clear rewrite (right) ---- */
  const arrow = el('div', 'abs', cam, { left: '880px', top: '440px', width: '140px', height: '60px' });
  arrow.innerHTML = '<svg width="140" height="60"><path d="M6 30 H120 M100 12 L124 30 L100 48" fill="none" stroke="#1F8A8A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const after = el('div', 'abs', cam, { left: '1060px', top: '330px', width: '660px', padding: '34px 40px', background: '#fff', borderRadius: '26px', border: '3px solid var(--teal)', boxShadow: '0 30px 80px rgba(31,138,138,.22)' });
  const aTag = el('div', '', after, { font: MONO, fontSize: '17px', letterSpacing: '.16em', color: 'var(--teal)', marginBottom: '18px' }); aTag.textContent = 'SAY WHAT IT SHOWS';
  const aTxt = el('div', '', after, { font: '800 50px/1.12 Inter Display, Inter', letterSpacing: '-.035em', color: 'var(--teal)' });
  const words = ctx.split(aTxt, 'Enrolments in the online course are higher', 'word');
  words.forEach((w) => { w.style.marginRight = '0.24em'; });

  /* ---- chips (bottom, outside camera so they stay steady) ---- */
  const row = el('div', 'abs', stage, { left: '0', width: '1920px', top: '820px', height: '170px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '32px' });
  const chip = (bg, color, pad, html) => {
    const c = el('div', '', row, { display: 'flex', alignItems: 'center', gap: '16px', padding: pad, borderRadius: '999px', background: bg, color, boxShadow: '0 18px 44px rgba(22,32,46,.18)', whiteSpace: 'nowrap' });
    c.innerHTML = html; return c;
  };
  const cc = chip('var(--ink)', '#fff', '22px 38px', '<span style="font:800 40px/1 Inter;letter-spacing:-.02em;border:3px solid #fff;border-radius:10px;padding:6px 10px">CC</span><span style="font:600 22px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em">CAPTIONS</span>');
  const wc = chip('#fff', 'var(--ink)', '22px 36px', '<span style="display:flex;border-radius:10px;overflow:hidden;font:800 34px/1 Inter"><span style="background:#16202E;color:#F7F4EE;padding:8px 12px">Aa</span><span style="background:#F7F4EE;color:#16202E;padding:8px 12px">Aa</span></span><span style="font:800 40px/1 Inter;letter-spacing:-.02em">WCAG AA</span>');
  const big = chip('var(--sun)', 'var(--ink)', '22px 48px', '<span style="font:900 96px/1 Inter Display, Inter;letter-spacing:-.05em">24pt+</span>');

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });

  /* ---- timeline ---- */
  // opening: chart and bubble settle in
  tl.from(chart, { opacity: 0, y: 30, duration: 0.9, ease: 'power2.out' }, 0.05);
  tl.from(axis, { scaleX: 0, duration: 0.9, ease: 'power2.inOut' }, 0.1);
  tl.from([barA.b, barB.b], { scaleY: 0, duration: 1.0, ease: 'power2.out', stagger: 0.15 }, 0.25);
  tl.from([barA.l, barB.l], { opacity: 0, duration: 0.6, stagger: 0.1 }, 0.5);
  tl.from(before, { opacity: 0, y: 24, scale: 0.96, duration: 0.8, ease: 'back.out(1.4)' }, 0.45);
  gsap.set(strike, { scaleX: 0 });

  // slow camera drift right + gentle push
  tl.fromTo(cam, { x: 0, scale: 1 }, { x: -50, scale: 1.03, duration: dur, ease: 'sine.inOut', immediateRender: false }, 0);

  // "actually shows": strike through the vague line
  tl.to(strike, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, actually - 0.1);
  tl.to(before, { opacity: 0.5, duration: 0.8, ease: 'sine.inOut' }, actually + 0.6);

  // rewrite on the right
  const rw = Math.max(actually + 0.7, blind - 0.9);
  tl.from(arrow, { opacity: 0, x: -30, duration: 0.7, ease: 'power2.out' }, rw);
  tl.from(after, { opacity: 0, x: 40, duration: 0.9, ease: 'power3.out' }, rw + 0.15);
  tl.from(words, { opacity: 0, y: 18, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, rw + 0.35);
  tl.to(warm, { opacity: 1, duration: 1.4, ease: 'sine.inOut' }, rw);
  tl.to(barBhot, { opacity: 1, duration: 0.9, ease: 'sine.inOut' }, rw + 0.6);
  tl.to(barB.l, { color: '#1F8A8A', duration: 0.6 }, rw + 0.6);

  // chips land on their words
  [[cc, caption], [wc, contrast]].forEach(([c, t]) => {
    tl.from(c, { opacity: 0, y: 40, scale: 0.9, duration: 0.8, ease: 'back.out(1.5)' }, t - 0.15);
  });
  tl.from(big, { opacity: 0, y: 50, scale: 0.7, duration: 0.9, ease: 'back.out(1.6)' }, pt24 - 0.2);
  tl.to(big, { boxShadow: '0 24px 70px rgba(242,181,68,.55)', duration: 1.2, ease: 'sine.inOut' }, pt24 + 0.6);
});

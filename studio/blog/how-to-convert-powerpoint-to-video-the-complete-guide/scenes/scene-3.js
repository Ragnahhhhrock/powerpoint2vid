/* Scene 3 — "Tidy the deck first. Keep one idea per slide, make each headline the point, and move detail
 * into the speaker notes, where it becomes narration."
 * Storyboard: paper stage, camera close on a cluttered slide crammed with tiny text. On "one idea per slide"
 * the clutter sweeps off and one bold idea remains. On "headline the point" it scales up to full-size ink
 * and a coral underline draws. On "move detail… speaker notes" the camera glides back to reveal a notes
 * panel and the detail drops into it. On "becomes narration" those lines collapse into a live mint waveform.
 * Check chips "24pt+" and "16:9, high contrast" from the original bullets settle in the corner. */
P2V.scene((ctx) => {
  const { tl, el, stage, dur } = ctx;
  const tidy = ctx.at(0, 'Tidy'), one = ctx.at(1, 'one'), headline = ctx.at(1, 'headline'), point = ctx.at(1, 'point'),
    move = ctx.at(1, 'move'), detail = ctx.at(1, 'detail'), speaker = ctx.at(1, 'speaker'),
    becomes = ctx.at(1, 'becomes'), narration = ctx.at(1, 'narration');
  const MONO = '600 18px/1 ui-monospace, Menlo, monospace';
  const R = ctx.rand(7);

  stage.style.background = 'radial-gradient(70% 60% at 45% 35%, #fffdf8 0%, var(--paper) 55%, #ebe6dc 100%)';
  const wrap = el('div', 'abs', stage, { inset: 0 });
  const cam = el('div', 'abs', wrap, { inset: 0, transformOrigin: '960px 402px' });

  /* ---- the slide card ---- */
  const card = el('div', 'abs', cam, { left: '440px', top: '110px', width: '1040px', height: '585px', background: '#fff', borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 40px 90px rgba(27,34,51,.16), 0 6px 18px rgba(27,34,51,.08)' });
  const clutter = [];
  const sTitle = el('div', 'abs', card, { left: '48px', top: '34px', font: '700 30px/1 Inter', color: '#3a4152', letterSpacing: '-.01em' });
  sTitle.textContent = 'Get the deck ready for video';
  clutter.push(sTitle);
  ['One idea per slide', 'Make the headline the point', 'Body text 24pt or more', '16:9 layout with good contrast'].forEach((s, i) => {
    const b = el('div', 'abs', card, { left: '52px', top: 96 + i * 28 + 'px', font: '500 17px/1 Inter', color: '#5a6172', whiteSpace: 'nowrap' });
    b.textContent = '• ' + s; clutter.push(b);
  });
  for (let c = 0; c < 2; c++) for (let r = 0; r < 13; r++) {
    clutter.push(el('div', 'abs', card, { left: 52 + c * 480 + 'px', top: 230 + r * 24 + 'px', width: 200 + R() * 230 + 'px', height: '8px', borderRadius: '4px', background: 'rgba(27,34,51,' + (0.1 + R() * 0.1).toFixed(2) + ')' }));
  }
  clutter.push(el('div', 'abs', card, { left: '560px', top: '92px', width: '420px', height: '118px', borderRadius: '8px', background: 'repeating-linear-gradient(135deg, #eef0f5 0 10px, #e2e6ee 10px 20px)' }));
  for (let i = 0; i < 4; i++) clutter.push(el('div', 'abs', card, { left: 960 - i * 26 + 'px', top: '548px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--mist)' }));

  const hero = el('div', 'abs', card, { left: '40px', top: '150px', width: '960px', textAlign: 'center', font: '800 104px/1.02 Inter Display, Inter', letterSpacing: '-.04em', color: 'var(--ink)', transformOrigin: '50% 50%' });
  hero.innerHTML = 'Get the deck<br>ready for video';
  const under = el('div', 'abs', card, { left: '260px', top: '398px', width: '520px', height: '12px', borderRadius: '6px', background: 'var(--signal)', boxShadow: '0 6px 24px rgba(255,107,74,.45)', transformOrigin: '0% 50%' });

  /* ---- speaker notes panel ---- */
  const panel = el('div', 'abs', cam, { left: '440px', top: '740px', width: '1040px', height: '260px', background: '#fff', borderRadius: '18px', border: '1px solid rgba(27,34,51,.08)', boxShadow: '0 24px 60px rgba(27,34,51,.12)', overflow: 'hidden' });
  const lab = el('div', 'abs', panel, { left: '40px', top: '28px', font: MONO, letterSpacing: '.14em', color: '#7a8193', whiteSpace: 'nowrap' });
  lab.textContent = 'SPEAKER NOTES';
  const lab2 = el('div', 'abs', panel, { left: '226px', top: '28px', font: MONO, letterSpacing: '.14em', color: 'var(--mint)', whiteSpace: 'nowrap' });
  lab2.textContent = '→ NARRATION';
  const lines = [880, 760, 840, 520].map((w, i) => el('div', 'abs', panel, { left: '40px', top: 84 + i * 36 + 'px', width: w + 'px', height: '12px', borderRadius: '6px', background: 'rgba(27,34,51,.16)', transformOrigin: '50% 50%' }));

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '960'); svg.setAttribute('height', '200');
  Object.assign(svg.style, { position: 'absolute', left: '40px', top: '60px', overflow: 'visible' });
  panel.appendChild(svg);
  const NB = 80, bars = [], base = [];
  for (let i = 0; i < NB; i++) {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', String(i * 12 + 3)); r.setAttribute('width', '6'); r.setAttribute('rx', '3');
    r.setAttribute('fill', '#3FD3A4');
    svg.appendChild(r); bars.push(r); base.push(0.35 + R() * 0.65);
  }
  svg.style.filter = 'drop-shadow(0 0 10px rgba(63,211,164,.45))';
  const wave = { a: 0, o: 0 };

  /* ---- check chips ---- */
  const chips = ['24pt+', '16:9, high contrast'].map((s, i) => {
    const c = el('div', 'abs', stage, { left: '1520px', top: 110 + i * 76 + 'px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px 12px 12px', background: '#fff', borderRadius: '999px',
      boxShadow: '0 12px 30px rgba(27,34,51,.12)', font: '700 22px/1 Inter', color: 'var(--ink)', letterSpacing: '-.01em', whiteSpace: 'nowrap' });
    const k = el('div', '', c, { width: '32px', height: '32px', borderRadius: '50%', background: 'var(--mint)', color: '#fff', font: '800 18px/32px Inter', textAlign: 'center' });
    k.textContent = '✓';
    el('span', '', c).textContent = s;
    return c;
  });

  ctx.fx.vignette({ strength: 0.25 });
  ctx.fx.grain({ opacity: 0.05 });
  ctx.onFrame((t) => {
    svg.style.opacity = wave.o;
    for (let i = 0; i < NB; i++) {
      const env = Math.sin(Math.PI * (i + 0.5) / NB);
      const h = 6 + wave.a * 120 * base[i] * env * (0.55 + 0.45 * Math.sin(t * 7 + i * 0.7));
      bars[i].setAttribute('y', String(90 - h / 2)); bars[i].setAttribute('height', String(h));
    }
  });

  /* ---- timeline ---- */
  gsap.set(cam, { scale: 1.28, x: 40 });
  gsap.set(hero, { opacity: 0, scale: 0.5 });
  gsap.set(under, { scaleX: 0 });
  gsap.set([panel, lab2, ...lines, ...chips], { opacity: 0 });

  tl.to(wrap, { x: -16, y: -8, duration: dur, ease: 'none' }, 0);
  tl.from(card, { y: 40, opacity: 0, duration: 0.6 }, 0.02);
  tl.to(cam, { scale: 1.34, duration: one - 0.2, ease: 'power1.inOut' }, 0);
  // "Tidy": the mess twitches
  tl.to(clutter, { x: () => (R() - 0.5) * 6, duration: 0.08, yoyo: true, repeat: 3, ease: 'none', stagger: 0.004 }, tidy);

  // "one idea per slide": clutter sweeps away, one idea remains
  tl.to(clutter, { x: -1200, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: 0.008 }, one - 0.15);
  tl.to(hero, { opacity: 1, scale: 0.62, duration: 0.7, ease: 'back.out(1.6)' }, one + 0.25);

  // "headline the point"
  tl.to(hero, { scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, headline - 0.05);
  tl.to(under, { scaleX: 1, duration: 0.55, ease: 'power3.out' }, point);

  // "move detail into the speaker notes": glide back, notes drop in
  tl.to(cam, { scale: 1, x: 0, duration: 1.1, ease: 'expo.inOut' }, move - 0.15);
  tl.fromTo(panel, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, immediateRender: false }, move + 0.1);
  lines.forEach((l, i) => {
    tl.fromTo(l, { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)', immediateRender: false }, detail + 0.15 + i * 0.1);
  });
  tl.fromTo(chips, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.15, immediateRender: false }, speaker - 0.1);

  // "becomes narration": lines turn into a waveform
  tl.to(lines, { scaleX: 0.1, scaleY: 0.4, opacity: 0, duration: 0.4, ease: 'power2.in', stagger: 0.04 }, becomes - 0.1);
  tl.to(wave, { o: 1, duration: 0.3 }, becomes + 0.1);
  tl.to(wave, { a: 1, duration: 0.9, ease: 'power2.out' }, becomes + 0.15);
  tl.fromTo(lab2, { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, immediateRender: false }, narration);
  tl.to(cam, { scale: 1.03, duration: dur - (move + 1), ease: 'power1.inOut' }, move + 1);
});
